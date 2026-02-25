---
phase: 05-simple-batch-4
plan: 01
name: Migrate _apps Domain
subsystem: Maps Knowledge Base
status: complete

requires: []
provides:
  - _apps domain 4-layer structure
  - Domain entry with navigation
  - Original content with preserved metadata
affects:
  - content/6.maps/_apps/

tech-stack:
  added: []
  patterns:
    - Domain entry + subdomain directory migration
    - original_path frontmatter preservation

key-files:
  created:
    - content/6.maps/_apps/apps.md
    - content/6.maps/_apps/networking/vpn.md
  modified: []
  deleted:
    - content/6.maps/_apps/vpn.md

decisions: []

metrics:
  duration: 2 minutes
  completed_at: 2026-02-24
  tasks: 2
  files: 2
---

# Phase 5-01: Migrate _apps Domain Summary

**One-liner:** Migrated _apps domain to 4-layer structure with domain entry file and networking subdomain containing preserved VPN content.

## What Was Done

1. **Created domain entry file** (`content/6.maps/_apps/apps.md`)
   - Added YAML frontmatter with title (应用) and description
   - Created ## 子领域 section linking to networking subdomain
   - Added ## 概述 section with domain overview

2. **Created subdomain and migrated content** (`content/6.maps/_apps/networking/vpn.md`)
   - Created networking/ subdirectory
   - Moved original vpn.md content to new location
   - Added original_path frontmatter preserving migration history
   - Preserved all original content:
     - VPN introduction and use cases
     - Pac/UserRule syntax table
     - 开放平台 links (Glados, PaofuCloud)

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- [x] content/6.maps/_apps/apps.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to /maps/_apps/networking/vpn
- [x] content/6.maps/_apps/networking/vpn.md exists with original content
- [x] Moved file has original_path: content/6.maps/_apps/vpn.md in frontmatter
- [x] All original content preserved (VPN介绍, Pac规则, 开放平台)

## Self-Check: PASSED

```bash
[ -f "content/6.maps/_apps/apps.md" ] && echo "FOUND: apps.md" || echo "MISSING: apps.md"
[ -f "content/6.maps/_apps/networking/vpn.md" ] && echo "FOUND: networking/vpn.md" || echo "MISSING: networking/vpn.md"
[ ! -f "content/6.maps/_apps/vpn.md" ] && echo "DELETED: original vpn.md" || echo "STILL EXISTS: original vpn.md"
```

All files verified.

## Commits

- `333111f7e`: feat(05-01): create _apps domain entry file
- `b7149973e`: feat(05-01): migrate vpn.md to networking subdomain
