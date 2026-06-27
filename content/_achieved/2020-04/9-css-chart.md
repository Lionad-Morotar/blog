---
title: 🍥 9种CSS图案解析
---

## 前言

又到了金三银四面试季，这里我整理了... 欸！？不好意思，跑题了... 感觉近来掘金首页全是面试相关的内容，我是打开掘金也不知道该看啥，实在无奈。

上个礼拜看了许多关于平面构成的资料，我就边用 CSS 画了一些类似背景图案的玩意儿。这里给大家选了12种，从观察者的角度由易到难的给大家解一下思路。本文包含大量图片及代码所以较长，建议先点赞收藏。

**⚠预警，本文没有对基础知识的详解，不过推荐一边看文章实践一边学习，效率更高。**

**⚠预警，文末有惊喜。**

## 效果图展示

![CSS图案效果图](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/K0L1Ov1rMI.gif)

## 分析顺序介绍

粗略看过效果之后，我们按照图案种元素的多少及元素变异程度、动画难易程度、~~有无头绪~~等因素给文章小节排一个序，顺序见下图。每小节都有源码，你可以通过标题直接跳转到你想看的图案。

![CSS图案效果图分析顺序](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/ureSLEWBCZ.png)

---

### 圆环变形

![圆环变形图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/1DlfMqAvJH.gif)

```html
  <div class="card">
    <div class="node" v-for="item in 100"></div>
  </div>
  <style>
    // 其余所有图案的 card 类标签都套用了这段样式，为了减少文章长度，下略。
    .card {
      width: 200px;
      height: 200px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  </style>
```

![圆环变形图案动画](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/-1.jpg)

通过图片动画效果，我们大致得出动画变化的模式。

- 有部分圆环变形成两个圆环的长度，并改变了底色。

    观察变长圆环的顺序，能发现“每逢三就变长”这种规律，推测使用了 :nth-child(3) 选择器。

下面是 CSS 源码。
```scss
  .card {
    justify-content: flex-start;
    overflow: hidden;
    cursor: pointer;
  
    // 每逢三个元素，则执行动画，源代码和我们分析的动画的顺序相反，圆环是从长变短，不过不影响
    .node {
      border: solid 5px #F29338;
      border-radius: 50%;
  
      
      &:nth-child(3n) {
        width: 40px;
        flex-basis: 40px;
        background: #F8C798;
        animation: change-circle-width 2s ease alternate infinite;
      }
    }
  }
  
  @keyframes change-circle-width {
    from {
      width: 40px;
      flex-basis: 40px;
      background: #F8C798;
    }
    60% {
      width: 20px;
      flex-basis: 20px;
      background: transparent;
    }
    // 动画 60% - 100% 这段时间，属性没有变动，所以图案看起来像是静止的。
    to {
      width: 20px;
      flex-basis: 20px;
      background: transparent;
    }
  }
```

### 厕所里的瓷砖

![厕所里的瓷砖图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/Cq4jhBX0QD.gif)

```html
  <div class="card">
    <div class="node" v-for="item in 100"></div>
  </div>
```

和上一张图思路类似，只是多出了一些圆形小球。

- 小球的动画应该包含位置的偏移和颜色、透明度的改变。
- 当鼠标悬浮时（注意图片右下角的鼠标手势），图中多了一排小圆球，样式和行为和前一排原球几乎一样。

    推测第二排圆球使用了 animation-delay 效果。

- 观察小球的个数，欸？貌似有些问题，圆形小球数量和瓷砖数量对不上。应该是对小球的显隐的顺序做了特殊处理。

