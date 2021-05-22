# 🌟 探秘 CSS 光影效果

[TOC]

## 常见光影效果

总听人说光和影是孪生兄弟，有光就有影。其实不然，如果没有对比那也就不会存在阴影。因为我们总是依靠物体表面反射的光来感知世界，假设所有物体都能完全吸收光线，那么我们的世界将是黑漆漆的一片。所以只有理解光，才能驾驭阴影。所以常说好的设计师都是用光高手，能通过复杂的光影向读者传达物体的质感、空间感以及层次感[^texture]。


所有的设计稿画出来都是漂漂亮亮的，而放到了浏览器中，只能用寥寥几个 CSS 属性糊弄一下。这可苦了广大的前端同胞。相比我们用的 CSS 小手枪，设计师们用的 AE、C4D 看起来就像大炮一样。

好在我们可以暂且假以性能为由，继续正大光明地怎么简单怎么来，就像一提到光影效果，大家第一反应肯定是操起 box-shadow、text-shaodw、drop-shadow 三件套直接开画。大部分场景下这这些属性还挺好用的，可实现非常多种类的效果，比如单侧投影、空心投影和投影动画。若涉及到彩色阴影、长投影或是倒影，可以结合其它 CSS 属性打辅助。

### 阴影

制作倒影可以使用 box-reflect 属性[^box-reflect]。

![https://codepen.io/hoanghien0410/pen/MMPaqm](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523001224.png)

彩色投影，可以给伪元素继承父元素的背景，并结合模糊滤镜来仿制。这个思路也可以用来制作毛玻璃效果[^frosted-glass]。

![https://juejin.cn/post/6844903704986910728](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210522171201.png)

### 高光

阴影的另一面是高光。绘制高光的思路可以直接套用 box-shadow 和 text-shadow 的思路。只不过需要将投影的颜色改为半透明白色。

![https://codepen.io/Lionad/pen/rNWMVGb](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210522170201.png)

另一种常见的绘制高光的方法是使用背景渐变模拟。配合 CSS 动画，可以轻松实现扫光、悬浮高亮等效果。

![https://codepen.io/lisilinhart/pen/pPQoEo](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/msedge_uXh3KD1fSU.png)

## 进阶光影效果

### 纹理

在上一小节提及的绘制光影的方法中，投影主要用来传达物体的形状及位置，box-reflect 和渐变高光则是用来传达物体的质感的属性，用于展示镜面反射。大多数玻璃和金属都可以制造镜面反射，只不过区别在于玻璃能透光，会发生折射现象。

当然，这是理想情况。现实中的物体不是完美的镜面，就算肉眼观察到的光滑表面，微观上而言也是坑坑洼洼不堪入目。

![物体的微观表面](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523011634.png?w=70)

一旦我们开始使用 CSS 去模拟高级光影，首先碰到的难题就是如何处理磨砂表面。就像上一小节提到的 CSS 相比专业软件只是小枪见大炮，所以本文仅介绍一种简单实现的思路，不要在复杂场景用那还是 OK 的。

物体表面长成什么样，那就用贴图保存下来设为背景就好了，这种方法叫做材质贴图。比如在下面在这幅图，表面颜色左白右黑，用 PS 分别往两边随机填充一些高光和阴影像素，就算完成了[^linegradient-material]。

![材质图片](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523020054.png)

再把它平铺到背景中，可以得到类似磨砂金属般的表面（由于图片压缩的原因，效果可能不好，可直接前往[Codepen](https://codepen.io/Lionad/pen/mdWWxdg)查看细节）。

![https://codepen.io/Lionad/pen/mdWWxdg](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523020615.png)

不同的高光和阴影细节会给人不同的感受，比方说这里有一张雪花电视效果图，其高光像素和阴影像素的对比度要比磨砂金属表面的大得多。

![https://codepen.io/joeyhoer/pen/CojIk](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523021338.png)

如果你想用“存粹的”代码解决方案来处理表面纹理，可以试试 SVG[^why-svg]。以下是一套“标准的”材质生成代码。

```html
<svg width="0" height="0">
  <filter id="surface">
    <feTurbulence type="fractalNoise" baseFrequency='0.03 0.06' numOctaves="30" />
    <feDiffuseLighting lighting-color='#ffe8d5' surfaceScale='2'>
      <feDistantLight azimuth='5' elevation='2' />
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

其中，[feDiffuseLighting](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feTurbulence) 是一种噪音滤镜，可以创建出随机的材质图片。[feDiffuseLighting](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feDiffuseLighting) 是光源滤镜。feDistantLight 指示使用平行光光源。

光源？弄个材质还要这么复杂嘛？

额，先别急，光源其实也就只有几种：点状光、平行光、聚光灯。你可以简单理解为他们分别是电灯泡、太阳以及舞台灯。由于我们还将在表面材质的话题中停留一段时间，暂且不需要使用光效布景，所以只需要用到平行光。

![https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feDiffuseLighting](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523030133.png)

让我们开始调参数吧，通过调整噪音滤镜、光照滤镜的参数，可以获得不同种类的材质，<del>调参前需要学习一下搞机器学习时怎样算法调优</del>。

以下是某种土壤的代码。

```html
<!-- https://codepen.io/Lionad/pen/poeeLKd -->
<svg width="0" height="0">
  <filter id="surface">
    <feTurbulence type="fractalNoise" baseFrequency='0.03 0.06' numOctaves="30" />
    <feDiffuseLighting lighting-color='#ffe8d5' surfaceScale='2'>
      <feDistantLight azimuth='5' elevation='2' />
    </feDiffuseLighting>
  </filter>
</svg>
```

![土壤材质](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523024819.png)

以下是某种[石头的纹理](https://codepen.io/Lionad/pen/zYZZjxb)（也许也有点像白色的牛皮纸）。

```html
<svg width="0" height="0">
  <filter id="surface">
    <feTurbulence type="fractalNoise" baseFrequency='0.01 0.01' numOctaves="20" result='noise'/>
    <feDiffuseLighting in='noise' lighting-color='#d2d2d2' surfaceScale='8' result='light-left'>
      <feDistantLight azimuth='111' elevation='40' />
    </feDiffuseLighting>
  </filter>
</svg>
```

![石头纹理](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523032047.png)

结合其他滤镜会更有趣一些。以下是 SVG 生成的云朵。

```html
<!-- https://codepen.io/beauhaus/pen/QJrpPY -->
<!-- 源码有点长，不贴了，直接看大佬的源码吧 -->
```

![云朵材质](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210523034525.png)

### 

### 场景

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/book-cover-1.png)

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/book-cover-2.png)

[^texture]: 人话就是：物体的材质、形状以及位置。
[^box-reflect]: [《-webkit-box-reflect 属性简介及元素镜像倒影实现》](https://www.zhangxinxu.com/wordpress/2016/08/webkit-box-reflect-moz-element/)
[^frosted-glass]: [_How to create a frosted glass effect using CSS?_](https://stackoverflow.com/questions/17089927/how-to-create-a-frosted-glass-effect-using-css) 以及[《理解光泽度的菲涅尔效应》](http://hanshilin.com/software/v-ray/understanding-glossy-fresnel/)
[^linegradient-material]: 其实用渐变+随机的方法也能生成类似磨砂金属的材质贴图，这样就可以不需要引入外部图片了，但过于麻烦，不好调参，还不如 base64 来得方便。]
[^why-svg]: 请原谅我，我总是潜意识里把 SVG 当作 CSS 的超集，只因为可以用它来画画。
