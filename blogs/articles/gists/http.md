# HTTP

## 报文

请求报文实例：

```text
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

```text
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

## HTTPS

HTTP with SSL（又作：HTTP over SSL）