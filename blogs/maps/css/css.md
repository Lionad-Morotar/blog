# CSS Mind Map

[TOC]

## 概念

#### 辨析“规则”与“规则集”

<abbr title="rule">规则</abbr>是由<abbr title="property">属性</abbr>和<abbr title="value">值</abbr>组成的<abbr title="declaration">声明</abbr>、声明与括号形成的<abbr title="declaration block">声明块</abbr>再加上<abbr title="selector">选择器</abbr>组成，而一条或多条规则组合成了<abbr title="rule sets">规则集</abbr>。

![规则&规则集](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200625022018.png)

#### 块级元素（Block-level elements）与内联元素（Inline-level elements）

类似 div、ul、p、h1 这些都是块级元素。一般来说，块级元素会生成一个默认填满父容器的内容区域。其后的兄弟元素将会被“换行显示”；内联元素会在一个文本行中生成元素框，它不会打断这行文本。内联元素常也译为“行内级元素”，在一些文章中，也被称为“行内元素”。

#### 替换元素（Replaced elements）与非替换元素（Non-Replaced elements）

除了如 img、input、iframe 等元素，大多数元素都是非替换元素。替换元素的内容区域会被替换为其指向的外部对象。比如，如果 img 元素不带 src 属性的话，它不指向任何内容，在文档中没有意义，也就不是替换元素；如果 img 的 src 链接了外部图片，那么它的内容区域将被图片替换，此时就是替换元素。

#### 内在盒子（Inner Display Type）与外在盒子（Outer Display Type）

内在盒子描述元素和其子元素的行为，外在盒子描述了元素与父元素以及兄弟元素间的行为。举个例子：

- display: block 的盒子由外在块级盒子和内在块级容器盒子组成
- display: inline-block 的盒子由外在内联盒子和内在块级容器盒子组成
- display: inline 的盒子由外在内联盒子和内在内联盒子组成

## 选择器

#### CSS 大小写敏感吗？

选择器大小写敏感，但 CSS 其它部分大小写并不敏感。所以 Display: NONE 和 display: none 是等价的。

#### 伪类和伪元素用单冒号还是双冒号？
  
- **伪元素表示通过选取 DOM Tree 中不存在的元素**。它是一种概念或范围，所以可以对伪元素样式修改，如首字母（::first-letter）。
- **伪类表示元素的一种状态**，如激活状态（:active）。同一个元素，多个状态之间可以并存，如激活悬浮状态（:active:hover）。为什么 :hover、:focus 等和用户操作相关的状态也是伪类呢？因为用户操作导致元素状态改变。

#### :empty 选择器的巧用

前阵子看一篇文章，有一位老哥用 :empty 选择器来处理文字逻辑的：

```html
<dl>
  <dt>姓名：</dt>
  <dd>张三</dd>
  <dt>性别：</dt>
  <dd></dd>
  <dt>手机：</dt>
  <dd></dd>
  <dt>邮箱：</dt>
  <dd></dd>
</dl>
<style>
  dd:empty::before {
    content: '暂无';
    color: gray;
  }
</style>
```

![:empty 伪类占位逻辑](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629211938.png)

这只能体现 CSS 的可能性，但在项目中运用则是一种错误的做法。比如，如果考虑项目后期要做国际化，那么写在 CSS 中这些内容的可维护性就非常差了。JS 处理逻辑，CSS 负责样式，关注点别搞混了。

#### 通配符的优先级问题

通配符的优先级要比默认高，所以在 CSS Reset 的时候要注意。

#### 哪些属性可以继承？

CSS 中的继承理念很符合直觉，大部分属性如边框、边距、填充等盒子的样式不能继承，而文字相关的如字体、颜色等属性就可以继承。

可继承的属性以下列出：

- 交互样式相关属性：visibility、cursor
- 文字排版相关属性：letter-spacing、word-spacing、white-space、line-height、color、font-\*、text-\*
- 列表排版相关属性：list-style、list-style-type、list-style-position、list-style-image
- 表格排版相关属性：border-collapse

