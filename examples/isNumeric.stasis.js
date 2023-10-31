const a = {
    0: {
        type: "function",
        uses: [],
        parameters: [{ stasisIndex: 1 }],
        // returns: ,
    },
    1: {
        uses: [
            { type: "UnaryOperation", operation: "typeof", returnStasis: 2 },
            {
                type: "CallArgument",
                callee: { stasisIndex: 3 },
                argumentIndex: 0,
                returnStasis: 4,
            },
            {
                type: "CallArgument",
                callee: { stasisIndex: 5 },
                argumentIndex: 0,
                returnStasis: 6,
            },
        ],
    },
    2: {
        uses: [
            {
                type: "BinaryOperation",
                operator: "!=",
                side: "left",
                otherSide: { rawValue: "string" },
                returnStasis: 7,
            },
        ],
    },
    3: {
        uses: [
            {
                type: "Call",
                arguments: [{ stasisIndex: 1 }],
                returnStasis: 8,
            },
            {
                type: "Call",
                arguments: [{ stasisIndex: 9 }],
                returnStasis: 10,
            },
        ],
    },
    4: {
        uses: [{ type: "UnaryOperator", operator: "!", returnStasis: 11 }],
    },
    5: {
        uses: [
            {
                type: "Call",
                arguments: [{ stasisIndex: 1 }],
                returnStasis: 9,
            },
        ],
    },
    6: {},
};
