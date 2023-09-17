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
    if (!astNode) return [];
    // console.log("getIdentifierUsage", astNode, paramName);
    switch (astNode.type) {
        case "BlockStatement":
            return astNode.body.flatMap((subNode) =>
                getIdentifierUsage(subNode, paramName)
            );
        case "ReturnStatement":
            return getIdentifierUsage(astNode.argument, paramName);
        case "BinaryExpression":
        case "LogicalExpression":
            // Need to actually do something about this
            return [
                ...getIdentifierUsage(astNode.left, paramName),
                ...getIdentifierUsage(astNode.right, paramName),
            ];
        case "UnaryExpression":
            return getIdentifierUsage(astNode.argument, paramName);
        case "TemplateLiteral":
            return astNode.expressions.flatMap((exp) =>
                getIdentifierUsage(exp, paramName)
            );
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
            if (astNode.name === paramName) return [{ match: true }];
            return [];
        case "Literal":
            return [];
        case "IfStatement":
            const consequentUses = getIdentifierUsage(
                astNode.consequent,
                paramName
            );
            const alternateUses = astNode.alternate
                ? getIdentifierUsage(astNode.alternate, paramName)
                : [];
            return [
                ...consequentUses.map((useCase) => ({
                    ...useCase,
                    condition: astNode.test,
                })),
                ...alternateUses.map((useCase) => ({
                    ...useCase,
                    condition: { not: astNode.test },
                })),
            ];
        case "VariableDeclaration":
            return astNode.declarations.flatMap((subNode) =>
                getIdentifierUsage(subNode, paramName)
            );
        case "VariableDeclarator":
            if (astNode.id === paramName) console.log("Overwriting value");
            // Overwriting value
            return getIdentifierUsage(astNode.init, paramName);

        case "ExpressionStatement":
            return getIdentifierUsage(astNode.expression, paramName);
        case "AssignmentExpression":
            return [
                ...getIdentifierUsage(astNode.left, paramName),
                ...getIdentifierUsage(astNode.right, paramName),
            ];
        case "ObjectExpression":
            return astNode.properties.flatMap((prop) =>
                getIdentifierUsage(prop, paramName)
            );
        case "Property":
            return getIdentifierUsage(astNode.value, paramName);
        case "ArrayExpression":
            return astNode.elements.flatMap((prop) =>
                getIdentifierUsage(prop, paramName)
            );
        case "NewExpression":
            return getIdentifierUsage(astNode.callee, paramName); // skipping args for now
        default:
            console.log(astNode);
            throw `Unknown astNode type: ${astNode.type}`;
    }
};

module.exports = (functionDeclaration) => {
    // inspect(functionDeclaration);
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
