const util = require("util");
module.exports = {
    inspect: (object) => console.log(util.inspect(object, true, null, true)),
};
