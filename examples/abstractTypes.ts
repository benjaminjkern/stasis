abstract class Value {}
class RawValue extends Value {
    value: any;
}
class UsableValue extends Value {
    uses: [Usage];
}
class FunctionValue extends UsableValue {
    parameters: [Value];
    returns: Value;
}
class FunctionArgumentValue extends UsableValue {
    function: FunctionValue;
}

abstract class Usage {}
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

const a = new FunctionValue();
const b = new FunctionArgumentValue();

a.parameters = [b];
a.returns = c;
b.function = a;
