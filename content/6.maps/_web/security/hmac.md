---
title: HMAC
description: 基于哈希的消息认证码 HMAC 的双层结构、长度扩展攻击防御与验签工程实践
---

## 概述

HMAC（Hash-based Message Authentication Code，基于哈希的消息认证码）将共享密钥与密码学哈希函数组合，
同时验证消息的完整性与来源真实性，定义于 RFC 2104。核心公式为 `HMAC(K, m) = H((K' ⊕ opad) ‖ H((K' ⊕ ipad) ‖ m))`：
H 为底层哈希（如 SHA-256），K' 为补齐到哈希块大小的密钥。裸哈希只能防止意外篡改——任何人都能重算；
引入密钥后只有持钥方才能生成合法认证码，因此 HMAC 成为 Webhook 验签、API 请求签名、JWT HS256 等防伪造场景的标准构造。

## 基础

#### 双层哈希结构防御长度扩展攻击

直接拼接 `hash(secret ‖ message)` 对 MD5、SHA-1、SHA-2 这类 Merkle–Damgård 结构的哈希并不安全：攻击者无需知道 secret，
即可把已有哈希值当作中间状态继续追加数据，算出合法的新哈希（长度扩展攻击，length extension attack）。
HMAC 用密钥分别异或内外两层填充常量（ipad 0x36、opad 0x5c）再做两次哈希，最终输出不暴露可被续用的中间状态，从结构上封死了这条路径。

HMAC 的安全性归约到底层哈希作为伪随机函数（PRF）的性质，而非碰撞抗性。这解释了一个反直觉现象：MD5 的碰撞攻击早已实用化，
HMAC-MD5 却至今没有实用破击——RFC 6151 仅建议新应用避免使用。工程选型默认 HMAC-SHA-256，但评估存量系统时不必把 HMAC-MD5 当作紧急漏洞处理。

见：[RFC 2104: HMAC: Keyed-Hashing for Message Authentication](https://datatracker.ietf.org/doc/html/rfc2104)

#### 对称机制不提供不可否认性

验签方与签名方持有同一密钥，任何一方都能生成合法认证码，因此 HMAC 无法向第三方证明消息确实来自特定一方。
需要不可否认性（non-repudiation）的场景——电子合同、代码签名、审计存证——应改用非对称数字签名（RSA、Ed25519）：
私钥签名、公钥验签，验签方无法伪造签名。

## 工程实践

#### 验签必须针对原始字节流

HMAC 认证的是字节序列，任何序列化差异都会导致验签失败。常见陷阱是服务端把请求体 JSON.parse 后重新 stringify 再算 HMAC——
字段顺序、空白、Unicode 转义的变化都会产生不同字节。正确做法是在框架层取 raw body 直接参与计算，
如 Node 的 raw-body、Nuxt/Nitro 的 readRawBody，而不是依赖解析后的对象。

见：[Validating webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)

#### 比较认证码必须使用常量时间比较

用 `===` 或逐字节短路比较认证码，会在首个不匹配的字节处提前返回，响应时间的细微差异泄露逐字节匹配进度，
构成时序攻击（timing attack）面——攻击者可逐字节逼近合法签名。工程上必须使用常量时间比较：
Node 用 `crypto.timingSafeEqual`，Go 用 `subtle.ConstantTimeCompare`，且比较前需先确认两侧等长，避免长度差异引入新的时序信号。

见：[Node.js Docs: crypto.timingSafeEqual](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b)

#### 典型应用场景

- Webhook 验签：GitHub 的 `X-Hub-Signature-256`、Stripe 的 `Stripe-Signature`，均为 `HMAC-SHA256(secret, raw_body)`
- API 请求签名：AWS Signature V4 用 HMAC-SHA256 按日期、区域、服务逐级派生签名密钥
- JWT 的 HS256：`HMAC-SHA256(base64url(header) + "." + base64url(payload), secret)`
- 动态口令：HOTP（RFC 4226）与 TOTP（RFC 6238）底层均为 HMAC-SHA-1

见：[RFC 7518: JSON Web Algorithms](https://datatracker.ietf.org/doc/html/rfc7518)
