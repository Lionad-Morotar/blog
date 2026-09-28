---
title: Shadow DOM
description: 浏览器原生封装边界：样式与事件如何跨界、:host 的级联地位、closed 模式的真实语义与批量样式的性能杠杆。
---

#### Shadow DOM 是浏览器原生封装边界，不是样式命名空间

Shadow DOM 给一棵子树提供浏览器原生的样式与 DOM 封装边界，解决「样式不进不出」与「实现细节对外不可枚举」两件事。
它与 scoped CSS、CSS Modules 不是同一层机制：后两者是编译期命名空间约定，只防自家样式泄漏，防不住运行时第三方
全局选择器的侵入；iframe 才隔离 JS 与事件循环，Shadow DOM 不隔离 JS。宿主元素（host）通过 attachShadow() 挂载
shadow root，一个元素只能有一个，mode（open/closed）只是内部访问开关，不改变封装强度。官方开的跨界通道有三个：
:host（从内定 host 外观）、::slotted()（从内定投影进 slot 的外部内容）、CSS 自定义属性（沿继承链天然穿透），
color、font 等继承属性本来就越界。适用判断：已有统一设计系统（如 Vue 组件 + scoped CSS）时隔离收益小，代价是
生态断裂（全局覆写、调试体验都要绕路）；只防命名冲突用 scoped CSS 即可；要隔离第三方脚本用 iframe。一个信号是
浏览器自己把 shadow roots 用作内部隔离（video 控件、DevTools 面板），而非组件复用首选，平台趋势是默认 light DOM、
按需才上 shadow。

见：[Shadow DOM - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)：边界、host 与 slot 机制参考

#### :host 是级联默认值，可被页面样式反杀

:host 规则在级联中位于作者样式之下的默认层（位置近似 user-agent stylesheet），页面对 host 元素的任何直接样式都会赢：
组件内写 :host { color: red }，页面一句 .my-el { color: blue } 就覆盖它。再叠加继承属性的无条件穿透，样式墙对
继承链是敞开的。设计可换肤组件时应暴露 CSS 自定义属性，而不是指望 :host 锁住外观。

见：[Styling Web Components with Shadow DOM and CSS](https://blog.openreplay.com/style-web-components-shadow-dom-css/)：:host 在级联中的默认层地位

#### 自定义事件默认翻不过边界

CustomEvent 默认 composed: false，出不了 shadow root，外层监听器静默收不到，这是「监听器无报失灵」类 bug 的常见
根因。设了 composed: true 后事件继续冒泡，但 event.target 被事件重定向（event retargeting）为 host，真实来源只有
shadow 内部的监听器用 composedPath() 能还原；closed root 下外部拿到的 path 被截断。跨边界通信要么显式
composed: true 并接受 target 失真，要么走 props / 回调契约，不赌事件穿透。

见：[Shadow DOM and events - javascript.info](https://javascript.info/shadow-dom-events)：retargeting 与 composed 语义参考

#### closed 不是安全边界

closed mode 只让 element.shadowRoot 返回 null，DevTools 照样能看到整棵 shadow tree，CDP 与自动化工具可以 patch
attachShadow 把 closed 改成 open。反向证据是 closed root 内派发的事件其 composedPath 会被截断：它防的是无意的
信息泄露，不是有意的访问。反爬、防调试场景里它是干扰项而不是屏障。

见：[How to locate element in shadow-root (closed)](https://stackoverflow.com/questions/77242284/how-to-locate-element-in-shadow-root-closed)：CDP 可改写 closed mode 的实证

#### adoptedStyleSheets 是批量渲染的性能杠杆

给每个 shadow root 塞一份 <style> 文本，浏览器就要重复解析 N 份相同 CSS；Constructable Stylesheets（可构造
样式表）让 new CSSStyleSheet() 的单个实例被任意多个 shadow root 共享，且可 replaceSync() 运行时热替换内容。
虚拟滚动、长列表批量挂载同类组件时，adopt 优先于 innerHTML 拼样式。

见：[Constructable stylesheets - web.dev](https://web.dev/articles/constructable-stylesheets)：共享与热替换机制参考

#### Declarative Shadow DOM 让 SSR 首屏不再裸奔

传统 shadow root 依赖 JS 创建，服务端渲染首屏没有样式。Declarative Shadow DOM 用 <template shadowrootmode> 在
HTML 解析阶段同步构建 shadow root，无需 JS 即可携带样式，2024-08 成为 Baseline（Chrome 90 / Safari 16.4 /
Firefox 123），规范在 2023 年把属性名 shadowroot 改名为 shadowrootmode。配套序列化 API 有
Element.getHTML({ serializableShadowRoots }) 与 setHTMLUnsafe / setHTML（Sanitizer 方向）。

见：[Declarative Shadow DOM - web.dev](https://web.dev/articles/declarative-shadow-dom)：规范现状与浏览器支持