const { inspect } = require("../utils");

const trackDownUsedParam = (usageObjectBase) => {
    const rFunc = (usedParam) => {
        if (usedParam.match)
            return { ...usageObjectBase, uses: [{ match: true }] };
        return { ...usedParam, uses: usedParam.uses.map(rFunc) };
    };
    return rFunc;
};

const getIdentifierUsage = (astNode, paramName) => {
    console.log("getIdentifierUsage", astNode, paramName);
    switch (astNode.type) {
        case "BlockStatement":
            return astNode.body.flatMap((subNode) =>
                getIdentifierUsage(subNode, paramName)
            );
        case "ReturnStatement":
            return getIdentifierUsage(astNode.argument, paramName);
        case "BinaryExpression":
            return [
                ...getIdentifierUsage(astNode.left, paramName),
                ...getIdentifierUsage(astNode.right, paramName),
            ];
        case "CallExpression":
            // optional
            const calleeUses = getIdentifierUsage(astNode.callee, paramName);
            return calleeUses.map(
                trackDownUsedParam({
                    type: "Call",
                    arguments: astNode.arguments,
                })
            );
        case "MemberExpression":
            // calculated & optional
            const memberUses = getIdentifierUsage(astNode.object, paramName);
            return memberUses.map(
                trackDownUsedParam({
                    type: "MemberAccess",
                    property: astNode.property.name,
                })
            ); // Not accounting for calculated
        case "Identifier":
            return [{ match: astNode.name === paramName }];
    }
};

module.exports = (functionDeclaration) => {
    inspect(functionDeclaration);
    return {
        params: functionDeclaration.params.map((param) => {
            // Wrap?
            // Default?
            const paramName = param.name;
            return {
                paramName,
                uses: getIdentifierUsage(functionDeclaration.body, paramName),
            };
        }),
        // scopeVariables,
        // mutations,
        // returns,
    };
};
