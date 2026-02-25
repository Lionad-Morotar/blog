---
phase: 04-simple-batch-3
plan: "05"
subsystem: maps
phase_number: 4
plan_number: 5
tags:
  - migration
  - domain-restructure
  - cross-domain-links
  - 4-layer-structure
dependency_graph:
  requires:
    - 04-01
    - 04-02
    - 04-03
  provides:
    - _blogs domain with 4-layer structure
    - Updated cross-domain links
  affects:
    - content/6.maps/_blogs/
    - content/6.maps/0.index.md
    - content/6.maps/_industry/low-code.md
tech_stack:
  added: []
  patterns:
    - Domain entry file with subdomain navigation
    - Content migration with original_path preservation
    - Cross-domain link updates
key_files:
  created:
    - content/6.maps/_blogs/blogs.md
    - content/6.maps/_blogs/software-engineering/herb-caudill.md
  modified:
    - content/6.maps/0.index.md
    - content/6.maps/_industry/low-code.md
  deleted:
    - content/6.maps/_blogs/herb-caudill.md
decisions: []
metrics:
  duration_minutes: 3
  completed_at: "2026-02-24T10:07:00Z"
  tasks_completed: 3
  files_created: 2
  files_modified: 2
  files_deleted: 1
---

# Phase 4-05: Migrate _blogs Domain and Update Cross-Domain Links

## Summary

Migrated the _blogs domain to the 4-layer structure by creating a domain entry file, moving original herb-caudill.md content to a software-engineering subdomain directory, and updating all cross-domain links in 0.index.md and _industry/low-code.md.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create _blogs domain entry file | afaa634be | content/6.maps/_blogs/blogs.md |
| 2 | Create subdomain and migrate original content | 0d68eacf7 | content/6.maps/_blogs/software-engineering/herb-caudill.md |
| 3 | Update cross-domain links | a7b4f1a6b | content/6.maps/0.index.md, content/6.maps/_industry/low-code.md |

## Changes Made

### Created Files

1. **content/6.maps/_blogs/blogs.md** - Domain entry file with:
   - YAML frontmatter (title: 博客精选, description)
   - ## 子领域 section linking to software-engineering subdomain
   - ## 概述 section with domain overview

2. **content/6.maps/_blogs/software-engineering/herb-caudill.md** - Migrated content with:
   - Original content preserved (3 blog post summaries)
   - Added original_path frontmatter for history tracking
   - Kept semantic filename (herb-caudill.md)

### Modified Files

1. **content/6.maps/0.index.md**:
   - Line 143: `[游戏](/maps/_game/game)` → `[游戏](/maps/_game/game/game)`
   - Line 149: `[注册公司](/maps/_company/company)` → `[注册公司](/maps/_company/business/company)`

2. **content/6.maps/_industry/low-code.md**:
   - Line 45: `[Herb Caudill](/maps/_blogs/herb-caudill)` → `[Herb Caudill](/maps/_blogs/software-engineering/herb-caudill)`

### Deleted Files

1. **content/6.maps/_blogs/herb-caudill.md** - Original file removed after migration

## Verification Results

- [x] content/6.maps/_blogs/blogs.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to /maps/_blogs/software-engineering/herb-caudill
- [x] content/6.maps/_blogs/software-engineering/herb-caudill.md exists with original content
- [x] Moved file has original_path: content/6.maps/_blogs/herb-caudill.md in frontmatter
- [x] All original content preserved (3 blog post summaries)
- [x] 0.index.md line 143 updated to /maps/_game/game/game
- [x] 0.index.md line 149 updated to /maps/_company/business/company
- [x] _industry/low-code.md line 45 updated to /maps/_blogs/software-engineering/herb-caudill

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

All created files exist, all commits recorded, all verifications passed.