#### text-decoration 可以继承吗？

text-\* 开头的属性大都可以继承，然而 text-decoration-\* 是个例外。在下面这个例子中，“子元素”看起来像是继承了来自父元素的 underline 属性。

```html
<p style="text-decoration: underline;">
  父元素 |
  <span style="text-decoration: line-through;">
    子元素 text-decoration: line-through
  </span>
  | 父元素
</p>
```

<p class="m0" style="text-decoration: underline;">父元素 | <span style="text-decoration: line-through;">子元素 text-decoration: line-through</span> | 父元素</p>

#### 继承得到的属性优先级是多少？

继承得来的值优先级是 0，和通配符一样。很遗憾，其实并不是。

```html
<h1>This is my heading.<span>asdf</span></h1>
<style>
  * {
    color: #bbb;
  }
  h1 {
    color: #333;
  }
</style>
```

![继承得来的值得特殊性不比 0，0，0，0 要高](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200625025101.png)

#### 听说过 LVHT 吗？

“LVHT”指的是我们写 CSS 时常使用的“a:link、a:visited、a:hover、a:active”顺序，主要是依靠级联的最后一条规则“声明出现在文档中的顺序越后，权重越大”。

一般来说，我们不会使用“a:active:hover、a:hover:link”等选择器。由于我们总是这四个状态的重要性依次递增，所以推荐“LVHT”顺序，也可以记为“Love&Hate”。

## 视觉格式化模型

视觉格式化模型，即“Visual Formatting Model”。一般 CSS 使用自上而下，从左至右的布局。盒子是其中的最基础的渲染单位，代表了元素的展现方式以及它们同周围元素的相互作用。渲染时，所有元素都会依据 VFM 来判定其大小，位置以及属性。VFM 决定了浏览器如何处理文档树，将元素转化为用户看到的内容。

- 盒子尺寸，受元素类型、box-sizing 影响
- 盒子类型，受 display、float 影响
- 定位方案，受 position 影响
- 子元素及兄弟元素
- Viewport 尺寸及位置
- 内在尺寸（如果是替换元素的话，需要考虑元素的内在尺寸，如图片宽度）

#### 元素类型如何影响盒子类型？

每一个块级元素都会按照 VFM 生成至少一个主块级盒子（Principle Block-level Box）。说“至少”是因为一些块级元素能生成额外的盒子，如 li 会生成标记盒子（就是列表项前面的那个点点）。

除非一个块级盒子是表盒（Table Box）或替换元素的主盒，块级盒子也是一个块容器盒子（Block Container Box）。当一个盒子既是块级盒子，也是块容器盒子时，它也是块盒子（Block Box）。见下图左。

一般情况下，一个块容器盒子要么只包括块级盒子，要么只包含内联级盒子（行内级盒子）。

![Block Box](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200702000624.png)

内联元素（Inline-level Elements）不会为内容形成新的块，它的内容只能以“行”的形式布局。每一个内联元素都会生成一个内联盒子，这个盒子要么是行内盒子（Inline Box），要么是原子内联盒子（Atomic Inline-level Box）。行内盒子及其内容会直接参与 IFC，而原子内联盒子以“单一不透明盒子”的形式参与 IFC。

![Inline-level Box](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200702004940.png)

<details>
    <summary>原子内联盒子示例</summary>
    <p class="b1 m0 p10" style="resize: horizontal; overflow: auto;">通过 Resizer 改变父元素的宽度，能发现 Inline Block Elements 会像块级元素一样在放不下时整个换行，不像文本一样拆分作多行 <span class="b1 p010" style="display: inline-block">Inline Block Elements</span></p>
</details>

#### box-sizing 如何影响盒子尺寸？

Box Sizing 用来标记盒子的内容区宽高的计算方式。《CSS 世界》提到：属性 Box Sizing 发明的初衷可能是用于解决替换元素的宽度自适应的问题。比如输入框的宽度默认情况下的 100% 往往会超过父容器。所以建议这样写样式重置：

