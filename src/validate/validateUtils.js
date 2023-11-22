const RAW_VALUE_TYPES = [
    "StringValue",
    "UndefinedType",
    "NullType",
    "NumberValue",
    "BooleanValue",
    "ObjectValue",
    "FunctionValue",
];

const createContext = (replaceWithList, stasisModule) => {
    const nodes = [...stasisModule.nodes];
    for (const [stasisIndex, value] of replaceWithList)
        nodes[stasisIndex] = value;

    return { ...stasisModule, nodes };
};

module.exports = { RAW_VALUE_TYPES, createContext };
