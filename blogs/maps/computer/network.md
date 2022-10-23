# 计算机网络

[TOC]

## 网络模型

#### 各网络层有哪些代表性的协议？

应用层有 HTTP、DNS、FTP，表示层有 SSL、TSL、base64、MIDI、JPEG，会话层有xxx，传输层则是 TCP、UDP，网络层有 IP，数据链路层xxx，物理层有以太网协议。

![OSI 参考模型](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220620033400.png?type=win11&w=60)

## TCP

#### TCP/IP 是什么？

TCP/IP 协议是一个协议集。TCP/IP 包括了应用层、传输层、网络层、数据链路层和网络层，是一个四层体系结构。各层有代表性的协议有 HTTP、DNS，TLS，IP 和xxx。

TODO，[终于有人能把TCP/IP协议讲的明明白白了！](https://developer.51cto.com/article/597961.html)

#### TCP Header 由哪些部分组成？

![TCP Header](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200731153510.png?type=win11&w=60)

#### 三次握手具体过程？

从三次握手图示可以发现，仅仅是连接的建立，就需要大量时间消耗。客户端想发送数据，至少要等 1.5xRTT；服务端想发送数据，至少要 2xRTT。

![Three-way Handshake](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200731162450.png?type=win11&w=40)

#### TCP Fast Open 如何优化握手过程？

TFO 规定服务器第一次返回 ACK 时，携带一个用以标志客户端身份的 Cookie。后续客户端发送 SYN 建立连接的时候带上这个 Cookie，服务端确认身份之后，就能直接返回数据了（节约了 1.5 RTT）。

![TFO](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200807054219.png?type=win11&w=80)

#### 四次挥手的具体过程？

四次挥手如下所示。为什么建立连接要三次，而断开连接要四次请求呢？从图中可以看出，接收到 FIN 请求时，服务端立即返回 ACK 表示收到请求，但是要等自己这边剩余一些工作（可能时未发送完的请求内容）完成之后，才会返回 FIN。

![Four-way Wavehand](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200731165331.png?type=win11&w=40)

#### TCP 链接中如果某端出故障了会怎么办？

会通过计时器来保证链接的稳定性。

- 超时重传计时器：对方没有返回 ACK 时，发送方需要重新发送数据。一般计时器的时间选择 2RTT。
- 2MSL 定时器：主动断开连接的一方发送 FIN 后需要等待 2MSL 时间。因为如果服务端没有收到最后一个 ACK，它将重新发送 FIN。
- 保活计时器：每当接收方收到消息，将计时器重设为两小时。计时器到期时，每 75s 发送一次探测报文段，如果连续 10 次都没有被响应则断开连接。

见：[TCP 四种计时器](https://www.cnblogs.com/13224ACMer/p/6616960.html)

## UDP

UDP，即 User Datagram Protocol 用户数据报协议。数据报不保证信息的传达是否到位，所以 UDP 也被普遍称作 Unreliable Datagram Protocol。

- 不保证消息交付
- 不保证交付顺序
- 不跟踪连接状态
- 不需要拥塞控制

## HTTP

#### 有哪些常见的状态码？

| 状态码  | 描述  |
|---|---|
| 200  | 成功并返回数据  |
| 301 | 永久转移，重定向 |
| 302 | 临时重定向 |
| 303 | 临时重定向（客户端必须使用 Get 方法重新请求资源） |
| 304 | 资源未修改，可使用缓存 |
| 400 | 请求语法错误 |
| 401 | 要求身份认证 |
| 403 | 请求拒绝 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

#### HTTP 报文由哪些部分组成？

请求报文由请求行、请求头、空行和请求数据组成，相应报文类似。

请求报文实例：

<Frame src="./segments/http-request-example.html" />

相应报文实例：

<Frame src="./segments/http-response-example.html" />

#### HTTP 1.1 对比 HTTP 1.0 做了哪些改进？

长链接（keep-alive）、断点续传、HTTP 缓存。

#### HTTP 缓存分几种？

分强缓存和协商缓存：Expires、Cache-Control、Last-Modified、Etag。

![HTTP Cache](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220630205606.png?type=win11&w=60)

TODO，[https://imweb.io/topic/55c6f9bac222e3af6ce235b9](https://imweb.io/topic/55c6f9bac222e3af6ce235b9)

#### 强缓存和协商缓存的主要区别是？

强缓存是一但匹配就无条件使用缓存，而面对协商缓存的资源，浏览器需要向服务端发请求，对比资源是否变更，并依靠服务端的响应来判断是否使用缓存。如果资源同时应用了强缓存和协商缓存，那么浏览器优先使用强缓存。

#### no-store 和 no-cache 的区别？

no-store 告诉客户端每次都在服务器取最新的资源。no-cache 也要求每次都要重新请求，但服务器可能返回 304 告诉客户端资源未改变。

#### HTTP2 的改进在哪里？

HTTP/2 主要包含以下几个方面的变化，显著增强了性能，也增加了安全性。

- 二进制分帧层
- 头部压缩（HPACK、Huffman）
- 多路复用
- 服务端推送

二进制分帧层是在应用层（HTTP）和传输层（TCP、UDP）之间新增的一个层级关系。二进制分帧层将传输的 HTTP 消息分割为更小的帧，并采用二进制格式编码传输。帧分为头部帧和消息帧。这意味着 HTTP/2 请求的所有内容都是二进制传输的。

HTTP 头部被转为帧之前，会通过维护一个表结构，通过序号记录已发送的键值对。这是一种索引算法，叫 HPACK。具体的表结构分静态表和动态表，静态表给一些常用的头部标号了号，直接使用就好，动态表则是根据发送的内容动态确定的记号。需要被发送具体内容会被哈夫曼编码以减小体积。

多路复用是指，多个 HTTP 请求可以在同一个 TCP 连接中并行传输。这和 HTTP 1.1 的 Connection：keep-alive 不同，keep-alive 虽然复用 TCP 连接，但是多个响应之间是串行的。

建立连接后，双方通过交换 SETTING 帧，以确认双向的流量窗口控制大小。然后开始发送帧。帧可以在一个连接中根据优先级发送，或是被乱序发送，响应方也能乱序接收。由于流是双向的，只要服务端 SETTING 帧设置的流量窗口大小不为 0，服务端可按照同源策略推送资源给客户端。

见：[HTTP/2 和 HTTP/1.X 相比的新特性](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.5.3)、[HTTP/2 协议之头部压缩](https://blog.csdn.net/gaoliang1719/article/details/106346201/)

#### HTTP3 相比 HTTP2 改变了什么东西？

HTTP3 使用全新的传输层协议 QUIC，实现了 H2 中的流式传输（HTTP2）、多路复用（TCP）、流量控制（TCP）以及可靠性（TCP）等内容，其网络层协议应用的是 UDP 而不是 TCP，本意是用来解决 TCP 建立链接需要  1.5 RTT 延迟的问题。这种改善在移动端更加有效。

![HTTP3 VS HTTP2 VS HTTP1.1](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220621003527.png?type=draw&w=80)

见：[HTTP3 发布了！](https://mp.weixin.qq.com/s/40YBEWZBaHakDuRuh27fMg)

## TLS

TODO，[详细介绍 RFC 8446（即 TLS 1.3）](https://www.oschina.net/translate/rfc-8446-aka-tls-1-3)

TLS 是一种混合式加密系统，同时使用对称加密和非对称加密。它使用非对称加密以加密对称加密所需的密钥。它有多个版本。TLS 1.3 是一种比起 TLS1.2 而言更清晰、更快速、更安全的现代化安全协议。TLS 1.2 有两点问题：1. 包括 POODLE 在内的众多可行漏洞；2. 性能低。为了改善这些问题，IETF 在 2013 年，着手 TLS 1.3 的讨论，主要改进：

- 减少握手时间
- 加密更多的握手
- 改善跨协议攻击的弹性
- 删除遗留特征

经过 4 年的争论。最终，形成了 RFC 8446 规范。

### TLS 1.2 的缺陷

TLS 1.2 使用的加密方式有缺陷。其中，非对称加密有如 RSA 和 Diffie-Hellman 协议。

#### RSA

![RSA Handshake](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200807082140.png?w=70)

RSA 不保证前向保密。即，如果有人记录了加密对话，然后获取服务器的 RSA 私钥，他们可以将对话解密。而攻击者可能只需 [HeartBleed 漏洞](https://www.wikiwand.com/zh/%E5%BF%83%E8%84%8F%E5%87%BA%E8%A1%80%E6%BC%8F%E6%B4%9E)（缓存区过读）就可以顺利窃取私钥。

#### Diffie-Hellman

![Diffie-Hellman](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200807082812.png?w=70)

Diffie-Hellman 的缺陷在于，协议的某些参数不安全，且能够被操纵设置；不安全的参数能导致加密更容易被破解。

#### 对称加密缺陷

TLS 1.2 的对称加密使用的 CBC 模式密码和流式密码也有缺陷。

#### Downgrade Attack

由于 TLS 1.2 握手协商密钥的部分没有加密。所以中间人可以拦截客户端的请求，选择发送方和接收方都支持的弱密码，伪造请求。

![Downgrade Attack](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200807090034.png?w=70)

### 0-RTT

TLS 1.3 中，通讯双方可以得到一个“恢复主密钥”的密钥，用于从中断的连接中直接恢复通讯。但是有被拦截导致重放攻击的风险。

![0-RTT 重放攻击](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200807081140.png?w=70)

## HTTPS

### Links

TODO，[深入理解HTTPS原理、过程与实践](https://zhuanlan.zhihu.com/p/26682342)

#### HTTPS 的握手过程是怎样的？

总的来说是一个非对称加密+对称加密的过程。客户端通过一个随机数加上服务器的公钥来生成预主密钥，然后双方再通过 Client Hello 和 Server Hello 时的两个随机数生成会话密钥。生成预主密钥的过程是非对称加密的，因为只有服务端用私钥才能解得客户端的随机数。而之后使用会话密钥主要是出于性能考虑。

![HTTPS 握手过程](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220620024738.png)

#### CA 怎么解决中间人问题？

CA 主要是用来防范服务器端返回 Server Hello 前就和客户端提供了假的公钥。CA 是一个可信的第三方机构，客户端想要服务器的公钥，需要从 CA 获得。CA 返回公钥以及数字签名。客户端只要拿到公钥后根据 CA 公钥对其计算获得摘要，再将摘要和签名进行对比，就能知道是否拿到了可信的公钥。

见：[HTTPS CA 原理](https://www.jianshu.com/p/9de06222793b)

#### 数字签名是什么？

数字签名是只有信息发送者才能产生的一段文本，信息接收方可以通过签名计算出接受到的文本是否经过了修改。如果我要发送 A，我会用私钥将 A 进行加密获得 B，并把 A 和 B 同时发送过去。B 就是数字签名。因为我的公钥是公开的，所以接受方可以通过使用我的公钥去计算 A，如果获得和 B 一致的结果，那么说明信息没有被篡改。

## 攻防

#### HTTPS 降级攻击的原理是什么？

客服端与服务端协商加密协议的过程当中，如果攻击者拦截了客户端（或操控客户端）并代替它向服务端协商使用仅支持有漏洞的协议。如果服务端同意了，那么建立连接后，攻击者就能使用该协议的已知漏洞的破解手段，去破解通讯内容了。

#### SYN 攻击的基本原理是什么？

SYN 洪水攻击是 DDOS 攻击中最常见的攻击类型。攻击者向服务器发送大量伪造的 TCP 连接请求，而源 IP 是伪造的。由于服务器收不到伪造源回应的 ACK 数据包，就会不断重发。一般应对方式是：减少重发次数、使用 [SYN Cookie](https://baike.baidu.com/item/syn%20cookie/6898884?fr=aladdin)、增加 backlog 队列长度、限制 SYN 并发数。

见：[服务器遭到SYN攻击该如何处理呢？](https://www.qycn.com/about/hd/2049.html)

## CDN

#### CDN 有什么好处？

对页面加载而言，CDN 可以减少请求时间、突破浏览器同域的 TCP 并发数、节约 Cookie 带宽。

## 浏览器

#### URL 由哪些部分组成？

<!-- TODO same -->

协议头、域名、端口、目录、文件名（index.html）、页面锚、参数。

#### 怎么做跨域？

用代理服务器、CORS、iFrame 或者 WebSocket 都可以。

服务器可以忽略同源限制；WebSocket 和 CORS 不受同源影响；iFrame 需要浏览器加载一个跨域页面，然后和主页面用 postMessage 或者哈希监听的方式通信，让 iFrame 中的脚本代替主页面发送请求。

#### 正向代理和反向代理的区别是？

正向代理为用户服务，反向代理为服务器服务，分别对应“VPN”和“负载均衡”的概念。

#### CORS 运作流程是怎样的？

CORS 即跨域资源共享机制。浏览器在请求资源前通过携带 Origin 字段的 OPTIONS 请求向服务器索取设置有 Access-Control-Allow-Methods、Access-Control-Allow-Headers、Access-Control-Allow-Origin 的响应。在得到响应的允许后再继续发送请求。

## 阅读更多

- [为你的网站带上帽子 | 使用 helmet 保护 Express 应用](https://juejin.im/post/6844903518826921998)