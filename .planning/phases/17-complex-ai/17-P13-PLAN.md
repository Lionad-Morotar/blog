---
phase: 17
plan: P13
wave: 2
description: Migrate workflow/ subdomain with 3 files
depends_on: []
files_modified:
  - content/6.maps/_ai/workflow/workflow.md
  - content/6.maps/_ai/workflow/agentic-engineering.md
  - content/6.maps/_ai/workflow/sdd.md
autonomous: true
---

# Plan 17-P13: Migrate workflow/ Subdomain

## Goal
Reorganize the workflow/ subdomain with proper entry file.

## Current State
workflow/ contains:
- workflow.md
- agentic-engineering.md
- sdd.md
- 0.index.md (A-Z index - may need to relocate or integrate)

## Tasks

### Task 1: Update workflow/workflow.md entry file

Update `content/6.maps/_ai/workflow/workflow.md`:

```yaml
---
title: AI Workflows
description: AI-assisted development workflows and engineering practices
original_path: _ai/workflow/workflow.md
---
```

Content:
```markdown
# AI Workflows

AI-assisted development workflows, agentic engineering, and AI-driven software development practices.

## Topics

- [Agentic Engineering](agentic-engineering) — Agent-driven development workflows
- [SDD](sdd) — Specification-driven development with AI

## Index

- [A-Z Index](0.index) — Alphabetical index of AI topics
```

### Task 2-3: Add frontmatter to workflow topic files

Add original_path to:
- agentic-engineering.md (original_path: _ai/workflow/agentic-engineering.md)
- sdd.md (original_path: _ai/workflow/sdd.md)

### Task 4: Handle 0.index.md

The 0.index.md is an A-Z index. Either:
- Keep it as-is in workflow/ with added original_path frontmatter
- Or relocate to a more appropriate location

Add frontmatter:
```yaml
---
title: AI Topics Index
description: Alphabetical index of AI topics
original_path: _ai/workflow/0.index.md
---
```

## Verification

- [ ] workflow/workflow.md has ## Topics navigation
- [ ] All topic files have original_path frontmatter
- [ ] 0.index.md handled appropriately
