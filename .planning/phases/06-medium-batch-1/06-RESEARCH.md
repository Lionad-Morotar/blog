# Phase 6: Medium Batch 1 - Research

**Researched:** 2026-02-24
**Domain:** Content Architecture Migration (4-layer cognitive hierarchy)
**Confidence:** HIGH

## Summary

Phase 6 migrates 4 medium complexity domains (_business, _industry, _policy, _server) from flat file structure to the 4-layer cognitive hierarchy (Domain → Subdomain → Topic → Knowledge Point). Each domain contains 2-3 files, with _server having an existing nested subdirectory structure (nodejs/source/) that requires special handling.

After analyzing all file contents, the recommendation is to use a **hybrid approach**: some domains need subdomain grouping (_business, _server), while others can remain flat with topic files (_industry, _policy). The _server domain's existing nodejs subdirectory should be preserved and properly integrated into the hierarchy.

**Primary recommendation:** Create subdomains only when files share a clear conceptual boundary and form an "independent learning unit." For medium domains (3-4 files), flat topic structure is acceptable if topics are distinct.

---

## Domain Analysis

### 1. _business Domain (3 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| business-analysis.md | 302 | Comprehensive business analysis framework, models, case studies (Meituan, Tesla, Pinduoduo, etc.) |
| business-examples.md | 13 | Minimal stub - just a reference to a course |
| venture-capital.md | 21 | VC basics: "募投管退" process and market analysis |

**Content Analysis:**
- `business-analysis.md` is the dominant file (302 lines) containing multiple distinct sections:
  - Models (非共识机会, 三级火箭理论)
  - Analysis frameworks (价值链, 业务定位, AI护城河矩阵)
  - Business insights (互联网特点, 生鲜电商分类)
  - Case studies (20+ company cases: 链家, 美团, 百度, 拼多多, etc.)
  - Data integration
  - System design cases (迪拜转型)
- `business-examples.md` is essentially empty - just a course reference
- `venture-capital.md` is a distinct topic from business analysis

**Subdomain Recommendation:**
**YES** - Create subdomains for _business:
```
_business/
├── business.md (domain entry)
├── analysis/
│   └── analysis.md (consolidates business-analysis.md content)
├── venture-capital/
│   └── venture-capital.md (moved from root)
└── _archived/
    └── business-examples.md (archive or delete - minimal content)
```

**Rationale:** The business-analysis.md file is large (302 lines) with clear internal sections that could benefit from future splitting. Creating an `analysis/` subdomain provides room for growth. VC is conceptually distinct from business analysis and warrants its own subdomain.

---

### 2. _industry Domain (3 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| low-code.md | 76 | Low-code platform concepts, classification, capabilities, technical issues |
| digital.md | 126 | Digital transformation concepts, strategy, three technology ages, digital assets |
| analytics.md | 153 | Industry reports - aliens, food security, McDonald's, Arctic ice, cyber attacks, etc. |

**Content Analysis:**
- `low-code.md`: Technical topic about low-code development platforms
- `digital.md`: Business/technical topic about digital transformation
- `analytics.md`: Data visualization and industry research reports (completely different from the other two)

**Subdomain Recommendation:**
**NO** - Keep flat topic structure:
```
_industry/
├── industry.md (domain entry)
├── low-code.md (topic file)
├── digital.md (topic file)
└── analytics.md (topic file)
```

**Rationale:** The three files cover distinctly different topics with no clear conceptual grouping. Low-code and digital transformation are related to technology but from different angles (tools vs. strategy). Analytics is completely different - it's about data reports and visualizations. Creating artificial subdomains would force arbitrary boundaries.

---

### 3. _policy Domain (2 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| five-years-plan-14.md | 129 | Detailed analysis of China's 14th Five-Year Plan |
| policy.md | 12 | Minimal domain stub with links |

**Content Analysis:**
- `five-years-plan-14.md` is a substantial analysis of a specific policy document
- `policy.md` is currently just a stub entry file

