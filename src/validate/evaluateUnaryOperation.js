const { stasisIncompleteError } = require("../stasisUtils");
const evaluate = (...args) => require("./evaluate")(...args);

const evaluateUnaryOperation = (stasisNode, stasisModule) => {
    const argument = evaluate(stasisNode.argument, stasisModule);
    // Todo: This won't work with non-raw values if this ever happens
    switch (stasisNode.operator) {
        case "typeof":
            return {
                type: "StringValue",
                value: typeof argument.value,
            };
        case "!":
            return {
                type: "BooleanValue",
                value: !argument.value,
            };
    }
    throw stasisIncompleteError(
        `Unsupported operator: ${stasisNode.operator}`,
        stasisNode,
        stasisModule
    );
};

module.exports = evaluateUnaryOperation;
