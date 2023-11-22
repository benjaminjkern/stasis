const {
    stasisIncompleteError,
    stasisCompilationError,
} = require("../stasisUtils");
const compileDeclaration = require("./compileDeclaration");
const compileExpression = require("./compileExpression");
const compileFunction = (...args) => require("./compileFunction")(...args);

const { addNode, getCodePositions } = require("./compileUtils");

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

module.exports = compileStatement;
