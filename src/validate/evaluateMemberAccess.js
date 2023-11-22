const {
    stasisValidationError,
    stasisIncompleteError,
} = require("../stasisUtils");
const evaluate = (...args) => require("./evaluate")(...args);

const evaluateMemberAccess = (stasisNode, stasisModule) => {
    const owner = evaluate(stasisNode.owner, stasisModule);

    if (owner.type === "MultiplePossibleValues")
        return {
            type: "MultiplePossibleValues",
            possibleValues: owner.possibleValues.map((value) =>
                evaluate(
                    {
                        type: "MemberAccess",
                        owner: value,
                        key: stasisNode.key,
                    },
                    stasisModule
                )
            ),
        };

    const key = evaluate(stasisNode.key, stasisModule);

    if (key.type === "MultiplePossibleValues")
        return {
            type: "MultiplePossibleValues",
            possibleValues: key.possibleValues.map((value) =>
                evaluate(
                    {
                        type: "MemberAccess",
                        owner: stasisNode.owner,
                        key: value,
                    },
                    stasisModule
                )
            ),
        };

    switch (key.type) {
        case "BuiltInFunctionValue":
        case "FunctionValue":
            stasisValidationError(
                `Warning: This will result in a member access with a function value as a key, which gets turned into a string. This is possible, but probably not what you want!`,
                stasisNode,
                stasisModule
            );
            break;
        case "ObjectValue":
            stasisValidationError(
                `Warning: This will result in a member access with an object value as a key, which gets turned into a string. This is possible, but probably not what you want!`,
                stasisNode,
                stasisModule
            );
            break;
        // TODO: Fill out
    }

    if (owner.type === "UndefinedValue")
        throw stasisValidationError(
            "Cannot perform a member access with the owner set to undefined",
            stasisNode,
            stasisModule
        );

    if (owner.type === "NullValue")
        throw stasisValidationError(
            "Cannot perform a member access with the owner set to null",
            stasisNode,
            stasisModule
        );

    if (owner.type === "StringValue") {
        if (key.value === "charAt")
            return {
                type: "BuiltInFunctionValue",
                value: owner.value.charAt,
            };
        if (key.value === "toUpperCase")
            return {
                type: "BuiltInFunctionValue",
                value: owner.value.toUpperCase,
            };
        if (key.value === "slice")
            return {
                type: "BuiltInFunctionValue",
                value: owner.value.slice,
            };
        // Todo: Iterate through possible keys for strings
        stasisValidationError(
            `Warning: key "${key.value}" not in string protoype, returning undefined`,
            stasisNode,
            stasisModule
        );
        return { type: "UndefinedValue" };
    }
    if (owner.type === "NumberValue") {
        // Todo: Iterate through possible keys for number
        stasisValidationError(
            `Warning: key "${key.value}" not in number prototype, returning undefined`,
            stasisNode,
            stasisModule
        );
        return { type: "UndefinedValue" };
    }
    if (owner.type === "BooleanValue") {
        // Todo: Iterate through possible keys for boolean
        stasisValidationError(
            `Warning: key "${key.value}" not in boolean prototype, returning undefined`,
            stasisNode,
            stasisModule
        );
        return { type: "UndefinedValue" };
    }
    if (owner.type === "ObjectValue") {
        if (key.value in owner.value)
            return evaluate(owner.value[key.value], stasisModule);
        stasisValidationError(
            `Warning: key "${key.value}" not in object or object prototype, returning undefined`,
            stasisNode,
            stasisModule
        );
        return { type: "UndefinedValue" };
    }
    throw stasisIncompleteError(
        `Member Access unsupported owner type: ${owner.type}`,
        stasisNode,
        stasisModule
    );
};

module.exports = evaluateMemberAccess;
