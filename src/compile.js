const acorn = require("acorn");
const fs = require("fs");
const {
    getStasisNode,
    getStasisFiles,
    makeStasisValue,
    stasisCompilationError,
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
            throw new Error(
                "Cannot yet deal with VariableDeclarators with non-identifier ids!"
            );
        stasisModule.identifiers[declaration.id.name] = compileExpression(
            declaration.init,
            stasisModule
        );
        return;
    }
    throw new Error(`Unknown declaration type: ${declaration.type}`);
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
            throw new Error(
                "Cannot yet deal with FunctionDeclarations with non-identifier ids!"
            );
        stasisModule.identifiers[functionDeclaration.id.name] = functionNode;
    }
    for (const param of functionDeclaration.params) {
        if (param.type !== "Identifier")
            throw new Error(
                "Cannot yet deal with FunctionDeclarations with non-identifier params!"
            );
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
        functionValue.runs = compileStatement(
            functionDeclaration.body,
            stasisModule
        );
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
                throw new Error(
                    `Cannot deal with object property type: ${prop.type}`
                );
            if (prop.method)
                throw new Error(`Cannot deal with object property methods!`);
            if (prop.kind !== "init")
                throw new Error(
                    `Cannot deal with object property kind other than init! (IDK what this is at the moment)`
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
        if (expression.async) throw new Error("No async functions (yet)");
        if (expression.generator)
            throw new Error("No generator functions (yet)");
        return compileFunction(expression, stasisModule);
    }
    if (expression.type === "Identifier") {
        if (!stasisModule.identifiers[expression.name])
            throw new Error(`Undefined identifier: ${expression.name}`);

        return stasisModule.identifiers[expression.name];
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
    throw new Error(`Unknown expression type: ${expression.type}`);
};

const compileStatement = (statement, stasisModule) => {
    if (statement.type === "Program" || statement.type === "BlockStatement") {
        const statementBlock = {
            type: "StatementBlock",
            statements: [],
        };
        const statementBlockNode = addNode(
            statementBlock,
            stasisModule,
            statement
        ); // Do it before compiling anything else so that the program is at the top of the list
        statement.body.forEach((bodyStatement) => {
            const compiledStatement = compileStatement(
                bodyStatement,
                stasisModule
            );
            if (!compiledStatement) return; // TODO: returning and/or skipping over null here might not be great
            statementBlock.statements.push(compiledStatement);
        });
        return statementBlockNode;
    }
    if (statement.type === "VariableDeclaration") {
        for (const declaration of statement.declarations)
            compileDeclaration(declaration, stasisModule);

        console.log("DECLARATION STATEMENTS NOT SET YET");
        return;
    }
    if (statement.type === "FunctionDeclaration") {
        compileFunction(statement, stasisModule);

        console.log("DECLARATION STATEMENTS NOT SET YET");
        return;
    }
    if (statement.type === "ExpressionStatement")
        return compileExpression(statement.expression, stasisModule);

    if (statement.type === "ReturnStatement") {
        if (!stasisModule.currentFunction)
            throw stasisCompilationError(
                "Return statement not inside of a function (Acorn should have caught this)"
            );
        getStasisNode(stasisModule.currentFunction, stasisModule).returns.push(
            compileExpression(statement.argument, stasisModule)
        );

        console.log("RETURN STATEMENTS NOT WORKING CORRECTLY YET");
        return;
    }
    if (statement.type === "IfStatement") {
        const test = compileExpression(statement.test, stasisModule);
        const consequent = compileStatement(statement.consequent, stasisModule);
        const alternate = statement.consequent
            ? compileStatement(statement.consequent, stasisModule)
            : null;
        return addNode(
            { type: "Conditional", test, consequent, alternate },
            stasisModule,
            statement
        );
    }
    throw new Error(`Unknown statement type: ${statement.type}`);
};

const compileProgram = (moduleNode) => {
    const stasisModule = {
        nodes: [],
        identifiers: {
            console: { type: "BuiltInObject", name: "console" },
            undefined: { type: "UndefinedValue" },
            isNaN: { type: "BuiltInObject", name: "isNaN" },
            parseFloat: { type: "BuiltInObject", name: "parseFloat" },
        },
    };
    if (moduleNode.type !== "Program")
        throw new Error("Tried to compile a non-program!");
    compileStatement(moduleNode, stasisModule);
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
