const getCodePositions = (acornNode) => ({
    codePosition: [acornNode.start, acornNode.end],
});

const addNode = (node, stasisModule, acornNode) => {
    const stasisIndex = stasisModule.nodes.length;
    node.resolvedStasisIndex = stasisIndex;
    node.codePosition = getCodePositions(acornNode).codePosition;
    stasisModule.nodes.push(node);
    return { stasisIndex };
};

module.exports = { getCodePositions, addNode };
