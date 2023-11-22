const { stasisIncompleteError } = require("../stasisUtils");
const compileExpression = (...args) => require("./compileExpression")(...args);
const compileStatement = (...args) => require("./compileStatement")(...args);
const { getCodePositions, addNode } = require("./compileUtils");

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

    functionValue.runs = (
        functionDeclaration.body.type === "BlockStatement"
            ? compileStatement
            : compileExpression
    )(functionDeclaration.body, stasisModule);

    // TODO: Do something to reset identifiers to how they were before sending them into the block
    stasisModule.currentFunction = undefined;
    return functionNode;
};

module.exports = compileFunction;
