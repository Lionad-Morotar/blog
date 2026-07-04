# ⛸️ UseScrollbar

> 给第三方表格等复杂组件设置自定义滚动条的库


  ![use-scrollbar](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/logo_1280x640.png)


  
  [![npm package](https://img.shields.io/npm/v/use-scrollbars.svg)](https://github.com/Lionad-Morotar/use-scrollbar)
  
  [![build status](https://github.com/Lionad-Morotar/use-scrollbar/actions/workflows/ci-on-release.yml/badge.svg?branch=release)](https://github.com/Lionad-Morotar/use-scrollbar/actions/workflows/ci-on-release.yml)
  
  [![LICENSE](https://img.shields.io/github/license/Lionad-Morotar/use-scrollbar)](https://github.com/Lionad-Morotar/use-scrollbar/blob/main/LICENSE)

<div align="center">

# use-scrollbar

`Use-Scrollbar` enables a component relies on a native scrollbar to replace its native scrollbar with a virtual
scrollbar instead, NOT virtual scroll.

</div>

## 🎇 Brief

Assuming a 400px height div, you can easily get a div with beautiful virtual scrollbars by simply wrap the div with [ElementPlus Scrollbar](https://element-plus.gitee.io/zh-CN/component/scrollbar.html) scrollbars. But  none of the popular scrollbar components provide an interface for handling complex elements, that is to say, you cant wrap an complex component with [ElementPlus Scrollbar](https://element-plus.gitee.io/zh-CN/component/scrollbar.html) to have its internal native scrollbar replaced with beautiful virtual scrollbars. So you need `use-scrollbar`.

- [vxe-table example](https://github.com/Lionad-Morotar/use-scrollbar/blob/main/play/src/vxe-table.vue)
- [antd-vue-table example](https://github.com/Lionad-Morotar/use-scrollbar/blob/main/play/src/ant-vue-table.vue)

## ⚒️ Feature

- [x] **Powerful API**, have ability to deal with complex components<sup>

[1](#user-content-fn-1)

</sup>

, such as vxe-table、ant-vue-table
- [x] **Customizable**, so that you can create your own scrollbar style, animation and user interaction
- [x] **Theme**, integrated with these style configurations: ElementPlus, Steam, CSS-Tricks ...
- [x] **Full Typed**, with the power of typescript
- [ ] Support Vue3 & ~~Vue2~~
- [ ] WIP ~~Vue Directives~~
- [ ] WIP ~~Headless Component~~
- [ ] WIP ~~Github pages for document and preview~~

and PRs are welcome

## 📸 Preview

#### 1. Native Scrollbar **VS** Customized Scrollbar (theme: default)


  ![compare](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/compare-1.png)

#### 2. Native Scrollbar **VS** Customized Scrollbar (theme: css-tricks)


  ![compare](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/compare-3.png)

## 🤹‍♀️ Usage

Simple example

```typescript
import { onMounted, ref } from 'vue'
import { useScrollbar } from 'use-scrollbars'

const componentOrElementRef = ref(null);
const barStates = useScrollbar(componentOrElementRef, {
  // override default options
});

// dont forget to import style.css
// in your main.ts (or entry.ts anyway)
import "use-scrollbars/dist/style.css"
```

Another example

```typescript
import { watchEffect, onMounted, ref } from 'vue'
import { useScrollbar } from 'use-scrollbars'

const componentOrElementRef = ref(null);
const barStates = useScrollbar(componentOrElementRef, {
  // override default options
});

const componentStates = ref('your-states');
watchEffect(() => {
  if (componentStates.xxx === 'your-states') {
    barStates.theme = 'steam'
  } else {
    barStates.destroy()
  }
})
```

More example on `pnpm dev`

## 📦 Install

```bash
pnpm install use-scrollbars
```

## 🗂️ Document

### 1. States

#### 1.1. barStates.theme

改变滚动条样式。

```typescript
const theme = 'normal' // 'normal' | 'steam' | 'css-tricks'
barStates.theme = theme
```

#### 1.2. barStates.offset

改变滚动条相对挂载元素的偏移量。

```typescript
barStates.offset.y.top = 10 // px
barStates.offset.y.right = 10 // px
barStates.offset.x.left = 5 // px
barStates.offset.x.bottom = 5 // px
```

#### 1.3. barStates.scrollTop

如果传入多个 wrapper，那么 scrollTop 属性等同于这几个 wrapper 对应 DOM 元素的最大的哪个 scrollTop 属性。如果需要滚动 wrapper 中的内容，可以给 scrollTop 设置值，
也可以使用 [barStates.scrollTo](#barStates-scrollTo) 方法。

#### 1.4. barStates.scrollLeft

类似 [barStates.scrollTop](#barStates-scrollTop)。

#### 1.5. barStates.isDragging

判断当前滚动条是否出于拖动状态。

```typescript
console.log(barStates.isDragging.y)
```

#### 1.6. barStates.isScrolling

获取当前滚动区域的滚动状态。

```typescript
console.log(barStates.isScrolling.x)
```

### 2. Actions

#### 2.1. barStates.init

如果不是通过显式初始化（即 `useScrollbar(elem)`）的方式自动初始化滚动条，那么需要使用 init 方法手动初始化。init 方法提供了对控制滚动区（甚至多个滚动区）所需要的更细致的参数。

```typescript
const $parent = cmptRef.value.$el.parentElement;
const $wrapper = $parent.querySelector(".content-wrapper");
const $content = $parent.querySelector(".content");

// 详细 API 见类型文档
barStates.init({
  mount: cmptRef.value,
  content: [$content],
  // 可以不传，默认为 content 的 上一级父元素
  wrapper: [$wrapper],
  // 可以不传，默认为 wrapper 或 wrapper 的第一个元素
  viewport: $wrapper,
})
```

#### 2.2. barStates.visibleOnHover

监听传入元素的鼠标事件，mouseenter 时显示滚动条，mouseleave 时隐藏滚动条。

#### 2.3. barStates.setOffset

根据传入元素的尺寸自动设置滚动条的偏移量。在某些场景非常有用，比如你想改变一个弹窗，其滚动区域为整个弹窗内容区域，但是内容区填充了一个 `position:sticky` 头部，此时，如果将滚动条直接挂载到弹窗的内容区域，
那么 y 轴滚动条的上方偏移量应为头部的高度。你可以在 barStates.setOffset 中传入此头部元素或组件，动态跟踪其高度并自动设置偏移量。


  ![use-scrollbar](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/setOffset-dialog-example.svg)

```typescript
const cmptOrElemRef = ref(null);

barStates.setOffset({
  y: {
    top: cmptOrElemRef,
  }
})
```

### 3. Hooks

#### 3.1 useScrollbar

等同于 useScrollbars，用于将一个已有的滚动系统的原生滚动条替换为虚拟滚动条，也是这个库最主要的功能。

#### 3.2 useNativeScrollbar

获取原生滚动条相关的一些信息，如宽度。

```typescript
const nativeBar = useNativeScrollbar()

console.log(nativeBar.thick) // usually 17px in Windows
```

## 🚩 Dev

```bash
pnpm install
pnpm serve
```

近期开发路线：接下来会看一下性能方面的优化，以及如何在 Vue2/Vue3 中通用。

## 📄 License

MIT License

<section className="footnotes" dataFootnotes="">

## Footnotes

1. which is not possible with other libraries [↩](#user-content-fnref-1)

</section>

<style>

html pre.shiki code .sVHd0, html code.shiki .sVHd0{--shiki-light:#39ADB5;--shiki-light-font-style:italic;--shiki-default:#D73A49;--shiki-default-font-style:inherit;--shiki-dark:#F97583;--shiki-dark-font-style:inherit}html pre.shiki code .sP7_E, html code.shiki .sP7_E{--shiki-light:#39ADB5;--shiki-default:#24292E;--shiki-dark:#E1E4E8}html pre.shiki code .su5hD, html code.shiki .su5hD{--shiki-light:#90A4AE;--shiki-default:#24292E;--shiki-dark:#E1E4E8}html pre.shiki code .sjJ54, html code.shiki .sjJ54{--shiki-light:#39ADB5;--shiki-default:#032F62;--shiki-dark:#9ECBFF}html pre.shiki code .s_sjI, html code.shiki .s_sjI{--shiki-light:#91B859;--shiki-default:#032F62;--shiki-dark:#9ECBFF}html pre.shiki code .sbsja, html code.shiki .sbsja{--shiki-light:#9C3EDA;--shiki-default:#D73A49;--shiki-dark:#F97583}html pre.shiki code .s_hVV, html code.shiki .s_hVV{--shiki-light:#90A4AE;--shiki-default:#005CC5;--shiki-dark:#79B8FF}html pre.shiki code .smGrS, html code.shiki .smGrS{--shiki-light:#39ADB5;--shiki-default:#D73A49;--shiki-dark:#F97583}html pre.shiki code .sGLFI, html code.shiki .sGLFI{--shiki-light:#6182B8;--shiki-default:#6F42C1;--shiki-dark:#B392F0}html pre.shiki code .s39Yj, html code.shiki .s39Yj{--shiki-light:#39ADB5;--shiki-default:#005CC5;--shiki-dark:#79B8FF}html pre.shiki code .sutJx, html code.shiki .sutJx{--shiki-light:#90A4AE;--shiki-light-font-style:italic;--shiki-default:#6A737D;--shiki-default-font-style:inherit;--shiki-dark:#6A737D;--shiki-dark-font-style:inherit}html .light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html.light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html.dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html pre.shiki code .skxfh, html code.shiki .skxfh{--shiki-light:#E53935;--shiki-default:#24292E;--shiki-dark:#E1E4E8}html pre.shiki code .sbgvK, html code.shiki .sbgvK{--shiki-light:#E2931D;--shiki-default:#6F42C1;--shiki-dark:#B392F0}html pre.shiki code .srdBf, html code.shiki .srdBf{--shiki-light:#F76D47;--shiki-default:#005CC5;--shiki-dark:#79B8FF}

</style>

---

- [use-scrollbar](https://github.com/Lionad-Morotar/use-scrollbar)
