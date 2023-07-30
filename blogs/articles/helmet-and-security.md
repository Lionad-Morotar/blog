---
meta:
  - name: keywords
    content: helmet,MIME,MIME-sniffing,MIME嗅探,XSS,HTTPS,CSP,DNS-prefetch
  - name: description
    content: 本文介绍了NodeJS安全库Helmet的原理，相关MIME嗅探、XSS、CSP、DNS预取等内容。
---

# 👹 Helmet & Security

<!-- RAW H1 -->
<!-- <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200815230352.png" alt="HELMET" style="width: 1em; height: 1em; position: relative; bottom: -.1em;" /> Helmet & Security -->

[TOC]

Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help![^helmet]

Helmet 是一个 Express 中间件，它更改了 HTTP 请求的某些响应头，以告知浏览器使用某种安全策略。Helmet 不能带来绝对的安全，比如针对 DNS Rebinding[^dns-rebinding-1] 问题，它就无能为力[^dns-rebinding-2]。不过尽管不是银弹，它确实还是很有效的。

仅需数行代码，就可以引入 Helmet 并使用：

```js
const express = require('express')

const app = express()

app.use(require('helmet')())
```

新的响应请求的 Headers 会变成这样：

```
HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 0
...
```

那么，接收到此响应头之后，浏览器具体会执行哪些操作呢？

## 11 种安全策略

Helmet 使用了共 11 种安全策略。其中相关的许多 HTTP 头都源于 OWASP Secure Headers[^shp] 这个项目。以下我们由简入深，看看不同策略的背后相关的安全问题。

#### 移除 X-Powered-By

```js
response.removeHeader('X-Powered-By')
```

一些框架会在请求头中添加 X-Powered-By（或 Server） 以标明网站是由哪种框架搭建的，这对宣传框架做了推力。但泄漏框架的版本信息可能带来的问题是，攻击者可以寻找针对该版本的已知漏洞轻松发起攻击。

由于 Express 只会默认给响应头增加 X-Powered-By Header，所以 Helmet 只要把 X-Powered-By 去掉就完事儿了。

#### 移除 MIME 嗅探

```js
response.setHeader('X-Content-Type-Options', 'nosniff')
```

浏览器的 MIME 嗅探是指某些浏览器（如 IE8）会根据文件内容，而不是 Content-Type，执行、渲染文件。这可能使攻击者发送的图片等文件中嵌套的脚本代码得到执行。解决方案也很简单，只需告诉浏览器把 MIME 嗅探关闭就完事儿了。

#### 移除 X-XSS-Protection

```js
response.setHeader('X-XSS-Protection', '0')
```

不是应该打开 X-XSS-Protection，以防范 XSS 攻击么，为什么要把它关闭？

这得追溯回去年的 Chrome 移除 XSS Auditor，准备使用新的 XSS 防护方法这事儿上。“XSS Auditor 已经充满了漏洞”，并且“修复所有信息泄漏已经证明是困难的”。所以就把这玩意儿给废除了[^xss-auditor]。至于程序员们最担心的 Edge，它已经在 18 年去除了 XSS Auditor，并开始使用 CSP 等现代标准（更现代的标准）[^delete-xss-auditor]。

