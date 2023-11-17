function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

capitalize("hello"); // Should be fine
capitalize({
    charAt: () => ({
        toUpperCase: () => 5,
    }),
    slice: () => 5,
}); // TECHNICALLY should also be fine
capitalize({ a: 5 }); // Should return a stasis error
capitalize({ charAt: () => undefined }); // Should return a stasis error

// shouldnt show
