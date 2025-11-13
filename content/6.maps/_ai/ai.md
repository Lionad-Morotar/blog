---
title: Machine Learning
description: machine learning related
---

## 评论

Anthony Bonkoski 将 GPT 类比为“人类知识的极大似然估计器”，即其知识面广泛覆盖但缺乏深度，能给人提供平均化的标准答案。

见：[ChatGPT: A Mental Model](https://xorvoid.com/chatgpt_a_mental_model.html)，[ChatGPT: A Mental Model @MaxAI](https://www.maxai.co/share?id=a9d5c747a70c3c1a40b43ba6128b22e90a114e588de17c84fc4abba9)

## 阅读更多

* [通往 AGI 之路](https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e)

## 数据结构

#### 向量可视化

使用 [projector.tensorflow](https://projector.tensorflow.org/) 在低维度空间查看不同向量的某个特征的分布情况。

## 模型搜索

* [Ollama Search](https://ollama.com/library/qwen3-embedding)
* [mteb Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)：多语言文本嵌入基准测试排行榜，用于比较各模型在不同任务上的嵌入效果。

## NLP

#### 将 LLMs 及 NLP 结合

将传统 NLP 方法如聚类分类、主题识别和 LLMs 结合，以获得 LLMs 的高注意力跨度和记忆力。

### LLM

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

* [simple-benchmark](/maps/_ai/benchmark/simple)

#### Prompt

* [Prompt](/maps/_ai/prompt/prompt)
* [Prompt Collections](/maps/_ai/prompt/prompt-collections)
* [Stable Diffusion Prompt](/maps/_ai/image/stable-diffusion)

#### RAG

* [Retrieval-augmented Generated](/maps/_ai/rag/rag)

## 案例

* [AI辅助游戏开发极简案例：一个解谜卡牌对战小游戏](https://indienova.com/indie-game-development/ai-assisted-game-development-minimal-case-study/)
