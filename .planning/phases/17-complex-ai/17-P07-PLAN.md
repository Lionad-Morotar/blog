---
phase: 17
plan: P07
wave: 1
description: Migrate safety.md to existing safety/ subdomain
depends_on: []
files_modified:
  - content/6.maps/_ai/safety/safety.md
autonomous: true
---

# Plan 17-P07: Migrate safety.md to safety/ Subdomain

## Goal
Migrate the root safety.md file into the existing safety/ subdirectory.

## Current State
safety/ directory exists with:
- safety.md (subdomain entry)

Root file to migrate:
- safety.md

## Tasks

### Task 1: Merge root safety.md into subdomain entry

The existing `content/6.maps/_ai/safety/safety.md` appears to be the subdomain entry.

Move `content/6.maps/_ai/safety.md` (root) and merge its content into the existing safety/ entry, OR if they are different files, consolidate them.

Add frontmatter if not present:
```yaml
---
title: AI Safety
description: AI safety, alignment, and responsible AI practices
original_path: _ai/safety.md
---
```

Update the safety.md entry to include ## Topics section with links to safety-related content.

## Verification

- [ ] Root safety.md no longer exists
- [ ] safety/safety.md contains merged content with original_path
