---
title: qwen3.5-9b-mlx-4bit
---

```
oMLX - LLM inference, optimized for your Mac
https://github.com/jundot/omlx
Benchmark Model: Qwen3.5-9B-MLX-4bit
================================================================================

Single Request Results
--------------------------------------------------------------------------------
Test                TTFT(ms)    TPOT(ms)        pp TPS        tg TPS      E2E(s)    Throughput    Peak Mem
pp1024/tg128          1368.6       14.96   748.2 tok/s    67.4 tok/s       3.268   352.5 tok/s     6.67 GB
pp4096/tg128          5546.2       18.27   738.5 tok/s    55.2 tok/s       7.866   537.0 tok/s     6.97 GB
pp8192/tg128         11319.9       18.77   723.7 tok/s    53.7 tok/s      13.704   607.1 tok/s     7.16 GB
pp16384/tg128        25206.4       24.01   650.0 tok/s    42.0 tok/s      28.256   584.4 tok/s     7.61 GB

Continuous Batching — Same Prompt
pp1024 + image tokens / tg128 · partial prefix cache hit
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          67.4 tok/s     1.00x   748.2 tok/s   748.2 tok/s      1368.6       3.268
2x          65.1 tok/s     0.97x   427.9 tok/s   213.9 tok/s      5577.5      10.995
4x         121.3 tok/s     1.80x  1290.5 tok/s   322.6 tok/s      4683.4       8.903

Continuous Batching — Different Prompts
pp1024 + image tokens / tg128 · no cache reuse
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x          67.4 tok/s     1.00x   748.2 tok/s   748.2 tok/s      1368.6       3.268
2x          60.6 tok/s     0.90x   532.9 tok/s   266.4 tok/s      5670.4       9.894
4x         119.5 tok/s     1.77x   837.3 tok/s   209.3 tok/s      4877.9      11.503
```