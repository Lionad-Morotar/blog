---
meta:
  - name: keywords
    content: CSS,抗锯齿,POAA,字体平滑,图片渲染,FXAA
  - name: description
    content: 传统网页的渲染是基于像素的，所以常出现锯齿。本文简单介绍了锯齿出现的成因，以及CSS中相关锯齿处理的字体平滑、图片渲染属性，并通过实践创造了一种类似FXAA原理的background背景图案抗锯齿技术poaa（pixel-offset-anti-aliasing）。
---

# 💫 CSS 幻术 | 抗锯齿

[TOC]

## 前言

传统网页的呈现是基于像素单位的，所以图片不能和 SVG 一样进行任意尺寸缩放后还保持边缘平整。也就是说，放大像素逻辑的图片，必然导致可视质量下降（信息失真）。所以我们往往会使用技术手段去规避失真，如：

- 使用 SVG 替换位图
- 使用矢量字体（如 TrueType 字体）替换位图字体

如果不得已，被迫进行像素操作，我们也有多种手段用来矫正失真：

- 使用 CSS Image-Rendering 属性调整图像缩放时的采样算法
- 使用 CSS Font-Smoothing 属性平滑字体渲染
- 绘图时使用 Canvas 的抗锯齿 API
- 将元素尺寸放大，然后再使用 Transform 将布局尺寸还原
- 某些特殊情况下，可以使用浏览器硬件加速来平滑锯齿
- <del>将图片模糊处理迫使用户开启钛合金脑放</del>

这篇文章将会简单的提及以上几点，并介绍一种通过 CSS BackgroundImage 抗锯齿的全新思路（我称之为 Pixel-Offset Anti-Aliasing）。要提前说明的是，当下手机的屏幕分辨率已经相当高，同时处理器性能却十分薄弱，这直接导致我们没有在手机端浏览器讨论抗锯齿的必要。本文所述几乎都局限于桌面端的大显示器（我祈祷你不是在用 8K 分辨率的显示器看这篇博客）。

## 抗锯齿及相关技术

### 抗锯齿的形成

信息失真（Aliasing）和图像锯齿不是一码事儿，但是对于游戏玩家来说，几乎可以把两者划上等号。要使用 CSS 抗锯齿，我们不得不先提及锯齿的形成。

**为什么会有锯齿？**

我们的眼睛能对物体的形状进行感知，意识到到一条实际上并不存在的“线条”。见下图，我们能感受到线条，虽然看起来不太平整：

![Aliasing](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Aliasing.png)

下面这幅图中，带箭头的线代表我们感知的线段，其余线段相交的网格代表像素网格。从上图可以发现，只要是带箭头的线经过的地方，就会被黄颜色填充。不过理想中的线段是完美的，它完全平滑的。把不定方向的平滑线段，映射到像素排列的低 DPI 的屏幕上，就会出现信息丢失的情况。像素颗粒越大，信息丢失情况就越严重（以下就简称为锯齿）。

![Aliasing-LineDirection](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Aliasing-LineDirection.png)

**怎么样看起来才没有锯齿？**

这里我画了一张图，可以先仔细观察，然后再站在离显示器稍微远一些的地方**眯起眼睛**看：

![AntiAliasingPaint](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/AntiAliasingPaint.png)

在像素周围，我用黄色涂鸦将丢失的信息稍加补充。图中黄色涂鸦的大小代表了像素透明度。这里有一张抗锯齿的成品图片，可以看处图形的边缘被填充了有透明度的像素：

![AntiAliasingPic](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/AntiAliasingPic.png)

### 常见抗锯齿技术

在音频领域，我们可以通过高质量的播放器和无损音频减少传入耳朵的信息失真。但在游戏领域，普通玩家不可能在家里准备了 8K 显示器。伴随显示器分辨率从 720p 到 1080p 发展的，是几种同样跟随游戏业界发展而成长起来的抗锯齿技术。

- SSAA（Super Sampling Anti-Aliasing）

超级采样抗锯齿，它会把当前画面渲染的分辨率成倍提高，比如 1024×768 的图形开启 2 倍 SSAA 后，显卡实际运算就变成了 2048×1536，这之后，再降采样，将多个像素融合，映射回显示器的单个像素。像素融合能使颜色过渡更自然，看起来没有明显的毛刺。不过，因为硬件的运算增加（指数级），可以想象它会消耗极高的性能。

