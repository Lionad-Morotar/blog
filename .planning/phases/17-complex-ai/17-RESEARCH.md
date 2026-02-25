# Phase 17 Research: Complex AI Domain

**Phase:** 17 - Complex: AI
**Date:** 2026-02-25

---

## Current Structure Analysis

The `_ai` domain contains **~70 files** across **18 subdirectories**, making it the most complex domain in the migration.

### Directory Structure

```
_ai/
├── ai.md                           # Domain entry (current)
├── agents.md                       # Root topic file
├── architectures.md                # Root topic file
├── data-processing.md              # Root topic file
├── distributed.md                  # Root topic file
├── emerging.md                     # Root topic file
├── evaluation.md                   # Root topic file
├── fine-tuning.md                  # Root topic file
├── frontend-impact.md              # Root topic file
├── industry-dynamics.md            # Root topic file
├── inference.md                    # Root topic file
├── infrastructure.md               # Root topic file
├── mechanistic-interpretability.md # Root topic file
├── mlops.md                        # Root topic file
├── multimodal.md                   # Root topic file
├── observability.md                # Root topic file
├── optimization.md                 # Root topic file
├── paper-writing.md                # Root topic file
├── post-training.md                # Root topic file
├── prompt-engineering.md           # Root topic file
├── rag.md                          # Root topic file
├── reproducibility.md              # Root topic file
├── safety.md                       # Root topic file
├── tokenization.md                 # Root topic file
├── agents/                         # 8 files + subdirs
├── benchmark/                      # 3 files
├── framework/                      # 1 file
├── image/                          # 1 file
├── llm/                            # 7 files + subdir
├── mcp/                            # 2 files
├── prompt/                         # 6 files
├── rag/                            # 2 files
├── recommendation/                 # 1 file
├── safety/                         # 1 file
├── skills/                         # 3 files
├── tools/                          # 3 files
├── training/                       # 2 files
├── vibe/                           # 6 files
└── workflow/                       # 3 files
```

### File Count by Subdomain

| Subdomain | Files | Notes |
|-----------|-------|-------|
| agents | 8 | Includes goose/, docs/ subdirs |
| benchmark | 3 | Flat structure |
| framework | 1 | Single file |
| image | 1 | Single file |
| llm | 7 | Includes datadog/ subdir |
| mcp | 2 | Flat structure |
| prompt | 6 | Flat structure |
| rag | 2 | Flat structure |
| recommendation | 1 | Single file |
| safety | 1 | Single file |
| skills | 3 | Flat structure |
| tools | 3 | Flat structure |
| training | 2 | Flat structure |
| vibe | 6 | Flat structure |
| workflow | 3 | Flat structure |
| **Root files** | 22 | Need subdomain assignment |

---

## Proposed Subdomain Structure

Based on content analysis, the 22 root files should be grouped into logical subdomains:

### 1. foundations/ (4 files)
- ai.md (domain entry - will be recreated)
- architectures.md
- emerging.md
- industry-dynamics.md

### 2. models/ (5 files)
- inference.md
- mechanistic-interpretability.md
- multimodal.md
- optimization.md
- tokenization.md

### 3. training/ (existing - add 3 files)
- fine-tuning.md
- post-training.md
- training/ (existing)

### 4. operations/ (4 files)
- data-processing.md
- distributed.md
- infrastructure.md
- mlops.md

### 5. evaluation/ (3 files)
- evaluation.md
- observability.md
- reproducibility.md

### 6. applications/ (3 files)
- frontend-impact.md
- paper-writing.md
- prompt-engineering.md

### 7. safety/ (existing - add 1 file)
- safety.md
- safety/ (existing)

### 8. Keep as-is subdomains (15)
- agents/, benchmark/, framework/, image/, llm/, mcp/, prompt/, rag/, recommendation/, skills/, tools/, vibe/, workflow/

---

## Migration Strategy

### Wave 1: New Subdomains (6 plans)
1. Create `foundations/` subdomain
2. Create `models/` subdomain
3. Expand `training/` subdomain
4. Create `operations/` subdomain
5. Create `evaluation/` subdomain
6. Create `applications/` subdomain

### Wave 2: Existing Subdomains (8 plans)
7. Migrate `agents/` subdomain
8. Migrate `benchmark/` subdomain
9. Migrate `llm/` subdomain
10. Migrate `prompt/` subdomain
11. Migrate `vibe/` subdomain
12. Migrate `workflow/` subdomain
13. Migrate remaining small subdomains (mcp, rag, skills, tools)

### Wave 3: Domain Entry
14. Create `ai.md` domain entry with full navigation

---

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| 70 files is a lot | High | Break into 14 small plans |
| Root file categorization | Medium | Use logical groupings above |
| Existing nested structure | Low | Keep structure, add entry files |
| Cross-domain links | Medium | Update in final plan |

---

## RESEARCH COMPLETE

Ready for planning. 14 plans recommended across 3 waves.
