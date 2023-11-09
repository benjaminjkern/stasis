const acorn = require("acorn");
const fs = require("fs");
const { inspect } = require("./utils");
const { getStasisNode } = require("./stasisUtils");

const addNode = (node, stasisModule) => {
    const stasisIndex = stasisModule.nodes.push(node) - 1;
    return { stasisIndex };
};

const compileDeclaration = (declaration, stasisModule) => {
    if (declaration.type === "VariableDeclarator") {
        if (declaration.id.type !== "Identifier")
            throw "Cannot yet deal with VariableDeclarators with non-identifier ids!";
        stasisModule.identifiers[declaration.id.name] = compileExpression(
            declaration.init,
            stasisModule
        );
        return;
    }
    if (declaration.type === "FunctionDeclaration") {
        if (declaration.id.type !== "Identifier")
            throw "Cannot yet deal with FunctionDeclarations with non-identifier ids!";
        const functionValue = {
            type: "FunctionValue",
            parameters: [],
            returns: [],
            mutations: [], // unused
        };
        const functionNode = addNode(functionValue, stasisModule);
        for (const param of declaration.params) {
            if (param.type !== "Identifier")
                throw "Cannot yet deal with FunctionDeclarations with non-identifier params!";
            const paramNode = addNode(
                { type: "FunctionArgumentValue" },
                stasisModule
            );
            stasisModule.identifiers[param.name] = paramNode;
            functionValue.parameters.push(paramNode);
        }
        stasisModule.identifiers[declaration.id.name] = functionNode;
        stasisModule.currentFunction = functionNode;

        if (declaration.body.type !== "BlockStatement")
            throw "Cannot yet deal with FunctionDeclarations with non-blockstatement bodies!";
        compileStatementBlockBody(declaration.body.body, stasisModule);
        // TODO: Do something to reset identifiers to how they were before sending them into the block
        stasisModule.currentFunction = undefined;
        return;
    }
    throw `Unknown declaration type: ${declaration.type}`;
};

const makeStasisValue = (value) => {
    if (typeof value === "number") return { type: "NumberValue", value };
    if (typeof value === "string") return { type: "StringValue", value };
    throw `Unknown raw value type: ${typeof value}`;
};

const compileExpression = (expression, stasisModule) => {
    if (expression.type === "Literal")
        return addNode(makeStasisValue(expression.value), stasisModule);
    if (expression.type === "ObjectExpression") {
        const objectValue = { type: "ObjectTemplate", values: [] };
        for (const prop of expression.properties) {
            if (prop.type !== "Property")
                throw `Cannot deal with object property type: ${prop.type}`;
            if (prop.method) throw `Cannot deal with object property methods!`;
            if (prop.kind !== "init")
                throw `Cannot deal with object property kind other than init! (IDK what this is at the moment)`;
            objectValue.values.push({
                key:
                    prop.computed || prop.key.type === "Literal"
                        ? compileExpression(prop.key, stasisModule)
                        : compileExpression(
                              {
                                  type: "Literal",
                                  value: prop.key.name,
                              },
                              stasisModule
                          ),
                value: compileExpression(prop.value, stasisModule),
            });
        }
        return addNode(objectValue, stasisModule);
    }
    if (expression.type === "Identifier") {
        if (!stasisModule.identifiers[expression.name])
            throw `Undefined identifier: ${expression.name}`;

        return stasisModule.identifiers[expression.name];
    }
    if (expression.type === "BinaryExpression")
        return addNode(
            {
                type: "BinaryOperation",
                operator: expression.operator,
                leftSide: compileExpression(expression.left, stasisModule),
                rightSide: compileExpression(expression.right, stasisModule),
            },
            stasisModule
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
            stasisModule
        );
    if (expression.type === "MemberExpression")
        return addNode(
            {
                type: "MemberAccess",
                owner: compileExpression(expression.object, stasisModule),
                key: expression.computed // Might cause problems - Inconsistent with object templates
                    ? compileExpression(expression.property, stasisModule)
                    : compileExpression(
                          // Compile it so it gets a stasis value
                          {
                              type: "Literal",
                              value: expression.property.name,
                          },
                          stasisModule
                      ),
            },
            stasisModule
        );
    throw `Unknown expression type: ${expression.type}`;
};

const compileProgram = (moduleNode) => {
    const stasisModule = {
        nodes: [],
        statements: [],
        identifiers: {
            console: { builtIn: true, name: "console" },
        },
    };
    if (moduleNode.type !== "Program") throw "Tried to compile a non-program!";
    compileStatementBlockBody(moduleNode.body, stasisModule);
    return stasisModule;
};

const compileStatementBlockBody = (statements, stasisModule) => {
    for (const statement of statements) {
        if (statement.type === "VariableDeclaration") {
            for (const declaration of statement.declarations) {
                compileDeclaration(declaration, stasisModule);
            }
            continue;
        }
        if (statement.type === "FunctionDeclaration") {
            compileDeclaration(statement, stasisModule);
            continue;
        }
        if (statement.type === "ExpressionStatement") {
            stasisModule.statements.push(
                compileExpression(statement.expression, stasisModule)
            );
            continue;
        }
        if (statement.type === "ReturnStatement") {
            if (!stasisModule.currentFunction)
                throw "Return statement not inside of a function (Acorn should have caught this)";
            getStasisNode(
                stasisModule.currentFunction,
                stasisModule
            ).returns.push(compileExpression(statement.argument, stasisModule));
            continue;
        }
        throw `Unknown statement type: ${statement.type}`;
    }
};

module.exports = (fullFileName) => {
    // Don't do any file stuff if it fails to compile
    const compiledProgram = compileProgram(
        acorn.parse(fs.readFileSync(fullFileName), {
            ecmaVersion: 2020,
        })
    );

    const fullPath = fullFileName.split("/");
    const file = fullPath.slice(-1)[0];
    const path = fullPath.slice(0, -1);
    const [fileStart, fileEnding, ...rest] = file.split(".");
    if (rest.length || fileEnding !== "js")
        throw "Please only use files of the form [filename].js";
    const stasisFile = [...path, `${fileStart}.stasis.js`].join("/");
    fs.writeFileSync(stasisFile, "module.exports = ");
    fs.appendFileSync(stasisFile, inspect(compiledProgram, false));
};

module.exports("./workingexamples/capitalize.js");
