---
title: pnpm
description: pnpm 是一个快速、省空间的包管理器
original_path: "/_workflow/package-manager/pnpm.md"
---

## API 细节和配置项

#### catalogs 与 catalogMode strict 提供原生版本单例

「要锁全仓单一依赖版本就得用 Rush」的选型动机已过时。pnpm 在 pnpm-workspace.yaml 中维护 catalog
版本目录，各包用 catalog: 协议引用依赖，版本真源只存在一处；pnpm update 对 catalog 依赖只改写
catalog 条目，不动各包 package.json。v10.12.1 引入的 catalogMode: strict 更进一步：pnpm add 到
不在 catalog 版本范围内的依赖直接报错，把版本漂移的发现点从 code review 前移到安装时。
它不提供 Rush 式的依赖视图重建，但覆盖了统一版本这个最常见的单例诉求。

见：[Catalogs | pnpm](https://pnpm.io/catalogs)

#### pnpm import

使用 `pnpm import` 可以将 package-lock、npm-shrinkwrap 和 yarn.lock 转换为 pnpm-lock 文件。

#### pnpm fetch

`pnpm fetch` 它跳过了 package.json 文件，允许项目在只有 pnpm-lock 文件的情况下创建 .pnpm 虚拟仓库。这有利于 docker 构建，因为 package.json 经常因为非依赖变化的改动而改动，
导致 docker layer 失效。

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

将项目打包为 tarball 压缩包（.tgz）。pnpm 12 之前，打包的文件范围和 pnpm publish 一样。

#### pnpm 12 publish 打包向上叠加 monorepo 根 .gitignore

pnpm 12 的 publish 在真实打包时会向上查找并叠加 workspace 根 .gitignore：若根目录忽略了
`dist`、`types` 等产物目录，各包 `files` 字段命中的文件会被排除，tarball 只剩 `main`
入口文件（npm 规范强制包含）、README/LICENSE 等顶层文件与未被忽略的目录。pnpm 10 与
npm 只读取包目录自身的 ignore 文件，无此行为。

更隐蔽的是验证陷阱：`pnpm pack` 与 `publish --dry-run` 输出的文件清单都与真实打包
不一致，二者均显示完整产物；pnpm 10 的真实发布也正常。凡是不经过"pnpm 12 真实
publish"路径的验证都是假绿灯。本地预演手段：verdaccio 起本地 registry 真实 publish，
再用 npm pack 拉回 tarball 检查文件清单。

修复是在每个发布包目录放置空 `.npmignore`：npm 系打包实现中 `.npmignore` 会完全替代
`.gitignore`（二者不合并），包内规则就位后打包器不再向上查找。

见：[Package Manager Magic Files](https://nesbitt.io/2026/03/05/package-manager-magic-files.html)

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

模块层次结构与符号链接机制见：[pnpm 模块原理](/maps/_workflow/package-manager/pnpm-modules)

## 常见问题

#### PNPM 找不到全局路径的解决方法？

尽管设置了全局变量，也重新安装了最新版本 PNPM，也执行了 pnpm setup，却仍然报错找不到全局路径的临时解决方案：

```powershell
$PNPM_HOME="<path>" | pnpm install -g xxx
```

#### PNPM 速度变慢了？

今天逛官网时，偶然发现 Readme 中的 benchmark 过时了。它说“要比 Yarn Classic 和 npm “快两倍以上，但是从 benchmark 来看，他要比 Yarn 和 npm 慢了不少。
以后启用 NodeJS 20 以上时，如果问题得不到改善，我应该会重新选择 npm 而不是 pnpm，鉴于幽灵依赖和依赖分身带来的问题是可排查可解决的，而速度是解决不了的问题。

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

默认的 node_modules 依赖的层级处于严格和不严格之间的水平（semi-strict）。使用最严格的设置需要打开 PnP 模式，因为在 monorepo 中 PnP 模式中，
就算开启了 `hoist=false` 也不会禁用 workspace root 的依赖

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

