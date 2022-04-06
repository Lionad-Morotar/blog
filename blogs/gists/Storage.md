# Storage

[TOC]

## RTX IO

![games bottlenecked by traditional IO](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220406092957.png)
![compressed data needed, but CPU cant keep up](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220406093020.png)
![RTX IO](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220406093202.png)

## SSD（Solid State Driver）

[TOC]

### 工程原理

#### VNAND

SSD 的基本储存单位是 CTF 单元（Charge Trap Flash memoery cell），它通过控制电子的数量以电流通路来判断单个位的信息，即 0 或 1。2020 年，前沿的 CTF 单元可以单单元储存 4 Bits 的信息，且其控制电子的数量级可以保持 10 年（也即 SSD 的寿命）。

![single CTF cell](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220324200320.png?w=40)

在 VNAND 技术中，CTF 单元在 Z 轴方向上，层叠 10 个在一起[^string]，在结构上形成串（String）。在读取时，控制栅（Control Gate）自底向上逐个询问单 CTF 单元的电荷水平，并向上信号到串顶端的位线（Bitline）上。同理，写入也必须通过控制栅逐层操作。

[^string]: 事实上，由于技术发展十分迅速，三星在 2019 年就可以层叠 136 个 CTF 为一个串了。同理，下文组成结构的数量只是一个示例，不代表真实世界的比例。

![control gate & bitline](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220324201156.png?w=60)

每个控制栅连接了 32 个水平的 CTF，这叫页（Page）。可以发现，页和串分别共享了单个控制栅和单个位线。如果把页和串组成的平面结构，在 Z 轴方向层叠起来，就得到了行（Row）。行在 Y 轴方向排列，每 6 行又组成了一个块（Block）。我们已经知道了块在 X 轴方向的平面结构是行，剩下 Y、Z 轴向的平面也有名称，分别是列（Column）和层（Layer）。

![Block's Structure](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220324202434.png?w=60)

要获得块中具体的单元的信息，我们需要从位线和控制栅中选定指定位置，所以就有了位线选择器（Bitline Selector）和控制栅选择器（Control Gate Selector）。这两者共同组成了行地址解析器（Row Decoder）。见下图，电信号从右边输入，通过了控制栅选择器，可以选中一整层的 CTF 单元。再配合位线选择器（图中未展示），就可以按页操作了。

![选择器](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220324204211.png?w=60)

最后，单页的信号分别由内 CTF 单元对应的位线，经页缓存区（Page Buffer）汇集，就得到了一整页的信息。页缓存器是平面（Plane）的一部分；平面总共包括 VNAND 单元、行解析器、页缓存器和周边电路，而它最终会在 Z 轴方向层叠多层，塞进芯片中。

![Plane](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220324205655.png?w=60)

![Chips](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220324210230.png?w=60)

### 阅读更多

* [SSD固态硬盘基本原理 Flash闪存/VNAND是如何工作的](https://www.bilibili.com/video/BV1WR4y1L7io)