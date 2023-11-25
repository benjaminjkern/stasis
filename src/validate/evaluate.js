const {
    makeStasisValue,
    stasisValidationError,
    stasisIncompleteError,
} = require("../stasisUtils");

// Setup delayed requires
const evaluateCall = (...args) => require("./evaluateCall")(...args);
const evaluateMemberAccess = (...args) =>
    require("./evaluateMemberAccess")(...args);
const evaluateUnaryOperation = (...args) =>
    require("./evaluateUnaryOperation")(...args);
const evaluateBinaryOperation = (...args) =>
    require("./evaluateBinaryOperation")(...args);

const evaluateBuiltIn = require("./evaluateBuiltIn");
const expressionAffectedByRevision = require("./expressionAffectedByRevision");

const { RAW_VALUE_TYPES, createContext } = require("./validateUtils");

const evaluate = (stasisNode, passedInStasisModule) => {
    if (stasisNode.stasisIndex !== undefined) {
        // Iterate in reverse order through revisions
        for (let i = passedInStasisModule.revisions.length - 1; i >= 0; i--) {
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

    // Detect recursion / infinite loops
    if (stasisNode.lastSeenState !== undefined) {
        const branchesSinceLastSeen = passedInStasisModule.branches.slice(
            stasisNode.lastSeenState.branches
        );
        if (branchesSinceLastSeen.length === 0)
            throw stasisValidationError(
                `This will result in an infinite loop (No branches since last call)!`,
                stasisNode,
                passedInStasisModule
            );

        const revisionsSinceLastSeen = passedInStasisModule.revisions.slice(
            stasisNode.lastSeenState.revisions
        );
        if (revisionsSinceLastSeen.length === 0)
            throw stasisValidationError(
                `This will result in an infinite loop (No revisions since last call)!`,
                stasisNode,
                passedInStasisModule
            );

        const affectedBranchesSinceLastSeen = branchesSinceLastSeen.filter(
            ({ test }) =>
                revisionsSinceLastSeen.some((revision) =>
                    expressionAffectedByRevision(
                        test,
                        revision,
                        passedInStasisModule
                    )
                )
        );
        if (affectedBranchesSinceLastSeen.length === 0)
            throw stasisValidationError(
                `This will result in an infinite loop (No AFFECTED branches since last call)!`,
                stasisNode,
                passedInStasisModule
            );
        // TODO: Test for POSSIBLY CHANGED branches since last call
        console.log(stasisNode);
        // TODO: Test for branch chains (I think if there is a double-recursive method it wont catch that right now, although that doesnt matter for now with while loops)

        // stasisValidationError(
        //     `Warning: Stasis currently has no way of knowing how long this loop will run for! Keep an eye on it!`,
        //     stasisNode,
        //     passedInStasisModule
        // );
    }

    const stasisModule = createContext(
        [
            [
                stasisNode.resolvedStasisIndex,
                {
                    ...stasisNode,
                    lastSeenState: {
                        revisions: passedInStasisModule.revisions.length,
                        branches: passedInStasisModule.branches.length,
                    },
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

        stasisModule.branches.push({
            test: stasisNode.test,
            result: test.value,
        });

        // TODO: Throw a warning ? If not explicitly casted to a boolean
        if (test.value) return evaluate(stasisNode.consequent, stasisModule);

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
                if (["NumberValue", "StringValue"].includes(evaluatedKey.type))
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

    if (stasisNode.type === "Call")
        return evaluateCall(stasisNode, stasisModule);

    if (stasisNode.type === "MemberAccess")
        return evaluateMemberAccess(stasisNode, stasisModule);

    if (stasisNode.type === "BinaryOperation")
        return evaluateBinaryOperation(stasisNode, stasisModule);

    if (stasisNode.type === "UnaryOperation")
        return evaluateUnaryOperation(stasisNode, stasisModule);

    if (stasisNode.type === "BuiltInObject")
        return evaluateBuiltIn(stasisNode, stasisModule);

    if (stasisNode.type !== undefined)
        throw stasisIncompleteError(
            `Unsupported type: ${stasisNode.type}`,
            stasisNode,
            stasisModule
        );
    // TODO: Unsure if defaulting to raw types is the way to go
    return makeStasisValue(stasisNode);
};

module.exports = evaluate;
