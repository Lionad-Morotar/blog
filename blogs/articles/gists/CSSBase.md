# CSS Mind Map

[TOC]

## 概念辨析

写代码和玩乐器一样，都属于动态学习的范畴，也就是说，边做边学，容易将概念融会贯通，这样会体会地更加深刻。我在大三下学期刚接触 CSS 时，曾对编码时的繁琐感到抵触，认为这是一项不值得一学的语言。这种反感保持了很久，直到近来我对 CSS 基础知识的深入了解。当知道一门语言是怎么被设计的，身处什么样的时代，要解决什么问题，才能将它独有的特征贯通。现在我会觉得 CSS，属性的层叠就是最吸引人的地方。

我曾在陈大鱼头的某篇 CSS 文章评论区，见到有一个老哥因为看不懂概念而觉得“（文章）写的乱七八糟，不清不楚”，觉得很是心酸。对知识的深入了解不能抛开概念不谈，对概念的理解以及编码实操的理解，是不同的，相互补充的，对学习是有帮助的。

这里提及一些比较重要的 CSS 技术名词（或概念），做个开头吧。

* 规则&规则集

一条规则由属性和值组成的声明、声明与括号形成的声明块再加上选择器组成，而一条或多条规则组合成了规则集。

![规则&规则集](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200625022018.png)

* 元素（Elements）
  
元素是用来组织文档结构的基础，比如 p、span 等。每个元素都会对文档的表现起一定作用，每个元素都会在浏览器中以矩形盒子的形式出现。

尽管不能直接查看浏览器中的元素（盒子）的外边界，通过这行代码，但是可以设置 Border 一览其排列：

```js
$$('*').map(x => x.style.border = '1px solid')
```

![页面上的盒子](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/browser_06_22_022.jpg)

* **块级元素**（Block-level elements）与**内联元素**（Inline-level elements）

一般来说，块级元素会生成一个默认填满父容器的内容区域。其后的元素将会被“换行显示”，如 div、ul、p、h1 等都是块级元素；内联元素会在一个文本行中生成元素框，它不会打断这行文本。内联元素常也译为“行内级元素”。

* **替换元素**（Replaced elements）与**非替换元素**（Nonreplaced elements）

大多数元素都是非替换元素，除了如 img、input、iframe 等元素。img 元素如果不带 src 属性的话，它不指向任何内容，在文档中没有意义。如果带 src 属性，那么它的内容区域将完全被指向的图片所替代。

* 元素的**内在盒子**（Inner Display Type）与**外在盒子**（Outer Display Type）

盒子依据 Display 的类型进行布局，主要取决于两种特征：内在盒子 和 外在盒子。两种特征分别规定了其内容和自身是怎样进行布局的。我们通常在页面上写的 Display 属性，比如 Display: Block，其实是一种省略式写法，它只规定了 Outer Display Type 为 Block，而 Inner Display Type 则会退为默认值。

以下是我们常用的简写所代表的默认值：

| Short display |  Full display   |
| :-----------: | :-------------: |
|     Block     |   Block Flow    |
|    Inline     |   Inline Flow   |
| Inline Block  | Inline FlowRoot |
|     Flex      |   Block Flex    |

可取值如下：

```js
<display-outside>   = block | inline
<display-inside>    = flow | flow-root | table | flex | grid | ruby
<display-legacy>    = inline-block | inline-table | inline-flex | inline-grid
```

内在盒子通常也称作“容器盒子”。**“外在盒子”与“内在盒子”，前者描述了元素与其父元素和兄弟元素之间的行为，而后者描述了元素跟其后代之间的行为。**

## 选择器

选择器可以展开的内容太多了，而且屯着的《CSS选择器世界》一直没时间看，这里先过一遍基础内容。

### 基础内容

<details>
    <summary>CSS 中有哪些常用的选择器呢？</summary>
    <ul>
        <li><i>ID 选择器</i>（#Container）</li>
        <li><i>类选择器</i>（.Container）</li>
        <li><i>标签选择器</i>（span）</li>
        <li><i>相邻兄弟选择器</i>（br + br）</li>
        <li><i>同胞选择器</i>（br ~ br）</li>
        <li><i>子元素选择器</i>（.Article > p）</li>
        <li><i>后代选择器</i>（.Article p）</li>
        <li><i>通配符选择器</i>（*）</li>
        <li><i>属性选择器</i>（[abc^="def"]）</li>
        <li><i>伪类选择器</i>（p:nth-child()）</li>
    </ul>
</details>

