const compile = require("./src/compile");
const validate = require("./src/validate");
require("colors");

const stasisCli = (...[node, index, inputFile]) => {
    if (!inputFile) {
        console.log("Usage: node index [file]");
        return;
    }
    const stasisModule = compile(inputFile, { forceCompile: true });
    validate(stasisModule);
};
stasisCli(...process.argv);