下面是 CSS 源码。
```scss
  .card {
    cursor: pointer;
  
    // 鼠标悬浮时显示第二排的小圆球
    &:hover {
      .node {
        &:nth-child(2n)::after {
          visibility: unset;
        }
      }
    }
  
    .node {
      background: #71A2DB;
      outline: solid 1px white;
  
      // 3n-1，3n+1 一起使用时等价于 3n 
      &:nth-child(3n-1),
      &:nth-last-child(3n+1) {
        background: #C2D7F0;
      }
  
      // 去除末行及每行末尾的伪元素
      &:nth-child(10n)::after,
      &:nth-last-child(-n+10)::after {
        display: none;
      }
  
      &::after {
        left: 75%;
        top: 75%;
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background: white;
        animation: card-4-circle-move 1s linear alternate infinite;
      }
      &:nth-child(2n)::after {
        animation: card-4-circle-move-delay 1s linear alternate infinite;
        animation-delay: .3s;
        visibility: hidden;
      }
    }
  }
  
  @keyframes card-4-circle-move {
    from {
      left: 45%;
      top: 45%;
      opacity: 1;
      background: white;
    }
    to {
      left: 130%;
      top: 130%;
      opacity: 0;
      background: #F2C07D;
    }
  }
  @keyframes card-4-circle-move-delay {
    from {
      left: 45%;
      top: 45%;
      opacity: 1;
      background: #F2C07D;
      z-index: 2;
    }
    to {
      left: 130%;
      top: 130%;
      opacity: 0;
      background: white;
    }
  }
```

### 三角与圆球印花

![三角与圆球印花图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/browser_TdDhrdE1kJ.png)

```html
  <div class="card">
    <div class="node" v-for="item in 100"></div>
  </div>
```

乍一眼看，用每个节点的伪元素画一个圆形和一个三角形就完成了这张图。

其实并不对，先别往下翻答案，想想为什么。

答案分割线，小心越界：

---

观察图案和HTML代码：

- 从每行来看，每行有10个三角形，但是每行有9个圆+2个半圆。

    猜测圆形是由半圆组装的，再结合纵向观测，可以推测圆形是由4个 1/4 圆组成的。

    但是用伪元素没有办法画 1/4 圆。思路不对，再换个思路。

    猜测伪元素是一个整圆，利用 Box-Shadow 复制了4份，分别放在了正方形四个角落。.card 或是 .node 使用 overflow 裁剪掉多余元素。

- 再看三角形。

    三角形的画法比较常见，可以用透明 Border + 带颜色的 Border 绘制。

    三角形的角度变化很有规律，可以大致推测，旋转角度和列数有关。

```scss
  .card {
    overflow: hidden;
    cursor: pointer;
  
    // 根据三角形的序号与10的模来确定旋转角度
    @for $i from 0 through 9 {
      .node:nth-child(10n - #{$i})::before {
        transform: rotate((-19 + $i) + unquote('deg'));
      }
    }
  
    // 上面那串函数编译出来就成了下面这一长串模样
    // .node:nth-child(10n)::before {
    //   transform: rotate(-19deg);
    // }
    // .node:nth-child(10n-1)::before {
    //   transform: rotate(-18deg);
    // }
    // .node:nth-child(10n-2)::before {
    //   transform: rotate(-17deg);
    // }
    // .node:nth-child(10n-3)::before {
    //   transform: rotate(-16deg);
    // }
    // .node:nth-child(10n-4)::before {
    //   transform: rotate(-15deg);
    // }
    // .node:nth-child(10n-5)::before {
    //   transform: rotate(-14deg);
    // }
    // .node:nth-child(10n-6)::before {
    //   transform: rotate(-13deg);
    // }
    // .node:nth-child(10n-7)::before {
    //   transform: rotate(-12deg);
    // }
    // .node:nth-child(10n-8)::before {
    //   transform: rotate(-11deg);
    // }
    // .node:nth-child(10n-9)::before {
    //   transform: rotate(-10deg);
    // }
  
    .node {
      background: #F5C1CB;
      filter: saturate(1.6);
  
      // 通过伪元素 Border 绘制的三角形
      &::before {
        left: 0;
        top: -8px;
        border: solid 10px transparent;
        border-bottom-color: #D2F3BF;
        z-index: 1;
      }
  
      // 使用 Box-Shadow 属性，将圆形复制了额外的三份
      &::after {
        left: -5px;
        top: -5px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #FBF5C5;
        z-index: 0;
        box-shadow: 20px 0 #FBF5C5, 20px 20px #FBF5C5, 0 20px #FBF5C5;
      }
    }
  }
```

### 瓷砖变异

![瓷砖变异图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/4yjR5DrBgy.gif)