**Subdomain Recommendation:**
**NO** - Keep flat structure with potential for future subdomain:
```
_policy/
├── policy.md (domain entry - expand with overview)
└── five-years-plan-14.md (topic file)
```

**Rationale:** With only 2 files and one being a stub, subdomains would be premature. The five-year plan is a specific topic that stands alone. If more policy documents are added later (e.g., other five-year plans, industry policies), they could be grouped into a `china/` or `national-plans/` subdomain.

---

### 4. _server Domain (2 files + existing subdirectory)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| nodejs/index.md | 67 | NodeJS introduction, V8, API overview |
| nodejs/source/require.md | 553 | Deep dive into NodeJS require() source code |

**Content Analysis:**
- `nodejs/index.md` covers: NodeJS basics, V8 engine, modern patterns, debugging
- `nodejs/source/require.md` is a substantial technical deep-dive (553 lines) into module loading
- Existing structure: `_server/nodejs/` and `_server/nodejs/source/`

**Subdomain Recommendation:**
**YES** - Preserve and formalize existing structure:
```
_server/
├── server.md (domain entry)
└── nodejs/
    ├── nodejs.md (moved from index.md, subdomain entry)
    └── source/
        └── require.md (keep existing)
```

**Rationale:** The existing subdirectory structure is already aligned with the 4-layer hierarchy. The `nodejs/` folder should become a formal subdomain with its own entry file. The `source/` sub-subdirectory represents a Topic level (source code analysis) within the NodeJS subdomain.

---

## Migration Pattern for Medium Domains

Based on the analysis, here is the decision framework for medium domains (3-4 files):

### Decision Tree

```
Does the domain have files that share a clear conceptual boundary?
├── YES → Create subdomain(s)
│   └── Examples: _business (analysis vs VC), _server (nodejs)
│
└── NO → Keep flat topic structure
    └── Are any files >150 lines with clear internal sections?
        ├── YES → Consider subdomain for that file's topic
        │   └── Example: business-analysis.md → analysis/ subdomain
        └── NO → Keep as flat topic files
            └── Examples: _industry, _policy
```

### Migration Patterns

#### Pattern A: Subdomain with Topics (for _business)
```
Before:
_business/
├── business-analysis.md
├── business-examples.md
└── venture-capital.md

After:
_business/
├── business.md (domain entry)
├── analysis/
│   └── analysis.md (topic content)
├── venture-capital/
│   └── venture-capital.md (topic content)
└── _archived/
    └── business-examples.md
```

#### Pattern B: Flat Topics (for _industry, _policy)
```
Before:
_industry/
├── low-code.md
├── digital.md
└── analytics.md

After:
_industry/
├── industry.md (domain entry)
├── low-code.md (topic)
├── digital.md (topic)
└── analytics.md (topic)
```

#### Pattern C: Preserve Existing Subdirectory (for _server)
```
Before:
_server/
└── nodejs/
    ├── index.md
    └── source/
        └── require.md

After:
_server/
├── server.md (domain entry)
└── nodejs/
    ├── nodejs.md (subdomain entry, renamed from index.md)
    └── source/
        └── require.md (topic)
```

---

## Cross-Domain Links Analysis

**Links FROM these domains:**

| Source | Target | Link Type | Action Required |
|--------|--------|-----------|-----------------|
| _industry/low-code.md | /maps/_blogs/software-engineering/herb-caudill | Cross-domain | Verify after migration |
| _industry/low-code.md | /maps/_products/zapier, bit, budibase, dynamo | Cross-domain | Verify after migration |
| _industry/low-code.md | /source-code/_architecture/awade | Cross-domain | Verify after migration |
| _business/business-analysis.md | external URLs | External | No action |
| _policy/policy.md | /maps/_devops/continuous-compliance | Cross-domain | Verify after migration |
| _server/nodejs/index.md | /maps/_server/nodejs/source/require | Internal | Update path |

**Links TO these domains (from 0.index.md):**

