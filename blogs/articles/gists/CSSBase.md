# CSS Mind Map

[TOC]

## 名词辨析

写代码和玩乐器一样，都属于动态学习的范畴，也就是说，边做边学，容易将概念融会贯通，这样会体会地更加深刻。我在大三下学期刚接触 CSS 时，曾对编码时的繁琐感到抵触，认为这是一项不值得一学的语言。这种反感保持了很久，直到近来我对 CSS 基础知识的深入了解。当知道一门语言是怎么被设计的，身处什么样的时代，要解决什么问题，才能将它独有的特征贯通。现在我会觉得 CSS，属性的层叠就是最吸引人的地方。

我曾在陈大鱼头的某篇 CSS 文章评论区，见到有一个老哥因为看不懂概念而觉得“（文章）写的乱七八糟，不清不楚”，觉得很是心酸。对知识的深入了解不能抛开概念不谈，对概念的理解以及编码实操的理解，是不同的，相互补充的，对学习是有帮助的。

这里提及一些比较重要的 CSS 技术名词（或概念），做个开头吧。

* 规则&规则集

![规则&规则集](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200625022018.png)

* 元素（Element）
  
元素是用来组织文档结构的基础，比如 p、span 等。每个元素都会对文档的表现起一定作用，每个元素都会在浏览器中以框（或盒子）的形式出现。

通过这行代码，你可以一览页面上的盒子：

```js
$$('*').map(x => x.style.border = '1px solid')
```

![页面上的盒子](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/browser_06_22_022.jpg)

* 替换元素与非替换元素

大多数元素都是非替换元素，除了 img、iframe 之类的。img 元素如果不带 src 属性的话，它不指向任何内容，在文档中没有意义。如果带 src 属性，那么它的显示会被指向的图片所替代。

* 块级元素

一般来说，块级元素会生成一个默认填满父容器的内容区域。

* 行内元素

行内元素会在一个文本行中生成元素框，它不会打断这行文本。

## VFM

### 盒模型

盒模型描述了通过文档树中的元素生成以及根据视觉格式化模型布局的矩形盒子。CSS 使用“流”的概念进行自上而下，从左至右（默认）的布局，Box 是基础的渲染单位，代表了元素的展现方式，以及它们同周围元素的相互作用。渲染时，所有元素都会依据盒模型来判定其大小，位置以及属性。

#### 简单盒模型

<abbr title="Visual Formatting Model">VFM</abbr>，决定了如何将简单盒模型转化为 Box。布局由以下因素决定：

* **盒子尺寸**
* **盒子类型**，行内盒子（inline），行内级盒子（inline-level），原子行内盒子（atomic inline-level），块盒子（block）
* **定位方案**，普通流定位，浮动定位或是绝对定位
* **子元素或兄弟元素**
* **Viewport尺寸及位置**
* **内在尺寸**，如果是替换元素的话，需要考虑元素的内在尺寸

通常我们会觉得 Width 属性定义了一个元素（块级元素）的宽度，这种说法其实不太准确。Width 定义的是内容区的宽度。一般来说，内容区的宽度指下图的 width。

![框模型](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200626221013.png)

简单盒模型（又或基础盒模型）在早期 IE 有一种怪异模式下的解析方式，即 Border-Box。围观群众都说 IE 早期的盒模型不遵循标准，但...

