abstract class Value {}
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
