const acorn = require("acorn");
const fs = require("fs");
const {
    getStasisNode,
    getStasisFiles,
    makeStasisValue,
} = require("./stasisUtils");
const { hash } = require("./utils");

const addNode = (node, stasisModule, acornNode) => {
    const stasisIndex = stasisModule.nodes.length;
    stasisModule.nodes.push({
        resolvedStasisIndex: stasisIndex,
        ...node,
        codePosition: [acornNode.start, acornNode.end],
    });
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

const compileFunction = (functionDeclaration, stasisModule) => {
    const functionValue = {
        type: "FunctionValue",
        parameters: [],
        returns: [],
        mutations: [], // unused
    };
    const functionNode = addNode(
        functionValue,
        stasisModule,
        functionDeclaration
    );

    if (functionDeclaration.id) {
        if (functionDeclaration.id.type !== "Identifier")
            throw "Cannot yet deal with FunctionDeclarations with non-identifier ids!";
        stasisModule.identifiers[functionDeclaration.id.name] = functionNode;
    }
    for (const param of functionDeclaration.params) {
        if (param.type !== "Identifier")
            throw "Cannot yet deal with FunctionDeclarations with non-identifier params!";
        const paramNode = addNode(
            { type: "FunctionArgumentValue" },
            stasisModule,
            param
        );
        stasisModule.identifiers[param.name] = paramNode;
        functionValue.parameters.push(paramNode);
    }
    stasisModule.currentFunction = functionNode;
    if (functionDeclaration.body.type === "BlockStatement")
        compileStatementBlockBody(functionDeclaration.body.body, stasisModule);
    else
        functionValue.returns.push(
            compileExpression(functionDeclaration.body, stasisModule)
        );

    // TODO: Do something to reset identifiers to how they were before sending them into the block
    stasisModule.currentFunction = undefined;
    return functionNode;
};

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
        // Unsure what id & expression are
        if (expression.async) throw "No async functions (yet)";
        if (expression.generator) throw "No generator functions (yet)";
        return compileFunction(expression, stasisModule);
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
                key: expression.computed // Might cause problems - Inconsistent with object templates
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
    throw `Unknown expression type: ${expression.type}`;
};

const compileStatementBlockBody = (statements, stasisModule) => {
    for (const statement of statements) {
        if (statement.type === "VariableDeclaration") {
            for (const declaration of statement.declarations)
                compileDeclaration(declaration, stasisModule);

            continue;
        }
        if (statement.type === "FunctionDeclaration") {
            compileFunction(statement, stasisModule);
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
        if (statement.type === "IfStatement") {
            console.log(statement);
            throw "NOT WORKING YET";
            continue;
        }
        throw `Unknown statement type: ${statement.type}`;
    }
};
const compileProgram = (moduleNode) => {
    const stasisModule = {
        nodes: [],
        statements: [],
        identifiers: {
            console: { type: "BuiltInObject", name: "console" },
            undefined: { type: "UndefinedValue" },
        },
    };
    if (moduleNode.type !== "Program") throw "Tried to compile a non-program!";
    compileStatementBlockBody(moduleNode.body, stasisModule);
    return stasisModule;
};

module.exports = (
    inputFile,
    { writeFile = true, forceCompile = false } = {}
) => {
    const { fullFile, fullFileName, stasisFile, stasisFileName } =
        getStasisFiles(inputFile);
    const checksum = hash(fullFile);
    if (!forceCompile && stasisFile) {
        const stasisProgram = JSON.parse(stasisFile);
        if (checksum === stasisProgram.checksum) {
            console.log(`Checksum was the same for ${stasisFileName}, reusing`);
            return stasisProgram;
        }
    }
    console.log(`Compiling ${stasisFileName}`);
    const compiledProgram = compileProgram(
        acorn.parse(fullFile, {
            ecmaVersion: 2020,
        })
    );
    compiledProgram.checksum = checksum;
    compiledProgram.fileName = fullFileName;
    if (writeFile)
        fs.writeFileSync(
            stasisFileName,
            JSON.stringify(compiledProgram, undefined, 4)
        );
    return compiledProgram;
};