```html
  <div class="card">
    <div class="node" v-for="item in 100"></div>
  </div>
```

这张图应该大体上来说比较简单。需要额外注意的是，那些特殊颜色的圆出现的位置。

- 观察鼠标移动时格子的缩放，可以推测每个格子由4个 1/4圆和一个十字组成。

    十字好处理，由 2*2 像素的伪元素通过 Box-Shadow 复制即可完成。

    根据 1/4 圆可推测每个格子都有 overflow: hidden 样式。

- 特殊颜色的圆有多种可能的实现方法。

    第一，在 SCSS 编译时，调用随机函数，给这些随机位置圆改变颜色就好。

    第二，使用蝉原则或类似方式实现 CSS 伪随机。

    ~~第三，写死。~~

害~ 这里直接上源码。

```scss
  .card {
    .node {
      background: #EE92A5;
      overflow: hidden;
      transition: .3s;
      cursor: pointer;
  
      // 鼠标在格子上悬浮时的放大效果
      &:hover {
        transform: scale(1.4);
      }
  
      // 十字线的构成
      &::before {
        left: 8px;
        top: 8px;
        width: 2px;
        height: 2px;
        background: white;
        z-index: 0;
        box-shadow: 0 2px white, 2px 0 white, -2px 0 white, 0 -2px white;
      }
      
      // 圆形的构成
      &::after {
        left: -8px;
        top: -8px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #F8C798;
        z-index: 0;
        box-shadow: 20px 0 #F8C798, 20px 20px #F8C798, 0 20px #F8C798;
      }
  
      // CSS 伪随机给特定元素设置特殊色。在实践时，可以自己调整以下参数，以达到想要的效果。
      &:nth-child(2n)::after {
        background: #E03A5C;
      }
      &:nth-child(3n-1)::after,
      &:nth-child(3n)::after,
      &:nth-child(5n)::after,
      &:nth-child(6n)::after,
      &:nth-child(7n-3)::after {
        background: #F8C798
      }
    }
  }
```

### 山与云

![山与云图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/KkRVqm20Qd.gif)

```html
  <div class="card">
    <div class="node" v-for="item in 100"></div>
  </div>
```

这个图案，嘛... 讲道理，这谁看的出来是啥玩意儿嘛！其实我心里想，要不是玩意儿是自己画的，我估摸着自己也看不透这图案~~（红尘）~~，不过下面还是正经扒一下。

- 三角形，好办，用伪元素画。至于颜色么，可以仿照上一张图片的 CSS 伪随机的思路。至于山的动画，不好确定是山在动还是说山在跟随其它元素动。
- 再看横线，欸不对，这图里怎么有这么多横线竖线，到底哪一个伪元素哪一个又不是，害...

    猜测，横线竖线是格子的 Outline。不对，Outline 只能是正方形的。

    那会不会是 Border 呢？能从观察得出，这些横线的边缘又半透明像素，再结合三角形可有 Border 绘制而成，推测，横线竖线是圆角矩形格子的 Border，被形成三角形的伪元素的白色 Border 遮挡而消失了一部分。

- 继续观察线条，发现有的横线会消失，有的横线只会缩短而不会消失，所有竖线都只会缩短不会消失。

    根据竖线变长时，一定伴随着横线的缩短或消失，推测，格子在经历高度的变化，而不是位移。继续推测，三角形可能是跟随格子一起运动。

    再根据垂直方向两座山之间的横线和山的运动趋势是一样的，推测，图中横线是格子的上边而不是下边，下边都被遮住了。

    猜测山把格子的下边遮住了，但这与实际观察不符，因为，山在向上运动时，竖线的伸缩有伸缩。格子的边的一部分的消失并不是构成山的伪元素的 Border 遮挡而成的，而是另一个伪元素，大致也是矩形。

- 我们可以大概构成这副图案了：格子被束缚在了 align-items: center 的 Flex 布局中，三角形以及另一个类似矩形的伪元素随着格子的运动而运动。

嘛... 长吁一口气，要是上面没看懂的话，还是看下面这张图构好了。这是去掉白色遮罩物的样子。

![山与云图案解析](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/browser_leZw7Ch43e.png)

