# VueJS | Parser

[TOC]

## Data Flow

* **HTML Template**：html string
* **Parser**：ast nodes & expressions
* **Optimizer**：markStatic
* **Code Generator**：with(this) { createElement(...) }
* **Render**：VNodes
* **Node Patching**：VNode Diff
* **DOM**：finnaly...

## Parser

Paser 分为三类，HTML Parser、文本解析器（Text Parser）、过滤器解析器（Filter Parser）。

Vue 中的 HTML Parser 是在某个已有的 Parser 基础上改造而成的。原有 Parser 是一个不断解析传入 HTML 的有限状态机，不停地对标签开头、属性、标签结尾及文本等类型进行正则匹配，并处理匹配得到的内容。其内部维护了一个堆栈，可以很好地处理节点间的层级关系。

Vue 通过原 HTML Parser 提供的接口，传入钩子函数，分别对标签、文本等做额外处理。比如说，HTML 中的文本要按照文本解析器，将模板的插值和纯文本解析出来，这样才可以将变量动态代入，生成字符串。最终，HTML 通过 Parser 解析，得到了 AST。

### Code Example

* [HTML Parser](https://github.com/Lionad-Morotar/read-source-code/tree/master/module/html-parser)
* [Template Parser](https://github.com/Lionad-Morotar/read-source-code/tree/master/module/template-parser)

## Optimizer

优化器（Optimizer）在 HTML Parser 生成的 AST 的基础上，对静态节点进行标记，以提高重渲染以及 node patching 时的性能：node patching 时静态节点完全不变，所以可以跳过比较；重渲染时意味着可以在新的渲染过程中服用第一次渲染时生成好的 DOM Node。

## Node Patching

### VNode

虚拟节点通过一些特定的选项来表示真实的 DOM 结构。由于只涉及 JS 计算，所以开销要比真实 DOM 小。在 VueJS 中，VNode 在 patching 时发挥了很大作用。

主要有以下几类：

- EmptyVNode：空节点
- TextVNode：文本节点
- ElementVNode：元素节点
- ComponentVNode：组件节点
- CloneVNode：克隆节点

#### 克隆节点

```js
function cloneVNode(vnode) {
  const clonedChild = (vnode.children || []).map(vnode => cloneVNode(vnode))
  const cloned = createElement(vnode.tag, vnode.data, clonedChild)
  const copyProps = ['text', 'isComment', 'isStatic', 'key', 'elm', 'context', 'ns', 'componentOptions']
  copyProps.map(prop => (cloned[prop] = vnode[prop]))
  return cloned
}
```

#### CreateElement

VueJS createElement API 解析如下：

```js
createElement(
  'name', // HTML 元素名、组件名或者函数也行
  { // 一些可选参数
    class： { /* loaded: isLoaded */ }, // :class
    style: { /* background: isRed ? 'red' : 'white' */ }, // :style
    props: { /* name */ }, // 组件 Props
    attrs: { /* id, class */ }, // HTML attributes
    domProps: { /* innerHTML、innerText */ }, // DOM props
    on: { /* !~click: () => {} */ }, // 通过 Vue.$emit 触发的事件；感叹号和波浪号分别代表 capture 和 once
    nativeOn: { /* click: () => {} */ }, // 原生 DOM 事件
    scopedSlot: { /* default: props => h('div', {}, props.text) */ }, // 作用域插槽
    key: '/* keyName */',
    ref: '/* refName */',
  },
  []  // 子节点或者文本节点
)
```

### Node Diff

对比节点可简述为：

- 两个节点是否相同？结束更新。
- 两个节点是否是静态节点？结束更新。
- 新节点有 text 属性？
- 两个节点都有子节点？如果子节点不同则更新子节点。
- 只有新节点有子节点？
- 只有旧节点有子节点？
- 旧节点有 text 属性？

对比子节点是用一个从两边至中间的循环，分别比较新前旧前、新后旧后、新后旧前、新前旧后。
