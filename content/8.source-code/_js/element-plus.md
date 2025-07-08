---
title: Element Plus
description: A Vue.js 3 UI Library made by Element team
---

Element Plus 是在 Element UI 的基础上的[重构](https://github.com/element-plus/element-plus/discussions/3065)，所以也可以参考 [Element UI 的笔记](/source-code/_js/element-ui)。

ElementPlus（以下简称 EP）是一个基于 Vue 3 的 UI 组件库，其立项初期就明确了要在保留 Element UI 的易用性等基础上，摆脱 Element UI 的历史遗留包袱。除了更多功能和更好的性能，我们还能在 EP 项目代码中看到许多现代的前端项目架构和技术实践。

尽管已经来到 2025 年，前端技术日新月异，但 EP 作为可能是国人最熟悉也最易上手的项目，其代码依然具有很高的参考价值。本文尝试从项目工程的角度入手，用问题的形式，引出近年来前端项目的常见实践和技术。由于 EP 代码量较大，本文可能会跳过对一些基础知识的讲解，并假设读者对 Vue3、TS 和 Element Plus 有基本了解，并对前端工程化有兴趣。本文基于 Element Plus v2.10.2，如有错误之处，欢迎指正。

## 杂谈

#### 如何从零开始阅读 EP 的代码？

看 Element Plus 的项目源码大致就两个作用，一是了解现代前端工程化是怎么在开源组件库实践的，二是了解通用组件的实现方式。可以从这两个角度，取一个着重点入手。

首先肯定要熟悉 Element Plus 的使用，如果平时没用过，那么通读代码也没作用。其次是从点及面能更快地理解和掌握。具体而言，如果从组件实现的入手，最好从平常碰到问题的组件开始看起，先看具体组件实现，然后推广到相关工具函数，其次看大范围的组件组织，最后是构建、测试和其他项目流程。

从工程化入手则是先了解项目的整体结构和依赖关系，然后再深入到具体的实现细节。

目的不同也会影响阅读顺序，比如抱着开源贡献的目的去看代码，可能会先从贡献指南、代码规范等入手，然后再看具体的实现。不过，无论怎么开始，也有一些通用技巧可以遵守：

- 从通用测试用例开始，了解代码功能，到边缘测试用例结束，逐步深入
- 灵活使用 Git Graph，从代码变更历史、提交信息和 PR 中了解演变过程
- 复杂代码可以画图，比如用 XState 工具画状态图，同 Madge 分析依赖关系等

#### “前端工程化”的千人千面

前端工程化是一个广泛的概念，其涵盖的内容可以追溯到软件工程的定义和实践在前端领域的特化。但由于没有统一的标准，再加上各个团队、项目的主要目标不同，侧重的内容和实现方式也各不相同，所以实践上有很大差异。举例来说，开源项目可能更注重文档和社区建设，提供一定的开发流程保证代码质量，也通过门户和公共文档方便新手入门，而商业项目则可能更多关注稳定性与开发速度，所以会做数据监控，使用老旧但稳定的技术栈等。

这里尝试给出我的一些看法和总结。前端工程化泛指将自动化、标准化、流程化等工程领域思想应用于前端开发全过程，以达到提升开发效率、提高代码质量与可维护性、协同团队合作的目的。

见：[什么是前端工程化？](/maps/_workflow/fe-engineering)

## 项目结构

#### 各子包的依赖关系是怎样的？

单仓多包的管理方式，通常叫做 monorepo。要先明确为什么使用 monorepo。假设我们在公司有营销前台项目、用户管理后台项目，这两个项目关系不大，那么放到一个仓库不仅不会带来共享配置和代码的便利，反而会引起权限等方面的问题。适合 monorepo 的项目，其子包一定要保证高度相关，最好能通过共享代码、工具和配置来提高开发效率。

子包的定义可以从 pnpm 工作区间声明中找到，也就是 pnpm-workspace.yaml 文件。

EP 子包详细分为以下几种：

```yaml
packages:
  # 各组件代码，如 alert、button
  - packages/components
  # 项目常量定义，如组件尺寸枚举（default、large、small）、WEEK_DAYS 枚举等
  - packages/constants
  # 组件指令工具，如 trap-focus 焦点管理器、click-outside 点击区域外部检测指令等
  - packages/directives
  # 编译入口，导出了源码的各部分，作为组件代码和编译结果的桥梁
  - packages/element-plus
  # 工具函数，有 use-namespace、use-z-index
  - packages/hooks
  # 多语言文件及入口
  - packages/locale
  # 测试工具
  - packages/test-utils
  # Chalk 主题相关代码，如主题变量等
  - packages/theme-chalk
  # 工具函数，如 raf、rand
  - packages/utils
  # 文档站点
  - docs
  # 本地开发环境
  - play
  # 编译工具
  - internal/build
  # 编译时常量
  - internal/build-constants
  # 编译时工具函数
  - internal/build-utils
  # 项目代码规范
  - internal/eslint-config
  # 项目元信息，目前包含贡献者计算脚本
  - internal/metadata
```

这些包分为 `packages/*`、`internal/*`、`playground` 和 `docs` 四个大类，packages 主要包含组件源码，internal 则是工程化子包源码，playground 和 dev 分别对应开发时的本地环境和文档站点。

可以从 packages.json 找到这些子包间的互相依赖的关系，但是这种依赖关系仅仅意味着代码的直接引用。比如，packages/components 需要使用 packages/hooks 中的工具函数，这就算一种直接引用。如果用图绘制这种引用关系，会形成如下关系图：

<Mermaid size='md'>
flowchart TD
  subgraph packages
    A(packages/components)
    B(packages/constants)
    C(packages/directives)
    D(packages/element-plus)
    E(packages/hooks)
    F(packages/locale)
    G(packages/test-utils)
    H(packages/theme-chalk)
    I(packages/utils)
  end
  subgraph internal
    L(internal/build)
    M(internal/build-constants)
    N(internal/build-utils)
    O(internal/eslint-config)
    P(internal/metadata)
  end
  J(docs)
  K(play)
  E --> A
  A --> B
  C --> B
  D --> B
  E --> B
  I --> B
  A --> C
  D --> C
  A --> E
  D --> E
  A --> F
  D --> F
  E --> F
  A --> G
  E --> G
  A --> H
  A --> I
  C --> I
  E --> I
  packages --> L
  packages --> N
  packages --> O
  L --> M
  P --> L
  P --> M
  P --> N
  H --> L
</Mermaid>

这份关系图有许多不完善的地方，我们接下来会继续讨论。

#### 项目代码如何消费子包？

打开 packages.json 可以看到如下定义，这代表着 packages/* 内的包对 internal/build 有着依赖。这种形似“workspace:^0.0.1”的依赖关系，由 pnpm 解析管理，详见 [pnpm workspace](https://pnpm.io/zh/workspaces)。

```json
{
  "name": "element-plus",
  "devDependencies": {
    "@element-plus/build": "workspace:^0.0.1"
  }
}
```

声明好 package.json 中的子包依赖，再 pnpm install，会在相应目录创建 symlink，指向子包的实际位置，这样一来 node 的[模块查找算法](https://nodejs.org/api/modules.html#all-together)就能找到对应子包的代码。

但是单配置子包为 package.json 的依赖是不够的，因为 Node 模块查找算法只对 webpack 等依赖 node 的工具生效，而 [TypeScript 编译器](https://github.com/microsoft/TypeScript/blob/3ba257fface990ec5ec59fa2bb8edd7a721e1013/src/compiler/moduleNameResolver.ts)及其他工具依赖在 tsconfig.json 中配置 paths 才能正确解析子包。所以打开 tsconfig.base.json 可以看到如下配置：

```json
{
  "compilerOptions": {
    "paths": {
      "@element-plus/components": ["packages/components"],
      "@element-plus/components/*": ["packages/components/*"],
      "@element-plus/utils": ["packages/utils"],
      "@element-plus/utils/*": ["packages/utils/*"],
      "@element-plus/hooks": ["packages/hooks"],
      "@element-plus/directives": ["packages/directives"],
      "@element-plus/constants": ["packages/constants"],
      "@element-plus/locale": ["packages/locale"],
      "@element-plus/locale/*": ["packages/locale/*"],
      "element-plus": ["packages/element-plus"]
    }
  }
}
```

#### 子包的另一种消费方式：bundless stub 模式

除了使用 TypeScript 将 TS 代码编译成 JS 供 NodeJS 执行，子包代码还可能通过“源码 -> 编译产物 -> 其他子包”这种方式被消费。比如，internal 目录下如 internal/build 等子包也打算用作公开发布，所以使用了 unbuild 这个打包工具打包（只是后来相关计划被推迟或放弃，见 [Next Step of Element Plus](https://github.com/element-plus/element-plus/discussions/8288)）。

internal/build 子包的打包指令是 “unbuild --stub”，这是个啥？对于 TypeScript 项目，我需要在打包时生成 CJS、EMS 模块和类型声明文件，unbuild 就是用于此类用途的开箱即用工具。unbuild 基于 rollup 和 mkdist，将 TS、CSS 等代码转换为 Bundless 产物，此理念先进且符合开发趋势，尽管在 unbuild 引入 EP 的 2022 之后，我们见到了更多支持库打包且完成度更高的打包器如 Vite。

关于 bundless 的介绍见：[Bundle-less 深入理解与实践](https://zhuanlan.zhihu.com/p/553859426)。

至于 stub，没有找到一个惯用的翻译，单词直译叫“插桩”。stub 模式依赖 [jiti](https://github.com/unjs/jiti) 这个 NodeJS 模块加载器，以便在运行时支持 ESM 和 CJS 模块以及 TypeScript 源码的动态加载。插桩的意思很直白，unbuild 实际上并没有把 internal/build 的源码编译成 JS，而是在子包的 dist 目录生成了子包源码的入口文件，见 package.json：

```json
{
  "name": "@element-plus/build",
  "description": "Build Toolchain for Element Plus",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
}
```

入口文件的结构很简单，以 index.cjs 为例。当 NodeJS 解释执行 index.cjs 时，会根据 esmResolve、alias 等参数加载 element-plus 依赖目录中的 jiti 模块，重写了 NodeJS 加载函数（jiti 的功能），再根据最后一个参数读取到入口文件对应的真实源文件地址执行。不编译而是动态加载带来的好处也很明显，实时修改源码就可以重新执行，节约了“watch+compile”的时间。

```js
module.exports = require("/your-element-plus-in-computer/element-plus/node_modules/.pnpm/jiti@1.21.6/node_modules/jiti/lib/index.js")(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "@element-plus/build": "/your-element-plus-in-computer/element-plus/internal/build"
  }
})("/your-element-plus-in-computer/element-plus/internal/build/src/index.ts")
```

所以，stub 模式（插桩模式）就是指在不编译源码的情景中，通过创建 dist 目录下的入口文件，并使用 jiti 动态加载源码的方式来消费子包代码。stub 模式是一种临时的解决办法，如果 EP 的工程化工具链还会更新的话，还需要完善一下生产环境下的打包，见 [element-plus-next](https://github.com/sxzz/element-plus-next)。

最后，jiti 是 unjs 下的项目，掘金有文章介绍了 unjs 下其他好用的工具，可以围观一下：[unjs工具介绍](https://juejin.cn/post/7448464856619843619)。关于 unbuild，项目作者似乎将精力放在了基于 oxc + rolldown 的新打包工具 obuild 上，见 [obuild](https://github.com/unjs/obuild)。

## 工程环境

#### package.json 的各个配置作用

#### 鲜为人知的 IDE 配置

#### pnpm 相关知识

## 开发模式

#### “模块化”是如何代码结构体现的？

#### 创建新组件不必手动复制粘贴

## 项目生态

#### 按需引入插件的工作原理？

在 element-ui 时代，项目一般使用 babel-plugin-component 这个插件来实现按需引入。简单来说，babel-plugin-component 会自动把引入的内容作语法转换，以便正确处理引入的内容。

```js
// 如下面这行代码：
import { Button } from "[libraryName]"
// 最终转化成为以下两行新代码：
const button = require("[libraryName]/lib/button")
require("[libraryName]/lib/[styleLibraryName]/button.css")
```

在 Vue3 时代则使用 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)，在自动导入的基础上，实现了按需引入的功能。

unplugin-vue-components 的工作原理和 babel-plugin-component 类似。功能上而言，他会把 vue 模版编译结果中的 resolveComponent 函数替换：

```js
// 如下面结构代码：
function _sfc_render() {
  const _component_button = resolveComponent("el-button")
  return xxx
}
// 最终转化成为以下结构新代码：
import { ElButton as __unplugin_components_0 } from "element-plus"
import "element-plus/lib/theme-chalk/button.css"
function _sfc_render() {
  const _component_button = __unplugin_components_0
  return xxx
}
```

考虑到不同组件库结构、功能特性、历史版本兼容性等不一致因素，不同组件库的 unplugin-vue-components 插件的技术实现细节不一样。代码详见：[unplugin-vue-components/element-plus](https://github.com/unplugin/unplugin-vue-components/blob/main/src/core/resolvers/element-plus.ts)。

#### 如何参与开源建设？

## 推荐阅读

* [Element Plus 源码分析](https://github.com/element-plus/element-plus/discussions/6715)
* [Element Plus 组件库相关技术揭秘](https://juejin.cn/column/7140176895999475725)
