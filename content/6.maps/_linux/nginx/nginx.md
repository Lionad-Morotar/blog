---
title: Nginx
description: nginx 配置原理与反向代理/ingress 场景下的常见陷阱
---

## 反向代理陷阱

#### absolute_redirect：反代后面的 nginx 应关闭，避免自动重定向泄露内部端口

`absolute_redirect` 控制 nginx 自动发出的重定向的 `Location` 头是绝对 URL 还是相对路径，默认 `on`。
这类"自动重定向"包括目录补斜杠、`index` 命中、`try_files` 命中目录等 nginx 内部行为，而非配置里显式写的 `return` / `rewrite`。

`on` 时，nginx 用自己监听该请求的 scheme + host + port 拼绝对 URL。
当 nginx 跑在反向代理、ingress、SLB 或 CDN 后面时，它监听的端口（如 `:8888`、`:8080`）与用户实际访问的端口（如 `:443`）不一致，
`Location` 就会把内部端口泄露给浏览器，还可能把 https 降级成 http——
典型现象是访问 `/login` 被 301 到 `http://内网域名:内部端口/login/`。

`off` 后，nginx 只发相对路径（如 `Location: /login/`），由浏览器用当前页面的 scheme + host + port 拼接，
外部入口的协议与端口得以保留。

工程上，凡是 nginx 监听端口与外部访问端口不一致的部署（容器化、k8s ingress、Cloudflare 等），
都应显式设 `absolute_redirect off`，放在 `http {}` 全局或 `server {}` 均可。
配套的 `port_in_redirect off` 只去掉端口、仍保留 nginx 的 scheme（http），不如 `absolute_redirect off` 彻底——反代场景首选后者。

见：[absolute_redirect - nginx 官方文档](http://nginx.org/en/docs/http/ngx_http_core_module.html#absolute_redirect)