```SCSS
input, textarea, img, video, object {
    box-sizing: border-box;
}
```

#### display 属性如何影响盒子的类型？

- display: block，生成一个主块盒子
- display: inline-block，生成一个主内联盒容器（自身按照块盒子进行格式化布局，内容则按照原子内联盒子布局）
- display: inline，生成一个或多个行内盒子
- display: none，自身及内容都会在布局时被移除，不会生成任何盒子
- display: content，会保留盒子、子元素以及其自身伪元素，只是浏览器不会渲染盒子的边界

#### position 与流的关系有几种？

CSS2.2 的定位方案就三种，普通流定位，浮动定位或是绝对定位。

- **普通流定位**，按普通流的规则排列盒子，Position 属性的值为 static
- **浮动定位**，脱离文档流（Out of Flow），Float 属性的值不为 none
- **绝对定位**，脱离文档流，Position 属性的值为 static | fixed

在普通流中，盒子默认按从左至右、自上而下的规则排列；可以使用相关属性改变流的方向，下图是阿拉伯使用的搜索引擎主页，见 HTML 元素上定义的 DIR 属性：

![阿拉伯搜索引擎](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629195939.png)

#### BFC 该怎么理解和使用？

布局时，VFM 依据盒子的类型生成格式化上下文，有 BFC（Block Formatting Context） 或是 IFC 等。格式化上下文使盒子在界面上形成一个独立的，不影响外界的容器。

最直观的感受肯定是 HTML 元素，即根元素，它是浏览器中最重要的一个独立的不影响外界的容器。根元素会创建 BFC，在一些情况下，其它元素也会。这里有 MDN 的一份创建 BFC 方法的[清单](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)：

- 根元素
- 浮动元素
- 绝对定位元素
- Overflow 不为 Visible 的块级元素
- CSS3 中新增了一种 display: flowRoot 可以用来创建无副作用的 BFC。
- 行内块元素，弹性元素，网格元素
- 表格单元格，表格标题

BFC 的副作用主要和浮动元素以及内部子元素相关：

- BFC 不会和外部浮动元素重叠。
- BFC 内部的相邻的块级盒子的垂直外边距会折叠。
- 计算 BFC 的高度时，内部浮动的盒子也会参与计算。

<details>
    <summary>BFC 不会和外部浮动元素重叠</summary>
    <ul>
        <li>
            <div class="b1"><div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">Float1</div>DIV</div>
            <div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">Float2</div>
            <div class="dib b1 bg-gray" style="height: 100px; width: 100px;">BFC</div>
        </li>
    </ul>
</details>

<details>
    <summary>BFC 内部的相邻的块级盒子的垂直外边距会折叠</summary>
    <ul>
        <li>
            <div class="dib b1 vm">
                <div class="bb p010 b1 bg-gray" style="margin-bottom: 1em; height: 2em">Height 2em & Margin Bottom 1em</div>
                <div class="bb p010 b1 bg-gray" style="margin-top: 1em; height: 2em">Height 2em & Margin Top 1em</div>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>计算 BFC 的高度时，内部浮动的盒子也会参与计算</summary>
    <ul>
        <li>
            <div class="dib b1 vm"><div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">Float</div>BFC</div>
        </li>
    </ul>
</details>

#### IFC 该怎么理解和使用？

如果一个块级盒内部只有行内盒子，那么会创建一个 IFC，块级盒子内部的盒子就会按照 IFC 的规则排列。在 IFC 中，需要注意：

- 内部的盒子一个接着一个地排列，起点是包含块的顶点。
- 如果一行放不下内容，那么会被“拆”开放到下一行。
- 只有水平方向上的 Margin 会在盒子中保留。
- Padding 和 Border 不会撑开行高。

#### 浮动相关问题

- 父容器塌陷问题

浮动元素，尤其是浮动的图片，很适合用来进行图文混合排版。但是由于脱离了正常文档流，非 BFC 容器不会计算内部浮动元素的高度，所以会引起父容器塌陷的问题。

