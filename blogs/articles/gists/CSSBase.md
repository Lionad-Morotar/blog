# CSS Mind Map

[TOC]

## 盒模型

盒模型描述了通过文档树中的元素生成以及根据视觉格式化模型布局的矩形盒子。CSS 使用“流”的概念进行自上而下，从左至右（默认）的布局，Box 是基础的渲染单位，代表了元素的展现方式，以及它们同周围元素的相互作用。渲染时，所有元素都会依据盒模型来判定其大小，位置以及属性。

### 简单盒模型

通过这行代码，你可以一览页面上的盒子：

```js
$$('*').map(x => x.style.border = '1px solid')
```

![在仿生狮子的博客中使用上一段代码](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/browser_06_22_022.jpg)

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

## VFM

<abbr title="Visual Formatting Model">VFM</abbr>，即 Visual Formatting Model，决定了如何将简单盒模型转化为 Box。布局由以下因素决定：

* **盒子尺寸**
* **盒子类型**，行内盒子（inline），行内级盒子（inline-level），原子行内盒子（atomic inline-level），块盒子（block）
* **定位方案**，普通流定位，浮动定位或是绝对定位
* **子元素或兄弟元素**
* **Viewport尺寸及位置**
* **内在尺寸**，如果是替换元素的话，需要考虑元素的内在尺寸

### 盒子的生成

通常我们只讨论块盒子、行内盒子和行盒子，VFM 会根据包含块（包含其它盒子的盒子）的边界来渲染盒子，但也可能布局溢出（Overflow）。

**块盒子**

块级元素是类似于 Display 属性为 Block、List Item、Table 的元素。每个块级元素都会被格式化为块级盒子，而每个块级盒子都会参与 BFC 的创建。

容易混淆的是，每个块级盒子可能是一个块容器盒子。块容器盒子是指，要么只包含其它块级盒子，要么只包含其它行内盒子并创建 IFC。

MDN 上如此描述：

> 块级盒子与块容器盒子，前者描述了元素与其父元素和兄弟元素之间的行为，而后者描述了元素跟其后代之间的行为。**只有同时是块级盒子与块容器盒子，才是块盒子。**

**行内盒子**

类似块级元素，如果一个元素 Display 属性为 Inline、Inline Block、Inline Table，该元素是行内级元素。行内级元素会生成行内级盒子，该盒子会参与 IFC 的创建。而行内盒子不仅是行内级盒子，它还表示其内容会影响该盒子的 IFC。不影响 IFC 的则成为 Atomic Inline Box。

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

## 阅读更多

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误也麻烦各位评论指出。若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=

所有的 HTML、CSS、JS 都会汇总到我的[博客](https://github.com/Lionad-Morotar/blogs)项目，所有效果及组件都可以导出源码。欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](http://www.lionad.art)，排版绝佳 Nice 哦~。

* [MDN 视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)