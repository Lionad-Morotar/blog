# Web 之困

[TOC]

## Web 应用安全

### 简明历史

计算机历史学家常以 Bush 在 1945 年虚构出来的 Memex 桌面设备作为 Web 最早期原型。Memex 用于在微缩胶卷上创建和标注跨文档连接，使用方式类似于现在的书签和超链接。1960 年左右，IBM 推出 GML。GML 经过 20 余年发展为 SGML。人们一直尝试使 SGML 结合 Bush 的链接的形式，很多项目都失败了，知道 Timber Berners-Lee 和 Don Connolly 草拟出 HTML 规范。

Timber Berners-Lee 不仅草拟 HTML 规范，他们还开发出 HTTP 协议，并在此基础上完成了 WWW 浏览器项目。1993 年，Mosaic 登场了，它带来了图片以及表单功能，也是后来 Netscape 以及 IE 的前身。

自微软 1996 年在 Windows 操作系统中捆绑 IE 开始，算正式挑起了浏览器大战。各类竞品竞相开发迭代，增加新功能，也就无暇顾及各类标准的建立。W3C、ECMA 和 IETF（Internet Engineering Task Force）都企图对 HTTP、JavaScript 的规范做标准化和改进的工作，但结果不甚理想。W3C 实现的 HTML 2.0 和 HTML 3.2 标准仅在发布之日就沦为了过时的标准。好在进入 2000 年后，浏览器大战逐渐落下帷幕，W3C 涉及的 HTML 4.0 以及 DOM、CSS 规范才逐渐赶了上来。

没有了竞争对手，IE 一度更新缓慢，直到 2004 年针对 IE 安全性以及不良的标准兼容性杀入市场的 Firefox，以及接连在手机端领先的 Safari 和 Opera 让微软重新加大对 IE 的投入，升级到了 IE9。微软 XMLHttpRequest 出乎意料的成功，让人们开始思考更新的，同时也不是那么成熟的设计，比如 Firefox 的 globalStorage 和 IE 的 httponly Cookie；一群参与者甚至因不满 W3C 在 HTML 标准上的创新性，创建了全新的 WHATWG（Web Hypertext Application Technolofy） 组织以主导 HTML5 协议的开发。

总的来说，在 Web 整个发展历程中，由于缺乏统一的远景目标和完整的安全规范，其整个发展过程竞争激烈、变幻莫测，与政治牵扯过多，结果错漏百出。这些问题在可见的将来也不会有什么改变。

### 风险演化

Web 领域中一些具有影响力的风险要素：

* 用户作为安全风险的一个环节：Web 对用户的计算机水平没有要求。
* 难以隔离的环境：传统模式中应用层数据、用户层应用和操作系统内核之间的边界非常清晰，但是浏览器中不存在这种边界。
* 缺乏统一的格局：没有通用的整体性安全模型，至于同源策略只是跨域交互中的一个小的子集。
