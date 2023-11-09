// typescript will infer this to be of type: string | number, although technically every type works here
function isNumeric(str) {
    if (typeof str != "string") return false; // typescript says: Argument of type 'string' is not assignable to parameter of type 'number'. But this is bullshit
    return !isNaN(str) && !isNaN(parseFloat(str));
}

isNumeric("5");
isNumeric(5);
isNumeric({});
isNumeric("sup");
