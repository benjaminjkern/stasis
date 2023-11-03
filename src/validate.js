const validateModule = (stasisModule) => {
    console.log("Validating module");
    for (const usage of stasisModule.statements) {
        const result = evaluate(usage, stasisModule);
        if (result.error) console.log(result);
    }
};

const USAGE_TYPES = ["Call", "MemberAccess"];
const RAW_VALUE_TYPES = ["StringValue", "NumberValue", "ObjectValue"];
const ALGEBRAIC_TYPES = [];

const evaluate = (stasisNode, stasisModule) => {
    if (stasisNode.stasisIndex !== undefined)
        return evaluate(
            stasisModule.nodes[stasisNode.stasisIndex],
            stasisModule
        );

    if (RAW_VALUE_TYPES.includes(stasisNode.type)) return stasisNode;
    console.log("Evaluating", stasisNode);

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

    // Need to add ObjectTemplate as a usage
    // if (stasisNode.type === "ObjectValue") {
    //     return {type: "EvaluatedObjectValue"stasisNode.values.reduce(
    //         (p, { key, value }) => ({
    //             ...p,
    //             [evaluate(getStasisNode(key, stasisModule), stasisModule)]:
    //                 evaluate(
    //                     getStasisNode(value, stasisModule),
    //                     stasisModule
    //                 ),
    //         })
    //     );
    // }

    if (stasisNode.type === "Call") {
        const callee = evaluate(stasisNode.callee, stasisModule);
        if (callee.type !== "FunctionValue") {
            throw "Callee must be a function value!";
        }
        const evaluatedArguments = stasisNode.arguments.map((arg) =>
            evaluate(arg, stasisModule)
        );
        // Need to account for multiple types here
        // for (let i = 0; i < callee.parameters.length; i++) {
        //     canNodeBeValue(
        //         callee.parameters[i],
        //         evaluatedArguments[i],
        //         stasisModule
        //     );
        // }
        // Need to not actually call the function
        callee.value(...evaluatedArguments.map((arg) => arg.value));
        // Need to account for multiple types and input-dependent types
        return callee.returns;
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
            return {
                error: "Cannot perform a member access with the owner set to undefined",
            };

        if (owner.type === "NullValue")
            throw "Cannot perform a member access with the owner set to null";

        if (owner.type === "StringValue") {
            // Iterate through possible keys for strings
        }
        if (owner.type === "NumberValue") {
            // Iterate through possible keys for strings
        }
        if (owner.type === "ObjectValue") {
            if (key.value in owner.value) return owner.value[key.value];
            return { type: "UndefinedValue" };
        }
        throw `Member Access unsupported owner type: ${owner.type}`;
    }
    throw `Unsupported type: ${stasisNode.type}`;
};

validateModule(require("../workingexamples/basicbroken2.stasis.js"));
