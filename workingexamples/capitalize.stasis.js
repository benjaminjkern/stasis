module.exports = {
    nodes: [
        {
            type: "Call",
            callee: { stasisIndex: 1 },
            arguments: [{ type: "StringValue", value: "hello" }],
        },
        {
            type: "FunctionValue",
            parameters: [{ stasisIndex: 2 }],
            returns: { stasisIndex: 3 },
            mutations: [],
        },
        {
            type: "FunctionArgumentValue",
            spread: false,
        },
        {
            type: "BinaryOperation",
            operator: "+",
            leftSide: { stasisIndex: 9 },
            rightSide: { stasisIndex: 6 },
        },
        {
            type: "MemberAccess",
            owner: { stasisIndex: 2 },
            key: {
                type: "StringValue",
                value: "charAt",
            },
        },
        {
            type: "MemberAccess",
            owner: { stasisIndex: 2 },
            key: {
                type: "StringValue",
                value: "slice",
            },
        },
        {
            // right side
            type: "Call",
            callee: { stasisIndex: 5 },
            arguments: [{ type: "NumberValue", value: 1 }],
        },
        {
            type: "Call",
            callee: { stasisIndex: 4 },
            arguments: [
                {
                    type: "NumberValue",
                    value: 0,
                },
            ],
        },
        {
            type: "MemberAccess",
            owner: { stasisIndex: 7 },
            key: {
                type: "StringValue",
                value: "toUpperCase",
            },
        },
        {
            // left side
            type: "Call",
            callee: { stasisIndex: 8 },
            arguments: [],
        },
        {
            type: "Call",
            callee: { stasisIndex: 1 },
            arguments: [{ stasisIndex: 11 }],
        },
        {
            type: "ObjectValue",
            value: { hello: { type: "NumberValue", value: 5 } },
        },
    ],
    statements: [{ stasisIndex: 0 }, { stasisIndex: 10 }],
};
