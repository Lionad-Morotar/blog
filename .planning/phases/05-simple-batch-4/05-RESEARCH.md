# Phase 5: Simple Batch 4 - Research

**Researched:** 2026-02-24
**Domain:** Knowledge base migration - 4 simple domains
**Confidence:** HIGH

## Summary

This research covers the migration of 4 domains in Phase 5 of the knowledge base refactoring project: `_apps`, `_cross-domain`, `_refactor`, and `_photography`. Three domains contain exactly 1 file each with simple content structure (< 50 lines), while `_cross-domain` is empty (0 files). This makes them straightforward migration candidates following the established patterns from previous phases.

Key findings:
1. Three domains follow the simple complexity pattern (1 file each, < 50 lines of content)
2. `_cross-domain` is empty - only needs a domain entry file
3. Cross-domain links exist: `0.index.md` links to all 4 domains
4. Content organization varies: `_apps` has VPN/networking topics, `_refactor` is about code refactoring with one cross-link, `_photography` contains photography techniques, and `_cross-domain` is empty
5. Migration pattern: Create domain entry file → Create subdomain directory → Move original content → Update links → Preserve original_path in frontmatter

**Primary recommendation:** Migrate all 4 domains following the established simple domain pattern. Each domain should have an entry file and a subdomain directory containing the original content (except `_cross-domain` which only needs an entry file). Update cross-domain links in `0.index.md`.

---

## Domain Analysis

### 1. _apps Domain

**Current Structure:**
- File: `content/6.maps/_apps/vpn.md`
- Lines: ~26 lines
- Content: VPN usage, PAC rules, and platform recommendations

**Current Frontmatter:**
```yaml
---
title: VPN（Virtual Private Network）
description: VPN 是一种通过公共网络建立私人网络的技术。
---
```

**Content Organization:**
- 2 knowledge sections:
  - 自定义规则 Pac/UserRule (with syntax table)
  - 一些开放平台 (platform links)

**Subdomain Identification:**
- Primary subdomain: `networking` or `tools` (VPN/networking tools)
- Content fits a single subdomain (no need for multiple subdomains)

**Migration Approach:**
1. Create `content/6.maps/_apps/apps.md` (domain entry)
2. Create `content/6.maps/_apps/networking/` (subdomain directory)
3. Move original `vpn.md` to `content/6.maps/_apps/networking/vpn.md`
4. Add `original_path: content/6.maps/_apps/vpn.md` to frontmatter

---

### 2. _cross-domain Domain

**Current Structure:**
- Files: 0 files (empty directory)
- This is an empty domain placeholder

**Subdomain Identification:**
- No subdomains needed since domain is empty
- Domain entry file should indicate this is a placeholder for cross-domain concepts

**Migration Approach:**
1. Create `content/6.maps/_cross-domain/cross-domain.md` (domain entry only)
2. No subdomain directory needed (empty domain)
3. Content should explain this domain is for cross-cutting concerns that span multiple domains

**Special Consideration:** This is an empty domain. Only create the entry file with appropriate placeholder content.

---

### 3. _refactor Domain

**Current Structure:**
- File: `content/6.maps/_refactor/refactor.md`
- Lines: ~18 lines
- Content: Refactoring resources, links to legacy code resources

**Current Frontmatter:**
```yaml
---
title: 重构
---
```

**Content Organization:**
- 4 sections:
  - Domain (empty)
  - Cross Domain (with link to programming domain)
  - Gists (external link)
  - 项目重构 (project refactoring example)

**Cross-Domain Links Found:**
- `[GenAI for Legacy Codebases](/maps/_programming/dx/genai-for-legacy-codebases)` - links to _programming domain

**Subdomain Identification:**
- Primary subdomain: `refactoring` or `legacy-code` (code refactoring topics)
- Single subdomain sufficient

**Migration Approach:**
1. Create `content/6.maps/_refactor/refactor.md` (domain entry)
2. Create `content/6.maps/_refactor/refactoring/` (subdomain directory)
3. Move original `refactor.md` to `content/6.maps/_refactor/refactoring/refactoring.md` or keep as `refactor.md`
4. Add `original_path: content/6.maps/_refactor/refactor.md` to frontmatter

**Special Consideration:** Contains a cross-domain link to `_programming/dx/genai-for-legacy-codebases`. This link should continue to work as the target is in a different domain.

---

### 4. _photography Domain

**Current Structure:**
- File: `content/6.maps/_photography/0.index.md` (note: different filename)
- Lines: ~28 lines
- Content: Photography techniques, camera settings, and cheat sheets

**Current Frontmatter:**
```yaml
---
title: 摄影
description: 技术传达情感，摄影记录生活。
---
```

**Content Organization:**
- 4 knowledge points (H4 headings):
  - 怎么衡量一张照片的好坏？
  - 光圈和景深的关系？
  - 光圈、快门、ISO Cheat Sheet (with images)
  - 不同自动快门模式适合什么场景？

**Subdomain Identification:**
- Primary subdomain: `techniques` or `photography` (photography techniques)
- Single subdomain sufficient

**Migration Approach:**
1. Create `content/6.maps/_photography/photography.md` (domain entry)
2. Create `content/6.maps/_photography/techniques/` (subdomain directory)
3. Move original `0.index.md` to `content/6.maps/_photography/techniques/techniques.md`
4. Add `original_path: content/6.maps/_photography/0.index.md` to frontmatter

**Special Consideration:** Original file is named `0.index.md`, not `photography.md`. Need to handle filename change.

---

## Cross-Domain Links

