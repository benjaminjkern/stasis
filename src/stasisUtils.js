const fs = require("fs");
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
            throw "Stasis only works with .js files. If you want, you can also specify the name of the file before the '.js'.";
        const fullFileName = `${path}/${fileStart}.js`;
        if (!fs.existsSync(fullFileName))
            throw `File does not exist: ${fullFileName}`;
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
        throw `Unknown raw value type: ${typeof value}`;
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
        const rowNum = beforeSplitByLines.length;
        const colNum = beforeSplitByLines[beforeSplitByLines.length - 1].length;
        return `${stasisModule.fileName} (${rowNum}, ${colNum}): ${string}`;
    },
};
