const errorCheckFunctionCall = (
    { arguments, scopeVariables, mutations, returns },
    passedInArguments
) => {};

const getKey = (stasisValue, key) => {
    if (valueCanBe(stasisValue, undefined) || valueCanBe(stasisValue, null))
        stasisError(
            `Cannot read properties of ${stasisValueToString(stasisValue)}!`
        );
    if (!hasKey(stasisValue, key))
        stasisWarn(`Stasis item ${stasisIndex} does not have key`);
    return stasisValue[key];
};

const getReturnValue = (stasisValue, passedInArguments) => {
    if (valueCanBeNot(stasisValue, "function")) stasisError("Not a function!");
};

// Note: Need to include ?. and ?.()
const errorCheckVariable = ({ uses, stasisIndex }, stasisValue) => {
    const { accesses, calls } = uses;

    for (const { key, ...rest } of accesses) {
        errorCheckVariable(rest, getKey(stasisValue, key));
    }
    for (const { passedInArguments, ...rest } of calls) {
        errorCheckVariable(
            rest,
            getReturnValue(stasisValue, passedInArguments)
        );
    }
};

/**
 * Check if the function itself will throw any errors
 */
const errorCheckFunctionDef = ({ arguments, scopeVariables }) => {
    for (const argument of arguments) {
        errorCheckVariable(argument, stasisAny());
    }
};
