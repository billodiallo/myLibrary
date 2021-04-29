/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/*global some_unused_var */
// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": false
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};