### Links TO these domains (from other domains):

| Source File | Current Link | Target Domain | Action Required |
|-------------|--------------|---------------|-----------------|
| `content/6.maps/0.index.md:69` | `[VPN](/maps/_apps/vpn)` | _apps | Update to `/maps/_apps/networking/vpn` |
| `content/6.maps/0.index.md:100` | `[重构](/maps/_refactor/refactor)` | _refactor | Update to `/maps/_refactor/refactoring/refactor` or `/maps/_refactor/refactoring/refactoring` |
| `content/6.maps/0.index.md:192` | `[摄影](/maps/_photography)` | _photography | Update to `/maps/_photography/techniques/techniques` |

### Links FROM these domains:
- `_refactor/refactor.md` → `[GenAI for Legacy Codebases](/maps/_programming/dx/genai-for-legacy-codebases)` - links to _programming domain (no action needed, target unchanged)

### External Links (outside 6.maps/):
- None found for these 4 domains

---

## Migration Approach Summary

### Standard Pattern for Simple Domains

Based on previous phases (Simple Batch 1, 2, and 3), the migration pattern is:

```
Before:
_domain/
└── file.md

After:
_domain/
├── domain.md              # Domain entry file
└── subdomain/             # Subdomain directory
    └── subdomain.md       # Original content moved here (or keep original name)
```

### Empty Domain Pattern

For `_cross-domain` (0 files):

```
Before:
_cross-domain/
(empty)

After:
_cross-domain/
└── cross-domain.md        # Domain entry file only
```

### Domain Entry File Template

```yaml
---
title: [Domain Title]
description: [Domain description]
---

## 子领域

* [Subdomain Title](/maps/_domain/subdomain/subdomain)

## 概述

[Brief domain overview]
```

### Frontmatter Requirements

All moved files must include:
```yaml
---
title: [Original Title]
description: [Original Description]
original_path: content/6.maps/_domain/original-filename.md
---
```

### Link Update Priority

1. **High Priority:** `0.index.md` navigation links (user-facing)
2. **Medium Priority:** Cross-domain content links (none for these domains except existing _refactor link)
3. **Low Priority:** Internal domain links (none for these domains)

---

## Special Considerations

### 1. Filename Preservation

Per prior phase decisions, original filenames should be preserved when they carry semantic meaning:
- `_apps/vpn.md` → Keep as `networking/vpn.md` (not `networking/networking.md`)
- `_refactor/refactor.md` → Keep as `refactoring/refactor.md` (semantic name)
- `_photography/0.index.md` → Rename to `techniques/techniques.md` (index has no semantic value)

### 2. Subdomain Naming

| Domain | Proposed Subdomain | Rationale |
|--------|-------------------|-----------|
| _apps | `networking` | VPN/networking tools focus |
| _cross-domain | N/A | Empty domain, no subdomain needed |
| _refactor | `refactoring` | Code refactoring topics |
| _photography | `techniques` | Photography techniques focus |

### 3. Content Complexity

All 4 domains are simple:
- `_apps`: ~26 lines
- `_cross-domain`: 0 files (empty)
- `_refactor`: ~18 lines
- `_photography`: ~28 lines

No need to split content into multiple topic files. Single subdomain per domain is sufficient.

### 4. Cross-Domain Link Updates

After migration, these links need updating:

**0.index.md updates:**
```markdown
# Before:
* [VPN](/maps/_apps/vpn)
* [重构](/maps/_refactor/refactor)
* [摄影](/maps/_photography)

# After:
* [VPN](/maps/_apps/networking/vpn)
* [重构](/maps/_refactor/refactoring/refactor)
* [摄影](/maps/_photography/techniques/techniques)
```

---

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Broken navigation links | Medium | Update 0.index.md links immediately after migration |
| Content loss | Low | Use git version control, add original_path |
| Inconsistent subdomain naming | Low | Follow naming conventions documented above |
| Empty domain confusion | Low | Clear documentation in entry file that _cross-domain is a placeholder |

---

## Recommended Migration Order

1. **_apps** - Straightforward, clear subdomain name
2. **_photography** - Handle 0.index.md rename
3. **_refactor** - Simple content, note cross-domain link
4. **_cross-domain** - Empty domain, entry file only

---

## References

### Previous Phase Patterns
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/04-simple-batch-3/04-simple-batch-3-RESEARCH.md` - Phase 4 research pattern
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/03-simple-batch-2/03-simple-batch-2-RESEARCH.md` - Phase 3 research pattern

### Source Files Analyzed
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_apps/vpn.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_refactor/refactor.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_photography/0.index.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_cross-domain/` (empty)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md`

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files read and analyzed
- Cross-domain link identification: HIGH - Grep search completed
- Migration pattern: HIGH - Based on 3 previous phases
- Subdomain naming: MEDIUM - Requires planner confirmation

**Research date:** 2026-02-24
**Valid until:** 2026-03-24

---

## RESEARCH COMPLETE

**Phase:** 05 - Simple Batch 4
**Confidence:** HIGH

### Key Findings
1. Three domains are simple (1 file each, < 50 lines) - straightforward migration
2. One domain is empty (_cross-domain, 0 files) - only needs entry file
3. 3 cross-domain links need updating in 0.index.md
4. 1 domain has non-standard filename (_photography/0.index.md)
5. 1 cross-domain link from _refactor to _programming (no action needed)

### File Created
`.planning/phases/05-simple-batch-4/05-RESEARCH.md`

### Ready for Planning
Research complete. Planner can now create PLAN.md files for each domain migration.
