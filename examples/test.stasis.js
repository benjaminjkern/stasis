module.exports = {
    nodes: [
        {
            type: "NumberValue",
            value: 5,
        },
        {
            type: "ObjectValue",
            value: console,
            // values: [{ key: { stasisIndex: 3 }, value: { stasisIndex: 5 } }],
        },
        {
            type: "MemberAccess",
            owner: { stasisIndex: 1 },
            key: { stasisIndex: 3 },
        },
        { type: "StringValue", value: "log" },
        {
            type: "Call",
            callee: { stasisIndex: 2 },
            arguments: [{ stasisIndex: 0 }],
        },
    ],
    statements: [{ stasisIndex: 4 }],
};