> **IE**：我觉得盒模型应该是这样的，blahblah。<br />
> **W3C**：明显应该是这样的才对，blahblah。<br />
> 结果是 IE 在怪异模式下用了「不标准」的盒模型，而标准模式下用了「标准」的盒模型。<br />
> **围观群众**：听说 IE 的盒模型不标准。<br /><br />
> ...多年过去...<br /><br />
> **W3C**：感觉还是 IE 的那个模型比较好。但我们已经回不去了... 算了加个属性支持一下 IE 那种模式吧。<br />
> **[顾轶灵@知乎](https://www.zhihu.com/question/25509268/answer/30949718)**: `box-sizing` 这货就是用来擦屁股的...<br />

对于四种盒尺寸，Content Box，Padding Box，Border Box 和 Margin Box ，Width 属性只作用于 Box Sizing 属性定义的内容区域中。

![box-sizing](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/browser_06_21_018.png)

以前写项目的时候，我喜欢使用通配符重置所有元素的 Box Sizing 为 Border Box，这样会使样式编写容易一些，因为 Border Box 包含了 Border 的宽度，这个宽度各符合认知，更直观些。不过，有两点需要考虑的：

* 统配符往往带来不必要的性能消耗
* 可能带来样式污染（比如污染页面上其它库）

《CSS世界》中还提到，Box Sizing 发明的初衷可能是用于解决替换元素的宽度自适应的问题，比如输入框的宽度默认情况下的 100% 往往会超过父容器。所以样式重置应该这样写：

```CSS
input, textarea, img, video, object { 
    box-sizing: border-box; 
}
```

### 盒子的生成

通常我们只讨论块盒子、行内盒子和行盒子，VFM 会根据包含块（包含其它盒子的盒子）的边界来渲染盒子，但也可能布局溢出（Overflow）。

**块盒子**

块级元素是类似于 Display 属性为 Block、List Item、Table 的元素。每个块级元素都会被格式化为块级盒子，而每个块级盒子都会参与 BFC 的创建。

容易混淆的是，每个块级盒子可能是一个块容器盒子。块容器盒子是指，要么只包含其它块级盒子，要么只包含其它行内盒子并创建 IFC。

MDN 上如此描述：

> 块级盒子与块容器盒子，前者描述了元素与其父元素和兄弟元素之间的行为，而后者描述了元素跟其后代之间的行为。**只有同时是块级盒子与块容器盒子，才是块盒子。**

**行内盒子**

类似块级元素，如果一个元素 Display 属性为 Inline、Inline Block、Inline Table，该元素是行内级元素。行内级元素会生成行内级盒子，该盒子会参与 IFC 的创建。而行内盒子不仅是行内级盒子，它还表示其内容会影响该盒子的 IFC。不影响 IFC 的则成为 Atomic Inline Box。

我们都知道一行长文本会随着父容器宽度的改变而改变其高度，那么这行文本（可能跨越多行）的行框是如何确定的呢？以下是详细步骤：

1. 按一下步骤分别确定各元素行内框的高度：
   1. 取得各行内非替换元素的 font-size 和 line-height 的值，取差值的一半，分别应用到字符框的顶部和底部；
   2. 取得各行内替换元素的 Margin、Padding、Border 值（上和下），相加取和；

line-height 是指文本行基线之间的距离。line-height 的值与体大小之差即为行间距。

**行盒子**

行盒子由 IFC 创建，用来显示一行文本。如果不受浮动元素影响的话，它会占据整个块盒子的宽度。

## 布局

盒子依据 Display 的类型进行布局，主要取决于两种特征：Inner Display Type 和 Outer Display Type。两种特征分别规定了其内容和自身是怎样进行布局的。

我们通常在页面上写的 Display 属性其实是一种省略式写法，比如 Display: Block，它其实只规定了 Outer Display Type 为 Block，而 Inner Display Type 则为默认值。

```js
<display-outside>  = block | inline | run-in
<display-inside>   = flow | flow-root | table | flex | grid | ruby
<display-legacy>   = inline-block | inline-table | inline-flex | inline-grid
```

| Short display |  Full display   |
| :-----------: | :-------------: |
|     Block     |   Block Flow    |
|    Inline     |   Inline Flow   |
| Inline Block  | Inline FlowRoot |
|     Flex      |   Block Flex    |

### BFC

布局时，会依据盒子的类型生成 BFC 或是 IFC，它们是用来使盒子在界面上形成一个独立的，不影响外界的容器，规定了内部内容将会按照正常流程，使用盒模型进行布局。

最直观的感受肯定肯定是 HTML 元素，它是根元素，也是浏览器中最重要的一个独立的不影响外界（因为没有兄弟元素和父级元素）的容器。HTML 会创建 BFC，在一些情况下，其它元素也会。这里有 MDN 的一份创建 BFC 方法的清单：

* 根元素
* 浮动元素
* 绝对定位元素
* Overflow 不为 Visible 的块级元素
* 行内块元素，弹性元素，网格元素
* 表格单元格，表格标题
* CSS3 中新增了一种 Display: FlowRoot 可以用来创建无副作用的 BFC。

在 BFC 中，需要注意以下问题：

* BFC 不会和外部浮动元素重叠。
* BFC 内部的相邻的块级盒子的垂直外边距会折叠。
* 计算 BFC 的高度时，内部浮动的盒子也会参与计算。

### IFC

在 IFC 中，盒子一个接着一个地排列，起点是包含块的顶点。

在 IFC 中，需要注意以下问题：

* 只有水平方向上的 Margin 会在盒子中保留。
* Padding 和 Border 不会撑开行高。

### 浮动

Float 虽然平常用的不多，但是原理还是要清楚的，因为涉及到非常多的“看起来像 BUG”的问题。

一个浮动的元素会脱离正常的文档流，然后依据 Float 属性向左或者向右浮动，直到碰到父容器的边框或者另一个浮动元素的边框为止。浮动元素，尤其是浮动的图片，很适合用来进行图文混合排版。但是由于脱离了正常文档流，非 BFC 容器不会计算内部浮动元素的高度，所以会引起父容器塌陷的问题。

<div class="b1"><div class="b1 bg-gray" style="margin: auto; float:left; height: 200px; width: 200px;" /></div>

<div style="clear: both" />

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
* ...

## 选择器

选择器要展开的内容就太多了，这里简单过一遍基础内容。

### 基础内容

<details>
    <summary>CSS 中有哪些常用的选择器呢？</summary>
    <ul>
        <li><i>ID 选择器</i>（#Container）</li>
        <li><i>类选择器</i>（.Container）</li>
        <li><i>标签选择器</i>（span）</li>
        <li><i>相邻兄弟选择器</i>（br + br）</li>
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

### 伪元素和伪类的区别

这样理解要思路清晰一些：伪类，表示元素的一种状态，如 Focus、Active 等，同一元素多个状态之间可以并存；伪元素，则是通过选择器选取 HTML 不曾在 DOM Tree 中出现过的元素，进行样式修改，如 After、Selection 等，对于同一父元素，只能选取一个同种的伪元素。

### 特殊性

选择器的特殊性（Specificity）由选择器本身的组件确定。特殊性值表述为 4 个部分，如： 0，0，0，0

* 重要性声明的特殊性总是胜过非重要性声明
* 对于行内样式，特殊性值表增加：1，0，0，0
* 对于 ID 选择器，增加：0，1，0，0
* 对于类选择器，属性选择器，或是伪类，增加：0，0，1，0
* 对于元素和伪元素，增加：0，0，0，1
* 通配符和统配选择器会给特殊性值表增加：0，0，0，0（不等于不增加，这点在下一小节有辨析）

### 继承

CSS 中的继承很符合我们的常识，诸如边框、边距、填充等盒子的样式属性不能继承，而文字相关的如字体、颜色等属性就可以继承。

需要额外注意的一点是，**继承得来的值得特殊性不比 0，0，0，0 要高**。假设有以下代码：

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

从最后一条规则“声明出现在文档中的顺序越后，权重越大”，可以扩展到超链接的样式设置。一般来说，超链接有“含链接属性（:link）”、“已访问（:visited）”、“鼠标悬浮（:hover）”、“激活（:active）” 四种状态的伪类可设置。由于我们总是这四个状态的重要性依次递增，所以推荐“LoveHate”顺序，即“Link、Visited、Hover、Active”。

从“LVHT”这个例子可以看出我为什么觉得“层叠”是CSS最吸引人的地方了。层叠概念能体现出一种简单但深刻的知识——**设计人员总是希望用户在浏览器中与网页交互得到正确的反馈**，就好比悬浮按钮时有样式反馈，点击按钮时有激活提示——**层叠迫使设计人员（开发者）思考什么对用户而言是重要的内容，同时，“我们能提供什么信息”、“我们鼓励用户做什么**”。

## 字体与文本

### 浏览器怎样应用字体

1. 创建一个字体属性数据库，包含了机器上安装的所有字体（以及浏览器内置字体）。
2. 根据以下步骤查找匹配的字体，某些属性需要完全匹配，某些则允许匹配失败（并应用回退选项）。
   1. 根据 font-family 的值，按逗号分隔，从左至右依次选定一种候选字体家族，继续以下匹配。
   2. 根据 font-style 匹配。如“italic”关键字可以匹配家族中标有“italic”或“oblique”的字体。如果没有这样的字体，则匹配失败。
   3. 根据 font-variant 匹配。如果此项失败，不会影响继续匹配。
   4. 根据 font-weight 匹配。必定成功。
   5. 根据 font-size 匹配。必定成功。
3. 如果字体匹配成功，但是某字形匹配失败——比如英文字体中通常不包括中文字符——那么将此字形继续应用 font-family 中值的当前候选字体向后的匹配（返回步骤2）。
4. 如果没有从 font-family 的值中找到候选字体，则使用浏览器默认字体。

### 字体属性使用建议

这里有一些我的几点建议：

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
        <li>主要考虑三点：浏览器通常会对字体大小的小数点后两位取整；嵌套层数过多会导致字体大小迅速膨胀（或缩小）；通常浏览器有最小字号限制（见例2）。</li>
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

## 问题&实践

### 居中方案

CSS 居中往往是新手们抱怨的问题。如果对盒模型与布局不清楚的话，很多看起来“可以居中”又实际不能居中的代码常常被认为是“BUG”。其实不然，这需要我们对 CSS 作进一步的了解（详见前几个小节）才能理解 CSS 布局的真正面目。

下面，我们分别探讨**水平居中**、**垂直居中**和**水平且垂直居中**三种常见问题。

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

## 阅读更多

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误也麻烦各位评论指出。若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=

所有的文章和源码都会汇总到我的[博客项目](https://github.com/Lionad-Morotar/blogs)，欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](http://www.lionad.art)，排版绝佳 Nice 哦~。

* [《CSS权威指南》](https://book.douban.com/subject/2308234/)
* [MDN 视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)