---
title: 硬件
description: 硬件是指计算机的物理部分，包括 CPU、内存、硬盘、显卡等。
---

## 主板

* **版型**：mini-ITX（通常仅 2 内存插槽+1 PCIe x16）、micro-ATX 和 ATX。
* **命名规则**：通常为“品牌（大系列）+芯片组（版型）+品牌系列（子系列）+后缀（如 WIFI、AX）”。
* **芯片组分级**：Intel 分为 X、Z、B、H 等系列，AMD 分为 X、B、A 等系列。
* **主要插槽与接口**：CPU 插槽（Intel LGA1700、AMD AM5）、PCIe 插槽、M.2 接口（替换 mSATA）、SATA 接口等。
* **供电接口**：ATX、ATX_12V 等。

见：[《【硬核科普】从零开始认识主板》](https://www.bilibili.com/video/BV1xQ4y1b7JS/)、[《手把手教你认识主板》](https://sspai.com/post/78672)

## GPU

* [聊透 GPU 通信技术——GPU Direct、NVLink、RDMA](https://segmentfault.com/a/1190000044183341)

## 存储

* [SSD](/maps/_hardware/ssd)

## 测试工具

* [HardwareTest.org](https://hardwaretest.org/)：50+ 免费在线硬件测试工具，涵盖显示器、键盘、鼠标、音频、手柄、系统性能等，基于浏览器 Web API 运行，无需安装，隐私优先

## 芯片安全

#### 苹果芯片的安全执行层级

苹果芯片的特权隔离从低到高分为四级：用户态（User）< 内核态（Kernel）< Exclave < Enclave。
每一级对下一级拥有不可逾越的访问屏障。

- **Enclave**：独立处理器核心 + 独立 OS（SEPOS），完全物理隔离，存储 Touch ID、
  Face ID、加密密钥等最敏感数据
- **Exclave**：运行在主处理器上但与内核隔离的受保护执行环境，拥有独立地址空间，
  可直接操作硬件资源（如将摄像头指示灯直接 blit 到屏幕）
- **内核态**：操作系统内核，ring 0 特权
- **用户态**：普通应用程序

MacBook Neo 的摄像头指示灯运行在 Exclave 中，即使内核级 exploit 也无法绕过指示灯
偷偷开启摄像头——因为指示灯的渲染路径不经过内核。
