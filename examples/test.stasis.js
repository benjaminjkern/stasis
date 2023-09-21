module.exports = [
    {
        name: "a", // Should be unused
        initialValue: { raw: 5 },
        uses: [
            {
                type: "Call",
                arguments: [{ stasisIndex: 0 }],
                returnStasis: 1,
            },
            {
                type: "Callee",
                callee: { stasisIndex: 0 },
                argumentIndex: 0,
                returnStasis: 1,
            },
        ],
    },
    {
        uses: [],
    },
];
