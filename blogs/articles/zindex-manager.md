# ⚖️ 一统多组件库的层叠顺序

[TOC]

## 增订 | 2022年9月5日

终于狠下心把两个 ElementPlus 实例干得只剩了一个，也顺带解决了一些项目中出现的稀奇古怪的问题。不过，这里容我吐槽一句，目前来说 ElementPlus 的问题是真的多，因为遇见 A 问题所以升级 Element 版本却引起了 B 问题这种情况屡见不鲜。我经常对着问题一调试就是两三个小时，恍惚之间就下班了，觉得一天喂狗了。呼呼，我想摸鱼啊，请给机会！

## 背景

上周在项目中碰到个棘手的问题。公司某项目依赖了两个不同的组件库，element-plus@2.0.2 和 element-plus@2.1.8。由于没把两个组件库的 zIndex 统一管理起来，所以这两库的弹窗各弹各的，可能互相遮住，很是尴尬。

举例说明一下，两个组件库以下使用简称 E1 和 E2。element-plus（以及 element-ui）在内部实现了 zIndex 管理器，使打开的弹框的 zIndex 永远递增，解决了在单个 element 内部打开 dialog、popover、selector-option 等组件时互相遮盖的问题。element 默认的 zIndex 起始值是 2000，首先打开一个弹窗，dialog1，dialog1 的 zIndex 设置为 2001，如果在 dialog1 中使用按钮用打开了新的 dialog2，那么 dialog2 的 zIndex 值被置为 2002，遮住了 dialog1，这是正常的[^append-to-body]。那么问题来了，以上两个 dialog 都是通过 E1 打开的，一但在 dialog2 引用了 E2 的组件，打开弹窗 dialog3，那么 dialog3 的 zIndex 使用的是 E2 从 2000 开始递增为 2001 的值，不足以遮盖 E1 中 2002 的 dialog2，所以 dialog3 被 dialog2 遮挡，显示异常。

![打开多个弹窗示例](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220814192040.png)

[^append-to-body]: 为了降低复杂度，这里只考虑将弹窗 teleport 到 body 中的情况。

## 解决

统一多组件库层叠顺序，意味着将 E1 和 E2 内部实现的 zIndex 管理器中的 zIndex 通过某种形式关联起来。由于对 element 内部的实现不是很熟悉，所以一开始团队成员内部讨论时提出过许多天马行空的设想，比如“将 E2 的 zIndex 管理器作为 external 载入”、或是“使用 MutationObserver 检测 DOM 变化读取最新的 zIndex 值”... 最坏的情况是把当前的 element fork 出一份代码来自己维护，改造 zIndex 管理器实现多项目的统一管理。这些方案听起来不是那么可靠，所以我们决定先看看 element 的实现再近一步思考更优雅的解决方案。

#### 层叠管理器

element-plus 的层叠管理器（PopupManager）实现比较简单，其核心原理和 element-ui 一致，通过闭包维护了一个 zIndex 的值的单例，暴露出获取值以及递增值的接口，以方便内部的 dialog 等组件在需要的时候有能力获取最新 zIndex 或者对 zIndex 进行递增。element-plus 中的层叠值管理的实现甚至比 element-ui 还要简单，它是一个 vue3 的 hook，只有 20 行代码。

```js
import { ref, computed } from 'vue'
import { useGlobalConfig } from '../use-global-config'

const zIndex = ref(0)

export const useZIndex = () => {
  const initialZIndex = useGlobalConfig('zIndex', 2000) // TODO: move to @element-plus/constants
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}
```

useZIndex 可以在任意 vue setup 中调用。调用后的回调提供了 initialZIndex、currentZIndex、nextZIndex 三个接口。initialZIndex 是通过 ElementConfigProvider 传入的 zIndex 初始值；用 currentZIndex 能拿到最新的 zIndex 值；用 nextZindex 可以给 zIndex 递增后获取其值，因为 zIndex 是全局的单例，所以使用 nextZIndex 拿到的值一定是全局最大的 zIndex。

```vue
<template>
  <dialog :style="{zIndex}" />
</template>
<script setup>
const { useZIndex } from "../hooks/use-z-index";
// 这个 zIndex 一定是当前 element 中最大的 zIndex
const zIndex = useZIndex.nextZIndex();
</script>
```

