---
meta:
  - name: keywords
    content: CSS,阴影,菲尼尔效应,光影效果,SVG,材质,渲染
  - name: description
    content: 本文介绍了几种通过CSS实现的常见阴影效果如单侧投影、空心投影、投影动画、彩色阴影、长投影和倒影，以及尝试使用SVG模拟材质特性如粗糙度及光学效应如菲尼尔效应生成了几种特殊的纹理，最后通过一个CSS绘制真实书本案例介绍了实战中的一些细节。
---

# 🌟 探秘 CSS 光影效果

[TOC]

## 前言

总听人说光和影是孪生兄弟，有光就有影。其实不然，如果没有光线强弱的对比，也就不会有阴影的存在。我们总是依靠物体表面的反光来感知世界，假设所有物体都能完全吸收光线，那世界将变得黑漆漆一片。

所谓只有理解光，才能驾驭阴影。**好的设计师往往都是用光高手，能通过复杂的光影向读者传达出物体的质感、空间感以及层次感**[^texture]。他们画出来的设计稿都是漂漂亮亮的，这可苦了广大前端同胞！在浏览器中，我们只能用寥寥几个 CSS 属性，束手束脚的同时还想方设法地还原设计稿。毕竟，相比我们用的 CSS 手枪，设计师们用的 AE、C4D 看起来就像大炮一样！

## 常见光影效果

好在我们可以暂且假以性能为由，继续正大光明地怎么简单怎么来（汗）。就像一提到光影效果，大家第一反应肯定是操起 box-shadow、text-shaodw、drop-shadow 三件套直接开画。就大部分场景来说，这些属性还挺好用的，可用它实现多种效果，比如单侧投影、空心投影和投影动画。若涉及到彩色阴影、长投影或是倒影，就需要结合其它 CSS 属性打辅助了。

