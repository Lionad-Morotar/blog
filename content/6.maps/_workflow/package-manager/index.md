---
title: 包管理器
description: 用于管理项目依赖的工具
tags:
  - package-manager
  - npm
  - pnpm
  - yarn
  - tnpm
  - corepack
  - lockfile
  - dependencies
---

## 包管理器或二次概念 

* [npm](/maps/_workflow/package-manager/npm)
* [pnpm](/maps/_workflow/package-manager/pnpm)
* [lockfile](/maps/_workflow/package-manager/lockfile)

## 发展历程

推荐阅读：

* [node_modules 困境](https://zhuanlan.zhihu.com/p/137535779)，除了 NodeJS 生态，文章还介绍了 Rust 是如何进行包管理的。
* [关于依赖管理的真相—前端包管理器探究](https://mp.weixin.qq.com/s/t6RZAKb6mXTfXl7XbpZ_vw)，文章对 NodeJS 中各新老包管理器逐个点了名，还简单提及了 Deno 中的包管理。
* [深入浅出 tnpm rapid 模式-如何比 pnpm 快 10 秒](https://zhuanlan.zhihu.com/p/455809528)，大综述。
* [一种秒级安装 npm 的方式](https://www.zhihu.com/zvideo/1467489669319036928)，更详细地介绍了 tnpm Rapid 的工作原理。

#### 古早的 NPM 是怎么管理依赖的？

早期 NPM（V1、V2） 使用原始的嵌套模式来管理依赖，没有使用优化策略，所以带来了依赖地狱和多版本共存的问题。

* 依赖地狱：依赖路径过长、占用空间过大、安装缓慢。

#### NPM V3 带来了哪些改进？

NPM V3 开始，使用扁平模式管理依赖，把重复依赖提升到 node_modules 一级目录，缓解了依赖地狱的问题，但却引入了幽灵依赖、多重依赖和不确定性等问题。

* **幽灵依赖**：如果某依赖不是包本身的依赖但是被提升到了一级目录，那么就能在代码中引入。
* **多重依赖**：首先，依赖的某版本已经提升了，却不会影响其它依赖共同依赖它的其它版本，所以还是存在多重依赖的问题；其次，由于 NodeJS 的 require 的缓存规则是按照文件名及路径而不是模块名，此时对依赖进行有副作用的修改会破环单例模式；再者不同版本依赖的 types 可能会冲突。
* **不确定性**：手动安装依赖可能会带来和 npm install 安装后不同的结构。

#### yarn 的 PnP 模式是什么？

Yarn（V2）带来一种独特的依赖安装模式：[PnP（Plug'n'Play）](https://yarnpkg.com/features/pnp)，它在项目中使用 .pnp.cjs 文件来缓存各模块及其位置的关系。这样一来，所有依赖都可以被统一管理，极大减少了安装依赖时 IO 操作。

#### pnpm 解决了什么问题？

2017 年，pnpm V1 通过统一依赖管理以及创建系统链接的方法一举解决了幽灵依赖和多重依赖的问题。所有项目的依赖都被统一安装到了磁盘特定位置。即使多个项目中用到相同的依赖也只会安装一次。此外，项目中的 node_modules 文件夹仍然是 [结构化的](https://www.pnpm.cn/blog/2020/05/27/flat-node-modules-is-not-the-only-way)，所以比 PnP 有更好的兼容性。

#### tnpm 的主要思路是什么？

tnpm 想给包管理工具提供一套方案，以解决所有恼人的问题。在网络端，使用服务器来生成依赖树，节约请求；在表示层，将 tgz 文件合并写入 tar，节约写入次数；在 IO 层，使用 Rust 完成 IO 操作性优于 NodeJS；在系统层，使用 FUSE 文件系统，省去文件解压操作。

![tnpm](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220318001222.png)

## 常见问题

#### 包管理器差异？

peerDependencies：

* npm v3 ~ v6 不会自动安装 peerDependencies，见：[peerDependencies | npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
* npm v6.x 没有考虑 peerDependencies 的依赖结构，容易在用户安装了和 peerDepend 的包的不同版本号的依赖时导致问题，见：[npm 与 yarn 对 peerDependencies 处理的差异 | 张立理](https://zhuanlan.zhihu.com/p/237532427)
* pnpm 有特殊处理，见 [How peers are resolved | pnpm](https://pnpm.io/how-peers-are-resolved)

#### 如何锁定包管理器？

1. 可以使用脚本判断环境变量中的 npm_execpath 或者 npm_config_user_agent，分别根据执行指令的包管理器具体路径、执行指令的包管理器具体版本（Vue3 和 Vite 分别使用了这两种办法限制特定的包管理器）。
2. 使用 only-allow 包（Vite 使用这种方法）。
3. 使用 Corepack 锁定包管理器

```js
process.env.npm_execpath
// -> /usr/lib/node_modules/npm/bin/npm-cli.js
process.env.npm_config_user_agent
// -> npm/8.1.2 node/v16.13.2 linux x64 workspaces/false
```

见：[preinstall 钩子和 only-allow](https://blog.csdn.net/Android062005/article/details/124794071)

#### Corepack 是什么？

Corepack 是 NodeJS v16.13、 v14.19.0 实装的包管理工具。

* 配合 package.json 中的 packageManager 字段锁定库的包管理工具，如 `"packageManager": "pnpm@7.14.1"`

常见问题：

* Corepack 是实验功能，所以需要手动启用

```bash
corepack enable
```

* Corepack 不会拦截 npm，但可以启用对 npm 指令的拦截

```bash
corepack enable npm
```

* Corepack 自动安装了 NodeJS 发版时截至的最新的 yarn 和 pnpm，但是可以更新

```bash
corepack prepare pnpm@<version> --activate
```

见：[Corepack | NodeJS](https://nodejs.org/api/corepack.html)
见：[NodeJS Corepack](https://juejin.cn/post/7111998050184200199)

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

#### 为什么 package.json scripts 中路径宜用引号包裹起来？

因为 glob patterns 有兼容性问题，NPM 在 Linux 平台使用 sh -s 指令运行脚本，在 Windows 上使用 cmd /d /s /c。如果是编写应用代码，则可以使用 node-glob 等工具处理路径以解决跨平台的兼容性问题。

见：[<i>Why you should always quote your globs in NPM scripts</i>](https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784)
