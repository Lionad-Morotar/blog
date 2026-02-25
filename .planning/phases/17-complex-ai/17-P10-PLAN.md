---
phase: 17
plan: P10
wave: 2
description: Migrate llm/ subdomain with nested datadog/ subdirectory
depends_on: []
files_modified:
  - content/6.maps/_ai/llm/llm.md
  - content/6.maps/_ai/llm/embeddings.md
  - content/6.maps/_ai/llm/slm.md
  - content/6.maps/_ai/llm/structured-output.md
  - content/6.maps/_ai/llm/llm-as-a-judge.md
  - content/6.maps/_ai/llm/datadog/datadog-llm.md
autonomous: true
---

# Plan 17-P10: Migrate llm/ Subdomain

## Goal
Reorganize the llm/ subdomain with proper entry file and nested structure.

## Current State
llm/ contains:
- llm.md
- embeddings.md
- slm.md
- structured-output.md
- llm-as-a-judge.md
- datadog/ (subdirectory with datadog-llm.md)

## Tasks

### Task 1: Update llm/llm.md entry file

Update `content/6.maps/_ai/llm/llm.md`:

```yaml
---
title: Large Language Models
description: LLM technologies, embeddings, and small language models
original_path: _ai/llm/llm.md
---
```

Content:
```markdown
# Large Language Models

Large Language Models (LLMs), embeddings, structured output, and evaluation techniques.

## Topics

### Core Concepts
- [LLM Overview](llm) — Large language model fundamentals
- [SLM](slm) — Small language models
- [Embeddings](embeddings) — Vector embeddings and representations

### Techniques
- [Structured Output](structured-output) — Constrained generation
- [LLM-as-a-Judge](llm-as-a-judge) — Using LLMs for evaluation

### Observability
- [Datadog LLM](datadog/datadog-llm) — LLM observability with Datadog
```

### Task 2-5: Add frontmatter to llm topic files

Add original_path to:
- embeddings.md (original_path: _ai/llm/embeddings.md)
- slm.md (original_path: _ai/llm/slm.md)
- structured-output.md (original_path: _ai/llm/structured-output.md)
- llm-as-a-judge.md (original_path: _ai/llm/llm-as-a-judge.md)

### Task 6: Add frontmatter to datadog-llm.md

Update `content/6.maps/_ai/llm/datadog/datadog-llm.md`:
```yaml
---
title: Datadog LLM Observability
description: LLM observability and monitoring with Datadog
original_path: _ai/llm/datadog/datadog-llm.md
---
```

## Verification

- [ ] llm/llm.md has ## Topics navigation
- [ ] All 4 topic files have original_path frontmatter
- [ ] datadog/datadog-llm.md has original_path frontmatter
