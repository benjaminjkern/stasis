const acorn = require("acorn");
const fs = require("fs");
module.exports = (fileName) =>
    acorn.parse(fs.readFileSync(fileName), { ecmaVersion: 2020 });
