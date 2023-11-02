module.exports = [
    {
        type: "Call",
        callee: { stasisIndex: 1 },
        arguments: [{ type: "RawValue", value: "hello" }],
    },
    {
        type: "FunctionValue",
        parameters: [{ stasisIndex: 2 }],
        possibleReturns: [{ stasisIndex: 3 }],
    },
    {
        type: "FunctionArgumentValue",
        function: { stasisIndex: 1 },
        uses: [{ stasisIndex: 4 }, { stasisIndex: 5 }],
    },
    {
        type: "FunctionReturnValue",
        function: { stasisIndex: 1 },
        returnValue: { stasisIndex: 10 },
    },
    {
        type: "MemberAccess",
        owner: { stasisIndex: 2 },
        key: {
            type: "RawValue",
            value: "charAt",
        },
        uses: [{ stasisIndex: 7 }],
    },
    {
        type: "MemberAccess",
        owner: { stasisIndex: 2 },
        key: {
            type: "RawValue",
            value: "slice",
        },
    },
    {
        type: "Call",
        callee: { stasisIndex: 5 },
        arguments: [{ type: "RawValue", value: 1 }],
        uses: [{ stasisIndex: 10 }],
    },
    {
        type: "Call",
        callee: { stasisIndex: 4 },
        arguments: [
            {
                type: "RawValue",
                value: 0,
            },
        ],
        uses: [{ stasisIndex: 8 }],
    },
    {
        type: "MemberAccess",
        owner: { stasisIndex: 7 },
        key: { type: "RawValue", value: "toUpperCase" },
        uses: [{ stasisIndex: 9 }],
    },
    {
        type: "Call",
        callee: { stasisIndex: 8 },
        arguments: [],
        uses: [{ stasisIndex: 10 }],
    },
    {
        type: "BinaryOperation",
        oeprator: "+",
        leftSide: { stasisIndex: 9 },
        rightSide: { stasisIndex: 6 },
        uses: [{ stasisIndex: 3 }],
    },
];
