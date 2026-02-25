---
phase: 15-complex-person
plan: "01"
subsystem: _person
tags:
  - subdomain
  - migration
  - technology
  - person-domain
dependency_graph:
  requires: []
  provides:
    - technology-subdomain-structure
    - person-files-with-original-path
  affects:
    - content/6.maps/_person/technology/*
tech-stack:
  added: []
  patterns:
    - subdomain-directory-structure
    - original-path-frontmatter
key-files:
  created:
    - content/6.maps/_person/technology/technology.md
    - content/6.maps/_person/technology/andrej-karpathy.md
    - content/6.maps/_person/technology/evan-martin.md
    - content/6.maps/_person/technology/evan-schwartz.md
    - content/6.maps/_person/technology/gary-marcus.md
    - content/6.maps/_person/technology/peter-steinberger.md
    - content/6.maps/_person/technology/richard-stallman.md
    - content/6.maps/_person/technology/shunyu-yao.md
  modified: []
decisions:
  - Organized 7 tech figures into 3 categories: AI研究员、软件工程师、开源活动家
metrics:
  duration: "3m"
  completed_date: "2026-02-25"
---

# Phase 15 Plan 01: Technology Subdomain Creation Summary

Created the technology subdomain for the _person domain, organizing 7 contemporary tech figures into a cohesive navigation structure grouped by professional category.

## What Was Built

### Subdomain Entry
- **technology.md**: Domain entry with Chinese title "技术人物" and description covering software engineers, AI researchers, and open source activists
- Organized navigation into 3 logical categories:
  - **AI 研究员**: Andrej Karpathy, Gary Marcus, 姚顺雨 (Shunyu Yao)
  - **软件工程师**: Evan Martin, Evan Schwartz, Peter Steinberger
  - **开源活动家**: Richard Stallman

### Migrated Person Files
All 7 person files migrated from `_person/` root to `_person/technology/` subdirectory with `original_path` frontmatter preserved:

| File | Original Path | Category |
|------|---------------|----------|
| andrej-karpathy.md | content/6.maps/_person/andrej-karpathy.md | AI研究员 |
| evan-martin.md | content/6.maps/_person/evan-martin.md | 软件工程师 |
| evan-schwartz.md | content/6.maps/_person/evan-schwartz.md | 软件工程师 |
| gary-marcus.md | content/6.maps/_person/gary-marcus.md | AI研究员 |
| peter-steinberger.md | content/6.maps/_person/peter-steinberger.md | 软件工程师 |
| richard-stallman.md | content/6.maps/_person/richard-stallman.md | 开源活动家 |
| shunyu-yao.md | content/6.maps/_person/shunyu-yao.md | AI研究员 |

## Commits

| Commit | Description |
|--------|-------------|
| 9cfe85a61 | feat(15-01): create technology subdomain entry with navigation to 7 tech figures |
| 2e71bf9f8 | feat(15-01): migrate 7 tech person files to technology/ subdirectory |

## Verification Results

- [x] technology/ directory exists with 8 files (1 entry + 7 person files)
- [x] All 7 person files have original_path pointing to old location
- [x] All H4 knowledge points intact in migrated files
- [x] technology.md links to all 7 person files correctly
- [x] Original files removed from _person root

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

All files verified:
- [x] content/6.maps/_person/technology/technology.md
- [x] content/6.maps/_person/technology/andrej-karpathy.md
- [x] content/6.maps/_person/technology/evan-martin.md
- [x] content/6.maps/_person/technology/evan-schwartz.md
- [x] content/6.maps/_person/technology/gary-marcus.md
- [x] content/6.maps/_person/technology/peter-steinberger.md
- [x] content/6.maps/_person/technology/richard-stallman.md
- [x] content/6.maps/_person/technology/shunyu-yao.md

All commits verified:
- [x] 9cfe85a61
- [x] 2e71bf9f8
