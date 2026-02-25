---
phase: 08-medium-batch-3
plan: 02
subsystem: _management
tags: [domain-migration, medium-complexity, 4-layer-structure]
dependency:
  requires: []
  provides: [management-domain-structure]
  affects: [content/6.maps/0.index.md]
tech-stack:
  added: []
  patterns: [4-layer-structure, subdomain-directory, original_path-preservation]
key-files:
  created:
    - content/6.maps/_management/management.md
    - content/6.maps/_management/organization/organization.md
    - content/6.maps/_management/shape-up/shape-up.md
    - content/6.maps/_management/slice/slice.md
    - content/6.maps/_management/capacity-driven-development/capacity-driven-development.md
    - content/6.maps/_management/shadow-it/shadow-it.md
  modified:
    - content/6.maps/_management/slice/standalone-data-engineering-team.md
    - content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md
    - content/6.maps/0.index.md
decisions: []
metrics:
  duration: 4m
  completed_at: 2026-02-24T13:55:00Z
---

# Phase 8-02: Migrate _management Domain (MED-10) Summary

**One-liner:** Migrated _management domain to 4-layer structure with domain entry and 5 subdomains (organization, shape-up, slice, capacity-driven-development, shadow-it).

## What Was Done

Migrated the _management domain to the 4-layer cognitive navigation structure by:

1. **Created domain entry file** (`management.md`) with proper frontmatter and navigation to all 5 subdomains
2. **Created organization subdomain** - moved `organization.md` to `organization/organization.md` with original_path metadata and updated internal links
3. **Created shape-up subdomain** - moved `shape-up.md` to `shape-up/shape-up.md` with original_path metadata
4. **Formalized slice subdomain** - created `slice/slice.md` entry file and added original_path to existing `standalone-data-engineering-team.md`
5. **Created capacity-driven-development subdomain** - moved file to subdirectory with original_path metadata
6. **Formalized shadow-it subdomain** - created `shadow-it/shadow-it.md` entry file and added original_path to existing `ai-accelerated-shadow-it.md`
7. **Updated cross-domain links** in `0.index.md` to point to new nested paths

## Key Changes

### Files Created (6)
- `content/6.maps/_management/management.md` - Domain entry with subdomain navigation
- `content/6.maps/_management/organization/organization.md` - Organization management content
- `content/6.maps/_management/shape-up/shape-up.md` - Shape Up methodology content
- `content/6.maps/_management/slice/slice.md` - Team slicing patterns entry
- `content/6.maps/_management/capacity-driven-development/capacity-driven-development.md` - Capacity management content
- `content/6.maps/_management/shadow-it/shadow-it.md` - Shadow IT governance entry

### Files Modified (3)
- `content/6.maps/_management/slice/standalone-data-engineering-team.md` - Added original_path
- `content/6.maps/_management/shadow-it/ai-accelerated-shadow-it.md` - Added original_path
- `content/6.maps/0.index.md` - Updated organization link to new path

### Files Deleted (3)
- `content/6.maps/_management/organization.md` (moved to subdirectory)
- `content/6.maps/_management/shape-up.md` (moved to subdirectory)
- `content/6.maps/_management/capacity-driven-development.md` (moved to subdirectory)

## Structure After Migration

```
_management/
├── management.md                          # Domain entry
├── organization/
│   └── organization.md                    # Subdomain entry (migrated)
├── shape-up/
│   └── shape-up.md                        # Subdomain entry (migrated)
├── slice/
│   ├── slice.md                           # Subdomain entry (new)
│   └── standalone-data-engineering-team.md # Nested content (original_path added)
├── capacity-driven-development/
│   └── capacity-driven-development.md     # Subdomain entry (migrated)
└── shadow-it/
    ├── shadow-it.md                       # Subdomain entry (new)
    └── ai-accelerated-shadow-it.md        # Nested content (original_path added)
```

## Link Updates

Internal links in `organization.md` were updated to reflect new paths:
- `/maps/_management/shape-up` → `/maps/_management/shape-up/shape-up`
- `/maps/_management/capacity-driven-development` → `/maps/_management/capacity-driven-development/capacity-driven-development`

Cross-domain link in `0.index.md` updated:
- `/maps/_management/organization` → `/maps/_management/organization/organization`

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- [x] Domain entry file exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to all five subdomains
- [x] All 5 subdomains created with proper structure
- [x] All moved files have original_path in frontmatter
- [x] Internal links in organization.md updated to new paths
- [x] 0.index.md links updated to new paths
- [x] All original content preserved

## Commits

| Hash | Type | Message |
|------|------|---------|
| 099827e | feat | create _management domain entry file |
| c12c5d4 | feat | create organization subdomain and migrate content |
| 68cc6b4 | feat | create shape-up subdomain and migrate content |
| 1514123 | feat | create slice subdomain and formalize structure |
| b64c8a5 | feat | create capacity-driven-development subdomain and migrate content |
| 5fc1836 | feat | create shadow-it subdomain and formalize structure |
| 62075aa | fix | update cross-domain links in 0.index.md |

## Self-Check: PASSED

- All 6 created files exist
- All 3 modified files have correct changes
- All 7 commits recorded in git log
- No broken links detected
- All original_path metadata present in migrated files
