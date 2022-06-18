# 🎉 CSS Mind Map

[TOC]

<JJ>
<p>虽说实际编程水平是才最重要的，但是夯实基础，才能走得更远。仿生狮子最近在准备面试，这个礼拜看了一堆 CSS 相关的内容。整理了数十万字资料后，给你带来这些 CSS 知识点分享。</p>
<p>阅读本文（<del>收藏本文</del>）你将串联以下关键词：</p>
<ul>
    <li>选择器：特殊性、继承、级联</li>
    <li>布局基础：元素、盒模型、BFC、IFC、FFC、浮动及应对方法</li>
    <li>字体应用：浏览器如何查找与应用字体</li>
    <li>方法论：ITCSS、常见命名方案</li>
    <li>常见问题：居中方案（垂直、水平、水平且垂直）、多行文本截断</li>
    <li>调试技巧：打印、渲染、标尺</li>
</ul>
</JJ>

世界宽广而宏大，我们的知识只是汪洋里的一叶扁舟。组织语言，用博客和书本输出内容，自然受到语言这种媒介的限制。尽管经过悉心整理，线性的文字不可能把每一个知识点都结网一般从头到尾串联起来。要是大家能灵活使用搜索引擎，遨游互联网，突破平面的限制，构建自己的知识骨架，那是再好不过。文中内容比较基础，大部分内容扫一下就阔，如果一点儿印象也没的，还是要看看文档详细了解，最好编码实践一下——写代码和玩乐器一样，都属于动态学习的范畴，也就是说，**边学边实践能更容易地将概念融会贯通**。

![知识的理解](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628235858.png)

## 概念辨析

我曾因在掘金某篇文章评论区看到有位老哥因为看不懂文章中讲述的概念而觉得“（文章）写的乱七八糟，不清不楚”，觉得很是心酸。对知识的深入了解不能抛开概念不谈，这和对概念的理解或是编码实操的能力是不同的。它们相互补充的，对学习也有所帮助。不要因为看了代码就不敲代码了，也不要因为能敲代码就不去了解概念了。这里提一些比较重要的 CSS 技术名词（或概念），做个开头吧。

- 规则&规则集

<abbr title="rule">**规则**</abbr>，由<abbr title="property">**属性**</abbr>和<abbr title="value">**值**</abbr>组成的<abbr title="declaration">**声明**</abbr>、声明与括号形成的<abbr title="declaration block">**声明块**</abbr>再加上<abbr title="selector">**选择器**</abbr>组成，而一条或多条规则组合成了<abbr title="rule sets">**规则集**</abbr>。

![规则&规则集](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200625022018.png)

- 元素（Elements）

元素是用来组织文档结构的基础，比如 p、span 等。每个元素都会对文档的表现起一定作用，每个元素都会在浏览器中以矩形盒子的形式出现。

尽管不能直接查看页面上的盒子的外边界，但你可以打开控制台，输入这行代码，给页面上所有的元素设置边框样式，一览其排列：

```js
$$('*').map(x => (x.style.border = '1px solid'))
```

![页面上的盒子](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/browser_06_22_022.jpg)

- **块级元素**（Block-level elements）与**内联元素**（Inline-level elements）

类似 div、ul、p、h1 这些都是块级元素。一般来说，块级元素会生成一个默认填满父容器的内容区域。其后的兄弟元素将会被“换行显示”；内联元素会在一个文本行中生成元素框，它不会打断这行文本。内联元素常也译为“行内级元素”，在一些文章中，也被称为“行内元素”。

- **替换元素**（Replaced elements）与**非替换元素**（Nonreplaced elements）

除了如 img、input、iframe 等元素，大多数元素都是非替换元素。替换元素的内容区域会被替换为其指向的外部对象。比如，如果 img 元素不带 src 属性的话，它不指向任何内容，在文档中没有意义，也就不是替换元素；如果 img 的 src 链接了外部图片，那么它的内容区域将被图片替换，此时就是替换元素。

- 元素的**内在盒子**（Inner Display Type）与**外在盒子**（Outer Display Type）