（谁帮我命个名儿） 

以下是 CSS 源码。

```scss
  .card {
    cursor: pointer;
  
    // 横线与竖线并不是节点的 Border，而是背景色+遮罩形成的
    // 格子会根据动画在高度上变化
    .node {
      background: #A45963;
      border-radius: 90%;
      animation: card-1 .4s ease alternate infinite;
  
      // 格子动画延迟处理
      &:nth-child(2n) {
        animation-delay: .2s;
      }
      &:nth-child(3n) {
        animation-delay: .3s;
      }
      &:nth-child(4n) {
        animation-delay: .3s;
      }
  
      // 山的颜色处理
      &:nth-child(2n)::before {
        border-bottom-color: #F5CB6C;
      }
      &:nth-child(3n)::before {
        border-bottom-color: #F5856C;
      }
      &:nth-child(4n)::before,
      &:nth-child(5n)::before,
      &:nth-child(6n)::before,
      &:nth-child(7n)::before,
      &:nth-child(8n)::before,
      &:nth-child(9n)::before,
      &:nth-child(10n)::before {
        border-bottom-color: #D2F3BF;
      }
      
      // 山的构成
      &::before {
        left: 0;
        top: -5px;
        border: solid 10px transparent;
        border-bottom-color: #D2F3BF;
        z-index: 2;
      }
  
      // 白色遮罩
      &::after {
        left: 1px;
        top: 1px;
        width: 19px;
        height: 18px;
        background: white;
      }
  
      // 这是一个特殊处理，为了让白色遮罩长度减少1像素以显示每行格子的背景颜色的最后一列像素
      &:nth-child(10n)::after {
        width: 18px;
      }
    }
  }
  
  @keyframes card-1 {
    from {
      height: 19px;
    }
    to {
      height: 8px;
    }
  }
```

### 冰崖上生长的仙人掌

![冰崖上生长的仙人掌图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/lALUw0IGT2.gif)

```html
  <div class="card">
    <div class="node" v-for="item in 100"></div>
  </div>
```

这张图比较简单。

- 易知格子由横线和虚线及背景颜色组成。

    易知圆柱状的“仙人掌”是每个格子单独控制裁切得来。

    半圆形到正方形变化的动画可以由 Clip-Path 属性裁切得来，推测竖线和横线分别是一种伪元素绘制。

以下是 CSS 源码。

```scss
  .card {
    .node {
      background: #71A2DB;
  
      // 部分仙人掌添加动画
      &:nth-child(3n)::after,
      &:nth-child(3n+2)::after,
      &:nth-child(5n-3)::after,
      &:nth-child(6n-2)::after,
      &:nth-child(7n+1)::after {
        animation: card-7-grow .6s ease alternate infinite;
      }
  
      // 一部分仙人掌不需要添加动画
      &:nth-child(3n-1)::after,
      &:nth-child(3n)::after,
      &:nth-child(5n)::after,
      &:nth-child(6n)::after,
      &:nth-child(7n-3)::after {
        clip-path: circle(75% at 0 50%);
        animation: none;
      }
  
      // 这里使用的是背景色 + Box-Shadow 画线。也可以使用 Border + Box-Shadow 画线
      &::before {
        top: 1px;
        left: 0px;
        width: 100%;
        height: 1px;
        background: white;
        box-shadow: 0 2px white, 0 4px white, 0 6px white, 0 8px white, 0 10px white, 0 12px white, 0 14px white, 0 16px white, 0 18px white;
      }
      &::after {
        top: 0;
        left: 1px;
        width: 1px;
        height: 100%;
        background: white;
        box-shadow: 2px 0 white, 4px 0 white, 6px 0 white, 8px 0 white, 10px 0 white, 12px 0 white, 14px 0 white, 16px 0 white, 18px 0 white;
        transition: .6s;
      }
    }
    
    // 鼠标悬浮时显示所有的线条（为了使 Clip-Path 有过渡效果，这里不能直接去掉属性，而是要换一个较大的值）
    &:hover {
      .node {
        &::after {
          animation: none;
          clip-path: circle(150% at 0% 50%);
        }
      }
    }
  }
  
  @keyframes card-7-grow {
    from {
      clip-path: circle(50% at 0 50%);
    }
    50% {
      clip-path: circle(50% at 0 50%);
    }
    to {
      clip-path: circle(150% at 0 50%);
    }
  }
```

