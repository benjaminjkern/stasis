const {
    makeStasisValue,
    stasisValidationError,
    stasisIncompleteError,
} = require("./stasisUtils");
const { debugCalls } = require("./utils");
require("colors");

const RAW_VALUE_TYPES = [
    "StringValue",
    "UndefinedType",
    "NullType",
    "NumberValue",
    "BooleanValue",
    "ObjectValue",
    "FunctionValue",
];

const createCallContext = (parameters, args, stasisModule) => {
    const nodes = [...stasisModule.nodes];
    const copiedArgs = [...args];
    for (const parameter of parameters) {
        // TODO: Not accounting for non-spreads after spreads or defaults
        const parameterNode = nodes[parameter.stasisIndex];
        nodes[parameter.stasisIndex] = parameterNode.spread
            ? copiedArgs.splice(0)
            : copiedArgs.shift();
    }
    return { ...stasisModule, nodes };
};

const createContext = (replaceWithList, stasisModule) => {
    const nodes = [...stasisModule.nodes];
    for (const [stasisIndex, value] of replaceWithList)
        nodes[stasisIndex] = value;

    return { ...stasisModule, nodes };
};

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

const evaluate = debugCalls(
    (stasisNode, passedInStasisModule) => {
        if (stasisNode.stasisIndex !== undefined) {
            // Iterate in reverse order through revisions
            for (
                let i = passedInStasisModule.revisions.length - 1;
                i >= 0;
                i--
            ) {
                const { assignee, evaluatedNewValue } =
                    passedInStasisModule.revisions[i];
                if (assignee.stasisIndex === stasisNode.stasisIndex)
                    return evaluatedNewValue;
            }

            return evaluate(
                passedInStasisModule.nodes[stasisNode.stasisIndex],
                passedInStasisModule
            );
        }

        if (RAW_VALUE_TYPES.includes(stasisNode.type)) return stasisNode;

        if (stasisNode.lastSeenRevisions !== undefined) {
            const revisionsSinceLastSeen = passedInStasisModule.revisions.slice(
                stasisNode.lastSeenRevisions
            );
            if (revisionsSinceLastSeen.length === 0)
                throw stasisValidationError(
                    `This will result in an infinite loop!`,
                    stasisNode,
                    passedInStasisModule
                );
        }

        const stasisModule = createContext(
            [
                [
                    stasisNode.resolvedStasisIndex,
                    {
                        ...stasisNode,
                        lastSeenRevisions:
                            passedInStasisModule.revisions.length,
                    },
                ],
            ],
            passedInStasisModule
        );

        // Need to Consolidate multiple possible values into one
        // if (stasisNode.type === "MultiplePossibleValues") {
        //     const possibleValues = [];
        //     for (const node of stasisNode.possibleValues) {
        //         const evaluatedNode = evaluate(node, stasisModule);
        //         if (evaluatedNode.type === "MultiplePossibleValues")
        //             // Recurse
        //             possibleValues.push(
        //                 ...evaluatedNode.possibleValues.map((value) =>
        //                     evaluate(value, stasisModule)
        //                 )
        //             );
        //         else possibleValues.push(evaluatedNode);
        //     }
        //     return { type: "MultiplePossibleValues", possibleValues };
        // }

        if (stasisNode.type === "Conditional") {
            const test = evaluate(stasisNode.test, stasisModule);

            // TODO: Throw a warning ? If not explicitly casted to a boolean
            if (test.value)
                return evaluate(stasisNode.consequent, stasisModule);

            if (stasisNode.alternate)
                return evaluate(stasisNode.alternate, stasisModule);

            return {
                type: "UndefinedType",
            };
        }

        if (stasisNode.type === "SetValue") {
            const newValue = evaluate(stasisNode.newValue, stasisModule);
            stasisModule.revisions.push({
                assignee: stasisNode.assignee,
                newValue: stasisNode.newValue,
                evaluatedNewValue: newValue,
            });
            return newValue;
        }

        if (stasisNode.type === "StatementBlock") {
            // TODO: Having all statement blocks return feels weird but I feel like its good
            for (const statement of stasisNode.statements) {
                const result = evaluate(statement, stasisModule);
                if (result.type === "ReturnedValue") return result.value;
                // TODO: continue & break & yield
            }

            return {
                type: "UndefinedType",
            };
        }

        if (stasisNode.type === "ReturnStatement")
            return {
                type: "ReturnedValue",
                value: evaluate(stasisNode.value, stasisModule),
            };

        if (stasisNode.type === "ObjectTemplate")
            return {
                type: "ObjectValue",
                value: stasisNode.values.reduce((p, { key, value }) => {
                    const evaluatedKey = evaluate(key, stasisModule);
                    if (
                        ["NumberValue", "StringValue"].includes(
                            evaluatedKey.type
                        )
                    )
                        return {
                            ...p,
                            [evaluatedKey.value]: evaluate(value, stasisModule),
                        };
                    throw stasisIncompleteError(
                        `Cannot deal with key type: ${evaluatedKey.type}!`,
                        stasisNode,
                        stasisModule
                    );
                }, {}),
            };

        if (stasisNode.type === "Call") {
            const callee = evaluate(stasisNode.callee, stasisModule);
            const evaluatedArguments = stasisNode.arguments.map((arg) =>
                evaluate(arg, stasisModule)
            );
            if (callee.type === "FunctionValue")
                // TODO: Need to account for spread parameters & default parameters
                // TODO: Need to do mutations
                // TODO: Need to account for multiple types and input-dependent types

                // TODO: Return possible return types to see if it causes issues then dive deeper
                try {
                    return evaluate(
                        callee.runs,
                        createCallContext(
                            callee.parameters,
                            evaluatedArguments,
                            stasisModule
                        )
                    );
                } catch (err) {
                    if (!err.message) {
                        console.trace();
                        throw new Error(err);
                    }
                    // TODO: Should have it check a hard-coded type instead of by a string inside of the error message
                    if (!err.message.includes("(Stasis")) {
                        console.error(err.stack);
                        throw err;
                    }

                    throw stasisValidationError(
                        `Calling will result in an error:\n${err}`,
                        stasisNode,
                        stasisModule
                    );
                }

            if (callee.type === "BuiltInFunctionValue") {
                const value = callee.value(
                    ...evaluatedArguments.map((arg) => arg.value)
                );
                return makeStasisValue(value);
            }

            throw stasisValidationError(
                `Callee must be a function value! Received type: ${callee.type}`,
                stasisNode,
                stasisModule
            );
        }

        if (stasisNode.type === "MemberAccess")
            return evaluateMemberAccess(stasisNode, stasisModule);

        if (stasisNode.type === "BinaryOperation") {
            const leftSide = evaluate(stasisNode.leftSide, stasisModule);
            const rightSide = evaluate(stasisNode.rightSide, stasisModule);
            // Todo: This won't work with non-raw values if this ever happens
            switch (stasisNode.operator) {
                case "+":
                    if (
                        !["StringValue", "NumberValue"].includes(
                            leftSide.type
                        ) ||
                        !["StringValue", "NumberValue"].includes(rightSide.type)
                    )
                        stasisValidationError(
                            `Warning: + operator is really only designed for numbers and strings`,
                            stasisNode,
                            stasisModule
                        );
                    return makeStasisValue(leftSide.value + rightSide.value);
                case "!=":
                    stasisValidationError(
                        `Warning: Try to use !== instead of != operator (See more: https://eslint.org/docs/latest/rules/eqeqeq)`,
                        stasisNode,
                        stasisModule
                    );
                    // eslint-disable-next-line eqeqeq
                    return makeStasisValue(leftSide.value != rightSide.value);
                case "<":
                    if (
                        leftSide.type !== "NumberValue" ||
                        rightSide.type !== "NumberValue"
                    )
                        stasisValidationError(
                            `Warning: < operator is really only designed for numbers`,
                            stasisNode,
                            stasisModule
                        );

                    return makeStasisValue(leftSide.value < rightSide.value);
                case "&&":
                    // TODO: Decide if this should warn the user
                    // if (
                    //     leftSide.type !== "BooleanValue" ||
                    //     rightSide.type !== "BooleanValue"
                    // )
                    //     stasisValidationError(
                    //         `Warning: && operator is really only designed for booleans`,
                    //         stasisNode,
                    //         stasisModule
                    //     );

                    return makeStasisValue(leftSide.value && rightSide.value);
            }
            throw stasisIncompleteError(
                `Unsupported operator: ${stasisNode.operator}`,
                stasisNode,
                stasisModule
            );
        }
        if (stasisNode.type === "UnaryOperation") {
            const argument = evaluate(stasisNode.argument, stasisModule);
            // Todo: This won't work with non-raw values if this ever happens
            switch (stasisNode.operator) {
                case "typeof":
                    return {
                        type: "StringValue",
                        value: typeof argument.value,
                    };
                case "!":
                    return {
                        type: "BooleanValue",
                        value: !argument.value,
                    };
            }
            throw stasisIncompleteError(
                `Unsupported operator: ${stasisNode.operator}`,
                stasisNode,
                stasisModule
            );
        }
        if (stasisNode.type === "BuiltInObject") {
            if (stasisNode.name === "console")
                return { type: "ObjectValue", value: console };

            if (stasisNode.name === "isNaN")
                return { type: "BuiltInFunctionValue", value: isNaN };
            if (stasisNode.name === "parseFloat")
                return { type: "BuiltInFunctionValue", value: parseFloat };
            throw stasisIncompleteError(
                `Unknown builtin name: ${stasisNode.name}`,
                stasisNode,
                stasisModule
            );
        }
        if (stasisNode.type !== undefined)
            throw stasisIncompleteError(
                `Unsupported type: ${stasisNode.type}`,
                stasisNode,
                stasisModule
            );
        // TODO: Unsure if defaulting to raw types is the way to go
        return makeStasisValue(stasisNode);
    },
    "evaluate",
    [true]
);

module.exports = (stasisModule) => {
    console.log("Validating module");
    try {
        evaluate(stasisModule.nodes[0], { ...stasisModule, revisions: [] });
        console.log("Module validated");
    } catch (err) {
        if (!err.message) console.trace();
        // TODO: Should have it check a hard-coded type instead of by a string inside of the error message
        else if (!err.message.includes("(Stasis")) console.error(err.stack);
        else console.error(err.message.red);
        console.log("Module failed validation");
    }
};
