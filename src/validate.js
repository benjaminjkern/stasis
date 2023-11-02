const getStasisNode = (nodeTemplate, stasisModule) => {
    if (nodeTemplate.stasisIndex !== undefined)
        return stasisModule.nodes[nodeTemplate.stasisIndex];
    throw "Tried to fetch stasis node but did not receive an index!";
};

const validateModule = (stasisModule) => {
    console.log("Validating module");
    for (const usage of stasisModule.statements) {
        const result = evaluate(
            getStasisNode(usage, stasisModule),
            stasisModule
        );
        if (result.error) console.log(result);
    }
};

const USAGE_TYPES = ["Call", "MemberAccess"];
const RAW_VALUE_TYPES = ["StringValue", "NumberValue", "ObjectValue"];
const ALGEBRAIC_TYPES = [];

const evaluate = (stasisNode, stasisModule) => {
    console.log("Evaluating", stasisNode);
    if (RAW_VALUE_TYPES.includes(stasisNode.type)) return stasisNode;
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
        const callee = evaluate(
            getStasisNode(stasisNode.callee, stasisModule),
            stasisModule
        );
        if (callee.type !== "FunctionValue") {
            return { error: "Callee must be a function value!" };
        }
        const evaluatedArguments = stasisNode.arguments.map((arg) =>
            evaluate(getStasisNode(arg, stasisModule), stasisModule)
        );
        // Need to account for algebraic types here
        // for (let i = 0; i < callee.parameters.length; i++) {
        //     canNodeBeValue(
        //         callee.parameters[i],
        //         evaluatedArguments[i],
        //         stasisModule
        //     );
        // }
        callee.value(...evaluatedArguments.map((arg) => arg.value));
        return { type: "Undefined" };
    }
    if (stasisNode.type === "MemberAccess") {
        const owner = evaluate(
            getStasisNode(stasisNode.owner, stasisModule),
            stasisModule
        );
        const key = evaluate(
            getStasisNode(stasisNode.key, stasisModule),
            stasisModule
        );
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

        if (owner.type === "StringValue") {
            // Iterate through possible keys for strings
        }
        if (owner.type === "NumberValue") {
            // Iterate through possible keys for strings
        }
        if (owner.type === "ObjectValue") {
            // TODO: Actually do this
            return { type: "FunctionValue", value: owner.value[key.value] };
        }
    }
    throw `Unsupported type: ${stasisType.type}`;
};

validateModule(require("../workingexamples/basic.stasis.js"));
