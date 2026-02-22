---
title: Large Language Models
description: large language models related
---

## Tour

* [Embeddings 入门指南](/maps/_ai/llm/embeddings)

## Domain

* [结构化输出](/maps/_ai/llm/structured-output)
* [LLM as a judge](/maps/_ai/llm/llm-as-a-judge)
* [Benchmark](/maps/_ai/benchmark/benchmark)

## 日志审计

* [Datadog LLM Observability](/maps/_ai/llm/datadog/datadog-llm)

## 常见问题

#### 面试题

* [《图解大模型》配套阅读——大模型面试题 200 问](https://zhuanlan.zhihu.com/p/1899948583878394136)
* [About LLMs interview notes and answers](https://github.com/naginoa/LLMs_interview_notes)

#### 如何下载模型？

可以使用 python 的 huggingface-hub 包下载 huggingface 上的模型；国内用户可以使用镜像源 hf-mirror 加速下载。

#### Price

各闭源 LLMs API 价格对比及参考：

<table class="rate-table">
  <tbody>
    <tr>
      <th
        style="
          border: 1px solid rgb(150, 150, 150);
          padding: 8px;
          text-align: center;
        "
      >
        模型
      </th>
      <th
        style="
          border: 1px solid rgb(150, 150, 150);
          padding: 8px;
          text-align: center;
        "
      >
        官网价格
      </th>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        claude-3-opus
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.015 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.075 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        claude-3-opus-20240229
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.015 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.075 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        claude-3-sonnet
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.003 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.015 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        claude-3-sonnet-20240229
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.003 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.015 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        claude-3-haiku
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        claude-3-haiku-20240229
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        claude-3-haiku-20240307
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.00025 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.00125 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-4-all
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        逆向 ChatGPT 官网版 GPT-4
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        DALL·E 3 绘图、联网、GPTs
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">gpt-4</td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.03 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.06 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-4-32k
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.06 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.12 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-4-0125-preview
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.01 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.03 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-4-turbo
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        gpt-4-turbo-2024-04-09
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.01 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.03 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-4-turbo-preview
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        gpt-4-1106-preview
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        gpt-4-vision-preview
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        gpt-4-1106-vision-preview
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.01 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.03 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-3.5-turbo
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.0015 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.002 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-3.5-turbo-0125
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.0005 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.0015 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-3.5-turbo-1106
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.001 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.002 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-3.5-turbo-0301
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        gpt-3.5-turbo-0613
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.0015 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.002 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        gpt-3.5-turbo-16k
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        gpt-3.5-turbo-16k-0613
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        Input：$0.003 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        Output：$0.004 / 1K tokens
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        dall-e-3
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        1024x1024 - $0.04 / image<br />
        1024x1792 - $0.08 / image<br />
        1792x1024 - $0.08 / image
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        HD 1024x1024 - $0.08 / image<br />
        HD 1024x1792 - $0.12 / image<br />
        HD 1792x1024 - $0.12 / image
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        whisper-1
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        $0.006 / minute
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        tts-1<br />
        tts-1-1106
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        tts-1-hd<br />
        tts-1-hd-1106
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        $0.015 / 1K characters<br />
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        $0.03 / 1K characters<br />
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        text-embedding-ada-002
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        text-embedding-3-small
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        text-embedding-3-large
      </td>
      <td style="border: 1px solid rgb(150, 150, 150); padding: 8px">
        $0.0001 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        $0.00002 / 1K tokens
        <div style="border-top: 1px solid #ddd; margin: 4px 0"></div>
        $0.00013 /1 k tokens
      </td>
    </tr>
  </tbody>
</table>

见：[GPTAPI](https://www.gptapi.us/)

<!-* [...$('.rate-table').querySelectorAll('tr th:nth-child(3), tr td:nth-child(3)')].forEach(x => x.remove()) -->

#### Benchmark

* [LLM Benchmark](/maps/_ai/benchmark/benchmark)
* [simple-benchmark](/maps/_ai/benchmark/simple)

#### Prompt

* [Prompt](/maps/_ai/prompt/prompt)
* [Prompt Collections](/maps/_ai/prompt/prompt-collections)
* [Stable Diffusion Prompt](/maps/_ai/image/stable-diffusion)

## 核心概念

#### LLM 训练的三阶段流程？

**预训练（Pre-training）**

从互联网大规模获取知识，将海量文本压缩到神经网络参数中。使用 FineWeb 等数据集，通过"预测下一个词"的任务迫使模型学习世界知识。这是一个有损压缩过程——模型学到的是文本的"格式塔"而非精确复制。

**监督微调（SFT）**

通过人工标注的指令-回复对，教模型如何以助手的方式回应。OpenAI 等公司雇佣数据标注员，编写理想的助手回复示例。这是模型"个性"形成的关键阶段——模型本质上是数据标注员的神经网络模拟。

**强化学习（RL）**

思考型模型（如 o3-mini、o1）通过强化学习发现新的思考策略。在可验证领域（数学、代码）中练习时，模型可能发展出人类从未想过的解法，类似 AlphaGo 的"第37手"。这是模型超越单纯模仿、展现涌现能力的关键阶段。

见：[State of GPT - Andrej Karpathy](https://www.youtube.com/watch?v=bZQun8Y4L2A)

#### 瑞士奶酪能力模型？

LLM 的能力分布像瑞士奶酪一样有洞——某些方面表现惊艳（写作、翻译、知识问答），却会在出人意料的简单任务上失败（计数字母、比较小数大小、简单算术）。

这种不均匀性源于：
- **有限计算预算**：每次生成 token 只能进行固定量的计算
- **有损压缩**：模型学到的是统计模式而非精确规则
- **训练分布偏差**：互联网文本中某些技能被过度/不足代表

这意味着不应盲目信任模型输出，尤其在需要精确性的场景。建议将 LLM 视为"工具箱中的一员"，用于灵感启发和初稿生成，但始终需要人工验证。

见：[How I use LLM - Andrej Karpathy](https://www.youtube.com/watch?v=EWvNQjAaOHw)
