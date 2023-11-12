# BEM

#### [《决战 BEM, 10 个常见问题及其解决方案》](https://zhuanlan.zhihu.com/p/26407119)

<q>作为设计师的我不希望我性感的标题夹杂着肮脏的双重下划线和恶劣的双连字符。</q>

作者认为模块化的设计要比起劣势——令人尴尬的语法——功能战胜了形式。

<q>命名约定是为了更好的识别顶级组件模块如 c-card，而 BEM 是 BlockElement–Modifier，而不是 BlockElement\_\_Element–Modifier</q>

BEM 能强迫开发者以组件而不是 DOM 结构的形式思考代码组织形式，从这个角度而言我也认同，并且，过去的经验告诉我，平铺 DOM 的方式加上 BEM 再配合网格布局，在小型组件里能减少许多心智成本，比如：

```html
<div class="cx-card">
  <div class="cx-card__header" />
  <div class="cx-card__content">
    <div class="cx-card__title" />
    <div class="cx-card__actions" />
    <div class="cx-card__image" />
    <div class="cx-card__empty-tip" />
  </div>
  <div class="cx-card__fotter" />
</div>
<style>
  .cx-card__content {
    display: grid;
    grid-template: 'xxx';
    grid-template-areas: 'xxx';
    .cx-card__title {
      grid-area: 'xxx';
    }
  }
</style>
```

<q>我发现用了这样的命名空间是我的代码可读性大大提高。即使我不会在 BEM 上打包卖给你，但它的确是一个关键的外卖。</q>

- "c-"，组件的主干，如 “c-card”
- “l-”，单纯用于布局的元素，如 “l-grid”、“l-grid\_\_item”
- “h-”，Helper，具有单个功能，通常使用 !important 提升其重要性
- “is-”，组件状态
- “js-”，JS 行为控制的钩子

不少大佬都说过命名空间这玩意儿，比如张鑫旭曾在某篇博客中提过自己喜欢用 “x” 结尾的 CSS 类名作为布局容器的命名。

<q>坚持一套标准状态钩子是有道理的</q>

如果写组件多于 HTML 的话，也许不会碰到需要探索 “l-” 这种命名空间策略的场景，因为布局组件（栅格组件或者现代 CSS 网格布局）已经可以屏蔽掉这层知识。随着 JS 变得复杂，在实际的代码中 “is-” 可以覆盖掉 “l-”、“h-”、“js-” 等其他钩子函数，达到一样的效果，并减少心智负担。

相关见：[More Transparent UI Code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

<q>真正模块化的 UI 元素的修饰不应该去关心元素的父容器。无论你放在哪，它们应该看起来是一样的。</q>

单纯喜欢这个说法，但实际上感觉就算在 B 端产品也很难办到。

<q>通常，我会在组件的上下文中将需要样式化的标签都加上类名。我经常很少给 p 标签加样式名。除非该组件要求他们在上下文中独一无二。</q>

等于在说：“只有在用到的时候才会加类名，并且简单的标签加不加都行”。

<q>我们可以灵活的更改组件的类型吗？比如一个下拉菜单当它在某个屏幕尺寸的时候转换为一组选项卡，或者在某个触发点又变为菜单栏的屏幕外的导航。</q>

感觉作者提到的重新写个组件或者使用“响应式后缀”的方法都不是很理想。现代组件库已经可以并且多数使用 JS 处理这种问题，主要靠 JS，类似上文说的 “is-” 钩子。

#### BEM in JS 的方案？

使用 css-render（及其插件）可以享受在 CSS-in-JS 方案中写 BEM 的快乐。

见：[css-render，另一种 CSS-in-JS 的方式](https://zhuanlan.zhihu.com/p/126670101)