元素会依据其 Display 类型参与布局。主要取决于两种特征：内在盒子 和 外在盒子。内在盒子通常也称作“容器盒子”，和外在盒子相比，**前者描述了元素跟其后代之间的行为，而后者描述了元素与其父元素和兄弟元素之间的行为。**

- Display: block 的盒子由外在块级盒子和内在块级容器盒子组成
- Display: inline-block 的盒子由外在内联盒子和内在块级容器盒子组成
- Display: inline 的盒子由外在内联盒子和内在内联盒子组成

## 选择器

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
        <li><dt>:empty</dt></li>
        <li><dt>:target</dt></li>
        <li><dt>:focus</dt></li>
        <li><dt>:is、:not</dt></li>
        <li><dt>:link、:visited、:hover、:active</dt></li>
        <li><dt>::first-letter、::first-line</dt></li>
        <li><dt>::after、::before</dt></li>
        <li><dt>::selection</dt></li>
    </ul>
</details>

### 伪元素与伪类

伪类和伪元素在选择器中用一个冒号还是两个冒号连接？它们有什么区别呢？... 这里提到了伪类和伪元素，分享一下我的理解思路，我觉得还是蛮好使的：

- **伪类表示元素的一种状态**，如激活状态（:active）。同一个元素，多个状态之间可以并存，如激活悬浮状态（:active:hover）。为什么 :hover、:focus 等和用户操作相关的状态也是伪类呢？因为用户操作导致元素状态改变。

- **伪元素表示通过选取 DOM Tree 中不存在的元素**，进行样式修改。如首字母（::first-letter）。

前阵子看一篇文章，有一位老哥觉得在 HTML 中给空列表加一个“空”的占位不好，导致“布局混乱信息难懂”，所以可以使用 :empty 伪类把占位逻辑往 CSS 转移的：

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

这只能体现 CSS 的可能性，但在项目中运用则是一种错误的做法。比如，如果考虑项目后期要做国际化，那么写在 CSS 中这些内容的可维护性就非常差了。CSS 是负责样式的语言，**千万别混淆了 CSS 处理样式，JS 处理逻辑这两种不同的思维形式**。

### 特殊性

特殊性（Specificity），又称作：优先级、特异性，即浏览器对应用到同一个元素的同种声明的重视程度。选择器的特殊性由选择器的组成确定。特殊性值表述为 4 个数字组成的统一的部分，如： [0，0，0，0]。比较特殊性值表时，同索引左侧位数较大者特殊性高，如 [1，0，0，0] 大于 [0，99，0，0]

- 重要性声明的特殊性总是胜过非重要性声明（!important 力压群雄）
- 对于行内样式，特殊性值表加：[1，0，0，0]
- 对于 ID 选择器，加：[0，1，0，0]
- 对于类选择器，属性选择器，或是伪类，加：[0，0，1，0]
- 对于标签选择器和伪元素选择器，加：[0，0，0，1]
- 通配选择器、子代选择器、相邻选择器、同胞选择器会给特殊性值表加：[0，0，0，0]（不等同于不增加，这点在后面有辨析）

试着比较一下 `#container .card .card-body a.graph:hover:active`、`#container #card-graph-con a.graph:hover` 这两个个选择器的特殊性吧？

### 继承

我们不必事无巨细地给每一个元素都加上声明，对于某些值，子元素会继承父元素的值。**CSS 世界的诞生就是为图文信息展示服务的**，所以 CSS 中的继承理念很符合我们的直觉。大部分属性如边框、边距、填充等盒子的样式不能继承，而文字相关的如字体、颜色等属性就可以继承。

可继承的属性以下列出：

- 交互样式相关属性：visibility、cursor
- 文字排版相关属性：letter-spacing、word-spacing、white-space、line-height、color、font、 font-\*（font-family、font-size、font-style）、text-\*（text-indent、text-align、text-shadow、text-transform）
- 表格排版相关属性：border-collapse
- 列表排版相关属性：list-style、list-style-type、list-style-position、list-style-image

有一点需要注意的是，text-decoration-\* 属性看起来会被继承，但实则不然：

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

