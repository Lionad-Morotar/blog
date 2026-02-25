---
phase: 01-foundation
plan: 01
subsystem: taxonomy
tags:
  - taxonomy
  - classification
  - decision-criteria
  - four-layer-hierarchy
dependency_graph:
  requires: []
  provides:
    - taxonomy-criteria-document
  affects:
    - phase-02-18-all-migrations
key_decisions:
  - 领域判断标准：对应 0.index.md 顶层分类，以 _ 为前缀的目录
  - 子领域判断标准：统一使用目录形式，不按内容量区分文件或目录
  - 主题判断标准：优先按讨论范围界定，150+ 行或有扩展潜力时拆分
  - 知识点判断标准：观点/案例/洞见等思考性内容，保持为 H4 不拆分
tech_stack:
  added: []
  patterns:
    - 四层认知结构 (Domain → Subdomain → Topic → Knowledge Point)
    - 决策树文档模式
key_files:
  created:
    - .planning/taxonomy-criteria.md
  modified: []
---

# Phase 01 Plan 01: Taxonomy Criteria Document - Summary

## One-Liner

Created comprehensive four-layer cognitive hierarchy taxonomy criteria document with decision trees, concrete examples from actual codebase, and boundary case handling guidelines.

---

## What Was Created

### Taxonomy Criteria Document

**Location:** `.planning/taxonomy-criteria.md`

**Purpose:** Defines clear decision rules for classifying content into Domain, Subdomain, Topic, and Knowledge Point levels. This document serves as the authoritative reference for all subsequent migration phases (Phase 2-18).

**Size:** 504 lines, 10 major sections

---

## Document Structure

### 1. Overview (概述)
- Core principles of the 4-layer hierarchy
- Purpose and scope

### 2. Domain (领域)
- Definition and scope
- Decision criteria (from 0.index.md classification)
- Physical representation (`_` prefixed directories)
- Verification method

### 3. Subdomain (子领域)
- Definition and scope
- Decision criteria (unified directory form)
- Decision tree for subdomain creation
- Required files (`0.index.md` or `{subdomain}.md`)

### 4. Topic (主题)
- Definition and scope
- Decision criteria (discussion scope priority, 150+ line threshold)
- Decision tree for topic splitting
- Split vs keep examples with actual file data

### 5. Knowledge Point (知识点)
- Definition and scope
- Decision criteria (opinions, cases, insights)
- Correct H4 usage examples from `_business/business-analysis.md`
- Anti-patterns (what NOT to do)

### 6. Heading Level Guidelines
- H1: File title
- H2: Topic subcategories/chapters
- H3: Potential subtopics (evaluate for promotion)
- H4: Knowledge points

### 7. Decision Trees
- Decision Tree 1: Content classification flow
- Decision Tree 2: H3 heading promotion evaluation

### 8. Boundary Cases
- Content exactly at 150 lines
- Subdomain vs topic ambiguity
- Knowledge point splitting exceptions
- Existing structure handling

### 9. Examples Gallery
- **Simple domain:** `_go/` (30 lines, single file)
- **Medium domain:** `_business/` (3 files, 336 total lines)
- **Complex domain:** `_frontend/css/` (subdomain with nested structure)

### 10. Refactoring Checklist
- Domain-level checks
- Subdomain-level checks
- Topic-level checks
- Knowledge point-level checks
- Heading level checks

---

## Key Decision Criteria Documented

### Domain Level
| Criterion | Rule |
|-----------|------|
| Source | Must exist in `0.index.md` navigation |
| Naming | `_` prefix + lowercase (e.g., `_frontend`) |
| Entry file | `{domain}.md` or `0.index.md` |

### Subdomain Level
| Criterion | Rule |
|-----------|------|
| Form | **Always directory** (no file exception) |
| Independence | Distinct learning unit with clear boundaries |
| Entry file | `0.index.md` or `{subdomain}.md` required |

### Topic Level
| Criterion | Rule |
|-----------|------|
| Primary rule | Discussion scope priority (not file size) |
| Threshold | 150+ lines OR extension potential → split |
| Form | Single Markdown file |

### Knowledge Point Level
| Criterion | Rule |
|-----------|------|
| Content type | Opinions, cases, insights (thinking content) |
| Form | H4 heading (`####`) |
| **Critical** | Never split into separate files |

---

## Examples Included

### Real Codebase Examples

1. **Simple Domain - `_go/go.md`**
   - 30 lines
   - No subdomain needed
   - Resource links only

2. **Medium Domain - `_business/business-analysis.md`**
   - 302 lines
   - Multiple H4 knowledge points:
     - "什么是非共识机会？"
     - "什么是三级火箭理论？"
     - "AI 创业护城河矩阵"
   - Case studies as H4

3. **Complex Domain - `_frontend/css/`**
   - Subdomain structure with 9 files
   - Large topics: `0.css-mind-map.md` (809 lines), `new-features-2025.md` (471 lines)
   - Small topics: `layers.md` (23 lines), `sass.md` (21 lines)
   - Nested subdomain: `tailwind/`

---

## How to Use This Document

### For Phase 2-18 Migration Work

1. **Before starting a domain:**
   - Review the domain complexity level (simple/medium/complex)
   - Reference the appropriate example gallery section

2. **During migration:**
   - Use decision trees to classify each content block
   - Apply heading level guidelines when restructuring
   - Follow the refactoring checklist

3. **When encountering edge cases:**
   - Consult the Boundary Cases section
   - Apply Claude's discretion for knowledge point exceptions

### For Consistency Verification

- Use the Refactoring Checklist to verify each migrated domain
- Cross-reference examples when making structural decisions
- Document any deviations with rationale

---

## Deviations from Plan

**None** - Plan executed exactly as written.

Both Task 1 (document structure) and Task 2 (concrete examples) were completed in a single comprehensive document creation. The document includes:
- All 10 required sections
- Concrete examples from actual codebase files
- Decision trees and boundary case handling
- Refactoring checklist for verification

---

## Self-Check: PASSED

- [x] Document exists at `.planning/taxonomy-criteria.md`
- [x] File contains all 10 required sections
- [x] Examples reference actual file paths from content/6.maps/
- [x] Decision trees are clear and actionable
- [x] Boundary cases provide clear guidance

---

## Metrics

| Metric | Value |
|--------|-------|
| Document lines | 504 |
| Sections | 10 |
| Codebase examples | 3 (simple/medium/complex) |
| Decision trees | 2 |
| Boundary cases | 4 |
| Checklist items | 12 |

---

## Next Steps

This document is ready for reference in:
- Phase 2-5: Simple domain migrations
- Phase 6-10: Medium domain migrations
- Phase 11-17: Complex domain migrations
- Phase 18: Validation and consistency checks

---

*Summary created: 2026-02-24*
*Document version: 1.0*