- MSAA（Multi Sampling Anti-Aliasing）

多重采样抗锯齿，它针对特定缓存区域的数据进行多重采样——可以简单理解为对多边形的边缘进行多重采样。性能消耗较高，但效果也不错。

- FXAA（Fast Approximate Anti-Aliasing）

快速近似抗锯齿，它找到画面中所有图形的边缘并进行平滑处理。尽管很多图形边缘并不对应游戏实际建模的边缘（如材质和纹理），但 FXAA 性能消耗小，性价比高，不失为一种抗锯齿的常用选择。

- DLSS（Deep Learning Super Sampling）

深度学习超级采样，它通过硬件加速的深度学习算法，根据几何、着色、时域多个方面的数据（说人话就是根据过往帧、形状、像素动量等数据）对实时渲染的低分辨率图像重建多倍超级采样结果。相对于传统渲染，不仅能极大提高画质，还能极大提高帧率。

<hr>

## CSS 抗锯齿技术

以下，我们提及几种常见的抗锯齿技术。

### CSS Font-Smoothing

字体平滑属性属于早期的 CSS 规范，后来因为种种原因又被移除了。不过现在仍可以通过前缀属性兼容（如 `-webkit-font-smoothing`）。一般来说，字体平滑有三个值可选，`none`、`subpixel-antialiased`、`antialiased`。值的作用正如其名，分别是无抗锯齿，亚像素级抗锯齿和（全像素）抗锯齿。

一般来说，屏幕上的每一个像素点，都是由三原色条纹（可能如红、绿、蓝三个发光点）组合而成。亚像素级抗锯齿，意味着字体渲染时，将以亚像素（如红光）为单位。不发光的像素显示黑色，其余像素在抗锯齿处理时则会显示暗色，见下图：

![亚像素抗锯齿的小写字母“e”](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/subpixels.jpg)

全像素抗锯齿，则以整颗像素（包含红蓝绿三个条纹）为单位渲染字体。抗锯齿处理时，字体若超出了一个像素的单位，会以一颗与之相邻的透明暗色像素作平滑，见下图：

![抗锯齿后的“后浪”中的“后”字](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/fullpixels.jpg)

“后浪”的“后”字，中间那一横，实际的宽度要小于一个像素，所以也用透明暗色渲染。除了单字，在 [@MAXVOLTAR](http://maxvoltar.com/archive/-WebKit-font-smoothing) 这篇博客，有英文排版的示例图片，以下直接引用了：

- none

  ![font-smooth-none](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/font-smooth-none.png)

- subpixel-antialiased

  ![font-smooth-subpixel](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/font-smooth-subpixel.png)

- antiliasing

  ![font-smooth-antiliasing](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/font-smooth-antiliasing.png)

**那三种值应该如何选择呢？**

我的建议是，仅仅了解渲染机制和呈现方式就行。**像素抗锯齿会使字体呈现稍细，而亚像素级抗锯齿则使字体呈现过粗。黑色背景下则反之**。倒不必因为知道它就必须使用上——这三种方式有各自的优点和缺陷。一般来说，扔掉这个属性，让浏览器自行判断字体渲染的方式就可以了。如果你引入了特殊字体（比如印刷字体）进行平滑处理。（我相信中文的网页版面下，能自由发挥的范围应该很有限。）

附，感兴趣的话，文末我留了相关链接，可以再查阅。

### CSS Image-Rendering

Image-Rendering 属性用于设置图像缩放算法，这个属性有几种常见的值。见下组件：

<Article-A200604-ImageRenderProperty />

可以发现，Pixelated 值设置之后，浏览器不会对边缘进行平滑处理，而 Auto 则对整幅图像进行柔和处理。也就是说，使用 Transform Scale 放大图片，浏览器会应用默认的平滑缩放算法（可能是双线性插值之类的）。

<Article-A200604-ImageRender
    process="scale"
    property="image-rendering"
    src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200319/2020-03-19-15-39-43.png"
    :value="['auto', 'pixelated']"
/>

那可不可以对图片先放大数倍，再缩小还原为实际尺寸呢？以下是试验结果：

<Article-A200604-ImageRender
    process="enlarge-and-shrink"
    property="image-rendering"
    src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200319/2020-03-19-15-39-43.png"
    :compare="true"
    :value="[
        { value: 'auto', title: 'Auto, Normal' }, 
        { value: 'auto', title: 'Auto, Scale(100) Scale(0.01)' }
    ]"
