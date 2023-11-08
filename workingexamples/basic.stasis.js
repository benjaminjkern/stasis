module.exports = {
    nodes: [
        { type: "NumberValue", value: 5 },
        { type: "StringValue", value: "log" },
        {
            type: "MemberAccess",
            owner: { builtIn: true, name: "console" },
            key: { stasisIndex: 1 },
        },
        {
            type: "Call",
            callee: { stasisIndex: 2 },
            arguments: [{ stasisIndex: 0 }],
        },
    ],
    statements: [{ stasisIndex: 3 }],
    identifiers: {
        console: { builtIn: true, name: "console" },
        a: { stasisIndex: 0 },
    },
};
