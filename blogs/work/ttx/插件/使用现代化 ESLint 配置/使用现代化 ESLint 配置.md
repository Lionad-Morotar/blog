[TOC]

## 背景

## 操作步骤

1. 移除 package.json 中 eslint 和 prettier 相关依赖，以及移除 TypeScript@5。
2. `pnpm install @rushstack/eslint-patch@^1.1.4 @types/node@^18.11.12 @vue/eslint-config-prettier@^7.0.0 @vue/eslint-config-typescript@^11.0.0 eslint@^8.22.0 eslint-plugin-vue@^9.3.0 prettier@^2.7.1 @vue/tsconfig@^0.1.3 typescript@~4.7.4 -D`
3. 添加 `.prettierrc.json` 文件。如果项目中已经又 prettier 配置（如 package.json 中 prettier 字段），需要转移到对应的文件。

```prettier
{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5",
  "arrowParens": "always",
  "endOfLine": "auto",
  "printWidth": 120
}
```

4. 添加 `.eslintrc.cjs` 文件。如果项目中已有配置，需同步。

```js
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  ignorePatterns: [".cybercloud/", "lint-staged.config.js", "vue.config.js", "**/*.d.ts"],
  env: {
    browser: true,
  },
  extends: [
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
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "no-alert": 0,
    "vue/multi-word-component-names": 0,
    "no-param-reassign": 0,
  },
};
```

5. 移除项目 eslintignore 文件，使用 .eslintrc.cjs 中的 ignorePatterns 作为替代

```json
{
  ignorePatterns: [
    ".vscode",
    "**/secrets/**/*"
  ]
}
```

6. 删除 jsconfig.json
7. 增加 `tsconfig.json` 和 `tsconfig.config.json` 文件。如果项目已有配置，需同步。

tsconfig.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "types": [
      "element-plus/global",
      "@cybercloud/ui/global"
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "references": [
    {
      "path": "./tsconfig.config.json"
    }
  ]
}
```

tsconfig.config.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "playwright.config.*",
    "lint-staged.config.js",
    "vue.config.js"
  ],
  "compilerOptions": {
    "composite": true,
    "types": ["node"]
  }
}
```

7. 添加 npm script `"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"`
9. VSCode 安装 Volar、ESLint 插件。Volar 设置选用项目内 TypeScript 版本。重启 VSCode。
10. 执行 `pnpm lint` 自动修复项目错误，没有问题后提交到线上。