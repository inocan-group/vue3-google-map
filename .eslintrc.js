module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    google: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-var-requires": "off",
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    semi: ["error", "always"],
    quotes: ["warn", "double"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "cases|^_",
        argsIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/*.spec.*", "**/*.test.*"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
