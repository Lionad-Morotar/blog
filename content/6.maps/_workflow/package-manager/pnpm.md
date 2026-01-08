---
title: pnpm
description: pnpm 是一个快速、省空间的包管理器
---

## API 细节和配置项

#### pnpm import

使用 `pnpm import` 可以将 package-lock、npm-shrinkwrap 和 yarn.lock 转换为 pnpm-lock 文件。

#### pnpm fetch

`pnpm fetch` 它跳过了 package.json 文件，允许项目在只有 pnpm-lock 文件的情况下创建 .pnpm 虚拟仓库。这有利于 docker 构建，因为 package.json 经常因为非依赖变化的改动而改动，导致 docker layer 失效。

相比 yarn 和 npm，在脱离 package.json 的情况下，单靠 package-lock（或 yarn-lock），yarn 和 npm 没有办法确定依赖版本，因为其 package-lock 中，依赖的版本号不是固定版本号。

#### pnpm why

使用 `pnpm why` 可以列出项目内依赖了某个依赖的依赖，比如说找到项目内使用了 lodash 的包。

```plaintext
dependencies:
element-plus 2.2.20
├── lodash 4.17.21
└─┬ lodash-unified 1.0.3
  └── lodash 4.17.21 peer
...
```

#### pnpm run

与其它包管理器的一些区别：

1. `pnpm run script-name`，如果 `script-name` 没有和 pnpm 内置指令冲突，则可以省略 `run`
2. run 指令默认不会执行 pre 和 post 钩子函数，因为 pnpm 认为这使任务流更难理解
3. `shell-emulator` 选项启用后，将使用 JS 解析指令，这使得在不兼容 POSIX 的环境执行类似 `NODE_ENV=test node ./index` 的指令会报错的系统也能正常运行这种指令

#### pnpm pack

将项目打包为 tarball 压缩包（.tgz）。打包的文件范围和 pnpm publish 一样。

#### shared-workspace-lockfile

在 workspace 间共享一份 package-lock 文件。这个配置开启后，所有子包的依赖都会被提升到 workspace 根目录，这带来了几个好处：

1. 所有依赖都是单例的
2. 更快的安装速度（相比 pnpm install -r）
3. 修改的文件总数更少，利于 Code Review

#### shell-emulator

解析 package.json 中的 scripts 时，是否使用内置的 JS 实现的解析器，已支持跨平台语法。默认关闭。

#### .pnpmfile.cjs

使用 `.pnpmfile.cjs` 文件提供的 readPackage 和 afterAllResolved 钩子函数可以分别介入依赖元信息解析（minifest）和依赖安装完准备输出 lock 文件的过程。

```js
function readPackage(pkg, context) {
  // Override the manifest of foo@1.x after downloading it from the registry
  if (pkg.name === 'foo' && pkg.version.startsWith('1.')) {
    // Replace bar@x.x.x with bar@2.0.0
    pkg.dependencies = {
      ...pkg.dependencies,
      bar: '^2.0.0'
    }
    context.log('bar@1 => bar@2 in dependencies of foo')
  }
  
  // This will change any packages using baz@x.x.x to use baz@1.2.3
  if (pkg.dependencies.baz) {
    pkg.dependencies.baz = '1.2.3';
  }
  
  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
```