<details>
    <summary>有哪些常用的伪类/伪元素呢？</summary>
    <ul>
        <li><dt>:nth-child、:nth-last-child、:nth-of-type</dt></li>
        <li><dt>:enabled、:disabled、:checked</dt></li>
        <li><dt>:root</dt></li>
        <li><dt>:empty</dt></li>
        <li><dt>:target</dt></li>
        <li><dt>:not</dt></li>
        <li><dt>:focus</dt></li>
        <li><dt>::first-letter、::first-line</dt></li>
        <li><dt>::after、::before</dt></li>
        <li><dt>::selection</dt></li>
    </ul>
</details>

### 伪元素与伪类

提到了伪类/伪元素，这里有必要提一下**伪元素和伪类的区别**。

以下是我总结的理解思路：**伪类表示元素的一种状态**，如 Focus、Active 等，同一元素多个状态之间可以并存；**伪元素是通过选择器选取 HTML 不曾在 DOM Tree 中出现过的元素**，进行样式修改，如 After、Selection 等，对于同一父元素，只能选取一个同种的伪元素。

那么 :hover、:focus 等和用户操作相关的是伪类还是伪元素呢？

是伪类。其实并不需要特殊记法，只要记牢用户操作导致元素状态改变就行了。

### 特殊性

选择器的特殊性（Specificity）由选择器本身的组件确定。特殊性值表述为 4 个数字组成的统一的部分，如： [0，0，0，0]

* 重要性声明的特殊性总是胜过非重要性声明（!important 力压群雄）
* 对于行内样式，特殊性值表加：[1，0，0，0]
* 对于 ID 选择器，加：[0，1，0，0]
* 对于类选择器，属性选择器，或是伪类，加：[0，0，1，0]
* 对于标签选择器和伪元素选择器，加：[0，0，0，1]
* 通配选择器、子代选择器、相邻选择器、同胞选择器会给特殊性值表加：[0，0，0，0]（不等同于不增加，这点在后面有辨析）

### 继承

《CSS世界》提到，**CSS世界的诞生就是为图文信息展示服务的**。CSS 中的继承理念很符合我们的直觉，大部分属性如边框、边距、填充等盒子的样式不能继承，而文字相关的如字体、颜色等属性就可以继承。

完整的会继承的属性以下列出：

* 交互样式相关属性：visibility、cursor
* 文字排版相关属性：letter-spacing、word-spacing、white-space、line-height、color、font、 font-\*（font-family、font-size、font-style）、text-\*（text-indent、text-align、text-shadow、text-transform）
* 表格排版相关属性：border-collapse
* 列表排版相关属性：list-style、list-style-type、list-style-position、list-style-image

#### 非继承属性

有一点需要注意的是，text-decoration-* 属性看起来会被继承，但实则不然：

<p class="m0" style="text-decoration: underline;">父元素 text-decoration: underline<span>子元素 text-decoration: line-through</span></p>

#### 继承&特殊性

需要额外注意的一点是，**继承得来的值得特殊性要比 [0，0，0，0] 低**。假设有以下代码：

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

将会得到以下结果：

![继承得来的值得特殊性不比 0，0，0，0 要高](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200625025101.png)

此外，《CSS权威指南》中提到：应用到 body 元素得背景样式可以（向上）传递到 html 元素，相应地可以定义其画布。这点属于继承中的特例，但我在 Yandex 浏览器中没能复现。

### 层叠

浏览器会如何应用两个特殊性相等的规则呢？这里给出一个有关于层叠与样式来源的权重的参考，按权重递减排列：

* 用户样式的重要性声明
* 网站样式的重要性声明
* 网站样式的正常声明
* 用户样式的正常声明
* 浏览器的默认样式
* 声明出现在文档中的顺序越后，权重越大

附：在我的 Yandex 浏览器里已经找不到显式设置用户样式的入口了，我也相信普通用户不会知晓如何设置用户样式的方法，就算知晓也不会去使用——[插件](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld)要香一些。

#### LVHT

“LVHT”指的是我们写 CSS 时常使用的“a:link、a:visited、a:hover、a:active”顺序，主要是依靠层叠的最后一条规则“声明出现在文档中的顺序越后，权重越大”。

一般来说，我们不会使用“a:active:hover、a:hover:link”等选择器。由于我们总是这四个状态的重要性依次递增，所以推荐“LVHT”顺序，也可以记为“Love&Hate”。

从“LVHT”这个例子可以看出我为什么觉得“层叠”是CSS最吸引人的地方了。层叠概念能体现出一种简单但深刻的知识——**设计人员总是希望用户在浏览器中与网页交互得到正确的反馈**，就好比悬浮按钮时有样式反馈，点击按钮时有激活提示——**层叠迫使设计人员（开发者）思考什么对用户而言是重要的内容，同时，“我们能提供什么信息”、“我们鼓励用户做什么**”。


