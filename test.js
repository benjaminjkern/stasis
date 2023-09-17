const f = () => {
    console.log("f()");
    return { a: 5 };
};

const g = () => {
    console.log("g()");
    return "a";
};
console.log(f()[g()]);
