---
phase: 17
plan: P11
wave: 2
description: Migrate prompt/ subdomain with 6 files
depends_on: []
files_modified:
  - content/6.maps/_ai/prompt/prompt.md
  - content/6.maps/_ai/prompt/team-based-instructions.md
  - content/6.maps/_ai/prompt/prompt-engineering.md
  - content/6.maps/_ai/prompt/prompt-paradigm.md
  - content/6.maps/_ai/prompt/prompt-collections.md
  - content/6.maps/_ai/prompt/context-engineering.md
autonomous: true
---

# Plan 17-P11: Migrate prompt/ Subdomain

## Goal
Reorganize the prompt/ subdomain with proper entry file.

## Current State
prompt/ contains:
- prompt.md
- team-based-instructions.md
- prompt-engineering.md
- prompt-paradigm.md
- prompt-collections.md
- context-engineering.md

## Tasks

### Task 1: Update prompt/prompt.md entry file

Update `content/6.maps/_ai/prompt/prompt.md`:

```yaml
---
title: Prompt Engineering
description: Prompt design patterns, techniques, and best practices
original_path: _ai/prompt/prompt.md
---
```

Content:
```markdown
# Prompt Engineering

Prompt design patterns, engineering techniques, and best practices for LLM interactions.

## Topics

- [Prompt Engineering Guide](prompt-engineering) — Core prompt engineering techniques
- [Prompt Paradigms](prompt-paradigm) — Different prompting approaches
- [Context Engineering](context-engineering) — Context window management
- [Team-based Instructions](team-based-instructions) — Multi-persona prompting
- [Prompt Collections](prompt-collections) — Curated prompt examples
```

### Task 2-6: Add frontmatter to prompt topic files

Add original_path to:
- team-based-instructions.md (original_path: _ai/prompt/team-based-instructions.md)
- prompt-engineering.md (original_path: _ai/prompt/prompt-engineering.md)
- prompt-paradigm.md (original_path: _ai/prompt/prompt-paradigm.md)
- prompt-collections.md (original_path: _ai/prompt/prompt-collections.md)
- context-engineering.md (original_path: _ai/prompt/context-engineering.md)

## Verification

- [ ] prompt/prompt.md has ## Topics navigation
- [ ] All 5 topic files have original_path frontmatter
