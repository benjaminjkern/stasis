module.exports = {
    getStasisNode: (stasisNode, stasisModule) => {
        if (stasisNode.stasisIndex === undefined) return stasisNode;
        return stasisModule.nodes[stasisNode.stasisIndex];
    },
};
