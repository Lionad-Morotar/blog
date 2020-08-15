# 计算机网络

[TOC]

## TCP/IP

![TCP Header](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200731153510.png)

TCP/IP 协议是一个协议集。TCP/IP 包括了应用层、传输层、网络层、数据链路层，是一个四层体系结构。

- 应用层：HTTP，超文本传输协议；TFTP，简单文件传输协议；Telnet，远程登录；DNS，域名系统等。
- 传输层：TLS，即标准化的 SSL，传输层安全协议。
- 网络层：IP；ICMP，网络控制信息协议；ARP，地址解析协议；RARP，反向地址解析协议；
- 数据链路层：IP 地址与物理地址的映射，以及将 IP 封装成帧。

### 建立与断开连接

#### 三次握手

从三次握手图示可以发现，仅仅是连接的建立，就需要大量时间消耗。客户端想发送数据，至少要等 1.5xRTT；服务端想发送数据，至少要 2xRTT。

![Three-way Handshake](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200731162450.png)

优化 TCP 连接建立，有一种方案，叫做：“TCP Fast Open”。TFO 规定服务器第一次返回 ACK 时，携带一个用以标志客户端身份的 Cookie。后续客户端发送 SYN 建立连接的时候带上这个 Cookie，服务端确认身份之后，就能直接返回数据了。

![TFO](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200807054219.png)

#### 四次挥手

四次挥手如下所示。为什么建立连接要三次，而断开连接要四次请求呢？从图中可以看出，接收到 FIN 请求时，服务端立即返回 ACK 表示收到请求，但是要等自己这边剩余一些工作（可能时未发送完的请求内容）完成之后，才会返回 FIN。

![Four-way Wavehand](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200731165331.png)

TIME_WAIT 状态发生在客户端（主动断开连接的一方）发送最后完最后一个 ACK 时，此时需要等待 2MSL 时间。因为如果服务端没有收到最后一个 ACK，它将重新发送 FIN。

### 计时器

- 超时重传计时器：对方没有返回 ACK 时，发送方需要重新发送数据。一般计时器的时间选择 2RTT。
- 零窗口计时器：收到零窗口报文的一方启动零窗口计时器。计时器到期时，发送零窗口探测报文。
- 2MSL 定时器：用来给 TIME_WAIT 状态计时。MSL 指 Maximum Segment Lifetime，最大报文时长。
- 保活计时器：每当服务端收到消息，将计时器重设为 7200s。计时器到期时，发送探测报文段，如果连续 10 个探测报文（每 75s 发送一次）都没有被响应则断开连接。

## UDP

UDP，即 User Datagram Protocol 用户数据报协议。数据报不保证信息的传达是否到位，所以 UDP 也被普遍称作 Unreliable Datagram Protocol。

- 不保证消息交付
- 不保证交付顺序
- 不跟踪连接状态
- 不需要拥塞控制

## TLS

TLS 是一种混合式加密系统，同时使用对称加密和非对称加密。它使用非对称加密以加密对称加密所需的密钥。它有多个版本。TLS 1.3 是一种比起 TLS1.2 而言更清晰、更快速、更安全的现代化安全协议。TLS 1.2 有两点问题：1. 包括 POODLE 在内的众多可行漏洞；2. 性能低。为了改善这些问题，IETF 在 2013 年，着手 TLS 1.3 的讨论，主要改进：

- 减少握手时间
- 加密更多的握手
- 改善跨协议攻击的弹性
- 删除遗留特征

经过 4 年的争论。最终，形成了 RFC 8446 规范。

### TLS 1.2 的缺陷

TLS 1.2 使用的加密方式有缺陷。其中，非对称加密有如 RSA 和 Diffie-Hellman 协议。

#### RSA

![RSA Handshake](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200807082140.png?w=70)

