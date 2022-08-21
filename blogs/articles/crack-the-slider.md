---
meta:
  - name: keywords
    content: 滑动验证码,滑块验证码,滑动验证码破解,验证码破解,图像识别,爬虫验证码,爬虫滑动验证码,爬虫滑块验证码,图像对比,自动化
  - name: description
    content: 如何破解滑块验证码？本文介绍了使用Puppeteer操作浏览器进行图片对比、图片识别及优化鼠标轨迹以模仿真是用户等几种简单爬虫验证码破解思路，适用多种场景。
---

# 🕷️ 滑动验证码破解思路

[TOC]

昨天在掘金看到推荐文章[《从零开发一款轻量级滑动验证码插件》](https://juejin.cn/post/7007615666609979400)，介绍了一些相关验证码及框架开发的知识点。巧的是就在前两周，我们公司举办了一个爬虫攻防赛，其中用到多种爬虫验证的破解方法，之一就是滑块验证码。

今天在这篇文章里给大家介绍一下怎么使用 JS 破解滑块验证码。

![最终效果（加速）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/73ba97c7435f.gif)

<JJ>文章末尾有源码链接，需要的朋友可以自取，不过拿走之前记得三连哇！</JJ>

## 思路讲解

### 操作浏览器打开页面

滑块验证码是滑动验证码的一种，生成流程至少包含三步：

1. 根据用户标识，从后台获得验证码图片
2. 监听鼠标事件并回传后台
3. 后台判断事件的真伪，回传验证结果

无论生成机制的细节如何，滑块终究是要展示在页面上的。直接用 HTTP Request 把页面 HTML 请求下来肯定不行，这里我们需要使用 Puppeteer 打开网页进行渲染。测试页面就以 [react-slider-vertify](http://h5.dooring.cn/slider-vertify) 的官网为例。

[Puppeteer](http://puppeteerjs.com/) 是一个通过 DevTools 协议来控制浏览器行为的库，只需编写不多的代码，就可以操作真实的浏览器搞定诸如爬虫、自动化测试、网页性能分析、浏览器扩展测试等功能。使用起来比较方便，文档齐全。根据文档，打开页面前需要启动一个浏览器实例，然后调用 newPage 方法创建一个新页面。核心代码如下。

```js
const puppeteer = require('puppeteer')

puppeteer.launch().then(async browser => {
  const page = await browser.newPage()
  await page.goto('http://h5.dooring.cn/slider-vertify/vertify')
})
```

![打开页面测试](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/jpoVF4UbuI.gif)

正常浏览网页时，很少会碰到滑块验证，因为它的路径非常长，会需要浪费用户好一会儿时间。虽然文案上给你显示“恭喜 0.9s 打败了 99% 的用户”，但从前置脚本请求，到加载图片，用户滑动滑块，到回传验证...前前后后的步骤加起来可能花了你 9s 不止。本质上它是防御性的手段，一般当服务器限流，或者服务器已经怀疑你是爬虫的时候，才会让它跳出来要求做进一步验证。所以一般来说，爬虫代码可以默认忽略滑块验证的，不过本文代码我们就假定默认验证码一定存在吧。

接下来，分析一下用户行为。解决滑块验证，无非就是先判断一下缺口的位置，然后移动鼠标。这里进一步可以细分为鼠标的点击事件和鼠标移动事件两种。代码逻辑大致如下。

1. 等待验证码图片加载完毕
2. 移动鼠标到滑块位置
3. 按下鼠标
4. 移动鼠标到缺口位置
5. 松开鼠标
6. 等待结果返回

啊，流程我都知道，可问题就在，怎么判断要把鼠标移动到哪里？服务器端返回的是一张带缺口的图片，缺口位置指定是不通过接口传递的。

可能还有些同学会问，怎么移动鼠标呢？如果我一次性就把滑块给移到指定位置了，那服务器不是会立马把我标记为爬虫嘛... 这两个问题我逐一解答。

### 判断缺口位置

要分析缺口的位置，我们必须先知道这个缺口是怎么画上去的。打开控制台初步检查可以发现，页面从服务器先拿到了一张完整的图片，然后缺口位置是通过 JS 随机生成的。啊这...这...这是因为我们用的测试页面是文档页，大家不必在意这些安全方面的小细节。

![找到请求](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210918184414.png?type=win11)

接着刚才的思路继续，既然缺口是从原图中挖的一个洞，那么我们只需要识别一下图片中洞的位置就好了。比较简单的方案是使用第三方的图像识别技术（或相关技术），把图片上传至第三方，就直接拿到缺口位置的相对坐标。下图给大家展示一下阿里云的图像分割的效果[^alimagic]。

![阿里云图像分割](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/itLO6bbCMH.gif)

如果想做一个效果稳定一点的验证码破解工具，我建议大家还是用自己的模型，或者自己写算法。一来是第三方要的钱钱不少哇~ 再就是这种图像识别并不是专门为验证码训练的，所以放到爬虫中还不太成熟，**一旦背景图片复杂，识别率下降得老快了**。

![百度云图像主体识别](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210918191220.png)

以下介绍一种新思路。反正我们已经有一张完整的图片了，那就只要不断地滑动滑块，把结果和原图比对就行。理论上，只要滑倒差不多“那个点”，肉眼看起来不会有很大的违和感时，就搞定了。比如下面这张图。

![和原图进行比对](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210918192111.png)

截图嘛可以直接用 Pupeteer 的截图功能，它提供了对应的 API，可以精准的截出特定元素。

至于图片比对，其实就是给图片初步处理后，两张图一个像素一个像素的去比较。**两个像素如果颜色差异超过阈值，就认为这是两个不相同的像素**。简便起见，我们直接用开源库 [rembrandt](https://github.com/imgly/rembrandt)，它会给我们返回两张图片间的差异。

最后是滑动滑块，既然要模拟人肉操作，那么操作 CSS，用绝对定位，把滑块一个像素一个像素的向右移；每移动一次，把图像比对的结果记录下来。

以上三个流程的核心代码非常简单，只需要以下几行：

```js
while (left <= maxOffset) {

  /* 使用 CSS left 属性控制悬浮的滑块的偏移量 */

  await page.evaluate(async ($sliderFloat, left) => {
    $sliderFloat.setAttribute('style', `left: ${left}px`)
  }, $sliderFloat, left)

  /* 截图并和原图进行比对，把结果存到 results 数组里 */

  const $panel = await page.$('#Vertify-demo-4 .canvasArea')
  const panelImgBase64 = await $panel.screenshot({
    type: 'jpeg'
  })
  const compareRes = await rembrandt({
    imageA: panelImgBase64,
    imageB: rawImage
  })
  results.push({
    left,
    diff: compareRes.differences
  })

  left += 1
}
```

![通过CSS控制位移](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/9KgejUuCru.gif)

最后，把 results 扔到里面展示一下（这里给个 ECharts [折线图示例网址](https://echarts.apache.org/examples/zh/editor.html?c=line-simple)），不出意外能得到这样一张图表。看到那个尖尖的“V”型山谷了嘛，呼哈哈哈，答案很明显，当我们把滑块从左往右移动时，滑块约接近缺口，那截出来的图片就越像原图，它两之间像素差异越小；一直往右移动，滑块会逐渐远离缺口，截出来的图片和原图相比像素差异又逐渐开始增大。我们只需要把差异最小的那个点找到，然后滑动滑块到对应的 left 偏移量就阔以了。

![图像比对结果](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210918203306.png)

题外话，为什么最大的差异在 3000 左右呢？我们简单估算一下。

滑块的大小为 45*45，再加上外面的圆形，约摸占了 2100 像素；也就是说缺口加滑块，理论上最大会有 4200 个像素和原图不同。不过滑块可能和遮住的地方像素有重合，假设重合了 350 像素，再加上我们的最低点的图片差异都有 351，减去这些误差，得 3499。呜呼，3499 约等于 3000，估算成功（手动狗头）。

### 速度优化技巧

不过这还没完，你要是把代码跑起来就会发现，卧草，太慢了这玩意儿！正常人划一下验证码顶多两秒钟的事儿，我们一帧一帧截图得花个 40s 的时间才能截完图算出山谷谷底的值来。

这里提供几种思路优化效率：

1. 把元素缩小，复制多份，平铺开来展示；这样只要截一次，然后再裁剪、比对就好。
2. 放大步长，比方说先每次平移 15px，找到局部最优解，然后在局部最优解附近再回到平移 1px 的方案找最优解。
3. 因为图片比对的结果类似“V”字，“V”字右半边其实是可以不用再计算的。

使用 1+2+3 我觉得可以在 3s 内搞定最优解，不过代码复杂度会变得很高，文中简单起见暂只实现一下方案 2。

首先是每次移动 15px 找局部最优解。

```js
// 图片缺口是不会给挖在初始附近的，
// 所以 left 从 45 像素开始计算可以节约不少计算量，
let left = 45;
const max15Offset = 265;
const res15px = [];
while (left <= max15Offset) {
  await setLeft(left);
  const compareRes = await compare();
  res15px.push({
    left,
    diff: compareRes.differences,
  });
  left += 15;
}
```

然后再尝试每次移动 2px 找最优解，搜寻的范围是 15px 步长最优解的 left 偏移量的左右共 20 个像素。

```js
const min15pxDiff = Math.min(...res15px.map((x) => x.diff));
const min15pxLeft = res15px.find((x) => x.diff === min15pxDiff).left;

left = min15pxLeft - 12;
const max2Offset = min15pxLeft + 8;
const res2px = [];
while (left <= max2Offset) {
  await setLeft(left);
  const compareRes = await compare();
  res2px.push({
    left,
    diff: compareRes.differences,
  });
  left += 2;
}
```

此时得到的解可以约等于最优解了。当然，如果你觉得不稳的话，还可以使用 1px 步长去找。

估算一下，原先需要截 245 次图片，现在直接降到 1/10，23 次。不过，也别太高兴，因为测试发现只做优化 2，解验证码的时候还是要 7s...

### 操作鼠标滑滑块

缺口位置都搞定了，那移鼠标滑滑块儿还不简单嘛~

Puppeteer 已经提供了[鼠标相关的接口](http://puppeteerjs.com/#?product=Puppeteer&version=v10.2.0&show=api-class-mouse)，一共四个：mouse.click、mouse.down、mouse.move、mouse.up，分别是点击、按下、移动和松开。使用 mouse.move 可以直接把鼠标位置移动到一个特定的坐标上。假设我们现在从坐标（100,100）花大约 1s 把鼠标移动到 （200,200），可以使用循环实现。

```js
const now = {
  x: 100,
  y: 100
}
const target = {
  time: 1000,
  x: 200,
  y: 200, 
}
const steps = 10
const step = {
  x: Math.floor((target.x - now.x) / steps),
  y: Math.floor((target.y - now.y) / steps),
  time: target.time / steps
}
while (now.x < target.x) {
  await sleep(step.time)
  now.x += step.x
  now.y += step.y
  await page.mouse.move(now)
}
```

### 鼠标轨迹优化

害，要是打游戏的时候也像这段代码一样，我想我的手点到哪儿它就点到哪儿就好了~

机器是不会手抖的，这段代码和真实世界的滑动效果相差太远了！我们看一张我用手滑的效果，尤其是要仔细观察滑动过程中鼠标的位置。

![鼠标轨迹不稳定](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/soov8Gny09.gif)

* 鼠标 Y 轴位置总是在变
* 鼠标 X 轴位置会滑过头（别笑，你肯定也经常划过头）

这里做一波小优化，把这两个细节整合进去。

```js
// 获得一个随机的偏移量
const getRandOffset = (randNegative = true, max = 3) => {
  const negative = randNeagtive
    ? (Math.random() < 0.5) ? -1 : 1
    : 1
  return Math.floor(Math.random() * max) * negative
}

// 先滑过头十几像素，然后再花 100 毫秒的时间往回滑到正确位置
const points = [
  {
    time: 1000,
    x: 200 + getRandOffset(false, 15),
    y: 200 + getRandOffset(false, 15),
    steps: 10
  },
  {
    time: 100,
    x: 200,
    y: 200,
    steps: 3
  }
]

// 注意这里用 for await 循环把 points 串起来执行
for await (const target of points) {
  const step = {
    x: Math.floor((target.x - now.x) / target.steps),
    y: Math.floor((target.y - now.y) / target.steps),
    time: target.time / target.steps,
  }
  let gap
  while (gap = Math.abs((target.x - now.x)), gap > 0) {
    await sleep(step.time)
    // 最后一步就直接滑动到位，不需要随机数了
    const inOneStep = Math.abs(target.x - now.x) <= Math.abs(step.x);
    if (inOneStep) {
      now.x = target.x;
      now.y = target.y;
    } else {
      now.x += step.x + getRandOffset();
      now.y += step.y + getRandOffset();
    }
    moveMouseTo(now)
  }
}
```

如何移动鼠标到这里就解决了，如果要考虑加速度、用户习惯等因素，代码会复杂许多，暂时就不深入讨论啦，有兴趣的同学可以自己研究。

最终效果见下图。

![最终效果（加速）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/73ba97c7435f.gif)

源码地址在此：[CrackTheShield](https://github.com/Lionad-Morotar/crack-the-shield/tree/master/tasks/dooring-slider)。

## 阅读更多

<JJ>**希望本文能对你有所帮助，我是仿生狮子，各位下期见~** </JJ>

<JJ>想看看这篇文章是如何被创造的？你能从我的[博客项目](https://github.com/Lionad-Morotar/blogs)中找到答案；欢迎 Star & Follow；也请大家多来我的[线上博客逛逛](https://www.lionad.art)，排版超 Nice 哦~</JJ>

---

* [《Python爬虫的实际运用之：破解滑动验证码》](https://juejin.cn/post/6945336161468416037)，这个老哥用了图像边缘检测的方法来判断缺口所在位置。
* [《震惊! 滑动验证码竟然能这样破解》](https://juejin.cn/post/6844903679808520205)，这个老哥用了一种看谁脸黑的办法来判断图片的缺口所在位置。

[^alimagic]: [测试地址](https://vision.aliyun.com/experience/detail)