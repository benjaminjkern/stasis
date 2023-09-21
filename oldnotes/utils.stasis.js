capitalize :: (str :: { charAt :: 0 => { toUpperCase :: () => $0}, slice :: 1 => $1}) => types($0, $1)


const OPERATOR_TYPES = {
    '+': ($0, $1) => {
        const type0 = typeof $0;
        const type1 = typeof $1;
        if (type0 === 'bigint')
            return bigintCheck($1);
        if (type1 === 'bigint')
            return bigintCheck($0);
        if (type0 === 'bigint' && type1 === 'bigint') return 'bigint';
        if (type0 === 'number' && type1 === 'number') return 'number';
        if (type0 !== 'bigint' && type1 !== 'bigint') return 'string';
    }
}

const bigintCheck = ($1) => {
    const type1 = typeof $1;
    if ($1 === null || ['number', 'boolean', 'undefined'].includes(type1)) 
        throw 'TypeError: Cannot mix BigInt and other types, use explicit conversions';
    if (type1 === 'bigint') return 'bigint';
    return 'string';
}
types = ($0, $1) => 

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
