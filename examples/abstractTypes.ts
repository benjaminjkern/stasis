class StasisModule {
    nodes: [StasisNode];
    mainStatement: Statement;
    identifiers: { [key: string]: StasisPointerNode };
}

abstract class StasisNode {}

class StasisPointerNode<T = typeof StasisNode> {
    stasisIndex: number; // Integer
}

abstract class Statement extends StasisNode {}

class StatementBlock extends Statement {
    statements: [Statement];
}

abstract class Value extends StasisNode {}
class StringValue extends Value {
    value: string;
}
class NumberValue extends Value {
    value: number;
}

class FunctionValue extends Value {
    parameters: [FunctionArgumentValue];
    returns: Value;
    mutations: [Usage];
}
class FunctionArgumentValue extends Value {
    uses: [Usage];
}

/******** */

abstract class Usage extends Value {}

class ObjectTemplate extends Usage {
    entries: [{ key: Value; value: Value } | SpreadValue];
}
class ArrayTemplate extends Usage {
    entries: [Value | SpreadValue];
}
class SpreadValue {
    value: Value;
}
class MemberAccess extends Usage {
    owner: Value;
    key: Value;
}
class Call extends Usage {
    callee: Value;
    arguments: [Value];
}
class BinaryOperation extends Usage {
    operator: string;
    leftSide: Value;
    rightSide: Value;
}
