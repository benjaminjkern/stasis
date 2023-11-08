const util = require("util");
module.exports = {
    inspect: (object, print = true) => {
        const inspectedObjectString = util.inspect(object, false, null, false);
        if (print) console.log(inspectedObjectString);
        return inspectedObjectString;
    },
};
