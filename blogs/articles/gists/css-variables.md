# CSS 变量

## 基础

### 值的注册

CSS 变量允许以下值：

* $length$
* $number$
* $percentage$
* $length-percentage$
* $color$
* $image$
* $url$
* $integer$
* $angle$
* $time$
* $resolution$
* $transform-list$
* $transform-function$
* $custom-ident$ (a custom identifier string)

## 探索

### 变量渐变

Una Kravets 展示了一个利用变量渐变制作动画效果的示例[^transition-variable]。

<Article-A200903-Transition />

但目前只有注册的自定义属性才支持渐变，也就是说，你必须这样声明变量：

```css
@supports (background: paint(houdini)) {
  @property --stop {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 40%;
  }
}
.anim {
  /* fallback */
  --stop: 40%;
  background: linear-gradient(pink var(--stop), orange calc(var(--stop) + 20%));
}
```

[^transition-variable]: [@property: giving superpowers to CSS variables](https://web.dev/at-property/)

### 逻辑运算

尽管 CSS 变量的值支持空字符串，但是它并不支持 $initial$。我们可以利用这一特征作逻辑运算[^logic-compute]。

```less
.box {
  /* --tog1 --tog2 --tog3 同时为 空值时是 红色 */
  --red-if-and: var(--tog1) var(--tog2) var(--tog3) red;
}
.box {
  /* --tog1 --tog2 --tog3 任意为 空值时是 红色 */ 
  --red-if-or: var(--tog1, var(--tog2, var(--tog3))) red;
}
```

[^logic-compute]: [玩转 CSS 变量](https://my.oschina.net/wsafight/blog/4519102)

### JS/CSS 接口

由于 CSS 变量根据优先级进行匹配，所有非常适合放到 :root 根元素选择器中，作为一个默认的值（或全局值）使用。结合 JS，可以作为一个天然的 JS/CSS 接口，用于设置全局样式。

比如，张鑫旭的博客中就提到，可以把点击页面任意位置的坐标信息用 JS 设置全局 CSS 变量，解耦动画与坐标信息之间的依赖[^js-css-api]。

[^js-css-api]: [CSS变量对JS交互组件开发带来的提升与变革](https://www.zhangxinxu.com/wordpress/2020/07/css-var-improve-components/)

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/button-click-piple.gif)

## 阅读更多