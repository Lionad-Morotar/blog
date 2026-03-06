---
title: Daily Bugs
description: 追踪一些日常碰到的软件缺陷
---

#### 2026-03-08

ai-research-skills 的这种模式容易出问题。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260306123654604.png)

#### 2026-03-02

QQ 开放平台的图标颜色问题。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260302191731885.png)

#### 2026-02-27

Mac 显示 Trae 在用我的麦克风，但是强退也没有用。最后一个一个应用强退，发现是 Edge（？），我也不知道是哪个页面。

#### 2026-02-25

好慢！慢死了！

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260225152729795.png)

是不是最近翻译太多东西了，对这种错误敏感。Chrome 博客的机器翻译很可靠，只是对于某些名词，不如不翻译。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260225221245729.png)

#### 2026-02-24

让人感叹。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260224233617400.png)

#### 2026-02-23

qwen/qwen3-coder-next 作为本地翻译模型虽然好用但是很多翻译错误。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260223135849664.png)

#### 2025-02-14

总是给我新惊喜的一直都是 GPT。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260214025215035.png)

#### 2026-01-24

好像很有道理...

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260126022817353.png)

#### 2026-01-22

MiniMax 客户端第一个任务就碰到了 bug。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260122204450537.png)

#### 2026-01-21

这两行实际有内容，但是 VSCode 不显示，除非鼠标点击。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260121094919435.png)

#### 2026-01-20

碰到了目录不可读问题，删依赖清缓存都没用，甚至删完之后重新 pnpm install 都会报错，实在搞不懂。

```plaintext
postinstall$ nuxt prepare │ ERROR EISDIR: illegal operation on a directory
```

见：https://github.com/nuxt/devtools/issues/79

#### 2026-01-19

这对吗？

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260119015504669.png)

#### 2026-01-18

在 Trae 里的浏览器一不小心点了部署，没办法撤销，特喵的傻逼交互。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260119010435785.png)

#### 2026-01-08

快被微软翻译（Edge 浏览器自带）笑死了

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260108113659388.png)

#### 2025-12-15

Yarn 安装碰到 TLS 问题。

https://github.com/yarnpkg/yarn/issues/892

<Link type="h5" to="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20251215133211580.txt" />

#### 2025-12-10

不能用 DOM 节点改 input.value 的问题，参考了：https://blog.csdn.net/l198738655/article/details/107026783

应该是 React 版本对不上，还是不能更改，最后问 Copilot 直接调用 fiber 里面的 onChange 方法才有用。

#### 2025-11-30

不听话的 Github Copilot

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511302322306.png)

#### 2025-11-28

Nuxt 多打一个引号，页面直接炸了，报错找不到任何有用的信息。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511281109208.png)

#### 2025-11-26

Go 的中文文档 typo。以后所有文档自动拷贝成 i18n 站多好。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511261601627.png)


  YouMind 搜索资料被 403 了。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511262317741.png)

#### 2025-11-10

  在类型文件 import 外部类型后找不到命名空间问题。

  参考这个解决：[TS 解决找不到命名空间“Courses”](https://juejin.cn/post/7077760247359602718)

#### 2025-11-06

  碰到一个奇怪的问题。发现是错误的 template 导致的。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511061805391.png)

#### 2025-11-05

  1. [Qwen3-embedding 的维度设置问题](https://github.com/coze-dev/coze-studio/issues/838)
  2. Coze Studio 中的鼠标交互问题：<video src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202511051626902.mov" controls="controls" width="100%">Your browser does not support the video tag.</video>
  3. 在 Mac Edge 中，搜狗拼音输入不了中文，发现输入框在屏幕上一个奇怪的位置。切换到 VSCode 后能正常输入，再重新切换回 Edge 就好了。

#### 2025-10-27

  MacOS 15 的计算器的问题，能稳定复现。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202510272328599.mp4)

#### 2025-10-22

```
[plugin:vite:vue] crypto.hash is not a function
```

  使用了新版 Vite 后，需要替换新版 NodeJS，不然 API 不兼容。

#### 2025-10-19

  关闭右侧客服弹窗后，仍然存在一个白色的弹窗区域。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/PixPin_2025-10-19_13-04-39.png)

  也许是因为 Windows 更新导致的，无论是在网页还是应用内使用 Explorer 选择文件，选择框都会卡死。多次重启后解决。

  ![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/3db30da9c32753c926d793c16203391e.png)

#### 2023-10-24

  * [关于语雀 23 日故障的公告](https://mp.weixin.qq.com/s/WFLLU8R4bmiqv6OGa-QMcw)