![继承得来的值得特殊性不比 0，0，0，0 要高](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200625025101.png)

此外，《CSS 权威指南》中提到：应用到 body 元素得背景样式可以（向上）传递到 html 元素，相应地可以定义其画布，这点属于继承中的特例。但我没能复现。

### 级联

浏览器会如何应用两个特殊性相等的规则呢？级联（又作：层叠）会给出答案。这里给出一个有关于级联与样式来源的权重的参考，按权重递减排列：

- 用户样式的重要性声明
- 网站样式的重要性声明
- 网站样式的正常声明
- 用户样式的正常声明
- 浏览器的默认样式
- 声明出现在文档中的顺序越后，权重越大

![CSS 级联](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629191257.png)

附：在我的 Yandex 浏览器里已经找不到显式设置用户样式的入口了，我也相信普通用户不会知晓如何设置用户样式的方法，就算知晓也不会去使用——毕竟，[插件](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld)要香一些。

#### LVHT

“LVHT”指的是我们写 CSS 时常使用的“a:link、a:visited、a:hover、a:active”顺序，主要是依靠级联的最后一条规则“声明出现在文档中的顺序越后，权重越大”。

一般来说，我们不会使用“a:active:hover、a:hover:link”等选择器。由于我们总是这四个状态的重要性依次递增，所以推荐“LVHT”顺序，也可以记为“Love&Hate”。

从“LVHT”这个例子可以看出我为什么觉得“级联”是 CSS 最吸引人的地方。级联概念能体现出一种简单但深刻的理念——**设计人员总是希望用户在浏览器中与网页交互得到正确的反馈**，就好比悬浮按钮时有样式反馈，点击按钮时有激活提示——**级联迫使设计人员（开发者）思考“我们能提供什么信息”、“我们鼓励用户做什么**”。

## VFM

VFM，即“Visual Formatting Model”，视觉格式化模型。决定了浏览器如何处理文档树，将元素转化为用户看到的内容。如果对 VFM 不清楚，往往不能理解浏览器中很多看起来怪异（常常被说是“BUG”）的布局表现。其实这些怪异的表现不是“BUG”，只是尽管 VFM 是一种开放而强大的模型，它充满细节，和我们脑海中的布局常识可能不一致；同时，又留有一些规范未覆盖的余地，供浏览器自由发挥。

页面上的布局受到这些因素的影响：

- **盒子尺寸**
- **盒子类型**
- **定位方案**
- **子元素及兄弟元素**
- **Viewport 尺寸及位置**
- **内在尺寸**（如果是替换元素的话，需要考虑元素的内在尺寸，如图片宽度）

### 盒模型

元素根据 VFM 生成矩形盒子时，需要通过盒模型规范盒子的尺寸。

一般情况下，CSS 使用自上而下，从左至右的布局。盒子是其中的最基础的渲染单位，代表了元素的展现方式，以及它们同周围元素的相互作用。渲染时，所有元素都会依据盒模型来判定其大小，位置以及属性。

通常我们会觉得 Width 属性定义了一个元素（块级元素）的宽度，这种说法其实不太准确。Width 定义的是“内容区”的宽度。一般来说，内容区的宽度指下图的 width，

![盒模型](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629193059.png)

![盒模型](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629193138.png)

第一张图是 W3C 标准盒模型，第二张是 IE 盒模型。至于为啥有两种标准，这得追溯回...

> <br/>...很久以前...<br/><br/>
> **IE**：我觉得盒模型应该是这样的，blahblah。<br/>
> **W3C**：明显应该是这样的才对，blahblah。<br/>
> 结果是 IE 在怪异模式下用了「不标准」的盒模型，而标准模式下用了「标准」的盒模型。<br/>
> **围观群众**：听说 IE 的盒模型不标准。<br/><br/>
> ...多年过去...<br/><br/>
> **W3C**：感觉还是 IE 的那个模型比较好。但我们已经回不去了... 算了加个属性支持一下 IE 那种模式吧。<br/>
> <name>顾轶灵</name>

![box-sizing](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/browser_06_21_018.png)

