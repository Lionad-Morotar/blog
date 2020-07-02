# 面试复习

## CSS

<details open>
    <summary>聊一聊选择器的优先级？</summary>
    <p>
        这个都比较熟悉了，重要性声明 > 内联样式 > ID 选择器 > 类选择器、伪类选择器 > 标签选择器、元素选择器。
        有一点很多人都会忽略的是，通配符虽然不增加优先级，但是通配符的优先级要高于继承。随意增改通配符容易污染同事的代码。
    </p>
</details>

<details open>
    <summary>什么是盒模型？</summary>
    <p>
        盒模型是页面布局过程中将元素转换为盒子时应用的布局模型。
        理论上有四种盒模型，Margin Box、Border Box、Padding Box 和 Content Box，但目前只能通过 Box Sizing 属性设置 Content Box 和 Border Box，分别指 W3C 标准盒模型和 IE 盒模型。
    </p>
</details>

<details open>
    <summary>什么是 BFC？</summary>
    <p>
        块级格式化上下文，是页面上的一个独立渲染、不影响外界元素的区域。
        有三个比较重要的特性是：BFC 不会影响外界，所以不和外界的 Float 及元素的 Margin 重叠。在 BFC 内部，相邻块级元素的垂直 Margin 会重叠。计算 BFC 的高度时，内容的浮动元素也会参与计算；
        所以可以应用到：清除浮动、自适应布局、防止和外界 Margin 重叠、防止被 Float 遮盖。
        触发条件有：绝对定位、固定定位、Display 为 InlineBlock 的元素、浮动元素、Overflow 为 Hidden 或 Scroll；CSS 3 中还新增了一种 Display：FlowRoot 也可以触发。
    </p>
</details>

<details open>
    <summary>怎样清除浮动？</summary>
    <p>
        一般有两种思路：通过新增标签或者伪元素，并应用 Clear 属性；触发父元素 BFC，就比如设置 Overflow，设置 Display InlineBlock，绝对定位，固定定位，浮动之类的方法。
    </p>
</details>

<details open>
    <summary>关于层叠上下文，你大致了解什么？</summary>
    <p>
        层叠上下文是指元素在一定条件下提升为一个特殊的图层，在 Z 轴的方向上比普通元素靠近用户，并且在同一个图层内会由 ZIndex 属性在 Z 轴方向进行排序。
        触发条件有：根元素、Position、Transform、Opacity、Filter 等。
        同一图层的层叠等级以越靠近用户排序有：Background，-ZIndex，块级元素，浮动元素，内联元素，ZIndex 0，ZIndex 正值越大越靠近。
    </p>
</details>

<details open>
    <summary>聊一聊 CSS 预处理器？</summary>
    <p>
        预处理是指通过编译工具将特定语言转为 CSS 文件。预处理器不能给 CSS 本身带来更高级的特性，但是可以增强语法。
        一般会用到嵌套、变量、Mixin、函数、内置函数之类的功能。
        结合后处理器，可以做 Tree Shaking、Code Zip、单位换算、浏览器兼容补全等用处。
    </p>
</details>

<details open>
    <summary>玩过哪些好玩的东西？</summary>
    <p>
        纯粹玩儿的话，以前喜欢些 Background Pattern，接触过 CSS Doodle，不过因为 CSS 是弱逻辑的，后来就改用 P5 了。
        还了解过一些 CSS 方法论，但是实践的机会比较有限。
    </p>
</details>