RSA 不保证前向保密。即，如果有人记录了加密对话，然后获取服务器的 RSA 私钥，他们可以将对话解密。而攻击者可能只需 [HeartBleed 漏洞](https://www.wikiwand.com/zh/%E5%BF%83%E8%84%8F%E5%87%BA%E8%A1%80%E6%BC%8F%E6%B4%9E)（缓存区过读）就可以顺利窃取私钥。

#### Diffie-Hellman

![Diffie-Hellman](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200807082812.png?w=70)

Diffie-Hellman 的缺陷在于，协议的某些参数不安全，且能够被操纵设置；不安全的参数能导致加密更容易被破解。

#### 对称加密缺陷

TLS 1.2 的对称加密使用的 CBC 模式密码和流式密码也有缺陷。

#### Downgrade Attack

由于 TLS 1.2 握手协商密钥的部分没有加密。所以中间人可以拦截客户端的请求，选择发送方和接收方都支持的弱密码，伪造请求。

![Downgrade Attack](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200807090034.png?w=70)

### 0-RTT

TLS 1.3 中，通讯双方可以得到一个“恢复主密钥”的密钥，用于从中断的连接中直接恢复通讯。但是有被拦截导致重放攻击的风险。

![0-RTT 重放攻击](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200807081140.png?w=70)

## HTTP

### 常用状态码

- 200：成功并返回数据
- 301：永久转移，重定向
- 304：资源未修改，可使用缓存
- 400：请求语法错误
- 401：要求身份认证
- 403：请求拒绝
- 404：资源不存在
- 500：服务器错误

### 报文

请求报文实例：

```
GET http://www.lionad.art/articles/gists/interview.html HTTP/1.1
Host: www.lionad.art
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xml
Referer: http://www.lionad.art
Accept-Encoding: gzip
Accept-Language: zh-CN,zh;1=0.9,en;e=0.5
Cookie: "a=b;c=a"
If-None-Match: "f124jgP0fj2WV2fg6",
If-Modified-Since: Wed, 01 Sep 2019 15:22:43 GMT

name=lionad&fe=good
```

相应报文实例：

```
HTTP/1.1 200 OK
Date: Wed, 01 Sep 2019 15:22:44 GMT
Last-Modified: Wed, 01 Sep 2019 15:22:44 GMT
Server: NginX
ETag: "f124jgP0fj2WV2fg6"
Accept-Range: bytes
Content-Length: 16599
Cache-Control: max-age=60
Expires: Wed, 01 Sep 2019 15:23:44 GMT
Content-Type: text/html; charset=utf-8

{statusCode: 200, message: "hello"}
```

### CSP

通过设置 HTTP 头的内容安全策略 Content-Security-Policy（CSP），可以指定浏览器应用安全措施，检测并削弱某些特定类型的攻击。

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

当然，也可以通过 HTML 指定 CSP 头部：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';" />
```

主要作用有：

- 指定内容有效域：如 script-src 限制了脚本的加载域，用以减少跨站脚本攻击。
- 指定协议：如指定内容通过 HTTPS 加载，如 [HTTP Strict-Transport-Security](https://developer.mozilla.org/zh-CN/docs/Security/HTTP_Strict_Transport_Security)，每当浏览器接收到该 Header，就会重新触发其中 max-age 指令计时器。计时器到期前，都不会降级回 HTTP 协议。
- 设置安全 Cookie：Set-Cookie 可以指定带 Secure 标志的 Cookie，该 Cookie 只能通过 HTTPS 发送至服务器；带 HttpOnly 的 Cookie 将不能被 document.cookie、XMLHttpRequest、Request 等 API 访问；SameSite=Lax 可以指定某 Cookie 不随跨域请求一起发送。
- 启用违规报告：设置 CSP 的 report-uri 可以将携带 document-uri、referrer、blocked-uri、violated-directive、original-policy 的 JSON 对象发送到指定地址。此外，如果仅报告而不指定拦截策略，可以使用 Content-Security-Policy-Report-Only 而不是 CSP。

![CSP 兼容性](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200815220758.png)

还有一些 HTTP 头也和浏览器安全相关。

- [X-Content-Type-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options)：督促浏览器使用 Content-Type 而非 MIME Sniff 的方式检测、解析并执行文件。比如说，当图片中嵌套了脚本后，MIME Sniff 检测到这些脚本，便会自动执行它。
- [X-DNS-Prefetch-Control](https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching)：可设置为 on、off，用于控制 DNS 的预解析。据 MDN 介绍，打开后，在图片数量较多的页面，能带来至少 5% 的加载速度提升。
- [X-Frame-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options)：这是 CSP frame-ancestors 的非官方标准，但是已经得到广泛支持。有 deny、allow-from、sameorigin 三种值，sameorigin 是大部分浏览器选择的默认值，它指定了 frame、iframe、object、embed 等元素的有效父级作用域。
- [X-XSS-Protection](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-XSS-Protection)：可用来保护不支持 CSP 的旧式浏览器免受基础 XSS 攻击（目前仅 IE、Safari 支持）。当检测到攻击时，可选过滤攻击、过滤且停止加载页面、过滤且上报（Chromium）。

### HTTP2

一图胜千言，先来看看用 HTTP2 加载小文件到底有多快...

![HTTP2](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/oIVaJryPbb.gif?w=70)

HTTP2.0 主要包含以下几个方面的变化：

- 二进制分帧层
- 头部压缩
- 多路复用
- 服务端推送

二进制分帧层是在应用层（HTTP）和传输层（TCP、UDP）之间新增的一个层级关系。二进制分帧层将传输的 HTTP 消息分割为更小的帧，并采用二进制格式编码传输。帧分为头部帧和消息帧。其中，HTTP 头部被转为帧之前，会通过维护一个表结构，通过序号记录已发送的键值对。这是一种索引算法，叫 HPACK。

多路复用是指，多个 HTTP 请求可以在同一个 TCP 连接中并行传输。这和 HTTP 1.1 的 Connection：keep-alive 不同，keep-alive 虽然复用 TCP 连接，但是多个响应之间是串行的。

建立连接后，双方通过交换 SETTING 帧，以确认双向的流量窗口控制大小。然后开始发送帧。帧可以在一个连接中根据优先级发送，或是被乱序发送，响应方也能乱序接收。由于流是双向的，只要服务端 SETTING 帧设置的流量窗口大小不为 0，服务端可按照同源策略推送资源给客户端。

### HTTPS

#### 降级攻击

客服端与服务端协商加密协议的过程当中，如果攻击者拦截了客户端（或操控客户端）并代替它向服务端协商使用仅支持有漏洞的协议。如果服务端同意了，那么建立连接后，攻击者就能使用该协议的已知漏洞的破解手段，去破解通讯内容了。

## 阅读更多

- [前端内参：了解 TCP、UDP、TLS](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.5.2)
- [TCP 四种计时器](https://www.cnblogs.com/13224ACMer/p/6616960.html)
- [详细介绍 RFC 8446（即 TLS 1.3）](https://www.oschina.net/translate/rfc-8446-aka-tls-1-3)
- [HTTP2.0 和 HTTP1.X 相比的新特性](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.5.3)
- [为你的网站带上帽子 | 使用 helmet 保护 Express 应用](https://juejin.im/post/6844903518826921998)
