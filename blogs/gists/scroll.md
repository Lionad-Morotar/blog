# 博客改版碰到的浏览器平滑滚动问题

[TOC]

## 首页的平滑滚动

博客首页是用的《Fire Watch》的背景。把《Fire Watch》的标志性建筑瞭望塔给去掉了，再将树木和山脉分层，加上 Z 轴偏移，做成了视差滚动的效果，源效果来自[Sam@CodePen](https://codepen.io/samdbeckham/pen/OPXPNp?__cf_chl_jschl_tk__=8b2b5fd06b1808c95b1f1b4eeedb5553d2418f12-1590561931-0-AfpnQU_huRWKSh2feM7asMrk7pyIe_V1nBH6nKqh_4707GbhF3k9rzmGFEKv8-vhjNSaWeS4aHV_7cpQqkngS8nHPUKpMmrlOCtXGPJ4CN54wK43Cbiaa9AWa9IxyJNgPYb8cS8qJifev845u63mRG8RKXWimUG7fOHRVs8YD4NYL0JeUnZ_qX4AVLoF9-7dMLSSBZYJULtOyoHk3k4ZSQrO4_fLLj0Bh7iB2eeGME2L4HcJMefwT-7NnN1rKLRpsNLGycYsC8OC33BthcrudOgxwt4A-E7VRojRSM0HrZCA4Zc6wM0dkFjoTiYfL5a5aBS3fE8MdN-lydtqI_8LwWQZhtZgt30Uyw45CwZ1M02G)。

这个效果其实有点坑，因为虽然能鼠标滚动，但是不方便自由布局，所以一开始用了一个不太“有准数”的方法实现了下效果：

<img
  srcset="
    https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/gists/2020-05-28-02-38-22_960.gif 960w,
    https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/gists/2020-05-28-02-38-22_1920.gif 1440w"
  src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/gists/2020-05-28-02-38-22_1920.gif"
  alt="博客首页效果"
/>

* 用两个 a 标签置于页面最上方和最下方
* JS 捕获鼠标滚轮向下和向上，分别点击两个 a 标签，跳转到页面顶部或底部
* 给对应容器加上 CSS `scroll-behavior: smooth`
  
这次博客改版，我写了一个通用的手势处理组件，可以兼容鼠标滚轮、鼠标手势和移动端手势，此外，还特意给首页和阅读页面做了不同分辨率及缩放比例的响应式样式兼容，以及重写了这个平滑滚动的逻辑。

不过，预计一个下午弄完的功能，愣是一直折腾到晚上... 坑就坑在这个平滑滚动上...

## 更完善的写法

我将 Scroll 函数写在页面 Vue 实例的 Method 方法里，当捕获到鼠标手势时（如 SwipeDown），就执行它。代码如下：

```js
export default {
    methods: {
        scroll(ele, height, time = 800) {
            const frameTime = time / (1000 / 60)
            const currentTop = ele.scrollTop
            const frameHeight = Math.round((height - currentTop) / frameTime)
            const toBottom = currentTop < height

            // 每一次 run ，都会给 ele.scrollTop 进行累加
            const run = () => {
                const store = ele.scrollTop
                ele.scrollTo(ele.scrollLeft, store + frameHeight)

                const continueGoBottom = toBottom && store + frameHeight < height
                const continueGoTop = !toBottom && store + frameHeight > height
                const go = continueGoBottom || continueGoTop

                go && window.requestAnimFrame(run)
            }
            run()
        }
    }
}

// 调用代码（省略部分）
this.scroll(document.querySelector('.parallax'), 999)
```

预期是，每次 Run 函数执行时，ele 的 scrollTop 值都会改变，但是出现了一个很诡异的问题，如果只执行一次 Run 函数，则 ele.scrollTop 值能改变，树林和山脉能看见变化；如果加上了 `window.requestAnimFrame(run)`，ele.scrollTop 的值就始终为零。

我写了一个预期应该实现的功能的 Demo。为了节约流量，我把运行代码的组件去掉了，你可以在 CodePen 里面试试这段代码。

```js
window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function scroll(ele, height, time = 800) {
    const frameTime = 800 / (1000 / 60)
    const currentTop = ele.scrollTop
    const frameHeight = (height - currentTop) / frameTime
    const toBottom = currentTop < height

    const run = () => {
        const store = ele.scrollTop
        ele.scrollTop = store + frameHeight

        const go = (toBottom && store + frameHeight < height) || (!toBottom && store + frameHeight > height)
        go && window.requestAnimFrame(run)
    }
    run()
}

const $scrollArea = document.querySelector('.scroll-area')

document.querySelector('.btn1').addEventListener('click', () => scroll($scrollArea, 500))
document.querySelector('.btn2').addEventListener('click', () => scroll($scrollArea, 1000))
```

```html
<div class="scroll-area" style="border:1px solid black;width:200px;height:200px;overflow:auto">
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
    This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.
</div>
<br />
<button class="btn1">滚动到 500px</button>
<button class="btn2">滚动到 1000px</button>
```

## 排查缺陷

琢磨了两个多小时我就卡在这上面，期间也没有在网上搜索到类似的问题。于是我尝试引入 jQuery 相关插件，看看插件是怎么做的：

```js
// 执行逻辑（省略引入 jQuery 和 jQuery.scrollTo 插件）
$(document.querySelector('.parallax')).scrollTo(toHeight)
```

使用 jQuery.scrollTo 插件，可以正常进行滚动动画的，于是我瞥了一眼源码（其实还特意找了 zepto@v1.1 的源码），jQuery.scrollTo 改变 scrollTop 的方式和我的思路是一样的，只是作为库，代码要更加健壮一些，此外并没有发现什么有特殊的需要注意的地方。

无解... 但我不可能因为这个问题专门引入 jQuery 及其插件，所以还得换种写法

## 朴素，朴素

我把 a 标签的逻辑去掉了，直接使用 scrollTo 函数进行滚动，这样的话，至少在支持 `scroll-behavior: smooth` 的浏览器中，平滑滚动功能正常，同时不至于像原先那样“不规范”。

```js
this.$refs.parallax.scrollTo
    ? this.$refs.parallax.scrollTo(0, toHeight)
    : (this.$refs.parallax.scrollTop = toHeight)
```

的，

最后实测了一下，PC 阔以，安卓主流浏览器阔以，IOS 兼容一如既往地极差（IOS Safari 本身就不支持我的首页的 Z 轴偏移视差滚动效果，所以真的是一塌糊涂）。

嘛，暂时弃坑，博客要更新的内容太多了，还得抓紧时间完善一下其它东西。

