---
title: mlx-qwen3.5-27b-claude-4.6-opus-reasoning-distilled-4bit
---

```
oMLX - LLM inference, optimized for your Mac
https://github.com/jundot/omlx
Benchmark Model: MLX-Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-4bit
================================================================================

Single Request Results
--------------------------------------------------------------------------------
Test                TTFT(ms)    TPOT(ms)        pp TPS        tg TPS      E2E(s)    Throughput    Peak Mem
pp1024/tg128          5093.5       45.03   201.0 tok/s    22.4 tok/s      10.813   106.5 tok/s    15.77 GB
pp4096/tg128         20502.9       57.71   199.8 tok/s    17.5 tok/s      27.832   151.8 tok/s    16.13 GB
pp8192/tg128         45980.8       60.61   178.2 tok/s    16.6 tok/s      53.678   155.0 tok/s    16.55 GB
pp16384/tg128       139994.3      159.94   117.0 tok/s     6.3 tok/s     160.307   103.0 tok/s    17.46 GB

Continuous Batching — Same Prompt
pp1024 / tg128 · partial prefix cache hit
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          22.4 tok/s     1.00x   201.0 tok/s   201.0 tok/s      5093.5      10.813
2x           9.5 tok/s     0.42x   104.0 tok/s    52.0 tok/s     19700.6      46.518
4x          23.9 tok/s     1.07x   132.3 tok/s    33.1 tok/s     30958.9      52.337

Continuous Batching — Different Prompts
pp1024 / tg128 · no cache reuse
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          22.4 tok/s     1.00x   201.0 tok/s   201.0 tok/s      5093.5      10.813
2x          19.9 tok/s     0.89x   100.9 tok/s    50.5 tok/s     20306.5      33.146
4x          23.8 tok/s     1.06x   125.9 tok/s    31.5 tok/s     32538.9      54.079
```