---
title: 音频合成
description: 游戏开发中的程序化音频合成与 DSP 技术
---

#### PK3 IIR 滤波器：白噪声转粉噪声的经典算法

PK3（Paul Kellet's refined method）是 1999 年 10 月 17 日发布于 musicdsp.org 的白噪声转粉噪声算法。粉噪声（pink noise，1/f 噪声）的功率谱密度随频率以 -10dB/decade（约 -3dB/octave）衰减，在音频合成、声学测量和房间声学仿真中广泛使用。

「已核实」PK3 用 7 个一阶 IIR 低通滤波器的加权和来近似目标频响，44100Hz 采样率下 9.2Hz 以上精度在 ±0.05dB 内。另有 PKE（Paul Kellet's economy method）为计算更快但精度稍低的变体，Csound 等音频处理框架将 Kellet 滤波器作为标准粉噪声生成方法内置。

实现结构为 7 个并行一阶低通滤波器（状态变量 b0~b6）对输入白噪声分别滤波后加权求和，其中 b6 取负权。核心参数为各滤波器的极点位置，对应不同截止频率。

有分析认为，PK3 的重要性不在于算法本身的复杂度，而在于它证明了「用极少计算资源（7 个一阶 IIR）即可精确逼近复杂频响」，这一思路影响了后续大量实时音频合成算法的设计。

见：[musicdsp.org - Pink noise filter](https://www.musicdsp.org/en/latest/Filters/76-pink-noise-filter.html)：原始来源与实现代码、[DSP generation of Pink (1/f) Noise](https://www.firstpr.com.au/dsp/pink-noise/)：包含 PK3/PKE 的频响对比分析
