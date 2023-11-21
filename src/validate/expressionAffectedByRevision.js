const { stasisIncompleteError } = require("../stasisUtils");

const expressionAffectedByRevision = (expression, revision, stasisModule) => {
    if (expression.stasisIndex !== undefined) {
        if (expression.stasisIndex === revision.assignee.stasisIndex)
            return true;
        // TODO: Consolidate this with evaluate(), not sure if this should be checking revisions

        return expressionAffectedByRevision(
            stasisModule.nodes[expression.stasisIndex],
            revision,
            stasisModule
        );
    }

    if (expression.type === "BinaryOperation")
        return (
            expressionAffectedByRevision(
                expression.leftSide,
                revision,
                stasisModule
            ) ||
            expressionAffectedByRevision(
                expression.rightSide,
                revision,
                stasisModule
            )
        );

    // Constant values
    if (expression.type === "NumberValue") return false;
    if (expression.type === "StringValue") return false;
    if (expression.type === "BooleanValue") return false;

    throw stasisIncompleteError(
        `Cannot detect expression affected by revision for type: ${expression.type}`,
        expression,
        stasisModule
    );
};

module.exports = expressionAffectedByRevision;
