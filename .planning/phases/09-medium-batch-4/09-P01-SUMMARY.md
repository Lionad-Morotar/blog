---
phase: 09-medium-batch-4
plan: 01
name: Migrate _science Domain (MED-16)
subsystem: _science
tags: [migration, science, subdomain, 4-layer-structure]
dependency_graph:
  requires: []
  provides: []
  affects: [content/6.maps/0.index.md]
tech_stack:
  added: []
  patterns: [4-layer-structure, original_path-preservation, nested-subdomain]
key_files:
  created:
    - content/6.maps/_science/science.md
    - content/6.maps/_science/complex-science/complex-science.md
    - content/6.maps/_science/complex-science/systems-theory.md
    - content/6.maps/_science/cosmos/cosmos.md
    - content/6.maps/_science/entropy/entropy.md
    - content/6.maps/_science/environment/environment.md
    - content/6.maps/_science/neuroscience/neuroscience.md
    - content/6.maps/_science/quantum/quantum.md
  modified:
    - content/6.maps/0.index.md
decisions: []
metrics:
  duration: 5m 5s
  completed_date: 2026-02-24
---

# Phase 9-01: Migrate _science Domain (MED-16) Summary

**One-liner:** Migrated _science domain to 4-layer structure with domain entry and 6 subdomains (complex-science, cosmos, entropy, environment, neuroscience, quantum).

## What Was Done

1. **Created domain entry file** (`content/6.maps/_science/science.md`)
   - Added YAML frontmatter with title and description
   - Created ## 子领域 section linking to all 6 subdomains
   - Added ## 概述 section with domain overview

2. **Created complex-science subdomain**
   - Moved `complex-science.md` to `complex-science/complex-science.md`
   - Moved `systems-theory.md` to `complex-science/systems-theory.md`
   - Added `original_path` metadata to both files
   - Updated internal link to point to new systems-theory path

3. **Created cosmos subdomain**
   - Moved `cosmos.md` to `cosmos/cosmos.md`
   - Added `original_path` metadata
   - Preserved all historical content and cross-domain links

4. **Created entropy subdomain**
   - Moved `entropy.md` to `entropy/entropy.md`
   - Added `original_path` metadata
   - Preserved all book references and quotes

5. **Created environment subdomain**
   - Moved `environment.md` to `environment/environment.md`
   - Added `original_path` metadata
   - Preserved low-carbon web practices content

6. **Created neuroscience subdomain**
   - Moved `neuroscience.md` to `neuroscience/neuroscience.md`
   - Added `original_path` metadata
   - Preserved timeline and misophonia section

7. **Created quantum subdomain**
   - Moved `quantum.md` to `quantum/quantum.md`
   - Added `original_path` metadata
   - Preserved EPR paradox and Bell's inequality content

8. **Updated cross-domain links in 0.index.md**
   - Updated all 6 links in ## 科学 section to new nested paths

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

All verification checks passed:
- Domain entry file exists with proper frontmatter
- All 6 subdomains created with entry files
- All 7 moved files have `original_path` in frontmatter
- Internal link in complex-science.md updated correctly
- All 6 links in 0.index.md updated to new paths
- All original files removed

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 8dfe8513f | Create _science domain entry file |
| 2 | 9068c6af0 | Create complex-science subdomain and migrate content |
| 3 | f360462c4 | Create cosmos subdomain and migrate content |
| 4 | 7893b0df0 | Create entropy subdomain and migrate content |
| 5 | b0d869e9b | Create environment subdomain and migrate content |
| 6 | 3fd5f9826 | Create neuroscience subdomain and migrate content |
| 7 | 9e7a12e58 | Create quantum subdomain and migrate content |
| 8 | 491a3685b | Update cross-domain links in 0.index.md |

## Self-Check: PASSED

All created files exist:
- content/6.maps/_science/science.md
- content/6.maps/_science/complex-science/complex-science.md
- content/6.maps/_science/complex-science/systems-theory.md
- content/6.maps/_science/cosmos/cosmos.md
- content/6.maps/_science/entropy/entropy.md
- content/6.maps/_science/environment/environment.md
- content/6.maps/_science/neuroscience/neuroscience.md
- content/6.maps/_science/quantum/quantum.md

All commits exist and are properly formatted.
