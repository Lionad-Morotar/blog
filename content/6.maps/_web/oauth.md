---
title: OAuth
description: 第三方授权协议的设计原理与安全机制
---

#### OAuth 的本质是"用户委托授权"

OAuth 解决的核心问题：**如何让第三方应用在不获取用户密码的情况下代表用户操作**。

这解释了其多层设计——authorization code、access token、refresh token——每一层都是为了在"方便"与"安全"之间取得平衡，而非单纯的身份验证。

#### 授权码流程的安全设计原理

OAuth 的复杂性源于一个根本矛盾：
**用户交互必须在浏览器（不安全的 front-channel）完成，而令牌交换必须在服务端（安全的 back-channel）完成**。

| 通道 | 传输方式 | 安全性 | 用途 |
|------|----------|--------|------|
| Front-channel | GET 请求，参数在 URL | 低（可被历史记录、日志泄露） | 用户跳转、传递 authorization code |
| Back-channel | POST 请求，参数在 body | 高（HTTPS 加密） | 交换 access token |

为什么不能用 URL 传 access token？
URL 可能出现在浏览器历史、服务器日志、Referer 头中，导致令牌泄露。
因此引入 authorization code 作为"一次性凭证"，完成前后端的安全接力。

#### OAuth 核心术语

- **Resource Owner**：资源所有者（用户）
- **OAuth Client / App**：第三方应用
- **Authorization Server**：授权服务器（用户登录并同意授权的地方）
- **Resource Server**：资源服务器（存储用户数据的地方，可能与授权服务器相同）
- **Scopes**：授权范围（用户同意给予第三方哪些权限）
- **Authorization Code**：授权码（一次性凭证，用于交换 access token）
- **Access Token**：访问令牌（真正的"权限凭证"）
- **Client Secret**：客户端密钥（用于验证第三方应用身份）

#### PKCE：无后端场景的安全方案

对于纯前端或移动端应用，client secret 无法保密（可被提取或反编译）。

PKCE（Proof Key for Code Exchange，发音"pixie"）通过以下方式解决：
1. 客户端生成临时密钥对（code verifier + code challenge）
2. 授权请求时发送 code challenge
3. 交换 token 时验证 code verifier

这是**零信任架构**在 OAuth 中的早期实践——不依赖持久化 secret，每次授权独立验证。

#### OIDC：认证与授权的层叠设计

OpenID Connect（OIDC）是构建在 OAuth 2.0 之上的身份验证层。

这种设计遵循**单一职责原则**：
- OAuth 只做授权（authorization）
- OIDC 只做身份验证（authentication）

两者可独立使用，也可组合。层叠设计比"大而全"的单一协议更具灵活性和可维护性。

#### 安全设计的核心原则

OAuth 的每一处复杂性都对应一个安全威胁：

- **Redirect URI 白名单**：防止授权码被劫持到其他域名
- **Client Secret 验证**：确保只有注册的客户端能换取 token
- **Authorization Code 一次性使用**：防止重放攻击
- **State 参数**：防止 CSRF 攻击（跨站请求伪造）

见：[An Illustrated Guide to OAuth](https://www.ducktyped.org/p/an-illustrated-guide-to-oauth)
