# 浏览器原理概述

[TOC]

## 高层结构

![浏览器的主要组件](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200811234200.png)

* 用户界面 User Interface：地址栏、前进后退等按钮。
* 浏览器引擎 Browser Engine：用于用户界面及渲染引擎之间的交互。
* 渲染引擎 Render Engine：解析文档和样式并渲染至屏幕。
* 网络 Network：用于网络调用。
* JS 解释器 JavaScript Interpreter：用于解释执行 JS。
* 用户界面后端 UI Backend：底层的操作系统的绘制方法。
* 数据存储 Data Persistence：轻便的浏览器内数据库。

Chrome 浏览器的每个标签页都分别对应一个呈现引擎实例。每个标签页都是一个独立的进程，所以一个页面 JS 的死循环不会影响到另一个页面。

## 渲染引擎

FireFox 使用 Gecko，Safari 和 Chrome 则使用起源于 Linux 的开源渲染引擎 Webkit。尽管浏览器的渲染引擎因浏览器而异，但目的都是一样的：解析文档与资源并将其渲染至屏幕。具体步骤则可以详细划分为：解析、构建、布局、渲染，但不一定严格按照此步骤执行。

![解析、构建、布局、渲染](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200812095857.png)

渲染引擎会从网络层取出完整缓存区大小的文档（8KB），边解析边渲染。

* 解析 HTML：将字符流解析为标记（Tokenizing），将标记转换为带有属性的对象（Lexing）。最后根据节点关系将对象组成 DOM Tree（DOM Construct）。
* 解析 CSS：构建 CSSOM Tree 的过程和构建 DOM Tree 类似。FireFox 解析 CSS 时会阻塞脚本的执行，而 Webkit 阻塞那些可能访问到未加载完的样式表的脚本。
* 构建渲染树：从根节点开始遍历每一个可见节点，从 CSSOM Tree 中找到相应规则并应用。渲染树的算法很大程度上和 CSS 规范相关，因为每一个渲染节点都代表了一个矩形的 CSS 框。
* 构建渲染树完毕之后，进行布局处理，计算节点在屏幕上出现的确切坐标。然后由用户界面后端层遍历渲染树进行绘制。
* 预解析：预解析器会找出解析文档的其余部分中未加载的资源，使用并行连接先加载。
* 解析 JS：同步脚本的下载和解析将阻塞 DOM Tree 和 CSSOM Tree 的构建。异步脚本带有 async 或 defer 标签。defer 指等解析完再执行脚本；HTML5 规范中的 async 则将脚本标记为异步，使用其它线程解析和执行。
* 所有同步脚本执行完之后，触发 Document.DOMContentLoaded 事件。
* 浏览器继续等图片下载以及异步脚本的下载和执行。这一切结束之后，触发 Window.onload 事件。

### HTML 解析

HTML 无法使用常规的自上而下或自下而上的解析器进行解析，主要是因为其语言规范宽松，并且内容本身在解析时可能发生改变。总体而言，HTML 需要经过标记再构建树。

标记化算法使用状态机来表示。每一个状态接收来自输入信息流的一个或多个字符，并根据这些字符更新下一个状态。当前的标记化状态和树结构状态会影响进入下一状态的决定。

树构建算法也可以用状态机表示。构建的元素除了被添加到 DOM 树，还会添加至一个栈中。该栈可以用来完成纠正嵌套错误的标签、处理未闭合的节点之类的工作。

浏览器会默认地纠正一些错误的 HTML 标签（这也是各种浏览器多年来的最佳实践自然发展以及彼此之间相互模仿的结果），比如：

* `</br>` 纠正为 `<br>`
* 离散表格（表格嵌套在另一表格的非单元格内）被拆分为两个表格
* 嵌套的表单元素将被忽略
* 错误的 `<html>` 或 `<body>` 关闭标记

![HTML Parser](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200812120758.png)

### CSS 解析

FireFox 使用自己写的解析器解析 CSS；Webkit 则用解析器生成器（Flex、Bison）生成解析器解析 CSS。因为 CSS 的语法上下文无关，所以可以使用传统的解析器进行解析。

实际上，CSS 规范已经定义好了词法及语法。词法用正则描述，如：

* **num：**       [0-9]+|[0-9]*\.[0-9]+
* **nonascii：**  [^\0-\177]
* **nmchar：**    [_a-z0-9-]|{nonascii}|{escape}
* **nmstart：**   [_a-z]|{nonascii}|{escape}
* **ident：**     [-]?{nmstart}{nmchar}*
* **name：**      {nmchar}+
* **escape：**    {unicode}|\\[^\n\r\f0-9a-f]

语法则用 BNF（巴科斯范式）描述，如：

```
element_name
  : IDENT
  ;
class
  : '.' IDENT
  ;
pseudo
  : ':' ':'? [ IDENT | functional_pseudo ]
  ;
```

### 渲染树

CSS 最初参与渲染的过程在生成渲染树的时刻。可以说，渲染树的构建和 CSS 规范之间有密切联系。除了一些不可见节点，每一个节点都会初始化为渲染树节点（或 FireFox 的：框 Frame）。渲染树节点会顺序地按照元素 Display 创建对应渲染器。

```c++
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
```

解析样式以及创建渲染器的过程在 Webkit 中被称为“Attach 附加”，在 DOM 树中添加新的节点，则需要调用新节点的附加操作。

其中，样式计算是一个复杂的操作，通常有以下问题：

* 样式表通常结构巨大，容易占用大量内存
* 样式规则通常十分复杂，嵌套和层叠往往引起计算性能问题

Webkit 使用共享渲染样式对象来减少内存占用与计算次数。但是使用共享对象有一些条件：

* 元素标签名必须相同，类属性必须匹配，且不能使用 ID 选择器，属性选择器，同级选择器（如 :first-child）
* 属性必须完全相同，且不能有 Inline 样式
* 元素的鼠标状态、焦点状态必须相同

FireFox 还使用了**规则树**这一方案。

![规则树](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200813142147.png)

规则树有以下几种特点：

* 底层的节点优先级高（利于发挥 CSS 继承特征）
* 属性值会被转化为绝对值（减少计算量）
* 树节点的添加是懒执行

## 重绘与回流

浏览器的回流使用“Dirty 位”系统，尽可能只重新布局少的节点，此操作是异步的。但如果触发了全局字体变更、屏幕大小调整，则需要重新布局整颗渲染树，此操作是同步的。

绘制过程与回流类似，绘制也分为全量和增强绘制。

## 阅读更多

* [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
* [HTML SPEC](https://html.spec.whatwg.org/multipage/parsing.html#parsing)
* [CSS Selectors Level 3](https://www.w3.org/TR/selectors-3/#grammar)