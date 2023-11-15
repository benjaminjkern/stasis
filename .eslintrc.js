module.exports = {
    extends: [
        "eslint:all",
        "plugin:import/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
    },
    plugins: ["import", "prettier"],
    rules: {
        "prettier/prettier": "warn",
        "no-unused-vars": "warn",
        curly: ["error", "multi"],
        camelcase: ["error", { properties: "never" }],
        "no-warning-comments": "warn",
        "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],
        "prefer-named-capture-group": "warn",
        "require-await": "warn",
        "spaced-comment": "warn",
        "no-unreachable": "warn",

        // Completely disagree
        "quote-props": "off",
        "sort-keys": "off",
        "comma-dangle": "off",
        "array-element-newline": "off",
        "object-curly-spacing": "off",
        "padded-blocks": "off",
        "one-var": "off",
        "consistent-return": "off",
        "multiline-ternary": "off",
        "no-ternary": "off",
        "object-property-newline": "off",
        "function-call-argument-newline": "off",
        "id-length": "off",
        "lines-around-comment": "off",
        "no-inline-comments": "off",
        "implicit-arrow-linebreak": "off",
        "function-paren-newline": "off",
        "nonblock-statement-body-position": "off",
        "max-params": "off",
        "dot-location": "off",
        "no-undefined": "off",
        "array-callback-return": "off",
        "operator-linebreak": "off",
        "space-before-function-paren": "off",
        "brace-style": "off",
        "array-bracket-newline": "off",
        "linebreak-style": "off",
        "no-continue": "off",

        // Can maybe see where they're coming from but I disagree
        "line-comment-position": "off",
        "no-nested-ternary": "off",
        "max-statements": "off",
        "no-throw-literal": "off",
        // Honestly dont entirely know what this is for but I dont care about it that much
        "default-param-last": "off",
        "init-declarations": "off",
        "require-unicode-regexp": "off",
        "capitalized-comments": "off",
        "multiline-comment-style": "off",

        /*
         * I would still like to have a warning for something like these
         * but they are either too annoying or dont do exactly what I want
         */
        "sort-imports": "off",
        "no-magic-numbers": "off",
        "max-lines-per-function": "off",
        "no-empty-function": "off",
        "prefer-destructuring": "off", // Case of const a = b[1]; would be annoying to write as const [_, a] = b;
        complexity: "off",
        "max-lines": "off",
        "no-negated-condition": "off",
        "default-case": "off",
        "max-len": "off",
        "no-console": "off",
        "no-use-before-define": "off", // Does not account for function hoisting

        /*
         * Doesnt exist here but it does exist in eslint-plugin-unicorn
         * "prefer-logical-operator-over-ternary": "error",
         */

        // These ones are nice but conflict with prettier
        "no-extra-parens": "off", // The two differ on whether ...(a ? b : c) needs parentheses or not
        quotes: "off", // Prettier will force a situation like 'url("SUP")' to interfere with this
        /*
         * Prettier will put an object inside of a ternary indented two extra spaces out for some reason,
         * this one can probably be fixed on the prettier side but whatever
         */
        indent: "off",
        "no-mixed-operators": "off",
        "no-confusing-arrow": "off", // This one would actually be sorta nice but prettier makes it annoying
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    ignorePatterns: ["**/*.html", "workingexamples/*", "examples/*"],
};
