# Subresource Integrity

[TOC]

## 相关链接

快照版本：[Subresource Integrity W3C Recommendation 23 June 2016](http://www.w3.org/TR/2016/REC-SRI-20160623/)

## 内容简介

通过 DNS 污染技术可以使用户下载伪造的内容；TLS 等技术也只能保证链接建立及通讯的相对安全性，而不能保证服务器传输了正确文件。通过在 HTML 添加文件哈希可以减少受到此类攻击的情况：

```html
<script src="https://example.com/example-framework.js"
  integrity="sha384-Li9vy3DqF8tnTXuiaAJuML3ky+er10rcgNR/VqsVpcw+ThHmYcwiB1pbOxEbzJr7"
  crossorigin="anonymous"></script>
```

其中 crossorigin="anonymous" 可以指定脚本隐藏报错信息，防止隐私泄露。