const a = 0;

while (a < 1000) {
    a = 1000;
}

a = 50;

while (a < 1000) {
    a = 50; // Should be an infinite loop
}

console.log(a);
