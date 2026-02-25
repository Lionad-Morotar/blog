---
phase: 17
plan: "04"
subsystem: _ai
tags: [ai, subdomain, migration, mlops]
dependency_graph:
  requires: []
  provides: [COMP-07]
  affects: []
tech_stack:
  added: []
  patterns: [subdomain-entry, original_path-preservation]
key_files:
  created:
    - content/6.maps/_ai/operations/operations.md
    - content/6.maps/_ai/operations/data-processing.md
    - content/6.maps/_ai/operations/distributed.md
    - content/6.maps/_ai/operations/infrastructure.md
    - content/6.maps/_ai/operations/mlops.md
  modified: []
metrics:
  duration: "Xm"
  completed_date: "2026-02-25"
---

# Phase 17 Plan 04: AI Operations Subdomain Summary

**Objective:** Create the operations/ subdomain for MLOps and infrastructure-related content, covering data processing, distributed systems, infrastructure, and MLOps practices.

## One-Liner

AI Operations 子领域创建完成，4 个 MLOps 与基础设施主题文件迁移

## What Was Built

### 1. Entry File
Created `content/6.maps/_ai/operations/operations.md` as the subdomain entry point with:
- Subdomain metadata and navigation structure
- Four operations-related topic categories
- Focus on MLOps and infrastructure concerns

### 2. Migrations
Migrated 4 topic files to the operations/ subdomain:

| File | Original Path | Description |
|------|---------------|-------------|
| data-processing.md | content/6.maps/_ai/... | 数据处理流程 |
| distributed.md | content/6.maps/_ai/... | 分布式训练 |
| infrastructure.md | content/6.maps/_ai/... | AI 基础设施 |
| mlops.md | content/6.maps/_ai/... | MLOps 实践 |

All migrated files include:
- `original_path` field in frontmatter preserving source location
- Updated navigation links
- Proper subdomain categorization

## Verification Results

- [x] Entry file created with proper frontmatter
- [x] 4 topic files migrated with original_path preserved
- [x] All operations topics covered (data/distributed/infra/MLOps)
- [x] Internal links verified
- [x] Files properly categorized

## Commits

| Commit | Message |
|--------|---------|
| TBD | feat(17-P04): create AI operations subdomain |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] Subdomain entry follows template format
- [x] All migrated files have original_path metadata
- [x] Four operations topics comprehensively covered
- [x] File naming conventions consistent
- [x] No broken internal links
