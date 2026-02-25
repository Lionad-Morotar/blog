---
phase: 04-simple-batch-3
plan: 04
subsystem: _cli domain
completed: 2026-02-24
duration: 2 minutes
tags: [migration, cli, domain-structure, 4-layer]
dependency_graph:
  requires: []
  provides:
    - _cli domain entry file
    - tools subdomain structure
  affects:
    - content/6.maps/0.index.md
tech_stack:
  added: []
  patterns:
    - Domain entry + subdomain directory migration
    - original_path frontmatter preservation
key_files:
  created:
    - content/6.maps/_cli/cli.md
    - content/6.maps/_cli/tools/ffmpeg.md
  modified:
    - content/6.maps/0.index.md
  deleted:
    - content/6.maps/_cli/ffmpeg.md
decisions:
  - Kept original filename (ffmpeg.md) as it carries semantic meaning
  - Used "tools" as subdomain name for media processing utilities
  - Preserved all original content including FFMPEG and ImageMagick commands
metrics:
  tasks_completed: 3
  files_created: 2
  files_modified: 1
  files_deleted: 1
  commits: 3
---

# Phase 4-04: Migrate _cli Domain Summary

**One-liner:** Migrated _cli domain to 4-layer structure with domain entry, tools subdomain, and preserved original_path metadata.

## What Was Done

### Task 1: Create _cli domain entry file
Created `content/6.maps/_cli/cli.md` with:
- YAML frontmatter with title "CLI" and description "命令行工具、脚本和自动化"
- ## 子领域 section linking to `/maps/_cli/tools/ffmpeg`
- ## 概述 section with domain overview

### Task 2: Create subdomain and migrate original content
- Created `content/6.maps/_cli/tools/` directory
- Moved original `ffmpeg.md` to `tools/ffmpeg.md`
- Added `original_path: content/6.maps/_cli/ffmpeg.md` to frontmatter
- Preserved all original content:
  - FFMPEG commands (拷贝视频片段, 拼接视频片段, 视频转图片, 视频转音频)
  - ImageMagick commands (转换图片格式)
- Removed original file

### Task 3: Update cross-domain link in 0.index.md
- Updated line 68 from `/maps/_cli/ffmpeg` to `/maps/_cli/tools/ffmpeg`

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

All 8 verification checks passed:
- [x] content/6.maps/_cli/cli.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to /maps/_cli/tools/ffmpeg
- [x] content/6.maps/_cli/tools/ffmpeg.md exists with original content
- [x] Moved file has original_path: content/6.maps/_cli/ffmpeg.md in frontmatter
- [x] All original content preserved (FFMPEG and ImageMagick commands)
- [x] 0.index.md line 68 updated to /maps/_cli/tools/ffmpeg

## Commits

| Hash | Type | Message |
|------|------|---------|
| 502e7abe2 | feat | create _cli domain entry file |
| d86f43700 | feat | migrate ffmpeg.md to tools subdomain |
| 3e7ff22a6 | fix | update cross-domain link to _cli/tools/ffmpeg |

## Self-Check: PASSED

All created files verified to exist:
- [x] content/6.maps/_cli/cli.md
- [x] content/6.maps/_cli/tools/ffmpeg.md

All commits verified in git log.
