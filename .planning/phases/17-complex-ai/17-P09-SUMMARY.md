---
phase: 17
plan: "09"
subsystem: _ai
tags: [ai, subdomain, migration, benchmark, framework]
dependency_graph:
  requires: []
  provides: []
  affects: []
tech_stack:
  added: []
  patterns: [subdomain-entry, original_path-preservation]
key_files:
  created:
    - content/6.maps/_ai/framework/framework.md
  modified:
    - content/6.maps/_ai/benchmark/benchmark.md
    - content/6.maps/_ai/benchmark/cl-bench.md
    - content/6.maps/_ai/benchmark/simple.md
    - content/6.maps/_ai/framework/saif.md
metrics:
  duration: "Xm"
  completed_date: "2026-02-25"
---

# Phase 17 Plan 09: Benchmark and Framework Subdomains Migration Summary

**Objective:** Reorganize the benchmark/ and framework/ subdomains with proper entry files and topic structure.

## One-Liner

Benchmark 与 Framework 子领域完成，2 个入口文件创建/更新，3 个主题文件添加元数据

## What Was Built

### 1. Benchmark Subdomain
Updated `content/6.maps/_ai/benchmark/benchmark.md` as the entry point:
- Added `original_path: _ai/benchmark.md` metadata
- Comprehensive benchmark resources and leaderboards
- Links to CL-Bench and simple benchmark topic files

### 2. Framework Subdomain Entry
Created `content/6.maps/_ai/framework/framework.md` as new entry point:
- Added `original_path: _ai/framework.md` metadata
- Links to SAIF (Secure AI Framework)
- Minimal structure for future framework additions

### 3. Topic File Updates
Added `original_path` frontmatter to 3 topic files:

| File | Subdomain | Original Path | Description |
|------|-----------|---------------|-------------|
| cl-bench.md | benchmark | _ai/benchmark/cl-bench.md | Continual learning benchmarks |
| simple.md | benchmark | _ai/benchmark/simple.md | Simple evaluation methods |
| saif.md | framework | _ai/framework/saif.md | Google Secure AI Framework |

## Verification Results

- [x] benchmark/benchmark.md updated with ## Topics navigation
- [x] framework/framework.md entry file created
- [x] All 3 topic files have original_path frontmatter
- [x] Navigation structure implemented for both subdomains
- [x] All internal links verified

## Commits

| Commit | Message |
|--------|---------|
| TBD | feat(17-P09): migrate benchmark and framework subdomains |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] Both subdomain entries follow template format
- [x] All topic files have original_path metadata
- [x] Navigation structure is clear and organized
- [x] File naming conventions consistent
- [x] No broken internal links
