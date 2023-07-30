---
meta:
  - name: keywords
    content: GPT,JS,TS,learn,front-end
  - name: description
    content: 如何使用 GPT 辅助前端学习？我认为最重要的两步是，首先使用 GPT 咨询普遍性的、具体的问题获得关键字，然后翻阅相关文档进行具体地学习。因为在文中两个问题，我感觉在纯知识面上受到了 GPT 的碾压。
---

# 🚩 如何向 GPT 咨询前端问题

[TOC]

### 应当咨询普遍性及具体的问题

前端学习很难。首先是面对排山倒海的文字资料，如果没有掌握合适的方法，比如保持阅读文档和更新日志的习惯，很难在知识面上跟上具体框架的发展。另一方面，在细微的问题上有无数种解决方法（比如渐变边框的一百种画法），很少有方便学习的高质量的图书或稳定的聚合推荐。我觉得前端的难，以繁杂、琐碎的知识点带来的记忆难度为首，尤其当开发者入门后想建立起知识广度的积累时。

ChatGPT 是一个好工具，很适合用作前端学习。但在工作中，我常看到同事错误的使用它。在一次帮忙排查 WebStorm 中 ESLint 插件失效时，同事反复将控制台报错信息粘贴进 GPT 中，期望获得有用的提示。但这次的报错并不是常见问题，所以直到最后，GPT 没有切中地给出解决问题的方法。它回复了万金油答案，就像是“问：升级 xxx 能带来什么？答：提高兼容性和性能”那样。

我并不是说要通过系统地学习提示工程来引导 GPT 输出我们需要的回答，而是 GPT 工具本身在某些场景并不适合。目前许多 GPT 工具没有提供互联网连接，且知识库截至 2021 年。撇开提示技巧，我觉得应该在常见且具体的问题上咨询 GPT 的建议，最重要的两步是，首先使用 GPT 咨询普遍性的、具体的问题获得关键字，然后翻阅相关文档进行具体地学习。因为在以下两个问题，我感觉自己在纯知识面上受到了 GPT 的碾压。

### 如何防止 Element Plus 组件中的 Popper 溢出容器？

第一个例子是关于防止 Popper 溢出容器的设置。

![el-tooltip example](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230702125800.png)

B 端产品常将复杂性隐藏在 Dialog 或 Popup 中。我们公司的组件库基于 Element Plus，所以经常需要对弹窗的内容进行定制。这里有一个问题，Popper 的位置不好控制。当交互场景变得更复杂，比如当滚动弹窗内容要求 popper 不溢出弹窗容器时，你会发现问题开始变得难以解决。其一因为 Element Plus 的文档没有关于如何控制 popper 位置作更多说明，如果在 Element Plus 的文档中搜索“位置”，你只能找到 Popper 的 placement 和 offset 两种属性，而且都不是我们想要的答案；其二更重要，就算你在互联网搜索相关关键字，也很难从中汲取有效信息。你可以尝试搜索“element-plus+popper（或相关组件）+溢出弹窗 -'element-ui'”之类的关键词验证我的说法，这个问题过于垂直，所以网上没有具体的解决方法，或能搜出来的是关于 element-ui 的过时的资料。

答案隐藏在 popper.js 的文档中，所以解决这个问题可能有以下几条通路：

1. 在 element-plus tooltip（或相关组件）文档漫游，通过不起眼的 popper.js 文档链接进入并搜寻，有概率能找到解决相关问题的 API
2. 在搜索引擎找到了其它用户在解决 element-ui+popper@1.x 位置控制方面的经验，于是自发搜索 popper.js@2.x 文档，并在文档中找到关键 API。
3. 在 github element-plus issues 中搜索 “popper+dialog”，能找到其它开发提供的提示，直接将你引向 poppper.js@2.x 中解决相关问题的关键 API。

只能说 HTML 不够 Hyper，所以搜索引擎在这种没有直接资料的场景中无能为力。不过，好消息是因为问题非常具体，所以 GPT 对这种问题通常答得很好，下面来看看 GPT 的回答：

#### 第一轮

问：“你作为一个专业的前端工程师，请告诉我解决以下问题的思路：我在 el-dialog 中某个按钮上使用了 el-tooltip 组件，应当如何设置 el-tooltip 使其不超出 el-dialog 容器。”。

GPT 答（下文的引用部分都作为 GPT 的回答）：

> 好的，以下是一个解决这个问题的思路：
> 1. 使用插槽自定义内容，......
> 2. 使用 CSS 类名控制样式，......

