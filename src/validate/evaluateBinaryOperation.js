const {
    stasisIncompleteError,
    makeStasisValue,
    stasisValidationError,
} = require("../stasisUtils");
const evaluate = (...args) => require("./evaluate")(...args);

const evaluateBinaryOperation = (stasisNode, stasisModule) => {
    const leftSide = evaluate(stasisNode.leftSide, stasisModule);
    const rightSide = evaluate(stasisNode.rightSide, stasisModule);
    // Todo: This won't work with non-raw values if this ever happens
    switch (stasisNode.operator) {
        case "+":
            if (
                !["StringValue", "NumberValue"].includes(leftSide.type) ||
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
};

module.exports = evaluateBinaryOperation;
