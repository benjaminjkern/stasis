const fs = require("fs");
const PRINT_ERRORS = true;
const LINE_CONTEXT = 2;

const stasisError = (string, stasisNode, stasisModule) => {
    const fullFile = fs.readFileSync(stasisModule.fileName, "utf8");

    const [before, during, after] = [
        fullFile.slice(0, stasisNode.codePosition[0]),
        fullFile.slice(stasisNode.codePosition[0], stasisNode.codePosition[1]),
        fullFile.slice(stasisNode.codePosition[1]),
    ];
    const beforeSplitByLines = before.split("\n");
    const duringSplitByLines = during.split("\n");
    const afterSplitByLines = after.split("\n");

    const totalLines = fullFile.split("\n").length;
    const rowNum = beforeSplitByLines.length;
    const colNum = beforeSplitByLines[beforeSplitByLines.length - 1].length;
    if (PRINT_ERRORS) {
        const MAX_LINE_NUMBER_LENGTH = (
            rowNum +
            duringSplitByLines.length +
            LINE_CONTEXT -
            1
        ).toString().length;
        const hyphenString = Array(MAX_LINE_NUMBER_LENGTH + 1)
            .fill("-")
            .join("");
        const niceLineNum = (lineNum) =>
            lineNum.toString().padStart(MAX_LINE_NUMBER_LENGTH);

        console.log(string.yellow);
        for (
            let r = rowNum - LINE_CONTEXT;
            r <= rowNum + LINE_CONTEXT + duringSplitByLines.length - 1;
            r++
        ) {
            if (r < 0 || r > totalLines + 1) continue;

            if (r === 0) console.log(`${hyphenString}| (Start of file)`.blue);
            else if (r === totalLines + 1)
                console.log(`${hyphenString}| (End of file)`.blue);
            // duringSplitByLines
            else if (r < rowNum)
                console.log(
                    `${niceLineNum(r)} | ${
                        beforeSplitByLines[
                            r - beforeSplitByLines.length - 1 + rowNum
                        ]
                    }`
                );
            else if (r === rowNum)
                console.log(
                    `${niceLineNum(r)} ${">".yellow} ${
                        beforeSplitByLines[beforeSplitByLines.length - 1]
                    }${duringSplitByLines[0].red}${
                        duringSplitByLines.length === 1
                            ? afterSplitByLines[0]
                            : ""
                    }`
                );
            else if (r <= rowNum + duringSplitByLines.length - 1)
                console.log(
                    `${niceLineNum(r)} ${">".yellow} ${
                        duringSplitByLines[r - rowNum].red
                    }${
                        r === rowNum + duringSplitByLines.length - 1
                            ? afterSplitByLines[0]
                            : ""
                    }`
                );
            else if (r > rowNum)
                console.log(
                    `${niceLineNum(r)} | ${
                        afterSplitByLines[
                            r - rowNum - duringSplitByLines.length + 1
                        ]
                    }`
                );
        }
    }
    return new Error(
        `${stasisModule.fileName} (${rowNum}, ${colNum}): ${string}`
    ); // Do not need to throw this
};

module.exports = {
    getStasisNode: (stasisNode, stasisModule) => {
        if (stasisNode.stasisIndex === undefined) return stasisNode;
        return stasisModule.nodes[stasisNode.stasisIndex];
    },
    getStasisFiles: (inputFile) => {
        const fullPath = inputFile.split("/");
        const file = fullPath.slice(-1)[0];
        const path = fullPath.slice(0, -1).join("/");
        const [fileStart, fileEnding, ...rest] = file.split(".");
        if (rest.length || (fileEnding && fileEnding !== "js"))
            throw new Error(
                "Stasis only works with .js files. If you want, you can also specify the name of the file before the '.js'."
            );
        const fullFileName = `${path}/${fileStart}.js`;
        if (!fs.existsSync(fullFileName))
            throw new Error(`File does not exist: ${fullFileName}`);
        const stasisFileName = `${path}/${fileStart}.stasis.json`;
        return {
            fullFileName,
            fullFile: fs.readFileSync(fullFileName),
            stasisFileName,
            stasisFile:
                fs.existsSync(stasisFileName) &&
                fs.readFileSync(stasisFileName),
        };
    },
    makeStasisValue: (value) => {
        if (typeof value === "number") return { type: "NumberValue", value };
        if (typeof value === "string") return { type: "StringValue", value };
        if (typeof value === "boolean") return { type: "BooleanValue", value };
        // These two shouldnt ever be called in compilation
        if (typeof value === "function")
            return { type: "BuiltInFunctionValue", value };
        if (typeof value === "undefined") return { type: "UndefinedValue" };

        console.error(value);
        throw new Error(`Unknown raw value type: ${typeof value}`);
    },

    stasisIncompleteError: (string, ...args) => {
        return stasisError(`(Stasis isn't complete yet) ${string}`, ...args);
    },
    stasisCompilationError: (string, ...args) => {
        return stasisError(`(Stasis Compilation Error) ${string}`, ...args);
    },
    stasisValidationError: (string, ...args) => {
        return stasisError(`(Stasis Validation Error) ${string}`, ...args);
    },
};
