---
phase: 12-complex-devops
plan: 01
subsystem: _devops
tags: [domain-entry, version-control, migration, merge]
dependency_graph:
  requires: []
  provides: [12-complex-devops-domain-structure]
  affects: [content/6.maps/_devops/*]
tech-stack:
  added: []
  patterns: [4-layer-hierarchy, original_path-metadata, content-merging]
key-files:
  created:
    - content/6.maps/_devops/version-control/version-control.md
    - content/6.maps/_devops/version-control/dorothy.md
    - content/6.maps/_devops/version-control/gitflow.md
    - content/6.maps/_devops/version-control/pre-commit-hook.md
  modified:
    - content/6.maps/_devops/devops.md
  deleted:
    - content/6.maps/_devops/git.md
    - content/6.maps/_devops/version-control.md
    - content/6.maps/_devops/git/ (directory)
decisions:
  - Merged git.md and version-control.md into single subdomain entry
  - Preserved all H4 knowledge points as inline content (not separate files)
  - Added original_path metadata to all migrated files for traceability
  - Created ## 主题 section with 4 topic links in version-control.md
  - Updated devops.md with ## 子领域 navigation to all 4 subdomains
metrics:
  duration: 2m 48s
  completed_date: 2026-02-24
---

# Phase 12 Plan 01: Create Domain Entry and version-control/ Subdomain Summary

## One-Liner
Created _devops domain entry with 4-subdomain navigation and reorganized version-control content by merging two files and migrating three files from git/ subdirectory.

## What Was Done

### Task 1: Create _devops Domain Entry
- Updated `content/6.maps/_devops/devops.md` with:
  - New ## 子领域 section linking to all 4 subdomains (version-control, CI/CD, container, logging)
  - New ## 概述 section with DevOps practices overview
  - Preserved existing image and description

### Task 2: Create version-control/ Subdomain with Merged Content
- Created `content/6.maps/_devops/version-control/` directory
- Created merged `version-control.md` combining content from:
  - `git.md` (primary source) - all Git-related H4 knowledge points
  - `version-control.md` - semantic versioning content
- Added ## 主题 section with links to 4 topics (dorothy, gitflow, pre-commit-hook, semantic-versioning)
- Added `original_path` metadata documenting both source files
- Preserved all H4 knowledge points as inline content (not split to separate files)
- Removed original `git.md` and `version-control.md` files

### Task 3: Migrate git/ Files to version-control/
- Moved `git/dorothy.md` to `version-control/dorothy.md` with original_path metadata
- Moved `git/gitflow.md` to `version-control/gitflow.md` with original_path metadata
- Moved `git/pre-commit-hook.md` to `version-control/pre-commit-hook.md` with original_path metadata
- Fixed pre-commit-hook.md frontmatter (added missing opening ---)
- Removed empty `git/` directory

## Files Changed

| Status | Path |
|--------|------|
| Modified | content/6.maps/_devops/devops.md |
| Created | content/6.maps/_devops/version-control/version-control.md |
| Created | content/6.maps/_devops/version-control/dorothy.md |
| Created | content/6.maps/_devops/version-control/gitflow.md |
| Created | content/6.maps/_devops/version-control/pre-commit-hook.md |
| Deleted | content/6.maps/_devops/git.md |
| Deleted | content/6.maps/_devops/version-control.md |
| Deleted | content/6.maps/_devops/git/ (directory) |

## Commits

| Hash | Message |
|------|---------|
| 8b4eac47f | feat(12-P01): create _devops domain entry with subdomain navigation |
| 04120127f | feat(12-P01): create version-control subdomain with merged content |
| 6b40674e6 | feat(12-P01): migrate git/ files to version-control/ subdirectory |

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

All 15 verification checks passed:
- Domain entry exists with proper frontmatter
- Domain entry has ## 子领域 section linking to all 4 subdomains
- version-control/ directory exists
- version-control.md exists with merged content
- version-control.md has ## 主题 section with 4 topic links
- version-control.md has original_path in frontmatter
- All 3 migrated files exist with original_path metadata
- Original files and directory removed

## Self-Check: PASSED

- [x] All created files exist
- [x] All commits exist in git history
- [x] All deleted files removed
- [x] No broken internal links introduced
