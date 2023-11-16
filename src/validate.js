const { makeStasisValue, stasisError } = require("./stasisUtils");
const { debugCalls } = require("./utils");
require("colors");

const USAGE_TYPES = ["Call", "MemberAccess", "BinaryOperation"];
const RAW_VALUE_TYPES = [
    "StringValue",
    "NumberValue",
    "ObjectValue",
    "FunctionValue",
];
const ALGEBRAIC_TYPES = [];

const createCallContext = (parameters, args, stasisModule) => {
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

const evaluateMemberAccess = (stasisNode, stasisModule) => {
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
            stasisError(
                `Warning: This will result in a member access with a function value as a key, which gets turned into a string. This is possible, but probably not what you want!`,
                stasisNode,
                stasisModule
            );
            break;
        case "ObjectValue":
            stasisError(
                `Warning: This will result in a member access with an object value as a key, which gets turned into a string. This is possible, but probably not what you want!`,
                stasisNode,
                stasisModule
            );
            break;
        // TODO: Fill out
    }

    if (owner.type === "UndefinedValue")
        throw stasisError(
            "Cannot perform a member access with the owner set to undefined",
            stasisNode,
            stasisModule
        );

    if (owner.type === "NullValue")
        throw stasisError(
            "Cannot perform a member access with the owner set to null",
            stasisNode,
            stasisModule
        );

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
        // Todo: Iterate through possible keys for strings
        stasisError(`Warning: key not in object, returning undefined`);
        return { type: "UndefinedValue" };
    }
    if (owner.type === "NumberValue") {
        // Todo: Iterate through possible keys for number
        stasisError(`Warning: key not in object, returning undefined`);
        return { type: "UndefinedValue" };
    }
    if (owner.type === "ObjectValue") {
        if (key.value in owner.value) return evaluate(owner.value[key.value]);
        stasisError(
            `Warning: key not in object, returning undefined`,
            stasisNode,
            stasisModule
        );
        return { type: "UndefinedValue" };
    }
    throw new Error(`Member Access unsupported owner type: ${owner.type}`);
};

const evaluate = debugCalls(
    (stasisNode, stasisModule) => {
        if (stasisNode.stasisIndex !== undefined)
            return evaluate(
                stasisModule.nodes[stasisNode.stasisIndex],
                stasisModule
            );

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

        if (stasisNode.type === "ObjectTemplate")
            return {
                type: "ObjectValue",
                value: stasisNode.values.reduce((p, { key, value }) => {
                    const evaluatedKey = evaluate(key, stasisModule);
                    if (
                        ["NumberValue", "StringValue"].includes(
                            evaluatedKey.type
                        )
                    )
                        return {
                            ...p,
                            [evaluatedKey.value]: evaluate(value, stasisModule),
                        };
                    throw new Error(
                        `Cannot deal with key type: ${evaluatedKey.type}!`
                    );
                }, {}),
            };

        if (stasisNode.type === "Call") {
            const callee = evaluate(stasisNode.callee, stasisModule);
            const evaluatedArguments = stasisNode.arguments.map((arg) =>
                evaluate(arg, stasisModule)
            );
            if (callee.type === "FunctionValue") {
                // Need to account for spread parameters & default parameters
                // Need to do mutations
                // Need to account for multiple types and input-dependent types
                if (callee.returns.length === 0)
                    return { type: "UndefinedValue" };
                if (callee.returns.length === 1)
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
                        console.log(err.stack);
                        throw stasisError(
                            `Calling will result in an error: ${err}`,
                            stasisNode,
                            stasisModule
                        );
                    }

                throw new Error("Multiple returns RAHH");
            }
            if (callee.type === "BuiltInFunctionValue") {
                const value = callee.value(
                    ...evaluatedArguments.map((arg) => arg.value)
                );
                return makeStasisValue(value);
            }

            throw stasisError(
                "Callee must be a function value!",
                stasisNode,
                stasisModule
            );
        }

        if (stasisNode.type === "MemberAccess")
            return evaluateMemberAccess(stasisNode, stasisModule);

        if (stasisNode.type === "BinaryOperation") {
            const leftSide = evaluate(stasisNode.leftSide, stasisModule);
            const rightSide = evaluate(stasisNode.rightSide, stasisModule);
            switch (stasisNode.operator) {
                case "+":
                    if (
                        !["StringValue", "NumberValue"].includes(
                            leftSide.type
                        ) ||
                        !["StringValue", "NumberValue"].includes(rightSide.type)
                    )
                        stasisError(
                            `Warning: + operator is really only designed for numbers and strings`,
                            stasisNode,
                            stasisModule
                        );
                    return leftSide.value + rightSide.value;
            }
            throw new Error(`Unsupported operator: ${stasisNode.operator}`);
        }
        if (stasisNode.type === "BuiltInObject") {
            if (stasisNode.name === "console")
                return { type: "ObjectValue", value: console };
            throw new Error(`Unknown builtin name: ${stasisNode.name}`);
        }
        // throw new Error(`Unsupported type: ${stasisNode.type}`);
        return makeStasisValue(stasisNode);
    },
    "evaluate",
    [true]
);
module.exports = (stasisModule) => {
    console.log("Validating module");
    let errors = false;
    for (const usage of stasisModule.statements)
        try {
            evaluate(usage, stasisModule);
        } catch (err) {
            errors = true;
            console.log(err.message.red);
        }

    if (!errors) console.log("Module validated");
};
