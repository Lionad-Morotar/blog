---
title: 记录奇怪的问题
description: 可能并不知其所以然
---

#### Nuxt 博客打开页面报错 export useId 错误？

一直使用 Mac 开发，今天尝试换回 Windows 写两行代码时发现项目不能启动了... 报错信息如下。

![vue export useId error](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/d01f9a588e425831580c258dc727cde9.png)

估计和依赖版本有关系，但是删除 lockfile 以及黑洞及缓存文件夹都没有效果，最后还是在 Github 同名 Issue 下，根据大佬的建议尝试锁定 Vue 的最新版本再重新安装才解决。