### No Name 2

![无题](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/browser_OK4VHnjq1J.png)

这个玩意儿是上一张图的升级版本，误导可能在会猜测伪元素是点，而不是线，然后用空出的一个伪元素去构造菱形格子内其它东西。

```scss
  .card:nth-child(8) {
    .node {
      border: solid 8px #71A2DB;
      border-top: 0;
      border-left: 0;
      background: #71A2DB;
      clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0% 50%);
      transition: .3s;
      cursor: pointer;
  
      // 给一部分格子去掉 Border
      &:nth-child(3n-1),
      &:nth-child(3n),
      &:nth-child(5n),
      &:nth-child(6n),
      &:nth-child(7n-3) {
        border: none;
        clip-path: circle(50%);
  
        &:hover {
          clip-path: circle(30%);
        }
      }
  
      // 将一部分格子裁剪为菱形区域。Clip-Path 四个值对应菱形四个顶点位置。
      &:nth-child(2n),
      &:nth-child(3n) {
        border: solid 8px #CCDDF2;
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0% 50%);
      }
  
      &::before {
        top: 1px;
        left: 0px;
        width: 100%;
        height: 1px;
        background: white;
        box-shadow: 0 2px white, 0 4px white, 0 6px white, 0 8px white, 0 10px white, 0 12px white, 0 14px white, 0 16px white, 0 18px white;
      }
      &::after {
        top: 0;
        left: 1px;
        width: 1px;
        height: 100%;
        background: white;
        box-shadow: 2px 0 white, 4px 0 white, 6px 0 white, 8px 0 white, 10px 0 white, 12px 0 white, 14px 0 white, 16px 0 white, 18px 0 white;
      }
    }
  }
```

### 挤冰淇淋

![挤冰淇淋图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/tLBNQ2phFI.gif)

(⊙﹏⊙)，我不是故意画这么恶心的，是因为他要用到 CSS contrast 滤镜，这个滤镜会增加对比度，提亮亮色。

融合效果的原理是这样的：在父元素使用一个 contrast 滤镜，在子元素使用 blur 滤镜，会发现，子元素在互相接近时，会产生融合效果。

