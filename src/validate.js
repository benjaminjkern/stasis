const getStasisNode = (nodeTemplate, stasisModule) => {
    if (nodeTemplate.stasisIndex !== undefined)
        return stasisModule[nodeTemplate.stasisIndex];
    throw "Tried to fetch stasis node but did not receive an index!";
};

const validateModule = (stasisModule) => {
    console.log("Validating module");
    for (const stasisNode of stasisModule) {
        validateStasisNode(stasisNode, stasisModule);
    }
};

const validateStasisNode = (stasisNode, stasisModule) => {
    console.log("Validating node", stasisNode);
    if (stasisNode.uses) {
        for (const usage of stasisNode.uses) {
            validateStasisNode(
                getStasisNode(usage, stasisModule),
                stasisModule
            );
        }
    }
    if (stasisNode.type === "Call") {
        const callee = getStasisNode(stasisNode.callee, stasisModule);
        const arguments = stasisNode.arguments.map((arg) =>
            getStasisNode(arg, stasisModule)
        );
        if (callee.type !== "FunctionValue") throw "WHAT";
        return;
    }
};

const evaluate = (stasisNode, stasisModule) => {};

validateModule(require("../examples/capitalize.stasis"));
