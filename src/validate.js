const getStasisNode = (nodeTemplate, stasisModule) => {
    if (nodeTemplate.stasisIndex !== undefined)
        return stasisModule.nodes[nodeTemplate.stasisIndex];
    throw "Tried to fetch stasis node but did not receive an index!";
};

const validateModule = (stasisModule) => {
    console.log("Validating module");
    for (const usage of stasisModule.topLevelUses) {
        validateUsage(getStasisNode(usage, stasisModule), stasisModule);
    }
};

const validateUsage = (stasisNode, stasisModule) => {
    console.log("Validating usage", stasisNode);
    if (stasisNode.type === "Call") {
        const callee = evaluate(
            getStasisNode(stasisNode.callee, stasisModule),
            stasisModule
        );
        if (callee.type !== "FunctionValue") {
            console.warn("Callee must be a function value!");
            return;
        }
        const evaluatedArguments = stasisNode.arguments.map((arg) =>
            evaluate(getStasisNode(arg, stasisModule), stasisModule)
        );
        for (let i = 0; i < callee.parameters.length; i++) {
            canNodeBeValue(
                callee.parameters[i],
                evaluatedArguments[i],
                stasisModule
            );
        }
        return;
    }
    if (stasisNode.type === "MemberAccess") {
        const owner = evaluate(
            getStasisNode(stasisNode.callee, stasisModule),
            stasisModule
        );
        const key = evaluate(
            getStasisNode(stasisNode.callee, stasisModule),
            stasisModule
        );
        switch (key.type) {
            case "FunctionValue":
                console.warn(
                    `Warning: This will result in a member access with a function value as a key, which gets turned into a string. This is possible, but probably not what you want!`
                );
            case "ObjectValue":
                console.warn(
                    `Warning: This will result in a member access with an object value as a key, which gets turned into a string. This is possible, but probably not what you want!`
                );
            // TODO: Fill out
        }

        if (owner.type === "StringValue") {
            // Iterate through possible keys for strings
        }
        if (owner.type === "NumberValue") {
            // Iterate through possible keys for strings
        }
    }
};

const canNodeBeValue = (stasisNode, value, stasisModule) => {
    for (const usage of stasisNode.uses) {
        const usageNode = getStasisNode(usage, stasisModule);
    }
};

const evaluate = (stasisNode, stasisModule) => {
    if (stasisType.type === "RawStringValue") return stasisNode;
    if (stasisType.type === "FunctionValue") return stasisNode;
    throw `Unsupported type: ${stasisType.type}`;
};

validateModule(require("../examples/capitalize.stasis"));