#### 第二轮

在第一轮得到了普通的回答，继续追问：“有没有其他方法用来控制 el-tooltip 不超出容器？”。

> 除了前面提到的两种方法外，还有一种方法可以用来控制 el-tooltip 不超出容器，那就是使用 CSS 中的 overflow: hidden 属性来控制容器的溢出，......

#### 第三轮

在第二轮得到了超常但不好用的回答，重复提问：“有没有其他方法用来控制 el-tooltip 不超出容器？”。

> 除了前面提到的一种方法外，还有一种方法可以用来控制 el-tooltip 不超出容器，那就是使用 Popper.js 提供的 preventOverflow 选项来限制 el-tooltip 的位置，......

经过三轮交流，GPT 给出了可参考的问题代码。通过搜索“popper-options”+“preventOverflow”关键词，能确定，这的确是能解决问题的关键 API。

```vue
<el-tooltip content="这是 el-tooltip 的内容" placement="bottom" :popper-options="{ preventOverflow: { boundariesElement: 'viewport' } }">
  <el-button>Hover Me</el-button>
</el-tooltip>
```

现实的问题对于 GPT 而言过于复杂，所以将其拆解为更小的更具体的问题是一个有效的提问手段。经过查阅文档进一步完善解决方法，总结出的“标准答案”如下：

```vue
<template>
  <el-tooltip
    v-if="continaerElement"
    popper-class="test-popover"
    :popper-options="{
      modifiers: [
        // 通过 preventOverflow 插件防止 popper 超出某个容器
        {
          name: 'preventOverflow',
          options: {
            // 容器元素
            boundary: continaerElement,
            // popper 应当据容器的边距
            padding: 12,
            // 优先以“上下”方向计算 popper 和容器是否溢出，还是“左右”方向，
            // 配置 altAxis 并配合 flip 插件，才能使“上下左右”四个方向都不发生溢出
            altAxis: true,
          },
        },
        {
          name: 'flip',
          options: {
            // 容器元素
            boundary: continaerElement,
            // 当容器与 popper 发生碰撞时，使 popper 不会覆盖触发 popper 显示的 refference，
            // 而是回退到其它方向显示
            // more on https://popper.js.org/docs/v2/modifiers/flip/
            fallbackPlacements: ['top', 'bottom', 'right', 'left'],
          },
        },
      ],
    }"
  />
</template>

<style lang="scss">
// 当 referrence 消失时，popper 应当立即消失，
// 而不是移动到 （0，0）位置并等待动画结束再消失
// more on https://popper.js.org/docs/v2/modifiers/hide/
.test-popover[data-popper-reference-hidden='true'] {
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
}
</style>

```

这个问题“难”解决。我猜 80% 的 Element Plus 用户都不能在短时间内解决它。不过“难”并不意味着其涉及的技术有多晦涩，而是说有效信息比较分散，需要人工搜寻、甄别并连接有效信息的关键点。许多人可能不具备这种逐步筛选信息的思考方式。又比如在上面这段样式代码中，官网给出的示例是不正确的，需要修改后才能使用。换做新手的我很可能发现给出配置无效后便放弃解决问题了。

总之，在这个例子里，使用 GPT 成功联通了有效信息，随后手动搜索关键配置，便找到了解决问题的正确方法。我认为只要问题够具体，便很容易通过“tell me more”这种重复提问的方式使 GPT 穷举出相关知识。再配合人工审查，便能得到有用的东西。以下用另一个例子展示简单的知识是可穷举的。

### 如何选取页面上某个具体的 DOM 节点？

面试时，在正式开始提问前，我希望通过一道简单的题目让面试者放松并进入状态。一开始，我觉得“常见 CSS 垂直居中方法？”、“常见的获取 DOM 节点的方法？”这些记忆性的问题非常合适。

以“常见的获取 DOM 节点的方法”这个问题举例，我敢说，包括我自己在内，几乎所有前端都没有对这个具体的问题做过总结。因为用不上。真的用不上。在 MVVM 框架大行其道的今天，较少存在需要手动处理 DOM 节点的场景。不过，作为热身题，它合适在简单。任何人都不会因为它阻塞的思路而陷入窘迫的地步。回答得越多，得分越高。

在用过 GPT 后，我觉得这种问题过于机械化，不能激发思考，是对被试者的侮辱。在上一小节说到，在具体问题上 GPT 能穷举相关知识。放到这个问题，我用普通人的回答和 GPT 的回答做一个对比来进一步证实它在此方面的“异能”。

