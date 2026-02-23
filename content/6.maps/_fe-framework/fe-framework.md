---
title: 前端框架
description: 前端框架是在前端开发不同阶段，用以简化开发的工具集合。它们提供了一种组织代码的方式，使得开发者可以专注于业务逻辑，而不是底层的技术细节。
---

## 应用框架

* [Awade](/source-code/_architecture/awade)
* [Vue](/maps/_fe-framework/ui/vue)
* [vue-error-boundary](/source-code/_js/vue-error-boundary)
* [React](/maps/_fe-framework/ui/react)
* [Angular](/maps/_fe-framework/ui/angular)
* [Nuxt](/maps/_fe-framework/nuxt/nuxt)

## AI 开发框架

Vercel AI SDK 是用于构建 AI 应用的 TypeScript 工具包，月下载量超 2000 万。支持多种 AI 提供商、与 Next.js/React/Svelte/Vue/Node.js 无缝集成，可构建从聊天机器人到复杂后台 Agent 的各种应用。

* [AI SDK 6](https://vercel.com/blog/ai-sdk-6)：引入 Agent 抽象、工具执行审批、DevTools、完整 MCP 支持、重排序、图像编辑等功能
* [Which web frameworks are most token-efficient for AI agents?](https://martinalderson.com/posts/which-web-frameworks-are-most-token-efficient-for-ai-agents/)：19 个 Web 框架的 AI Agent token 效率对比，Minimal API 框架（如 ASP.NET Minimal）效率最高，全功能框架中 SvelteKit 和 Django 表现最佳

## 组件类库

* [Blockies Animate](/maps/_fe-framework/motion/blockies-animation)
* [Canvas Blocker](/source-code/_js/browser-extension/canvas-blocker)
* [Element Plus](/source-code/_js/element-plus)
* [Element UI](/source-code/_js/element-ui)
* [Helmet](/_achieved/2020-08/helmet-and-security)
* [Iconify](/maps/_fe-framework/assets/iconify)
* [jQuery](/source-code/_js/jquery)
* [Lodash](/source-code/_js/lodash)
* [Micro Templating](/articles/micro-templating)
* [Mini CSS Parser](/articles/mini-css-parser)
* [node-watch](/source-code/_node/node-watch)
* [nuxt-ui v2](/source-code/_js/nuxt-ui-v2)
* [nuxt-ui v3](/source-code/_js/nuxt-ui-v3)
* [Reka UI](/source-code/_js/reka-ui)
* [TS Internal Utility Types](/source-code/_ts/utility-types)
* [TS Type Challenges](/source-code/_ts/type-challenges)
* [Utility Types](/maps/_fe-framework/types/utility-types)
* [Zod](/maps/_fe-framework/schema/zod)

## 组件方案

* [Micro FrontEnd](/maps/_fe-framework/micro-fe)
* [Web Components](/maps/_fe-framework/web-components)

## 编程语言

* [Array.prototype.slice](/source-code/_es/array-slice)
* [Object.prototype.assign](/source-code/_es/object-assign)
* [TypeScript Compiler](/source-code/_ts/typescript-compiler)

## 评论

#### [Sharing State with Islands Architecture](https://frontendatscale.com/blog/islands-architecture-state/)

MAXI FERREIRA 阐述的在岛模式组件中管理状态的思路也可以用于低代码场景。

<q>We have several options for choosing a store. Astro recommends the [`nanostores`](https://github.com/nanostores/nanostores) library in their documentation, which is what we’ll use for our example, but several UI frameworks already come with a built-in solution—Svelte has [Stores](https://svelte.dev/docs/svelte-store), Preact has [Signals](https://preactjs.com/guide/v10/signals/) (as does [Solid](https://www.solidjs.com/docs/latest#basic-reactivity)), and Vue has the [Reactivity API](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api).</q>

第一次见到有人在公开场合说 Vue 的 Reactive API 是可以用于管理状态的。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20231010125234.png)

新的状态管理办法结合了事件通知和统一的状态管理库。一种替代的版本是使用回调函数。

---

🚧 WIP 施工中，正逐渐迁移至 Nuxt

* internet-available
<!-- /source-code/_js/module/is-online -->
* html5shiv
<!-- /source-code/_js/module/html5shiv -->
* CommonJS Loader
<!-- /source-code/_js/nodejs/require -->
* fast-deep-equal
<!-- /source-code/_js/module/fast-deep-equal -->
* KingDB
<!-- /source-code/_es/cpp/kingdb -->

暂存一些感兴趣的玩意儿。

* https://github.com/davidmarkclements/rfdc
