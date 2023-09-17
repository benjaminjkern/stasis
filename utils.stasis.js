{
  params: [
    {
      paramName: 'str',
      uses: [
        {
          type: 'MemberAccess',
          property: 'charAt',
          uses: [
            {
              type: 'Call',
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
                  property: 'toUpperCase',
                  uses: [
                    {
                      type: 'Call',
                      arguments: [],
                      uses: [ { match: true } ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'MemberAccess',
          property: 'slice',
          uses: [
            {
              type: 'Call',
              arguments: [
                Node {
                  type: 'Literal',
                  start: 290,
                  end: 291,
                  value: 1,
                  raw: '1'
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
{ params: [ { paramName: 'str', uses: [] } ] }
{
  params: [
    { paramName: 'num', uses: [] },
    { paramName: 'n', uses: [ { match: true } ] }
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
          property: 'toString',
          uses: [
            {
              type: 'Call',
              arguments: [],
              uses: [
                {
                  type: 'MemberAccess',
                  property: 'split',
                  uses: [
                    {
                      type: 'Call',
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
{
  params: [
    {
      paramName: 'list',
      uses: [
        {
          type: 'MemberAccess',
          property: 'forEach',
          uses: [
            {
              type: 'Call',
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
          match: true,
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
          match: true,
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
        }
      ]
    },
    {
      paramName: 'button',
      uses: [
        {
          type: 'MemberAccess',
          property: 'classList',
          uses: [
            {
              type: 'MemberAccess',
              property: 'replace',
              uses: [
                {
                  type: 'Call',
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
          property: 'classList',
          uses: [
            {
              type: 'MemberAccess',
              property: 'replace',
              uses: [
                {
                  type: 'Call',
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
          property: 'classList',
          uses: [
            {
              type: 'MemberAccess',
              property: 'contains',
              uses: [
                {
                  type: 'Call',
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
{
  params: [
    { paramName: 'cartesian', uses: [] },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    {
      paramName: 'longitude',
      uses: [
        {
          match: true,
          condition: Node {
            type: 'Identifier',
            start: 4030,
            end: 4039,
            name: 'isDegrees'
          }
        },
        { match: true }
      ]
    },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    { paramName: 'cartesian', uses: [] },
    { paramName: undefined, uses: [] },
    { paramName: undefined, uses: [] }
  ]
}
{
  params: [
    { paramName: 'origin', uses: [] },
    { paramName: 'destination', uses: [] }
  ]
}
{
  params: [
    { paramName: 'origin', uses: [] },
    { paramName: 'destination', uses: [] }
  ]
}
{
  params: [
    { paramName: 'origin', uses: [] },
    { paramName: 'destination', uses: [] }
  ]
}
{
  params: [
    { paramName: 'origin', uses: [] },
    { paramName: 'destination', uses: [] }
  ]
}
{
  params: [
    { paramName: 'lon', uses: [] },
    { paramName: 'lat', uses: [] },
    { paramName: 'bearing', uses: [ { match: true } ] },
    { paramName: 'distance', uses: [ { match: true } ] }
  ]
}
{
  params: [ { paramName: 'p1', uses: [] }, { paramName: 'p2', uses: [] } ]
}
{ params: [ { paramName: 'cssNumber', uses: [] } ] }
{
  params: [
    {
      paramName: 'matrix',
      uses: [
        {
          type: 'MemberAccess',
          property: 'map',
          uses: [
            {
              type: 'Call',
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
{
  params: [
    { paramName: 'axis', uses: [] },
    { paramName: 'theta', uses: [] },
    { paramName: 'vector', uses: [] }
  ]
}
{
  params: [
    {
      paramName: 'input',
      uses: [
        {
          type: 'MemberAccess',
          property: 'addEventListener',
          uses: [
            {
              type: 'Call',
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
{
  params: [
    {
      paramName: 'a',
      uses: [
        {
          match: true,
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
          property: 'textContent',
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
          property: 'localeCompare',
          uses: [
            {
              type: 'Call',
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
          match: true,
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
          property: 'textContent',
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
        }
      ]
    }
  ]
}
undefined
Done in 0.15s.
