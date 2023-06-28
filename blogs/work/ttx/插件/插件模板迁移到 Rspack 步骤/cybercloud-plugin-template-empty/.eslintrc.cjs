/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    "plugin:json/recommended",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  globals: {
    process: "readonly",
    cyber: "readonly",
  },
  overrides: [],
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "no-alert": 0,
    "vue/multi-word-component-names": 0,
    "no-param-reassign": 0,
  },
};