| Source | Target | Action Required |
|--------|--------|-----------------|
| 0.index.md | /maps/_business/business-analysis | Update to /maps/_business/analysis/analysis |
| 0.index.md | /maps/_business/venture-capital | Update to /maps/_business/venture-capital/venture-capital |
| 0.index.md | /maps/_industry/digital | No change (flat structure) |
| 0.index.md | /maps/_industry/low-code | No change (flat structure) |
| 0.index.md | /maps/_industry/analytics | No change (flat structure) |
| 0.index.md | /maps/_policy/policy | No change |
| 0.index.md | /maps/_server/nodejs | Update to /maps/_server/nodejs/nodejs |

---

## Special Considerations

### 1. business-examples.md Handling
This file has only 13 lines and is essentially a stub reference to a course. Options:
- **Option A:** Archive to `_business/_archived/` (recommended)
- **Option B:** Delete (content is minimal)
- **Option C:** Merge content into domain entry file

### 2. _server/nodejs/index.md Renaming
The file must be renamed from `index.md` to `nodejs.md` to match the subdomain entry pattern. Internal links need updating.

### 3. _policy Expansion Potential
If more policy files are added (e.g., five-years-plan-15.md, industry-policies.md), consider creating subdomains:
```
_policy/
├── policy.md
├── national-plans/
│   ├── five-years-plan-14.md
│   └── five-years-plan-15.md
└── industry-policy/
    └── manufacturing-policy.md
```

### 4. business-analysis.md Future Splitting
The 302-line file could be split further in future phases:
- `analysis/models.md` (非共识机会, 三级火箭, 护城河矩阵)
- `analysis/cases.md` (company case studies)
- `analysis/frameworks.md` (价值链, 业务定位)

For Phase 6, keep as single file within `analysis/` subdomain to minimize complexity.

---

## File Inventory Summary

| Domain | Files | Lines Total | Subdomains? | Pattern |
|--------|-------|-------------|-------------|---------|
| _business | 3 | 336 | Yes (2) | A: Subdomain with Topics |
| _industry | 3 | 355 | No | B: Flat Topics |
| _policy | 2 | 141 | No | B: Flat Topics |
| _server | 2 | 620 | Yes (1) | C: Preserve Subdirectory |
| **Total** | **10** | **1452** | **3 subdomains** | **Mixed** |

---

## Recommended Migration Order

1. **_server** - Easiest, just formalize existing structure
2. **_policy** - Simple flat structure, minimal content
3. **_industry** - Simple flat structure
4. **_business** - Most complex, requires content consolidation decisions

---

## Sources

### Primary (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_business/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_industry/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_policy/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_server/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_go/` - Reference pattern (simple phase)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_refactor/` - Reference pattern (simple phase)

### Secondary (MEDIUM confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md` - Cross-link verification

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files examined directly
- Subdomain recommendations: HIGH - Clear content boundaries identified
- Migration patterns: HIGH - Based on existing simple phase patterns
- Cross-link inventory: MEDIUM - May have missed dynamic links

**Research date:** 2026-02-24
**Valid until:** Next phase iteration

---

## RESEARCH COMPLETE

**Phase:** 06 - Medium Batch 1
**Confidence:** HIGH

### Key Findings

1. **_business** needs 2 subdomains: `analysis/` (large consolidated content) and `venture-capital/` (distinct topic)
2. **_industry** should remain flat - 3 distinct topics with no clear grouping
3. **_policy** should remain flat - only 2 files, premature for subdomains
4. **_server** has existing `nodejs/` subdirectory that should be formalized as subdomain
5. **10 total files** to migrate, **3 subdomains** to create
6. **Cross-domain links** need verification, especially from 0.index.md

### File Created
`.planning/phases/06-medium-batch-1/06-RESEARCH.md`

### Open Questions

1. Should business-examples.md be archived or deleted? (Recommendation: archive)
2. Should business-analysis.md be split into multiple topic files within analysis/? (Recommendation: keep consolidated for Phase 6)
3. Are there any dynamic links from other content files not captured in 0.index.md?

### Ready for Planning

Research complete. Planner can now create PLAN.md with specific migration tasks for each domain.
