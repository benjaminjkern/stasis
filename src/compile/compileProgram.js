const { stasisCompilationError } = require("../stasisUtils");
const compileStatement = require("./compileStatement");
const { getCodePositions } = require("./compileUtils");

const compileProgram = (moduleNode, checksum, fileName) => {
    const stasisModule = {
        nodes: [],
        identifiers: {
            console: { type: "BuiltInObject", name: "console" },
            undefined: { type: "UndefinedValue" },
            isNaN: { type: "BuiltInObject", name: "isNaN" },
            parseFloat: { type: "BuiltInObject", name: "parseFloat" },
        },
        checksum,
        fileName,
    };

    if (moduleNode.type !== "Program")
        throw stasisCompilationError(
            "Tried to compile a non-program!",
            getCodePositions(moduleNode),
            stasisModule
        );
    compileStatement(moduleNode, stasisModule);
    return stasisModule;
};

module.exports = compileProgram;
