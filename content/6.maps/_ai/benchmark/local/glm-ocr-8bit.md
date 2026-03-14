---
title: glm-ocr-8bit
---

```
oMLX - LLM inference, optimized for your Mac
https://github.com/jundot/omlx
Benchmark Model: GLM-OCR-8bit
================================================================================

Single Request Results
--------------------------------------------------------------------------------
Test                TTFT(ms)    TPOT(ms)        pp TPS        tg TPS      E2E(s)    Throughput    Peak Mem
pp1024/tg128           144.6        5.99  7083.2 tok/s   168.2 tok/s       0.906  1271.9 tok/s     2.33 GB
pp4096/tg128           614.5        5.70  6665.8 tok/s   177.0 tok/s       1.338  3157.5 tok/s     2.62 GB
pp8192/tg128          1257.1        6.80  6516.7 tok/s   148.2 tok/s       2.121  3922.8 tok/s     2.77 GB
pp16384/tg128         4421.9        0.00  3705.2 tok/s     0.0 tok/s       4.422  3705.2 tok/s     3.08 GB

Continuous Batching — Same Prompt
pp1024 + image tokens / tg128 · partial prefix cache hit
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x         168.2 tok/s     1.00x  7083.2 tok/s  7083.2 tok/s       144.6       0.906
2x         204.8 tok/s     1.22x   962.3 tok/s   481.1 tok/s      1290.5       1.339
4x         446.3 tok/s     2.65x  1432.5 tok/s   358.1 tok/s      1734.0       1.779

Continuous Batching — Different Prompts
pp1024 + image tokens / tg128 · no cache reuse
--------------------------------------------------------------------------------
Batch           tg TPS   Speedup        pp TPS    pp TPS/req    TTFT(ms)      E2E(s)
1x         168.2 tok/s     1.00x  7083.2 tok/s  7083.2 tok/s       144.6       0.906
2x         289.9 tok/s     1.72x  1621.5 tok/s   810.8 tok/s       765.9       0.800
4x         369.3 tok/s     2.20x  1619.7 tok/s   404.9 tok/s      1533.6       1.588
```