# 小程序

## 问题

#### 微信内的小程序在什么时候会更新版本？

小程序更新分为同步和异步更新：

* 打开小程序时异步检查并下载最新版小程序，在下次小程序冷启动时使用新版
* 微信定期检查小程序版本或小程序长时间未启动再打开时使用同步更新，同步更新会阻塞使用流程
* 开发者使用 `getUpdateManager.onUpdateReady` 接口提醒用户同步更新最新版本

#### 小程序对 Grid 布局的支持能力如何？

有许多手机不支持 Grid 布局，如果需要写响应式的栅格布局，要安装插件。

见：[小程序对 grid 布局支持的如何？](https://developers.weixin.qq.com/community/develop/doc/000004337c41c074412c471d356000?jumpto=comment&commentid=000e664b2e8f28c4432c782675b0)
