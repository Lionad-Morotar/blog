---
title: qwen3-coder-next-mlx-4bit
---

```
oMLX - LLM inference, optimized for your Mac
https://github.com/jundot/omlx
Benchmark Model: Qwen3-Coder-Next-MLX-4bit
================================================================================

Single Request Results
--------------------------------------------------------------------------------
Test                TTFT(ms)    TPOT(ms)        pp TPS        tg TPS      E2E(s)    Throughput    Peak Mem
pp1024/tg128          1997.7       27.21   512.6 tok/s    37.0 tok/s       5.453   211.2 tok/s    43.02 GB
pp4096/tg128          7688.1       25.68   532.8 tok/s    39.3 tok/s      10.949   385.8 tok/s    43.19 GB
pp8192/tg128         11534.6       27.30   710.2 tok/s    36.9 tok/s      15.002   554.6 tok/s    43.49 GB
pp16384/tg128        24455.4       35.89   670.0 tok/s    28.1 tok/s      29.013   569.1 tok/s    44.14 GB

Continuous Batching — Same Prompt
pp1024 / tg128 · partial prefix cache hit
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          37.0 tok/s     1.00x   512.6 tok/s   512.6 tok/s      1997.7       5.453
2x          78.9 tok/s     2.13x   610.5 tok/s   305.3 tok/s      3354.2       6.601
4x         114.9 tok/s     3.11x   677.7 tok/s   169.4 tok/s      6043.7      10.501

Continuous Batching — Different Prompts
pp1024 / tg128 · no cache reuse
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          37.0 tok/s     1.00x   512.6 tok/s   512.6 tok/s      1997.7       5.453
2x          85.3 tok/s     2.31x   665.8 tok/s   332.9 tok/s      3075.7       6.078
4x          55.7 tok/s     1.51x   413.5 tok/s   103.4 tok/s      9905.6      19.098
```