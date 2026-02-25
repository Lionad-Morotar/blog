---
phase: 10-medium-batch-5
plan: 02
type: execute
subsystem: _programming domain
completed: 2026-02-25
duration: 4m
tasks: 7
files_created: 8
files_modified: 1
requires: []
provides:
  - _programming domain 4-layer structure
  - 5 subdomains with proper entry files
  - Cross-domain link updates
affects:
  - content/6.maps/_programming/programming.md
  - content/6.maps/_programming/paradigms/paradigms.md
  - content/6.maps/_programming/dx/dx.md
  - content/6.maps/_programming/debugging/debugging.md
  - content/6.maps/_programming/languages/languages.md
  - content/6.maps/_programming/frameworks/frameworks.md
  - content/6.maps/0.index.md
tech-stack:
  added: []
  patterns:
    - 4-layer domain structure (domain → subdomain → topic → knowledge point)
    - original_path frontmatter for migration tracking
    - Subdomain entry files with consistent naming
key-decisions:
  - Merged tech-bias.md content into domain entry rather than keeping separate file
  - Used paradigms.md instead of functional.md for clearer subdomain scope
  - Preserved nested dx/ content structure with added original_path metadata
  - Added section headers to frameworks.md for future expansion
---

# Phase 10-02: Migrate _programming Domain (MED-18) Summary

**One-liner:** Migrated _programming domain to 4-layer structure with domain entry and 5 subdomains (paradigms, dx, debugging, languages, frameworks), merging tech-bias content into domain entry.

## What Was Built

### Domain Entry
- `content/6.maps/_programming/programming.md` - Domain entry with:
  - Overview section about programming as a discipline
  - ## 子领域 navigation linking to all 5 subdomains
  - ## 技术偏见 section with merged content from tech-bias.md (5 links preserved)

### Subdomains Created

| Subdomain | File | Source | Content |
|-----------|------|--------|---------|
| paradigms/ | paradigms.md | functional.md | Functional programming concepts (H4 headings preserved) |
| dx/ | dx.md | dx.md | Developer Experience with Domain/Cross Domain/Gists sections |
| dx/ | genai-for-forward-engineering.md | existing | Added original_path metadata |
| dx/ | genai-for-legacy-codebases.md | existing | Added original_path metadata |
| debugging/ | debugging.md | debug.md | Dan Abramov's bug fixing methodology |
| languages/ | languages.md | programming-language.md | Lean, Prolog, Moonbit links |
| frameworks/ | frameworks.md | rezi.md | Rezi TUI framework with future expansion note |

### Cross-Domain Link Updates (0.index.md)

| Link Text | Old Path | New Path |
|-----------|----------|----------|
| 技术偏见 | /maps/_programming/tech-bias | /maps/_programming/programming |
| 函数式 | /maps/_programming/functional | /maps/_programming/paradigms/paradigms |
| DX | /maps/_programming/dx | /maps/_programming/dx/dx |
| Rezi | /maps/_programming/rezi | /maps/_programming/frameworks/frameworks |
| 编程语言 | /maps/_programming/programming-language | /maps/_programming/languages/languages |

## Commits

| Hash | Type | Message |
|------|------|---------|
| da801e15f | feat | create _programming domain entry file |
| 9bff97447 | feat | migrate functional.md to paradigms subdomain |
| fd95c6a0a | feat | migrate dx.md to dx/ subdirectory as subdomain entry |
| d7e2fed16 | feat | migrate debug.md to debugging subdomain |
| a74683463 | feat | migrate programming-language.md to languages subdomain |
| cd45a74d5 | feat | migrate rezi.md to frameworks subdomain |
| 50709d927 | feat | remove tech-bias.md and update cross-domain links |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] content/6.maps/_programming/programming.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to all five subdomains
- [x] Domain entry has ## 技术偏见 section with merged content
- [x] content/6.maps/_programming/paradigms/paradigms.md exists (migrated from functional.md)
- [x] content/6.maps/_programming/dx/dx.md exists (moved from dx.md)
- [x] content/6.maps/_programming/dx/genai-for-forward-engineering.md exists with original_path
- [x] content/6.maps/_programming/dx/genai-for-legacy-codebases.md exists with original_path
- [x] content/6.maps/_programming/debugging/debugging.md exists (migrated from debug.md)
- [x] content/6.maps/_programming/languages/languages.md exists (migrated from programming-language.md)
- [x] content/6.maps/_programming/frameworks/frameworks.md exists (migrated from rezi.md)
- [x] All moved files have original_path in frontmatter
- [x] Original files (functional.md, debug.md, programming-language.md, rezi.md, tech-bias.md, dx.md) removed
- [x] All links in 0.index.md updated (functional, dx, tech-bias, rezi, programming-language)