/>

如果你不能运行上面那个组件的话，这里有 GIF 效果：

![Scale](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Scale.gif)

不知道是浏览器对多个 Scale 串联进行了优化，还是使用了某种不损失图像信息的采样算法，总之**不改变图片尺寸又想使用平滑图片是行不通的**。

### 硬件加速抗锯齿

关于使用浏览器的硬件加速抗锯齿功能，是我在试验 PXAA 时的偶得（不过已经有博客介绍过了）。当元素通过 Transform:Rotate 旋转之后，如果此元素是被 GPU 渲染的，那么会应用浏览器对应 GPU 的抗锯齿属性——比方说你用 GTX 1060ti 运行浏览器，那么相关配置就能在英伟达控制面板中找到（不过这有相当程度是我的猜测，待验证）。听起来好像有点复杂，看下面例子就一目了然了：

<Article-A200604-GPU />

如果你不能运行上面那个组件的话，这里有图片效果：

![Rotate&GPU](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Rotate&GPU.gif)

当元素旋转，并应用硬件加速（TranslateZ）之后，渲染出来的边缘会被平滑处理。但是如果**仅仅启用硬件加速或是单使用旋转，不能达到效果**。经过我的测试，在 Windows 端 Chrome 内核的浏览器，这种抗锯齿方式能得到一些体验——你甚至可以通过仅旋转 0.1° 来柔和边缘（虽然不明显）。

CSS 相关的抗锯齿技术就到此为止，下一节开始是新的思路。

## Pixel-Offset Anti-Aliasing

像素偏移抗锯齿（下简称 POAA），这是一种很神奇的方法，貌似网上还没人分享过，不过效果确实挺惊艳的。我不知道具体原理是什么，但是它就是有效（It works!）。这里有两副使用 BackgroundImage 属性绘制的图像，我先展示一下应用 POAA 后的结果吧：

#### 效果展示

<Article-A200604-Offset />

如果上面那些组件不能运行的话，我准备了张 GIF 图片：

![POAA-1](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/POAA-1.gif)

#### 原理

常见的游戏抗锯齿技术是建立在游戏渲染前或后，从模型到光照多个步骤产生的数据的基础上的，所以我们可以根据帧历史的内容、像素动量、提高采样等方法中进行筛选信息并重建画面。但浏览器给用户展现的内容，可以说就是渲染后的东西。我们能够参与浏览器内部渲染的方式貌似几乎没有（以后可能会有 CSS Houdini）。比方说使用 BackgroundImage 绘图展现在你的屏幕上的这些像素，你无法参与渲染改变它们，你也没有办法用预渲染数据告诉浏览器“你应该这样做”。不过好消息是，程序员都是坚信任何问题都能被解决的人，这里我们换种思路。

