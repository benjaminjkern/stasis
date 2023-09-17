yarn run v1.22.19
$ node index.js
{
  params: [
    {
      paramName: 'str',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 254,
            end: 260,
            name: 'charAt'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'Literal',
                  start: 261,
                  end: 262,
                  value: 0,
                  raw: '0'
                }
              ],
              uses: [
                {
                  type: 'MemberAccess',
                  optional: false,
                  property: Node {
                    type: 'Identifier',
                    start: 264,
                    end: 275,
                    name: 'toUpperCase'
                  },
                  uses: [
                    {
                      type: 'Call',
                      optional: false,
                      arguments: [],
                      uses: [
                        {
                          type: 'BinaryOperation',
                          operation: '+',
                          side: 'left',
                          otherSide: Node {
                            type: 'CallExpression',
                            start: 280,
                            end: 292,
                            callee: Node {
                              type: 'MemberExpression',
                              start: 280,
                              end: 289,
                              object: Node {
                                type: 'Identifier',
                                start: 280,
                                end: 283,
                                name: 'str'
                              },
                              property: Node {
                                type: 'Identifier',
                                start: 284,
                                end: 289,
                                name: 'slice'
                              },
                              computed: false,
                              optional: false
                            },
                            arguments: [
                              Node {
                                type: 'Literal',
                                start: 290,
                                end: 291,
                                value: 1,
                                raw: '1'
                              }
                            ],
                            optional: false
                          },
                          uses: [ { match: true } ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 284,
            end: 289,
            name: 'slice'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'Literal',
                  start: 290,
                  end: 291,
                  value: 1,
                  raw: '1'
                }
              ],
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '+',
                  side: 'right',
                  otherSide: Node {
                    type: 'CallExpression',
                    start: 250,
                    end: 277,
                    callee: Node {
                      type: 'MemberExpression',
                      start: 250,
                      end: 275,
                      object: Node {
                        type: 'CallExpression',
                        start: 250,
                        end: 263,
                        callee: Node {
                          type: 'MemberExpression',
                          start: 250,
                          end: 260,
                          object: Node {
                            type: 'Identifier',
                            start: 250,
                            end: 253,
                            name: 'str'
                          },
                          property: Node {
                            type: 'Identifier',
                            start: 254,
                            end: 260,
                            name: 'charAt'
                          },
                          computed: false,
                          optional: false
                        },
                        arguments: [
                          Node {
                            type: 'Literal',
                            start: 261,
                            end: 262,
                            value: 0,
                            raw: '0'
                          }
                        ],
                        optional: false
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 264,
                        end: 275,
                        name: 'toUpperCase'
                      },
                      computed: false,
                      optional: false
                    },
                    arguments: [],
                    optional: false
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
{
  params: [
    {
      paramName: 'str',
      uses: [
        {
          type: 'UnaryOperation',
          operation: 'typeof',
          prefix: true,
          uses: [
            {
              type: 'BinaryOperation',
              operation: '!=',
              side: 'left',
              otherSide: Node {
                type: 'Literal',
                start: 504,
                end: 512,
                value: 'string',
                raw: '"string"'
              },
              uses: [ { match: true } ]
            }
          ]
        },
        {
          type: 'UnaryOperation',
          operation: '!',
          prefix: true,
          uses: [
            {
              type: 'BinaryOperation',
              operation: '&&',
              side: 'left',
              otherSide: Node {
                type: 'UnaryExpression',
                start: 554,
                end: 577,
                operator: '!',
                prefix: true,
                argument: Node {
                  type: 'CallExpression',
                  start: 555,
                  end: 577,
                  callee: Node {
                    type: 'Identifier',
                    start: 555,
                    end: 560,
                    name: 'isNaN'
                  },
                  arguments: [
                    Node {
                      type: 'CallExpression',
                      start: 561,
                      end: 576,
                      callee: Node {
                        type: 'Identifier',
                        start: 561,
                        end: 571,
                        name: 'parseFloat'
                      },
                      arguments: [
                        Node {
                          type: 'Identifier',
                          start: 572,
                          end: 575,
                          name: 'str'
                        }
                      ],
                      optional: false
                    }
                  ],
                  optional: false
                }
              },
              uses: [ { match: true } ]
            }
          ]
        },
        {
          type: 'UnaryOperation',
          operation: '!',
          prefix: true,
          uses: [
            {
              type: 'BinaryOperation',
              operation: '&&',
              side: 'right',
              otherSide: Node {
                type: 'UnaryExpression',
                start: 539,
                end: 550,
                operator: '!',
                prefix: true,
                argument: Node {
                  type: 'CallExpression',
                  start: 540,
                  end: 550,
                  callee: Node {
                    type: 'Identifier',
                    start: 540,
                    end: 545,
                    name: 'isNaN'
                  },
                  arguments: [
                    Node {
                      type: 'Identifier',
                      start: 546,
                      end: 549,
                      name: 'str'
                    }
                  ],
                  optional: false
                }
              },
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    }
  ]
}
{
  params: [
    {
      paramName: 'num',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '*',
          side: 'left',
          otherSide: Node {
            type: 'BinaryExpression',
            start: 844,
            end: 851,
            left: Node {
              type: 'Literal',
              start: 844,
              end: 846,
              value: 10,
              raw: '10'
            },
            operator: '**',
            right: Node {
              type: 'Identifier',
              start: 850,
              end: 851,
              name: 'n'
            }
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '/',
              side: 'left',
              otherSide: Node {
                type: 'BinaryExpression',
                start: 857,
                end: 864,
                left: Node {
                  type: 'Literal',
                  start: 857,
                  end: 859,
                  value: 10,
                  raw: '10'
                },
                operator: '**',
                right: Node {
                  type: 'Identifier',
                  start: 863,
                  end: 864,
                  name: 'n'
                }
              },
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    },
    {
      paramName: 'n',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '**',
          side: 'right',
          otherSide: Node {
            type: 'Literal',
            start: 844,
            end: 846,
            value: 10,
            raw: '10'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '*',
              side: 'right',
              otherSide: Node {
                type: 'Identifier',
                start: 837,
                end: 840,
                name: 'num'
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '/',
                  side: 'left',
                  otherSide: Node {
                    type: 'BinaryExpression',
                    start: 857,
                    end: 864,
                    left: Node {
                      type: 'Literal',
                      start: 857,
                      end: 859,
                      value: 10,
                      raw: '10'
                    },
                    operator: '**',
                    right: Node {
                      type: 'Identifier',
                      start: 863,
                      end: 864,
                      name: 'n'
                    }
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        },
        {
          type: 'BinaryOperation',
          operation: '**',
          side: 'right',
          otherSide: Node {
            type: 'Literal',
            start: 857,
            end: 859,
            value: 10,
            raw: '10'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '/',
              side: 'right',
              otherSide: Node {
                type: 'CallExpression',
                start: 826,
                end: 853,
                callee: Node {
                  type: 'MemberExpression',
                  start: 826,
                  end: 836,
                  object: Node {
                    type: 'Identifier',
                    start: 826,
                    end: 830,
                    name: 'Math'
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 831,
                    end: 836,
                    name: 'round'
                  },
                  computed: false,
                  optional: false
                },
                arguments: [
                  Node {
                    type: 'BinaryExpression',
                    start: 837,
                    end: 852,
                    left: Node {
                      type: 'Identifier',
                      start: 837,
                      end: 840,
                      name: 'num'
                    },
                    operator: '*',
                    right: Node {
                      type: 'BinaryExpression',
                      start: 844,
                      end: 851,
                      left: Node {
                        type: 'Literal',
                        start: 844,
                        end: 846,
                        value: 10,
                        raw: '10'
                      },
                      operator: '**',
                      right: Node {
                        type: 'Identifier',
                        start: 850,
                        end: 851,
                        name: 'n'
                      }
                    }
                  }
                ],
                optional: false
              },
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    }
  ]
}
{
  params: [
    { paramName: undefined, uses: [] },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    {
      paramName: 'num',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 1411,
            end: 1419,
            name: 'toString'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [],
              uses: [
                {
                  type: 'MemberAccess',
                  optional: false,
                  property: Node {
                    type: 'Identifier',
                    start: 1422,
                    end: 1427,
                    name: 'split'
                  },
                  uses: [
                    {
                      type: 'Call',
                      optional: false,
                      arguments: [
                        Node {
                          type: 'Literal',
                          start: 1428,
                          end: 1431,
                          value: '.',
                          raw: '"."'
                        }
                      ],
                      uses: [ { match: true } ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
getIdentifierUsage Node {
  type: 'ArrowFunctionExpression',
  start: 1784,
  end: 1841,
  id: null,
  expression: false,
  generator: false,
  async: false,
  params: [ Node { type: 'Identifier', start: 1785, end: 1789, name: 'item' } ],
  body: Node {
    type: 'BlockStatement',
    start: 1794,
    end: 1841,
    body: [ [Node] ]
  }
} list
{
  params: [
    {
      paramName: 'list',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 1716,
            end: 1722,
            name: 'length'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '==',
              side: 'left',
              otherSide: Node {
                type: 'Literal',
                start: 1726,
                end: 1727,
                value: 0,
                raw: '0'
              },
              uses: [ { match: true } ]
            }
          ]
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 1776,
            end: 1783,
            name: 'forEach'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'ArrowFunctionExpression',
                  start: 1784,
                  end: 1841,
                  id: null,
                  expression: false,
                  generator: false,
                  async: false,
                  params: [
                    Node {
                      type: 'Identifier',
                      start: 1785,
                      end: 1789,
                      name: 'item'
                    }
                  ],
                  body: Node {
                    type: 'BlockStatement',
                    start: 1794,
                    end: 1841,
                    body: [
                      Node {
                        type: 'ExpressionStatement',
                        start: 1804,
                        end: 1835,
                        expression: Node {
                          type: 'AssignmentExpression',
                          start: 1804,
                          end: 1834,
                          operator: '+=',
                          left: Node {
                            type: 'Identifier',
                            start: 1804,
                            end: 1812,
                            name: 'htmlList'
                          },
                          right: Node {
                            type: 'TemplateLiteral',
                            start: 1816,
                            end: 1834,
                            expressions: [
                              Node {
                                type: 'Identifier',
                                start: 1823,
                                end: 1827,
                                name: 'item'
                              }
                            ],
                            quasis: [
                              Node {
                                type: 'TemplateElement',
                                start: 1817,
                                end: 1821,
                                value: { raw: '<li>', cooked: '<li>' },
                                tail: false
                              },
                              Node {
                                type: 'TemplateElement',
                                start: 1828,
                                end: 1833,
                                value: { raw: '</li>', cooked: '</li>' },
                                tail: true
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              ],
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    }
  ]
}
{
  params: [
    {
      paramName: 'enabled',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '===',
          side: 'left',
          otherSide: Node {
            type: 'Identifier',
            start: 2324,
            end: 2333,
            name: 'undefined'
          },
          uses: [ { match: true } ]
        },
        {
          type: 'Assignment',
          operator: '=',
          side: 'left',
          otherSide: Node {
            type: 'Literal',
            start: 2440,
            end: 2444,
            value: true,
            raw: 'true'
          },
          uses: [ { match: true } ],
          condition: Node {
            type: 'BinaryExpression',
            start: 2312,
            end: 2333,
            left: Node {
              type: 'Identifier',
              start: 2312,
              end: 2319,
              name: 'enabled'
            },
            operator: '===',
            right: Node {
              type: 'Identifier',
              start: 2324,
              end: 2333,
              name: 'undefined'
            }
          }
        },
        {
          type: 'Assignment',
          operator: '=',
          side: 'left',
          otherSide: Node {
            type: 'Literal',
            start: 2509,
            end: 2514,
            value: false,
            raw: 'false'
          },
          uses: [ { match: true } ],
          condition: Node {
            type: 'BinaryExpression',
            start: 2312,
            end: 2333,
            left: Node {
              type: 'Identifier',
              start: 2312,
              end: 2319,
              name: 'enabled'
            },
            operator: '===',
            right: Node {
              type: 'Identifier',
              start: 2324,
              end: 2333,
              name: 'undefined'
            }
          }
        },
        { match: true }
      ]
    },
    {
      paramName: 'button',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 2399,
            end: 2408,
            name: 'classList'
          },
          uses: [
            {
              type: 'MemberAccess',
              optional: false,
              property: Node {
                type: 'Identifier',
                start: 2409,
                end: 2417,
                name: 'contains'
              },
              uses: [
                {
                  type: 'Call',
                  optional: false,
                  arguments: [
                    Node {
                      type: 'Identifier',
                      start: 2418,
                      end: 2427,
                      name: 'startType'
                    }
                  ],
                  uses: [ { match: true } ]
                }
              ]
            }
          ],
          condition: Node {
            type: 'BinaryExpression',
            start: 2312,
            end: 2333,
            left: Node {
              type: 'Identifier',
              start: 2312,
              end: 2319,
              name: 'enabled'
            },
            operator: '===',
            right: Node {
              type: 'Identifier',
              start: 2324,
              end: 2333,
              name: 'undefined'
            }
          }
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 2470,
            end: 2479,
            name: 'classList'
          },
          uses: [
            {
              type: 'MemberAccess',
              optional: false,
              property: Node {
                type: 'Identifier',
                start: 2480,
                end: 2488,
                name: 'contains'
              },
              uses: [
                {
                  type: 'Call',
                  optional: false,
                  arguments: [
                    Node {
                      type: 'Identifier',
                      start: 2489,
                      end: 2496,
                      name: 'endType'
                    }
                  ],
                  uses: [ { match: true } ]
                }
              ]
            }
          ],
          condition: Node {
            type: 'BinaryExpression',
            start: 2312,
            end: 2333,
            left: Node {
              type: 'Identifier',
              start: 2312,
              end: 2319,
              name: 'enabled'
            },
            operator: '===',
            right: Node {
              type: 'Identifier',
              start: 2324,
              end: 2333,
              name: 'undefined'
            }
          }
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 2575,
            end: 2584,
            name: 'classList'
          },
          uses: [
            {
              type: 'MemberAccess',
              optional: false,
              property: Node {
                type: 'Identifier',
                start: 2585,
                end: 2592,
                name: 'replace'
              },
              uses: [
                {
                  type: 'Call',
                  optional: false,
                  arguments: [
                    Node {
                      type: 'Identifier',
                      start: 2593,
                      end: 2602,
                      name: 'startType'
                    },
                    Node {
                      type: 'Identifier',
                      start: 2604,
                      end: 2611,
                      name: 'endType'
                    }
                  ],
                  uses: [ { match: true } ]
                }
              ]
            }
          ],
          condition: Node {
            type: 'Identifier',
            start: 2551,
            end: 2558,
            name: 'enabled'
          }
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 2638,
            end: 2647,
            name: 'classList'
          },
          uses: [
            {
              type: 'MemberAccess',
              optional: false,
              property: Node {
                type: 'Identifier',
                start: 2648,
                end: 2655,
                name: 'replace'
              },
              uses: [
                {
                  type: 'Call',
                  optional: false,
                  arguments: [
                    Node {
                      type: 'Identifier',
                      start: 2656,
                      end: 2663,
                      name: 'endType'
                    },
                    Node {
                      type: 'Identifier',
                      start: 2665,
                      end: 2674,
                      name: 'startType'
                    }
                  ],
                  uses: [ { match: true } ]
                }
              ]
            }
          ],
          condition: {
            not: Node {
              type: 'Identifier',
              start: 2551,
              end: 2558,
              name: 'enabled'
            }
          }
        }
      ]
    },
    { paramName: undefined, uses: [] },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    {
      paramName: 'button',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 2896,
            end: 2905,
            name: 'classList'
          },
          uses: [
            {
              type: 'MemberAccess',
              optional: false,
              property: Node {
                type: 'Identifier',
                start: 2906,
                end: 2914,
                name: 'contains'
              },
              uses: [
                {
                  type: 'Call',
                  optional: false,
                  arguments: [
                    Node {
                      type: 'Literal',
                      start: 2915,
                      end: 2928,
                      value: 'btn-primary',
                      raw: '"btn-primary"'
                    }
                  ],
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 3662,
  end: 3674,
  properties: [
    Node {
      type: 'Property',
      start: 3664,
      end: 3667,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    },
    Node {
      type: 'Property',
      start: 3669,
      end: 3672,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    }
  ]
} cartesian
getIdentifierUsage Node {
  type: 'Property',
  start: 3664,
  end: 3667,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 3664, end: 3667, name: 'lat' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 3664, end: 3667, name: 'lat' }
} cartesian
getIdentifierUsage Node {
  type: 'Property',
  start: 3669,
  end: 3672,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 3669, end: 3672, name: 'lon' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 3669, end: 3672, name: 'lon' }
} cartesian
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 3662,
  end: 3674,
  properties: [
    Node {
      type: 'Property',
      start: 3664,
      end: 3667,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    },
    Node {
      type: 'Property',
      start: 3669,
      end: 3672,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    }
  ]
} undefined
getIdentifierUsage Node {
  type: 'Property',
  start: 3664,
  end: 3667,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 3664, end: 3667, name: 'lat' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 3664, end: 3667, name: 'lat' }
} undefined
getIdentifierUsage Node {
  type: 'Property',
  start: 3669,
  end: 3672,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 3669, end: 3672, name: 'lon' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 3669, end: 3672, name: 'lon' }
} undefined
{
  params: [
    { paramName: 'cartesian', uses: [ { match: true } ] },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    {
      paramName: 'longitude',
      uses: [
        {
          type: 'Assignment',
          operator: '=',
          side: 'left',
          otherSide: Node {
            type: 'CallExpression',
            start: 4053,
            end: 4085,
            callee: Node {
              type: 'MemberExpression',
              start: 4053,
              end: 4074,
              object: Node {
                type: 'MemberExpression',
                start: 4053,
                end: 4064,
                object: Node {
                  type: 'Identifier',
                  start: 4053,
                  end: 4059,
                  name: 'Cesium'
                },
                property: Node {
                  type: 'Identifier',
                  start: 4060,
                  end: 4064,
                  name: 'Math'
                },
                computed: false,
                optional: false
              },
              property: Node {
                type: 'Identifier',
                start: 4065,
                end: 4074,
                name: 'toRadians'
              },
              computed: false,
              optional: false
            },
            arguments: [
              Node {
                type: 'Identifier',
                start: 4075,
                end: 4084,
                name: 'longitude'
              }
            ],
            optional: false
          },
          uses: [ { match: true } ],
          condition: Node {
            type: 'Identifier',
            start: 4030,
            end: 4039,
            name: 'isDegrees'
          }
        },
        {
          type: 'Assignment',
          operator: '=',
          side: 'right',
          otherSide: Node {
            type: 'Identifier',
            start: 4041,
            end: 4050,
            name: 'longitude'
          },
          uses: [ { match: true } ],
          condition: Node {
            type: 'Identifier',
            start: 4030,
            end: 4039,
            name: 'isDegrees'
          }
        },
        {
          type: 'BinaryOperation',
          operation: '+',
          side: 'left',
          otherSide: Node {
            type: 'Identifier',
            start: 4123,
            end: 4125,
            name: 'PI'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '%',
              side: 'left',
              otherSide: Node {
                type: 'Identifier',
                start: 4129,
                end: 4135,
                name: 'TWO_PI'
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '-',
                  side: 'left',
                  otherSide: Node {
                    type: 'Identifier',
                    start: 4138,
                    end: 4140,
                    name: 'PI'
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        }
      ]
    },
    { paramName: undefined, uses: [] }
  ]
}
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 5643,
  end: 5661,
  properties: [
    Node {
      type: 'Property',
      start: 5645,
      end: 5651,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    },
    Node {
      type: 'Property',
      start: 5653,
      end: 5659,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    }
  ]
} cartesian
getIdentifierUsage Node {
  type: 'Property',
  start: 5645,
  end: 5651,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 5645, end: 5651, name: 'latStr' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 5645, end: 5651, name: 'latStr' }
} cartesian
getIdentifierUsage Node {
  type: 'Property',
  start: 5653,
  end: 5659,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 5653, end: 5659, name: 'lonStr' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 5653, end: 5659, name: 'lonStr' }
} cartesian
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 5643,
  end: 5661,
  properties: [
    Node {
      type: 'Property',
      start: 5645,
      end: 5651,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    },
    Node {
      type: 'Property',
      start: 5653,
      end: 5659,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    }
  ]
} undefined
getIdentifierUsage Node {
  type: 'Property',
  start: 5645,
  end: 5651,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 5645, end: 5651, name: 'latStr' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 5645, end: 5651, name: 'latStr' }
} undefined
getIdentifierUsage Node {
  type: 'Property',
  start: 5653,
  end: 5659,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 5653, end: 5659, name: 'lonStr' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 5653, end: 5659, name: 'lonStr' }
} undefined
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 5643,
  end: 5661,
  properties: [
    Node {
      type: 'Property',
      start: 5645,
      end: 5651,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    },
    Node {
      type: 'Property',
      start: 5653,
      end: 5659,
      method: false,
      shorthand: true,
      computed: false,
      key: [Node],
      kind: 'init',
      value: [Node]
    }
  ]
} undefined
getIdentifierUsage Node {
  type: 'Property',
  start: 5645,
  end: 5651,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 5645, end: 5651, name: 'latStr' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 5645, end: 5651, name: 'latStr' }
} undefined
getIdentifierUsage Node {
  type: 'Property',
  start: 5653,
  end: 5659,
  method: false,
  shorthand: true,
  computed: false,
  key: Node { type: 'Identifier', start: 5653, end: 5659, name: 'lonStr' },
  kind: 'init',
  value: Node { type: 'Identifier', start: 5653, end: 5659, name: 'lonStr' }
} undefined
{
  params: [
    { paramName: 'cartesian', uses: [ { match: true } ] },
    { paramName: undefined, uses: [] },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    { paramName: 'origin', uses: [ { match: true } ] },
    { paramName: 'destination', uses: [ { match: true } ] }
  ]
}
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 7200,
  end: 7221,
  elements: [
    Node {
      type: 'Identifier',
      start: 7201,
      end: 7208,
      name: 'distNmi'
    },
    Node {
      type: 'Identifier',
      start: 7210,
      end: 7220,
      name: 'bearingDeg'
    }
  ]
} origin
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 7200,
  end: 7221,
  elements: [
    Node {
      type: 'Identifier',
      start: 7201,
      end: 7208,
      name: 'distNmi'
    },
    Node {
      type: 'Identifier',
      start: 7210,
      end: 7220,
      name: 'bearingDeg'
    }
  ]
} destination
{
  params: [
    {
      paramName: 'origin',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'left',
          otherSide: Node {
            type: 'Identifier',
            start: 7093,
            end: 7102,
            name: 'M_PER_NMI'
          },
          uses: [ { match: true } ]
        },
        { match: true }
      ]
    },
    {
      paramName: 'destination',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'left',
          otherSide: Node {
            type: 'Identifier',
            start: 7093,
            end: 7102,
            name: 'M_PER_NMI'
          },
          uses: [ { match: true } ]
        },
        { match: true }
      ]
    }
  ]
}
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 7692,
  end: 7750,
  elements: [
    Node {
      type: 'CallExpression',
      start: 7693,
      end: 7726,
      callee: [Node],
      arguments: [Array],
      optional: false
    },
    Node {
      type: 'CallExpression',
      start: 7728,
      end: 7749,
      callee: [Node],
      arguments: [Array],
      optional: false
    }
  ]
} origin
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 7692,
  end: 7750,
  elements: [
    Node {
      type: 'CallExpression',
      start: 7693,
      end: 7726,
      callee: [Node],
      arguments: [Array],
      optional: false
    },
    Node {
      type: 'CallExpression',
      start: 7728,
      end: 7749,
      callee: [Node],
      arguments: [Array],
      optional: false
    }
  ]
} destination
{
  params: [
    { paramName: 'origin', uses: [ { match: true } ] },
    { paramName: 'destination', uses: [ { match: true } ] }
  ]
}
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8320,
  end: 8343,
  callee: Node {
    type: 'MemberExpression',
    start: 8324,
    end: 8341,
    object: Node { type: 'Identifier', start: 8324, end: 8330, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8331,
      end: 8341,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} origin
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8363,
  end: 8386,
  callee: Node {
    type: 'MemberExpression',
    start: 8367,
    end: 8384,
    object: Node { type: 'Identifier', start: 8367, end: 8373, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8374,
      end: 8384,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} origin
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8468,
  end: 8491,
  callee: Node {
    type: 'MemberExpression',
    start: 8472,
    end: 8489,
    object: Node { type: 'Identifier', start: 8472, end: 8478, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8479,
      end: 8489,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} origin
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8578,
  end: 8601,
  callee: Node {
    type: 'MemberExpression',
    start: 8582,
    end: 8599,
    object: Node { type: 'Identifier', start: 8582, end: 8588, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8589,
      end: 8599,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} origin
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8320,
  end: 8343,
  callee: Node {
    type: 'MemberExpression',
    start: 8324,
    end: 8341,
    object: Node { type: 'Identifier', start: 8324, end: 8330, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8331,
      end: 8341,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} destination
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8363,
  end: 8386,
  callee: Node {
    type: 'MemberExpression',
    start: 8367,
    end: 8384,
    object: Node { type: 'Identifier', start: 8367, end: 8373, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8374,
      end: 8384,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} destination
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8468,
  end: 8491,
  callee: Node {
    type: 'MemberExpression',
    start: 8472,
    end: 8489,
    object: Node { type: 'Identifier', start: 8472, end: 8478, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8479,
      end: 8489,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} destination
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 8578,
  end: 8601,
  callee: Node {
    type: 'MemberExpression',
    start: 8582,
    end: 8599,
    object: Node { type: 'Identifier', start: 8582, end: 8588, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 8589,
      end: 8599,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} destination
{
  params: [
    {
      paramName: 'origin',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'left',
          otherSide: Node {
            type: 'CallExpression',
            start: 8415,
            end: 8505,
            callee: Node {
              type: 'MemberExpression',
              start: 8415,
              end: 8442,
              object: Node {
                type: 'MemberExpression',
                start: 8415,
                end: 8432,
                object: Node {
                  type: 'Identifier',
                  start: 8415,
                  end: 8421,
                  name: 'Cesium'
                },
                property: Node {
                  type: 'Identifier',
                  start: 8422,
                  end: 8432,
                  name: 'Cartesian3'
                },
                computed: false,
                optional: false
              },
              property: Node {
                type: 'Identifier',
                start: 8433,
                end: 8442,
                name: 'magnitude'
              },
              computed: false,
              optional: false
            },
            arguments: [
              Node {
                type: 'Identifier',
                start: 8460,
                end: 8466,
                name: 'origin'
              },
              Node {
                type: 'NewExpression',
                start: 8468,
                end: 8491,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8472,
                  end: 8489,
                  object: Node {
                    type: 'Identifier',
                    start: 8472,
                    end: 8478,
                    name: 'Cesium'
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8479,
                    end: 8489,
                    name: 'Cartesian3'
                  },
                  computed: false,
                  optional: false
                },
                arguments: []
              }
            ],
            optional: false
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '/',
              side: 'left',
              otherSide: Node {
                type: 'CallExpression',
                start: 8520,
                end: 8615,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8520,
                  end: 8547,
                  object: Node {
                    type: 'MemberExpression',
                    start: 8520,
                    end: 8537,
                    object: Node {
                      type: 'Identifier',
                      start: 8520,
                      end: 8526,
                      name: 'Cesium'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8527,
                      end: 8537,
                      name: 'Cartesian3'
                    },
                    computed: false,
                    optional: false
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8538,
                    end: 8547,
                    name: 'magnitude'
                  },
                  computed: false,
                  optional: false
                },
                arguments: [
                  Node {
                    type: 'Identifier',
                    start: 8565,
                    end: 8576,
                    name: 'destination'
                  },
                  Node {
                    type: 'NewExpression',
                    start: 8578,
                    end: 8601,
                    callee: Node {
                      type: 'MemberExpression',
                      start: 8582,
                      end: 8599,
                      object: Node {
                        type: 'Identifier',
                        start: 8582,
                        end: 8588,
                        name: 'Cesium'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 8589,
                        end: 8599,
                        name: 'Cartesian3'
                      },
                      computed: false,
                      optional: false
                    },
                    arguments: []
                  }
                ],
                optional: false
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '*',
                  side: 'right',
                  otherSide: Node {
                    type: 'Identifier',
                    start: 8147,
                    end: 8166,
                    name: 'EARTH_RADIUS_METERS'
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        },
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'right',
          otherSide: Node {
            type: 'CallExpression',
            start: 8209,
            end: 8400,
            callee: Node {
              type: 'MemberExpression',
              start: 8209,
              end: 8236,
              object: Node {
                type: 'MemberExpression',
                start: 8209,
                end: 8226,
                object: Node {
                  type: 'Identifier',
                  start: 8209,
                  end: 8215,
                  name: 'Cesium'
                },
                property: Node {
                  type: 'Identifier',
                  start: 8216,
                  end: 8226,
                  name: 'Cartesian3'
                },
                computed: false,
                optional: false
              },
              property: Node {
                type: 'Identifier',
                start: 8227,
                end: 8236,
                name: 'magnitude'
              },
              computed: false,
              optional: false
            },
            arguments: [
              Node {
                type: 'CallExpression',
                start: 8254,
                end: 8361,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8254,
                  end: 8277,
                  object: Node {
                    type: 'MemberExpression',
                    start: 8254,
                    end: 8271,
                    object: Node {
                      type: 'Identifier',
                      start: 8254,
                      end: 8260,
                      name: 'Cesium'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8261,
                      end: 8271,
                      name: 'Cartesian3'
                    },
                    computed: false,
                    optional: false
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8272,
                    end: 8277,
                    name: 'cross'
                  },
                  computed: false,
                  optional: false
                },
                arguments: [
                  Node {
                    type: 'Identifier',
                    start: 8299,
                    end: 8305,
                    name: 'origin'
                  },
                  Node {
                    type: 'Identifier',
                    start: 8307,
                    end: 8318,
                    name: 'destination'
                  },
                  Node {
                    type: 'NewExpression',
                    start: 8320,
                    end: 8343,
                    callee: Node {
                      type: 'MemberExpression',
                      start: 8324,
                      end: 8341,
                      object: Node {
                        type: 'Identifier',
                        start: 8324,
                        end: 8330,
                        name: 'Cesium'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 8331,
                        end: 8341,
                        name: 'Cartesian3'
                      },
                      computed: false,
                      optional: false
                    },
                    arguments: []
                  }
                ],
                optional: false
              },
              Node {
                type: 'NewExpression',
                start: 8363,
                end: 8386,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8367,
                  end: 8384,
                  object: Node {
                    type: 'Identifier',
                    start: 8367,
                    end: 8373,
                    name: 'Cesium'
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8374,
                    end: 8384,
                    name: 'Cartesian3'
                  },
                  computed: false,
                  optional: false
                },
                arguments: []
              }
            ],
            optional: false
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '/',
              side: 'left',
              otherSide: Node {
                type: 'CallExpression',
                start: 8520,
                end: 8615,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8520,
                  end: 8547,
                  object: Node {
                    type: 'MemberExpression',
                    start: 8520,
                    end: 8537,
                    object: Node {
                      type: 'Identifier',
                      start: 8520,
                      end: 8526,
                      name: 'Cesium'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8527,
                      end: 8537,
                      name: 'Cartesian3'
                    },
                    computed: false,
                    optional: false
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8538,
                    end: 8547,
                    name: 'magnitude'
                  },
                  computed: false,
                  optional: false
                },
                arguments: [
                  Node {
                    type: 'Identifier',
                    start: 8565,
                    end: 8576,
                    name: 'destination'
                  },
                  Node {
                    type: 'NewExpression',
                    start: 8578,
                    end: 8601,
                    callee: Node {
                      type: 'MemberExpression',
                      start: 8582,
                      end: 8599,
                      object: Node {
                        type: 'Identifier',
                        start: 8582,
                        end: 8588,
                        name: 'Cesium'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 8589,
                        end: 8599,
                        name: 'Cartesian3'
                      },
                      computed: false,
                      optional: false
                    },
                    arguments: []
                  }
                ],
                optional: false
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '*',
                  side: 'right',
                  otherSide: Node {
                    type: 'Identifier',
                    start: 8147,
                    end: 8166,
                    name: 'EARTH_RADIUS_METERS'
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      paramName: 'destination',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'left',
          otherSide: Node {
            type: 'CallExpression',
            start: 8415,
            end: 8505,
            callee: Node {
              type: 'MemberExpression',
              start: 8415,
              end: 8442,
              object: Node {
                type: 'MemberExpression',
                start: 8415,
                end: 8432,
                object: Node {
                  type: 'Identifier',
                  start: 8415,
                  end: 8421,
                  name: 'Cesium'
                },
                property: Node {
                  type: 'Identifier',
                  start: 8422,
                  end: 8432,
                  name: 'Cartesian3'
                },
                computed: false,
                optional: false
              },
              property: Node {
                type: 'Identifier',
                start: 8433,
                end: 8442,
                name: 'magnitude'
              },
              computed: false,
              optional: false
            },
            arguments: [
              Node {
                type: 'Identifier',
                start: 8460,
                end: 8466,
                name: 'origin'
              },
              Node {
                type: 'NewExpression',
                start: 8468,
                end: 8491,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8472,
                  end: 8489,
                  object: Node {
                    type: 'Identifier',
                    start: 8472,
                    end: 8478,
                    name: 'Cesium'
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8479,
                    end: 8489,
                    name: 'Cartesian3'
                  },
                  computed: false,
                  optional: false
                },
                arguments: []
              }
            ],
            optional: false
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '/',
              side: 'left',
              otherSide: Node {
                type: 'CallExpression',
                start: 8520,
                end: 8615,
                callee: Node {
                  type: 'MemberExpression',
                  start: 8520,
                  end: 8547,
                  object: Node {
                    type: 'MemberExpression',
                    start: 8520,
                    end: 8537,
                    object: Node {
                      type: 'Identifier',
                      start: 8520,
                      end: 8526,
                      name: 'Cesium'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8527,
                      end: 8537,
                      name: 'Cartesian3'
                    },
                    computed: false,
                    optional: false
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8538,
                    end: 8547,
                    name: 'magnitude'
                  },
                  computed: false,
                  optional: false
                },
                arguments: [
                  Node {
                    type: 'Identifier',
                    start: 8565,
                    end: 8576,
                    name: 'destination'
                  },
                  Node {
                    type: 'NewExpression',
                    start: 8578,
                    end: 8601,
                    callee: Node {
                      type: 'MemberExpression',
                      start: 8582,
                      end: 8599,
                      object: Node {
                        type: 'Identifier',
                        start: 8582,
                        end: 8588,
                        name: 'Cesium'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 8589,
                        end: 8599,
                        name: 'Cartesian3'
                      },
                      computed: false,
                      optional: false
                    },
                    arguments: []
                  }
                ],
                optional: false
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '*',
                  side: 'right',
                  otherSide: Node {
                    type: 'Identifier',
                    start: 8147,
                    end: 8166,
                    name: 'EARTH_RADIUS_METERS'
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        },
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'right',
          otherSide: Node {
            type: 'BinaryExpression',
            start: 8209,
            end: 8505,
            left: Node {
              type: 'CallExpression',
              start: 8209,
              end: 8400,
              callee: Node {
                type: 'MemberExpression',
                start: 8209,
                end: 8236,
                object: Node {
                  type: 'MemberExpression',
                  start: 8209,
                  end: 8226,
                  object: Node {
                    type: 'Identifier',
                    start: 8209,
                    end: 8215,
                    name: 'Cesium'
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8216,
                    end: 8226,
                    name: 'Cartesian3'
                  },
                  computed: false,
                  optional: false
                },
                property: Node {
                  type: 'Identifier',
                  start: 8227,
                  end: 8236,
                  name: 'magnitude'
                },
                computed: false,
                optional: false
              },
              arguments: [
                Node {
                  type: 'CallExpression',
                  start: 8254,
                  end: 8361,
                  callee: Node {
                    type: 'MemberExpression',
                    start: 8254,
                    end: 8277,
                    object: Node {
                      type: 'MemberExpression',
                      start: 8254,
                      end: 8271,
                      object: Node {
                        type: 'Identifier',
                        start: 8254,
                        end: 8260,
                        name: 'Cesium'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 8261,
                        end: 8271,
                        name: 'Cartesian3'
                      },
                      computed: false,
                      optional: false
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8272,
                      end: 8277,
                      name: 'cross'
                    },
                    computed: false,
                    optional: false
                  },
                  arguments: [
                    Node {
                      type: 'Identifier',
                      start: 8299,
                      end: 8305,
                      name: 'origin'
                    },
                    Node {
                      type: 'Identifier',
                      start: 8307,
                      end: 8318,
                      name: 'destination'
                    },
                    Node {
                      type: 'NewExpression',
                      start: 8320,
                      end: 8343,
                      callee: Node {
                        type: 'MemberExpression',
                        start: 8324,
                        end: 8341,
                        object: Node {
                          type: 'Identifier',
                          start: 8324,
                          end: 8330,
                          name: 'Cesium'
                        },
                        property: Node {
                          type: 'Identifier',
                          start: 8331,
                          end: 8341,
                          name: 'Cartesian3'
                        },
                        computed: false,
                        optional: false
                      },
                      arguments: []
                    }
                  ],
                  optional: false
                },
                Node {
                  type: 'NewExpression',
                  start: 8363,
                  end: 8386,
                  callee: Node {
                    type: 'MemberExpression',
                    start: 8367,
                    end: 8384,
                    object: Node {
                      type: 'Identifier',
                      start: 8367,
                      end: 8373,
                      name: 'Cesium'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8374,
                      end: 8384,
                      name: 'Cartesian3'
                    },
                    computed: false,
                    optional: false
                  },
                  arguments: []
                }
              ],
              optional: false
            },
            operator: '/',
            right: Node {
              type: 'CallExpression',
              start: 8415,
              end: 8505,
              callee: Node {
                type: 'MemberExpression',
                start: 8415,
                end: 8442,
                object: Node {
                  type: 'MemberExpression',
                  start: 8415,
                  end: 8432,
                  object: Node {
                    type: 'Identifier',
                    start: 8415,
                    end: 8421,
                    name: 'Cesium'
                  },
                  property: Node {
                    type: 'Identifier',
                    start: 8422,
                    end: 8432,
                    name: 'Cartesian3'
                  },
                  computed: false,
                  optional: false
                },
                property: Node {
                  type: 'Identifier',
                  start: 8433,
                  end: 8442,
                  name: 'magnitude'
                },
                computed: false,
                optional: false
              },
              arguments: [
                Node {
                  type: 'Identifier',
                  start: 8460,
                  end: 8466,
                  name: 'origin'
                },
                Node {
                  type: 'NewExpression',
                  start: 8468,
                  end: 8491,
                  callee: Node {
                    type: 'MemberExpression',
                    start: 8472,
                    end: 8489,
                    object: Node {
                      type: 'Identifier',
                      start: 8472,
                      end: 8478,
                      name: 'Cesium'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 8479,
                      end: 8489,
                      name: 'Cartesian3'
                    },
                    computed: false,
                    optional: false
                  },
                  arguments: []
                }
              ],
              optional: false
            }
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '*',
              side: 'right',
              otherSide: Node {
                type: 'Identifier',
                start: 8147,
                end: 8166,
                name: 'EARTH_RADIUS_METERS'
              },
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    }
  ]
}
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 9073,
  end: 9118,
  callee: Node {
    type: 'MemberExpression',
    start: 9077,
    end: 9108,
    object: Node {
      type: 'MemberExpression',
      start: 9077,
      end: 9096,
      object: [Node],
      property: [Node],
      computed: false,
      optional: false
    },
    property: Node {
      type: 'Identifier',
      start: 9097,
      end: 9108,
      name: 'fromDegrees'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node { type: 'Identifier', start: 9109, end: 9112, name: 'lon' },
    Node { type: 'Identifier', start: 9114, end: 9117, name: 'lat' }
  ]
} lon
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 9658,
  end: 9702,
  elements: [
    Node {
      type: 'BinaryExpression',
      start: 9659,
      end: 9679,
      left: [Node],
      operator: '*',
      right: [Node]
    },
    Node {
      type: 'BinaryExpression',
      start: 9681,
      end: 9701,
      left: [Node],
      operator: '*',
      right: [Node]
    }
  ]
} lon
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 9073,
  end: 9118,
  callee: Node {
    type: 'MemberExpression',
    start: 9077,
    end: 9108,
    object: Node {
      type: 'MemberExpression',
      start: 9077,
      end: 9096,
      object: [Node],
      property: [Node],
      computed: false,
      optional: false
    },
    property: Node {
      type: 'Identifier',
      start: 9097,
      end: 9108,
      name: 'fromDegrees'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node { type: 'Identifier', start: 9109, end: 9112, name: 'lon' },
    Node { type: 'Identifier', start: 9114, end: 9117, name: 'lat' }
  ]
} lat
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 9658,
  end: 9702,
  elements: [
    Node {
      type: 'BinaryExpression',
      start: 9659,
      end: 9679,
      left: [Node],
      operator: '*',
      right: [Node]
    },
    Node {
      type: 'BinaryExpression',
      start: 9681,
      end: 9701,
      left: [Node],
      operator: '*',
      right: [Node]
    }
  ]
} lat
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 9073,
  end: 9118,
  callee: Node {
    type: 'MemberExpression',
    start: 9077,
    end: 9108,
    object: Node {
      type: 'MemberExpression',
      start: 9077,
      end: 9096,
      object: [Node],
      property: [Node],
      computed: false,
      optional: false
    },
    property: Node {
      type: 'Identifier',
      start: 9097,
      end: 9108,
      name: 'fromDegrees'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node { type: 'Identifier', start: 9109, end: 9112, name: 'lon' },
    Node { type: 'Identifier', start: 9114, end: 9117, name: 'lat' }
  ]
} bearing
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 9658,
  end: 9702,
  elements: [
    Node {
      type: 'BinaryExpression',
      start: 9659,
      end: 9679,
      left: [Node],
      operator: '*',
      right: [Node]
    },
    Node {
      type: 'BinaryExpression',
      start: 9681,
      end: 9701,
      left: [Node],
      operator: '*',
      right: [Node]
    }
  ]
} bearing
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 9073,
  end: 9118,
  callee: Node {
    type: 'MemberExpression',
    start: 9077,
    end: 9108,
    object: Node {
      type: 'MemberExpression',
      start: 9077,
      end: 9096,
      object: [Node],
      property: [Node],
      computed: false,
      optional: false
    },
    property: Node {
      type: 'Identifier',
      start: 9097,
      end: 9108,
      name: 'fromDegrees'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node { type: 'Identifier', start: 9109, end: 9112, name: 'lon' },
    Node { type: 'Identifier', start: 9114, end: 9117, name: 'lat' }
  ]
} distance
getIdentifierUsage Node {
  type: 'ArrayExpression',
  start: 9658,
  end: 9702,
  elements: [
    Node {
      type: 'BinaryExpression',
      start: 9659,
      end: 9679,
      left: [Node],
      operator: '*',
      right: [Node]
    },
    Node {
      type: 'BinaryExpression',
      start: 9681,
      end: 9701,
      left: [Node],
      operator: '*',
      right: [Node]
    }
  ]
} distance
{
  params: [
    { paramName: 'lon', uses: [] },
    { paramName: 'lat', uses: [] },
    {
      paramName: 'bearing',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '*',
          side: 'left',
          otherSide: Node {
            type: 'Identifier',
            start: 9151,
            end: 9153,
            name: 'PI'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '/',
              side: 'left',
              otherSide: Node {
                type: 'Literal',
                start: 9156,
                end: 9159,
                value: 180,
                raw: '180'
              },
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    },
    {
      paramName: 'distance',
      uses: [
        {
          type: 'BinaryOperation',
          operation: '/',
          side: 'left',
          otherSide: Node {
            type: 'Identifier',
            start: 9192,
            end: 9211,
            name: 'EARTH_RADIUS_METERS'
          },
          uses: [ { match: true } ]
        }
      ]
    }
  ]
}
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 9981,
  end: 10011,
  callee: Node {
    type: 'MemberExpression',
    start: 9985,
    end: 10002,
    object: Node { type: 'Identifier', start: 9985, end: 9991, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 9992,
      end: 10002,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node {
      type: 'Literal',
      start: 10003,
      end: 10004,
      value: 0,
      raw: '0'
    },
    Node {
      type: 'Literal',
      start: 10006,
      end: 10007,
      value: 0,
      raw: '0'
    },
    Node {
      type: 'Literal',
      start: 10009,
      end: 10010,
      value: 0,
      raw: '0'
    }
  ]
} p1
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 9981,
  end: 10011,
  callee: Node {
    type: 'MemberExpression',
    start: 9985,
    end: 10002,
    object: Node { type: 'Identifier', start: 9985, end: 9991, name: 'Cesium' },
    property: Node {
      type: 'Identifier',
      start: 9992,
      end: 10002,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node {
      type: 'Literal',
      start: 10003,
      end: 10004,
      value: 0,
      raw: '0'
    },
    Node {
      type: 'Literal',
      start: 10006,
      end: 10007,
      value: 0,
      raw: '0'
    },
    Node {
      type: 'Literal',
      start: 10009,
      end: 10010,
      value: 0,
      raw: '0'
    }
  ]
} p2
{
  params: [
    { paramName: 'p1', uses: [ { match: true } ] },
    { paramName: 'p2', uses: [ { match: true } ] }
  ]
}
{
  params: [
    {
      paramName: 'cssNumber',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 10560,
            end: 10569,
            name: 'substring'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'Literal',
                  start: 10570,
                  end: 10571,
                  value: 0,
                  raw: '0'
                },
                Node {
                  type: 'BinaryExpression',
                  start: 10573,
                  end: 10593,
                  left: Node {
                    type: 'MemberExpression',
                    start: 10573,
                    end: 10589,
                    object: Node {
                      type: 'Identifier',
                      start: 10573,
                      end: 10582,
                      name: 'cssNumber'
                    },
                    property: Node {
                      type: 'Identifier',
                      start: 10583,
                      end: 10589,
                      name: 'length'
                    },
                    computed: false,
                    optional: false
                  },
                  operator: '-',
                  right: Node {
                    type: 'Literal',
                    start: 10592,
                    end: 10593,
                    value: 2,
                    raw: '2'
                  }
                }
              ],
              uses: [ { match: true } ]
            }
          ]
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 10583,
            end: 10589,
            name: 'length'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '-',
              side: 'left',
              otherSide: Node {
                type: 'Literal',
                start: 10592,
                end: 10593,
                value: 2,
                raw: '2'
              },
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    }
  ]
}
getIdentifierUsage Node {
  type: 'ArrowFunctionExpression',
  start: 10954,
  end: 11001,
  id: null,
  expression: true,
  generator: false,
  async: false,
  params: [
    Node {
      type: 'Identifier',
      start: 10955,
      end: 10960,
      name: 'm_vec'
    }
  ],
  body: Node {
    type: 'CallExpression',
    start: 10965,
    end: 11001,
    callee: Node {
      type: 'MemberExpression',
      start: 10965,
      end: 10986,
      object: [Node],
      property: [Node],
      computed: false,
      optional: false
    },
    arguments: [ [Node], [Node] ],
    optional: false
  }
} matrix
getIdentifierUsage Node {
  type: 'ArrowFunctionExpression',
  start: 10954,
  end: 11001,
  id: null,
  expression: true,
  generator: false,
  async: false,
  params: [
    Node {
      type: 'Identifier',
      start: 10955,
      end: 10960,
      name: 'm_vec'
    }
  ],
  body: Node {
    type: 'CallExpression',
    start: 10965,
    end: 11001,
    callee: Node {
      type: 'MemberExpression',
      start: 10965,
      end: 10986,
      object: [Node],
      property: [Node],
      computed: false,
      optional: false
    },
    arguments: [ [Node], [Node] ],
    optional: false
  }
} vector
{
  params: [
    {
      paramName: 'matrix',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 10950,
            end: 10953,
            name: 'map'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'ArrowFunctionExpression',
                  start: 10954,
                  end: 11001,
                  id: null,
                  expression: true,
                  generator: false,
                  async: false,
                  params: [
                    Node {
                      type: 'Identifier',
                      start: 10955,
                      end: 10960,
                      name: 'm_vec'
                    }
                  ],
                  body: Node {
                    type: 'CallExpression',
                    start: 10965,
                    end: 11001,
                    callee: Node {
                      type: 'MemberExpression',
                      start: 10965,
                      end: 10986,
                      object: Node {
                        type: 'MemberExpression',
                        start: 10965,
                        end: 10982,
                        object: Node {
                          type: 'Identifier',
                          start: 10965,
                          end: 10971,
                          name: 'Cesium'
                        },
                        property: Node {
                          type: 'Identifier',
                          start: 10972,
                          end: 10982,
                          name: 'Cartesian3'
                        },
                        computed: false,
                        optional: false
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 10983,
                        end: 10986,
                        name: 'dot'
                      },
                      computed: false,
                      optional: false
                    },
                    arguments: [
                      Node {
                        type: 'Identifier',
                        start: 10987,
                        end: 10992,
                        name: 'm_vec'
                      },
                      Node {
                        type: 'Identifier',
                        start: 10994,
                        end: 11000,
                        name: 'vector'
                      }
                    ],
                    optional: false
                  }
                }
              ],
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    },
    { paramName: 'vector', uses: [] }
  ]
}
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 11477,
  end: 11500,
  callee: Node {
    type: 'MemberExpression',
    start: 11481,
    end: 11498,
    object: Node {
      type: 'Identifier',
      start: 11481,
      end: 11487,
      name: 'Cesium'
    },
    property: Node {
      type: 'Identifier',
      start: 11488,
      end: 11498,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} axis
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 11515,
  end: 12276,
  callee: Node {
    type: 'MemberExpression',
    start: 11519,
    end: 11536,
    object: Node {
      type: 'Identifier',
      start: 11519,
      end: 11525,
      name: 'Cesium'
    },
    property: Node {
      type: 'Identifier',
      start: 11526,
      end: 11536,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node {
      type: 'SpreadElement',
      start: 11546,
      end: 12270,
      argument: [Node]
    }
  ]
} axis
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 11477,
  end: 11500,
  callee: Node {
    type: 'MemberExpression',
    start: 11481,
    end: 11498,
    object: Node {
      type: 'Identifier',
      start: 11481,
      end: 11487,
      name: 'Cesium'
    },
    property: Node {
      type: 'Identifier',
      start: 11488,
      end: 11498,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} theta
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 11515,
  end: 12276,
  callee: Node {
    type: 'MemberExpression',
    start: 11519,
    end: 11536,
    object: Node {
      type: 'Identifier',
      start: 11519,
      end: 11525,
      name: 'Cesium'
    },
    property: Node {
      type: 'Identifier',
      start: 11526,
      end: 11536,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node {
      type: 'SpreadElement',
      start: 11546,
      end: 12270,
      argument: [Node]
    }
  ]
} theta
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 11477,
  end: 11500,
  callee: Node {
    type: 'MemberExpression',
    start: 11481,
    end: 11498,
    object: Node {
      type: 'Identifier',
      start: 11481,
      end: 11487,
      name: 'Cesium'
    },
    property: Node {
      type: 'Identifier',
      start: 11488,
      end: 11498,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: []
} vector
getIdentifierUsage Node {
  type: 'NewExpression',
  start: 11515,
  end: 12276,
  callee: Node {
    type: 'MemberExpression',
    start: 11519,
    end: 11536,
    object: Node {
      type: 'Identifier',
      start: 11519,
      end: 11525,
      name: 'Cesium'
    },
    property: Node {
      type: 'Identifier',
      start: 11526,
      end: 11536,
      name: 'Cartesian3'
    },
    computed: false,
    optional: false
  },
  arguments: [
    Node {
      type: 'SpreadElement',
      start: 11546,
      end: 12270,
      argument: [Node]
    }
  ]
} vector
{
  params: [
    { paramName: 'axis', uses: [ { match: true } ] },
    { paramName: 'theta', uses: [ { match: true }, { match: true } ] },
    { paramName: 'vector', uses: [] }
  ]
}
getIdentifierUsage Node {
  type: 'ArrowFunctionExpression',
  start: 13107,
  end: 13419,
  id: null,
  expression: false,
  generator: false,
  async: false,
  params: [
    Node {
      type: 'Identifier',
      start: 13108,
      end: 13113,
      name: 'event'
    }
  ],
  body: Node {
    type: 'BlockStatement',
    start: 13118,
    end: 13419,
    body: [ [Node], [Node], [Node] ]
  }
} input
getIdentifierUsage Node {
  type: 'ArrowFunctionExpression',
  start: 13107,
  end: 13419,
  id: null,
  expression: false,
  generator: false,
  async: false,
  params: [
    Node {
      type: 'Identifier',
      start: 13108,
      end: 13113,
      name: 'event'
    }
  ],
  body: Node {
    type: 'BlockStatement',
    start: 13118,
    end: 13419,
    body: [ [Node], [Node], [Node] ]
  }
} undefined
{
  params: [
    {
      paramName: 'input',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 13081,
            end: 13097,
            name: 'addEventListener'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'Literal',
                  start: 13098,
                  end: 13105,
                  value: 'keyup',
                  raw: '"keyup"'
                },
                Node {
                  type: 'ArrowFunctionExpression',
                  start: 13107,
                  end: 13419,
                  id: null,
                  expression: false,
                  generator: false,
                  async: false,
                  params: [
                    Node {
                      type: 'Identifier',
                      start: 13108,
                      end: 13113,
                      name: 'event'
                    }
                  ],
                  body: Node {
                    type: 'BlockStatement',
                    start: 13118,
                    end: 13419,
                    body: [
                      Node {
                        type: 'VariableDeclaration',
                        start: 13128,
                        end: 13161,
                        declarations: [
                          Node {
                            type: 'VariableDeclarator',
                            start: 13132,
                            end: 13160,
                            id: Node {
                              type: 'Identifier',
                              start: 13132,
                              end: 13144,
                              name: 'passedParams'
                            },
                            init: Node {
                              type: 'CallExpression',
                              start: 13147,
                              end: 13160,
                              callee: Node {
                                type: 'Identifier',
                                start: 13147,
                                end: 13153,
                                name: 'before'
                              },
                              arguments: [
                                Node {
                                  type: 'Identifier',
                                  start: 13154,
                                  end: 13159,
                                  name: 'event'
                                }
                              ],
                              optional: false
                            }
                          }
                        ],
                        kind: 'let'
                      },
                      Node {
                        type: 'IfStatement',
                        start: 13170,
                        end: 13205,
                        test: Node {
                          type: 'BinaryExpression',
                          start: 13174,
                          end: 13196,
                          left: Node {
                            type: 'Identifier',
                            start: 13174,
                            end: 13186,
                            name: 'passedParams'
                          },
                          operator: '===',
                          right: Node {
                            type: 'Literal',
                            start: 13191,
                            end: 13196,
                            value: false,
                            raw: 'false'
                          }
                        },
                        consequent: Node {
                          type: 'ReturnStatement',
                          start: 13198,
                          end: 13205,
                          argument: null
                        },
                        alternate: null
                      },
                      Node {
                        type: 'IfStatement',
                        start: 13214,
                        end: 13413,
                        test: Node {
                          type: 'BinaryExpression',
                          start: 13218,
                          end: 13227,
                          left: Node {
                            type: 'Identifier',
                            start: 13218,
                            end: 13223,
                            name: 'delay'
                          },
                          operator: '>',
                          right: Node {
                            type: 'Literal',
                            start: 13226,
                            end: 13227,
                            value: 0,
                            raw: '0'
                          }
                        },
                        consequent: Node {
                          type: 'BlockStatement',
                          start: 13229,
                          end: 13353,
                          body: [
                            Node {
                              type: 'ExpressionStatement',
                              start: 13243,
                              end: 13265,
                              expression: Node {
                                type: 'CallExpression',
                                start: 13243,
                                end: 13264,
                                callee: Node {
                                  type: 'Identifier',
                                  start: 13243,
                                  end: 13255,
                                  name: 'clearTimeout'
                                },
                                arguments: [
                                  Node {
                                    type: 'Identifier',
                                    start: 13256,
                                    end: 13263,
                                    name: 'timeout'
                                  }
                                ],
                                optional: false
                              }
                            },
                            Node {
                              type: 'ExpressionStatement',
                              start: 13278,
                              end: 13343,
                              expression: Node {
                                type: 'AssignmentExpression',
                                start: 13278,
                                end: 13342,
                                operator: '=',
                                left: Node {
                                  type: 'Identifier',
                                  start: 13278,
                                  end: 13285,
                                  name: 'timeout'
                                },
                                right: Node {
                                  type: 'CallExpression',
                                  start: 13288,
                                  end: 13342,
                                  callee: Node {
                                    type: 'Identifier',
                                    start: 13288,
                                    end: 13298,
                                    name: 'setTimeout'
                                  },
                                  arguments: [
                                    Node {
                                      type: 'ArrowFunctionExpression',
                                      start: 13299,
                                      end: 13334,
                                      id: null,
                                      expression: true,
                                      generator: false,
                                      async: false,
                                      params: [],
                                      body: Node {
                                        type: 'CallExpression',
                                        start: 13305,
                                        end: 13334,
                                        callee: Node {
                                          type: 'Identifier',
                                          start: 13305,
                                          end: 13313,
                                          name: 'listener'
                                        },
                                        arguments: [
                                          Node {
                                            type: 'Identifier',
                                            start: 13314,
                                            end: 13319,
                                            name: 'event'
                                          },
                                          Node {
                                            type: 'Identifier',
                                            start: 13321,
                                            end: 13333,
                                            name: 'passedParams'
                                          }
                                        ],
                                        optional: false
                                      }
                                    },
                                    Node {
                                      type: 'Identifier',
                                      start: 13336,
                                      end: 13341,
                                      name: 'delay'
                                    }
                                  ],
                                  optional: false
                                }
                              }
                            }
                          ]
                        },
                        alternate: Node {
                          type: 'BlockStatement',
                          start: 13359,
                          end: 13413,
                          body: [
                            Node {
                              type: 'ExpressionStatement',
                              start: 13373,
                              end: 13403,
                              expression: Node {
                                type: 'CallExpression',
                                start: 13373,
                                end: 13402,
                                callee: Node {
                                  type: 'Identifier',
                                  start: 13373,
                                  end: 13381,
                                  name: 'listener'
                                },
                                arguments: [
                                  Node {
                                    type: 'Identifier',
                                    start: 13382,
                                    end: 13387,
                                    name: 'event'
                                  },
                                  Node {
                                    type: 'Identifier',
                                    start: 13389,
                                    end: 13401,
                                    name: 'passedParams'
                                  }
                                ],
                                optional: false
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ],
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    },
    { paramName: undefined, uses: [] }
  ]
}
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 13891,
  end: 13949,
  properties: [
    Node {
      type: 'Property',
      start: 13901,
      end: 13914,
      method: false,
      shorthand: false,
      computed: false,
      key: [Node],
      value: [Node],
      kind: 'init'
    },
    Node {
      type: 'Property',
      start: 13924,
      end: 13943,
      method: false,
      shorthand: false,
      computed: false,
      key: [Node],
      value: [Node],
      kind: 'init'
    }
  ]
} a
getIdentifierUsage Node {
  type: 'Property',
  start: 13901,
  end: 13914,
  method: false,
  shorthand: false,
  computed: false,
  key: Node {
    type: 'Identifier',
    start: 13901,
    end: 13908,
    name: 'numeric'
  },
  value: Node {
    type: 'Literal',
    start: 13910,
    end: 13914,
    value: true,
    raw: 'true'
  },
  kind: 'init'
} a
getIdentifierUsage Node {
  type: 'Property',
  start: 13924,
  end: 13943,
  method: false,
  shorthand: false,
  computed: false,
  key: Node {
    type: 'Identifier',
    start: 13924,
    end: 13935,
    name: 'sensitivity'
  },
  value: Node {
    type: 'Literal',
    start: 13937,
    end: 13943,
    value: 'base',
    raw: "'base'"
  },
  kind: 'init'
} a
getIdentifierUsage Node {
  type: 'ObjectExpression',
  start: 13891,
  end: 13949,
  properties: [
    Node {
      type: 'Property',
      start: 13901,
      end: 13914,
      method: false,
      shorthand: false,
      computed: false,
      key: [Node],
      value: [Node],
      kind: 'init'
    },
    Node {
      type: 'Property',
      start: 13924,
      end: 13943,
      method: false,
      shorthand: false,
      computed: false,
      key: [Node],
      value: [Node],
      kind: 'init'
    }
  ]
} b
getIdentifierUsage Node {
  type: 'Property',
  start: 13901,
  end: 13914,
  method: false,
  shorthand: false,
  computed: false,
  key: Node {
    type: 'Identifier',
    start: 13901,
    end: 13908,
    name: 'numeric'
  },
  value: Node {
    type: 'Literal',
    start: 13910,
    end: 13914,
    value: true,
    raw: 'true'
  },
  kind: 'init'
} b
getIdentifierUsage Node {
  type: 'Property',
  start: 13924,
  end: 13943,
  method: false,
  shorthand: false,
  computed: false,
  key: Node {
    type: 'Identifier',
    start: 13924,
    end: 13935,
    name: 'sensitivity'
  },
  value: Node {
    type: 'Literal',
    start: 13937,
    end: 13943,
    value: 'base',
    raw: "'base'"
  },
  kind: 'init'
} b
{
  params: [
    {
      paramName: 'a',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 13731,
            end: 13742,
            name: 'textContent'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '!==',
              side: 'left',
              otherSide: Node {
                type: 'Identifier',
                start: 13747,
                end: 13756,
                name: 'undefined'
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '&',
                  side: 'left',
                  otherSide: Node {
                    type: 'BinaryExpression',
                    start: 13759,
                    end: 13786,
                    left: Node {
                      type: 'MemberExpression',
                      start: 13759,
                      end: 13772,
                      object: Node {
                        type: 'Identifier',
                        start: 13759,
                        end: 13760,
                        name: 'b'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 13761,
                        end: 13772,
                        name: 'textContent'
                      },
                      computed: false,
                      optional: false
                    },
                    operator: '!==',
                    right: Node {
                      type: 'Identifier',
                      start: 13777,
                      end: 13786,
                      name: 'undefined'
                    }
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        },
        {
          type: 'Assignment',
          operator: '=',
          side: 'left',
          otherSide: Node {
            type: 'MemberExpression',
            start: 13802,
            end: 13815,
            object: Node {
              type: 'Identifier',
              start: 13802,
              end: 13803,
              name: 'a'
            },
            property: Node {
              type: 'Identifier',
              start: 13804,
              end: 13815,
              name: 'textContent'
            },
            computed: false,
            optional: false
          },
          uses: [ { match: true } ],
          condition: Node {
            type: 'BinaryExpression',
            start: 13729,
            end: 13786,
            left: Node {
              type: 'BinaryExpression',
              start: 13729,
              end: 13756,
              left: Node {
                type: 'MemberExpression',
                start: 13729,
                end: 13742,
                object: Node {
                  type: 'Identifier',
                  start: 13729,
                  end: 13730,
                  name: 'a'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13731,
                  end: 13742,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13747,
                end: 13756,
                name: 'undefined'
              }
            },
            operator: '&',
            right: Node {
              type: 'BinaryExpression',
              start: 13759,
              end: 13786,
              left: Node {
                type: 'MemberExpression',
                start: 13759,
                end: 13772,
                object: Node {
                  type: 'Identifier',
                  start: 13759,
                  end: 13760,
                  name: 'b'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13761,
                  end: 13772,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13777,
                end: 13786,
                name: 'undefined'
              }
            }
          }
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 13804,
            end: 13815,
            name: 'textContent'
          },
          uses: [
            {
              type: 'Assignment',
              operator: '=',
              side: 'right',
              otherSide: Node {
                type: 'Identifier',
                start: 13798,
                end: 13799,
                name: 'a'
              },
              uses: [ { match: true } ]
            }
          ],
          condition: Node {
            type: 'BinaryExpression',
            start: 13729,
            end: 13786,
            left: Node {
              type: 'BinaryExpression',
              start: 13729,
              end: 13756,
              left: Node {
                type: 'MemberExpression',
                start: 13729,
                end: 13742,
                object: Node {
                  type: 'Identifier',
                  start: 13729,
                  end: 13730,
                  name: 'a'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13731,
                  end: 13742,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13747,
                end: 13756,
                name: 'undefined'
              }
            },
            operator: '&',
            right: Node {
              type: 'BinaryExpression',
              start: 13759,
              end: 13786,
              left: Node {
                type: 'MemberExpression',
                start: 13759,
                end: 13772,
                object: Node {
                  type: 'Identifier',
                  start: 13759,
                  end: 13760,
                  name: 'b'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13761,
                  end: 13772,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13777,
                end: 13786,
                name: 'undefined'
              }
            }
          }
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 13863,
            end: 13876,
            name: 'localeCompare'
          },
          uses: [
            {
              type: 'Call',
              optional: false,
              arguments: [
                Node {
                  type: 'Identifier',
                  start: 13877,
                  end: 13878,
                  name: 'b'
                },
                Node {
                  type: 'Identifier',
                  start: 13880,
                  end: 13889,
                  name: 'undefined'
                },
                Node {
                  type: 'ObjectExpression',
                  start: 13891,
                  end: 13949,
                  properties: [
                    Node {
                      type: 'Property',
                      start: 13901,
                      end: 13914,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: Node {
                        type: 'Identifier',
                        start: 13901,
                        end: 13908,
                        name: 'numeric'
                      },
                      value: Node {
                        type: 'Literal',
                        start: 13910,
                        end: 13914,
                        value: true,
                        raw: 'true'
                      },
                      kind: 'init'
                    },
                    Node {
                      type: 'Property',
                      start: 13924,
                      end: 13943,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: Node {
                        type: 'Identifier',
                        start: 13924,
                        end: 13935,
                        name: 'sensitivity'
                      },
                      value: Node {
                        type: 'Literal',
                        start: 13937,
                        end: 13943,
                        value: 'base',
                        raw: "'base'"
                      },
                      kind: 'init'
                    }
                  ]
                }
              ],
              uses: [ { match: true } ]
            }
          ]
        }
      ]
    },
    {
      paramName: 'b',
      uses: [
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 13761,
            end: 13772,
            name: 'textContent'
          },
          uses: [
            {
              type: 'BinaryOperation',
              operation: '!==',
              side: 'left',
              otherSide: Node {
                type: 'Identifier',
                start: 13777,
                end: 13786,
                name: 'undefined'
              },
              uses: [
                {
                  type: 'BinaryOperation',
                  operation: '&',
                  side: 'right',
                  otherSide: Node {
                    type: 'BinaryExpression',
                    start: 13729,
                    end: 13756,
                    left: Node {
                      type: 'MemberExpression',
                      start: 13729,
                      end: 13742,
                      object: Node {
                        type: 'Identifier',
                        start: 13729,
                        end: 13730,
                        name: 'a'
                      },
                      property: Node {
                        type: 'Identifier',
                        start: 13731,
                        end: 13742,
                        name: 'textContent'
                      },
                      computed: false,
                      optional: false
                    },
                    operator: '!==',
                    right: Node {
                      type: 'Identifier',
                      start: 13747,
                      end: 13756,
                      name: 'undefined'
                    }
                  },
                  uses: [ { match: true } ]
                }
              ]
            }
          ]
        },
        {
          type: 'Assignment',
          operator: '=',
          side: 'left',
          otherSide: Node {
            type: 'MemberExpression',
            start: 13829,
            end: 13842,
            object: Node {
              type: 'Identifier',
              start: 13829,
              end: 13830,
              name: 'b'
            },
            property: Node {
              type: 'Identifier',
              start: 13831,
              end: 13842,
              name: 'textContent'
            },
            computed: false,
            optional: false
          },
          uses: [ { match: true } ],
          condition: Node {
            type: 'BinaryExpression',
            start: 13729,
            end: 13786,
            left: Node {
              type: 'BinaryExpression',
              start: 13729,
              end: 13756,
              left: Node {
                type: 'MemberExpression',
                start: 13729,
                end: 13742,
                object: Node {
                  type: 'Identifier',
                  start: 13729,
                  end: 13730,
                  name: 'a'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13731,
                  end: 13742,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13747,
                end: 13756,
                name: 'undefined'
              }
            },
            operator: '&',
            right: Node {
              type: 'BinaryExpression',
              start: 13759,
              end: 13786,
              left: Node {
                type: 'MemberExpression',
                start: 13759,
                end: 13772,
                object: Node {
                  type: 'Identifier',
                  start: 13759,
                  end: 13760,
                  name: 'b'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13761,
                  end: 13772,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13777,
                end: 13786,
                name: 'undefined'
              }
            }
          }
        },
        {
          type: 'MemberAccess',
          optional: false,
          property: Node {
            type: 'Identifier',
            start: 13831,
            end: 13842,
            name: 'textContent'
          },
          uses: [
            {
              type: 'Assignment',
              operator: '=',
              side: 'right',
              otherSide: Node {
                type: 'Identifier',
                start: 13825,
                end: 13826,
                name: 'b'
              },
              uses: [ { match: true } ]
            }
          ],
          condition: Node {
            type: 'BinaryExpression',
            start: 13729,
            end: 13786,
            left: Node {
              type: 'BinaryExpression',
              start: 13729,
              end: 13756,
              left: Node {
                type: 'MemberExpression',
                start: 13729,
                end: 13742,
                object: Node {
                  type: 'Identifier',
                  start: 13729,
                  end: 13730,
                  name: 'a'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13731,
                  end: 13742,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13747,
                end: 13756,
                name: 'undefined'
              }
            },
            operator: '&',
            right: Node {
              type: 'BinaryExpression',
              start: 13759,
              end: 13786,
              left: Node {
                type: 'MemberExpression',
                start: 13759,
                end: 13772,
                object: Node {
                  type: 'Identifier',
                  start: 13759,
                  end: 13760,
                  name: 'b'
                },
                property: Node {
                  type: 'Identifier',
                  start: 13761,
                  end: 13772,
                  name: 'textContent'
                },
                computed: false,
                optional: false
              },
              operator: '!==',
              right: Node {
                type: 'Identifier',
                start: 13777,
                end: 13786,
                name: 'undefined'
              }
            }
          }
        },
        { match: true }
      ]
    }
  ]
}
undefined
Done in 0.22s.
