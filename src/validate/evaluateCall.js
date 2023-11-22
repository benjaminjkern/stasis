const { stasisValidationError, makeStasisValue } = require("../stasisUtils");
const evaluate = (...args) => require("./evaluate")(...args);

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

const evaluateCall = (stasisNode, stasisModule) => {
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
};

module.exports = evaluateCall;
