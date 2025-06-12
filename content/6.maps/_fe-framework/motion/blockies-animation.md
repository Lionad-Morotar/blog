---
title: Blockies Animation
description: Designed for performance, ease of use, and seamless integration into any modern project.
---

看到一个有意思的动画库，Blockies Animate（下文简称“BA”）。使用起来比较方便，网页也比较好看，再加上近期它在 Product Hunt 上比较热门，简单介绍一下这个库，以及顺便推荐一些在我收藏夹里吃灰的网站。

![Blockies Animate](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111802921.png)

## 使用方法

使用方法比较简单，其中一些动画基于 Tailwind CSS 的自定义工具类，另一些需要 JS 控制的部分则是组件化的。

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

目前有以下几种动画效果，来看看它的动画列表。有免费动画和付费动画，花20美金一次性购买后可获得永久更新。

![动画效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111811235.png)

### Hover Glow（悬浮发光）

![hover glow](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111812717.png)

悬浮发光效果在网页设计里挺常见的，实现也简单，BA 就是使用了 CSS 的 `::before` 伪元素来实现的，并通过控制透明度来响应鼠标悬浮交互。

```css
background: linear-gradient(45deg, #3b82f6, #8b5cf6);
```

使用渐变的一个弊端可能是在特定的设计稿中，设计师想要的效果和开发实现的结果有差别。在日常的网页里，我们经常看到这种“有差别”的生硬的渐变效果，见 larsenwork 的博客：[Easing Gradients](https://larsenwork.com/easing-gradients/)，介绍了为什么 CSS 阴影会有瑕疵，以及如何通过添加 stops 来创造自然阴影（Nature Gradients）。

![linear gradients VS nature gradients](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111826445.png)

Larsenwork 的内容很久没更新了，CSS 色彩空间在近几年更多地应用到代码实践，而且也对渐变效果有影响，这一点需要注意。

### Morphing（变形）

![变形动画](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111834466.gif)

使用了 border-radius 动画。

![变形动画实现](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111851993.png)

印象里最惊艳的变形还是几年前的知名网站 [species-in-pieces](http://www.species-in-pieces.com)，使用变形动画绘制出许多栩栩如生的濒危物种。在效果上而言，这个网站似乎启发了不少库，但由于实现上的繁琐，一般动画库会选择 border-radius 变形而不是类似 species 网站的 clip-path 动画。有篇博客介绍了 species 网站的实现方式：[@keginx](https://github.com/keginx/species-in-pieces)。

### Shine Cards（闪卡）

![闪卡动画](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506111933546.gif)

BA 的闪卡效果结合了一像素侧光和光影动画，光影动画是一个斜45度的盒子，通过 background 渐变设置高光颜色以及 background-position 动画控制高光位移实现的。

![闪卡动画实现](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121559670.png)

列表里另一种效果 Text Shimmer 也是通过 background-position 动画实现的，效果部分则借助了 background 渐变以及 background-clip: text 实现。

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

可能会出乎意料的是，文字打乱效果也早就能通过纯 CSS 实现，比如下图从特定字符“CSS”变化到特定字符“YES”。

![文字变化效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121624129.gif)

也许这种实现的好处在于，因为能用上 transition 动画曲线等特性，所以能复用 CSS 主题无需通过 JS 传参。实现原理也简单，使用了 counter 函数的第二个参数，将自定义的带动画效果的数值转化为字符显示就行。见下图，将“1”转化为字符后得到了“a”。详细介绍参考：[Animating Number Counters](https://css-tricks.com/animating-number-counters)。

![counter 函数第二个参数](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121620640.png)

### Zoom Effect（放大效果）

鼠标悬浮时放大某个部分的效果。

![放大效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121639073.png)

其实现是一个双层的 DOM 结构，内层是一个完整复制了待放大内容的节点，外层是一个设置了 overflow hidden 的圆。通过计算鼠标在待放大内容的距离偏移量，来设置内外层容器的位置，就可以在鼠标悬浮时显示某个特定区域的放大内容。

![双层节点结构](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121646084.png)

距离偏移量的计算可以画个草图模拟一下。外层圆因为有 overflow hidden，他的 x、y 坐标区间是 `[0 - 圆半径， 待放大内容宽高 - 圆半径]`。内层容器的偏移量只需根据放大倍率乘上鼠标在待放大内容的 x、y 坐标偏移相对其宽高的比例即可，比如当鼠标移到右上角时，内层容器位移如图：

![内层容器位移](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202506121655370.png)