## VFM

VFM，即“Visual Formatting Model”，决定了浏览器如何处理文档树，如何将简单盒模型转化为盒子。如果对 VFM 不清楚，往往不能理解浏览器中很多看起来怪异（常常被说是“BUG”）的布局表现。其实这些怪异的表现不是“BUG”，只是尽管 VFM 是一种开放而强大的模型，它充满细节，和我们脑海中的布局常识可能不一致；同时，又留有一些规范未覆盖的余地，供浏览器自由发挥。想进一步学习 CSS，VFM 是必须跨越的关口；掌握它，才能理解 CSS 布局的真正面目。

页面上的布局往往会受到这些因素的影响：

* **盒子尺寸**
* **盒子类型**，行内盒子（inline），行内级盒子（inline-level），原子行内盒子（atomic inline-level），块盒子（block）
* **定位方案**，普通流定位，浮动定位或是绝对定位
* **子元素或兄弟元素**
* **Viewport尺寸及位置**
* **内在尺寸**，如果是替换元素的话，需要考虑元素的内在尺寸（比如，图片本身的宽度）

接下来，我们选几点重要的因素详细了解一下。

### 盒模型

盒模型描述了如何通过元素的 Display 属性生成根据视觉格式化模型布局的矩形盒子。正常流中，CSS 使用自上而下，从左至右的布局，盒子是其中的最基础的渲染单位，代表了元素的展现方式，以及它们同周围元素的相互作用。渲染时，所有元素都会依据盒模型来判定其大小，位置以及属性。

通常我们会觉得 Width 属性定义了一个元素（块级元素）的宽度，这种说法其实不太准确。Width 定义的是内容区的宽度。一般来说，内容区的宽度指下图的 width：

![盒模型](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200626221013.png)

#### 属性 Box Sizing

在早期 IE 中，盒模型有一种怪异模式下的解析方式，即 Border-Box。围观群众都说 IE 早期的盒模型不遵循标准，但...

