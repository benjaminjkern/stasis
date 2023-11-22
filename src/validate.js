const evaluate = require("./validate/evaluate");

const validateModule = (stasisModule) => {
    console.log("Validating module".green);
    try {
        evaluate(stasisModule.nodes[0], {
            ...stasisModule,
            revisions: [],
            branches: [],
        });
        console.log("Module validated".green);
    } catch (err) {
        if (!err.message) {
            console.log(err);
            console.trace();
        }
        // TODO: Should have it check a hard-coded type instead of by a string inside of the error message
        else if (!err.message.includes("(Stasis")) console.error(err.stack);
        else console.error(err.message.red);
        console.log("Module failed validation".bgRed);
    }
};

module.exports = validateModule;
