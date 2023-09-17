# Implemented COMPLETELY
BlockStatement
ReturnStatement
- Might want to take another look at this for checking for code that conditionally runs
BinaryExpression
- Need to add individual stuff for operators
LogicalExpression
- Need to add individual stuff for operators
CallExpression
- Might want to track if its used as an argument but I think it's probably not necessary until I do linking
MemberExpression
- Might want to track if its used as an property but I think it's probably not necessary until I do linking
Identifier
- Probably fine here
Literal
- Probably fine here
IfStatement
- Might want to track if its used as an property but I think it's probably not necessary until I do linking
- Not fully sure that just attaching the condition to the object is the best way to do this
UnaryExpression
- No idea what prefix is
TemplateLiteral
- Keep track of it being inside of a string template??
TemplateElement
- Almost certainly not used in this case (Except if I want to look at exact values)
VariableDeclaration
- Do something with the 'kind' (var vs let vs const)
VariableDeclarator
- Need to track usage with resulting value
ExpressionStatement
- Not much to do here I think??
AssignmentExpression
ObjectExpression
- Maybe should pass back that they are being put in to an object?? But also the property can deal with that


# Implemented partially

ArrayExpression
- Need to account for case of multiple uses inside of an array literal that is then used somewhere else:
```
const a = b => [b, b][0];
{
    params: [
        {name: b,
        uses: [
            {
                type: 'inArray',
                index: 0,
                uses: [
                    {
                        type: 'member',
                        property: 0
                    }
                ]
            }
        ]}
    ]
}
```
Property
NewExpression
ArrowFunctionExpression

# Not implemented

Program
DebuggerStatement
DoWhileStatement
SwitchCase
SwitchStatement
ThrowStatement
CatchClause
TryStatement
WhileStatement
WithStatement
EmptyStatement
LabeledStatement
ForStatement
StaticBlock
ExportAllDeclaration
ExportDefaultDeclaration
ExportNamedDeclaration
ExportSpecifier
ImportDeclaration
ImportSpecifier
ImportDefaultSpecifier
ImportNamespaceSpecifier
SpreadElement
RestElement
ArrayPattern
AssignmentPattern
SequenceExpression
ConditionalExpression
Super
ThisExpression
ImportExpression
MetaProperty
FunctionExpression
PrivateIdentifier
YieldExpression
AwaitExpression
BreakStatement
ContinueStatement
ForInStatement
ForOfStatement
FunctionDeclaration
FunctionExpression
ClassBody
ClassDeclaration
ClassExpression
MethodDefinition
PropertyDefinition
UpdateExpression
UpdateExpression
ChainExpression
TaggedTemplateExpression
SequenceExpression
ParenthesizedExpression
ObjectPattern
