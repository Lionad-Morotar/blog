---
title: 贪吃蛇必胜算法
description: 贪吃蛇 AI 的可证明必胜框架：哈密顿圈不变量、安全短路、启发式退化与复杂度边界
---

#### 贪吃蛇 AI 的核心矛盾是什么？

蛇身自身就是不断变长的动态障碍物，「直冲食物」的短期贪婪与「别把自己围死」的长期
生存互相冲突，这是问题的本质。它常被误当成寻路问题（BFS/A*）处理，但寻路面向静态图，
贪吃蛇的核心是填充不变量（filling invariant）问题：设计一种遍历顺序，保证身体永远
不切断自己的退路。关键术语是哈密顿圈（Hamiltonian cycle，经过棋盘每一格恰好一次的
闭环，蛇严格沿圈走则永不撞身）与完备性（completeness，凡满足前提的关卡必然通关，
无失败样例）。

见：[Graph Search 策略说明 @chuyangliu/snake](https://github.com/chuyangliu/snake)

#### 可证明必胜框架如何工作？

分两层。保底层：任一边为偶数的矩形棋盘必存在哈密顿圈，蛇形扫描（boustrophedon）
线性时间即可构造，严格跟圈就是必胜策略，代价是平均走半圈才吃到一个食物。加速层是
短路（shortcut）：头部沿捷径直插食物、跳过圈上一段，但跳跃必须保持「不截断蛇身占用
的圈弧」这一不变量，即跳跃后蛇身仍占据圈上的连续一段、追尾仍然可达，于是必胜性质
保持、速度大幅提升。两条硬前提：棋盘奇偶满足条件、地图无阻断障碍。短路判断是单点
故障，条件写错一次，「可证明」标签即告失效。

见：[perfect-snake-challenge @LPRowe](https://github.com/LPRowe/perfect-snake-challenge)

#### 必胜结构不成立时如何退化？

奇数边棋盘或带障碍迷宫上哈密顿圈不存在，框架退化为启发式：BFS 找食物最短路，配合
虚拟移动检查（先让蛇身虚拟前移模拟吃掉食物，再检查头吃完后是否仍连得着尾）决定能否
走这条最短路；不行则退到跟尾周旋，等待路线重新打开。这类规则法在 6×6 盘上实测通关率
约 94%。强化学习方向表现相反：贪吃蛇状态空间小、规则可完整枚举，学习换不来任何完备性
优势，同盘实测约 50%，RL 的价值只在规则写不出来的场景。

见：[Graph Search 与 Double DQN 对照 @chuyangliu/snake](https://github.com/chuyangliu/snake)

#### 一般最优解计算上不可行，工程上限已被达到

De Biasi 与 Ophelders 在 FUN 2016（期刊版 TCS 2018）给出复杂度定案：收集全部食物的
判定在无缝隙的实心网格图（solid grid graph）上 NP-hard，在一般网格图上 PSPACE-complete。
两个术语的含义：NP-hard 指至少和 NP 中最难问题一样难，多项式时间解出它即蕴含 P=NP，
且它不要求自己属于 NP（给定候选解未必能快速验证）；PSPACE-complete 指多项式内存可解
（深度优先推演加回溯）的问题类中最难者，NP 包含于 PSPACE 且一般认为严格包含，即连
「快速验证的必赢证书」都可能不存在。结论是一般关卡如此，启发式是数学许可而非偷懒，
「最优」只在结构化特例上有多项时间必胜模板。
工程侧 Google Snake 10×10 满分 991 已被多个开源项目以「哈密顿圈 + 安全短路」达成；
Innopolis 大学在 IEEE CoG 2020/2021 办过 Snakes AI Competition 把贪吃蛇做成 RL 试验场，
规则法仍居首。

见：[The Complexity of Snake](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FUN.2016.11)、
[Snakes AI Competition Report](https://arxiv.org/abs/2108.05136)
