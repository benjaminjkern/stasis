module.exports = {
    nodes: [
        {
            type: "NumberValue",
            value: 5,
        },
        {
            type: "Call",
            callee: { stasisIndex: 0 },
            arguments: [{ stasisIndex: 0 }],
        },
    ],
    statements: [{ stasisIndex: 1 }],
};
