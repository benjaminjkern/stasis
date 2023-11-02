interface RawValue {}

abstract class Value {
    uses: [Usage];
}
class StringValue extends Value implements RawValue {
    value: string;
}
class NumberValue extends Value implements RawValue {
    value: number;
}
class FunctionValue extends Value implements RawValue {
    parameters: [FunctionArgumentValue];
    possibleReturns: [FunctionReturnValue];
}
class FunctionArgumentValue extends Value {
    function: FunctionValue;
}

class FunctionReturnValue {
    function: FunctionValue;
    returnValue: Value;
}

/******** */

abstract class Usage extends Value {}
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
