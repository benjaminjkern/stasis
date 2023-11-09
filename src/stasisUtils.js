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
};
