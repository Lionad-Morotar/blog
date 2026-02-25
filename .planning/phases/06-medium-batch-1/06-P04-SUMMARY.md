---
phase: 06-medium-batch-1
plan: 04
subsystem: _server domain
started_at: 2026-02-24T11:17:38Z
completed_at: 2026-02-24T11:22:00Z
duration_seconds: 282
tasks_total: 3
tasks_completed: 3
files_created: 1
files_modified: 2
key_decisions: []
dependencies: []
---

# Phase 6-04: Migrate _server Domain Summary

**One-liner:** Migrated _server domain to 4-layer structure with formalized nodejs subdomain, renamed entry file to nodejs.md, and updated cross-domain links.

## What Was Done

1. **Created _server domain entry file** (`content/6.maps/_server/server.md`)
   - Added YAML frontmatter with title "服务端" and description
   - Included ## 子领域 section linking to nodejs subdomain
   - Added ## 概述 section with domain overview

2. **Formalized nodejs subdomain structure**
   - Renamed `index.md` to `nodejs.md` for consistency with 4-layer structure
   - Added `original_path: content/6.maps/_server/nodejs/index.md` to nodejs.md frontmatter
   - Added `original_path: content/6.maps/_server/nodejs/source/require.md` to require.md frontmatter
   - Preserved all original content including NodeJS 简介, V8, API, 源码解析, 调试 sections
   - Internal links remain valid (source/require path unchanged)

3. **Updated cross-domain links in 0.index.md**
   - Changed NodeJS link from `/maps/_server/nodejs` to `/maps/_server/nodejs/nodejs`

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `content/6.maps/_server/server.md` | Created | Domain entry with subdomain navigation |
| `content/6.maps/_server/nodejs/nodejs.md` | Renamed + Modified | Subdomain entry (from index.md) with original_path |
| `content/6.maps/_server/nodejs/source/require.md` | Modified | Added original_path to frontmatter |
| `content/6.maps/0.index.md` | Modified | Updated NodeJS link to new path |

## Commits

| Hash | Type | Message |
|------|------|---------|
| `19403aa22` | feat | create _server domain entry file |
| `599d727b8` | feat | formalize nodejs subdomain structure |
| `bce4d07f3` | fix | update cross-domain links for _server domain migration |

## Verification

- [x] `content/6.maps/_server/server.md` exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to /maps/_server/nodejs/nodejs
- [x] `content/6.maps/_server/nodejs/nodejs.md` exists (renamed from index.md)
- [x] nodejs.md has original_path in frontmatter
- [x] `content/6.maps/_server/nodejs/source/require.md` has original_path in frontmatter
- [x] All original content preserved in both files
- [x] 0.index.md link updated to /maps/_server/nodejs/nodejs

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] All created files exist
- [x] All commits recorded
- [x] No broken internal links introduced
