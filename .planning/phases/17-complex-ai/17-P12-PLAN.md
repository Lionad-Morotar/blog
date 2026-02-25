---
phase: 17
plan: P12
wave: 2
description: Migrate vibe/ subdomain with 6 files
depends_on: []
files_modified:
  - content/6.maps/_ai/vibe/vibe.md
  - content/6.maps/_ai/vibe/complacency.md
  - content/6.maps/_ai/vibe/agents-md.md
  - content/6.maps/_ai/vibe/team-of-agents.md
  - content/6.maps/_ai/vibe/anchoring.md
  - content/6.maps/_ai/vibe/playful-ai.md
autonomous: true
---

# Plan 17-P12: Migrate vibe/ Subdomain

## Goal
Reorganize the vibe/ subdomain with proper entry file.

## Current State
vibe/ contains:
- vibe.md
- complacency.md
- agents-md.md
- team-of-agents.md
- anchoring.md
- playful-ai.md

## Tasks

### Task 1: Update vibe/vibe.md entry file

Update `content/6.maps/_ai/vibe/vibe.md`:

```yaml
---
title: Vibe Coding
description: Vibe coding, AI-assisted development practices, and cultural impacts
original_path: _ai/vibe/vibe.md
---
```

Content:
```markdown
# Vibe Coding

Vibe coding practices, AI-assisted development, and the cultural impact of AI on software engineering.

## Topics

- [Vibe Coding](vibe) — Overview of vibe coding practices
- [Agents.md](agents-md) — AI agents in documentation
- [Team of Agents](team-of-agents) — Multi-agent development workflows
- [Complacency](complacency) — Risks of over-reliance on AI
- [Anchoring](anchoring) — AI anchoring effects
- [Playful AI](playful-ai) — Creative and playful AI applications
```

### Task 2-6: Add frontmatter to vibe topic files

Add original_path to:
- complacency.md (original_path: _ai/vibe/complacency.md)
- agents-md.md (original_path: _ai/vibe/agents-md.md)
- team-of-agents.md (original_path: _ai/vibe/team-of-agents.md)
- anchoring.md (original_path: _ai/vibe/anchoring.md)
- playful-ai.md (original_path: _ai/vibe/playful-ai.md)

## Verification

- [ ] vibe/vibe.md has ## Topics navigation
- [ ] All 5 topic files have original_path frontmatter
