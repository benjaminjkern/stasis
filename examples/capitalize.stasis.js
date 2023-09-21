function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const a = {
    0: {
        type: "function",
        parameters: [{ stasisIndex: 1 }],
        uses: [],
        returns: { stasisIndex: 8 },
    },
    1: {
        uses: [
            {
                type: "MemberAccess",
                key: { rawValue: "charAt" },
                returnStasis: 2,
            },
            {
                type: "MemberAccess",
                key: { rawValue: "slice" },
                returnStasis: 3,
            },
        ],
    },
    2: {
        uses: [
            { type: "Callee", arguments: [{ rawValue: 0 }], returnStasis: 4 },
        ],
    },
    3: {
        uses: [
            { type: "Callee", arguments: [{ rawValue: 1 }], returnStasis: 5 },
        ],
    },
    4: {
        uses: [
            {
                type: "MemberAccess",
                key: { rawValue: "toUpperCase" },
                returnStasis: 6,
            },
        ],
    },
    5: {
        uses: [
            {
                type: "BinaryOperation",
                operator: "+",
                side: "right",
                otherSide: { stasisIndex: 7 },
                returnStasis: 8,
            },
        ],
    },
    6: {
        uses: [{ type: "Call", arguments: [], returnStasis: 7 }],
    },
    7: {
        uses: [
            {
                type: "BinaryOperation",
                operator: "+",
                side: "left",
                otherSide: { stasisIndex: 5 },
                returnStasis: 8,
            },
        ],
    },
    8: {},
};
