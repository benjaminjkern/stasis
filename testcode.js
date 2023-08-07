const func = (a, b) => a ^ b;

class TestClass {}

const runFunc = () => {
    const list = [
        { value: 0, string: "0" },
        { value: 1, string: "1" },
        { value: NaN, string: "NaN" },
        { value: Number.POSITIVE_INFINITY, string: "Infinity" },
        { value: true, string: "true" },
        { value: false, string: "false" },
        { value: undefined, string: "undefined" },
        { value: null, string: "null" },
        { value: 2n, string: "2n" },
        { value: 1.5, string: "1.5" },
        { value: -6, string: "-6" },
        { value: {}, string: "{}" },
        { value: [], string: "[]" },
        { value: new TestClass(), string: "TestClass" },
        { value: () => {}, string: "() => {}" },
        { value: "hello", string: '"hello"' },
        { value: "", string: '""' },
    ];
    console.log(`\nFunction: ${func}`);
    const returnTypes = {};
    process.stdout.write(`\n| ${"".padStart(10, " ")} | `);
    for (const { string } of list) {
        process.stdout.write(`${string.padStart(10, " ")} | `);
    }
    process.stdout.write(`\n|-${"".padStart(10, "-")}-|-`);
    for (const _ of list) {
        process.stdout.write(`${"".padStart(10, "-")}-|-`);
    }
    for (const { value: a, string: aString } of list) {
        process.stdout.write(`\n| ${aString.padStart(10, " ")} | `);
        for (const { value: b } of list) {
            try {
                const value = func(a, b);
                const type = typeof value;
                returnTypes[type] = true;

                process.stdout.write(`${type.padStart(10, " ")} | `);
                // process.stdout.write(` -> ${value} (Type: ${typeof value})`);
            } catch (err) {
                // console.log(`f(${aString}, ${bString}) -> ${err}`);

                process.stdout.write(`${"X".padStart(10, " ")} | `);
            }
        }
    }
    console.log(
        "\n\nReturn types:",
        Object.keys(returnTypes).join(" | "),
        "\n"
    );
};

runFunc();
