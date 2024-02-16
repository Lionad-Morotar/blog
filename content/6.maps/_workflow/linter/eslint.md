# ESLint

https://github.com/sudongyuer/learn-eslint

#### Prettier 和 ESLint 的区别是？

Prettier 是代码格式化工具，而 ESLint 则是 JS/TS 等代码的校验工具，只不过也有格式化这个功能。通过安装 ESLint 插件，可以使项目中的 ESLint 兼容 Prettier 的规则。再配置好 husky，就可以很方便的给暂存区代码进行格式化校验了。

## 配置

#### ESLint 支持哪些类型的配置？

* package.json 中的 eslintConfig 字段
* eslintrc 文件，包括 js、cjs、yaml、yml、json 文件格式，不支持 mjs
* 文件内联配置
* CLI 参数

见：[ESLint Configure Files](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files#-1)

#### ESLint 配置的优先级和覆盖规则是怎样的？

* 文件内联配置：`/* eslint-disabled */`、`/* global */`、`/* eslint xxx: "off" */`、`/* eslint-env node */`
* 命令行选项：`--global`、`--rule`、`--env`、`--config`
* 文件配置：首先寻找和校验文件同目录的文件配置和 package.json eslintConfig 配置，没找到则向上级目录寻找，直到根目录，或找到包括 `root: true` 的配置

#### ESLint 相对 glob 模式的坑？

使用相对 glob 模式如 `**/*.js` 时，如果使用配置文件模式，那么相对路径是相对于配置文件所在目录；如果使用 CLI 传入配置（--config）那么相对路径是相对命令执行的工作目录。

#### 为什么 ESLint@8 废弃了个人配置文件？

个人配置文件指 `~` 目录（用户主目录）下的配置文件，如果 ESLint 在项目中找不到配置文件，那么将自动搜寻用户主目录下的配置文件。但是配置文件这种形式难以共享和修改（因为它从用户主目录下 node_modules 加载共享配置和解析器，而在项目目录加载插件），所以在 ESLint@8 被废弃。

#### 如何配置全局变量？

* 文件内联配置：`/* global x1, x2:writable */`、`/* eslint-env es2022, node, mocha */`
* 使用配置文件或 eslintConfig 中的 env 字段

如果直接更改 parserOptions 的 ecmaVersion 而不更改 env 配置，是不会支持对应版本 ES 规范的全局变量的。

见：[ESLint parserOptions](https://zh-hans.eslint.org/docs/latest/use/configure/language-options#-7)

#### ESLint 文件注释内联配置如何支持说明文本？

说明可以跟在两个或多个短横线符号之后。