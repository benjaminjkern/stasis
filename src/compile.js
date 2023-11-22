const acorn = require("acorn");
const fs = require("fs");

const { getStasisFiles } = require("./stasisUtils");
const { hash } = require("./utils");
const compileProgram = require("./compile/compileProgram");

const compileFile = (
    inputFile,
    { writeFile = true, forceCompile = false } = {}
) => {
    const { fullFile, fullFileName, stasisFile, stasisFileName } =
        getStasisFiles(inputFile);
    const checksum = hash(fullFile);
    if (!forceCompile && stasisFile) {
        const stasisProgram = JSON.parse(stasisFile);
        if (checksum === stasisProgram.checksum) {
            console.log(`Checksum was the same for ${stasisFileName}, reusing`);
            return stasisProgram;
        }
    }
    console.log(`Compiling ${fullFileName}`.green);
    let compiledProgram;
    try {
        compiledProgram = compileProgram(
            acorn.parse(fullFile, {
                ecmaVersion: 2020,
                sourceType: "module",
            }),
            checksum,
            fullFileName
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
        console.error(err.message.red);
        console.error("Failed to compile".bgRed);
        process.exit(1);
    }
    console.log("Finished compiling.".green);
    if (writeFile) {
        console.log(`Writing to Stasis file: ${stasisFileName}`.blue);
        fs.writeFileSync(
            stasisFileName,
            JSON.stringify(compiledProgram, undefined, 4)
        );
    }
    return compiledProgram;
};

module.exports = compileFile;
