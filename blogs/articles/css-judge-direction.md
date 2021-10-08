---
meta:
  - name: keywords
    content: CSS,判断方向,判断鼠标位置
  - name: description
    content: 本文介绍了使用CSS判断鼠标进入区域方向的原理，并且在codepen笑脸demo的基础上实现了一个眼睛跟随鼠标位置进行转动的效果。
---

# ❓ 你可以用纯CSS判断鼠标进入的方向吗？

[TOC]

## 升级版 CSS 判断鼠标进入方向

正直的勇者们经历远航，一路横扫除魔，终于来到了魔王（指面试官）所在的石塔。勇者们在石塔前的守夜人陈大鱼头（此处@陈大鱼头）那里接受了一个挑战——用纯 CSS 难度判断鼠标进入盒子的方向。

陈大鱼头：“勇者留步，进入石塔前，请先使用这个挑战练练手吧！”

在给定初始 HTML 结构下，编写代码，完成下图功能：

![ CSS 判断鼠标进入方向](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/56-49.gif)

勇者 A：“害，这还不简单...”

勇者 A 给四个盒子分别定位到上下左右四个方向，并利用其 Hover 状态制作动画，三下五除二[完成了挑战](https://juejin.im/post/5ea8f15ee51d454dc55c8e5b)。

勇者们解决了难题，正痛快着。经过一路试炼（指金三银四中各种轰炸），似乎没有什么能阻挡他讨伐魔王的步伐。他们满怀自信步入石塔内部。

然后，傻眼了。

魔王：“勇者们，没有解决这个难题前，我金身！”。（指勇者们不得不屈服于面试官百般刁难的规则。）

**魔王微微一笑，道：“HTML + CSS，我也不给初始代码了，你想写啥都行，反正实现下面这玩意儿吧”。**

<br>

### 图片效果

![升级版 CSS 判断鼠标进入方向](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/YReNvaaHms.gif)

### 实现

<Article-A200429-Face />

这是一条手动分割线，以下是解析。

<hr>

## 解析

主要思路就是利用选择器将和鼠标产生互动的盒子选择到我们想要触发效果的盒子上，附加动画属性。

不过，经过一番搜索之后，发现现实与理想还是有点差距的。

**CSS 没有父选择器**

我百度出来各种说法，说是父选择器的性能较差，没有浏览器厂商愿意做，所以父级选择器相关标准被推迟了。

不过我相信用一些比较奇怪（♂）的方法，可以伪造一个“父级选择器”出来。

首先想到的是，也许可以某种表单相关的盒子，再结合 CSS 属性选择器，达到选中对应元素的效果，就像是 :checked 选择器那样。结果一番操作后发现，没有能达到要求的这种东西。

表单 Form 元素倒是可以通过当子组件处于 :focus 状态时，标记其自身为 :focus-within 状态。不过有个问题，它不能告诉我们到底是哪个子组件处于 :focus ，这样的话我们就不知道上下左右到底是哪个盒子和鼠标发生了互动。

又经过一番思索及尝试后，我选择了[通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator)（这里不介绍选择器具体作用了，不知道的同学直接点链接去看 MDN）。下面直接讲代码结构。

HTML 如下：

```HTML
<div class="container">
    <!-- 我们需要在此处插入一些盒子，与鼠标互动，然后通过 “~ .head .eye”通用兄弟选择器，就能选中眼睛了 -->
    <div class="head">
        <div class="face">
            <div class="mouth"></div>
            <div class="eye-group">
                <div class="eye eye-left"></div>
                <div class="eye eye-right"></div>
            </div>
        </div>
    </div>
</div>
```

在守夜人陈大鱼头那里，勇者们使用了四个 .block_hoverer 类标签与鼠标交互。

![CSS 判断鼠标进入方向鼠标交互](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/06-47.png)

魔王这里则需要多一些，如下图红色区域，每一个矩形都是一个与鼠标交互的盒子：

![升级版 CSS 判断鼠标进入方向鼠标交互](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/browser_wVOKIx348I.png)

这里我是用绝对定位将盒子“黏贴”到脸上，主要有三个要考虑的地方：

-   如何将盒子定位到圆周上
-   如何确定盒子自身旋转角度
-   如何安排盒子的宽高使得盒子完全覆盖脸的四周

如果盒子本身不旋转的话，会出现这种诡异的情况：

![盒子本身不旋转](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/browser_IuDFxmUd1j.png)

这里使用一个简单的运算去旋转盒子：

```SCSS
// 与鼠标交互的盒子的个数
$part: 72;
// 每个盒子间的夹角
$part-degree: 360 / $part;

@for $i from 1 through $part {
    // 旋转角度这里加了 90deg 的偏移是受到了盒子的定位的影响。
    // 这里可以忽略，我们只要清楚原理是根据循环确定盒子的旋转角度就好了。
    transform: rotate((90 + $i * $part-degree) + unquote('deg'));
}
```

有关第三点“如何安排盒子的宽高使得盒子完全覆盖脸的四周”，则是经验性的东西，各位自己手动调一下盒子宽高，很容易就能整出来。这里要额外提及一下第一点，因为 CSS（SCSS）中是没有正弦余弦函数的，所以不能使用正余弦函数去将盒子定位到圆周上。

**CSS 中是没有正弦余弦函数的，真的么?**

**(→_→)**

好吧，确实没有，但又是一个可以伪造出来的东西...

```SCSS
/** 三角函数相关 */
/** @see 代码来自 http://jimyuan.github.io/blog/2015/02/12/trigonometry-in-sass.html，感谢 */

@function fact($number) {
    $value: 1;
    @if $number>0 {
        @for $i from 1 through $number {
            $value: $value * $i;
        }
    }
    @return $value;
}

@function pow($number, $exp) {
    $value: 1;
    @if $exp>0 {
        @for $i from 1 through $exp {
            $value: $value * $number;
        }
    } @else if $exp < 0 {
        @for $i from 1 through -$exp {
            $value: $value / $number;
        }
    }
    @return $value;
}

@function rad($angle) {
    $unit: unit($angle);
    $unitless: $angle / ($angle * 0 + 1);
    @if $unit==deg {
        $unitless: $unitless / 180 * pi();
    }
    @return $unitless;
}

@function pi() {
    @return 3.14159265359;
}

@function sin($angle) {
    $sin: 0;
    $angle: rad($angle);
    // Iterate a bunch of times.
    @for $i from 0 through 10 {
        $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
    }
    @return $sin;
}

@function cos($angle) {
    $cos: 0;
    $angle: rad($angle);
    // Iterate a bunch of times.
    @for $i from 0 through 10 {
        $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
    }
    @return $cos;
}
```

有了三角函数，再把循环安排上，就可以造出很多东西了：

```SCSS
// 脸的宽度
$face-width: 300;
// 与鼠标交互的盒子的个数
$part: 72;
// 每个盒子间的夹角
$part-degree: 360 / $part;

@for $i from 1 through $part {

    /* 计算出盒子在圆周上的定位。需要注意的是，需要加上外围盒子的宽高及自身宽高对应的一些偏移量。 */
    $angle: ($i / $part) * 2 * 3.1416;
    $x: cos($angle) * $face-width / 2 + 500;
    $y: sin($angle) * $face-width / 2;

    // 熟悉的 :nth-child 选择器。我的上一篇博客已经说到过这玩意儿了，快去看！
    .box_hover:nth-child(#{$i}) {
        left: $x + unquote('px');
        top: $y + unquote('px');
        transform: rotate((90 + $i * $part-degree) + unquote('deg'));

        // 不同的盒子的 :hover 状态，会改变其兄弟 .head 类盒子里的一些东西，这里涉及到眼睛是如何制作的，稍后会说。
        &:hover ~ .head {
            $ty: sin($angle) * $face-width / 50;
            $tx: cos($angle) * $face-width / 50;
            left: calc(50% - #{$tx}px);
            top: calc(50% - #{$ty}px);
            .eye {
                &::after {
                    background-position: 100% 50%;
                    transform: rotate(
                        (0 + $i * $part-degree) + unquote('deg')
                    );
                }
            }
        }
    }
}
```

那么最后提及一下眼睛的制作。

最先想到的方案肯定是用绝对定位，然后 hover 不同的盒子时，给眼睛设置不同的 left、top 值。

<del>但是这个方案不可行，因为一旦给眼睛加上动画之后，一旦鼠标移动地很快，left、top 值的变化是直线，那么眼睛的行动轨迹就会很奇怪（♂）。</del>

但是这个方案不可行，因为我不想写更多的数学了，我还是用回了 rotate 这个迷人的小东西。

当没有 hover 任何盒子时，我们给 .eye 类盒子的中心画一个圆（此时圆在盒子的中心）：

![画一个圆当眼睛](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/browser_nts2mMjO5x.png)

当 hover 了某个盒子之后，我们把 .eye 类盒子旋转一下，并且改变圆的位置（此时圆在盒子的右侧的中心）：

![改变眼睛的位置](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/browser_emdbc2WaD3.png)

这样的话就完成了。

**不要脸求个点赞收藏分享啦。(　 o=^•ェ•)o**

完整的代码贴在下面，各位也可以去我的博客康康具体的实现（掘金个人主页边有个网站的小按钮，<ruby>点那个可以直达<rt>暗示关注</rt></ruby>！）。

## 源码

```HTML
<div class="container">
    <!-- 这行是 VueJS 语法，注意一下 -->
    <div class="circle" v-for="item in 72"></div>
    <div class="shadows"></div>
    <div class="head">
        <div class="face">
            <div class="mouth"></div>
            <div class="eye-group">
                <div class="eye eye-left"></div>
                <div class="eye eye-right"></div>
            </div>
        </div>
    </div>
</div>
```

```SCSS
/** 三角函数 @see http://jimyuan.github.io/blog/2015/02/12/trigonometry-in-sass.html */

@function fact($number) {
    $value: 1;
    @if $number>0 {
        @for $i from 1 through $number {
            $value: $value * $i;
        }
    }
    @return $value;
}

@function pow($number, $exp) {
    $value: 1;
    @if $exp>0 {
        @for $i from 1 through $exp {
            $value: $value * $number;
        }
    } @else if $exp < 0 {
        @for $i from 1 through -$exp {
            $value: $value / $number;
        }
    }
    @return $value;
}

@function rad($angle) {
    $unit: unit($angle);
    $unitless: $angle / ($angle * 0 + 1);
    @if $unit==deg {
        $unitless: $unitless / 180 * pi();
    }
    @return $unitless;
}

@function pi() {
    @return 3.14159265359;
}

@function sin($angle) {
    $sin: 0;
    $angle: rad($angle);
    // Iterate a bunch of times.
    @for $i from 0 through 10 {
        $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
    }
    @return $sin;
}

@function cos($angle) {
    $cos: 0;
    $angle: rad($angle);
    // Iterate a bunch of times.
    @for $i from 0 through 10 {
        $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
    }
    @return $cos;
}

/*********************** 笑脸 */
/* 笑脸我是在 CodePen 里的某个项目基础上改的，地址忘了，汗 */

$container-height: 500;

.container {
    position: relative;
    width: 1000px;
    height: $container-height + unquote('px');
    overflow: hidden;
    background: #feee9d;
}
.container {
    * {
        position: absolute;
    }
    *:not(.circle):before,
    *:not(.circle):after {
        content: '';
        position: absolute;
    }

    $face-width: 300;
    $circle-width: $container-height;

    /** 监听器代码 */

    .circle {
        position: absolute;
        width: 30px;
        height: $circle-width + unquote('px');
        // &:hover {
        //     background: red;
        // }
    }
    $part: 72;
    $part-degree: 360 / $part;
    @for $i from 1 through $part {
        $angle: ($i / $part) * 2 * 3.1416;
        $x: cos($angle) * $face-width / 2 - 5 + 500;
        $y: sin($angle) * $face-width / 2;
        .circle:nth-child(#{$i}) {
            left: $x + unquote('px');
            top: $y + unquote('px');
            transform: rotate((90 + $i * $part-degree) + unquote('deg'));
            &:hover ~ .head {
                $ty: sin($angle) * $face-width / 50;
                $tx: cos($angle) * $face-width / 50;
                left: calc(50% - #{$tx}px);
                top: calc(50% - #{$ty}px);
                .eye {
                    &::after {
                        background-position: 100% 50%;
                        transform: rotate(
                            (0 + $i * $part-degree) + unquote('deg')
                        );
                    }
                }
            }
        }
    }

    /** 样式代码  */

    .shadows,
    .head {
        border-radius: 50%;
        width: $face-width + unquote('px');
        height: $face-width + unquote('px');
        transform: translate(-50%, -50%);
        top: calc(50%);
        left: calc(50%);
        cursor: pointer;
    }
    .shadows {
        background-color: darken(#fbd671, 20%);
    }
    .head {
        background-color: #fbd671;
    }

    .face {
        width: 150px;
        height: 170px;
        top: 75px;
        left: 75px;
    }

    .mouth {
        width: 100%;
        height: 70px;
        bottom: 0;
        background-color: #20184e;
        border: 5px solid #20184e;
        border-radius: 150px 150px 10px 10px;
        overflow: hidden;
        &::after {
            background-color: #f15962;
            width: 100px;
            height: 60px;
            left: 20px;
            top: 40px;
            border-radius: 50%;
        }
    }

    .eye-group {
        top: 10px;
        width: 150px;
        height: 50px;
        .eye {
            width: 40px;
            height: 40px;
            background-color: #20184e;
            border-radius: 50%;
            border: 5px solid #20184e;
            &::after {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: radial-gradient(#fbd671 68%, #20184e 68%);
                background-size: 10px 10px;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                transition: 0.1s;
            }
            &.eye-left {
                left: 15px;
            }
            &.eye-right {
                right: 15px;
            }
        }
    }
}
```

## 后记

昨天我在陈大鱼头的文章下评论了“我可以使用 10x10 的网格系统造一个精准度更高的玩意儿出来”，害，惨。

我原本的想法是想实现一下这样的东西，见下图片（纯 CSS）：

### 效果图

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200429/gETdht0ELi.gif)

