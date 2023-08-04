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

const errorCheckFunctionCall = (
    { arguments, scopeVariables, mutations, returns },
    passedInArguments
) => {};

const getKey = (object, key) => {
    if (!hasKey(object, key))
        stasisWarn(`Stasis item ${stasisIndex} does not have key`);
    return object[key];
};

const errorCheckVariable = ({ uses, stasisIndex }, stasisValue) => {
    const { accesses, calls } = uses;
    if (accesses.length) {
        if (valueCanBe(stasisValue, undefined) || valueCanBe(stasisValue, null))
            stasisError(
                `Cannot read properties of ${stasisValueToString(stasisValue)}!`
            );
        else {
            for (const { key, ...rest } of accesses) {
                errorCheckVariable(rest, getKey(value, key));
            }
        }
    }
    if (calls.length) {
        if (typeof value !== "function") stasisError("Not a function!");
        else {
            for (const { passedInArguments, ...rest } of calls) {
                // NEED TO FETCH THE FUNCTION DEFINITION HERE
                errorCheckFunctionCall(rest, getKey(value, key));
            }
        }
    }
};
