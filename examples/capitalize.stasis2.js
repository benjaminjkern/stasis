const nodes = [
    {
        type: "Function",

        parameters: [{ nodeIndex: 2 }],
        returns: { nodeIndex: 3 },

        uses: [
            {
                nodeIndex: 1,
            },
        ],
    },
    {
        type: "Call",

        callee: { nodeIndex: 0 },
        arguments: [{ rawValue: "hello" }],

        uses: [],
    },
    {
        type: "FunctionArgument",
        function: { nodeIndex: 0 },

        uses: [
            {
                nodeIndex: 4,
            },
            {
                nodeIndex: 5,
            },
        ],
    },
    {
        type: "BinaryOperation",
        operator: "+",
        leftSide: { nodeIndex: 6 },
        rightSide: { nodeIndex: 7 },
        uses: [{}],
    },
];