[彩色投影](https://juejin.cn/post/6844903704986910728)，可以让伪元素继承父元素的背景，再加模糊滤镜即可。这个思路也可以用来制作毛玻璃效果[^frosted-glass]。

![彩色投影](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210522171201.png)

```css
.avator {
  position: relative;
  background: 'xxx';
}
.avator::after {
  content: "";
  position: absolute;
  top: 10%;
  width: 100%;
  height: 100%;
  /* 伪元素继承父元素背景 */
  background: inherit;
  /* 再加一些稀奇古怪的滤镜，调一调参数 */
  filter: blur(10px) brightness(80%) opacity(.8);
  z-index: -1;
}
```

制作倒影可以使用 -webkit-box-reflect 属性[^box-reflect]。兼容性还不错，除了火狐和 IE，其余浏览器都能用。另一种方法则是用伪元素将父元素复制一份，再 transform 倒转一下位置。

![https://codepen.io/TheDutchCoder/pen/IKqpA](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/FRUa9DGFu2.gif)

阴影的另一面是高光。画高光的思路可以直接套画阴影的思路，只不过需要将投影的颜色改为半透明白色。

![https://codepen.io/Lionad/pen/rNWMVGb](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210522170201.png)

另一种方法是用背景渐变或伪元素模拟高光。若再配合 CSS 动画，可以轻松实现[扫光](https://codepen.io/Lionad/pen/wvJJYzR)等效果。

![扫光动画](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/bmQ4xjDqE0.gif)

```css
body:before {
  content: "";
  position: absolute;
  top: 0;
  width: 200vw;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.4);
  transform: rotate(45deg);
  animation: scan-light 2s ease-in infinite;
}
@keyframes scan-light {
  from {
    right: -100vw;
  }
  to {
    right: 40vw;
  }
}
```

## 进阶光影效果

### 纹理

以上提到的几种绘制光影的方法，主要用来传达物体的形状及位置。比方说，倒影和渐变高光可以用来传达物体的质感，展示物体光滑到足以发生镜面反射的表面。当然，这是理想情况。现实中的物体很少有平滑的表面，就算肉眼可见的光滑表面，微观上而言也是坑坑洼洼不堪入目。

![物体的微观表面](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523011634.png?w=70)

一旦我们开始使用 CSS 去模拟高级光影，首先碰到的难题就是如何处理磨砂表面。以下介绍一种简单实现磨砂表面的思路，在寻常场景用用还是阔以的。

**物体表面是什么样，我们就给它贴什么样的图片，这种方法叫做材质贴图**。我们用一个简单的材质贴图为例，先用 PS 弄一张纯色的背景，然后分别随机填充一些稍微亮一点高光和稍微暗一点的像素点[^linegradient-material]，就能获得类似下图结果。

![材质图片](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523020054.png)

我们再把这张材质平铺为文档背景，就可以得到类似磨砂金属般的表面纹理（由于图片压缩的原因，效果可能不好，可直接前往[CodePen](https://codepen.io/Lionad/pen/mdWWxdg)查看细节）。

![https://codepen.io/Lionad/pen/mdWWxdg](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523020615.png)

不同的高光和阴影细节会给人不同的感受，比方说这里有一张雪花电视效果图，其高光像素和阴影像素的对比度要比磨砂金属表面的大得多。

![https://codepen.io/joeyhoer/pen/CojIk](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523021338.png)

使用图片的不便之处在于没有办法边调整细节边预览，并且 PS 可能超出前端的技术栈范围了。好在我们还有 SVG 这个神器[^why-svg]。以下是一套“标准的”材质生成代码，可以用来生成非常多种类的材质。

```html
<svg width="0" height="0">
  <filter id="surface">
    <feTurbulence type="fractalNoise" baseFrequency='0.03 0.06' numOctaves="30" />
    <feDiffuseLighting lighting-color='#ffe8d5' surfaceScale='2'>
      <feDistantLight elevation='10' />
    </feDiffuseLighting>
  </filter>
</svg>
<style>
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  filter: url(#surface);
}
</style>
```

其中，[feDiffuseLighting](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feTurbulence) 是一种噪音滤镜，可以创建出随机的材质图片。[feDiffuseLighting](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feDiffuseLighting) 是光源滤镜。feDistantLight 指示用平行光作为光源。

光源？弄个材质还要这么复杂嘛？

先别急，**光源其实也就几种：点状光、平行光、聚光。可以简单理解成电灯泡、太阳以及戏剧灯**。由于我们还将在表面材质的话题中停留一会儿，暂且只需要用到平行光。

![https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feDiffuseLighting](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523030133.png)

大致了解了上面那段 SVG 是什么意思，我们就开始愉快地调参数啦。

先试试降低灯光到表面的距离（减小 elevation）以增加高光面和阴影面的对比度。获得了以下看起来像是[某种土壤的纹理](https://codepen.io/Lionad/pen/poeeLKd)。

![土壤纹理](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523154039.png)

接下来拉高灯光，调整光照颜色（lighting-color），再把纹理弄粗糙一些（减小 baseFrequency），获得了类似[大理石的纹理](https://codepen.io/Lionad/pen/zYZZjxb)（也许有点像白色的牛皮纸）。

![大理石纹理](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523153936.png)

增加 baseFrequency、调整表面基准高度 surfaceScale 获得平滑纹理，再调整灯光高度降低高光和阴影的对比度，得到了[白石灰墙壁纹理](https://codepen.io/Lionad/pen/rNyyQjp)。

![白石灰墙壁](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523153351.png)

```html
<svg width="0" height="0">
  <filter id="surface">
    <feTurbulence type="fractalNoise" baseFrequency='.95' numOctaves="80" result='noise' />
    <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='1.4' result="grind">
      <feDistantLight azimuth='500' elevation='50' />
    </feDiffuseLighting>
    <feGaussianBlur in="grind" stdDeviation=".6"/>
  </filter>
</svg>
```

各位应该发现了白石灰墙壁的代码相比“标准模板”增加了一个高斯模糊滤镜（feGaussianBlur）。**原则上滤镜无限叠加，可以做出非常多好玩的效果**。比方说，有大佬用 SVG 画云朵。对，你没听错。以下是用 SVG 画的[云朵纹理](https://codepen.io/beauhaus/pen/QJrpPY)[^cloud]。

![云朵材质](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523034525.png)

### 菲涅尔效应

说完了粗糙的表面怎么画，我们再看看画光滑表面又有哪些原则。说起水和金属这种有相对光滑的表面的材质，不得不提到菲涅尔效应。

一句话介绍菲涅尔效应：如果你站在湖边低头看脚下的水，你会发现水是透明的，反射不是特别强烈，能看到水底；如果你看远处的湖面，你会看见山和天空的倒影。

![菲涅尔效应](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523160708.png)

每种材质都有各自的菲涅尔值，这是根据其折射率决定的，表明了会有多少光线被物体吸收，又有多少光线从物体表面反弹[^fresnel]。以下用 [chaosgroup.com](https://www.chaosgroup.com/blog/understanding-glossy-fresnel) 的案例做说明。

<JJ>
<img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523163413.png" />
</JJ>

<Article-A210523-Fresnel />

图中有一个粗糙的球体，右侧图片中的球体边缘反射了天光而显得边缘发光，左侧图片中球体边缘则没有此现象。球体表面粗糙，菲涅尔效应会变得非常微弱，所以左图是正确结果；如果球体类似金属或水面，表面光滑，那么正确结果应当类似右图。

了解菲涅尔效应之后，我们就可以根据经验凭空画一些高菲涅尔效应的物体。下图是 Oscar Salazar 用 CSS 画的[水滴](https://codepen.io/raczo/pen/KKVbQmV)。他用 box-shadow 给水滴的下缘增加了大量的透明白色阴影来模拟菲涅尔效应。

![水滴效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523164407.png)

如果对比了现实中的水滴，你会发现 Oscar Salazar 画的并不“真”。但是因为水滴的放大作用，再加上光影效果，十分抓人眼球，给人“神似”的感觉，所以并不会觉得画得有问题。

![现实中的水滴](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523215330.png)

下图是 Envato Tuts+ 画的[毛玻璃效果](https://codepen.io/tutsplus/pen/WLaWjX)。左边是原版，右边是增加了菲涅尔效应后的修改版本。修改后的版本看起来像是边缘平滑的玻璃版，而不是塑料板儿一块[^draw-not-sure]。

<JJ>
<img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523165959.png" />
</JJ>

<Article-A210523-FrostedGlass />

<!-- 闭塞阴影 -->

## 场景实战

限于技术，还有很多种类的光影效果文中没有提到，以后有机会的话出个续集吧（咕咕咕预定中）。这里我们用一个 CSS 绘制的书籍封面效果作为结尾，也顺便串联一下上文提到的技术。素材只给两张书籍封面图片，[点此下载第一张](https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s2709063811.jpg)，[点此下第二张](https://mgear-image.oss-cn-shanghai.aliyuncs.com/css-draw/s3360190011.jpg)[^refferer]，目标是实现以下效果[^compressed]。

![《乞力马扎罗山的雪》](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/book-cover-1.png)

![《八百万种死法》](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/book-cover-2.png)

### 搭出框架

首先，观察图像，背景是一张纸，上面有一本书；光源在右上角，大概是平行光，光源高度离纸面不远。我们先用 HTML 搭出框架。

```html
<div class="display-container">
  <!-- 纸背景材质层 -->
  <div class="paper" />
  <!-- 书的封面 -->
  <div class="book">
    <!-- 封面的纸的材质层 -->
    <div class="paper" />
    <!-- 用一张图片自动撑开封面高度 -->
    <img class="corner" src="xxx" />
  </div>
</div>
```

### 处理纹理

然后我们用 SVG 调出类似[纸面的纹理效果](https://codepen.io/Lionad/pen/dyvvapV)，打光，然后设为背景。

![纸纹理](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523175503.png)

![纸纹理打光后](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523180326.png)

```html
<svg width="0" height="0">
  <filter id="surface">
    <feTurbulence type="fractalNoise" baseFrequency='.95 .95' numOctaves="80" result='noise' />
    <feDiffuseLighting in='noise' lighting-color='#004F85' surfaceScale='.8' result="grind">
      <feDistantLight azimuth='500' elevation='50' />
    </feDiffuseLighting>
    <feGaussianBlur in="grind" stdDeviation=".5"/>
  </filter>
</svg>
<div class="paper"></div>
<style>
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .paper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .paper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: url(#surface);
  }
  .paper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.25), rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.15) 70%, rgba(0,0,0,.1));
  }
</style>
```

### 封面细节

紧接着开始绘制书籍封面，谨记有三个部分要处理：材质、高光和阴影。[处理完之后结果如下](https://codepen.io/Lionad/pen/jOBBdwg)。

![为添加图片的封面](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523181428.png)

有一些小细节要注意。

* 封面折痕的处理
* 模仿闭塞阴影
* 防止边缘过于锐利

先来说说折痕的处理。如果你手头有一本实体书，那再好不过了[^fold-mark]。试着用闪光灯打光，看看折痕上的光影，应该能发现折痕不过就是一道亮面和一道暗面的组合。我们可以用渐变来模拟这条折痕。

![封面折痕](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523182507.png)

```css
.book-cover .book::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-repeat: no-repeat;
  background-image:
    /* 1. 这条渐变是比较明显的那道折痕 */
    linear-gradient(to right, rgba(0,0,0,0.1) 0.3%, rgba(255,255,255,0.09) 1.1%, transparent 1.3%),
    /* 2. 这条一像素的渐变是封面最左侧的折痕（没有暗面） */
    linear-gradient(to right, rgba(0,0,0,0.2) 0, rgba(255,255,255,0.08) 0%, transparent 0.5%);
  background-size: 50% 100%, 50% 100%;
  background-position: 0% top, 9% top;
}
```

然后再说说闭塞阴影。闭塞阴影的概念非常简单，指两个物体靠得比较近，遮住了光线；靠得越近的地方，阴影就越黑[^occlusion-shadow]。对应到 CSS，drop-shadow 产生的阴影很“实”，但不能叠加；box-shadow 产生的阴影可调节阴影范围，但会向四周扩散。我们可以通过叠加 drop-shadow 和 box-shadow 的方式来模拟出更真实的阴影效果。

```css
.book-cover .book {
  position: relative;
  /* 由于阴影对视觉中心有影响，所以把书整体向右上方挪一些 */
  margin-top: -1vh;
  margin-right: -1vh;
  width: 32%;
  max-width: 600px;
  font-size: 0;
  box-shadow: 
    -55px 40px 30px 0 rgb(0 0 0 / 10%), 
    -27px 25px 35px -5px rgb(0 0 0 / 20%),
    -10px 10px 15px 5px rgb(0 0 0 / 10%), 
    -12px 12px 10px 0 rgb(0 0 0 / 20%),
    -7px 7px 8px 0 rgb(0 0 0 / 10%),
    -5px 5px 5px 0 rgb(0 0 0 / 20%),
    -2px 2px 3px 0 rgb(0 0 0 / 30%);
  filter: drop-shadow(-20px 20px 15px rgba(0, 0, 0, .65));
}
```

实现效果如下图。位置一指闭塞阴影，离书越近则阴影越浓重；位置二是 box-shadow 向外扩散的效果，和光源位置相背，违反了人的认知经验，需要避免。

![阴影效果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523183850.png)

再是关于如何防止边缘过于锐化。<del>还未处理前，书籍的边缘类似以下这张图。</del>由于图片被压缩，什么细节都看不出来了，这里直接介绍一下防止边缘锐化的方案吧。把两张图片叠一起，下面那张图片模糊一像素，上面那张图片 border-radius 设置 2 像素，搞定。

![封面边缘](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523184932.png)

### 成品展示

最后，把所有代码整合到一起，调调参数，改改细节，就完成啦。嘿嘿，再放一张效果图。[可以到 CodePen 查看最终效果](https://codepen.io/Lionad/pen/XWMMNKK)。

![《罗生门》](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/book-cover-3.png)

啥，你想做一本能翻页的书？

那得去康康 [turn.js](http://www.turnjs.com/#getting-started) 的实现[^turnjs]。效果如下图，其中也有用到菲涅尔效应哦。

![turn.js](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523191034.jpg?w=60)

## 阅读更多

<JJ>**希望本文能对你有所帮助，我是仿生狮子，各位下期见咯~**</JJ>

<JJ>想看看这篇文章是如何被创造的？你能从我的[博客项目](https://github.com/Lionad-Morotar/blogs)中找到答案；欢迎 Star & Follow；也请大家多来我的[线上博客逛逛](https://www.lionad.art)，排版超 Nice 哦~</JJ>








[^texture]: 人话就是：物体的材质、形状以及位置。
[^box-reflect]: [《-webkit-box-reflect 属性简介及元素镜像倒影实现》](https://www.zhangxinxu.com/wordpress/2016/08/webkit-box-reflect-moz-element/)
[^frosted-glass]: [_How to create a frosted glass effect using CSS?_](https://stackoverflow.com/questions/17089927/how-to-create-a-frosted-glass-effect-using-css)
[^linegradient-material]: 其实用渐变+随机的方法也能生成类似磨砂金属的材质贴图，这样就可以不需要引入外部图片了，但过于麻烦，不好调参，还不如 base64 来得方便。
[^why-svg]: 请原谅我，我总是潜意识里把 SVG 当作 CSS 的超集，只因为可以用它来画画<del>而且在画画方面可以吊打 CSS</del>。
[^cloud]: [云朵效果优化（<del>大佬优化大佬</del>）](https://www.zhangxinxu.com/wordpress/2020/10/svg-feturbulence/)
[^fresnel]: [《理解光泽度的菲涅尔效应》](http://hanshilin.com/software/v-ray/understanding-glossy-fresnel/)
[^draw-not-sure]: “看起来像”和“现实”并不等同。就像许多画家为了营造气氛或达到想要的效果，会打破光影的物理限制。这是经验性的总结，当然，也见仁见智了。
[^refferer]: 由于 OSS 设置了防盗链，在第三方网页应该打不开这个链接。不过我开放了空 refferer 的访问，可以使用浏览器直接打开图片再保存。
[^compressed]: 由于图片压缩，演示的效果会打折。各位可以实操以体验完整效果<del>及完整乐趣</del>。
[^fold-mark]: 别说你的书还是新的。
[^occlusion-shadow]: 对应游戏画面设置中的“环境光遮蔽”可能好理解一些。
[^turnjs]: CSS 也能实现翻页效果，只不过效果没那么好，见：[_The Mad Magazine Fold-In Effect in CSS_](https://thomaspark.co/2020/06/the-mad-magazine-fold-in-effect-in-css/)