### 解析

不过由于 CSS 没有父级选择器，这种实现几乎没什么用，看我的 HTML 结构就知道了。

```HTML
<div class="container">
    <p class="info">盒子外部</p>
    <div class="boxes">
        <div class="box" v-for="item in 5">
            <div class="box-inner">
                <div class="left" />
                <div class="right" />
                <!-- .des 类是图中会变化的那些文字的容器。通过改变其伪元素的 content 改变文字内容。 -->
                <p class="des"></p>
            </div>
        </div>
    </div>
    <p class="info">盒子内部</p>
</div>
```

这样的话限制很大，每一个与鼠标交互的容器底下都得放置一个展现效果的盒子（每一个 .box 类盒子下面都存放有一个单独的 .des 类盒子，.des 类盒子重复了很多次），虽然能实现精准度更高的鼠标进入方向判断，不过带来了很多重复代码，没什么用。

哦对了，本文中这两个例子的 CSS 代码性能都很差，当与鼠标交互的元素增加到 200 个左右开始，我的电脑就开始出现肉眼可见的卡顿了，这玩意儿生产环境是不可能用到的，也就只能应付应付魔王了。

**其实还是很好玩儿的对吧。(●ˇ∀ˇ●) 好玩儿就对了！**

### 实现

<br>

<Article-A200429-Wall />