图片边框的处理方法应该很常见了，用 Background-Image 就能搞定，此外，《CSS Secret》还提到一种使用 Background 渐变叠加的方式产生图片边框，各位也可以尝试以下（广告：来 Lionad 的[全干交流群](https://jq.qq.com/?_wv=1027&k=5FnYN8L) 805392878，群里有各种书籍资料以及好玩的东西）

下面就直接给代码了。

```scss
  // 可以看到父元素用到了 filter: contrast 滤镜
  .card {
    position: relative;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border: solid .5em transparent;
    border-image: 8 repeating-linear-gradient(-45deg, #F5E66C 0, #F5E66C .5em, transparent 0, transparent 1em, #DA60D2 0, #DA60D2 1.5em, transparent 0, transparent 2em);
    background: white;
    cursor: pointer;
    filter: contrast(10);
    
    // 给每个格子分别设定背景颜色和动画延迟
    $background:(#DA60D2, #E7667E, #E7667E, #F5866C, #F5866C, #F5E66C);
    @for $i from 1 through 6 {
      .node:nth-child(#{$i}) {
        width: (80-(10 * ($i - 1)))+unquote('px');
        animation: card-6 .8s ease-in (0.1*$i)+unquote('s') alternate infinite, card-6-margin .8s ease-in alternate infinite;
        background: nth($background, $i);
      }
    }
  
    // 格子使用了 blur 滤镜
    .node {
      flex-basis: 30px;
      margin-top: -15px;
      width: 30px;
      height: 50px;
      filter: blur(5px);
    }
  
    // 鼠标悬浮时暂停动画，因为子元素的融化效果，所以需要把字体调粗一些
    &:hover {
      &::before {
        content: "Paused";
        position: absolute;
        left: 5px;
        top: 5px;
        font-weight: bolder;
      }
      .node {
        animation-play-state: paused;
      }
    }
  
    @keyframes card-6 {
      from {
        border-radius: 50%;
      }
      to {
        width: 80px;
        border-radius: 0;
      }
    }
    @keyframes card-6-margin {
      from {
        margin-top: -13px;
      }
      to {
        margin-top: 0px;
      }
    }
  }
```

### Lionad

![Lionad的名称](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/uhhDQH3g3L.gif)

马上就到胜利的尾声了，坚持住！w(ﾟДﾟ)w

```html
  <div class="card 5">      
    <div class="node" />   
  </div>
```

这是我们第一次碰上背景移动的情况，不过这张图片组成简单，以下是分析。

- 背景的移动不外乎都是 CSS Animation + Background-* 属性完成的。此图的背景渐变是一个简单的 45deg 的两条纹理渐变，
推测背景使用了 Animation + Background-Position 进行平移。
- 再看文字部分，易得文字是由一个带 180deg 渐变的背景 + Text-Shadow 组成。

    文字可以使用渐变背景？对，通过 Background-Clip 可以实现文字对背景图案裁剪功能。

    由于 Text-Shadow 的颜色比渐变深，但是观察发现 Text-Shadow 并没有被裁剪进入字体中，推断文字应该是由两个伪元素组成的，
    使用 Background-Clip 属性的伪元素层级要比使用 Text-Shadow 的伪元素高。

- 最后是文字下面两道横线。这个的画实现方法太多了，双伪元素 Border 也可，Box-Shadow 也可，Border-Image 也可，Background-Image 也可...

下面看源码。

```scss
  .card {
    background: linear-gradient(45deg, #F5CB6C 0%,#F5CB6C 20%,#F5856C 20%, #F5856C 45%,#F5CB6C 45%,#F5CB6C 70%,#F5856C 70%, #F5856C 95%,#F5CB6C 95%,#F5CB6C 100%);
    background-size:30px 30px;
    background-position:0 0;
    animation: card-5 1s infinite linear;
    cursor: pointer;
  
    .node {
      // 使用 Background-Clip 的伪元素
      &::before {
        content: "Lionad";
        left: -1.5em;
        top: -.7em;
        font-size: 50px;
        font-family: didot;
        font-weight: bolder;
        color: transparent;
        background: linear-gradient(180deg, #F5CB6C, #F5856C);
        background-size: 1px 2px;
        background-clip: text;
        -webkit-background-clip: text;
        z-index: 2;
      }
  
      // 生产 Text-Shadow 的伪元素
      &::after {
        content: "Lionad";
        left: -1.5em;
        top: -.7em;
        font-size: 50px;
        font-family: didot;
        font-weight: bolder;
        color: transparent;
        text-shadow: 4px 4px 0px #F5856C;
        box-shadow: 0 5px 0px #F5CB6C, 0 12px 0px #F5856C;
      }
    }
    @keyframes card-5 {
      0%{
        background-position: 0 0;
      }
      100%{
        background-position: 30px 0;
      }
    }
  }
```

### 万花筒

![万花筒图案](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/rstkkpB6P1.gif)

```html
  <div class="card 10"></div>
  <div class="card 11"></div>
```

把这两个图案放到一起是因为思路是一样的。实话说，第一次见到这种花纹，我也对这莫名其妙的色彩变化一脸懵逼，所以这里就直接讲原理了。

- 两张图片都是用渐变画的，仔细观察能发现左边和右边的图案都是三层渐变的叠加。

    不同的地方在于，左图最小的那层渐变是辐射渐变（Radial-Gradient），右图的则是圆锥渐变（英文叫 Conic-Gradient，饼图就可以用这玩意儿画）

- 莫名其妙的颜色变换（如左图中心点）使用的是 CSS 混合模式（CSS Blend-Mode）效果，它负责计算当两种色彩层叠在一起时最终显示的颜色，可以理解为滤镜。
- 背景移动之前看过，左图是变换 Background-Position，右图是变换 Background-Size

以下是源码。

```scss
  // 右图的样式代码
  .card {
    
    // 这里使用了三层背景渐变，两层圆锥渐变和一层辐射渐变
    background-image:
      repeating-conic-gradient(red 50%, #E1F5C4 60%),
      repeating-conic-gradient(red 50%, #E1F5C4 60%),
      radial-gradient(
        gold 0%, gold 35%,
        red 35%, red 40%,
        orangered 40%, orangered 50%,
        gold 50%, gold 60%,
        yellowgreen 60%, yellowgreen 70%,
        skyblue 70%, skyblue 80%,
        steelblue 80%, steelblue 90%,
        violet 90%
      );
    
    // 对每一层被渐变分别设置混合模式
    background-blend-mode: 
      lighten, 
      overlay,
      lighten; 
    
    // 对每一层被渐变分别设置背景大小（40px 是因为正好能被 200px 的盒子整除）
    background-size: 
      40px 40px,
      6em 6em,
      8em 8em;
    background-position: 50% 50%;
    transition: .45s ease-in;
    cursor: pointer;
  
    // 鼠标悬浮时，变换渐变大小
    &:hover {
      background-size: 
        40px 40px,
        4em 4em,
        12em 12em;
    }
  }
```

### トラ酱（Tiger酱）

![Lionad的头像](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/browser_Uufg8gfFWn.png)

一整图片而已，有啥了不起的？

不，这不是图片。

你以为有外链么？不，没有。这是仅用 Box-Shadow 绘制成的トラ酱。

它的 CSS 代码长这样：

```scss
  // 灰色 Border
  .card {
    justify-content: flex-start;
    align-items: flex-start;
    border: solid 10px #eee;
    box-sizing: border-box;
    overflow: hidden;
  
    // トラ酱
    .node {
      width: 1px;
      height: 1px;
      box-shadow: ????? 你猜，使劲儿猜这后面有多长
    }
  }
```

至于具体原理的话，害，看我掘金的上篇文章吧。

---

## 练习题

最后，这里有几个需要稍微思考的练习，给尚存斗志的同学实践~~（我不是白嫖！）~~。

1. 《トラ酱》，利用 Box-Shadow + CSS Animation 实现 GIF 的播放
2. 《冰崖上生长的仙人掌》，能不能让这些横着长的仙人掌生长的长度超过两格？

哦对了，千万别问我这些练习题有啥用。

这些练习题的作用就和我画的这些图案一样——我也不知道有啥用，只是好玩。

话说回来，掘金上的老哥们都是技术流选手，每天都投面试的文章，太死板了。都不整些花里胡哨的东西，难怪找不到女票~~（如有雷同，请对号入座，手动狗头(￣ε(#￣)）~~。

---

## **LAST BUT IMPORTANT**

<p style="color: red;font-weight: bold">点赞、关注、评论三连，三天后从掘金文章评论中抽奖送一本<a rel="nofollow" href="https://book.douban.com/subject/5323008/">《超越平凡的版式设计》</a></p>

这是一本不错的排版案例参考。

前端工程师也要好好学设计哟~ ヽ(￣ω￣(￣ω￣〃)ゝ

![《超越平凡的版式设计》](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200415/TIM20200416035604.jpg)

## 阅读更多

本文撰写时用到的相关网站或是参考资料

* [CSS Doodle](https://css-doodle.com/) : CSS Patterns 终极解决方案
* [NIPPON COLORS](https://nipponcolors.com) : 一个好看的日系配色网站
* [OXXO STUDIO](https://www.oxxostudio.tw/articles/201408/sticky-ball.html) : 质量很高的前端博客，《挤冰淇淋》中的效果就这来的
* [Code Pen @JiaQianKoh](https://codepen.io/swifty_star4/pen/QPgaxe) : 这个页面有各种渐变特效
* [Patternify](http://www.patternify.com) : 有意思的像素背景生成网站，终于不用写代码了害...
* [CSS3 Patterns](https://leaverou.github.io/css3patterns/) : 《CSS Secrets》作者写的 CSS Patterns 网站，不必我多说了吧...

我的博客有源码 [Lionad's Blog](http://localhost:8080/articles/9张看面试题也写不出来的CSS图案.html)。

转载随意，注明出处掘金及名 Lionad 即可。

