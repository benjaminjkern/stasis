const { stasisIncompleteError } = require("../stasisUtils");
const compileExpression = require("./compileExpression");
const { getCodePositions } = require("./compileUtils");

const compileDeclaration = (declaration, stasisModule) => {
    if (declaration.type === "VariableDeclarator") {
        if (declaration.id.type !== "Identifier")
            throw stasisIncompleteError(
                "Cannot yet deal with VariableDeclarators with non-identifier ids!",
                getCodePositions(declaration),
                stasisModule
            );
        stasisModule.identifiers[declaration.id.name] = compileExpression(
            declaration.init,
            stasisModule
        );
        return;
    }
    throw stasisIncompleteError(
        `Unknown declaration type: ${declaration.type}`,
        getCodePositions(declaration),
        stasisModule
    );
};
module.exports = compileDeclaration;
