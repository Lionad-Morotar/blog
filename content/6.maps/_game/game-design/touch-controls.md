---
title: 触控设计
description: 移动端游戏触控交互的设计原则与体验优化
---

#### 移动端虚拟摇杆的设计原则

固定位置的摇杆会造成方向混乱——手指每次落点不同，向左移动的意图可能因落点偏右而反向。
顶尖游戏（如 Brawl Stars）的解法是让摇杆出现在**手指触摸的初始位置**，而非固定角落。

其他三个关键设计决策：
- **操作区域隔离**：动作按钮在右侧，摇杆只响应左侧触摸，防止输入冲突
- **边缘自适应跟随**：手指滑得太远时摇杆轻微追随，玩家无需大幅回拖——摇杆主动适应玩家
- **模拟量输出**：方向控制输出连续强度值而非"按下/未按下"，人物可按力度调速，手感接近真实手柄

见：[I built the best virtual joystick for PhaserJS, then went to bed](https://medium.com/@renatocassino/i-built-the-best-virtual-joystick-for-phaserjs-then-went-to-bed-ab4ac09d1265)
