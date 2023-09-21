const { inspect } = require("../utils");

const addToNodesList = (astNode, stasisNodes) => {
    switch (astNode.type) {
        case "Program":
            return astNode.body.forEach((statement) => {
                addToNodesList(statement, stasisNodes);
            });
        case "VariableDeclaration":
            return astNode.declarations.forEach((declaration) => {
                addToNodesList(declaration, stasisNodes);
            });
        case "VariableDeclarator":
            if (astNode.id.type === "Identifier") {
                stasisNodes.open.push({
                    name: astNode.id.name,
                    value: astNode.init,
                });
                return;
            }
            throw "Non identifiers not supported yet";
        case 'ExpressionStatement':
            addToNodesList(astNode.expression, stasisNodes);
        case 'CallExpression':
            addToNodesList(astNode.)
        default:
            console.log(astNode);
            throw `Unknown astNode type: ${astNode.type}`;
    }
};

module.exports = (program) => {
    inspect(program);
    const stasisNodes = { open: [], closed: [] };
    addToNodesList(program, stasisNodes);
};