普通人的回答可能是：“控制台的 \$ 和 \$\$ 方法、document.querySelector、document.getElementBy 等方法”。接下来，让我们看看 GPT 的表现。

#### 第一轮

问：“如何选取页面上某个具体的 DOM 节点？”。

> 要选取页面上的某个具体的 DOM 节点，可以使用 JavaScript 中的 DOM API。以下是选取 DOM 节点的几种常见方式：
> 1. getElementById，下略
> 2. getElementsByClassName，下略
> 3. querySelector，下略
> 4. querySelectorAll，下略

#### 第二轮

问：“告诉我“如何选取页面上某个具体的 DOM 节点”的更多方法，除了上面提到的 document.getElementXXX、document.querySelectorXXX 相关方法”。

> 要选取页面上的某个具体的 DOM 节点，可以使用 JavaScript 中的 DOM API。以下是选取 DOM 节点的几种常见方式：
> 1. parentElement 和 children 属性，下略
> 2. document.all，下略
> 3. getElementsByTagName，下略

#### 第三轮

问：“告诉我“如何选取页面上某个具体的 DOM 节点”的更多方法，除了上面提到的 document.getElementXXX、document.querySelectorXXX、parent/children、getSelection、document.all 相关方法。”

> 1. nextSibling 和 previousSibling，下略
> 2. firstChild 和 lastChild，下略
> 3. document.evaluate，下略
> 4. event.target，下略

... 以下重复 N 轮，直到 GPT 开始说胡话。

那么结果如何呢？

以我最后的提问作为 GPT 在这轮上下文提及的关键字的参考：“告诉我“如何选取页面上某个具体的 DOM 节点”的更多方法，除了上面提到的 document.getElement*、document.querySelector*、parent/children、getSelection、document.all、nextSibling、firstChild、document.evaluate、event.target、matches、closest、getElementsBy*、activeElement、elementFromPoint、Range、createTreeWalker、all、XPath、MutationObserver、forms、images、links、head、body、defaultView、frames、form.elements、embeds、plugins、getElementsByTagName、getElementById、createDocumentFragment、anchors、styleSheets、scripts、scrollingElement、documentElement 以及多个选择器复用相关方法”。

把 GPT 提到的关键词做一下分类，大致可以总结出以下“标准答案”：

* 选择器 API：
  * 元素选择器：element.getElementBy*
  * CSS 选择器：element.querySelector*、element.matches
  * XPath 选择器：element.evaluate
  * Selection：window.getSelection
  * Range：document.createRange
* 能获取节点的实例属性：
  * document.x：document.all、document.images、document.styleSheets、...
  * node.x：element.firstChild、element.parentNode、...
  * element.x：element.children、...
  * event.x：event.target、event.from、...
  * mutaionRecord.x：mutaionRecord.nextSibling、...
* 能返回节点的实例方法：
  * node api：element.getRootNode()、...
  * treeWalker api：treeWalker.filter()、...
* 配合回调函数使用的方法：
  * MutationObserver：mutationObserver.observe
  * TreeWalker：createTreeWalker、

这应该也只是现实的冰山一角。翻阅 MDN 文档能从 Permissions、ShadowRoot、SVG 相关关键字找到更多；另一方面，除了直接使用 DOM API 外，使用控制台，甚至使用框架比如 jQuery、Sizzle、Vue、React 都可以解决问题。他们提供了获取 DOM 节点的 API。

总的来说，无论从更广泛还是更垂直的角度翻阅资料，都能找到更多相关知识。这个 GPT 问答的例子再次证明了简单的知识能被穷举，而这个工具真的可以帮助前端学习者从繁杂琐碎的知识点中解放，保留精力去做那些对他们而言更有意义的事情。

### 结论

我得出的结论正如标题：在具体的问题上，简单的知识能被穷举，GPT 可以作为一个合格的互联网消息过滤器。正确的使用方法是在简单的问题上用 GPT 穷举关键字，并通过文档进一步学习；其次，同许多人提过的，复杂问题需要先拆解成适合的尺寸，再进一步用 GPT 处理。

如果说得出了结论就应该有所行动的话，那就是我觉得“如何获取 DOM 节点”这种问题过于机械化，不能激发思考，是对被试者的侮辱，所以最终，我把面试题换成另一些有名的热身题，比如：“如何统计某个页面使用到的 HTML 标签的种类 [^question-1]”。同样简单，但更有趣。

[^question-1]: 源自贺老的 [知乎 Live](https://www.zhihu.com/lives/778991567569440768) 。
