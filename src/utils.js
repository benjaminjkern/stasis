const util = require("util");
const { createHash } = require("crypto");
const DEBUG = false;

module.exports = {
    inspect: (object, print = true) => {
        const inspectedObjectString = util.inspect(object, false, null, false);
        if (print) console.log(inspectedObjectString);
        return inspectedObjectString;
    },
    hash: (string) => createHash("sha256").update(string).digest("hex"),
    debugCalls:
        (func, name, includeArgs) =>
        (...args) => {
            if (DEBUG)
                console.log(
                    name,
                    "(",
                    ...args.map((a, i) =>
                        !includeArgs || includeArgs[i] ? a : ""
                    ),
                    ")"
                );
            return func(...args);
        },
};