<br/>

<div class="b1"><div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">FLOAT</div>IM PARENT DIV</div>

<div style="clear: both" />

- 浮动错位问题

HTML 中两个向右浮动的元素，分别为 ONE 和 TWO，在浏览器渲染出来确实 ONE 在右侧，TWO 在左侧。

<br/>

<div class="b1" style="overflow: auto">
    <div class="b1 bg-gray" style="margin: auto; float:right; height: 100px; width: 100px;">FLOAT ONE</div>
    <div class="b1 bg-gray" style="margin: auto; float:right; height: 100px; width: 100px;">FLOAT TWO</div>
</div>

一个浮动的元素会脱离正常的文档流，然后依据 Float 属性向左或者向右浮动，**直到碰到父容器的边框或者另一个浮动元素的边框为止**。所以，浮动错位问题是“特性”，不是“BUG”...

#### 怎么解决浮动塌陷问题？

有几种常见的解决塌陷问题的方法，记录如下：

- 使用 Clear 属性：
  - 给父容器的伪元素应用 Clear: Both；（推荐）
  - 添加一个额外的标签，应用 Clear: Both；
- 触发父容器的 BFC:
  - 父元素设置 Display: FlowRoot | Flex | Grid；
  - 父元素设置 Overflow: Hidden | Visible；
  - 父元素也浮动；
- 给父元素定高；
- ...

#### 简单介绍一下 flex 布局？

Flex 是一种非常灵活的一维布局方式，它使子元素按照主轴方向排列，并根据交叉轴来设置对齐。

<details>
    <summary>Flex 容器可以应用的属性</summary>
    <ul>
        <li>flex-direction，用于控制子元素在主轴的排列方向</li>
        <li><img class="vm" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628061842.png" /></li>
        <li>flex-wrap，规定子元素超出 Flex 容器边界时是否允许折行</li>
        <li>justify-content，主轴对齐方式。</li>
        <li>align-items，主轴对齐方式。</li>
        <li>...</li>
    </ul>
</details>

<details>
    <summary>Flex 容器的子元素可以应用的属性</summary>
    <ul>
        <li>align-self，设置子元素在副轴的对齐方式，会覆盖父容器的 align-items 属性的值</li>
        <li>order，子元素在主轴的排列顺序，数值越小越靠前，可以为负数</li>
        <li>flex-basis，伸缩基准值，将会覆盖 Width 属性的值</li>
        <li>flex-grow，扩展比率。相对其它子元素的 flex-grow 之和的比例，代表将“占据”父容器剩余空间的份数。</li>
        <li>flex-shrink，收缩比率。作用正好相反于 flex-grow，相对于其它子元素的 flex-shrink 之和的比例，代表将“收缩”超过父容器的空间的份数。</li>
        <li>...</li>
    </ul>
</details>

flex-grow 光看概念有些难懂，这里用数值说明一下：假设父容器宽度 100px，子元素只有 1 个，宽度为 50px，flex-grow: .5，那么，子元素就会占据 100px-50px 剩余空间的“自身 flex-grow 数值 / 所有子项 flex-grow 之和”的值的百分比（.5 / .5 = 100%）。

所以，当父容器只含有一个子元素时，给子元素设置 flex-grow: 1 能使它填充满整个父容器：

<div class="b1" stype="display: flex; height: 50px;">
    <div class="bb p010 bg-gray tac" style="margin: 1px; border: 1px dashed; flex-grow: 1; height: 50px; line-height: 50px;">DASHED-ITEM</div>
</div>

前几天在群里有老哥问：怎么在 Flex 布局中强制换行啊？

我心里一惊，Flex 不是这样用的。谨记：**尽管有主轴和副轴之分，但 Flex 是一维布局**。不过，强制换行也可以做到，有很多种方法，以下展示通过子元素设置 flex-basis: 100% 达到强制换行的示例：