以前写项目的时候，我喜欢使用通配符重置所有元素的 Box Sizing 为 Border Box，这样会使样式编写容易一些，因为 Border Box 包含了 Border 的宽度，这个宽度各符合直觉。不过，有几点可能需要考虑：

- 统配符**可能会**带来样式污染（比如污染页面引入的其它库）
- 统配符**可能会**带来不必要的性能消耗（我没找到关于通配符带来性能消耗的资料，这条观点有些站不住脚）
- 通配符声明的特殊性要比继承的值的特殊性要高，容易引起混淆（这点之前提到过，可以返回去看看之前的“CSS 继承”小节）

《CSS 世界》提到：属性 Box Sizing 发明的初衷可能是用于解决替换元素的宽度自适应的问题。比如输入框的宽度默认情况下的 100% 往往会超过父容器。所以建议这样写样式重置：

```SCSS
input, textarea, img, video, object {
    box-sizing: border-box;
}
```

### 盒子的生成

开篇我们说到类似 div、p 这种元素是块级元素。每一个块级元素都会按照 VFM 生成至少一个主块级盒子（Principle Block-level Box）。说“至少”是因为一些块级元素能生成额外的盒子，如 li 会生成标记盒子（就是列表项前面的那个点点）。除非一个块级盒子是表盒（Table Box）或替换元素的主盒，块级盒子也是一个块容器盒子（Block Container Box）。当一个盒子既是块级盒子，也是块容器盒子时，它也是块盒子（Block Box）。

一个块容器盒子要么只包括块级盒子，要么创建一个 IFC 并只包含内联盒子（行内级盒子）。但他和块级盒子不是包含或被包含的关系，两者不一定等同：

- 一个是表盒（Table Box）或是替换元素的主盒的块级盒子不是一个块容器盒子
- 非替换行内块（None-replaced Inline-level Block）和非替换表格单元格（None-replaced Table Cell）是块容器盒子但不是块级盒子

![Block Box](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200702000624.png)

一个内联元素（Inline-level Elements）不会为内容形成新的块，它的内容只能以“行”的形式布局。每一个内联元素都会生成一个内联盒子，一个内联盒子要么是行内盒子（Inline Box），要么是原子内联盒子（Atomic Inline-level Box）。行内盒子及其内容会直接参与 IFC，而原子内联盒子以“单一不透明盒子”的形式参与 IFC。

![Inline-level Box](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200702004940.png)

<details>
    <summary>原子内联盒子示例</summary>
    <p class="b1 m0 p10" style="resize: horizontal; overflow: auto;">通过 Resizer 改变父元素的宽度，能发现 Inline Block Elements 会像块级元素一样在放不下时整个换行，不像文本一样拆分作多行 <span class="b1 p010" style="display: inline-block">Inline Block Elements</span></p>
</details>

### 盒子的类型

VFM 将元素按照盒子的类型生成盒子，而盒子的类型取决于元素的 Display 属性（和 Float 属性）。

Display 常见的取值有 Block、Inline Block、Inline、Table 等，如果如果元素又应用 float: left | right 声明，Display 属性将会失效。

- display: block，生成一个主块盒子
- display: inline-block，生成一个主内联盒容器（自身按照块盒子进行格式化布局，内容则按照原子内联盒子布局）
- display: inline，生成一个或多个行内盒子
- display: none，自身及内容都会在布局时被移除，不会生成任何盒子
- ...

#### 显示内容类型

显示内容类型是 CSS3 新增的一种玩意儿，一个显示内容类型的元素（display: contents）会在格式化从布局树中将自身移除，但是不同于 display: none，显示内容类型的内容将会得以保留。请联想一下 Vue 内置的 Template 标签，或是 React.Fragment，大概类似那种玩意儿...

需要注意以下几点：

- 盒子不会渲染边界框，这意味着 Margin、Padding、Border 相关属性都将失效。
- 子元素依旧能继承某些属性，这和正常盒子的行为是一致的。
- 盒子依旧存在于文档树中，只是不渲染边界框。而 Vue 中 Template 标签是不渲染的。
- 盒子的 ::before 和 ::after 两个伪元素都将得到保留。

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

