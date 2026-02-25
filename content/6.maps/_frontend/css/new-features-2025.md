---
title: CSS 新特性 2025
description: Adam Argyle 分享的 25+ 个 CSS 新特性，涵盖视图过渡、容器查询、滚动驱动动画、颜色系统等
original_path: /maps/_frontend/css/new-features-2025
---

#### View Transitions 视图过渡

一行代码实现多页应用（MPA）的跨页面淡入淡出过渡：

```css
@view-transition {
  navigation: auto;
}
```

通过 `view-transition-name` 可让侧边栏/导航栏在页面切换时保持不动，看起来像 SPA。配合 JavaScript API `document.startViewTransition()` 可实现 DOM 变化时的动画过渡。

见：[Chrome for Developers - View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions)

---

#### Media Query Range Syntax 范围语法

使用 `<`、`>` 等运算符代替 `min-width`/`max-width`：

```css
@media (width > 1024px) { }
@media (400px <= width <= 1000px) { }
```

更符合直觉，支持容器查询嵌套使用。

见：[MDN - CSS media feature range syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Range_syntax)

---

#### Container Queries 容器查询

组件根据所在容器（而非视口）尺寸自适应：

```css
.card-container {
  container-type: inline-size;
}

@container (width < 40ch) {
  .card { flex-direction: column; }
}
```

配合 `cqi`（内联尺寸百分比）、`cqb`（块级尺寸百分比）等容器单位使用。

见：[MDN - Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)

---

#### Quantity Queries 数量查询

元素可根据子元素数量自动调整布局：

```css
.bento:has(> :nth-child(3)) { grid-template-columns: repeat(3, 1fr); }
```

结合 `:has()` 选择器实现 Bento 网格等自适应布局。

