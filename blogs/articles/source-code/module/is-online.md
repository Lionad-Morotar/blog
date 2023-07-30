# 判断 NodeJS 是否在线

之前被组长问道要如何判断 NodeJS 是否在线，我不假思索回答：“Ping 百度试试。”。调用 Ping 需要 child_process，那还不如直接改用内置的 DNS 试试是否在线更简单一些。不过会不会碰到缓存等问题，没往下细想了。今天正好在别人的博客看到了 NodeJS DNS 模块，突然想起这个问题，于是就搜了一下相关库。找到了 internet-available 这个玩意儿。这里一起来看看他们的实现。

[TOC]

## internet-available

### 长话短说

[internet-available](https://github.com/ourcodeworld/internet-available/blob/master/internet-available.js) 使用 dns-socket 库去发起一个 google.com 的 DNS 请求。请求成功则确认服务器在线，超时则确认服务器离线。

### 实现

代码实现非常简单，不过 20 行。

```js
function internetAvailable(settings) {
    var dns = require('dns-socket');
    settings = settings || {};

    return new Promise(function(resolve, reject){
        // Create instance of the DNS resolver
        // 默认超时五秒；重试次数五次
        var socket = dns({
            timeout: (settings.timeout || 5000),
            retries: (settings.retries || 5)
        });

        // Run the dns lowlevel lookup
        // 默认 DNS 服务器地址是 8.8.8.8，请求 google.com
        // 国内需要换成 114.114.114.114 & baidu.com，原因你懂
        socket.query({
            questions: [{
                type: 'A',
                name: (settings.domainName || "google.com")
            }]
        }, (settings.port || 53), (settings.host || '8.8.8.8'));

        // DNS Address solved, internet available
        socket.on('response', () => { 
            socket.destroy(() => {
                resolve();
            });
        });

        // Verify for timeout of the request (cannot reach server)
        socket.on('timeout', () => {
            socket.destroy(() => {
                reject();
            });
        });
    });
}
```

唯一的问题是，internet-available 引用的 [dns-socket](https://github.com/mafintosh/dns-socket/blob/master/index.js) 这个库解决了什么问题。dns-socket 主页上说，它是一个带有超时和重试功能的接近底层的 DNS 请求库，那可以想象 NodeJS 的 DNS 模块应该就缺失了超时功能。关于 DNS 超时这个问题，AlienZHOU 大的博客有提到。可以从文末引用中查看更多详细信息。

从源码来看，dns-socket 是一个使用 UDP 封装的 DNS 请求库，其中，DNS 报文的解析使用了同作者的 [dns-packet](https://github.com/mafintosh/dns-packet) 这个库（这个作者还真是为了改善 NodeJS 的 DNS 尽心尽力哈...）。

## 阅读更多

* [AlienZHOU：NodeJS 中 DNS 查询的坑 & DNS cache 分析](https://www.jianshu.com/p/693a5d378a2c)