<div class="b1" stype="display: flex; flex-wrap: wrap;">
    <div class="bb p010 bg-gray tac" style="margin: 1px; border: 1px dashed; height: 50px; line-height: 50px;">DASHED-ITEM</div>
    <div style="flex-basis: 100%" />
    <div class="bb p010 bg-gray tac" style="margin: 1px; border: 1px dashed; height: 50px; line-height: 50px;">DASHED-ITEM</div>
</div>

![FFC 强制换行](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628071523.png)

#### 元素的层叠顺序是怎样的？

![CSS Stacking Order](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220619191531.png)

## 文本

Line Height & Vertical Align，先挖坑，以后再跳。想要详细了解的话，可以先康康《CSS 世界》，[链接直达](https://www.cssworld.cn/)。

#### vertical-align 默认对齐哪里？

vertical-align 必须在内联元素中才能起作用，默认值是 baseline，将对齐父元素的基线，即字母x的底端。

#### letter-spacing 与 word-spacing 的区别？

- 前者指字母之间的间隔；后者指空格的额外大小。
- word-spacing 非常适合用来调整中英文混合时的排版间隙，无需修改元素的 Margin 值。

![调整 word-spacing](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/CUFmqr7DAI.gif)

## 字体

#### unicode-range 的巧用

比如我把博客字体中所有弯引号的映射都改成了直角引号，见下图：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629204104.png)

其实原理比较简单，直接康康定义的 CSS：

```SCSS
@font-face {
    font-family: 'Quote';
    unicode-range: U+201c, U+201d, U+300C, U+300D;
}

@font-face {
    font-family: 'Noto Serif CJK';
}

:root {
    --font-text: 'Quote', 'Noto Serif CJK';
}

article {
    font-family: var(--font-text);
}
```

也就是定义了一个只包含了引号 Unicode 映射的字体“Quote”，而中文字符或是英文字符在这个字体中找不到对应的映射，则回退至“Noto Serif CJK”中进行匹配。

#### 字体属性使用建议

<details>
    <summary>不使用 font-size: larger | smaller</summary>
    <ul>
        <li>相对值不仅改变字体大小没有统一的标准（在我的浏览器中，larger 字体大小要比父元素大 1.2 倍），但是在其它浏览器中不一定是 1.2 倍；同时，它会改变行高（我没有得出改变行高具体的规律）。下段有两个字体大小为 50px 的“字”。右侧哪一个应用了 font-size: larger。黑色边框代表字宽，字宽宽度就是字体大小。你可以尝试用鼠标选中两个字，对比它们的行高及字宽。</li>
        <li><p class="ls0" style="font-size: 50px"><span class="b1">字</span><span class="b1" style="margin-left: 8px;font-size: larger">字</span></p></li>
    </ul>
</details>

## CSS New

#### JS 如何与 CSS 变量交互？

```js
// 设置变量
$elm.style.setProperty('--var', 'value')
```

#### CSS 变量如何赋默认值？

CSS 变量的第二个值为默认值，如果想兼容不支持 CSS 变量的浏览器，需要新增一个同名属性作为使用了 CSS 变量的属性的回退方案。

```js
.button {
  width: 80px;
  width: var(--button-default-width, 80px);
}
```

Less 代码可以使用正则替换来实现简单的替换效果。

```js
@button-default-width: 80px;
.setFallback(@property, @imp) {
  @{property}: e(replace(@imp, '@([^() ]+)', '@{$1}', 'ig'));
  @{property}: e(replace(@imp, '@([^() ]+)', 'var(--$1, @{$1})', 'ig'));
}
.button {
  .setFallback(width, '@button-default-width');
}
```

