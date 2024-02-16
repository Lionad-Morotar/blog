###### [# Sharing State with Islands Architecture](https://frontendatscale.com/blog/islands-architecture-state/)

MAXI FERREIRA 阐述的在岛模式组件中管理状态的思路也可以用于低代码场景。

<q>We have several options for choosing a store. Astro recommends the [`nanostores`](https://github.com/nanostores/nanostores) library in their documentation, which is what we’ll use for our example, but several UI frameworks already come with a built-in solution—Svelte has [Stores](https://svelte.dev/docs/svelte-store), Preact has [Signals](https://preactjs.com/guide/v10/signals/) (as does [Solid](https://www.solidjs.com/docs/latest#basic-reactivity)), and Vue has the [Reactivity API](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api).</q>

第一次见到有人在公开场合说 Vue 的 Reactive API 是可以用于管理状态的。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20231010125234.png)

新的状态管理办法结合了事件通知和统一的状态管理库。一种替代的版本是使用回调函数。