更详细的讨论，见 [GitHub Issue](https://github.com/OWASP/CheatSheetSeries/issues/376)。

#### 禁止页面被嵌套

```js
response.setHeader('X-Frame-Options', 'SAMEORIGIN')
```

X-Frame-Options 指定了浏览器的 frame、iframe、object、embed 等元素的有效父级作用域。限制 X-Frame-Options 为 SAMEORIGIN 可以防止网页被 iframe 等元素嵌套到非同源页面中，这可以用来预防某些点击劫持攻击。

本来它的值有三种选择，Deny、SameOrigin、AllowFrom。但 AllowFrom 因为其兼容性原因，被 Helmet 弃用：

![caniuse x-frame-options allow-from](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200816000544.png)

此外，可以在 CSP 中设置 frame-ancestors 指令来替代 X-Frame-Options Header。CSP 是更先进的标准，待会儿会介绍到。

#### 移除 Referer

通过设置 Referrer-Policy Header，可以自如控制浏览器的 HTTP 请求中 Referer[^referer] 的显示方式。移除 Referer，则用以保护用户的访问记录，防止隐私泄漏。

```js
const ALLOWED_TOKENS = new Set([
  // 任何时候都不携带 Referer
  'no-referrer',
  // 仅当协议降级时不携带 Referer（浏览器默认策略）
  'no-referrer-when-downgrade',
  // 同源请求携带 Referer，非同源请求不携带 Referer
  'same-origin',
  // 所有请求，Referer 都指向来源的源地址
  'origin',
  // 在 origin 的基础上，当协议降级时，不携带 Referer
  'strict-origin',
  // 同源请求时发送完整的 Rerferer，非同源请求只发送来源的源地址
  'origin-when-cross-origin',
  // 在 origin-when-cross-origin 的基础上，当协议降级时，不携带 Referer
  'strict-origin-when-cross-origin',
  // 所有请求都携带上完整的 Referer
  'unsafe-url',
  // 无策略
  ''
])
function getHeaderValueFromOptions({ policy = ['no-referrer'] }) {
  const tokens = typeof policy === 'string' ? [policy] : policy
    tokensSeen.add(token)
  })
  // 多个协议可以通过逗号作兼容性降级（越靠后优先级越高）
  return tokens.join(',')
}
function referrerPolicy(options = {}) {
  const headerValue = getHeaderValueFromOptions(options)
  return function referrerPolicyMiddleware(_req, res, next) {
    res.setHeader('Referrer-Policy', headerValue)
    next()
  }
}
```

其实，在 HTML 中，无论是 Meta、Image、iFrame、Script 或是 Style 标签，都能设置 Referrer Policy。Meta 标签设置的 Referrer Policy 对整个页面都有效果（优先级最低）。

```html
<meta name="referrer" content="origin" />
<a href="http://example.com" referrerpolicy="origin"></a>
<a href="http://example.com" rel="noreferrer"></a>
```

#### 强制使用 HTTPS

通过设置请求头的 Strict-Transport-Security（STS），可以告诉浏览器，这个网站需要使用 HTTPS 而不是 HTTP 协议进行访问。浏览器每接收到这种请求后，会重置一个倒计时，在计时结束之前都不会将 HTTPS 降级回 HTTP[^timeend]。

这个规范本身很好理解，通过 max-age 可以指定倒计时时间；includesSubDomains 指定子域的 HSTS；preload 指定预加载内容的 HSTS。

```
Strict-Transport-Security:
    max-age=31536000;
    includeSubDomains;
    preload
```

```js
const DEFAULT_MAX_AGE = String(180 * 24 * 60 * 60)
function getHeaderValueFromOptions(options) {
  const directives = [`max-age=${options.maxAge || DEFAULT_MAX_AGE}`]
  if (options.includeSubDomains === undefined || options.includeSubDomains) {
    directives.push('includeSubDomains')
  }
  options.preload && directives.push('preload')
  return directives.join('; ')
}
function strictTransportSecurity(options = {}) {
  const headerValue = getHeaderValueFromOptions(options)
  return function strictTransportSecurityMiddleware(_req, res, next) {
    res.setHeader('Strict-Transport-Security', headerValue)
    next()
  }
}
```

#### 可选用证书透明性策略

```js
response.setHeader('Expect-CT' /* someValue */)
```

Expect-CT 可以指定浏览器检测通讯时的证书是否存在于公共 CT 日志（也称作证书透明性策略[^chrome-ct]），避免中间人攻击[^ct]；也可以启动选择性报告，告知 CA 机构部分证书可能不合法，需要被回收。

```
Expect-CT:
    // 指定浏览器上报证书失效的 URI
    report-uri="<uri>";
    // 指定浏览器应当拒绝于违反证书透明性策略的服务端建立连接
    enforce;
    // 在此期间，证书透明性策略相关信息可作缓存
    max-age=<age>
```

自 2018 年 4 月，Chrome 强制要求所有 TLS 服务器证书都要符合 Chromium CT 政策。由于 Expect-CT 的 maxAge 最大可设置为 39 个月，39 个月之后，也就是 2021 年 6 月，Expect-CT Header 就作不上用咯...

#### 拒绝来自 PDF、Flash 的跨域请求

X-Permitted-Cross-Domain-Policies 这个非标准标头倒不是那么常见。这得说回 Flash、PDF 等文件中的请求。我们以 Adobe PDF Reader 官网的一张图为例[^pdf-reader]：

![X-Permitted-Cross-Domain-Policies](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200817134940.png)

1. 用户在 A 网站打开了某个 PDF；
2. PDF 中包含了和 B 网站的通讯。这时，客户端判断这是跨域行为，于是请求 B 网站的 crossdomain.xml 文件（策略文件）作为跨域策略应对方案。

一个策略文件可能长这样：

```html
<!-- https://www.taobao.com/crossdomain.xml -->
<cross-domain-policy>
  <allow-access-from domain="*.taobao.com" />
  <allow-access-from domain="*.taobao.net" />
  <allow-access-from domain="*.taobaocdn.com" />
  <allow-access-from domain="*.tbcdn.cn" />
  <allow-access-from domain="*.alicdn.com" />
</cross-domain-policy>
```

其中，若请求响应头包含了 X-Permitted-Cross-Domain-Policies Header，便可指定浏览器针对 crossdomain.xml 的应对行为。

```js
const ALLOWED_PERMITTED_POLICIES = new Set([
  // 只允许使用主策略（即只允许网站根目录的 crossdomain.xml）
  'master-only',
  // 仅当策略文件的响应头 Content-Type 为 text/x-cross-domain-policy 时，策略文件被允许使用
  'by-content-type',
  // 不使用任何位置的 crossdomain.xml
  'none',
  // 允许使用任何位置的 crossdomain.xml
  'all'
])
function xPermittedCrossDomainPolicies(headerValue = 'none') {
  return function xPermittedCrossDomainPoliciesMiddleware(_req, res, next) {
    res.setHeader('X-Permitted-Cross-Domain-Policies', headerValue)
    next()
  }
}
```

可见 Helmet 的默认行为很简单，它使应用直接拒绝了来自 PDF、Flash 等非标准客户端的所有的跨域请求。

#### 开启 CSP

还记得我们提到的 Chrome 关闭了 XSS Auditor 吗？既然不再使用 XSS Auditor，那他就迫切需要一种更新的 XSS 防范手段，那就是我们提到的 CSP 标准[^csp-standard]。CSP 提供了很多限制选项，涉及安全的各个方面，可以有效阻止一些基础的攻击手段。

首先，CSP 既可以通过响应头指定，也可以通过 HTML 标签指定。

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';" />
```

一个典型的 CSP 头如下：

```
Content-Security-Policy: default-src 'none';
    script-src 'nonce-XQY ZwBUm/WV9iQ3PwARLw==';
    style-src 'nonce-XQY ZwBUm/WV9iQ3PwARLw==';
    img-src 'self';
    font-src 'nonce-XQY ZwBUm/WV9iQ3PwARLw==' fonts.gstatic.com;
    object-src 'none';
    block-all-mixed-content;
    frame-ancestors 'none';
```

大致来说，CSP 相关以下几种安全行为：

- 指定内容有效域：如 script-src 限制了脚本的加载域，用以减少 XSS 攻击。
- 指定协议：使用 block-all-mixed-content 指定浏览器禁止加载 HTTP 内容；通过 upgrade-insecure-requests 指定浏览器将网站的 HTTP 协议升级为 HTTPS；
- 行为安全：通过 sandbox 指令指定浏览器禁止弹出窗口等行为。
- 启用违规报告：通过 report-uri 指定检测到违规行为时发送违规报告到指定地址。此外，如果仅报告而不指定拦截策略，可以仅使用 Content-Security-Policy-Report-Only Header。

那么我们看看 Helmet 中默认配置的 CSP 策略：

```js
const DEFAULT_DIRECTIVES = {
  // 默认只允许使用本站资源（脚本、图片）
  'default-src': ["'self'"],
  // 限制 base 标签的 URI 为源地址
  'base-uri': ["'self'"],
  // 禁止通过 HTTP 协议加载内容
  'block-all-mixed-content': [],
  // 限制字体加载地址
  'font-src': ["'self'", 'https:', 'data:'],
  // 限制嵌入的外部资源
  'frame-ancestors': ["'self'"],
  // 限制图片加载地址
  'img-src': ["'self'", 'data:'],
  // 禁用 object 标签
  'object-src': ["'none'"],
  // 只从源地址加载脚本
  'script-src': ["'self'"],
  // 禁用内联脚本
  // ？也许理解有误，有了解的请评论指出
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-attr
  // https://w3c.github.io/webappsec-csp/#directive-script-src-attr
  'script-src-attr': ["'none'"],‘
  // 限制样式表加载地址
  'style-src': ["'self'", 'https:', "'unsafe-inline'"],
  // 不使用升级协议指令
  // 据 MDN 介绍，该指令适用于需要重写大量不安全的旧版URL的网站，
  // 所以默认不开启此指令
  'upgrade-insecure-requests': []
}
```

最后，我们看兼容性... Caniuse 网站只提供了 CSP 1.0 的兼容性，我没有找到最新版本规范（CSP 3.0）的兼容性数据 😝。

![CSP 兼容性](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200815220758.png)

#### 移除下载文件后的“打开”按钮

```js
response.setHeader('X-Download-Options', 'noopen')
```

在下载文件时，X-Download-Options Header 可以指定浏览器移除下载界面中的“打开”按钮。我猜测是因为通过这种方式的“打开”，某些浏览器会将页面上下文注入文件中，使页面容易收到攻击。有了解的朋友欢迎留言。

#### 开启 DNS 预取

通过设置 X-DNS-Prefetch-Control 可以打开（或关闭）浏览器的 DNS 预请求功能。据 MDN 介绍，打开后，在图片数量较多的页面，能带来至少 5% 的加载速度提升。

至于 DNS Prefetch 具体是如何增强浏览器安全的... 我暂时没懂。我在 Issue 中问了 Helmet 的作者，他提供了关于 DNS Prefetch 安全性问题的额外的资料。请看这个 [Issue](https://github.com/helmetjs/helmet/issues/111)。

```js
response.setHeader('X-DNS-Prefetch-Control', 'on')
```

## 阅读更多

前端安全是一个非常宏大的话题。Hemlet 给你的 Express 应用带来的改进只是其中非常小的一部分内容。比如，它没有提及安全 Cookie 相关内容。

- 设置安全 Cookie：通过 Set-Cookie 可以指定浏览器设置安全 Cookie，该 Cookie 只能通过 HTTPS 发送至服务器；带 HttpOnly 的 Cookie 将不能被脚本访问；SameSite=Lax 则可以指定某 Cookie 不随跨域请求一起发送。[^secure-cookie]

如果你想了解更多关于 HTTP Secure Header 的详细内容，可以参考 [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)。当然，MDN 上提供了关于前端安全问题更广泛的思路，有时间阔以深入学习一下：[Web Security](https://infosec.mozilla.org/guidelines/web_security)。以下是一些额外的可供探索的页面：

- [Content Security Policy (CSP) 是什么？](https://www.zhihu.com/question/21979782)
- [CORS@MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [OWASP Top 10 2017（RC2）](http://www.owasp.org.cn/owasp-project/OWASPTop102017RC2.pdf/view)

希望本文能对你有所帮助，如果文中出现了语序或理解错误的地方也请各位批评及指出。

<JJ><p>若有任何疑问，或想探讨相关问题，欢迎邮件给我。</p></JJ>

想看看这篇文章是如何被创造的？你能从我的[博客项目](https://github.com/Lionad-Morotar/blogs)中找到答案~ 欢迎 [Star & Follow](https://github.com/Lionad-Morotar/blogs)~ 也请大家多来我的[线上博客逛逛](https://www.lionad.art)，排版超 Nice 哦~

[^shp]: [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
[^helmet]: [HELMET](https://helmetjs.github.io/)
[^dns-rebinding-1]: [来自微信外挂的安全风险](https://xlab.tencent.com/cn/2018/10/23/weixin-cheater-risks/?from=timeline&isappinstalled=0)
[^dns-rebinding-2]: [GitHub Issue](https://github.com/helmetjs/helmet/issues/182)
[^xss-auditor]: [XSS Auditor (removed)](https://www.chromestatus.com/feature/5021976655560704)
[^delete-xss-auditor]: [Google 将删除 Chrome 内置的 XSS 保护](https://zhuanlan.zhihu.com/p/74288648)
[^referer]: Referer 是 Referrer 的错误拼写，但为了后向兼容，便一直保留下来了。
[^pdf-reader]: [Cross Domain Configuration](https://www.adobe.com/devnet-docs/acrobatetk/tools/AppSec/xdomain.html)
[^timeend]: [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
[^chrome-ct]: [Chrome 证书透明度（CT）相关政策](https://blog.myssl.com/chrome-certificates-transparency-ct-policy/)
[^ct]: [HTTPS 证书被伪造了怎么办@ConardLi](https://mp.weixin.qq.com/s?src=11&timestamp=1597650971&ver=2527&signature=X6agCz5iwHLLw3yQchPE0dhzMC9KfLtQrqUv2DlIochk2oFEfw61w*l1QRf0GXSbzgyve2c0t0YGjDw*n-i6ubwQ9*UgxYglhx5BFEtJSuaEPm99ak-DowM3*0Lx1eNY&new=1)
[^csp-standard]: [Content Security Policy Level 3](https://www.w3.org/TR/CSP/)
[^secure-cookie]: [Secure-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)