见：[Quantity Queries](https://alistapart.com/article/quantity-queries-for-css/)

---

#### Cascade Layers 级联层

使用 `@layer` 将样式分层，解决第三方样式覆盖问题：

```css
@layer design-system, components, utilities;

@layer utilities {
  .m-0 { margin: 0; }
}
```

层的优先级由声明顺序决定，同一层内的选择器遵循常规特异性规则。

见：[MDN - @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

---

#### @property 类型安全变量

定义类型安全的 CSS 变量，支持过渡动画：

```css
@property --hue {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

.animated {
  transition: --hue 0.3s;
}
```

可用于渐变位置动画、颜色插值等之前无法实现的效果。

见：[MDN - @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)

---

#### Field Sizing 字段自适应

让 input/select 根据内容自动调整宽度：

```css
input, select {
  field-sizing: content;
  min-width: 5ch;
}
```

解决长期以来需要 JavaScript 计算的输入框宽度问题。

见：[Chrome for Developers - field-sizing](https://developer.chrome.com/docs/css-ui/css-field-sizing)

---

#### User Valid/Invalid 用户验证伪类

`:user-valid` 和 `:user-invalid` 只在用户交互后才显示验证状态，避免页面加载时就显示错误：

```css
input:user-invalid {
  border-color: red;
}
```

与 `:valid`/`:invalid` 不同，后者在页面加载时就会匹配。

见：[MDN - :user-valid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid)

---

#### Exclusive Accordion 互斥手风琴

`details[name="group"]` 实现手风琴效果，打开一个自动关闭其他：

```html
<details name="faq">
  <summary>问题一</summary>
  <p>答案一</p>
</details>
<details name="faq">
  <summary>问题二</summary>
  <p>答案二</p>
</details>
```

类似 radio button 的分组行为，无需 JavaScript。

见：[MDN - details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

---

#### Search Element 搜索元素

原生语义化搜索区域，自动处理无障碍属性：

```html
<search>
  <form action="/search">
    <input name="q" placeholder="搜索...">
    <button>搜索</button>
  </form>
</search>
```

见：[MDN - search](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search)

---

#### Color Scheme 颜色方案

`color-scheme: light dark` 启用浏览器原生的暗色样式表：

```css
:root {
  color-scheme: light dark;
}
```

浏览器会自动为表单控件等提供适配当前主题的样式。

见：[MDN - color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)

---

#### Light-dark() 函数

一行代码定义响应式颜色：

```css
:root {
  color-scheme: light dark;
}

.example {
  color: light-dark(#333, #ccc);
  background: light-dark(white, black);
}
```

见：[MDN - light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)

---

#### HDR 颜色空间

使用 `oklch()`、`display-p3` 访问超出 sRGB 范围的更丰富的颜色：

```css
.hdr-orange {
  background: oklch(70% 0.3 50);
}
```

在支持 HDR 的显示器上显示更鲜艳的橙色、黄色、绿色等。

见：[Chrome for Developers - CSS color spaces](https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide)

---

#### Relative Color 相对颜色

从基础色派生整个调色板：

```css
.brand-light {
  background: oklch(from blue calc(l + 20) c h);
}

.brand-transparent {
  background: oklch(from blue l c h / 50%);
}
```

使用 `from` 关键字解构颜色并修改特定通道。

见：[MDN - Relative color](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors)

---

#### Color Mix 颜色混合

动态混合颜色：

```css
.mixed {
  background: color-mix(in oklch, blue, transparent 80%);
}
```

支持嵌套混合，可用于创建透明变体或亮色/暗色变体。

见：[MDN - color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)

---

#### Accent Color 强调色

一键修改表单控件的主题色：

```css
:root {
  accent-color: hotpink;
}
```

复选框、单选框、进度条等控件会使用指定的颜色。

见：[MDN - accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)

---

#### Scroll-driven Animations 滚动驱动动画

动画由滚动位置驱动：

```css
@keyframes hue-shift {
  from { --hue: 0; }
  to { --hue: 360; }
}

.animated {
  animation: hue-shift linear;
  animation-timeline: scroll();
}
```

使用 `scroll()` 或 `view()` 时间线代替时间驱动。

见：[Chrome for Developers - Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)

---

#### View Timeline 视图时间线

元素进入/离开视口时触发动画：

```css
.card {
  animation: slide-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}
```

自然错开效果无需手动设置 delay，每个元素根据自身的视口交叉情况动画。

见：[MDN - animation-timeline: view()](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)

---

#### Linear Easing 线性缓动进阶

贝塞尔曲线实现弹簧、弹跳效果：

```css
.springy {
  transition: transform 0.5s linear(0, 0.5, 1, 1.5, 1);
}
```

或使用 JavaScript 生成更复杂的弹簧曲线。

见：[Chrome for Developers - linear() easing](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)

---

#### Text Wrap 文本换行优化

`text-wrap: balance` 实现标题均衡换行，`pretty` 防止孤行：

```css
h1, h2 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
```

无需手动插入换行符即可获得专业的排版效果。

见：[MDN - text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)

---

#### Anchor Positioning 锚点定位

元素锚定到另一个元素：

```css
.tooltip {
  position: absolute;
  position-anchor: --thumb;
  inset-area: top;
}

#thumb {
  anchor-name: --thumb;
}
```

Tooltip 可跟随滑块 thumb 移动，无需 JavaScript 计算位置。

见：[Chrome for Developers - Anchor positioning](https://developer.chrome.com/docs/css-ui/anchor-positioning-api)

---

#### Textbox Trim 文本框修剪

去除文本框多余空白，实现精确对齐：

```css
.text {
  text-box-trim: both;
  text-box-edge: cap alphabetic;
}
```

让文本与按钮等元素完美对齐。

见：[Chrome for Developers - text-box-trim](https://developer.chrome.com/docs/css-ui/css-text-box-trim)

---

#### Math Functions 数学函数

`sin()`、`cos()`、`tan()` 等三角函数支持径向布局：

```css
.item {
  translate:
    calc(cos(var(--angle)) * var(--radius))
    calc(sin(var(--angle)) * var(--radius));
}
```

配合 `sibling-index()` 和 `sibling-count()` 根据兄弟位置自动计算角度。

见：[MDN - CSS math functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_math_functions)

---

#### Popover API 弹出层

原生弹出层，无需 JavaScript：

```html
<button popovertarget="menu">打开菜单</button>
<div id="menu" popover>菜单内容</div>
```

支持自动焦点管理、点击外部关闭、ESC 关闭等功能。

见：[MDN - Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

---

#### Starting Style 初始样式

定义元素首次渲染/进入 DOM 时的初始状态：

```css
.dialog {
  @starting-style {
    opacity: 0;
    transform: scale(0.8);
  }
  transition: all 0.3s;
}
```

实现弹窗、下拉菜单等的入场动画。

见：[MDN - @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)

---

#### Dialog 对话框

原生模态对话框，支持同步阻塞 UI：

```html
<dialog id="modal">
  <p>对话框内容</p>
  <button onclick="modal.close()">关闭</button>
</dialog>
<button onclick="modal.showModal()">打开</button>
```

自动处理焦点捕获、背景遮罩、ESC 关闭等。

见：[MDN - dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

---

[25 CSS Features in 25 Minutes - YouTube](https://www.youtube.com/watch?v=QW6GECIzvsw)
