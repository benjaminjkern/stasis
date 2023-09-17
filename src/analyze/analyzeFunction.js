const { inspect } = require("../utils");

const getIdentifierUsage = (statementList, paramName) => {
    if (statementList) return;
};

module.exports = (functionDeclaration) => {
    inspect(functionDeclaration);
    return {
        params: functionDeclaration.params.map((param) => {
            // Wrap?
            // Default?
            const paramName = param.name;
            return getIdentifierUsage(functionDeclaration.body, paramName);
        }),
        scopeVariables,
        mutations,
        returns,
    };
};
