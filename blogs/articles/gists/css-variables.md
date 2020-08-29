# CSS 变量

记录一些 CSS 变量的高级应用。

## 逻辑运算

尽管 $CSS Variables$ 的值支持空字符串，但是它并不支持 $initial$。我们可以利用这一特征作逻辑运算[^logic-compute]。

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

## JS/CSS 接口

由于 $CSS Variables$ 根据优先级进行匹配，所有非常适合放到 :root 根元素选择器中，作为一个默认的值（或全局值）使用。结合 JS，可以作为一个天然的 JS/CSS 接口，用于设置全局样式。

比如，张鑫旭的博客中就提到，可以把点击页面任意位置的坐标信息用 JS 设置全局 $CSS Variables$，解耦动画与坐标信息之间的依赖[^js-css-api]。

[^js-css-api]: [CSS变量对JS交互组件开发带来的提升与变革](https://www.zhangxinxu.com/wordpress/2020/07/css-var-improve-components/)

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/button-click-piple.gif)