#### 外在盒子与内在盒子

想象一下，我们在样式表中编写的 display: inline-block 声明，能使元素在行内显示，而内部布局依旧类似块级元素。它其实是一种省略式写法，可以理解为这条声明只规定了外在盒子显示为 Inline，而内在盒子则会回退为默认值 Block。将这条声明补全则成了 display: inline-block block。

以下是我们常用的简写对应的默认值：

| Short display |  Full display   |
| :-----------: | :-------------: |
|     Block     |   Block Flow    |
|    Inline     |   Inline Flow   |
| Inline Block  | Inline FlowRoot |
|     Flex      |   Block Flex    |

### 定位体系

CSS2.2 的定位方案就三种，普通流定位，浮动定位或是绝对定位。

- **普通流定位**，按普通流的规则排列盒子，Position 属性的值为 static
- **浮动定位**，脱离文档流（Out of Flow），Float 属性的值不为 none
- **绝对定位**，脱离文档流，Position 属性的值为 static | fixed

某些方案中，定位还和盒子的偏移属性（Top、Bottom、Left、Right）有关。

<div class="b1 bg-gray p10">
    Normal Text <span class="pr m10 b1" style="left: 2em; height: 50px; width: 50px;">Relative Left 2EM</span> Normal Text
</div>

在普通流中，盒子默认按从左至右、自上而下的规则排列；可以使用相关属性改变流的方向，下图是阿拉伯使用的搜索引擎主页，见 HTML 元素上定义的 DIR 属性：

![阿拉伯搜索引擎](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629195939.png)

### BFC

布局时，会依据盒子的类型生成 BFC（Block Formatting Context） 或是 IFC（Inline Formatting Context），它们使盒子在界面上形成一个独立的，不影响外界的容器。

最直观的感受肯定是 HTML 元素，即根元素，它是浏览器中最重要的一个独立的不影响外界的容器。根元素会创建 BFC，在一些情况下，其它元素也会。这里有 MDN 的一份创建 BFC 方法的[清单](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)：

- 根元素
- 浮动元素
- 绝对定位元素
- Overflow 不为 Visible 的块级元素
- 行内块元素，弹性元素，网格元素
- 表格单元格，表格标题
- CSS3 中新增了一种 Display: FlowRoot 可以用来创建无副作用的 BFC。

BFC 在布局时，会应用以下规则，需要注意：

- BFC 不会和外部浮动元素重叠。
- BFC 内部的相邻的块级盒子的垂直外边距会折叠。
- 计算 BFC 的高度时，内部浮动的盒子也会参与计算。

<details>
    <summary>BFC 不会和外部浮动元素重叠</summary>
    <ul>
        <li>
            <div class="b1"><div class="b1 bg-gray" style="margin: auto; float:left; height: 100px; width: 100px;">Float</div>DIV</div>
            <div class="dib b1 bg-gray" style="height: 100px; width: 100px;">BFC</div>
        </li>
        <li>可以利用这个特性做一个多列布局</li>
        <li>
            <div class="b1 fl" style="width: 33%; height: 200px;"></div>
            <div class="b1 fr" style="width: 33%; height: 200px;"></div>
            <div class="b1 bg-gray" style="overflow: hidden; height: 200px;"></div>
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

- 内部的盒子一个接着一个地排列，起点是包含块的顶点。
- 如果一行放不下内容，那么会被“拆”开放到下一行。
- 只有水平方向上的 Margin 会在盒子中保留。
- Padding 和 Border 不会撑开行高。

### 浮动

Float 虽然平常用的不多，但是这里单独拎出来康康。原理至少还是要了解的，因为浮动涉及到一些“看起来像 BUG”的问题。

- 父容器塌陷问题

浮动元素，尤其是浮动的图片，很适合用来进行图文混合排版。但是由于脱离了正常文档流，非 BFC 容器不会计算内部浮动元素的高度，所以会引起父容器塌陷的问题。下一小节将会介绍清除浮动的一些办法。

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