见：[use CSS variable with fallback in Less](https://codepen.io/Lionad/pen/MWVYRzL)

#### CSS 变量的与门和或门逻辑？

可以利用 CSS 变量的空值来运算与逻辑和或逻辑。

```css
.box {
  /* --tog1 --tog2 --tog3 同时为空值时是 red */
  --red-if-and: var(--tog1) var(--tog2) var(--tog3) red;
}
.box {
  /* --tog1 --tog2 --tog3 任意为空值时是 red */ 
  --red-if-or: var(--tog1, var(--tog2, var(--tog3))) red;
}
```

#### Houdini 是什么？

Houdini 包含一系列的底层 API，使开发者有能力访问 CSSOM，对自定义属性提供解析、渲染支持。

#### Properties and Values API 有什么用？

它提供了 CSS.registerProperty 接口以及 @property at-rule，使 JS、CSS 有能力自定义 CSS 变量，并提供变量的初始值、语法（值类型）和可继承性的的定义。

```css
@supports (background: paint(houdini)) {
  @property --stop {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 40%;
  }
}
.anim {
  /* fallback */
  --stop: 40%;
  background: linear-gradient(pink var(--stop), orange calc(var(--stop) + 20%));
}
```

<Article-A200903-Transition />

见：[@property @MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)、[@property: giving superpowers to CSS variables](https://web.dev/at-property/)

#### 怎么实现字符转换的动画效果？

CSS 数字变量有过渡效果，如果同时配合 counter 的格式化参数，可以把数字过渡效果转换成字符的过渡效果！

```css
@property --num {
  syntax: "<integer>";
  initial-value: 2541;
  inherits: false;
}
.css-variable-transition {
  padding: 2em;
  counter-set: num var(--num);
  border: solid 1px;
  font-size: 2em;
  font-weight: bold;
  transition: --num .3s;
  cursor: pointer;

  &:hover {
    --num: 17049;
    &::after {
      content: counter(num, lower-alpha) "!";
    }
  }
  &::after {
    content: counter(num, lower-alpha);
  }
}
```

<Article-A210920-Transition />

见：[Animating Number Counters](https://css-tricks.com/animating-number-counters)

## 工程

#### 怎么解决命名冲突问题？

CSS 命名方案可以解决命名冲突和复用两大问题，可以尝试使用：CSS Module、Tailwind、BEM 等方案。

#### 怎么管理样式的继承关系？

<!-- BLOCK - d95f28ea5e53b5f7bc4510ba68f937c8 -->
ITCSS 使用倒立的三角形表示项目的样式继承关系。三角中的每一层都代表一类样式，而每一层都会被下一层更高的优先级覆盖。所以实践 ITCSS 意味着，随着层级自上而下，选择器特殊性递增，能影响的 DOM 数量也越来越少，我们可以轻易修改特定样式，而不影响其它样式，或是导致样式继承的崩塌这种连锁效应。

![ITCSS（Inverted Triangle CSS）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628214218.png?type=win11)
<!-- BLOCK - END -->

见：[ITCSS](/maps/css/inverted-triangle-css.html)

#### 有哪些水平居中方案？

<details>
    <summary>行内级元素（如 Inline，Inline Block）</summary>
    <ul>
        <li>可以在父元素上使用 Text Align: Center</li>
        <p>
          <div class="bg-gray" style="padding: 10px; text-align: center">
              Anonymous Box & <span>Inline</span> & <button class="no-outline" >Inline Block</button>
          </div>
        </p>
    </ul>
</details>

<details>
    <summary>单个块级元素（如 Block）</summary>
    <ul>
        <li>如果块级元素没有设置 Width，那么它会充满父容器，也算是一种“居中”吧</li>
        <li>若固定了 Width，那么可以通过给 Margin Left 和 Margin Right 设置 Auto 值，那么 Margin 会自动填充满“能填充的部分”</li>
        <p>
            <div class="bg-gray" style="padding: 10px;">
                <div style="margin: auto; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">
                    Block
                </div>
            </div>
        </p>
    </ul>
</details>

<details>
    <summary>多个块级元素</summary>
    <ul>
        <li>一般来说，可以改变块级元素的 Display，改为 Inline Block，于是我们又可以通过 Text Align 居中了</li>
        <p>
            <div class="bg-gray" style="padding: 10px; text-align: center">
                <div style="display: inline-block; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="display: inline-block; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </p>
        <li>更简单（同时省心）的做法是，使用 Flex 布局，通过调整主轴方向上元素的对齐方式进行居中。同时，还可以给父容器设置 Margin 或是给子项设置 Margin，以作更详细的调整。</li>
        <p>
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: center;">
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="margin-left: 8px; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </p>
    </ul>
</details>

#### 有哪些垂直居中方案？

<details>
    <summary>单行行内级元素</summary>
    <ul>
        <li>将 Line Height 设置为和父元素 Height 等同。注意，精确地说，这是一种“<em>近似</em>居中”，简便起见，以下都作“居中”。</li>
        <p>
            <div class="bg-gray oh nowrap" style="padding: 10px; height: 150px; line-height: 150px;">
                单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </p>
        <li>当父容器上下 Padding 相同时，也能使子元素居中。</li>
        <p>
            <div class="bg-gray oh nowrap" style="padding: 60px 10px;">
                单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </p>
        <li>Flex... 把主轴方向改为 Column，并调整子项在主轴方向的对齐位置就行。</li>
        <p>
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: center; flex-direction: column; height: 150px;">
                <p class="m0">单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></p>
            </div>
        </p>
    </ul>
</details>

<details>
    <summary>多行行内级元素</summary>
    <ul>
        <li>单行居中的方法也是用与多行居中。不过有一种出乎意料的方法：给父容器设置一个高度为 100% 的 Inline Block 伪元素，并同时给伪元素和内容设置 Vertical Align: Middle 就可以垂直居中了。</li>
        <p>
            <div class="bg-gray ghost-center" style="padding: 10px; height: 280px;">
                <p class="dib m0 vm">垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></p>
            </div>
        </p>
    </ul>
</details>

<details>
    <summary>块级元素</summary>
    <ul>
        <li>若元素高度未知的话，可以使用 TranslateY 垂直居中。</li>
        <p>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="pr b1 p010 h50" style="top: 50%; transform: translateY(-50%); height: 50px; line-height: 48px;">Top: 50% & TranslateY: -50%</div>
            </div>
        </p>
    </ul>
</details>

#### 水平且垂直居中要怎么实现？

<details>
    <summary>水平且垂直居中无非就是上两种方案的整合版本。</summary>
    <ul>
        <li>如果知道子项的宽度和高度，请不要疑惑，使用 Margin 就行。</li>
        <p>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="bb b1 p010 h50 tac" style="margin-top: 25px; margin-left: 25%; width: 50%; height: 50px; line-height: 48px;">Block & Margin</div>
            </div>
        </p>
        <li>如果子项宽度和高度未知，Translate 能解决问题。</li>
        <p>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="bb pr b1 p010 h50 tac" style="transform: translate(-50%,-50%); top: 50%; left: 50%; width: 50%; height: 50px; line-height: 48px;">Block & Translate</div>
            </div>
        </p>
        <li>你当然可以选择 Flex 布局。</li>
        <p>
            <div class="bg-gray flex-cc" style="padding: 10px; height: 100px;">
                <div style="width: 50%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Flex is God</div>
            </div>
        </p>
        <li>Grid 布局，略有兼容性问题，但是会成为今后的二维布局最佳解决方案。</li>
        <p>
            <div class="bg-gray grid" style="padding: 10px; height: 100px;">
                <div style="margin: auto; width: 50%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Grid is God</div>
            </div>
        </p>
    </ul>
</details>

#### 多行文本截断怎么做？

<details>
    <summary>使用 Line Clamp 属性</summary>
    <ul>
        <li>使用 -webkit-line-clamp 属性可以指定块容器内容的行数，同时容器需要设置 display: -webkit-box | -webkit-inline-box 且 -webkit-box-orient: vertical</li>
        <p>
            <div class="bg-gray elipsis-2">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
        </p>
        <li>需要注意的是，父元素使用 LineClamp，子元素不能设置 Padding。</li>
        <p>
            <div class="bg-gray p010 elipsis-2" style="padding: 30px 10px">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
            <img class="mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629210937.png">
        </p>
    </ul>
</details>

<details>
    <summary>模拟截断</summary>
    <ul>
        <li>父元素定高，然后设置一个渐变背景的伪元素。</li>
        <p>
            <div class="p010 bg-gray elipsis-h-2" style="--line-height: 1.85; --bg-color: var(--light-gray); --dot-color: #bbb;">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
        </p>
    </ul>
</details>

#### 移动端适配有了解么？

因为不同设备的像素及 DPR 不同，所以按照 CSS 像素写出来的页面在不同浏览器渲染的效果不一样。简单解决可以使用 rem 方案，更现代化的方案是使用响应式单位如 vw、vh 或者 viewport。

```js
<meta name="viewport" content="
  width=device-width,
  user-scalable=no,
  initial-scale=1.0,
  maximum-scale=1.0,
  minimum-scale=1.0">
```

#### 移动端为什么会有 1px 问题？

随着硬件更迭，设备的分辨率越来越高，渲染页面会变得吃力。但由于屏幕尺寸未发生改变，渲染更高的分辨率并没有带来可观的视觉效果提升，所以许多移动设备在渲染页面时不会使用真实像素作为渲染的单位，而是渲染一个低分辨率的页面，其中一个像素可能对应多个物理像素。这个比叫 DPR（Device Pixel Ratio）。在 DPR 为 2 的设备中，1px 的边框会渲染为物理像素 2px 的边框，看起来和 UI 稿不符，不美观，这个问题俗称“移动端 1px 问题”。

#### 在移动端为什么不能直接使用 0.5px 解决 1px 问题？

【首先】设备的 DPR 不一定为 2，所以需要协同 JS 设置 data 属性来辅助 CSS 计算“0.5px”，这违反了 JS 和 CSS 的关注分离原则。【其次】带小数点的像素单位在不同的移动端浏览器中表现不一，很难预料。

#### 有哪些移动端 1px 的方案？

1. @media query

```css
@media only screen and (min-device-pixel-ratio: 1.5) {
  /* ... */
}
```

```css
#component[data-dpr="2"] {
  /* ... */
}
```

2. transform

```css
#component[data-dpr="2"] {
  position: relative;
}
#component[data-dpr="2"]::after {
  position:absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  content:"";
  transform: scale(0.5);
  transform-origin: left top;
  box-sizing: border-box;
  border: 1px solid #333;
}
```

3. viewport 缩放

```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

## 调试

#### 怎么调试打印页面样式？

在 Rendering 选项卡中将浏览器的媒体类型改为 Print。

![浏览器媒体类型](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/LUFiDK36Jo1.gif)

![预览打印](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629215312.png)

#### 怎么发现页面渲染的性能瓶颈？

在 Rendering 选项卡启用一下设置：

- FPS Meter，即时查看页面帧率
- Paint Flashing，即时查看页面重绘的区域

![FPS Meter & Paint Flashing](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629220655.png)

#### 怎么快速调试盒子尺寸和其它属性？

通过控制台的 Styles 选项卡能看到元素具体的属性及属性继承关系，不过比较麻烦，不够直观。

用 [Visbug](https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc) 要比浏览器自带的强多了：

![Visbug Inspect](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/sp20200629_221459_063.png)

![Visbug 标尺](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/sp20200629_221046_051.png)

## Magic

#### 怎么实现随机效果？

伪随机可使用“禅原则”，通过重复 13、17 等质数防止数字的倍数发生重叠。同理把动画分成多个子动画，赋予其不同的动画时间，也能达到伪随机效果。真随机需要借助 JS，比如可以通过 CSS 变量或者 data 属性把随机数传递给 CSS。

见：[禅原则](https://www.zhangxinxu.com/wordpress/2017/02/%e8%9d%89%e5%8e%9f%e5%88%99-background-border-radius/)，[CSS 真随机数](https://codesandbox.io/s/3vrw5mzw7m)

#### 怎么给背景图案做抗锯齿？

见：[CSS POAA](/articles/css-poaa.html)
