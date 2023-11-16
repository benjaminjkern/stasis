const fs = require("fs");
const PRINT_ERRORS = true;
const LINE_CONTEXT = 2;

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
        // These two shouldnt ever be called in compilation
        if (typeof value === "function")
            return { type: "BuiltInFunctionValue", value };
        if (typeof value === "undefined") return { type: "UndefinedValue" };

        console.error(value);
        throw new Error(`Unknown raw value type: ${typeof value}`);
    },
    stasisError: (string, stasisNode, stasisModule) => {
        const fullFile = fs.readFileSync(stasisModule.fileName, "utf8");

        const [before, during, after] = [
            fullFile.slice(0, stasisNode.codePosition[0]),
            fullFile.slice(
                stasisNode.codePosition[0],
                stasisNode.codePosition[1]
            ),
            fullFile.slice(stasisNode.codePosition[1]),
        ];
        const beforeSplitByLines = before.split("\n");
        const duringSplitByLines = during.split("\n");
        const afterSplitByLines = after.split("\n");
        afterSplitByLines.push("(End of file)".blue);

        const rowNum = beforeSplitByLines.length;
        const colNum = beforeSplitByLines[beforeSplitByLines.length - 1].length;
        if (PRINT_ERRORS) {
            const MAX_LINE_NUMBER_LENGTH = (
                rowNum +
                duringSplitByLines.length +
                LINE_CONTEXT -
                1
            ).toString().length;
            const niceLineNum = (lineNum) =>
                lineNum.toString().padStart(MAX_LINE_NUMBER_LENGTH);

            console.log(string.yellow);
            console.log(
                beforeSplitByLines
                    .slice(-1 - LINE_CONTEXT, -1)
                    .map(
                        (line, i) =>
                            `${niceLineNum(
                                rowNum - LINE_CONTEXT + i
                            )} | ${line}`
                    )
                    .join("\n")
            );
            console.log(
                `${niceLineNum(rowNum)} ${">".yellow} ${
                    beforeSplitByLines.slice(-1)[0]
                }${duringSplitByLines
                    .map((line, i) =>
                        i === 0
                            ? line.red
                            : `${niceLineNum(rowNum + 1 + i)} ${">".yellow} ${
                                  line.red
                              }`
                    )
                    .join("\n")}${afterSplitByLines[0]}`
            );
            console.log(
                afterSplitByLines
                    .slice(1, 1 + LINE_CONTEXT)
                    .map(
                        (line, i) =>
                            `${niceLineNum(
                                rowNum + duringSplitByLines.length + i
                            )} | ${line}`
                    )
                    .join("\n")
            );
        }
        return new Error(
            `${stasisModule.fileName} (${rowNum}, ${colNum}): ${string}`
        ); // Do not need to throw this
    },
};
