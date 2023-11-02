abstract class Value {}
class RawValue extends Value {
    value: any;
}
class UsableValue extends Value {
    uses: [Usage];
}
class FunctionValue extends UsableValue {
    parameters: [FunctionArgumentValue];
    possibleReturns: [FunctionReturnValue];
}
class FunctionArgumentValue extends UsableValue {
    function: FunctionValue;
}

class FunctionReturnValue {
    function: FunctionValue;
    returnValue: Value;
}

/******** */

abstract class Usage extends UsableValue {}
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
