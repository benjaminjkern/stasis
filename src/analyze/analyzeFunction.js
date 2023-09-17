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
                ...getIdentifierUsage(astNode.left, paramName).map(
                    trackDownUsedParam({
                        type: "BinaryOperation",
                        operation: astNode.operator,
                        side: "left",
                        otherSide: astNode.right,
                    })
                ),
                ...getIdentifierUsage(astNode.right, paramName).map(
                    trackDownUsedParam({
                        type: "BinaryOperation",
                        operation: astNode.operator,
                        side: "right",
                        otherSide: astNode.left,
                    })
                ),
            ];
        case "CallExpression":
            return [
                ...getIdentifierUsage(astNode.callee, paramName).map(
                    trackDownUsedParam({
                        type: "Call",
                        optional: astNode.optional,
                        arguments: astNode.arguments,
                    })
                ),
                ...astNode.arguments.flatMap((arg) =>
                    getIdentifierUsage(arg, paramName)
                ),
            ];
        case "MemberExpression":
            return [
                ...getIdentifierUsage(astNode.object, paramName).map(
                    trackDownUsedParam({
                        type: "MemberAccess",
                        optional: astNode.optional,
                        property: astNode.property,
                    })
                ),
                ...(astNode.computed
                    ? getIdentifierUsage(astNode.property, paramName)
                    : []),
            ];
        case "Identifier":
            if (astNode.name === paramName) return [{ match: true }];
            return [];
        case "Literal":
            return [];
        case "IfStatement":
            return [
                ...getIdentifierUsage(astNode.test, paramName),
                ...getIdentifierUsage(astNode.consequent, paramName).map(
                    (useCase) => ({
                        ...useCase,
                        condition: astNode.test,
                    })
                ),
                ...getIdentifierUsage(astNode.alternate, paramName).map(
                    (useCase) => ({
                        ...useCase,
                        condition: { not: astNode.test },
                    })
                ),
            ];
        case "UnaryExpression":
            return getIdentifierUsage(astNode.argument, paramName).map(
                trackDownUsedParam({
                    type: "UnaryOperation",
                    operation: astNode.operator,
                    prefix: astNode.prefix, // ????
                })
            );
        case "TemplateLiteral":
            return astNode.expressions.flatMap((exp) =>
                getIdentifierUsage(exp, paramName)
            );
        case "VariableDeclaration":
            // Need to do 'kind' (var vs let vs const)
            return astNode.declarations.flatMap((subNode) =>
                getIdentifierUsage(subNode, paramName)
            );
        case "VariableDeclarator":
            // Need to run getIdentifierUsage on resulting object
            return [
                ...getIdentifierUsage(astNode.init, paramName),
                ...(astNode.id.name === paramName
                    ? [
                          {
                              type: "Assignment",
                              operator: "=", // Track with regular assignments
                              side: "left",
                              otherSide: astNode.init,
                          },
                      ]
                    : []),
            ];
        case "ExpressionStatement":
            return getIdentifierUsage(astNode.expression, paramName);
        case "AssignmentExpression":
            return [
                ...getIdentifierUsage(astNode.left, paramName).map(
                    trackDownUsedParam({
                        type: "Assignment",
                        operator: astNode.operator,
                        side: "left",
                        otherSide: astNode.right,
                    })
                ),
                ...getIdentifierUsage(astNode.right, paramName).map(
                    trackDownUsedParam({
                        type: "Assignment",
                        operator: astNode.operator,
                        side: "right",
                        otherSide: astNode.left,
                    })
                ),
            ];
        case "ObjectExpression":
            return astNode.properties.flatMap((prop) =>
                getIdentifierUsage(prop, paramName)
            );
        case "Property":
            astNode.method,
                astNode.shorthand,
                astNode.computed,
                astNode.key,
                astNode.kind,
                astNode.value;
            return getIdentifierUsage(astNode.value, paramName);
        case "ArrayExpression":
            console.log("getIdentifierUsage", astNode, paramName);
            return astNode.elements.flatMap((prop) =>
                getIdentifierUsage(prop, paramName)
            );
        case "NewExpression":
            console.log("getIdentifierUsage", astNode, paramName);
            return getIdentifierUsage(astNode.callee, paramName); // skipping args for now

        case "ArrowFunctionExpression":
            astNode.id,
                astNode.expression,
                astNode.generator,
                astNode.async,
                astNode.params,
                astNode.body;
            console.log("getIdentifierUsage", astNode, paramName);
            return [];
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
