const getNode = (nodeDef, stasisModule) => {
    if (nodeDef.scopeIndex !== undefined)
        return stasisModule.scope[node.scopeIndex];
    if (nodeDef.argumentIndex !== undefined)
        return stasisModule.args[node.argumentIndex];
    return nodeDef;
};

const validateModule = (scope, args = []) => {
    const stasisModule = { scope, args };
    for (const node of scope) {
        validateNode(node, stasisModule);
    }
};

const validateNode = (node, stasisModule) => {
    if (node.type === "Function") return node; // Functions are always valid, I guess
    if (node.type === "Call") {
        const calleeNode = getNode(node.callee, stasisModule);
        validateModule(calleeNode.scope, node.arguments);
        return;
    }
    if (node.type === "MemberAccess") {
        const ownerNode = getNode(node.owner);
    }
    throw `Unknown node type: ${node.type}`;
};
