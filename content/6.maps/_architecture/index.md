---
title: 架构设计
description: 架构设计是指软件系统的整体结构，它包括软件元素、元素之间的关系以及元素外部可见的属性。架构设计是软件设计的重要组成部分，它是软件设计的第一个阶段，也是软件设计的核心。
---

## Quick Questions

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

#### Dropbox 的密码存储策略是什么？

1. 将用户密码使用 sha256 归一化，因为 bcrypt 的结果对长度敏感
2. 使用 bcrypt 每用户加盐加密
3. 使用 AES256 全局加密，并使用专用的硬件及定期更换策略等

此外，Dropbox 表示也在关注 Argon2 等竞赛新秀。

见：[How Dropbox securely stores your passwords](https://dropbox.tech/security/how-dropbox-securely-stores-your-passwords)
