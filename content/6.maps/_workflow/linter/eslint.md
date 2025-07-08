---
title: ESLint
description: ESLint 是 JavaScript 和 TypeScript 的代码质量检查工具，帮助开发者保持代码风格一致性和减少错误。
---

## 版本

#### 如何迁移到 Flat Config？

见：[配置迁移指南@eslint](https://zh-hans.eslint.org/docs/latest/use/configure/migration-guide)

## 工具类库

#### `rushstack/eslint-patch` 有什么作用？

最主要的功能是为 ESLint 带来现代的模块解析功能。它加载了 .eslintrc.js 并在内存中修改了 ESLint 引擎，使其插件解析器引用模块的路径是相对于引用配置文件，而不是项目根目录，这可以增强 monorepo 下的开发体验。

到了 Flat Config 时代，ESLint 的插件寻址路径已经改为相对于配置文件所在目录，而不是项目根目录。

见：[rushstack/eslint-patch@github](https://github.com/microsoft/rushstack/tree/main/eslint/eslint-patch)

## 配置

#### 配置分为哪些类型？

* 解析器配置（parer）：包含处理器和解析器，处理器用于获取文本中可解析内容，解析器用于将内容解析为 [ESLint AST](https://eslint.org/docs/latest/extend/custom-parsers#ast-specification)。
* 环境配置（env）：指定代码运行的环境项如 node、browser，以及设置全局变量 global。
* 规则配置（rules）：指定代码检查的规则项，如 no-unused-vars、eqeqeq 等。
* 共享设置（settings）：所有规则都可以访问的共享设置项，如给 [import-x/resolver](https://github.com/element-plus/element-plus/blob/49e1d594fa7cbabdbf3958591d44c9e456563005/internal/eslint-config/index.js#L21) 配置需要解析的文件类型。
* 插件配置（plugins）：扩展 ESLint 的功能，包含插件和规则。

#### ESLint 配置的优先级和覆盖规则是怎样的？

* 文件内联配置：`/* eslint-disabled */`、`/* global */`、`/* eslint xxx: "off" */`、`/* eslint-env node */`
* 命令行选项：`--global`、`--rule`、`--env`、`--config`
* 文件配置：首先寻找和校验文件同目录的文件配置和 package.json eslintConfig 配置，没找到则向上级目录寻找，直到根目录，或找到包括 `root: true` 的配置

Flat Config 配置不存在向上级目录寻找的情况。

#### ESLint 相对 glob 模式的坑？

使用相对 glob 模式如 `**/*.js` 时，如果使用配置文件模式，那么相对路径是相对于配置文件所在目录；如果使用 CLI 传入配置（--config）那么相对路径是相对命令执行的工作目录。

#### 为什么 ESLint@8 废弃了个人配置文件？

个人配置文件指 `~` 目录（用户主目录）下的配置文件，如果 ESLint 在项目中找不到配置文件，那么将自动搜寻用户主目录下的配置文件。但是配置文件这种形式难以共享和修改（因为它从用户主目录下 node_modules 加载共享配置和解析器，而在项目目录加载插件），所以在 ESLint@8 被废弃。

#### 如何配置全局变量？

* 文件内联配置：`/* global x1, x2:writable */`、`/* eslint-env es2022, node, mocha */`
* 使用配置文件或 eslintConfig 中的 env 字段

注意，如果直接更改 parserOptions 的 ecmaVersion 而不更改 env 配置，是不会支持对应版本 ES 规范的全局变量的，因为 parserOptions 的 ecmaVersion 只是告诉 ESLint 使用哪个版本的 ECMAScript 语法解析代码。

见：[ESLint parserOptions](https://zh-hans.eslint.org/docs/latest/use/configure/language-options#-7)

#### 配置和插件有什么区别？

配置是 ESLint 的规则和选项的集合（eslint-config-airbnb），而插件是扩展 ESLint 功能的模块（eslint-plugin-vue），插件可以包含自定义规则、解析器和共享配置。

#### 共享配置如何实现？

见：[p-ray/eslint-config](https://github.com/pi-ray/eslint-config)

## 性能

#### 关于性能的指摘？

社区有一些 Rust 化的替代品，如 RSLint（已停更）。ESLint 内部也讨论过 Rust 化的可能性，见 [Complete rewrite of ESLint](https://github.com/eslint/eslint/discussions/16557)，ESLint 作为一个通用的代码检查器，其核心流程（包括解析路径、修复错误、报告错误等）并不慢，慢的是特殊的插件以及在单线程环境中运行解析器并创建巨大的抽象语法树。
