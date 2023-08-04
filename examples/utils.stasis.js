module.exports = {
    capitalize: {
        arguments: [
            {
                uses: {
                    accesses: [
                        {
                            key: "charAt",
                            uses: {
                                accesses: [],
                                calls: [
                                    {
                                        passedInArguments: [{ valueOf: 0 }],
                                        uses: {
                                            accesses: [
                                                {
                                                    key: "toUpperCase",
                                                    uses: {
                                                        accesses: [],
                                                        calls: [
                                                            {
                                                                passedInArguments:
                                                                    [],
                                                                uses: {
                                                                    accesses:
                                                                        [],
                                                                    calls: [],
                                                                },
                                                                stasisIndex: 5,
                                                            },
                                                        ],
                                                    },
                                                    stasisIndex: 4,
                                                },
                                            ],
                                            calls: [],
                                        },
                                        stasisIndex: 3,
                                    },
                                ],
                            },
                            stasisIndex: 1,
                        },
                        {
                            key: "slice",
                            uses: {
                                accesses: [],
                                calls: [{ arguments: [{ valueOf: 1 }] }],
                            },
                            stasisIndex: 2,
                        },
                    ],
                    calls: [],
                },
                stasisIndex: 0,
            },
        ],
        scopeVariables: [],
        mutations: [],
        returns: {
            valueOf: {
                nodeType: "+",
                children: [
                    {
                        stasisIndex: 5,
                    },
                    {
                        stasisIndex: 2,
                    },
                ],
            },
        },
    },
};
