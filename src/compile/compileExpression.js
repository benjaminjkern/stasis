const { stasisIncompleteError, makeStasisValue } = require("../stasisUtils");
const compileFunction = (...args) => require("./compileFunction")(...args);
const { getCodePositions, addNode } = require("./compileUtils");

const compileExpression = (expression, stasisModule) => {
    if (expression.type === "Literal")
        return addNode(
            makeStasisValue(expression.value),
            stasisModule,
            expression
        );
    if (expression.type === "ObjectExpression") {
        const objectValue = { type: "ObjectTemplate", values: [] };
        for (const prop of expression.properties) {
            if (prop.type !== "Property")
                throw stasisIncompleteError(
                    `Cannot deal with object property type: ${prop.type}`,
                    getCodePositions(prop),
                    stasisModule
                );
            if (prop.method)
                throw stasisIncompleteError(
                    `Cannot deal with object property methods!`,
                    getCodePositions(prop),
                    stasisModule
                );
            if (prop.kind !== "init")
                throw stasisIncompleteError(
                    `Cannot deal with object property kind other than init! (IDK what this is at the moment)`,
                    getCodePositions(prop),
                    stasisModule
                );
            objectValue.values.push({
                key:
                    prop.computed || prop.key.type === "Literal"
                        ? compileExpression(prop.key, stasisModule)
                        : compileExpression(
                              {
                                  type: "Literal",
                                  value: prop.key.name,
                                  start: prop.start,
                                  end: prop.end,
                              },
                              stasisModule
                          ),
                value: compileExpression(prop.value, stasisModule),
            });
        }
        return addNode(objectValue, stasisModule, expression);
    }
    if (expression.type === "ArrowFunctionExpression") {
        // TODO: Unsure what id & expression are
        if (expression.async)
            throw stasisIncompleteError(
                "No async functions (yet)",
                getCodePositions(expression),
                stasisModule
            );
        if (expression.generator)
            throw stasisIncompleteError(
                "No generator functions (yet)",
                getCodePositions(expression),
                stasisModule
            );
        return compileFunction(expression, stasisModule);
    }
    if (expression.type === "Identifier") {
        if (!stasisModule.identifiers[expression.name])
            throw stasisIncompleteError(
                `Undefined identifier: ${expression.name}`,
                getCodePositions(expression),
                stasisModule
            );

        const knownNode = stasisModule.identifiers[expression.name];
        if (knownNode.type) return addNode(knownNode, stasisModule, expression);

        return knownNode;
    }

    if (
        expression.type === "BinaryExpression" ||
        expression.type === "LogicalExpression"
    )
        // TODO: Unsure why these two are separated like this, could be because of allowed types
        return addNode(
            {
                type: "BinaryOperation",
                operator: expression.operator,
                leftSide: compileExpression(expression.left, stasisModule),
                rightSide: compileExpression(expression.right, stasisModule),
            },
            stasisModule,
            expression
        );
    if (expression.type === "UnaryExpression")
        // TODO: Cannot deal with prefix / postfix or if it even matters lol
        return addNode(
            {
                type: "UnaryOperation",
                operator: expression.operator,
                argument: compileExpression(expression.argument, stasisModule),
            },
            stasisModule,
            expression
        );
    if (expression.type === "CallExpression")
        return addNode(
            {
                type: "Call",
                callee: compileExpression(expression.callee, stasisModule),
                arguments: expression.arguments.map((arg) =>
                    compileExpression(arg, stasisModule)
                ),
            },
            stasisModule,
            expression
        );
    if (expression.type === "MemberExpression")
        return addNode(
            {
                type: "MemberAccess",
                owner: compileExpression(expression.object, stasisModule),
                key: expression.computed // TODO: Might cause problems - Inconsistent with object templates
                    ? compileExpression(expression.property, stasisModule)
                    : compileExpression(
                          // Compile it so it gets a stasis value
                          {
                              type: "Literal",
                              value: expression.property.name,
                              start: expression.property.start,
                              end: expression.property.end,
                          },
                          stasisModule
                      ),
            },
            stasisModule,
            expression
        );

    // if (expression.type === "UpdateExpression") {
    //     console.log(expression);
    //     compileStatement({type: "UpdateStatement"});
    //     return addNode(
    //         compileExpression(expression.argument),
    //         stasisModule,
    //         expression.argument
    //     );
    // }
    if (expression.type === "AssignmentExpression") {
        if (expression.operator !== "=")
            throw stasisIncompleteError(
                `AssignmentExpressions can only deal with = right now`,
                expression,
                stasisModule
            );
        if (expression.left.type !== "Identifier")
            throw stasisIncompleteError(
                `AssignmentExpressions can only deal with raw assignments right now (direct to variable)`,
                expression,
                stasisModule
            );
        return addNode(
            {
                type: "SetValue",
                newValue: compileExpression(expression.right, stasisModule),
                assignee: compileExpression(expression.left, stasisModule),
            },
            stasisModule,
            expression
        );
    }

    throw stasisIncompleteError(
        `Unknown expression type: ${expression.type}`,
        getCodePositions(expression),
        stasisModule
    );
};

module.exports = compileExpression;
