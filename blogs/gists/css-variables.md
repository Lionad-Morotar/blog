# CSS 变量

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/%40property_%20giving%20superpowers%20to%20CSS%20variables.html' source='https://web.dev/at-property/' >《@property: giving superpowers to CSS variables》</Link>

<Article-A200903-Transition />

Una Kravets 展示了一个利用变量渐变制作动画效果的示例。

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

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E7%8E%A9%E8%BD%AC%20CSS%20%E5%8F%98%E9%87%8F%20-%20wsafight%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A9%BA%E9%97%B4%20-%20OSCHINA.html' source='https://my.oschina.net/wsafight/blog/4519102' >《玩转 CSS 变量》</Link>

我们可以利用 CSS 变量的空值来制作逻辑运算[^logic-compute]。

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

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/CSS%E5%8F%98%E9%87%8F%E5%AF%B9JS%E4%BA%A4%E4%BA%92%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E5%B8%A6%E6%9D%A5%E7%9A%84%E6%8F%90%E5%8D%87%E4%B8%8E%E5%8F%98%E9%9D%A9%20%C2%AB%20%E5%BC%A0%E9%91%AB%E6%97%AD-%E9%91%AB%E7%A9%BA%E9%97%B4-%E9%91%AB%E7%94%9F%E6%B4%BB.html' source='https://www.zhangxinxu.com/wordpress/2020/07/css-var-improve-components/' >《CSS变量对JS交互组件开发带来的提升与变革》</Link>

因为 CSS 变量根据优先级进行匹配，所有非常适合把它放到 :root 根元素选择器中，作为一个默认的值（或全局值）使用。结合 JS，可以作为一个天然的 JS/CSS 接口，用于设置全局样式。

![涟漪点击效果 | https://www.zhangxinxu.com/wordpress/2020/07/css-var-improve-components/](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/button-click-piple.gif)
