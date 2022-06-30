# 包管理器

[TOC]

## 问题

#### 如何锁定包管理器？

可以使用环境变量中的 npm_execpath 或者 npm_config_user_agent，分别根据执行指令的包管理器具体路径、执行指令的包管理器具体版本及环境做判断。Vue3 和 Vite 分别使用了这两种办法限制特定的包管理器（Vite 实际使用了 only-allow 这个包）。

```js
process.env.npm_execpath
// -> /usr/lib/node_modules/npm/bin/npm-cli.js
process.env.npm_config_user_agent
// -> npm/8.1.2 node/v16.13.2 linux x64 workspaces/false
```

见：[preinstall 钩子和 only-allow](https://blog.csdn.net/Android062005/article/details/124794071)

#### 如何锁定 NodeJS 版本？

在 package.json 中新增 engine 字段，并在 .npmrc 文件中开启 engine-strict 配置。如果只改了 engines 字段，npm 是不会生效的。

```json
// package.json
"engines": {
  "node": "14.x || 16.x"
}
// .npmrc
engine-strict = true
```