我想你应该记得开篇我们提及过 FXAA。FXAA 可以简单概括为边缘寻找->重建边缘这两个步骤（并不专业，也许还会有矫正之类的我不清楚）。在[Implementing FXAA](http://blog.simonrodriguez.fr/articles/30-07-2016_implementing_fxaa.html)这篇博客中，解释了 FXAA 具体是如何运作的。对于一个已经被找到的图形边缘，经过 FXAA 处理后会变成这样，见下两幅图：

![RawImage](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/exp1.png)

![After FXAA](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/exp2.png)

给 FXAA 输入源图像，就能通过颜色或对比度确认物体的边缘，并通过改变像素周围的点的透明度，让整体看起来得到平滑。仔细想想，使用 BackgroundImage 绘图时，其实我们已经知道边缘在哪儿了。边缘不藏在国王的帽子里，它就在我们写的代码中。比方，上一小节那个圆形渐变图形的源码是这样的：

![Radial](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Radial.png)

```SCSS
.circle-con {
    $c1: #cd3f4f;
    $c2: #e6a964;
    position: relative;
    height: 300px;
    background-image: repeating-radial-gradient(
        circle at 0% 50%,
        $c1 0,
        $c2 50px
    );
}
```

我们可以轻易找到找到边缘——对，就是那些渐变的颜色改变的地方——0px(50px)。现在我们有了边缘信息，接着就要重建边缘。重建边缘也许可以再拆分，分为以下几个步骤：

- 需要通过某种方法得到透明度的点
- 这些点需要能够组成线段
- 线段完全吻合我们的 BackgroundImage
- 使线段覆盖在 BackgroundImage 的上一层以应用我们的修改

这就是大体思路，我们并没有参与浏览器的渲染，而是通过像 FXAA 一样的后处理的方法。在已渲染的图像上做文章。不过将上述步骤仔细考虑后，会发现问题的难点在于如何生成抗锯齿条纹。

![AntiAliasingPaint](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/AntiAliasingPaint.png)

总之，我们需要继续改良思路。

在 BackgroundImage 中，像素是基本单位不能再分，点的透明度显然不能通过点的大小来模拟。这里有两种解决方法：

- Opacity，使用 CSS Opacity ，或者 CSS RGBA 函数、SCSS 函数。
- 两种颜色相融合模拟像素透明度，如果不想扯上 JS，SCSS 也能解决。

至于线段，也可以用 BackgroundImage 模拟，比如针对上面那段 CSS 代码，可以通过改写成以下方式：

```SCSS
.circle-con {
    $c1: #cd3f4f;
    $c2: #e6a964;
    $line-width: 1px;
    position: relative;
    height: 300px;
    background-image: repeating-radial-gradient(
        circle at 0% 50%,
        $c1 0,
        transparent calc($line-width),
        transparent calc(50px - $line-width),
        $c2 50px
    );
}
```

取得线段之后，将容器偏移几个单位像素，放到浏览器测试结果：

![Line1](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Line1.png)

可以发现，会自然而然得到颜色混合透明度组成的线段。只不过透明度的方向并不是我们想要的。我希望能够得到透明线条反过来的图样：

![Line2](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/Line2.png)

经过试验，我发现只需简单调换颜色的顺序就行。比方说这是在容器 50% 的位置绘制的一条线段：

![yr1](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/yr1.png)

```SCSS
.old {
    background: linear-gradient(
        var(--deg),
        transparent,
        transparent
        calc(50% - var(--line-width)),
        yellow 50%,
        red 50%,
        transparent calc(50% + var(--line-width)),
        transparent
    );
}
```

如果将线段颜色调换，就会变成：

![ry1](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/ry1.png)

```SCSS
.new {
    background: linear-gradient(
        var(--deg),
        transparent,
        transparent
        calc(50% - var(--line-width)),
        red 50%,
        yellow 50%,
        transparent calc(50% + var(--line-width)),
        transparent
    );
}
```

得到了我们想要的线段虚化的效果！这之后要做的事儿是吻合线条。

接下来是见证奇迹的时刻：

![AntiAliasingLine](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/AntiAliasingLine.gif)

Well done!

来一张成品 GIF，稍微离屏幕远一些看效果最好：

![POAA-2](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200604/POAA-2.gif)

成品在吻合线条的基础上还增加了一些内容及调整了相关参数：

- 暗色和亮色混合的透明度的值不同
- X 轴和 Y 轴的偏移不同
- 调整了拟合线段的粗细

成品的代码如下：

```SCSS
.repeat-con {
    --c1: #cd3f4f;
    --c2: #e6a964;
    --c3: #5996cc;
    position: relative;
    height: 300px;
    background-image: repeating-linear-gradient(
        var(--deg),
        var(--c1),
        var(--c1) 10px,
        var(--c2) 10px,
        var(--c2) 40px,
        var(--c1) 40px,
        var(--c1) 50px,
        var(--c3) 50px,
        var(--c3) 80px
    );

    &.antialiasing {
        &::after {
            --offsetX: 0.4px;
            --offsetY: -0.1px;
            --dark-alpha: 0.3;
            --light-alpha: 0.6;
            --line-width: 0.6px;
            content: '';
            position: absolute;
            top: var(--offsetY);
            left: var(--offsetX);
            width: 100%;
            height: 100%;
            opacity: 0.5;
            background-image: repeating-linear-gradient(
                var(--deg),
                var(--c3),
                transparent calc(0px + var(--line-width)),
                transparent calc(10px - var(--line-width)),
                var(--c2) 10px,
                var(--c1) 10px,
                transparent calc(10px + var(--line-width)),
                transparent calc(40px - var(--line-width)),
                var(--c1) 40px,
                var(--c2) 40px,
                transparent calc(40px + var(--line-width)),
                transparent calc(50px - var(--line-width)),
                var(--c3) 50px,
                var(--c1) 50px,
                transparent calc(50px + var(--line-width)),
                transparent calc(80px - var(--line-width)),
                var(--c1) 80px
            );
        }
    }
}
```

理论上，通过 SCSS 函数，能自动判断代码中线段的位置并生成填充抗锯齿的像素。无论是 LinearGradient、ConicGradient 还是 RadialGradient，都可以抗锯齿。不过我只是当试验品来写，所以没有写相应的工具函数。欢迎各位补充到 GitHub。

## 实践&后记

在家闲着无事上 CodePen 玩耍时，看大触们用 BackgroundImage 画画，虽然好看，但狗牙令人心塞。于是起了尝试做一个抗锯齿 Demo 的想法（果然好康才是源动力）。
本来这玩意儿会变成一个代码片段（类似 Gists，反正就是不那么重要的东西），但是前天看到掘金推荐的文章中有网友用 BackgroundImage 画优惠券的小圆圈缺角，这给了我启发，直接催生了《CSS 幻术》这篇博客。

关于具体应用场景我必须说明清楚，POAA 只适用于低分辨率的显示器（严格来说是看 DPI，也就是分辨率和尺寸之比。就像我用的 2K 显示器，但是因为尺寸较大，所以能通过 POAA 取得效果），自然就排除了苹果电脑或者手机这些设备。POAA 只能作为一种技术补充，由于并不方便作实践的选择，所以我称之<spark>“幻术”</spark>。如果你需要在生产环境用浏览器绘图，那么肯定会选择优先使用 SVG 和 Canvas。选择 BackgroundImage 绘图，在我的印象里，只在需要追求时间和简便的情况下才会发生（就比如画优惠券）。这使得 BackgroundImage 地位尴尬，像是成了开发人员不会 SVG 时选择的替代品。不过... SVG 不应该是设计人员掌握的东西么？所以图形到底应该由谁来画，我不懂。

最后，推荐大家来我的博客逛逛，在[我的博客](http://www.lionad.art/articles/CSSAA.html)里你可以通过操纵杆和控制台亲自体验 POAA 的神奇之处。

啊，写这篇文章我起码喝了 3 瓶肥宅快乐水。我肯定又变肥宅了哭。都看到这里了，不点赞三连安慰我一下再走么？**/(ㄒ o ㄒ)/~~**

## 彩蛋：<del>脑放</del>

好吧，这里想介绍的不是“纯脑放”，而是一种先将图片变模糊以平滑图形边缘，再锐化图片强化边缘的思路。日常生活中使用 Photoshop 等工具处理图片经常会用到这种方法；有时电脑游戏画面增强也是这样处理的。

先模糊，再锐化，两个步骤不能反过来，同时参数的调节也很重要（很玄学）。我在自己的博客中进行实验时，以下是我的尝试的方法：

- CSS Filter 串联 SVG 自定义滤镜
- CSS Filter 串联 Blur 和 Constract 滤镜

不过很遗憾，水平有限，始终没能调出想要的效果，所以直接结案了，下一题。

<Article-A200604-Blur />

## 阅读更多

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误的地方也麻烦各位评论指出。<JJ><p>若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=</p></JJ>

<JJ><p>所有的文章和源码都会汇总到我的[博客项目](https://github.com/Lionad-Morotar/blogs)，欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](https://www.lionad.art)，排版超 Nice 哦~</p></JJ>

- [DLSS 2.0-基于深度学习的实时渲染图像重建](https://zhuanlan.zhihu.com/p/123642175)
- [Please Stop “Fixing” Font Smoothing](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/)
- [用 CSS 开启硬件加速来提高网站性能](https://www.cnblogs.com/ranyonsue/p/8296983.html)
- [Implementing FXAA](http://blog.simonrodriguez.fr/articles/30-07-2016_implementing_fxaa.html)
