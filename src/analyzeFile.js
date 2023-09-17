const analyzeFunction = require("./analyze/analyzeFunction");
const parseFile = require("./parseFile");
const { inspect } = require("./utils");

const analyzeStatement = (statement) => {
    if (statement.type === "FunctionDeclaration")
        return analyzeFunction(statement);
    throw `Unsupported statement type: ${statement.type}`;
};

module.exports = (fileName) => {
    const program = parseFile(fileName);
    // inspect(program);
    // console.log(program.body);
    for (const statement of program.body) {
        analyzeStatement(statement);
        return "blarg";
    }
};