> **IE**：我觉得盒模型应该是这样的，blahblah。<br />
> **W3C**：明显应该是这样的才对，blahblah。<br />
> 结果是 IE 在怪异模式下用了「不标准」的盒模型，而标准模式下用了「标准」的盒模型。<br />
> **围观群众**：听说 IE 的盒模型不标准。<br /><br />
> ...多年过去...<br /><br />
> **W3C**：感觉还是 IE 的那个模型比较好。但我们已经回不去了... 算了加个属性支持一下 IE 那种模式吧。<br />
> **[顾轶灵@知乎](https://www.zhihu.com/question/25509268/answer/30949718)**: `box-sizing` 这货就是用来擦屁股的...<br />

对于四种盒尺寸，Content Box，Padding Box，Border Box 和 Margin Box ，Width 属性只作用于 Box Sizing 属性定义的内容区域中。

![box-sizing](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/browser_06_21_018.png)

以前写项目的时候，我喜欢使用通配符重置所有元素的 Box Sizing 为 Border Box，这样会使样式编写容易一些，因为 Border Box 包含了 Border 的宽度，这个宽度各符合直觉。不过，有两点可能需要考虑：

* 统配符可能会带来样式污染（比如污染页面引入的其它库）
* 统配符**可能会**带来不必要的性能消耗（我没有进行过测试）

《CSS世界》中还提到，属性 Box Sizing 发明的初衷可能是用于解决替换元素的宽度自适应的问题，比如输入框的宽度默认情况下的 100% 往往会超过父容器。所以建议这样写样式重置：

```CSS
input, textarea, img, video, object { 
    box-sizing: border-box; 
}
```

#### 外在盒子与内在盒子

就像博客开头概念辨析那小节介绍的：**“外在盒子”与“内在盒子”，前者描述了元素与其父元素和兄弟元素之间的行为，而后者描述了元素跟其后代之间的行为。**

* Display: block 的盒子由外在块级盒子和内在块级容器盒子组成
* Display: inline-block 的盒子由外在内联盒子和内在块级容器盒子组成
* Display: inline 的盒子由外在内联盒子和内在内联盒子组成

### 盒子定位

定位方案就三种，普通流（或正常流）定位，浮动定位或是绝对定位。

* **普通流定位**，按普通流的规则从左至右、自上而下地排列盒子，Position 属性的值为 static
* **浮动定位**，脱离文档流，Float 属性的值不为 none
* **绝对定位**，脱离文档流，Position 属性的值为 static | fixed

### BFC

布局时，会依据盒子的类型生成 BFC（Block Formatting Context） 或是 IFC（Inline Formatting Context），它们使盒子在界面上形成一个独立的，不影响外界的容器。

最直观的感受肯定肯定是 HTML 元素，即根元素，它是浏览器中最重要的一个独立的不影响外界的容器。根元素会创建 BFC，在一些情况下，其它元素也会。这里有 MDN 的一份创建 BFC 方法的清单：

* 根元素
* 浮动元素
* 绝对定位元素
* Overflow 不为 Visible 的块级元素
* 行内块元素，弹性元素，网格元素
* 表格单元格，表格标题
* CSS3 中新增了一种 Display: FlowRoot 可以用来创建无副作用的 BFC。

BFC 在布局时，会应用以下规则，需要注意：

* BFC 不会和外部浮动元素重叠。
* BFC 内部的相邻的块级盒子的垂直外边距会折叠。
* 计算 BFC 的高度时，内部浮动的盒子也会参与计算。

<details>
    <summary>BFC 不会和外部浮动元素重叠</summary>
    <ul>
        <li>
            <div class="b1"><div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">Float</div>DIV</div>
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

### IFC

如果一个块级盒内部只有行内盒子，那么会创建一个行内上下文，其内部的盒子按照 IFC 的规则水平排列。

在 IFC 中，需要注意以下问题：

* 内部的盒子一个接着一个地排列，起点是包含块的顶点。
* 如果一行放不下内容，那么会被“拆”开放到下一行。
* 只有水平方向上的 Margin 会在盒子中保留。
* Padding 和 Border 不会撑开行高。

### 浮动

Float 虽然平常用的不多，但是这里单独拎出来康康。原理至少还是要了解的，因为浮动涉及到一些“看起来像 BUG”的问题。

* 父容器塌陷问题

浮动元素，尤其是浮动的图片，很适合用来进行图文混合排版。但是由于脱离了正常文档流，非 BFC 容器不会计算内部浮动元素的高度，所以会引起父容器塌陷的问题。

<br />

<div class="b1"><div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">FLOAT</div>IM PARENT DIV</div>

<div style="clear: both" />

下一小节将会介绍清除浮动的一些办法。

* 浮动错位问题

HTML 中两个向右浮动的元素，分别为 ONE 和 TWO，在浏览器渲染出来确实 ONE 在右侧，TWO 在左侧。

<br />

<div class="b1" style="overflow: auto">
    <div class="b1 bg-gray" style="margin: auto; float:right; height: 100px; width: 100px;">FLOAT ONE</div>
    <div class="b1 bg-gray" style="margin: auto; float:right; height: 100px; width: 100px;">FLOAT TWO</div>
</div>

一个浮动的元素会脱离正常的文档流，然后依据 Float 属性向左或者向右浮动，**直到碰到父容器的边框或者另一个浮动元素的边框为止**。所以，浮动错位问题是“特性”，不是“BUG”...

#### 清除浮动

有几种常见的解决塌陷问题的方法，记录如下：

* 使用 Clear 属性：
  * 给父容器的伪元素应用 Clear: Both；（推荐）
  * 添加一个额外的标签，应用 Clear: Both；
* 触发父容器的 BFC:
  * 父元素设置 Display: FlowRoot | Flex | Grid；
  * 父元素设置 Overflow: Hidden | Visible；
  * 父元素也浮动；
* 给父元素定高；
* ...（欢迎补充）


### 其它

#### 显示内容类型

一个显示内容类型的元素（display: contents）会在格式化从布局树中将自身移除，但是它的内容却得以保留。请联想一下 Vue 内置的 Template 标签，或是 React.Fragment，大概类似那种玩意儿... 

需要注意以下几点：

* 盒子不会渲染边界框，这意味着 Margin、Padding、Border 相关属性都将失效。
* 子元素依旧能继承某些属性，这和正常盒子的行为是一致的。
* 盒子依旧存在于文档树中，只是不渲染边界框。而 Vue 中 Template 标签是不渲染的。
* 盒子的 ::before 和 ::after 两个伪元素都将得到保留。

<details>
    <summary>显示内容类型的元素 ::before 和 ::after 两个伪元素都将得到保留。</summary>
    <ul>
        <li>
            <div class="b1 bg-gray test-0604" style="display: contents;"> & <em>CHILD</em> & </div>
            <style>
                .test-0604:before { content: 'BEFORE' }
                .test-0604:after { content: 'AFTER' }
            </style>
        </li>
    </ul>
</details>

#### FFC

VFM 概念中除了有 BFC、IFC、TFC（Table Formatting Context），CSS3 中还新增了 FFC（Flex Formatting Context）和 GFC（Grid Formatting Context），因为可扩展讲的内容太多了，这里暂且只简单提一下 FFC。

应用了 display: flex | inline-flex 的元素将会成为 Flex 容器，Flex 容器会创建 FFC 以格式化布局其子项。我们常说的“Flex 布局”，就是指“FFC”。

FFC 是一种非常灵活的一维布局方式（GFC 则是强大的二维布局方式），它使子元素按照主轴方向排列，并可设置不同轴向的对齐方式。

<details>
    <summary>Flex 容器可以应用的属性</summary>
    <ul>
        <li>flex-direction，用于控制子元素在主轴的排列方向</li>
        <li><img class="vm" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200628061842.png" /></li>
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

flex-grow 光看概念有些难懂，这里用数值说明一下：假设父容器宽度 100px，子元素只有1个，宽度为 50px，flex-grow: .5，那么，子元素就会占据 100px-50px 剩余空间的 .5（自身 flex-grow 数值）除以 .5（所有子项 flex-grow 之和） 的值的百分比（100%）。

可以想象，当父容器只含有一个子元素时，给子元素设置 flex-grow: 1 将会使它填充满整个父容器：

<div class="b1" stype="display: flex; height: 50px;">
    <div class="bb p010 bg-gray tac" style="margin: 1px; border: 1px dashed; flex-grow: 1; height: 50px; line-height: 50px;">DASHED-ITEM</div>
</div>

前几天在群里有老哥问：怎么在 Flex 布局中强制换行啊？

我心里一惊，Flex 不是这样用的。谨记：**Flex 是一维布局**。当然，强制换行也可以做到，有很多种方法，以下展示通过子元素设置 flex-basis: 100% 达到强制换行的示例：

<div class="b1" stype="display: flex; flex-wrap: wrap;">
    <div class="bb p010 bg-gray tac" style="margin: 1px; border: 1px dashed; height: 50px; line-height: 50px;">DASHED-ITEM</div>
    <div style="flex-basis: 100%" />
    <div class="bb p010 bg-gray tac" style="margin: 1px; border: 1px dashed; height: 50px; line-height: 50px;">DASHED-ITEM</div>
</div>

![FFC 强制换行](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200628071523.png)

FFC 中稍微要注意的地方就是，子元素的 vertical-align、float、clear 属性会失效。

## 文本

Line Height & Vertical Align，先挖坑，以后再填。

## 字体

### 浏览器怎样应用字体

假使 CSS 中指定了页面运用的字体，浏览器要怎么查找与匹配它们呢？以下是详细步骤：

1. 创建一个字体属性数据库，包含了机器上安装的所有字体（以及浏览器内置字体）。
2. 根据以下步骤查找匹配的字体，某些属性需要完全匹配，某些则允许匹配失败（并应用回退选项）。
   1. 根据 font-family 的值，按逗号分隔，从左至右依次选定一种候选字体家族，继续以下匹配。
   2. 根据 font-style 匹配。如“italic”关键字可以匹配家族中标有“italic”或“oblique”的字体。如果没有这样的字体，则匹配失败。
   3. 根据 font-variant 匹配。如果此项失败，不会影响继续匹配。
   4. 根据 font-weight 匹配。必定成功。
   5. 根据 font-size 匹配。必定成功。
3. 如果字体匹配成功，但是某字形匹配失败——比如英文字体中通常不包括中文字符——那么将此字形继续应用 font-family 中值的当前候选字体向后的匹配（返回步骤2）。
4. 如果没有从 font-family 的值中找到候选字体，则使用浏览器默认字体。

关于字体，我会再写一篇《前端字体技术进阶》，不过最近要开始准备找工作啦，估计得咕一阵子...大家阔以先康康我的这篇[《关于标点的那些事儿》](http://www.lionad.art/articles/flow/关于标点的那些事儿.html)

### 字体属性使用建议

这里有一些我在项目实践过程中总结的几点建议：

<details>
    <summary>不使用 font-size: larger | smaller</summary>
    <ul>
        <li>相对值不仅改变字体大小没有统一的标准（在我的浏览器中，larger 字体大小要比父元素大 1.2 倍），但是在其它浏览器中不一定是 1.2 倍；同时，它会改变行高（我没有得出改变行高具体的规律）。下段有两个字体大小为 50px 的“字”。右侧哪一个应用了 font-size: larger。黑色边框代表字宽，字宽宽度就是字体大小。你可以尝试用鼠标选中两个字，对比它们的行高及字宽。</li>
        <li><p class="ls0" style="font-size: 50px"><span class="b1">字</span><span class="b1" style="margin-left: 8px;font-size: larger">字</span></p></li>
    </ul>
</details>

<details>
    <summary>慎用 font-size: &lt;percent-value&gt; </summary>
    <ul>
        <li>主要考虑三点：浏览器会对字体大小的小数点取整（在我的浏览器中取整小数点后两位）；嵌套层数过多会导致字体大小迅速膨胀或缩小（见例1，增量为 1.35）；通常浏览器有最小字号限制（见例2，增量为 0.68）。</li>
        <li>
            <p class="ls0" style="font-size: 18px">
                <span class="b1">字</span><span style="margin-left: 8px; font-size: 135%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 135%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 135%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 135%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 135%;"><span class="b1">字</span></span></span></span></span></span>
            </p>
        </li>
        <li>
            <p class="ls0" style="font-size: 30px">
                <span class="b1">字</span><span style="margin-left: 8px; font-size: 68%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 68%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 68%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 68%;"><span class="b1">字</span><span style="margin-left: 8px; font-size: 68%;"><span class="b1">字</span></span></span></span></span></span>
            </p>
        </li>
    </ul>
</details>

## 实践

### CSS管理

关于“如何在项目中管理CSS”的话题够写一本书了。这里简要介绍一下在我博客项目中采用的一种组织 CSS 的方法——ITCSS。

平常我们写 CSS 可能会碰到以下问题：

* CSS 的组织结构很松散，可以按页面组织，也同时可以按组件组织
* 不良的组织习惯导致页面样式的继承很凌乱
* 凌乱的继承引来更多的选择器特殊性问题
* ...

其实这一切都是 CSS 本身的特征导致的问题，CSS 本身是弱逻辑的，“装饰性”的，这注定了一般情况下我们不会重视它——没有文档、没有质量保证机制——所以写 CSS 时常常陷入“用新的样式去覆盖旧的样式”的怪圈（对，往 index.css 文件尾部添加一个带有 !important 声明的选择器）。而遵守 ITCSS 理论能够约束我们的行为，它是由 csswizardry 提倡的一种用来组织与管理项目中的样式文件的体系结构，一种元框架，或是一种 CSS 设计方法论。

ITCSS（Inverted Triangle CSS） 的名字很形象，这和它的核心概念有关，它通过规范样式文件的组织结构来适应项目中特殊性不断增加的选择器们，见以下倒立的三角形：

![ITCSS（Inverted Triangle CSS）](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200628214218.png)

* Settings：Global variables、Config switches
* Tools：Mixins、Functions
* Generic：Ground-zero styles（Normalize.css，resets.css）
* Base：Unclassed HTML elements（Type selectors）
* Objects：Cosmetic-free design patterns
* Components：Designed components
* Trumps：Helpers、Overrides

实践理论将带来的好处显而易见：层级自上而下，选择器影响的 DOM 数量也越来越少，同时选择器特殊性递增。修改某个样式时我们可以轻易从相关组织文件中做出修改，而不影响其它样式，或是导致 CSS 样式继承的崩塌。

一个使用 ITCSS 组织的项目，其 index.css 可能长这个样子：

![ITCSS index.css](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200628215447.png)

### 命名方案

**CSS 命名方案解决的主要是命名冲突和复用两个问题。**这里简单总结几种较常用的，集中了解以下，方便以后直接选坑往里面跳。

* CSS Module
* tailwind
* BEM
* OOCSS
* Atomic css

## 问题

### 居中方案

CSS 居中往往是新手们抱怨的问题。下面，我们分别探讨**水平居中**、**垂直居中**和**水平且垂直居中**三种常见问题。

#### 水平居中

<details>
    <summary>行内级元素（如 Inline，Inline Block）</summary>
    <ul>
        <li>可以在父元素上使用 Text Align: Center</li>
        <li>
            <div class="bg-gray" style="padding: 10px; text-align: center">
                Anonymous Box & <span>Inline</span> & <button class="no-outline" >Inline Block</button>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>单个块级元素（如 Block）</summary>
    <ul>
        <li>如果块级元素没有设置 Width，那么它会充满父容器，也算是一种“居中”吧</li>
        <li>若固定了 Width，那么可以通过给 Margin Left 和 Margin Right 设置 Auto 值，那么 Margin 会自动填充满“能填充的部分”</li>
        <li>
            <div class="bg-gray" style="padding: 10px;">
                <div style="margin: auto; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">
                    Block
                </div>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>多个块级元素</summary>
    <ul>
        <li>一般来说，可以改变块级元素的 Display，改为 Inline Block，于是我们又可以通过 Text Align 居中了</li>
        <li>
            <div class="bg-gray" style="padding: 10px; text-align: center">
                <div style="display: inline-block; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="display: inline-block; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </li>
        <li>更简单（同时省心）的做法是，使用 Flex 布局，通过调整主轴方向上元素的对齐方式进行居中。同时，还可以给父容器设置 Margin 或是给子项设置 Margin，以作更详细的调整。请关注以下例子，展示了不同的对齐方式带来的不同的对齐效果。</li>
        <li>
            Justify Content: Center
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: center;">
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="margin-left: 8px; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </li>
        <li>
            Justify Content: Space Evenly
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: Space-Evenly;">
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </li>
        <li>
            Justify Content: Space Around
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: Space-Around;">
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </li>
        <li>
            Justify Content: Space Between
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: Space-Between;">
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </li>
    </ul>
</details>

#### 垂直居中

<details>
    <summary>单行行内级元素</summary>
    <ul>
        <li>几乎所有人都会认为将 Line Height 设置为和父元素 Height 等同就能达到居中，其实这是一种不准确的说法，通过设置 Line Height 可以达到“<em>近似</em>居中”的效果，能满足一般的业务场景。为方便写作，以下都作“居中”。</li>
        <li>
            <div class="bg-gray oh nowrap" style="padding: 10px; height: 45px; line-height: 45px;">
                单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </li>
        <li>当父容器上下 Padding 相同时，也能达到居中效果（PS：会受到多种因素影响，见下第二例）。</li>
        <li>
            <div class="bg-gray oh nowrap" style="padding: 30px 10px;">
                单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </li>
        <li>
            <div class="bg-gray oh nowrap" style="padding: 0px 10px; font-size: 14px;">Small Font & 3px Padding：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></div>
        </li>
        <li>Flex 最终还是来了... 把主轴方向改为 Column，并调整子项在主轴方向的对齐位置就行。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: center; flex-direction: column; height: 150px;">
                <p class="m0">Small Font & 3px Padding：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></p>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>多行行内级元素</summary>
    <ul>
        <li>Em~ 设置 Padding 真香~</li>
        <li>
            <div class="bg-gray" style="padding: 40px 10px;">
                多行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </li>
        <li>Table Cell 配合 Vertical Align 可以达到垂直居中效果，但是需要改变 Display。这种方法并不在实践中被推荐，了解即可。</li>
        <li>
            <div class="bg-gray" style="padding: 10px;">
                <div style="display: table; height: 280px;">
                    <p class="vm" style="display: table-cell;">多行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> 多行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> 多行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></p>
                </div>
            </div>
        </li>
        <li>多行行内级元素也可以使用 Flex 垂直居中。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: center; flex-direction: column; height: 280px;">
                <p class="m0">垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></p>
            </div>
        </li>
        <li>有一种出乎意料的方法：给父容器设置一个高度为 100% 的 Inline Block 伪元素，并同时给伪元素和内容设置 Vertical Align: Middle 就可以垂直居中了。</li>
        <li>
            <div class="bg-gray ghost-center" style="padding: 10px; height: 280px;">
                <p class="dib m0 vm">垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span> Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></p>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>块级元素</summary>
    <ul>
        <li>如果知道元素高度的话，可以使用 Margin 垂直居中。具体实现有多种方法。假设父级高 100px，子项高 50px 见下例。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="b1 p010 h50" style="margin-top: 25px; height: 50px; line-height: 48px;">Margin Top: 25px</div>
            </div>
        </li>
        <li>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="pr b1 p010 h50" style="top: 50%; margin-top: -25px; height: 50px; line-height: 48px;">Top: 50% & Margin Top: -25px</div>
            </div>
        </li>
        <li>若元素高度未知的话，可以使用 TranslateY 垂直居中。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="pr b1 p010 h50" style="top: 50%; transform: translateY(-50%); height: 50px; line-height: 48px;">Top: 50% & TranslateY: -50%</div>
            </div>
        </li>
        <li>使用 Flex 布局最省心了。例子参见行内元素垂直居中。</li>
    </ul>
</details>

#### 水平且垂直居中

<details>
    <summary>其实水平且垂直居中，无非就是上两种方案的整合版本。</summary>
    <ul>
        <li>如果知道子项的宽度和高度，请不要疑惑，使用 Margin 就行。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="bb b1 p010 h50 tac" style="margin-top: 25px; margin-left: 25%; width: 50%; height: 50px; line-height: 48px;">Block & Margin</div>
            </div>
        </li>
        <li>如果子项宽度和高度未知，Translate 能解决问题。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; height: 100px;">
                <div class="bb pr b1 p010 h50 tac" style="transform: translate(-50%,-50%); top: 50%; left: 50%; width: 50%; height: 50px; line-height: 48px;">Block & Translate</div>
            </div>
        </li>
        <li>你当然可以选择 Flex 布局</li>
        <li>
            <div class="bg-gray flex-cc" style="padding: 10px; height: 100px;">
                <div style="width: 50%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Flex is God</div>
            </div>
        </li>
        <li>Grid 布局，略有兼容性问题，但是会成为今后的二维布局最佳解决方案。</li>
        <li>
            <div class="bg-gray grid" style="padding: 10px; height: 100px;">
                <div style="margin: auto; width: 50%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Grid is God</div>
            </div>
        </li>
    </ul>
</details>

#### 结论

总的来说，在不需要考虑兼容性的环境使用 Grid 布局，可以完美规避居中问题，因为使用 Grid 布局往往意味着你的网站页面排版已经定型。如果不能使用 Grid，那么局部使用 Flex 布局是非常省心的做法。

若需要考虑兼容性，那么用回 Margin 吧，Margin: Auto 会成为你的好助手。

### 多行文本截断

<details>
    <summary>使用 Line Clamp 属性</summary>
    <ul>
        <li>使用 -webkit-line-clamp 属性可以指定块容器内容的行数，同时容器需要设置 display: -webkit-box | -webkit-inline-box 且 -webkit-box-orient: vertical</li>
        <li>
            <div class="bg-gray elipsis-2">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
        </li>
        <li>需要注意的是，如果设置了上下的 Padding 值，这是一种未定义情况。</li>
        <li>
            <div class="bg-gray p010 elipsis-2">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
            <img class="mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200624114500.png">
        </li>
        <li>如果需要解决 Padding 问题，可以将 Padding 换成透明 Border，或者使用父容器来控制 Padding 等方法（见下例）。</li>
        <li>
            <div class="bg-gray p10">
                <p class="m0 elipsis-2" >Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline</p>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>模拟截断</summary>
    <ul>
        <li>使用 -webkit-line-clamp 属性可以指定块容器内容的行数，同时容器需要设置 display: -webkit-box | -webkit-inline-box 且 -webkit-box-orient: vertical</li>
        <li>
            <div class="p010 bg-gray elipsis-h-2" style="--line-height: 1.85; --bg-color: var(--light-gray); --dot-color: #bbb;">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
        </li>
    </ul>
</details>



### 易混淆的点

<details>
    <summary>2秒内回答：Pixel（px）是相对长度单位还是绝对长度单位？</summary>
    <ul>
        <li>相对长度单位，因为 Pixel 的大小取决于显示设备。</li>
    </ul>
</details>

<details>
    <summary>display: none 与 visibility: hidden 的区别</summary>
    <ul>
        <li>含有前者属性元素不占据任何空间；而含有后者属性的元素占据的空间将被保留。</li>
        <li>前者会使元素的 Transition 过渡效果失效。</li>
        <li>前者会使元素及其后代全部隐藏；后者具有继承性，子代会保持 hidden 的状态，但也可以单独设置为 visibility: visible 进行显示。</li>
    </ul>
</details>

<details>
    <summary>letter-spacing 与 word-spacing 的区别</summary>
    <ul>
        <li>前者指字母之间的间隔；后者指空格的额外大小。</li>
        <li>word-spacing 非常适合用来调整中英文混合时的排版间隙，无需修改元素的 Margin 值，见下例：</li>
        <li><img class="vm b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/CUFmqr7DAI.gif" /></li>
    </ul>
</details>

<details>
    <summary>vertical-align 默认对齐哪里？</summary>
    <ul>
        <li>vertical-align 必须在内联元素中才能起作用，默认值是 baseline，将对齐父元素的基线，即字母x的底端。</li>
    </ul>
</details>

## 阅读更多

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误也麻烦各位评论指出。若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=

所有的文章和源码都会汇总到我的[博客项目](https://github.com/Lionad-Morotar/blogs)，欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](http://www.lionad.art)，排版绝佳 Nice 哦~

* [《CSS权威指南》](https://book.douban.com/subject/2308234/)
* [CSS-The-Definitive-Guide-4th-zh](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld)
* [《CSS世界》](https://www.cssworld.cn/)
* [MDN 视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)
* [为什么你们就是不能加个空格呢？](https://sspai.com/post/33549)
* [Managing CSS Projects with ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss)
* [2019年，是否可以抛弃 CSS 预处理器？](https://juejin.im/post/5dcbb766f265da4d3e174f6d)
* [一些解决 CSS 命名的方案](https://juejin.im/post/5ec8d82f6fb9a047ce7c47b6)