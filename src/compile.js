const acorn = require("acorn");
const fs = require("fs");
const { inspect } = require("./utils");

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
                key: expression.computed
                    ? compileExpression(expression.property, stasisModule)
                    : compileExpression(
                          {
                              type: "Literal",
                              value: expression.property.name,
                          },
                          stasisModule
                      ),
            },
            stasisModule
        );
    if (expression.type === "Identifier") {
        if (!stasisModule.identifiers[expression.name])
            throw `Undefined identifier: ${expression.name}`;

        return stasisModule.identifiers[expression.name];
    }
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
    for (const statement of moduleNode.body) {
        if (statement.type === "VariableDeclaration") {
            for (const declaration of statement.declarations) {
                compileDeclaration(declaration, stasisModule);
            }
            continue;
        }
        if (statement.type === "FunctionDeclaration") {
            throw "Unimplemented";
        }
        if (statement.type === "ExpressionStatement") {
            stasisModule.statements.push(
                compileExpression(statement.expression, stasisModule)
            );
            continue;
        }
        throw `Unknown statement type: ${statement.type}`;
    }
    return stasisModule;
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