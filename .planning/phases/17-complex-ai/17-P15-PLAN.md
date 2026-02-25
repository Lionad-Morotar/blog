---
phase: 17
plan: P15
wave: 3
description: Create ai.md domain entry with full navigation and update cross-domain links
depends_on: [P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14]
files_modified:
  - content/6.maps/_ai/ai.md
  - content/6.maps/0.index.md
autonomous: true
---

# Plan 17-P15: Create AI Domain Entry

## Goal
Create the ai.md domain entry file with full subdomain navigation and update cross-domain links.

## Tasks

### Task 1: Create ai.md domain entry

Create `content/6.maps/_ai/ai.md`:

```yaml
---
title: Artificial Intelligence
description: Machine learning, large language models, AI agents, and AI engineering
tags: [AI, ML, LLM, Agents]
---
```

Content:
```markdown
# Artificial Intelligence

Machine learning, large language models, AI agents, and AI engineering practices.

## Subdomains

### Foundations & Architecture
- [Foundations](foundations/) — Core concepts, architectures, industry dynamics
- [Models](models/) — Model internals, inference, optimization, interpretability

### Development & Training
- [Training](training/) — Training, fine-tuning, post-training
- [Operations](operations/) — MLOps, infrastructure, data processing
- [Evaluation](evaluation/) — Benchmarking, observability, reproducibility

### LLM & Agents
- [LLM](llm/) — Large language models, embeddings, SLM
- [Agents](agents/) — AI agents, multi-agent systems, protocols
- [Prompt](prompt/) — Prompt engineering and design patterns

### Specialized Topics
- [RAG](rag/) — Retrieval-augmented generation
- [MCP](mcp/) — Model Context Protocol
- [Safety](safety/) — AI safety and alignment
- [Skills](skills/) — AI skill development

### Applications & Tools
- [Applications](applications/) — Practical AI applications
- [Tools](tools/) — AI development tools
- [Vibe](vibe/) — Vibe coding practices
- [Workflow](workflow/) — AI-assisted workflows

### Other Topics
- [Benchmark](benchmark/) — AI benchmarks
- [Framework](framework/) — AI frameworks
- [Image](image/) — AI image generation
- [Recommendation](recommendation/) — Recommendation systems

## Tour

* [通往 AGI 之路](https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e)

## 评论

Anthony Bonkoski 将 GPT 类比为"人类知识的极大似然估计器"，即其知识面广泛覆盖但缺乏深度，能给人提供平均化的标准答案。

见：[ChatGPT: A Mental Model](https://xorvoid.com/chatgpt_a_mental_model.html)

## 数据结构

#### 向量可视化

使用 [projector.tensorflow](https://projector.tensorflow.org/) 在低维度空间查看不同向量的某个特征的分布情况。

## 模型搜索

* [Ollama Search](https://ollama.com/library/qwen3-embedding)
* [mteb Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
```

### Task 2: Update 0.index.md cross-domain links

Update the AI section in `content/6.maps/0.index.md` to point to the new subdomain paths.

Find the AI section and update links from:
- `/maps/_ai/xxx` → `/maps/_ai/subdomain/xxx`

### Task 3: Remove old ai.md backup

If the original `ai.md` was moved to `foundations/`, ensure no duplicate exists at root.

## Verification

- [ ] ai.md created with 16-subdomain navigation
- [ ] 0.index.md links updated to new paths
- [ ] No duplicate content at old paths

## must_haves

- [ ] All 16 subdomains linked from domain entry
- [ ] Cross-domain links in 0.index.md updated
- [ ] Domain entry preserves key knowledge points (数据结构, 评论, Tour)
