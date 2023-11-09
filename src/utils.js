const util = require("util");
const { createHash } = require("crypto");

module.exports = {
    inspect: (object, print = true) => {
        const inspectedObjectString = util.inspect(object, false, null, false);
        if (print) console.log(inspectedObjectString);
        return inspectedObjectString;
    },
    hash: (string) => createHash("sha256").update(string).digest("hex"),
};
