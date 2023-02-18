---
meta:
  - name: keywords
    content: use-scrollbars,scrollbars,virtual,vue,vxe-table,el-scrollbar
  - name: description
    content: 怎样定制复杂组件的自定义滚动条？
---

# ⛸️ 怎样定制复杂组件的自定义滚动条？

[TOC]

#### 原生滚动条样式一言难尽

公司项目需要用到多表头等复杂的表格功能，一直使用 vxe-table 并在其基础上定制开发。但相比 Element Plus 的表格，它有一个对界面来说很不友好的缺陷：[不能自定义滚动条](https://vxetable.cn/#/table/base/scrollStyle)。使用原生滚动条会使表格右侧多出一块空白的区域，令人难受。

年前，我们要在一个新系统中画甘特图，用到了在 Github 极其流行的 [vue-gantt-elastic](https://github.com/neuronetio/gantt-elastic)。并不出乎意料，这玩意儿也不支持自定义滚动条。

也许大家没见过 Windows 的滚动条样式是到底有多么出戏。这里截张图给大家感受一下。

![CodePen](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230218235213.png)

CSS 滚动条相关的规范如 [CSS Scrollbars Styling Module](https://www.w3.org/TR/2021/CR-css-scrollbars-1-20211209/) 所规范的功能不多，甚至可以说太弱了。它只描述了一些用来简单处理滚动条样式的属性，如宽度和颜色。考虑到 PC 端用户使用鼠标，给滚动条加上动画或鼠标交互也是完全合情合理的需求，所以依赖 CSS 滚动条规范完全不够用。

但大佬对原生滚动条样式不满意，前端怎么能说不行呢，改！<del>（不是手痒痒了）</del>

#### 寻找简单的解决方案

要把基础库依赖的 vxe-table 直接替换为 Element Plus 表格很不现实。在没做过表格调研的情况下就迁移基础组件是不可接受的，何况我们只想改个滚动条样式。

这是 ElTable 的示例。看着这漂亮的滚动条当时真是心痒痒呀！

![element-plus table](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230218231215.png?w=60)

讲到 Element Plus，能不能用 [ElScrollbar](https://element-plus.gitee.io/zh-CN/component/scrollbar.html) 组件做点什么呢？

答案是否定的，因为 ElScrollbar 只能处理简单的滚动系统。

如图所示，假设 ElScrollbar 组件 S 本身高 400px，其直接子元素 Children 高 1000px。这个场景足够简单，所以能轻易获取 S 的滚动余量有 600px。

![Simple Scrollbar System](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230219003509.png?w=50)

当组件有复杂的层级嵌套时，ElScrollbar 组件就不知道你要使用哪一个元素去计算滚动余量了。如图所示，在复杂情况下，ElScrollbar 的虚拟滚动条甚至会和原生滚动条出现冲突的情况。

![Complex Scrollbar System](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230219004750.png?w=50)

#### Use Scrollbars 的诞生

这段时间想了许多方法，也试了不少开源轮子，它们都不能满足我“一键替换” vxe-table 及 vue-gantt-elastic 滚动条样式的需求。所以我找时间把温习了一下浏览器滚动系统相关知识，并把需求精简后，封装出顺手的工具，[use-scrollbars](https://github.com/Lionad-Morotar/use-scrollbar)

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/logo.png?w=50&type=win11)

use-scrollbars 有以下几个特点：

1. 它支持定制复杂组件的滚动条样式
2. 它能提供比原生滚动条更丰富的样式、动画和交互效果
3. 它使用原生滚动事件而不是 CSS Transform 等低性能滚动方案
4. 它的状态是响应式的且有完整的类型提示

第一点，也就是我的需求，use-scrollbars 能修改 vxe-table 等复杂组件的滚动条，这是 ElScrollbar 等其它开源组件目前无法实现的功能。第二点和第三点意味着更低的代码复杂度。第四点是说 use-scrollbars 是用 TypeSript 实现的 Vue Hook...

#### 使用示例

对于简单的滚动系统，use-scrollbars 能做到 API 足够简单。

```vue
<template>
  <div ref="elemRef">
    long content long content ...
    long content long content ...
    long content long content ...
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSrollbar } from 'use-scrollbars'

const elemRef = ref(null);
const barStates = useScrollbar(elemRef);
</script>
```

![native VS. use-scrollbars (theme css-tricks)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/compare-3.png)

怎么使用 use-scrollbars 修改 vxe-table 呢？代码虽然没有大家想象的那么短，但一定是可以理解的。

第一步，使用 devtools 确认滚动系统，并在代码中将相关元素选取出来。

```js
const $table = tableRef.value.$el;
const $header = $table.querySelector(".vxe-table--header-wrapper");
const $bodyWrapper = $table.querySelector(".vxe-table--body-wrapper");
const $bodyContent = $table.querySelector(".vxe-table--body");
const $bodyXSpace = $table.querySelector(".vxe-body--x-space");
const $bodyYSpace = $table.querySelector(".vxe-body--y-space");
```

第二步，通过 use-scrollbars 初始化这些滚动系统。

```js
const barStates = useScrollbar();
barStates.init({
  mount: tableRef,
  content: [$bodyWrapper, $bodyContent, $bodyXSpace, $bodyYSpace],
  viewport: [$bodyWrapper]
});
```

第三步，调整样式，适配虚拟滚动条。

```css
.vxe-table--body-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
// ... and more
```

最后，这是效果对比。

<Compare>
  <div slot="left" style="padding: 0 20px">
    <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230219020025.png" />
  </div>
  <div slot="right" style="padding: 0 20px">
    <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230219020052.png" />
  </div>
</Compare>

如果你是 vxe-table 用户，可以在[这里](https://github.com/Lionad-Morotar/use-scrollbar/blob/dev/play/src/vxe-table/index.vue)找到我写的示例组件，直接拷贝到项目中使用。如果大家对使用 use-scrollbars 定制其它组件的滚动条有任何疑惑，欢迎留言，我会逐一解答。

另，[use-scrollbars](https://github.com/Lionad-Morotar/use-scrollbar) 欢迎 Start & PR！
