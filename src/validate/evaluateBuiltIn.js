const { stasisIncompleteError } = require("../stasisUtils");

const evaluateBuiltIn = (stasisNode, stasisModule) => {
    if (stasisNode.name === "console")
        return { type: "ObjectValue", value: console };

    if (stasisNode.name === "isNaN")
        return { type: "BuiltInFunctionValue", value: isNaN };
    if (stasisNode.name === "parseFloat")
        return { type: "BuiltInFunctionValue", value: parseFloat };
    throw stasisIncompleteError(
        `Unknown builtin name: ${stasisNode.name}`,
        stasisNode,
        stasisModule
    );
};

module.exports = evaluateBuiltIn;
