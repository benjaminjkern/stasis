const CONSOLE_OBJECT = {
    log: {
        type: "FunctionValue",
        parameters: [
            {
                type: "FunctionArgumentValue",
                spread: true,
            },
        ],
        returns: { type: "UndefinedValue" },
        value: console.log,
    },
};

module.exports = {
    nodes: [
        {
            type: "NumberValue",
            value: 5,
        },
        {
            type: "ObjectValue",
            value: CONSOLE_OBJECT,
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
        {
            type: "MemberAccess",
            owner: { stasisIndex: 4 },
            key: { stasisIndex: 6 },
        },
        { type: "StringValue", value: "hello" },
    ],
    statements: [{ stasisIndex: 5 }],
};
