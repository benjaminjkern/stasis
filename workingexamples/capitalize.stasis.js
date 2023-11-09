module.exports = {
  nodes: [
    {
      type: 'FunctionValue',
      parameters: [ { stasisIndex: 1 } ],
      returns: [ { stasisIndex: 13 } ],
      mutations: []
    },
    { type: 'FunctionArgumentValue' },
    { type: 'StringValue', value: 'charAt' },
    {
      type: 'MemberAccess',
      owner: { stasisIndex: 1 },
      key: { stasisIndex: 2 }
    },
    { type: 'NumberValue', value: 0 },
    {
      type: 'Call',
      callee: { stasisIndex: 3 },
      arguments: [ { stasisIndex: 4 } ]
    },
    { type: 'StringValue', value: 'toUpperCase' },
    {
      type: 'MemberAccess',
      owner: { stasisIndex: 5 },
      key: { stasisIndex: 6 }
    },
    { type: 'Call', callee: { stasisIndex: 7 }, arguments: [] },
    { type: 'StringValue', value: 'slice' },
    {
      type: 'MemberAccess',
      owner: { stasisIndex: 1 },
      key: { stasisIndex: 9 }
    },
    { type: 'NumberValue', value: 1 },
    {
      type: 'Call',
      callee: { stasisIndex: 10 },
      arguments: [ { stasisIndex: 11 } ]
    },
    {
      type: 'BinaryOperation',
      operator: '+',
      leftSide: { stasisIndex: 8 },
      rightSide: { stasisIndex: 12 }
    },
    { type: 'StringValue', value: 'hello' },
    {
      type: 'Call',
      callee: { stasisIndex: 0 },
      arguments: [ { stasisIndex: 14 } ]
    },
    { type: 'StringValue', value: 'a' },
    { type: 'NumberValue', value: 5 },
    {
      type: 'ObjectTemplate',
      values: [ { key: { stasisIndex: 16 }, value: { stasisIndex: 17 } } ]
    },
    {
      type: 'Call',
      callee: { stasisIndex: 0 },
      arguments: [ { stasisIndex: 18 } ]
    }
  ],
  statements: [ { stasisIndex: 15 }, { stasisIndex: 19 } ],
  identifiers: {
    console: { builtIn: true, name: 'console' },
    str: { stasisIndex: 1 },
    capitalize: { stasisIndex: 0 }
  },
  currentFunction: undefined
}