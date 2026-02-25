---
phase: 01-foundation
plan: 02
subsystem: link-audit
tags:
  - link-audit
  - link-update-strategy
  - no-redirects
dependency_graph:
  requires: []
  provides:
    - link-audit-report
    - link-update-strategy-document
  affects:
    - phase-02-18-all-migrations
key_decisions:
  - 不保留旧 URL，不采用重定向方案
  - 移动文件时同步更新所有引用该文件的链接
  - 链接更新优先级：0.index.md > 跨目录链接 > 内部链接
tech_stack:
  added: []
  patterns:
    - Direct link updates (no redirects)
    - Grep-based link discovery
    - Per-phase link update checklist
key_files:
  created:
    - .planning/link-audit.md
    - .planning/link-update-strategy.md
  modified: []
---

# Phase 01 Plan 02: Link Audit and Strategy - Summary

## One-Liner

Completed comprehensive link audit (298 internal links across 71 files) and documented direct link update strategy with grep/sed patterns, verification methods, and per-phase checklists.

---

## What Was Created

### 1. Link Audit Report

**Location:** `.planning/link-audit.md`

**Purpose:** Complete inventory of all internal links referencing `/maps/` content that will need updating during domain restructuring.

**Size:** 30KB, 298 documented links

### 2. Link Update Strategy

**Location:** `.planning/link-update-strategy.md`

**Purpose:** Documents the direct link update approach (no redirects) with step-by-step processes, automation options, and verification methods.

**Size:** ~10KB, 10 major sections

---

## Link Distribution Found

| Category | Count | Description |
|----------|-------|-------------|
| Internal (within 6.maps/) | 293 | Links between files in 6.maps/ directory |
| Cross-directory (from 7.tools/) | 2 | Links from tools to maps |
| Cross-directory (from 8.source-code/) | 1 | Links from source-code to maps |
| Navigation (0.index.md) | 105 | Main navigation links |
| **Total** | **298** | All internal /maps/ references |

---

## Link Update Strategy Key Points

### Decision: No Redirects

Per CONTEXT.md decisions:
- Direct link updates only
- No Nuxt routeRules
- No middleware redirects
- No server-side redirects

### Update Priority

1. **0.index.md navigation** — Highest visibility
2. **Cross-directory links** — From outside 6.maps/
3. **Internal 6.maps/ links** — Between domains

### Verification Process

```bash
# Post-migration check
grep -rn "old/path" content/ --include="*.md"

# Build verification
nuxt build
```

---

## Strategy Document Sections

1. **Strategy Overview** — Why no redirects
2. **Pre-Migration Link Mapping** — Using link-audit.md
3. **Update During Migration** — Step-by-step process
4. **Link Update Patterns** — Absolute/relative/cross-directory examples
5. **Verification Methods** — Grep/build/manual checks
6. **Per-Phase Checklist** — Template for each migration
7. **Automation Options** — When to use sed/awk vs manual
8. **Rollback Plan** — Git-based recovery
9. **Appendix: Quick Reference** — Common grep/sed patterns

---

## How to Use

### During Phase 2-18 Migrations

1. **Before each phase:**
   ```bash
   grep "_domain-name" .planning/link-audit.md
   ```

2. **During migration:**
   - Follow per-phase checklist in strategy doc
   - Update links in priority order

3. **After migration:**
   - Run verification commands
   - Update link-audit.md status column

---

## Deviations from Plan

**None** — All three tasks completed:
- Task 1: Complete link inventory (298 links)
- Task 2: Link update strategy document
- Task 3: Domain path mapping template (in link-audit.md)

---

## Self-Check: PASSED

- [x] link-audit.md exists with 298+ links
- [x] Links categorized by type (internal/cross-directory/navigation)
- [x] Each link has source file and target path
- [x] link-update-strategy.md documents direct update approach
- [x] Contains actionable grep/sed commands
- [x] Per-phase checklist template included
- [x] References link-audit.md

---

## Metrics

| Metric | Value |
|--------|-------|
| Total links audited | 298 |
| Files containing links | 71 |
| Cross-directory links | 3 |
| Navigation links | 105 |
| Strategy document sections | 10 |
| Grep patterns provided | 8 |
| Sed patterns provided | 5 |

---

## Next Steps

This document is ready for reference in:
- Phase 2-5: Simple domain migrations
- Phase 6-10: Medium domain migrations
- Phase 11-17: Complex domain migrations
- Phase 18: Final link validation

---

*Summary created: 2026-02-24*
