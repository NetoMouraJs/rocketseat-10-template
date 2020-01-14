module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error"
    },
    extends: "plugin:prettier/recommended",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: ["error", "tab"],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "single"],
        semi: ["error", "never"]
    }
};
