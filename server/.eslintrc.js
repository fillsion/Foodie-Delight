module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "overrides": [
        {
            "files": ["**/*.ts"], 
            "parser": "@typescript-eslint/parser", 
            "plugins": ["@typescript-eslint"], 
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            "rules": {
                '@typescript-eslint/no-var-requires': 0,
            }
        },
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
    }
};
