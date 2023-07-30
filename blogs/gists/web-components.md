# Web Components

[TOC]

## Shadow DOM

**传统网页应用中的样式具有一定程度的脆弱性，微小样式带来的影响通常会逐渐累积、放大，最终给全局带来影响。** 为了解决这种脆弱性，Shadow DOM 定义了一系列围绕 DOM 产生的新概念，如影子树规范（DOM 4.1）、UI 交互规范等。其渲染部分则与 CSS 作用域规范（CSS Scoping Specification）相关。

影子树（Shadow Tree）的根节点是影子根（Shadow Root），后者并不是一个真正的元素，不过它作为影子树和 DOM 的桥梁，和一个正常的 DOM 元素，即影子宿主（Shadow Root）绑定在一起。有时，我们会按照组件的作用域范围，把影子宿主所在的树称作 Light Tree（组件外部），以区分影子树所在树 Dark Tree（组件内部）。

可能会令人困惑的是：影子宿主元素中的正常元素是不会被正常渲染，而是通过规范定义的通讯组（Distribution List[^distribution-list]）将这些元素强制拉入影子树中渲染。通讯组不是一个实体概念，但它具有一个 Content 元素，将影子宿主中的正常元素囊括其中，而 Content 本身并不渲染（类似 `display：content`）。

[^distribution-list]: [https://www.w3.org/TR/css-scoping-1/#insertion-point](https://www.w3.org/TR/css-scoping-1/#insertion-point)

### 样式

相关 Shadow DOM 有几种新的选择器方法：

* 选择影子宿主：在影子树样式中直接使用使用 $:host$、$:host()$ 伪类选择影子宿主；
* 向上选择：使用 $:host-context()$ 伪类选择器可以选取当前元素的“父节点”，可能是影子宿主、Distribution List 的 Content 元素或元素的父元素；
* 向下选择：使用 $::shadow()$ 选择当前元素对应的影子根（可以有多个）；
* 选择通讯组：使用 $::content$ 选择当前影子树对应的宿主中通讯组对应的 Content 元素；
* 选择插槽：使用 $::slotted()$ 选择插槽节点；（插槽在下一小节介绍）

需要注意的是，对影子宿主来说，组件内部样式的优先级总是低于外部样式的，如 `.shadow-root` 的优先级要高于影子树内部的 `:host`。

此外，CSS 作用域规范提供了深度选择器（$/deep/$），用于穿刺选择，无论嵌套多深的影子树中的元素都能被选中。不过，一些 CSS 中可继承的属性会穿透影子边界，所以建议使用如下样式重置组件内的 CSS：

```CSS
:host {
  all: initial;
}
```

### 插槽

插槽（Slot）类似于通讯组，作为组件内部的一个占位符，其本身不在组件中渲染。如果你习惯使用 Slots in Vue，可能会发现两者几乎一模一样，其实，Slots in Vue 已经在其文档中说明了，Vue 中的 Slots API 的灵感来源于 Slots in Web Components [^slosts-salute]。

[^slosts-salute]: [https://cn.vuejs.org/v2/guide/components-slots.html#%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9](https://cn.vuejs.org/v2/guide/components-slots.html#%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9)

插槽常用作内容分发，具有这些特性：

* 从外部传入插槽的内容时，只会填充，不会覆盖；
* 插槽内容的样式，可以由组件内部指定；

见以下代码：

```HTML
<!-- HTML 源码 -->
<WebComponents>
  <h2 slot="title-2" class="title-2">First</h2>
  <h2 slot="title-2" class="title-2">Second</h2>
</WebComponents>

<!-- 渲染出的 Shadow Tree -->
<WebComponents>
  #shadow-root
    <slot name="title-2">
      <!-- 影子树内部的样式 .title-2 对此插槽内容同样生效 -->
      <h2 slot="title-2" class="title-2">First</h2>
      <h2 slot="title-2" class="title-2">Second</h2>
    </slot>
</WebComponents>
```

插槽还设定了一些相关事件，比如，可以使用`slotchange`事件监听插槽内容的分发：

```js
this.shadowRoot
  .querySelector('::slotted')
  .addEventListener('slotchange', myCustomEvent)
```

### API

其实，如 textarea、input，许多浏览器原生组件都是使用原生 Shadow DOM 去绘制，但由于其复杂性，并不在 Elements 面板对开发者开放，不过，你可以通过开发者工具中的“Show user agent shadow DOM”选项打开它。

或者你可以使用 JS 创建影子节点，随意把玩。创建影子节点时可选用一系列 API，见下代码：

```js
this.attachShadow({
  // 选择是否可以通过影子宿主的属性 shadowRoot 获取对应的影子节点
  mode: 'open',
  // 组件内部的 focus 事件是否冒泡到组件外部
  delegatesFocus: true
})
```


## 阅读更多

相关阅读：

* [Shadow DOM V1 规范详解 @Google](https://developers.google.com/web/fundamentals/web-components/shadowdom#top_of_page)
* [Shadow DOM V1 规范 @W3C](https://www.w3.org/TR/2018/NOTE-shadow-dom-20180301/)
* [Shadow DOM 兼容性 @CanIUse](https://www.caniuse.com/shadowdomv1)
* [DOM4.1 Shadow Tree @W3C](https://www.w3.org/TR/dom41/#shadow-trees)
* [CSS 作用域规范 @W3C](https://www.w3.org/TR/css-scoping-1/#shadow-dom)