# Markdown Inline Style

[TOC]

通过 VuePress 可以在 Markdown 文件中嵌套 HTML 和 VueJS 代码，然而贴到掘金之后需要我手动贴图，太麻烦了。

于是我测试了几种 Inline CSS 的方案：

* [MarkdownNice](https://mdnice.com/)
* [InlineCSS](https://github.com/jonkemp/inline-css)

不过结果都不理想，MarkdownNice 的主题，一点儿也不好康... InlineCSS 有很多很多很多问题...

## 曲折前行

这两种工具我都放弃了，然后我尝试了组合工具的可能性。

* 先通过 SingleFile 将网页保存为一个整体的 HTML 文件
* 再使用 InlineCSS + Cheerio 手写代码并规避 InlineCSS 的一些配置问题

虽然期间有很多坑，但从最后尝试的结果来说，总的方向可行。

* SingleFile 会自动内联图片和字体文件，这个好解决，处理之前直接打开控制台修改对应元素避免内联即可，比如将图片的 SRC 属性名改为 SRCBACKUP
* InlineCSS 合并时 Margin、MarginBottom 这些重复的属性不会被合并，所以出现了部分样式问题
* InlineCSS 解析 CSS 不能解析 CSS 变量

## 预想

因为相关问题很多，虽然方向可行，但还是弃坑了。最近需要贴文章时还是直接贴 Markdown，懒得再做转换了。以后重新再捡起来的时候，也许会写个直接在浏览器中跑的脚本，毕竟直接调用 DOM API 获取样式的稳定性感觉要比用 InlineCSS 好。