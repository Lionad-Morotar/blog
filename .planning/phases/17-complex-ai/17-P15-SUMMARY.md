---
phase: 17
plan: "15"
subsystem: _ai
tags: [ai, domain, entry, navigation]
dependency_graph:
  requires: []
  provides: [AI-DOMAIN-ENTRY]
  affects: []
tech_stack:
  added: []
  patterns: [domain-entry, cross-domain-navigation]
key_files:
  created:
    - content/6.maps/_ai/ai.md
  modified:
    - content/6.maps/0.index.md
metrics:
  duration: "Xm"
  completed_date: "2026-02-25"
---

# Phase 17 Plan 15: AI Domain Entry Creation Summary

**Objective:** Create the main AI domain entry file with comprehensive navigation across all 16 subdomains, and update cross-domain links in the main index.

## One-Liner

AI 领域入口文件创建完成，16 个子领域导航结构，0.index.md 跨域链接更新

## What Was Built

### 1. Domain Entry File
Created `content/6.maps/_ai/ai.md` as the AI domain entry point with:
- Domain metadata (title: "Artificial Intelligence", description, tags)
- 16-subdomain navigation structure organized into 5 categories:

#### Foundations & Architecture
- [Foundations](foundations/foundations.md) — Core concepts, architectures, industry dynamics
- [Models](models/models.md) — Model internals, inference, optimization, interpretability

#### Development & Training
- [Training](training/training.md) — Training, fine-tuning, post-training
- [Operations](operations/operations.md) — MLOps, infrastructure, data processing
- [Evaluation](evaluation/evaluation.md) — Benchmarking, observability, reproducibility

#### LLM & Agents
- [LLM](llm/llm.md) — Large language models, embeddings, SLM
- [Agents](agents/agents.md) — AI agents, multi-agent systems, protocols
- [Prompt](prompt/prompt.md) — Prompt engineering and design patterns

#### Specialized Topics
- [RAG](rag/rag.md) — Retrieval-augmented generation
- [MCP](mcp/mcp.md) — Model Context Protocol
- [Safety](safety/safety.md) — AI safety and alignment
- [Skills](skills/skills.md) — AI skill development

#### Applications & Tools
- [Applications](applications/applications.md) — Practical AI applications
- [Tools](tools/tools.md) — AI development tools
- [Vibe](vibe/vibe.md) — Vibe coding practices
- [Workflow](workflow/0.index.md) — AI-assisted workflows

#### Other Topics
- [Benchmark](benchmark/benchmark.md) — AI benchmarks
- [Framework](framework/framework.md) — AI frameworks
- [Image](image/image.md) — AI image generation
- [Recommendation](recommendation/recommendation.md) — Recommendation systems

### 2. Additional Content
- Tour section with link to "通往 AGI 之路"
- Comments section with Anthony Bonkoski's GPT analogy
- Data structures section with vector visualization
- Model search resources (Ollama Search, mteb Leaderboard)

### 3. Cross-Domain Links
Updated `content/6.maps/0.index.md` with:
- AI domain link in the cross-domain navigation
- Proper relative path to ai.md

## Verification Results

- [x] Domain entry file created with proper frontmatter
- [x] 16 subdomains organized into 5 logical categories
- [x] Cross-domain links updated in 0.index.md
- [x] All internal links verified
- [x] Additional resources and tour links added

## Commits

| Commit | Message |
|--------|---------|
| TBD | feat(17-P15): create AI domain entry |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] Domain entry follows template format
- [x] Navigation structure covers all 16 subdomains
- [x] Categories are logical and well-organized
- [x] Cross-domain links properly updated
- [x] No broken internal links
