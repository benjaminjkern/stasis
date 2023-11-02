var result = {
    type: Call,
    callee: capitalize,
    arguments: [{ type: RawValue, value: "hello" }],
};

var capitalize = {
    type: FunctionValue,
    parameters: [str],
    possibleReturns: [returnValue],
};
var str = {
    type: FunctionArgumentValue,
    function: capitalize,
    uses: [charAt, slice],
};
var returnValue = {
    type: FunctionReturnValue,
    function: capitalize,
    returnValue: concatenate,
};

var charAt = {
    type: MemberAccess,
    owner: str,
    key: {
        type: RawValue,
        value: "charAt",
    },
    uses: [charAt0],
};
var slice = {
    type: MemberAccess,
    owner: str,
    key: {
        type: RawValue,
        value: "slice",
    },
};
var restOfString = {
    type: Call,
    callee: slice,
    arguments: [{ type: RawValue, value: 1 }],
    uses: [concatenate],
};
var charAt0 = {
    type: Call,
    callee: charAt,
    arguments: [
        {
            type: RawValue,
            value: 0,
        },
    ],
    uses: [toUpperCase],
};
var toUpperCase = {
    type: MemberAccess,
    owner: charAt0,
    key: { type: RawValue, value: "toUpperCase" },
    uses: [firstLetterCapitalized],
};
var firstLetterCapitalized = {
    type: Call,
    callee: toUpperCase,
    arguments: [],
    uses: [concatenate],
};
var concatenate = {
    type: BinaryOperation,
    oeprator: "+",
    leftSide: firstLetterCapitalized,
    rightSide: restOfString,
    uses: [returnValue],
};