#### 思路分析

既然在 element-plus 的内部能使用 `const { useZIndex } from ...` 的形式拿到 zIndex 管理器暴露的接口，那么在项目中是否能通过一样的方法得到它呢？

答案是肯定的。通过观察 element 的默认导出可以发现其中有 useZIndex 的存在。

![exports in element-plus](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220814195047.png)

解决多组件库统一层叠顺序问题的本质就是在项目的应用层再实现一个 zIndex 管理器。管理器需要接受来自不同组件库的 zIndex 管理器，并在任一管理器中的 zIndex 值发生变化时，把变化同步到其它管理器中。

举个例子，我们在文章开头先使用 E1 打开了 dialog1 和 dialog2，使 E1 的 zIndex 从 2000 递增到 2001 再递增到 2002，如果再打开 E2 的 dialog3，我们希望 dialog3 的 zIndex 从 2002 递增到 2003，这也就意味着打开 dialog1 和 dialog2 时的 zIndex 递增需要从 E1 同步到 E2。

既然 element 导出了 useZIndex，那问题就好办了。我们可以在项目中拿到 E1 以及 E2 的 useZIndex，用 vue watch 监听两个 useZIndex 回传的 currentZIndex 接口，并把小的那个 zIndex（对应上述 E2）通过 nextZIndex 接口递增到大的（对应上述 E1）。这样一来，E1 和 E2 的 zIndex 就相等，在下一次打开弹窗时，无论是使用 E1 还是使用 E2 的弹窗，其 zIndex 值都能保证在项目中最大。

#### 代码实现

代码实现时，团队的小伙伴写了以下代码，这段代码非常好理解，这里就不细说了。

```js
watch([
  () => e1ZIndexContext.currentZIndex.value,
  () => e2ZIndexContext.currentZIndex.value,
], ([z1, z2]) => {
  if (z1 < z2) {
    e1ZIndexContext.nextZIndex()
  } else {
    e2ZIndexContext.nextZIndex()
  }
})
```

需要注意的是，可能有非常多组件依赖了 useZIndex 的内部的响应式值，所以直接使用 watch 暴力递增 zIndex 是有问题的。想象一下，每递增一次，相关 vue 组件会被收集到等待更新的队列中，如果 z1 和 z2 的差值很大，容易报栈溢出问题。好在解决方式也非常简单，使用 nextTick 分担每个 tick 的任务，并在回调中，根据最新的 zIndex 值进行 zIndex 递增就行了。

```js
const { watch, nextTick } from "vue"
const unwatch = null

export function useSameZIndex(ctx1, ctx2) {
  unwatch && unwatch()
  unwatch = watch([
    () => ctx1.currentZIndex.value,
    () => ctx2.currentZIndex.value,
  ], ([z1, z2]) => nextTick(() => {
    const [nz1, nz2] = [
      ctx1.currentZIndex.value,
      ctx2.currentZIndex.value
    ]
    if (nz1 < nz2) {
      ctx1.nextZIndex()
    } else {
      ctx2.nextZIndex()
    }
  })
}
```

## 更多

以上分享的代码略为简单，想深入探索的话推荐直接看 element-plus 相关组件的源码，如 [message-box](https://github.com/element-plus/element-plus/blob/6503e5527715a6424433df0ff523b8910e891033/packages/components/message-box/src/index.vue)。虽然文中仅介绍了如何 watch 并递增管理器中的 zIndex 值，但是在实际项目开发时的使用场景肯定更加复杂，比方说，在 element-plus 上层封装业务 UI 库时可能会要用到全屏组件或是购物车等业务弹窗，那么这些库在全局的 zIndex 管理实际也可以使用 element-plus 的这套。总之，要活学活用嘛...


<JJ>**希望本文能对你有所帮助，我是仿生狮子，各位下期见~** </JJ>

<JJ>想看看这篇文章是如何被创造的？你能从我的[博客项目](https://github.com/Lionad-Morotar/blogs)中找到答案；欢迎 Star & Follow；也请大家多来我的[线上博客逛逛](https://www.lionad.art)，排版超 Nice 哦~</JJ>
