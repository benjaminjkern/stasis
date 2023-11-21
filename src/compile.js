const acorn = require("acorn");
const fs = require("fs");
const {
    getStasisNode,
    getStasisFiles,
    makeStasisValue,
    stasisCompilationError,
    stasisIncompleteError,
    getCodePositions,
} = require("./stasisUtils");
const { hash } = require("./utils");

const addNode = (node, stasisModule, acornNode) => {
    const stasisIndex = stasisModule.nodes.length;
    node.resolvedStasisIndex = stasisIndex;
    node.codePosition = getCodePositions(acornNode).codePosition;
    stasisModule.nodes.push(node);
    return { stasisIndex };
};

const compileDeclaration = (declaration, stasisModule) => {
    if (declaration.type === "VariableDeclarator") {
        if (declaration.id.type !== "Identifier")
            throw stasisIncompleteError(
                "Cannot yet deal with VariableDeclarators with non-identifier ids!",
                getCodePositions(declaration),
                stasisModule
            );
        stasisModule.identifiers[declaration.id.name] = compileExpression(
            declaration.init,
            stasisModule
        );
        return;
    }
    throw stasisIncompleteError(
        `Unknown declaration type: ${declaration.type}`,
        getCodePositions(declaration),
        stasisModule
    );
};

const compileFunction = (functionDeclaration, stasisModule) => {
    const functionValue = {
        type: "FunctionValue",
        parameters: [],
        mutations: [], // unused
    };
    const functionNode = addNode(
        functionValue,
        stasisModule,
        functionDeclaration
    );

    if (functionDeclaration.id) {
        if (functionDeclaration.id.type !== "Identifier")
            throw stasisIncompleteError(
                "Cannot yet deal with FunctionDeclarations with non-identifier ids!",
                getCodePositions(functionDeclaration),
                stasisModule
            );
        stasisModule.identifiers[functionDeclaration.id.name] = functionNode;
    }
    for (const param of functionDeclaration.params) {
        if (param.type !== "Identifier")
            throw stasisIncompleteError(
                "Cannot yet deal with FunctionDeclarations with non-identifier params!",
                getCodePositions(param),
                stasisModule
            );
        const paramNode = addNode(
            { type: "FunctionArgumentValue" },
            stasisModule,
            param
        );
        stasisModule.identifiers[param.name] = paramNode;
        functionValue.parameters.push(paramNode);
    }
    stasisModule.currentFunction = functionNode; // TODO: Subject to change when I figure out how return stuff will work

    // TODO: Unsure I am hitting all possibilties here
    functionValue.runs = (
        functionDeclaration.body.type === "BlockStatement"
            ? compileStatement
            : compileExpression
    )(functionDeclaration.body, stasisModule);

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
    throw stasisIncompleteError(
        `Unknown expression type: ${expression.type}`,
        getCodePositions(expression),
        stasisModule
    );
};

const compileStatement = (statement, stasisModule) => {
    if (statement.type === "EmptyStatement")
        // TODO: This might be a bad way of doing this but I think it's fine
        return addNode(
            {
                type: "StatementBlock",
                statements: [],
            },
            stasisModule,
            statement
        );
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
                "Return statement not inside of a function (Acorn should have caught this)",
                getCodePositions(statement),
                stasisModule
            );
        // TODO: Decide how to do return statements
        // getStasisNode(stasisModule.currentFunction, stasisModule).returns.push(
        //     compileExpression(statement.argument, stasisModule)
        // );
        return addNode(
            {
                type: "ReturnStatement",
                value: compileExpression(statement.argument, stasisModule),
            },
            stasisModule,
            statement
        );
    }
    if (statement.type === "IfStatement") {
        const test = compileExpression(statement.test, stasisModule);
        const consequent = compileStatement(statement.consequent, stasisModule);
        const alternate = statement.alternate
            ? compileStatement(statement.alternate, stasisModule)
            : null;
        return addNode(
            { type: "Conditional", test, consequent, alternate },
            stasisModule,
            statement
        );
    }
    if (statement.type === "WhileStatement") {
        const test = compileExpression(statement.test, stasisModule);
        const body = compileStatement(statement.body, stasisModule);
        const whileLoop = { type: "Conditional", test, alternate: null };
        const whileNode = addNode(whileLoop, stasisModule, statement);
        whileLoop.consequent = addNode(
            {
                type: "StatementBlock",
                statements: [body, whileNode],
            },
            stasisModule,
            statement.body
        );
        return whileNode;
    }

    throw stasisIncompleteError(
        `Unknown statement type: ${statement.type}`,
        getCodePositions(statement),
        stasisModule
    );
};

const compileProgram = (moduleNode, checksum, fileName) => {
    const stasisModule = {
        nodes: [],
        identifiers: {
            console: { type: "BuiltInObject", name: "console" },
            undefined: { type: "UndefinedValue" },
            isNaN: { type: "BuiltInObject", name: "isNaN" },
            parseFloat: { type: "BuiltInObject", name: "parseFloat" },
        },
        checksum,
        fileName,
    };

    if (moduleNode.type !== "Program")
        throw stasisCompilationError(
            "Tried to compile a non-program!",
            getCodePositions(moduleNode),
            stasisModule
        );
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
    console.log(`Compiling ${fullFileName}`);
    let compiledProgram;
    try {
        compiledProgram = compileProgram(
            acorn.parse(fullFile, {
                ecmaVersion: 2020,
                sourceType: "module",
            }),
            checksum,
            fullFileName
        );
    } catch (err) {
        if (!err.message) {
            console.trace();
            throw new Error(err);
        }
        // TODO: Should have it check a hard-coded type instead of by a string inside of the error message
        if (!err.message.includes("(Stasis")) {
            console.error(err.stack);
            throw err;
        }
        console.error(err.message.red);
        process.exit(1);
    }
    console.log("Finished compiling.");
    if (writeFile) {
        console.log(`Writing to Stasis file: ${stasisFileName.green}`);
        fs.writeFileSync(
            stasisFileName,
            JSON.stringify(compiledProgram, undefined, 4)
        );
    }
    return compiledProgram;
};
