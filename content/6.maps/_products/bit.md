---
title: Bit
description: Bit 是一个组件驱动的开发工具，它可以帮助我们更好地管理组件。
---

## 博客

#### 十周年和 Harmony

Bit 在 2025 年的新博客反思了过去的失败经历，主要关于海量组件库拆分后依赖关系复杂带来的维护问题，并在博客强推 Harmony 新的开发模式。

Harmony 即通过依赖控制翻转模式，由平台提供接口，第三方插件实现功能，以支持组件间的组合复用。

> 如今，Bit 和 Bit Cloud 由 320 多个业务功能组装而成，由 2,000 多个独立组件组成。

![Bit 组件架构演化过程](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506020937784.png)

#### 开发 Bit 组件的完整的流程是怎样的（包含初始化流程）？

1. 安装 Bit：`npx @teambit/bvm install`
2. 创建工作区：`bit new react pro-name --default-scope [your-cloud-user-name].[your-scope-name] --skip-git --empty`
3. 创建组件：`bit create react ui/button`
4. 安装组件依赖的其他 Bit 组件：`bit install @nitsan770/reuse-components.ui.button classnames`
5. 写代码、写文档、写测试用例
6. 打标签：`bit tag -m 'first version'`，之后会自动跑构建流程并产出 tar 包
7. 导出组件：`bit export`

#### 如何修改 Bit 组件？

这里以导入而非分叉为例。

1. 导入组件：`bit import`，将自动检索并导入所有组件
2. 更改组件内容，如加一个属性
3. 打标签：`bit tag -m 'add a new prop'`
4. 导出组件：`bit export`
5. 在使用组件的项目中更新组件：`bit import`，还可选更新组件源码：`bit checkout`

## 点评

<q>In reality, components are not just confined to UI. Nearly anything we build can be a component; it's only when we think this way that we can unlock the power of component-driven, composable software.So besides UI components, we can also have serverless components, entity components, database components, hook components, all sorts. But here's one type that many people haven't considered: content components.</q>

文章举的编辑 markdown 的例子不太适合，因为公司的营销部门可以使用很多 SSG 框架，在框架内已经能直接在 markdown 里面写 JSX 了，只是说 bit 提供了其他优势，比如可以更好的共享和管理远程组件。

我认为 Bit 管理组件的方式最精彩的地方在于，Bit 整合了组件开发的整个流程，它解放了整个流程的依赖管理。举个例子，ElementPlus 如果发新版 3.x，是“推”的过程，但是下游可能并不知道它已经“推”了。使用 ElementPlus 的第三方，一定要经过开发时更新依赖，或不使用锁文件锁定版本而是等待 CI npm install 时自动更新的机制或流程来主动“拉”。而开发 Bit 组件时，可以在权限足够的作用域内主动的推和拉，相当于共享了代码。

<q>Monorepos are difficult to maintain and scale,  require a lot of time to build and deploy, are not easy to test.</q>

我相信单仓多包是有问题，但绝对不是 Bit 这种指摘。Bit 的优势之一是创建出能复用的组件，这是代码写得好不好的问题，和怎么管理这些组件比如单仓多包是无关的。代码数量越多，代码越复杂，而写得好不好只能降低理解的难度，不能降低复杂度。Bit 将复杂度分散给了写组件的开发（如测试用例、版本兼容代码）以及 Bit 本身（如构建工具、CI 流程、Playground 等），不过总的来说整体更加复杂了。 

实际上，在下一篇博客，Zolta Kachan 在文章开篇就提到，在使用合适的工具的情况下（指 Bit），Monorepo 有很多优势。em... 属实是小小的双标了。

<q>A Bit workspace automates a lot of the things that you must do manually in a "traditional" JavaScript workspace. Once you and your team get used to Bit, going back to your old setup will feel like going back to the stone age.</q>

Bit 的工作区域没有 package.json，所以无论是否是 Monorepo，都可以直接把依赖管理托管给 bit。Bit 会动态生成 package.json 文件，并直接将它们传递给包管理器，并使用包管理器来解析依赖版本等。

<q>Theoretically, we could handle theming with things such as prop drilling and global variables, but both of these would be bad practices (or anti-patterns). Context is the best way to approach context-specific problems.</q>

全局变量和传递属性是 React 中的反模式，因为 React 推荐使用上下文的概念来解决“上下文”的问题。关于主题，Bit 提供了 ThemeProvider 和 ThemeContext 这对组件来解决问题。

直接联想到，Vue 组件的属性透传也是一种设计模式（是不是反模式看实现得烂不烂）。CX 组件很大程序上依赖 Vue 的属性透传，但几乎没有主题业务意义上的全局上下文，因为 CX 组件的使用者可以很轻松借助 Vue Composition API 实现类似 React Context 的逻辑。印象中 ElementPlus 的 ConfigProvider 是类似的设计。

<q>Oops. This is my son playing with Lego.</q>

作者的儿子长得有点像女孩子（Sorry, no offence）

<q>Think of all the buttons that people have created over and over again...</q>

从某种角度而言，大部分的组件库都是“重复造轮子”的典型，如果在架构层次没什么独到的地方，那说是换皮也不为过。这两年“无头组件”的模式原来越流行，估计要不了几年，就能看到这些新理论实践带来的新开发模式在前端掀起一波新浪潮。

<q>However, the isolated linker uses symlinks, and some tools in the JavaScript ecosystem don't work well with symlinks (for instance, React Native). For those cases, you may set the nodeLinker setting to hoisted</q>

从来没有使用过 nodeLinker

## 推荐阅读

* [How to Reuse React Components Across Your Projects](https://bit.dev/blog/how-to-reuse-react-components-across-your-projects-l4pz83f4/)，这篇介绍了开发和使用 Bit 组件的完整的流程。

## TODO

https://bit.dev/blog/advanced-bit-dependency-management-and-configs-l5jnioog/
