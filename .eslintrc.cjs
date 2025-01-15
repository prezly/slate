module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "prettier",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "import",
        "react",
        "react-hooks",
        "jsx-a11y",
        "sort-keys-fix"
    ],
    "settings": {
        "react": {
            "version": "16.9"
        }
    },
    "rules": {
        "no-fallthrough": "off",
        "react/display-name": "warn",
        "react/prop-types": "off",
        "import/no-default-export": "error",
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": true,
                // @see https://github.com/import-js/eslint-plugin-import/issues/458
                "packageDir": [__dirname]
            }
        ],
        "func-style": ["error", "declaration"],
        "import/order": [
            "error",
            {
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                },
                "groups": [["builtin", "external"], "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
                "pathGroups": [
                    { "pattern": "#*", "group": "external", "position": "after" },
                    { "pattern": "#*/*", "group": "external", "position": "after" },
                ],
            }
        ],
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: 'inline-type-imports' }],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-unused-vars": ["warn", {
            "argsIgnorePattern": "_.*",
            "varsIgnorePattern": "_.*"
        }],
        "@typescript-eslint/no-inferrable-types": "warn"
    },
    "overrides": [
        {
            "files": ["gulpfile.*"],
            "env": {
                "node": true,
            }
        },
        {
            "files": ["**/*.tsx"],
            "rules": {
                "func-style": "off"
            }
        },
        {
            "files": ["**/*.d.ts", "**/*.stories.tsx"],
            "rules": {
                "import/no-default-export": "off"
            }
        },
        {
            "files": ["**/*.test.*"],
            "rules": {
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "react/display-name": "off",
                "react/jsx-key": "off"
            },
            "globals": {
                "expect": "readonly",
            },
        },
        overrideNoExtraneousDependenciesRule('slate-types'),
        overrideNoExtraneousDependenciesRule('slate-commons'),
        overrideNoExtraneousDependenciesRule('slate-lists'),
        overrideNoExtraneousDependenciesRule('slate-tables'),
        overrideNoExtraneousDependenciesRule('slate-editor'),
    ]
}

/**
 * @param {string} packageName
 */
function overrideNoExtraneousDependenciesRule(packageName) {
    return {
        "files": [`packages/${packageName}/**/*`],
        "rules": {
            "import/no-extraneous-dependencies": [
                "error",
                {
                    "devDependencies": true,
                    // @see https://github.com/import-js/eslint-plugin-import/issues/458
                    "packageDir": [__dirname, `${__dirname}/packages/${packageName}`]
                }
            ],
        }
    };
}
