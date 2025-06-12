---
title: Blockies Animation
description: Designed for performance, ease of use, and seamless integration into any modern project.
---

最近发现一个有意思的动画库，[Blockies Animate](https://animate.blockiesui.com/)（下文简称“BA”）。这个库使用方便，界面美观，最近还在 Product Hunt 上很受欢迎。下面简单介绍一下这个库，并顺便推荐一些我收藏夹里比较有意思的网站。

![Blockies Animate](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111802921.png)

## 使用方法

BA 支持配置变量，使用方法非常简单。其中有些动画基于 Tailwind CSS 的自定义工具类，另一些则通过 JS 控制实现组件化。

比如，`hover-glow` 效果就是 copy-and-go 类型的工具类：

```css
@layer utilities {
  .hover-glow {
    position: relative;
    transition: all 0.3s ease;
  }
  .hover-glow::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    filter: blur(8px);
  }
  .hover-glow:hover::before {
    opacity: 0.7;
  }
}
```

`Morphing` 动画则是需要组件化传参：

```js
<MorphingAnimation intensity="subtle">
  <span className="text-white font-bold">Subtle</span>
</MorphingAnimation>
```

## 效果实现

目前，BA 提供了多种动画效果，具体可以在动画列表中查看。它包含免费动画和付费动画，付费版一次性购买 20 美元后可享受永久更新。

![动画效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111811235.png)

### Hover Glow（悬浮发光）

![hover glow](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111812717.png)

悬浮发光效果是网页设计中很常见的动画，BA 利用 CSS 的 ::before 伪元素实现，通过调整透明度来响应鼠标悬停。

```css
background: linear-gradient(45deg, #3b82f6, #8b5cf6);
```

使用渐变的一个问题是，在某些设计稿中，设计师期望的效果和最终实现可能存在差异。在实际项目中，我们经常会遇到“生硬”的渐变。推荐阅读 larsenwork 的博客：[Easing Gradients](https://larsenwork.com/easing-gradients/)，介绍了为什么 CSS 阴影会有瑕疵，以及如何通过添加 stops 来创造自然阴影（Nature Gradients）。

![linear gradients VS nature gradients](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111826445.png)

近年来，CSS 色彩空间的实践应用越来越多，对渐变效果也有不小影响，这一点值得关注。

### Morphing（变形）

![变形动画](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111834466.gif)

其实现是通过 border-radius 动画。

![变形动画实现](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111851993.png)

印象里最惊艳的变形还是几年前的知名网站 [species-in-pieces](http://www.species-in-pieces.com)，使用变形动画绘制出许多栩栩如生的濒危物种。在效果上而言，这个网站似乎启发了不少库，但由于实现上的繁琐，一般动画库会选择 border-radius 变形而不是类似 species 网站的 clip-path 动画。有篇博客介绍了 species 网站的实现方式：[@keginx](https://github.com/keginx/species-in-pieces)。

### Shine Cards（闪卡）

![闪卡动画](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111933546.gif)

BA 的闪卡效果结合了一像素侧光和光影动画。光影部分是一个倾斜 45 度的盒子，通过 background 的渐变设置高光颜色，并用 background-position 的动画来控制高光的移动。

![闪卡动画实现](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121559670.png)

列表里的另一种效果 —— Text Shimmer，也是通过 background-position 动画实现。具体做法是结合 background 渐变和 background-clip: text，让文字看起来有流动的光泽。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121636419.gif)

回到闪卡效果，结合 transform、blend-mode、filters 实现带视差效果的全息箔卡片视觉上要完整很多，见[宝可梦闪卡](https://github.com/simeydotme/pokemon-cards-css)。

![宝可梦闪卡](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111927299.png)

### Text Scramble（文字打乱）

![文字打乱效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121607240.gif)

BA 的文字打乱效果使用了 JS 实现，这样能轻松设置更多参数，比如延迟、字符集等。

```js
<TextScrambleHover 
  duration={0.5}
  speed={0.02}
  characterSet="!@#$%^&*()_+-=[]{}|;:,.<>?"
>
  Fast Special Characters Hover
</TextScrambleHover>
```

可能让人意外的是，文字打乱的效果其实早就可以用纯 CSS 实现，比如下图展示了从“CSS”变换到“YES”的过程。

![文字变化效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121624129.gif)

这种实现的好处在于，可以利用 transition 动画曲线等 CSS 特性，实现主题复用，无需用 JS 传递参数。原理也很简单，就是用 counter 函数的第二个参数，将带有动画效果的数字转为字符显示。例如，下图中“1”被转化为字母“a”。详细介绍参考：[Animating Number Counters](https://css-tricks.com/animating-number-counters)。

![counter 函数第二个参数](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121620640.png)

### Zoom Effect（放大效果）

鼠标悬浮时放大某个部分的效果。

![放大效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121639073.png)

这种放大镜效果的实现，是采用了一个双层 DOM 结构：内层是完整复制的内容节点，外层是一个设置了 overflow: hidden 的圆形容器。通过计算鼠标在内容上的偏移量，动态设置内外层容器的位置，就能在鼠标悬浮时显示对应区域的放大效果。

![双层节点结构](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121646084.png)

距离偏移量的计算可以画个草图帮助理解。外层圆因为溢出隐藏，只允许内容在 `[0 - 圆半径，待放大内容宽高 - 圆半径]` 这个范围内移动。内层容器的偏移量，只需根据放大倍数，乘以鼠标在内容区的 x、y 比例坐标即可。比如，当鼠标移到右上角时，对应的位移如下图所示：

![内层容器位移](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121655370.png)
