# 计算机网络

## TCP/IP

TCP/IP 协议是一个协议集。TCP/IP 包括了应用层、传输层、网络层、数据链路层，是一个四层体系结构。

* 应用层：HTTP，超文本传输协议；TFTP，简单文件传输协议；Telnet，远程登录；DNS，域名系统等。
* 传输层：TLS，即标准化的 SSL，传输层安全协议。
* 网络层：IP；ICMP，网络控制信息协议；ARP，地址解析协议；RARP，反向地址解析协议；
* 数据链路层：IP 地址与物理地址的映射，以及将 IP 封装成帧。

TCP 头部：

![TCP Header](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20200731153510.png)

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

* 超时重传计时器：对方没有返回 ACK 时，发送方需要重新发送数据。一般计时器的时间选择 2RTT。
* 零窗口计时器：收到零窗口报文的一方启动零窗口计时器。计时器到期时，发送零窗口探测报文。
* 2MSL定时器：用来给 TIME_WAIT 状态计时。MSL 指 Maximum Segment Lifetime，最大报文时长。
* 保活计时器：每当服务端收到消息，将计时器重设为 7200s。计时器到期时，发送探测报文段，如果连续 10 个探测报文（每 75s 发送一次）都没有被响应则断开连接。

## UDP

UDP，即 User Datagram Protocol 用户数据报协议。数据报不保证信息的传达是否到位，所以 UDP 也被普遍称作 Unreliable Datagram Protocol。

* 不保证消息交付
* 不保证交付顺序
* 不跟踪连接状态
* 不需要拥塞控制

## TLS

TLS 是一种混合式加密系统，同时使用对称加密和非对称加密。它使用非对称加密以加密对称加密所需的密钥。它有多个版本。TLS 1.3 是一种比起 TLS1.2 而言更清晰、更快速、更安全的现代化安全协议。TLS 1.2 有两点问题：1. 包括 POODLE 在内的众多可行漏洞；2. 性能低。为了改善这些问题，IETF 在 2013 年，着手 TLS 1.3 的讨论，主要改进：

* 减少握手时间
* 加密更多的握手
* 改善跨协议攻击的弹性
* 删除遗留特征

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

* 200：成功并返回数据
* 301：永久转移，重定向
* 304：资源未修改，可使用缓存
* 400：请求语法错误
* 401：要求身份认证
* 403：请求拒绝
* 404：资源不存在
* 500：服务器错误

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

### HTTP2

一图胜千言，先来看看用 HTTP2 加载小文件到底有多快...

![HTTP2](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/oIVaJryPbb.gif?w=70)

HTTP2.0 主要包含以下几个方面的变化：

* 二进制分帧层
* 头部压缩
* 多路复用
* 服务端推送

二进制分帧层是在应用层（HTTP）和传输层（TCP、UDP）之间新增的一个层级关系。二进制分帧层将传输的 HTTP 消息分割为更小的帧，并采用二进制格式编码传输。帧分为头部帧和消息帧。其中，HTTP 头部被转为帧之前，会通过维护一个表结构，通过序号记录已发送的键值对。这是一种索引算法，叫 HPACK。

多路复用是指，多个 HTTP 请求可以在同一个 TCP 连接中并行传输。这和 HTTP 1.1 的 Connection：keep-alive 不同，keep-alive 虽然复用 TCP 连接，但是多个响应之间是串行的。

建立连接后，双方通过交换 SETTING 帧，以确认双向的流量窗口控制大小。然后开始发送帧。帧可以在一个连接中根据优先级发送，或是被乱序发送，响应方也能乱序接收。由于流是双向的，只要服务端 SETTING 帧设置的流量窗口大小不为 0，服务端可按照同源策略推送资源给客户端。

## 阅读更多

* [前端内参：了解TCP、UDP、TLS](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.5.2)
* [TCP 四种计时器](https://www.cnblogs.com/13224ACMer/p/6616960.html)
* [详细介绍 RFC 8446（即 TLS 1.3）](https://www.oschina.net/translate/rfc-8446-aka-tls-1-3)
* [HTTP2.0 和 HTTP1.X 相比的新特性](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.5.3)