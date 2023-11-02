module.exports = [
    {
        type: "Call",
        callee: { stasisIndex: 1 },
        arguments: [{ stasisIndex: 11 }],
        uses: [],
    },
    {
        type: "FunctionValue",
        parameters: [{ stasisIndex: 2 }],
        possibleReturns: [{ stasisIndex: 3 }],
        uses: [{ stasisIndex: 0 }],
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
        key: { stasisIndex: 16 },
        uses: [{ stasisIndex: 7 }],
    },
    {
        type: "MemberAccess",
        owner: { stasisIndex: 2 },
        key: { stasisIndex: 15 },
        uses: [{ stasisIndex: 6 }],
    },
    {
        type: "Call",
        callee: { stasisIndex: 5 },
        arguments: [{ stasisIndex: 14 }],
        uses: [{ stasisIndex: 10 }],
    },
    {
        type: "Call",
        callee: { stasisIndex: 4 },
        arguments: [{ stasisIndex: 13 }],
        uses: [{ stasisIndex: 8 }],
    },
    {
        type: "MemberAccess",
        owner: { stasisIndex: 7 },
        key: { stasisIndex: 12 },
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
    { type: "RawStringValue", value: "hello", uses: [{ stasisIndex: 0 }] },
    {
        type: "RawStringValue",
        value: "toUpperCase",
        uses: [{ stasisIndex: 8 }],
    },
    {
        type: "RawNumberValue",
        value: 0,
        uses: [{ stasisIndex: 7 }],
    },
    { type: "RawNumberValue", value: 1, uses: [{ stasisIndex: 6 }] },
    {
        type: "RawStringValue",
        value: "slice",
        uses: [{ stasisIndex: 5 }],
    },
    {
        type: "RawStringValue",
        value: "charAt",
        uses: [{ stasisIndex: 4 }],
    },
];
