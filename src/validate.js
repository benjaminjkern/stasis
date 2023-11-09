module.exports = (stasisModule) => {
    console.log("Validating module");
    for (const usage of stasisModule.statements) {
        evaluate(usage, stasisModule);
    }
};

const USAGE_TYPES = ["Call", "MemberAccess", "BinaryOperation"];
const RAW_VALUE_TYPES = [
    "StringValue",
    "NumberValue",
    "ObjectValue",
    "FunctionValue",
];
const ALGEBRAIC_TYPES = [];

const evaluate = (stasisNode, stasisModule) => {
    if (stasisNode.stasisIndex !== undefined)
        return evaluate(
            stasisModule.nodes[stasisNode.stasisIndex],
            stasisModule
        );

    // console.log("Evaluating", stasisNode);
    if (RAW_VALUE_TYPES.includes(stasisNode.type)) return stasisNode;

    // Need to Consolidate multiple possible values into one
    // if (stasisNode.type === "MultiplePossibleValues") {
    //     const possibleValues = [];
    //     for (const node of stasisNode.possibleValues) {
    //         const evaluatedNode = evaluate(node, stasisModule);
    //         if (evaluatedNode.type === "MultiplePossibleValues")
    //             // Recurse
    //             possibleValues.push(
    //                 ...evaluatedNode.possibleValues.map((value) =>
    //                     evaluate(value, stasisModule)
    //                 )
    //             );
    //         else possibleValues.push(evaluatedNode);
    //     }
    //     return { type: "MultiplePossibleValues", possibleValues };
    // }

    if (stasisNode.type === "ObjectTemplate") {
        return {
            type: "ObjectValue",
            value: stasisNode.values.reduce((p, { key, value }) => ({
                ...p,
                [evaluate(key, stasisModule)]: evaluate(value, stasisModule),
            })),
        };
    }

    if (stasisNode.type === "Call") {
        const callee = evaluate(stasisNode.callee, stasisModule);
        const evaluatedArguments = stasisNode.arguments.map((arg) =>
            evaluate(arg, stasisModule)
        );
        if (callee.type === "FunctionValue") {
            // Need to account for spread parameters & default parameters
            // Need to do mutations
            // Need to account for multiple types and input-dependent types
            if (callee.returns.length === 0) return { type: "UndefinedValue" };
            if (callee.returns.length === 1) {
                try {
                    return evaluate(
                        callee.returns[0],
                        createCallContext(
                            callee.parameters,
                            evaluatedArguments,
                            stasisModule
                        )
                    );
                } catch (err) {
                    // console.warn("Calling will result in an error!");
                    throw "Calling will result in an error!";
                }
            }
            throw "Multiple returns RAHH";
        }
        if (callee.type === "BuiltInFunctionValue") {
            return {
                type: "StringValue",
                value: callee.value(
                    ...evaluatedArguments.map((arg) => arg.value)
                ),
            };
        }
        throw "Callee must be a function value!";
    }

    if (stasisNode.type === "MemberAccess") {
        const owner = evaluate(stasisNode.owner, stasisModule);

        if (owner.type === "MultiplePossibleValues")
            return {
                type: "MultiplePossibleValues",
                possibleValues: owner.possibleValues.map((value) =>
                    evaluate(
                        {
                            type: "MemberAccess",
                            owner: value,
                            key: stasisNode.key,
                        },
                        stasisModule
                    )
                ),
            };

        const key = evaluate(stasisNode.key, stasisModule);

        if (key.type === "MultiplePossibleValues")
            return {
                type: "MultiplePossibleValues",
                possibleValues: key.possibleValues.map((value) =>
                    evaluate(
                        {
                            type: "MemberAccess",
                            owner: stasisNode.owner,
                            key: value,
                        },
                        stasisModule
                    )
                ),
            };

        switch (key.type) {
            case "BuiltInFunctionValue":
            case "FunctionValue":
                console.warn(
                    `Warning: This will result in a member access with a function value as a key, which gets turned into a string. This is possible, but probably not what you want!`
                );
                break;
            case "ObjectValue":
                console.warn(
                    `Warning: This will result in a member access with an object value as a key, which gets turned into a string. This is possible, but probably not what you want!`
                );
                break;
            // TODO: Fill out
        }

        if (owner.type === "UndefinedValue")
            throw "Cannot perform a member access with the owner set to undefined";

        if (owner.type === "NullValue")
            throw "Cannot perform a member access with the owner set to null";

        if (owner.type === "StringValue") {
            if (key.value === "charAt")
                return {
                    type: "BuiltInFunctionValue",
                    value: owner.value.charAt,
                };
            if (key.value === "toUpperCase")
                return {
                    type: "BuiltInFunctionValue",
                    value: owner.value.toUpperCase,
                };
            if (key.value === "slice")
                return {
                    type: "BuiltInFunctionValue",
                    value: owner.value.slice,
                };
            // Iterate through possible keys for strings
            console.warn(
                `Warning: key not in object, returning undefined`,
                owner,
                key
            );
            return { type: "UndefinedValue" };
        }
        if (owner.type === "NumberValue") {
            // Iterate through possible keys for strings
            console.warn(
                `Warning: key not in object, returning undefined`,
                owner,
                key
            );
            return { type: "UndefinedValue" };
        }
        if (owner.type === "ObjectValue") {
            if (key.value in owner.value) return owner.value[key.value];
            console.warn(
                `Warning: key not in object, returning undefined`,
                owner,
                key
            );
            return { type: "UndefinedValue" };
        }
        throw `Member Access unsupported owner type: ${owner.type}`;
    }
    if (stasisNode.type === "BinaryOperation") {
        const leftSide = evaluate(stasisNode.leftSide, stasisModule);
        const rightSide = evaluate(stasisNode.rightSide, stasisModule);
        switch (stasisNode.operator) {
            case "+":
                if (
                    !["StringValue", "NumberValue"].includes(leftSide.type) ||
                    !["StringValue", "NumberValue"].includes(rightSide.type)
                )
                    console.warn(
                        `Warning: + operator is really only designed for numbers and strings`
                    );
                return leftSide.value + rightSide.value;
        }
        throw `Unsupported operator: ${stasisNode.operator}`;
    }
    throw `Unsupported type: ${stasisNode.type}`;
};

const createCallContext = (parameters, args, stasisModule) => {
    // console.log("createCallContext", parameters, args);
    const nodes = [...stasisModule.nodes];
    const copiedArgs = [...args];
    for (const parameter of parameters) {
        // Not accounting for non-spreads after spreads or defaults
        const parameterNode = nodes[parameter.stasisIndex];
        nodes[parameter.stasisIndex] = parameterNode.spread
            ? copiedArgs.splice(0)
            : copiedArgs.shift();
    }
    return { nodes };
};
