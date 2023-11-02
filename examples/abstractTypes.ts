abstract class Value {
    uses: [Usage];
}
class StringValue extends Value {
    value: any;
}
class NumberValue extends Value {
    value: any;
}
class FunctionValue extends Value {
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
