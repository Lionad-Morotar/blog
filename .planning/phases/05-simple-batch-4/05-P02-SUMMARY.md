---
phase: 05-simple-batch-4
plan: 02
subsystem: maps
phase_name: Simple Batch 4
plan_name: Migrate _photography Domain
tags:
  - domain-migration
  - photography
  - 4-layer-structure
requires:
  - 05-P01
provides:
  - _photography-domain-entry
  - techniques-subdomain
affects:
  - content/6.maps/_photography/
tech-stack:
  added: []
  patterns:
    - Domain entry + subdomain directory + original_path preservation
key-files:
  created:
    - content/6.maps/_photography/photography.md
    - content/6.maps/_photography/techniques/techniques.md
  modified: []
decisions: []
metrics:
  duration: 2 minutes
  completed-date: 2026-02-24
---

# Phase 5-02: Migrate _photography Domain Summary

**One-liner:** Migrated _photography domain to 4-layer structure with domain entry file and techniques subdomain.

## What Was Done

1. **Created domain entry file** (`content/6.maps/_photography/photography.md`)
   - YAML frontmatter with title "摄影" and description
   - ## 子领域 section linking to techniques subdomain
   - ## 概述 section with domain overview

2. **Migrated original content** to techniques subdomain
   - Created `content/6.maps/_photography/techniques/` directory
   - Moved `0.index.md` to `techniques/techniques.md`
   - Added `original_path: content/6.maps/_photography/0.index.md` to frontmatter
   - Preserved all original content:
     - 照片好坏衡量标准
     - 光圈和景深的关系
     - 光圈、快门、ISO Cheat Sheet images
     - 自动快门模式场景说明

## Verification Results

- [x] Domain entry file exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to /maps/_photography/techniques/techniques
- [x] Techniques file exists with original content
- [x] Moved file has original_path in frontmatter
- [x] All original content preserved

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| Hash | Message |
|------|---------|
| 2863d25e8 | feat(05-P02): create _photography domain entry file |
| 2e04e5e86 | feat(05-P02): migrate original content to techniques subdomain |

## Self-Check: PASSED

- [x] content/6.maps/_photography/photography.md exists
- [x] content/6.maps/_photography/techniques/techniques.md exists
- [x] Commit 2863d25e8 exists
- [x] Commit 2e04e5e86 exists
