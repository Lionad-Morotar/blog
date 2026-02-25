---
phase: 17
plan: P06
wave: 1
description: Create applications/ subdomain for practical AI applications
depends_on: []
files_modified:
  - content/6.maps/_ai/applications/applications.md
  - content/6.maps/_ai/applications/frontend-impact.md
  - content/6.maps/_ai/applications/paper-writing.md
  - content/6.maps/_ai/applications/prompt-engineering.md
autonomous: true
---

# Plan 17-P06: Create applications/ Subdomain

## Goal
Create the applications/ subdomain for practical AI applications and use cases.

## Tasks

### Task 1: Create applications/ directory and entry file

Create `content/6.maps/_ai/applications/applications.md`:

```yaml
---
title: AI Applications
description: Practical AI applications and use cases
---
```

Content:
```markdown
# AI Applications

Practical AI applications, use cases, and domain-specific implementations.

## Topics

- [Frontend Impact](frontend-impact) — AI's impact on frontend development
- [Paper Writing](paper-writing) — AI-assisted academic writing
- [Prompt Engineering](prompt-engineering) — Prompt design and engineering
```

### Task 2-4: Migrate application topic files

Move and add frontmatter:
- `frontend-impact.md` → `applications/frontend-impact.md` (original_path: _ai/frontend-impact.md)
- `paper-writing.md` → `applications/paper-writing.md` (original_path: _ai/paper-writing.md)
- `prompt-engineering.md` → `applications/prompt-engineering.md` (original_path: _ai/prompt-engineering.md)

## Verification

- [ ] applications/ directory exists with entry file
- [ ] 3 topic files migrated with original_path frontmatter
