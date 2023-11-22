let a = 0;

while (a < 1000) {
    a = 1000;
}

a = 50;

let b = 10;
while (a < 1000) {
    // Should be an infinite loop (Nothing affecting the condition is changed)
    b = 20;
}

console.log(a);