见：[pnpmfile](https://pnpm.io/pnpmfile)

## 原理

#### 显著的优点？

1. 省磁盘空间，使用软硬链接和符号链接节约空间。
2. 安装依赖快，因为处理链接要比处理文件快，并且每个包的解析、下载和写入磁盘这三个阶段是分离的。
3. 内建支持 monorepo，所有命令支持 `--filter` 过滤包。
4. 依赖严格，避免幽灵依赖和依赖分身问题。

#### 依赖的层次结构是怎样的？

当项目文件读取 `bar` 时，直接读取 `node_modules/bar`，但它其实是 `.pnpm` 文件夹下 `bar/node_modules/bar` 的一个符号链接。也就是说，他的真实的地址在 `.pnpm` 文件夹下。这样一来，当 `bar` 读取它的依赖的时候（项目的依赖的依赖），会在 `bar` 的上层目录即 `bar/node_modules` 找到 `foo` 这个依赖。项目文件没法读取 `bar/node_modules/foo` 所以避免了幽灵依赖问题。

`bar/node_modules/foo` 要怎么找到它的依赖呢？它的真实地址在项目 ·（和官网的图有出入），所以 foo 也只能读取它自己的子依赖，即 `node_modules/.pnpm/foo/node_modules`。如果有依赖依赖了同一份（同一版本）的 `foo`，那么它们的真实地址都是一样的 `node_modules/.pnpm/foo/node_modules/foo`，这样就避免依赖分身问题。

![Modules Mapping in pnpm](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220317192927.png)

见：[Flat node_modules is not the only way | @pnpm](https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way)、[Symlinked node_modules structure | @pnpm](https://pnpm.io/symlinked-node-modules-structure)

#### 如何处理同级依赖？

当项目的两个包 A、B 依赖依赖了同一版本的 C，但是却安装了不同版本的 C 的同级依赖 D@1.0 和 D@1.1，这时，A 依赖的 C 的真实地址是 `.pnpm/C_D@1.0/node_modules/C`，B 依赖的 C 的真实地址是 `.pnpm/C_D@1.1/node_modules/C`。这样一来，两个 C 在读取其同级依赖时，分别读取了 `.pnpm/C_D@1.0/node_modules/D` 和 `.pnpm/C_D@1.1/node_modules/D@1.0`，分别对应真实地址 `.pnpm/D@1.0/node_modules/D` 和 `.pnpm/D@1.1/node_modules/D`。

当同级依赖的深度增加时，层级结构也随之变得复杂。如果某个依赖 A 依赖了同一个 B，但是 B 子依赖 C 的版本不同（C@1.0 和 C@1.1），这样就创造出了指数级增长的软链数量。为了保证 B 能分别访问两个 C，B 的符号链接的被链接地址会有 `.pnpm/B_C@1.0/node_modules/B` 和 `.pnpm/B_C@1.1/node_modules/B`，而为此，A 的被链接地址也会有两个，`.pnpm/A_C@1.0/node_modules/A` 和 `.pnpm/A_C@1.0/node_modules/A`。从不同的 A 的被链接地址的上级目录 `node_modules` 可以读取到不同的 B 的被链目录，从不同的 B 可以读取到不同的 C。

```plaintext
node_modules
└── .pnpm
    ├── a@1.0.0_c@1.0.0
    │   └── node_modules
    │       ├── a
    │       └── b -> ../../b@1.0.0_c@1.0.0/node_modules/b
    ├── a@1.0.0_c@1.1.0
    │   └── node_modules
    │       ├── a
    │       └── b -> ../../b@1.0.0_c@1.1.0/node_modules/b
    ├── b@1.0.0_c@1.0.0
    │   └── node_modules
    │       ├── b
    │       └── c -> ../../c@1.0.0/node_modules/c
    ├── b@1.0.0_c@1.1.0
    │   └── node_modules
    │       ├── b
    │       └── c -> ../../c@1.1.0/node_modules/c
    ├── c@1.0.0
    ├── c@1.1.0
```

见：[How peers are resolved | @pnpm](https://pnpm.io/how-peers-are-resolved)

#### 怎样兼容 NodeJS 模块加载顺序？

不论系统自带的模块，NodeJS 加载模块的顺序是这样的：

1. 读取本文件夹中 node_modules 中对应名字的文件夹的 package.json，并寻找 main 字段对应的路径
2. 读取本文件夹中 node_modules 中对应名字的 js 文件
3. 读取本文件夹中 node_modules 中对应名字文件夹中的 index.js 文件
4. 跳出本文件夹，继续前三个步骤

因为项目 `node_modules/bar` 是 `.pnpm/bar/node_modules/bar` 的符号链接，所以项目文件可以直接读取 `node_modules/bar/x.js`。同时，如果 `node_modules/bar/x.js` 需要加载 `foo/x.js`，那么在上述步骤的第 4 步，就能找到 `.pnpm/bar/node_modules/foo/x.js` 文件。

#### 为什么其模块层次只是“比较严格的”（semistrict）？

由 NodeJS 模块加载规则可知，在 pnpm 创造的依赖层次下，一个依赖的子依赖间仍有相互访问的能力。

#### 为什么能节约磁盘空间？

由 pnpm 创造的 node_modules 层级结构可以知道，所有依赖的符号链接的真实地址都在 `.pnpm/package-name/node_modules/package-name` 这个文件夹中。这种文件夹会通过硬链接的形式链接到 `user-document/.pnpm-store` 中，所以相同的包只会存一份，也就是 `.pnpm-store/package-name`。

#### 软硬链接有什么问题？

* 特定的软链结构会导致某些应用出现死循环
* 硬链接是同一份文件，不便调试
* 软链接在非 SSD 上的读写会有性能损耗
* pnpm 创造的 node_modules 层级结构会破坏某些依赖依赖了相对路径的依赖的逻辑

见：[精读 pnpm](https://zhuanlan.zhihu.com/p/553804414)

## 常见问题

#### PNPM 找不到全局路径的解决方法？

尽管设置了全局变量，也重新安装了最新版本 PNPM，也执行了 pnpm setup，却仍然报错找不到全局路径的临时解决方案：

```powershell
$PNPM_HOME="<path>" | pnpm install -g xxx
```

#### PNPM 速度变慢了？

今天逛官网时，偶然发现 Readme 中的 benchmark 过时了。它说“要比 Yarn Classic 和 npm “快两倍以上，但是从 benchmark 来看，他要比 Yarn 和 npm 慢了不少。以后启用 NodeJS 20 以上时，如果问题得不到改善，我应该会重新选择 npm 而不是 pnpm，鉴于幽灵依赖和依赖分身带来的问题是可排查可解决的，而速度是解决不了的问题。

![pnpm vs npm vs yarn benchmark](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230605235736.png)

相关见：[pnpm seems to be consistently slower than yarn (classic)](https://github.com/pnpm/pnpm/issues/6447)

#### 和 Bun 在安装速度上的对比？

有锁文件、本地缓存，无 node_modules 的情况下，bun 要比 pnpm 安装至少快 3 倍。

* 一个原因是 pnpm、yarn 等工具会在安装时请求最新的 metadata，而 bun 使用的 metadata 源于本地缓存的 metadata。
* 另一个原因是 pnpm 在创建 node_modules 层次结构是使用了大量的 symlink，相比其他包管理工具仅使用复制或 hardlink 有更多系统调用。

所以如果想使 pnpm 更快的安装，可以使用 prefer-offline 选项，以及，node-linker=hoisted 也许有用。

见：[Bun.sh-like Module Resolution](https://github.com/pnpm/pnpm/issues/7391)

#### 关于 V8 版本的变化？

* `resolve-peers-from-workspace-root` is `true` by default
* `auto-install-peers` is `true` by default
* `dedupe-peer-dependents` set to true by default
* 停止 NodeJS 14 的支持
* lockfile v6 by default
* resolution mode（prebundle、time-based、lowest-direct）default set to lowest-based，需要注意手动升级，尤其是在没有锁文件的情况
* only deply `files` field when the field exist

#### PnP 模式下的依赖提升设置？

默认的 node_modules 依赖的层级处于严格和不严格之间的水平（semi-strict）。使用最严格的设置需要打开 PnP 模式，因为在 monorepo 中 PnP 模式中，就算开启了 `hoist=false` 也不会禁用 workspace root 的依赖

```
node-linker=pnp
symlink=false
```

见：[Node-Modules configuration options with pnpm](https://pnpm.io/blog/2020/10/17/node-modules-configuration-options-with-pnpm)

#### 在 Windows Dev Driver 上可能会碰到的问题？

2024 年初 pnpm 实现了 Dev Driver 上的 Copy on Write 功能，但可能会碰到变慢的问题。

见：[pnpm lately slow and pnpx stuck at installing deps using executable package](https://github.com/pnpm/pnpm/issues/7547)

#### 下载多份二进制代码的问题？

目前应该是所有包管理器都有这种问题，但是不知道怎么解决。

![sass-embedded 下载了多份二进制代码](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200412724.png)
