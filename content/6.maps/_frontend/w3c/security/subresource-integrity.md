---
title: Subresource Integrity
description: 子资源完整性协议允许浏览器通过检查哈希值来判断资源是否经过篡改。
---

## 相关链接

快照版本：[Subresource Integrity W3C Recommendation 23 June 2016](http://www.w3.org/TR/2016/REC-SRI-20160623/)

## 内容简介

TLS 等技术也只能保证链接建立及通讯的相对安全性，而不能保证服务器传输了正确文件，因为可以 DNS 污染等技术使用户下载伪造的内容。通过在 HTML 添加文件哈希可以减少受到此类攻击的情况：

```html
<script
  src="https://example.com/example-framework.js"
  integrity="sha384-Li9vy3DqF8tnTXuiaAJuML3ky+er10rcgNR/VqsVpcw+ThHmYcwiB1pbOxEbzJr7"
  crossorigin="anonymous">
</script>
```

其中 crossorigin="anonymous" 使浏览器以匿名模式加载该资源，即在请求时不发送用户凭据（如 cookies 或身份认证信息）。

### Links

* [Subresource Integrity @MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)
