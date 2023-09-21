yarn run v1.22.19
$ node index.js
Node {
  type: 'Program',
  start: 0,
  end: 18,
  body: [
    Node {
      type: 'VariableDeclaration',
      start: 0,
      end: 12,
      declarations: [
        Node {
          type: 'VariableDeclarator',
          start: 6,
          end: 11,
          id: Node { type: 'Identifier', start: 6, end: 7, name: 'a' },
          init: Node {
            type: 'Literal',
            start: 10,
            end: 11,
            value: 5,
            raw: '5'
          }
        }
      ],
      kind: 'const'
    },
    Node {
      type: 'ExpressionStatement',
      start: 13,
      end: 17,
      expression: Node {
        type: 'CallExpression',
        start: 13,
        end: 16,
        callee: Node { type: 'Identifier', start: 13, end: 14, name: 'a' },
        arguments: [],
        optional: false
      }
    }
  ],
  sourceType: 'script'
}
Node {
  type: 'ExpressionStatement',
  start: 13,
  end: 17,
  expression: Node {
    type: 'CallExpression',
    start: 13,
    end: 16,
    callee: Node { type: 'Identifier', start: 13, end: 14, name: 'a' },
    arguments: [],
    optional: false
  }
}
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
