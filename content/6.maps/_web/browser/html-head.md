---
title: HTML Head
description: HTML 文档骨架（boilerplate）：head 元素的 opt-in 开关机制与排序性能，CSP meta、text-scale、charset 嗅探等深层机制与陷阱。
---

#### HTML boilerplate 是文档头的 opt-in 开关集中管理

HTML 标准受「Don't Break The Web」约束几乎不删任何功能，1995 年的文档至今仍能渲染，新能力只能靠「出现即启用」的
opt-in 元素渐进开启，boilerplate 因此成为集中管理这些开关与站点对外元数据的模板。它与 CSS reset（管视觉起点）、
框架的 head 管理器（Unhead 等，本质是替你动态维护同一张清单）分属不同层。按领域核心问题可分五层组织：
渲染正确性层（doctype 防 quirks mode、lang 供翻译/断词/读屏、charset 限前 1024 字节、viewport 定移动视口）、
用户偏好适配层（color-scheme 防 FOUC、theme-color 按 media 配深浅双值、text-scale 接通系统字号）、
资源加载层（stylesheet 放 head 而非 @import 以防瀑布式串行、字体 preload 需 crossorigin）、
身份发现层（title/canonical/og:*、SVG favicon、feed/opensearch/manifest）、body 骨架（header>nav、main#main
作 skip link 锚点、footer）。不该写的：viewport 的 initial-scale/maximum-scale/user-scalable（后两者直接废掉
缩放可访问性）、meta description（搜索引擎已改从正文取）、og:title 里重复站名（嵌入卡片本就会显示）。head 元素
排序不是风格偏好而是性能问题，capo.js 给出加权模型，html-eslint 已有 head-order 规则可进 CI；og:* 与
theme-color 的具体行为属事实标准而非 HTML 规范，各浏览器解释不一。按页型扩展：学术引用页加 citation_*/Dublin
Core，文章页加 og article 命名空间，通用增强加 JSON-LD。

见：[My HTML Boilerplate - Vale.Rocks](https://vale.rocks/posts/html-boilerplate)：精简版文档骨架模板与逐项解释

#### CSP meta 标签会瘫痪 Chrome 预加载扫描器

用 `<meta http-equiv="Content-Security-Policy">` 声明 CSP 会让 Chrome 的 preload scanner 失效：扫描器遇到 CSP
meta 后停止并行扫描、等待规则应用，已解析的资源要重新走 CSP 判定。capo.js 明确警告此项并建议一律改用 HTTP 响应头
下发 CSP；若受限于静态托管只能用 meta，至少挪到 head 最前端可减小损失。这解释了为什么安全合规的「加个 CSP」操作
常伴随 LCP 无声劣化，且 DevTools 中不易归因。

见：[Preloader changes broken with CSP in HTML - Chromium](https://issues.chromium.org/issues/40273969)：扫描器遇 CSP meta 失效的官方实证

#### text-scale 把移动端系统字号接回 rem 体系

`<meta name="text-scale" content="scale">`（CSS Fonts Level 5，Chrome 146+ 支持）解决移动端系统字号与网页脱节
的问题：CSS 的 1rem 绑定 html 根字号，桌面浏览器用户调字号后根字号跟随、rem 体系全体联动，但移动端这条链路默认
是断的，浏览器靠不可控的 text auto-sizing 启发式猜着放大。该 meta 把链路接通（用户调到 1.5 倍则 1rem 变 24px，
35rem 媒体查询断点也自动放大），同时禁用不可控的启发式。两个陷阱：其一，`:root { font-size: 16px }` 之类绝对
单位会把根字号钉死，opt-in 即刻失效，且原有兜底已被关闭，大字号用户反而看到比以前更小的字，正确姿势是全站只用
rem/em/关键字；其二，与 `env(preferred-text-scale)` 同时使用会双重缩放（1.5 × 1.5 = 2.25），倍数偏离 1 越远
放大越离谱。它的隐藏红利：rem 断点的媒体查询会随用户字号自动放大，布局自动给大文字让路。

见：[meta text-scale - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/text-scale)：规范机制与 env() 双用警告

#### 同源字体 preload 漏写 crossorigin 会静默双下载

字体按规范永远以匿名 CORS 模式获取，而无 crossorigin 属性的 preload 走 no-cors 模式，两个请求的缓存键不同，
浏览器视其为不同资源，同一字体被下载两次且无任何报错。这就是「同源也要写 crossorigin」背后的失败模式：
Performance 面板里字体请求出现两次时先查这里。同理 HTTP/2 服务器推送时代的 Link 头预加载也需要给 font 类资源
补 crossorigin（CSS 与图片类不需要）。

见：[Why Font Preload Needs the crossorigin Attribute](https://www.web-font-optimization.com/font-loading-delivery-strategies/preloading-resource-hints/crossorigin-attribute-for-font-preload/)：字体匿名 CORS 模式与缓存键错配机制

#### charset 的 1024 字节窗口是编码嗅探缓冲区

浏览器只扫描文档前 1024 字节来判定编码，之后即按该编码解码，声明放得太靠后不只是不合规范，而有具体失败模式：
若 title 出现在 charset 之前且含非 ASCII 字符，标签页标题会先按错误编码解码产生乱码，即使浏览器随后重声明也无法
修正已产出的解码结果。常见翻车场景是 head 前面塞了长注释或 CDN 注入的脚本，悄悄把 charset 挤出 1024 字节窗口
（W3C validator 对此有专门报错项）。

见：[charset after the first 1024 bytes - Rocket Validator](https://rocketvalidator.com/html-validation/a-charset-attribute-on-a-meta-element-found-after-the-first-1024-bytes)：validator 报错项与嗅探窗口机制