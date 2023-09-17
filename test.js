const acorn = require("acorn");
const fs = require("fs");
const { inspect } = require("./src/utils");
inspect(acorn.parse("a += 5", { ecmaVersion: 2020 }));
