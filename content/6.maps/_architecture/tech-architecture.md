---
title: 技术架构
description: 技术架构是指软件系统的整体结构，包括软件组件、子系统、模块之间的关系，以及软件系统的外部特性和行为。技术架构设计是软件开发的重要环节，它决定了软件系统的质量、性能、可维护性和可扩展性。
---

## 相关资料

* [System Design 101](https://bytebytego.com/guides/)

## 认证过程

### 用户密码

#### 如何储存用户密码？

除开双因素认证等鉴权方式，单看用户密码的落库。一般人都知道不能明文存储，但是简单的加密也并不安全：MD5、SHA-1、SHA-256 等哈希算法，都可以通过彩虹表等方式破解。所以，一般会选择加盐哈希算法，比如 bcrypt、scrypt，并采用多层加密策略。

#### 加盐过程有哪些容易出现的错误？

盐太短或重复使用都会导致问题，此外，应该使用安全的随机函数生成盐，如 C/C++ 的 `CryptGenRandom`。

#### 什么是 Password Hashing？

加盐哈希在现代计算机来看已经不够安全，Password Hashing 应当能应付以下几种攻击：

* 加密算法破解（原值还原、哈希碰撞等）
* 查表、彩虹表
* CPU 优化攻击
* GPU、FPGA、ASIC 等专用硬件攻击
* 旁路攻击：通过检测电磁波、功耗等信息来推算信息

见：[用户密码加密存储十问十答，一文说透密码安全存储](https://www.cnblogs.com/xinzhao/p/6035847.html)

#### [How Dropbox securely stores your passwords](https://dropbox.tech/security/how-dropbox-securely-stores-your-passwords)

Dropbox 的密码存储策略是什么

1. 将用户密码使用 sha256 归一化，因为 bcrypt 的结果对长度敏感
2. 使用 bcrypt 每用户加盐加密
3. 使用 AES256 全局加密，并使用专用的硬件及定期更换策略等

此外，Dropbox 表示也在关注 Argon2 等竞赛新秀。

#### [How Instagram scaled to 14 million users with only 3 engineers](https://read.engineerscodex.com/p/how-instagram-scaled-to-14-million)

### OAuth

* [OAuth 2.0 Standards](https://oauth.net/2/)

