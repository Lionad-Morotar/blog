---
phase: 17
plan: P08
wave: 2
description: Migrate agents/ subdomain with nested structure
depends_on: []
files_modified:
  - content/6.maps/_ai/agents/agents.md
  - content/6.maps/_ai/agents/a2a.md
  - content/6.maps/_ai/agents/a2ui.md
  - content/6.maps/_ai/agents/toxic-flow-analysis.md
autonomous: true
---

# Plan 17-P08: Migrate agents/ Subdomain

## Goal
Reorganize the agents/ subdomain with proper entry file and topic structure.

## Current State
agents/ contains:
- agents.md (needs frontmatter and restructuring)
- a2a.md
- a2ui.md
- toxic-flow-analysis.md
- docs/ (subdirectory)
- goose/ (subdirectory)

Root file to integrate:
- agents.md (root) - if different from agents/agents.md

## Tasks

### Task 1: Update agents/agents.md entry file

Update `content/6.maps/_ai/agents/agents.md` with proper frontmatter:

```yaml
---
title: AI Agents
description: AI agents, autonomous systems, and agent architectures
original_path: _ai/agents/agents.md
---
```

Content structure:
```markdown
# AI Agents

AI agents, autonomous systems, multi-agent architectures, and agent protocols.

## Topics

### Protocols & Standards
- [A2A Protocol](a2a) — Agent-to-Agent protocol
- [A2UI](a2ui) — Agent-to-User Interface patterns

### Analysis & Research
- [Toxic Flow Analysis](toxic-flow-analysis) — Safety analysis for agent systems

### Documentation
- [Agent Documentation](docs/i18n) — Internationalization for agent docs

### Tools & Frameworks
- [Goose](goose/goose-brief) — Open-source agent framework
```

### Task 2-4: Add frontmatter to topic files

Add original_path frontmatter to:
- a2a.md (original_path: _ai/agents/a2a.md)
- a2ui.md (original_path: _ai/agents/a2ui.md)
- toxic-flow-analysis.md (original_path: _ai/agents/toxic-flow-analysis.md)

### Task 5: Migrate root agents.md if different

If `content/6.maps/_ai/agents.md` (root) has different content from `agents/agents.md`, merge it into the subdomain entry.

## Verification

- [ ] agents/agents.md has proper entry structure with ## Topics
- [ ] All topic files have original_path frontmatter
- [ ] Root agents.md handled (merged or removed)
