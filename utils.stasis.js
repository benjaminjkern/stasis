module.exports = {
    capitalize: {
        arguments: [
            {
                uses: {
                    accesses: [
                        {
                            key: 'charAt',
                            uses: {
                                accesses: [],
                                calls: [
                                    {
                                        arguments: [{ valueOf: 0 }],
                                        uses: {
                                            accesses: [
                                                {
                                                    key: 'toUpperCase',
                                                    uses: {
                                                        accesses: [],
                                                        calls: [
                                                            {
                                                                arguments: [],
                                                                uses: {
                                                                    accesses: [],
                                                                    calls: []
                                                                },
                                                                stasisIndex: 4
                                                            }
                                                        ]
                                                    },
                                                    stasisIndex: 3
                                                }
                                            ],
                                            calls: []
                                        },
                                        stasisIndex: 2
                                    }
                                ]
                            },
                            stasisIndex: 1
                        },
                        {
                            key: 'slice',
                            uses: {
                                accesses: [],
                                calls: [
                                    { arguments: [{ valueOf: 1 }] }
                                ]
                            },
                            stasisIndex: 5
                        }
                    ],
                    calls: []
                },
                stasisIndex: 0
            }
        ],
        returns: {
            valueOf: {
                nodeType: '+',
                children: [
                    {
                        stasisIndex: 1,
                    },
                    {
                        stasisIndex: 5
                    }
                ]
            }
        },
        errorCheck: (...a) => {
            if (a.length > )
        },
        warningCheck: (...a) => {
            if
        }
    }
};