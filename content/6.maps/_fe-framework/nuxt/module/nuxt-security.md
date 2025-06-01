---
title: Nuxt Security
description: 自动通过使用 HTTP 头和中间件配置您的应用程序遵循 OWASP 安全模式和原则
meta: 
  - name: source
    content: www.lionad.art/maps/_fe-framework/nuxt/module/nuxt-security
---

文章使用 AI 辅助创作，原文地址见 [Read Nuxt Security](www.lionad.art/maps/_fe-framework/nuxt/module/nuxt-security)。

## 简介

提到 Web 应用程序安全，大部分人会第一时间想到同源跨域又或是 XSS、CSRF，但其实 Web 安全是一个庞大话题，而 XSS、CSRF 只是两种常被讨论的攻击方式。如果想进一步学习 Web 安全相关知识，就不得不提各种浏览器 API，以及 CSP、SRI 等现代标准，更甚是 [OWASP](https://www.maxai.co/share?id=7591d3876a80e48362f35f5eeacbb3764356f89776cea4f34dbf29f5) 等组织的活动。OWASP 是一个全球性的非营利组织，旨在提高 Web 应用程序的安全性。OWASP 提供了大量免费且公开的工具、资源、文档和最佳实践，帮助开发人员、企业和安全从业者识别和应对软件安全风险。

而 Nuxt Security 为 Nuxt 应用程序提供了一个接近开箱即用的插件方案，自动通过配置请求头和 Nuxt 中间件，为应用程度设置遵循 OWASP 安全模式和原则的安全策略，其中就包含各标准的实践。相比同类竞品 Nuxt Helmet，Nuxt Security 包更广的实践和策略深度。其内容大致分为四类：协议安全（请求头）、中间件（限速插件等）、插件辅助（移除日志等）和最佳实践。以下详细介绍各个大类的作用以及策略的机理。

## 协议安全

### CSP

[内容安全策略（CSP）](https://www.maxai.co/share?id=7591d3876a80e48362f35f5eeacbb3764356f89776cea4f34dbf29f5) 是一种网络安全机制，允许开发者限制网页加载的资源来降低客户端侧的安全风险。

例如 JavaScript 文件、样式表、图片、字体等资源，如果内容来源没有被明确声明，那浏览器就会阻止其加载和执行，以防恶意代码，所以这可以减轻跨站脚本（XSS）漏洞、点击劫持、表单劫持、恶意框架、不想要的跟踪器以及其他网络客户端攻击。

形式上，CSP 可以通过请求头来配置，比如 Nuxt Security 的默认设置就是：

```js
Content-Security-Policy: base-uri 'none'; font-src 'self' https: data:; form-action 'self'; img-src 'self' data:; object-src 'none'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline' 'strict-dynamic' 'nonce-{{nonce}}'; upgrade-insecure-requests;
```

初看很复杂，但具体内容可以按分号拆分为不同的小块。比如 **base-uri 'none'**：限制了文档的 base 标签来源。'none'表示不允许设置或继承任何基础 URI，防止修改文档资源定位。类似的，**img-src** 中的 'data:' 表示允许通过 Data URL 的方式嵌入图片，'self' 表示只能根据同源策略加载图片。

配置中最后那个 CSP 策略是 upgrade-insecure-requests，将会自动升级页面中所有非安全（HTTP）链接为 HTTPS，这对保护混合内容攻击非常有用。

其他配置里较为特别的是 **script-src-attr**，使用 'none' 可以禁止在脚本的标签属性中使用如 onclick="..." 等内联脚本。这些不同策略中，script 和 style 都包含 https: 'unsafe-inline' 策略，也就是允许内联脚本和内联样式。内联脚本搭配了 nonce 策略提高安全性，这下面详细介绍，那内联样式为什么也会作为一个安全选项呢？

假设攻击者通过漏洞注入了 HTML 或样式代码，尽管不是脚本，但这些注入的内容也可以成为攻击载体，比如注入的表单允许将用户名密码发送到其他服务器（当然这是可验证但听起来不切实际的例子）。只不过内联样式作为一种禁用掉就会让大部分网站样式瘫痪的运行方式，Nuxt Security 默认配置允许内联样式。

关于样式代码的攻击方式可以参考 [2013 年 Mike West 的演讲](https://mikewest.org/2013/09/xss-no-the-other-s-cssconfeu-2013/)，其中介绍了一些有趣的攻击方式，比如 Firefox 有个漏洞可以允许注入的样式通过正则匹配文档 URL 然后配合 [CSS Exfil](https://www.mike-gualtieri.com/posts/stealing-data-with-css-attack-and-defense) 发送请求来获取用户 URL Query 中一些敏感信息。题外话，前几年有个很火的项目叫 [Pure CSS Chatroom](https://github.com/kkuchta/css-only-chat)，纯 CSS 实现的聊天室功能，就是通过此类方式实现的。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202504040521520.png)

内联脚本则是 XSS 攻击的重灾区，但是单纯禁用内联脚本也不太行，所以 CSP 2（2016）引入了 nonce 策论。也就是上文配置中的“https: 'strict-dynamic' 'nonce-xxx'”。允许开发者在脚本标签中添加一个随机生成的 nonce 值，浏览器会检查这个值是否和 CSP 中的 nonce 值匹配，如果匹配就允许执行。这样就可以在不禁用内联脚本的情况下提高安全性。

假设服务器给 HTML 设置了如下请求头：

```js
Content-Security-Policy: script-src 'nonce-my-site-random-int'
```

那么以下两段脚本，只有 nonce 值匹配的那段会执行。如果你去观察 Twitter 等网站的页面代码，就会发现这些网站的脚本标签中都包含了 nonce 值。而就算是动态脚本，也可以通过 nonce 值来保证其安全性。

```html
<script nonce="nonce-my-site-random-int">alert('Hello, world!');</script>
<script nonce="xyz456">alert('not allowed');</script>
```

'strict-dynamic' 是 nonce 在 CSP 3（2018）带来的细化。在 Nuxt Security 插件中，对于 SSR 网站而言，服务器会给客户端传输非常多动态内容，所以给这些动态内容设置不同的 nonce 值是有必要的，可以保证就算 nonce 泄露给了第三方插件，也不会有什么影响。而 SSG 网站通常通过 HTTP 请求来获取数据，所以 nonce 值会在打包时生成，所以无需关心动态脚本的问题。

### SRI

此外，静态站点在 Nuxt Security 中还默认包含 SRI（子资源完整性策论）。其规范见 [SubResource Integrity W3C Recommendation 23 June 2016](http://www.w3.org/TR/2016/REC-SRI-20160623/)，通过在脚本和样式标签中添加文件哈希来验证文件内容正确性，因为尽管使用 HTTPS 可以保证链接建立及通讯的相对安全性，却不能保证服务器传输了正确文件。攻击者有未知或经验证手段（如 DNS 污染技术）使用户下载伪造的内容。

例如，下面代码使用了一个包含 integrity 属性的 script 标签。使用 SRI 后，浏览器会在下载文件后计算其哈希值，并与 integrity 属性中的值进行比较。如果两者不匹配，浏览器将拒绝加载该文件。其中 crossorigin="anonymous" 使浏览器以匿名模式加载该资源，即在请求时不发送用户凭据（如 cookies 或身份认证信息）。

```html
<script
  src="https://example.com/example-framework.js"
  integrity="sha384-Li9vy3DqF8tnTXuiaAJuML3ky+er10rcgNR/VqsVpcw+ThHmYcwiB1pbOxEbzJr7"
  crossorigin="anonymous">
</script>
```

关于“框架”的麻烦性就体现出来了，Nuxt（加一系列插件）尽管打包了所有概念尽可能为开发者提供开箱即用的东西，但需要具体去了解各个概念的细节才能更好使用。和部分 CSP 配置一样，一旦开启 SRI，原先代码中关于第三方样式和脚本可能突然就无法使用。更甚，有些第三方脚本，内容是动态的，所以无法提供稳定的哈希值，这就没有办法使用 SRI。

如果你从用了公共 CDN 的旧项目迁移到 Nuxt，并使用了 Nuxt Security，不知道协议的细节就会带来这些麻烦。这就是 [“框架的麻烦”](https://nuxt-security.vercel.app/advanced/strict-csp)，不过长期来看，Nuxt 等元框架是利好开发者和终端用户的。

### 权限策略

[Permissions Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Permissions_Policy) 是和浏览器 Permission API 配合使用的一个安全策论。举个例子，如果攻击者想通过摄像头来获取用户信息，一般情况需要你的代码中已经包含并向用户请求了摄像头权限。你的代码如果没有相关代码，那不错，但更好的策论是直接在页面停用摄像头权限，这就是 Permissions Policy 的工作。

例如，下面的请求头仅允许在指定源和页面上使用地理位置权限。

```
Permissions-Policy: geolocation=(self https://trusted-ad-network.com)
```

如果你的网站使用了 iframe，那么需注意，所有 iframe 都继承其父页的策略。如果 iframe 使用了 allow 属性，那么父页面和 allow 属性的策略将被合并，使用最严格的子集。当然，这建立在父页使用了 Permissions Policy 的基础上。

Nuxt Security 的默认配置里，所有敏感权限都是关闭的，这包括摄像头、共享屏幕、全屏、地理位置和麦克风等。

```
Permissions-Policy: camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()
```

不过好在，你可以在 nuxt.config.ts 的路由配置中，为各个页面单独设置 Permissions Policy，具体就不展开了。题外话，除了上面提到带摄像头权限，浏览器的权限控制粒度（还不是正式标准）还算精细，以下列举。完整项可参考 [MDN Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)。

* background-sync：后台同步
* clipboard-read：剪贴板读取
* web-share：是否允许网页调用系统的共享功能
* accelerometer：加速度计
* ambient-light-sensor：环境光传感器
* autoplay：控制网页是否允许媒体（如视频或音频）自动播放
* battery：电池状态
* document-domain：是否允许跨域访问文档的域名
* encrypted-media：是否允许播放加密媒体内容
* execution-while-not-rendered：是否允许在未渲染的页面上执行脚本
* execution-while-out-of-viewport: 控制网页在内容不再可见时是否允许继续执行代码
* gamepad：游戏手柄
* gyroscope：陀螺仪
* hid：人机接口设备如特殊键盘
* local-fonts：本地字体访问
* magnetometer：磁力计
* midi：MIDI 设备
* payment：支付请求 API
* picture-in-picture：画中画模式
* publickey-credentials-get：WebAuthn API
* screen-wake-lock：是否允许阻止屏幕休眠
* serial：串行设备通讯支持
* speaker-selection：扬声器选择
* usb：访问 USB 设备
* xr-spatial-tracking：XR 空间跟踪

### 隔离策略

最常见的隔离策略是浏览器的同源策略。

浏览器请求图像、样式、脚本、字体等文件时，是允许默认跨域的，所以常使用跨域请求头即 Access-Control-Allow-Origin、 Access-Control-Allow-Methods 和 Access-Control-Allow-Headers，通过限制浏览器对跨域资源的访问来降低恶意代码运行的风险，但是单单使用这三个请求头不能保证部分子资源的请求安全，仍然需要 COEP、COOP、CORP 请求头协同工作。

COEP（Cross-Origin-Embedder-Policy）控制图片等嵌入资源的加载行为，可以显式声明为 "required-prop"，使浏览器加载嵌入资源前校验跨域请求头（CORS 及下文将会提到的 CORP）是否完整。如果不完整则浏览器会拒绝加载。CORP（Cross-Origin-Resource-Policy）则是一个响应头，可以标记服务端的资源是否允许跨域访问。

请求的资源类型还可以是文档：使用 COOP（Cross-Origin-Opener-Policy）可以控制 window.open 打开的窗口是否和页面共享同一个 BCG。题外话，服务端也有控制文档是否能在 iframe 中加载的请求头，X-Frame-Options。

BCG 即浏览器上下文窗口，一般来说同源域名共享一个 BCG，所以可以通过 postMessage 等方式跨标签通讯。HTML a 标签的 rel="noopener" 属性和请求头 Referrer-Policy 则是除了 COOP 外另一种阻止 window.open 打开的页面访问 window.opener 的方式。

也许和直觉会有些不一样，Chrome 的 BCG 是默认按“网站”而不是“同源”对页面进行分组的，所以手动使用 [COEP、COOP 能间接管理页面隔离](https://web.dev/articles/coop-coep?hl=zh-cn)。此外请求头 Origin-Agent-Cluster 可以用于直接控制浏览器是否按同源策略分组 BCG，见 web.dev 的文章：[使用 Origin-Agent-Cluster 标头请求性能隔离](https://web.dev/articles/origin-agent-cluster?hl=zh-cn)

除了图片、文档等，Flash 和 PDF 这种嵌入型资源虽不常见，但因可以发请求，所以也需要一种策略来控制其跨域访问：一般可以在网站根目录定义一个 crossdomain.xml 文件进行配置，但也可以通过 X-Permitted-Cross-Domain-Policies 请求头来控制，以下是两者的示例：

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

```
xPermittedCrossDomainPolicies: 'none'
  | 'master-only'
  | 'by-content-type'
  | 'by-ftp-filename'
  | 'all'
  | false;
```

### 资源安全

曾经有浏览器会根据文件内容，而不是 Content-Type 去解释和执行文件，这可能使攻击者发送的图片等文件中嵌套的脚本代码得到执行，这种攻击叫做 MIME 嗅探攻击。配置 X-Content-Type-Options: nosiff 禁止浏览器对文件内容进行 MIME 嗅探。

X-Download-Options: noopen 则用于提高文件下载的安全性，防止用户在浏览器中意外执行下载的文件。配置后用户需要先下载文件，再手动打开，而不是直接在浏览器中打开。

### HTTPS

HTTPS 是 HTTP 的安全版本。尽管不是技术上的限制，但浏览器需要 API 都依赖 HTTPs 协议才能使用，比如：地理位置、音视频麦克风、工作线程、剪贴板、Performance API，以及上文提到的 SRI 和 COEP 等请求头。大概 HTTPS 已经相当普及了，但仍有手动指定浏览器强制使用 HTTPS 而不是降级使用 HTTP 的方法：STS。

浏览器接收到 Strict-Transport-Security（STS 或 HTTP STS）请求头后，会进行倒计时，在计时结束之前都不会将 HTTPS 降级回 HTTP。见下示例，`max-age` 指定倒计时时间；`includesSubDomains` 指定子域的 `HSTS`；`preload` 指定预加载内容的 `HSTS`。

```
Strict-Transport-Security:
    max-age=31536000;
    includeSubDomains;
    preload
```

### 隐私安全

浏览器默认开启了 DNS 预取功能，所以用户访问页面时碰到了新链接，浏览器会提前解析 DNS。虽然可以加快页面加载速度，但也会泄露用户隐私及扩大用户可能的受攻击面。X-DNS-Prefetch-Control: off 可以关闭 DNS 预取功能。

## 中间件

Rate Limiter 常用于登录、注册等安全敏感的接口，或某些高服务器资源消耗的接口。他将用户的 IP 储存在内存中，并在请求超量后，拒绝并返回 429 Too Many Requests 错误。默认设置为每 30 秒允许 150 次请求。

Request Size Limiter 是用来限制请求体大小的插件。默认配置为 2MB 的请求体和 8MB 的文件上传请求体，超过限制后会返回 413 Payload Too Large 错误。

XSS Validator 是一个中间件，用于检测和过滤 XSS 攻击。它会检查请求体、查询参数和头部信息中的潜在恶意代码，并在发现可疑内容时返回 400 Bad Request 错误。

CORS Handler 则用于设置请求的跨域处理。还可以配合 Allowed HTTP Methods 插件来限制请求方法。

Basic Auth 是实现了 HTTP Basic Authentication 的中间件。当浏览器发送请求时，会在请求头中添加一个 Authorization 字段，包含用户名和密码的 Base64 编码值。Nuxt 服务器可以基于此值来验证用户身份。

Cross Site Request Forgery（CSRF）插件用于防止 CSRF 攻击。

## 实践

还没介绍到的 Nuxt Security 的一些功能则是一些实践上的配置，包括隐藏 X-Powered-By 头部、移除 console.log 和 debugger 语句。

关于如何做一个安全的应用，Nuxt Security 推荐使用这些方法：[Good Practices](https://nuxt-security.vercel.app/advanced/good-practices)

## 默认配置

插件的默认配置如下，之后会介绍每个配置的作用。插件会默认将注册全局中间件和路由规则，并且其标准配置是“ensure that your application will not break”。

```json
{
  security: {
    strict: false,
    headers: {
      crossOriginResourcePolicy: 'same-origin',
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginEmbedderPolicy: 'credentialless',
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        'upgrade-insecure-requests': true
      },
      originAgentCluster: '?1',
      referrerPolicy: 'no-referrer',
      strictTransportSecurity: {
        maxAge: 15552000,
        includeSubdomains: true,
      },
      xContentTypeOptions: 'nosniff',
      xDNSPrefetchControl: 'off',
      xDownloadOptions: 'noopen',
      xFrameOptions: 'SAMEORIGIN',
      xPermittedCrossDomainPolicies: 'none',
      xXSSProtection: '0',
      permissionsPolicy: {
        camera: [],
        'display-capture': [],
        fullscreen: [],
        geolocation: [],
        microphone: []
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000,
      throwError: true
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 300000,
      headers: false,
      driver: {
        name: 'lruCache'
      },
      throwError: true
    },
    xssValidator: {
      throwError: true
    },
    corsHandler: {
      origin: serverlUrl,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflight: {
        statusCode: 204
      },
    },
    allowedMethodsRestricter: {
      methods: '*',
      throwError: true
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: true,
    removeLoggers: true,
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true,
    },
    sri: true
  }
}
```

配置优先级符合 Nuxt Module，最低是默认配置，然后是 inline 模块配置，再是 nuxt.config.ts 中单独的 security 字段配置，之后是 routeRule.security 字段配置，最后是运行时中间件配置。
