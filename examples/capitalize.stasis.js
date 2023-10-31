const scope = [
    {
        type: "Function",
        scopeReturnIndex: 6,
        scope: [
            {
                type: "MemberAccess",
                owner: { argumentIndex: 0 },
                key: { rawValue: "charAt" },
            },
            {
                type: "MemberAccess",
                owner: { argumentIndex: 0 },
                key: { rawValue: "slice" },
            },
            {
                type: "Call",
                callee: { scopeIndex: 0 },
                arguments: [{ rawValue: 0 }],
            },
            {
                type: "Call",
                callee: { scopeIndex: 1 },
                arguments: [{ rawValue: 1 }],
            },
            {
                type: "MemberAccess",
                owner: { scopeIndex: 2 },
                key: { rawValue: "toUpperCase" },
            },
            { type: "Call", callee: { scopeIndex: 4 }, arguments: [] },
            {
                type: "BinaryOperation",
                operator: "+",
                leftSide: { scopeIndex: 5 },
                rightSide: { scopeIndex: 3 },
            },
        ],
    },
    {
        type: "Call",
        callee: { scopeIndex: 0 },
        arguments: [{ rawValue: "hello" }],
    },
];