#### 清除浮动

有几种常见的解决塌陷问题的方法，记录如下：

- 使用 Clear 属性：
  - 给父容器的伪元素应用 Clear: Both；（推荐）
  - 添加一个额外的标签，应用 Clear: Both；
- 触发父容器的 BFC:
  - 父元素设置 Display: FlowRoot | Flex | Grid；
  - 父元素设置 Overflow: Hidden | Visible；
  - 父元素也浮动；
- 给父元素定高；
- ...（欢迎补充）

### FFC

VFM 概念中除了有 BFC、IFC、TFC（Table Formatting Context），CSS3 中还新增了 FFC（Flex Formatting Context）和 GFC（Grid Formatting Context），因为可扩展讲的内容太多了，这里暂且只简单提一下 FFC。

应用了 display: flex | inline-flex 的元素将会成为 Flex 容器，Flex 容器会创建 FFC 以格式化布局其子项。我们常说的“Flex 布局”，就是指“FFC”。

FFC 是一种非常灵活的一维布局方式（GFC 则是强大的二维布局方式），它使子元素按照主轴方向排列，并可设置不同轴向的对齐方式。

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

FFC 中稍微要注意的地方就是，子元素的 vertical-align、float、clear 属性会失效。

## 文本

Line Height & Vertical Align，先挖坑，以后再跳。想要详细了解的话，可以先康康《CSS 世界》，[链接直达](https://www.cssworld.cn/)。

## 字体

### 浏览器怎样应用字体

假使 CSS 中指定了页面运用的字体，浏览器要怎么查找与匹配它们呢？以下是详细步骤：

1. 创建一个字体属性数据库，包含了机器上所有安装了的字体，及浏览器内置字体。
2. 根据以下步骤查找匹配的字体，某些属性需要完全匹配，某些则允许匹配失败（并应用回退选项）。
   1. 根据 font-family 的值，按逗号分隔，从左至右依次选定一种候选字体家族，继续以下匹配。
   2. 根据 font-style 匹配。如“italic”关键字可以匹配家族中标有“italic”或“oblique”的字体。如果没有这样的字体，则匹配失败。
   3. 根据 font-variant 匹配。如果此项失败，不会影响继续匹配。
   4. 根据 font-weight 匹配。必定成功。
   5. 根据 font-size 匹配。必定成功。
3. 如果字体匹配成功，但是某字形匹配失败——比如在英文字体中找不到中文字符的定义——那么将此字形继续应用 font-family 中值的当前候选字体向后的匹配（返回步骤 2）。
4. 如果没有从 font-family 的值中找到候选字体，则使用浏览器默认字体。

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

也就是定义了一个只包含了引号 Unicode 映射的字体“Quote”，而中文字符或是英文字符在这个字体中找不到对应的映射，则回退至“Noto Serif CJK”中进行匹配。在这篇文章可以康康关于我使用直角引号这件事的起因[《关于标点那些事儿》](https://juejin.im/post/5eedfe25e51d4573c837fad0)。

前阵子看了蛮多字体相关的东西，我会再写一篇《前端字体技术进阶》（挖坑），不过最近要开始准备找工作啦，得咕咕咕一阵子...

### 字体属性使用建议

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

### CSS 管理

关于“如何在项目中管理 CSS”的话题够写一本书了。这里简要介绍一下在我博客项目中采用的一种组织 CSS 的方法——ITCSS。

平常我们写 CSS 可能会碰到以下问题：

- CSS 的组织结构很松散，有时按页面组织，有时按组件组织，有时候还会按文件夹组织（手动狗头）
- 不良的组织习惯导致页面样式的继承很凌乱（调试时沉浸在一堆糨糊中）
- 凌乱的继承引来更多的选择器特殊性问题（Buff：糨糊的粘稠度提高了 68%）
- ...

其实这一切都是 CSS 本身的特征导致的问题，CSS 本身是弱逻辑的，“装饰性”的，这注定了一般情况下我们不会重视它——没有文档、没有质量保证机制——所以写 CSS 时常常陷入“用新的样式去覆盖旧的样式”的怪圈（对，往 index.css 文件尾部添加一个带有 !important 声明的选择器）。而遵守 ITCSS 理论能够约束我们的行为，它是由 csswizardry 提倡的一种用来组织与管理项目中的样式文件的体系结构，一种元框架，或是一种 CSS 设计方法论。

ITCSS（Inverted Triangle CSS） 的名字很形象，这和它的核心概念有关，它通过规范样式文件的组织结构来适应项目中特殊性不断增加的选择器。见以下倒立的三角形，其中每一层都代表一种样式的概念结构：

![ITCSS（Inverted Triangle CSS）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628214218.png)

- Settings：Global variables、Config switches
- Tools：Mixins、Functions
- Generic：Ground-zero styles（Normalize.css，resets.css）
- Base：Unclassed HTML elements（Type selectors）
- Objects：Cosmetic-free design patterns
- Components：Designed components
- Trumps：Helpers、Overrides

实践理论将带来的好处显而易见：层级自上而下，选择器影响的 DOM 数量也越来越少，同时选择器特殊性递增。修改某个样式时我们可以轻易从相关组织文件中做出修改，而不影响其它样式，或是导致 CSS 样式继承的崩塌。

一个使用 ITCSS 组织的项目，其 index.css 可能长这个样子：

![ITCSS index.css](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628215447.png)

### 命名方案

**CSS 命名方案解决的主要是命名冲突和复用两个问题**。这里简单总结几种较常用的，了解一下，方便以后直接选坑往里面跳。

- CSS Module
- Tailwind
- BEM
- OOCSS
- Atomic css

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
        <li>更简单（同时省心）的做法是，使用 Flex 布局，通过调整主轴方向上元素的对齐方式进行居中。同时，还可以给父容器设置 Margin 或是给子项设置 Margin，以作更详细的调整。</li>
        <li>
            <div class="bg-gray" style="padding: 10px; display: flex; justify-content: center;">
                <div style="width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
                <div style="margin-left: 8px; width: 30%; height: 45px; line-height: 45px; text-align: center; border: 1px solid;">Block</div>
            </div>
        </li>
    </ul>
</details>

#### 垂直居中

<details>
    <summary>单行行内级元素</summary>
    <ul>
        <li>将 Line Height 设置为和父元素 Height 等同。注意，精确地说，这是一种“<em>近似</em>居中”，简便起见，以下都作“居中”。</li>
        <li>
            <div class="bg-gray oh nowrap" style="padding: 10px; height: 45px; line-height: 45px;">
                单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </li>
        <li>当父容器上下 Padding 相同时，也能使子元素居中。</li>
        <li>
            <div class="bg-gray oh nowrap" style="padding: 30px 10px;">
                单行垂直居中：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span>
            </div>
        </li>
        <li>Padding 值越来越小时，居中效果越来越不明显。</li>
        <li>
            <div class="bg-gray oh nowrap" style="padding: 0px 10px; font-size: 14px;">Small Font & 3px Padding：Anonymous Box & <span>Inline</span> & <span class="dib">Inline Block</span></div>
        </li>
        <li>Flex... 把主轴方向改为 Column，并调整子项在主轴方向的对齐位置就行。</li>
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
            <div class="vm bg-gray" style="padding: 40px 10px;">
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
        <li>你当然可以选择 Flex 布局。</li>
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
            <div class="bg-gray p010 elipsis-2" style="padding: 30px 10px">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
            <img class="mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629210937.png">
        </li>
        <li>如果需要解决 Padding 问题，可以将 Padding 换成透明 Border，或者使用父容器来控制 Padding 等方法（见下例）。</li>
        <li>
            <div class="bg-gray p10" style="border: 30px solid transparent">
                <p class="m0 elipsis-2" >Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline</p>
            </div>
        </li>
    </ul>
</details>

<details>
    <summary>模拟截断</summary>
    <ul>
        <li>父元素定高，然后设置一个渐变背景的伪元素。</li>
        <li>
            <div class="p010 bg-gray elipsis-h-2" style="--line-height: 1.85; --bg-color: var(--light-gray); --dot-color: #bbb;">
                Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline Anonymous Box & Multiline
            </div>
        </li>
    </ul>
</details>

### 易混淆的点

<details>
    <summary>CSS 大小写敏感吗？</summary>
    <ul>
        <li>除了选择器是大小写敏感的，其它部分不是。</li>
    </ul>
</details>

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
        <li><img class="vm b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/CUFmqr7DAI.gif" /></li>
    </ul>
</details>

<details>
    <summary>vertical-align 默认对齐哪里？</summary>
    <ul>
        <li>vertical-align 必须在内联元素中才能起作用，默认值是 baseline，将对齐父元素的基线，即字母x的底端。</li>
    </ul>
</details>

## 调试技巧

### 打印

我想所有人都知道要怎么预览页面的打印结果，<keyboard>Ctrl + P</keyboard>，等待一段时间，搞定，见下图：

![打印预览](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629213829.png)

不过如果页面复杂的话，就需要等待相当长的时间了... 可以从这几点开始进行优化：

- 通过媒体查询去除无关样式，如侧边栏、导航栏

```SCSS
@media print, speech {
    /* ************************************************************ */
    /* *************************************************** 版面调整 */
    .navbar, .sidebar-mask, .sidebar, .table-of-contents, #valine-vuepress-comment {
        display: none;
    }

    /* **************************************************************** */
    /* *************************************************** 具体元素调整 */
    .page > div.content__default {
        // ...
    }
}
```

- 直接在 Rendering 选项卡中将浏览器的媒体类型改为 Print。这样就可以在页面上可以直接预览打印的页面了。

![浏览器媒体类型](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/LUFiDK36Jo1.gif)

![预览打印](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629215312.png)

### 渲染

Rendering 选项卡还有很多好玩的东西，举个例子：

- FPS Meter，即时查看页面帧率
- Paint Flashing，即时查看页面重绘的区域

![FPS Meter & Paint Flashing](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629220655.png)

还有一些东西就不逐一介绍了，打开 控制台 -> More Tools -> Rendering 可以自己玩玩。

### 标尺

到别人的博客里，我经常会比划比划页面上的元素，看看它们的实现。

通过控制台的 Styles 选项卡能看到元素具体的属性及属性继承关系，不过比较麻烦，不够直观。有时我喜欢用浏览器自带的标尺：

![浏览器标尺](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200629221754.png)

不过，还是插件香——来看看 [Visbug](https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc) 插件的功能，虽然 Visbug 自身也有 Bug，但总比浏览器自带的强多了：

![Visbug Inspect](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/sp20200629_221459_063.png)

![Visbug 标尺](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/sp20200629_221046_051.png)

## 阅读更多

刚学习如何使用 CSS 时，我曾对 CSS 编码时的繁琐感到抵触，认为这是一项不值得一学的语言。这种反感保持了很久，直到近来我对 CSS 进一步了解后，反感才逐渐消散。当知道一门语言是怎么被设计的，身处什么样的时代，要解决什么问题，才能理解它独有的特征。

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误的地方也麻烦各位评论指出。<JJ><p>若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=</p></JJ>

<JJ><p>所有的文章和源码都会汇总到我的[博客项目](https://github.com/Lionad-Morotar/blogs)，欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](www.lionad.art)，排版超 Nice 哦~</p></JJ>

- [《CSS 权威指南》](https://book.douban.com/subject/2308234/)
- [CSS-The-Definitive-Guide-4th-zh](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld)
- [《CSS 世界》](https://www.cssworld.cn/)
- [W3C VFM](https://www.w3.org/TR/CSS22/visuren.html)
- [为什么你们就是不能加个空格呢？](https://sspai.com/post/33549)
- [Managing CSS Projects with ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss)
- [2019 年，是否可以抛弃 CSS 预处理器？](https://juejin.im/post/5dcbb766f265da4d3e174f6d)
- [一些解决 CSS 命名的方案](https://juejin.im/post/5ec8d82f6fb9a047ce7c47b6)

## TODO

Review

- 盒子的生成
