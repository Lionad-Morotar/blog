---
phase: 04-simple-batch-3
plan: 02
subsystem: _company domain migration
tags:
  - domain-migration
  - 4-layer-structure
  - simple-batch
dependency_graph:
  requires: []
  provides:
    - _company domain structure
  affects:
    - content/6.maps/_company/company.md
    - content/6.maps/_company/business/company.md
tech-stack:
  added: []
  patterns:
    - Domain entry with subdomain navigation
    - Original content migration with original_path preservation
key-files:
  created:
    - content/6.maps/_company/business/company.md
  modified:
    - content/6.maps/_company/company.md
decisions: []
metrics:
  duration: 2 minutes
  completed_date: 2026-02-24
---

# Phase 4-02: Migrate _company Domain Summary

## Overview

Migrated the _company domain to the 4-layer structure by creating a domain entry file and moving original content to a business subdomain directory.

## What Was Done

### Task 1: Create _company domain entry file
- Created domain entry at `content/6.maps/_company/company.md`
- Added proper frontmatter with title (公司) and description (注册和经营的流程及注意事项)
- Added ## 子领域 section with link to business subdomain: [工商注册](/maps/_company/business/company)
- Added ## 概述 section with domain overview mentioning business registration topics

### Task 2: Create subdomain and migrate original content
- Created directory `content/6.maps/_company/business/`
- Migrated original content to `content/6.maps/_company/business/company.md`
- Added `original_path: content/6.maps/_company/company.md` to frontmatter for history preservation
- Preserved all original content including the 个体工商户与企业的主要区别是什么？ section

## Files Changed

| File | Change | Description |
|------|--------|-------------|
| content/6.maps/_company/company.md | Modified | Domain entry with navigation to business subdomain |
| content/6.maps/_company/business/company.md | Created | Original content with original_path metadata |

## Commits

- `f96891e3c`: feat(04-02): create _company domain entry file
- `b53a0786f`: feat(04-02): migrate original _company content to business subdomain

## Verification Results

- [x] content/6.maps/_company/company.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to /maps/_company/business/company
- [x] content/6.maps/_company/business/company.md exists with original content
- [x] Moved file has original_path: content/6.maps/_company/company.md in frontmatter
- [x] All original content preserved (个体工商户区别)

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

All files verified to exist:
- [x] content/6.maps/_company/company.md
- [x] content/6.maps/_company/business/company.md

All commits verified:
- [x] f96891e3c
- [x] b53a0786f
