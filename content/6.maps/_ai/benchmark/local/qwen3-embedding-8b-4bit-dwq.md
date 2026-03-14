---
title: qwen3-coder-next-mlx-4bit
---

```
oMLX - LLM inference, optimized for your Mac
https://github.com/jundot/omlx
Benchmark Model: Qwen3-Embedding-8B-4bit-DWQ
================================================================================

Single Request Results
--------------------------------------------------------------------------------
Test                TTFT(ms)    TPOT(ms)        pp TPS        tg TPS      E2E(s)    Throughput    Peak Mem
pp1024/tg128          1548.5       14.52   661.9 tok/s    69.4 tok/s       3.393   339.8 tok/s     4.70 GB
pp4096/tg128          5949.1       18.09   688.7 tok/s    55.7 tok/s       8.246   512.3 tok/s     5.23 GB
pp8192/tg128         13253.6       22.81   618.2 tok/s    44.2 tok/s      16.150   515.2 tok/s     5.71 GB
pp16384/tg128        33571.2       31.42   488.1 tok/s    32.1 tok/s      37.561   439.6 tok/s     6.81 GB

Continuous Batching — Same Prompt
pp1024 / tg128 · partial prefix cache hit
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          69.4 tok/s     1.00x   661.9 tok/s   661.9 tok/s      1548.5       3.393
2x         100.6 tok/s     1.45x   562.9 tok/s   281.4 tok/s      3638.4       6.183
4x         120.0 tok/s     1.73x  2529.7 tok/s   632.4 tok/s      1619.1       5.887

Continuous Batching — Different Prompts
pp1024 / tg128 · no cache reuse
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          69.4 tok/s     1.00x   661.9 tok/s   661.9 tok/s      1548.5       3.393
2x          99.0 tok/s     1.43x   606.7 tok/s   303.4 tok/s      3375.4       5.962
4x         112.5 tok/s     1.62x  1056.9 tok/s   264.2 tok/s      2183.5       8.428
```
