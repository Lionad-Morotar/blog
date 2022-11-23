# 包管理器

[TOC]

## 常用的包管理器

* [npm](/maps/workflow/package-manager/npm.html)
* [pnpm](/maps/workflow/package-manager/pnpm.html)

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

#### lockfiles 解决了什么问题？

lockfiles 主要解决包管理的不确定性问题，此外可以通过共享 lockfiles 使团队的 node_modules 保持一致。

Yarn V1 在 NPM V3 时发布了，引入了 lockfiles。但由于不能完整记录依赖之间的依赖结构，所以不如 NPM V5 的 lockfiles 好，后者将依赖的元信息及结构完整记录在文件中。

#### 为什么用了 lockfiles 还是不能保证环境统一？

因为 npm install 时可能会根据 Semver 自动更新依赖的版本。Semver 被设计用来解决模块不同版本的兼容性问题，但是并不完美，因为在实际的代码开发中，所有代码更改都没用绝对的 no breaking change 一说。也就是说，尽管是小版本改动，也可能带来问题。

<Frame src="/maps/devops/version-control.html" />

#### yarn 的 PnP 模式是什么？

Yarn（V2）带来一种独特的依赖安装模式：[PnP（Plug'n'Play）](https://yarnpkg.com/features/pnp)，它在项目中使用 .pnp.cjs 文件来缓存各模块及其位置的关系。这样一来，所有依赖都可以被统一管理，极大减少了安装依赖时 IO 操作。

#### pnpm 解决了什么问题？

2017 年，pnpm V1 通过统一依赖管理以及创建系统链接的方法一举解决了幽灵依赖和多重依赖的问题。所有项目的依赖都被统一安装到了磁盘特定位置。即使多个项目中用到相同的依赖也只会安装一次。此外，项目中的 node_modules 文件夹仍然是[结构化的](https://www.pnpm.cn/blog/2020/05/27/flat-node-modules-is-not-the-only-way)，所以比 PnP 有更好的兼容性。

#### tnpm 的主要思路是什么？

tnpm 想给包管理工具提供一套方案，以解决所有恼人的问题。在网络端，使用服务器来生成依赖树，节约请求；在表示层，将 tgz 文件合并写入 tar，节约写入次数；在 IO 层，使用 Rust 完成 IO 操作性优于 NodeJS；在系统层，使用 FUSE 文件系统，省去文件解压操作。

![tnpm](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220318001222.png)

## 常见问题

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

#### 为什么 package.json scripts 中路径宜用引号包裹起来？

因为 glob patterns 有兼容性问题，NPM 在 Linux 平台使用 sh -s 指令运行脚本，在 Windows 上使用 cmd /d /s /c。如果是编写应用代码，则可以使用 node-glob 等工具处理路径以解决跨平台的兼容性问题。

见：[<i>Why you should always quote your globs in NPM scripts</i>](https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784)
