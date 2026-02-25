# ROADMAP: Maps 知识库重构

**Project:** Maps Knowledge Base Refactoring
**Core Value:** 知识库具备清晰的认知导航结构，读者可以按领域→子领域→主题→知识点的路径快速定位信息
**Defined:** 2026-02-24
**Depth:** Comprehensive

---

## Overview

This roadmap delivers a complete reorganization of the 6.maps/ knowledge base from its current flat/mixed structure into a unified 4-layer cognitive hierarchy: Domain → Subdomain → Topic → Knowledge Point. The work proceeds in **21 phases** for maximum control and incremental validation.

---

## Phase Structure

| Phase | Name | Goal | Domains | Success Criteria |
|-------|------|------|---------|------------------|
| 1 | Foundation & Planning | Establish taxonomy standards, link audit, and URL redirect infrastructure | — | 4 |
| 2 | Simple Batch 1 | Migrate first 5 simple domains | _go, _markdown, _php, _regex, _seo | 3 |
| 3 | Simple Batch 2 | Migrate next 5 simple domains | _react-native, _oop, _medicine, _manage, _games | 3 |
| 4 | Simple Batch 3 | Migrate next 5 simple domains | _game, _company, _communication, _cli, _blogs | 3 |
| 5 | Simple Batch 4 | Migrate remaining simple domains | _apps, _cross-domain, _refactor, _photography | 3 |
| 6 | Medium Batch 1 | Migrate first 4 medium domains | _business, _industry, _policy, _server | 3 |
| 7 | Medium Batch 2 | Migrate next 4 medium domains | _typescript, _visual, _cpp, _docs | 3 |
| 8 | Medium Batch 3 | Migrate next 4 medium domains | _products, _management, _software, _test | 3 |
| 9 | Medium Batch 4 | Migrate next 4 medium domains | _cloud-native, _computer, _product, _science | 3 |
| 10 | Medium Batch 5 | Migrate remaining medium domains | _ui, _programming, _web | 3 |
| 11 | Complex: Database | Restructure _database domain (12 files) | _database | 3 |
| 12 | Complex: DevOps | Restructure _devops domain (12 files) | _devops | 3 |
| 13 | Complex: FE Framework | Restructure _fe-framework domain (14 files) | _fe-framework | 3 |
| 14 | Complex: Workflow | Restructure _workflow domain (14 files) | _workflow | 3 |
| 15 | 4/4 | Complete    | 2026-02-25 | 3 |
| 16 | 5/5 | Complete    | 2026-02-25 | 3 |
| 17 | Complex: AI | Restructure _ai domain (70 files) | _ai | 3 |
| 18 | Validation & Integration | Verify all links, update navigation, regenerate feeds | — | 5 |

**Coverage:** 56/56 v1 requirements mapped ✓

---

## Phase 1: Foundation & Planning

**Goal:** Establish the structural foundation and planning artifacts needed before any file migration begins.

**Dependencies:** None (starting phase)

**Requirements Mapped:**
- PLAN-01: 制定四层认知结构的判断标准文档
- PLAN-02: 识别并记录所有现有内部链接（59+ 处）
- PLAN-03: 设计 URL 重定向方案
- PLAN-04: 完成所有 46 个领域的复杂度评估

**Plans:**

- [ ] 01-01-PLAN.md — Create taxonomy criteria document (4-layer hierarchy decision rules)
- [ ] 01-02-PLAN.md — Complete link audit and document link update strategy
- [ ] 01-03-PLAN.md — Assess complexity for all 46 domains

**Success Criteria:**

1. **Taxonomy criteria document exists and is usable** — A decision tree document clearly defines how to classify content into Domain/Subdomain/Topic/Knowledge Point with concrete examples from the existing codebase.

2. **All internal links audited and mapped** — Complete inventory of 298+ internal `.md` links across 71 files exists with source location, target path, and migration action for each.

3. **Link update strategy documented** — Direct link update approach documented (no redirects per decision); includes grep patterns, update priorities, and verification methods.

4. **Complexity assessment complete** — All 46 domains categorized into simple/medium/complex with file counts and structural notes documented.

---

## Phase 2: Simple Batch 1

**Goal:** Migrate first batch of 5 simple domains (1 file each) to validate patterns.

**Dependencies:** Phase 1 (Foundation)

**Requirements Mapped:**
- SIMP-01: 重构 _go 领域
- SIMP-02: 重构 _markdown 领域
- SIMP-03: 重构 _php 领域
- SIMP-04: 重构 _regex 领域
- SIMP-05: 重构 _seo 领域

**Success Criteria:**

1. **All 5 domains have proper entry files** — Each domain has a `{domain}.md` entry file with subdomain navigation.
2. **Redirect mechanism validated** — Sample tests confirm old URLs redirect correctly.
3. **Pattern documentation updated** — Concrete examples from these migrations added to taxonomy criteria.

---

## Phase 3: Simple Batch 2

**Goal:** Migrate second batch of 5 simple domains.

**Dependencies:** Phase 2 (Simple Batch 1)

**Requirements Mapped:**
- SIMP-06: 重构 _react-native 领域
- SIMP-07: 重构 _oop 领域
- SIMP-08: 重构 _medicine 领域
- SIMP-09: 重构 _manage 领域
- SIMP-10: 重构 _games 领域

**Success Criteria:**

1. **All 5 domains restructured** — Following patterns established in Phase 2.
2. **Cross-domain consistency** — Same patterns applied consistently.
3. **No regression** — Links and redirects still working.

---

## Phase 4: Simple Batch 3

**Goal:** Migrate third batch of 5 simple domains.

**Dependencies:** Phase 3 (Simple Batch 2)

**Requirements Mapped:**
- SIMP-11: 重构 _game 领域
- SIMP-12: 重构 _company 领域
- SIMP-13: 重构 _communication 领域
- SIMP-14: 重构 _cli 领域
- SIMP-15: 重构 _blogs 领域

**Success Criteria:**

1. **All 5 domains restructured**
2. **Pattern refinement** — Any edge cases discovered are documented
3. **Ready for medium complexity** — Patterns proven stable

---

## Phase 5: Simple Batch 4

**Goal:** Migrate remaining 4 simple domains.

**Dependencies:** Phase 4 (Simple Batch 3)

**Requirements Mapped:**
- SIMP-16: 重构 _apps 领域
- SIMP-17: 重构 _cross-domain 领域
- SIMP-18: 重构 _refactor 领域
- SIMP-19: 重构 _photography 领域

**Plans:**

- [ ] 05-P01-PLAN.md — Migrate _apps domain (vpn.md → networking/vpn.md)
- [ ] 05-P02-PLAN.md — Migrate _photography domain (0.index.md → techniques/techniques.md)
- [ ] 05-P03-PLAN.md — Migrate _refactor domain (refactor.md → refactoring/refactor.md)
- [ ] 05-P04-PLAN.md — Create _cross-domain domain entry (empty domain)
- [ ] 05-P05-PLAN.md — Update cross-domain links in 0.index.md

**Success Criteria:**

1. **All simple domains complete** — 19/19 simple domains migrated
2. **Simple domain patterns finalized** — Documented for reference in medium phases
3. **Checkpoint review** — All simple migrations reviewed for consistency

---

## Phase 6: Medium Batch 1

**Goal:** Migrate first batch of 4 medium domains (3-4 files each).

**Dependencies:** Phase 5 (Simple Batch 4)

**Requirements Mapped:**
- MED-01: 重构 _business 领域（3 文件）
- MED-02: 重构 _industry 领域（3 文件）
- MED-03: 重构 _policy 领域（2 文件）
- MED-04: 重构 _server 领域（2 文件）

**Plans:**

- [ ] 06-P01-PLAN.md — Migrate _business domain (analysis/ and venture-capital/ subdomains)
- [ ] 06-P02-PLAN.md — Migrate _industry domain (flat structure: 3 topics)
- [ ] 06-P03-PLAN.md — Migrate _policy domain (flat structure: 2 topics)
- [ ] 06-P04-PLAN.md — Migrate _server domain (formalize nodejs/ subdomain)

**Success Criteria:**

1. **All 4 domains restructured** — File-based and directory-based subdomain patterns demonstrated.
2. **Subdomain decision criteria validated** — 1-2 topics = file, 3+ topics = directory.
3. **Link updates verified** — Internal links between these domains updated.

---

## Phase 7: Medium Batch 2

**Goal:** Migrate second batch of 4 medium domains.

**Dependencies:** Phase 6 (Medium Batch 1)

**Requirements Mapped:**
- MED-05: 重构 _typescript 领域（2 文件）
- MED-06: 重构 _visual 领域（3 文件 + 1 subdir）
- MED-07: 重构 _cpp 领域（4 文件）
- MED-08: 重构 _docs 领域（2 subdirs, 4 文件）

**Plans:**

- [ ] 07-P01-PLAN.md — Migrate _typescript domain (type-gymnastics/ subdomain)
- [ ] 07-P02-PLAN.md — Migrate _visual domain (3 subdomains: info-design/, visualization/, gis/)
- [ ] 07-P03-PLAN.md — Migrate _cpp domain (flat structure: 4 topic files)
- [ ] 07-P04-PLAN.md — Migrate _docs domain (formalize doc-manage/ and tech-docs/ subdomains)

**Success Criteria:**

1. **All 4 domains restructured** — _typescript with type-gymnastics subdomain, _visual with 3 subdomains, _cpp flat with 4 topics, _docs with 2 formalized subdomains.
2. **Pattern consistency** — Same decision criteria as Phase 6: 1-2 topics = file, 3+ topics = directory.
3. **No fragmentation issues** — Knowledge points remain as H4 headings.
4. **Cross-domain links updated** — 0.index.md and internal domain links point to new paths.

---

## Phase 8: Medium Batch 3

**Goal:** Migrate third batch of 4 medium domains.

**Dependencies:** Phase 7 (Medium Batch 2)

**Requirements Mapped:**
- MED-09: 重构 _products 领域（4 文件）
- MED-10: 重构 _management 领域（5 文件）
- MED-11: 重构 _software 领域（5 文件）
- MED-12: 重构 _test 领域（5 文件）

**Success Criteria:**

1. **All 4 domains restructured**
2. **Medium complexity patterns stable** — No changes to approach needed
3. **Documentation updated** — Any new edge cases recorded

---

## Phase 9: Medium Batch 4

**Goal:** Migrate fourth batch of 4 medium domains.

**Dependencies:** Phase 8 (Medium Batch 3)

**Requirements Mapped:**
- MED-13: 重构 _cloud-native 领域（6 文件）
- MED-14: 重构 _computer 领域（7 文件）
- MED-15: 重构 _product 领域（7 文件）
- MED-16: 重构 _science 领域（7 文件）

**Success Criteria:**

1. **All 4 domains restructured**
2. **Higher file count handled** — 6-7 file domains successfully migrated
3. **Ready for higher complexity** — Patterns proven for medium-high file counts

---

## Phase 10: Medium Batch 5

**Goal:** Migrate remaining 3 medium domains.

**Dependencies:** Phase 9 (Medium Batch 4)

**Requirements Mapped:**
- MED-17: 重构 _ui 领域（7 文件 → 5 subdomains）
- MED-18: 重构 _programming 领域（8 文件 → 5 subdomains）
- MED-19: 重构 _web 领域（10 文件 → 5 subdomains）

**Plans:**

- [ ] 10-P01-PLAN.md — Migrate _ui domain (design/, accessibility/, typography/, inspiration/, ai-assisted/)
- [ ] 10-P02-PLAN.md — Migrate _programming domain (paradigms/, dx/, debugging/, languages/, frameworks/)
- [ ] 10-P03-PLAN.md — Migrate _web domain (browser/, performance/, security/, crawler/, miniapp/)

**Success Criteria:**

1. **All medium domains complete** — 19/19 medium domains migrated
2. **Web domain (10 files) validated** — Bridge to complex domains established
3. **Medium patterns finalized** — Ready for complex domains

---

## Phase 11: Complex - Database

**Goal:** Restructure _database domain (12 files).

**Dependencies:** Phase 10 (Medium Batch 5)

**Requirements Mapped:**
- COMP-01: 重构 _database 领域（12 文件）

**Plans:**

- [ ] 11-P01-PLAN.md — Create domain entry and migrate root files (redis.md, graphql.md)
- [ ] 11-P02-PLAN.md — Rename directories (delta-lake → deltalake) and migrate postgres
- [ ] 11-P03-PLAN.md — Finalize subdomain entries and update cross-domain links

**Success Criteria:**

1. **_database domain restructured** — All 12 files organized into proper 4-layer hierarchy.
2. **Hybrid patterns implemented** — Mix of file-based and directory-based subdomains as appropriate.
3. **Knowledge point consistency** — All H4 headings represent atomic knowledge points.

---

## Phase 12: Complex - DevOps

**Goal:** Restructure _devops domain (12 files).

**Dependencies:** Phase 11 (Complex - Database)

**Requirements Mapped:**
- COMP-02: 重构 _devops 领域（12 文件）

**Success Criteria:**

1. **_devops domain restructured**
2. **Pattern consistency with database** — Same approach applied
3. **No issues encountered** — Or document and resolve any new issues

---

## Phase 13: Complex - FE Framework

**Goal:** Restructure _fe-framework domain (14 files).

**Dependencies:** Phase 12 (Complex - DevOps)

**Requirements Mapped:**
- COMP-03: 重构 _fe-framework 领域（14 文件）

**Success Criteria:**

1. **_fe-framework domain restructured**
2. **Frontend-related patterns** — May inform Phase 16 (_frontend)
3. **Link relationships preserved** — Any links to/from _frontend maintained

---

## Phase 14: Complex - Workflow

**Goal:** Restructure _workflow domain (14 files).

**Dependencies:** Phase 13 (Complex - FE Framework)

**Requirements Mapped:**
- COMP-04: 重构 _workflow 领域（14 文件）

**Plans:**

- [ ] 14-P01-PLAN.md — Create engineering/ and package-manager/ subdomains
- [ ] 14-P02-PLAN.md — Create build-tools/ and linter/ subdomains (rename packer/)
- [ ] 14-P03-PLAN.md — Create monorepo/, compiler/ subdomains and workflow.md entry
- [ ] 14-P04-PLAN.md — Update cross-domain links in 0.index.md and related domains

**Success Criteria:**

1. **_workflow domain restructured** — 6 subdomains with proper entry files
2. **Engineering patterns established** — May share patterns with _devops
3. **Cross-references updated** — Links between workflow, devops, and software domains

---

## Phase 15: Complex - Person

**Goal:** Restructure _person domain (19 files).

**Dependencies:** Phase 14 (Complex - Workflow)

**Requirements Mapped:**
- COMP-05: 重构 _person 领域（19 文件）

**Plans:**

4/4 plans complete
- [ ] 15-02-PLAN.md — Create science/ subdomain with 7 scientists
- [ ] 15-03-PLAN.md — Create philosophy/ and historical/ subdomains (5 files)
- [ ] 15-04-PLAN.md — Create person.md domain entry and update navigation links

**Success Criteria:**

1. **_person domain restructured** — 19 files into proper hierarchy
2. **Content type considerations** — Biographical/reference content structured appropriately
3. **Navigation clarity** — Person entries logically organized

---

## Phase 16: Complex - Frontend

**Goal:** Restructure _frontend domain (29 files).

**Dependencies:** Phase 15 (Complex - Person)

**Requirements Mapped:**
- COMP-06: 重构 _frontend 领域（29 文件）

**Success Criteria:**

1. **_frontend domain restructured** — 29 files into proper hierarchy
2. **Existing nested structure preserved** — _frontend/css/ already has good structure
3. **Integration with _fe-framework** — Cross-links maintained

---

## Phase 17: Complex - AI

**Goal:** Restructure _ai domain (70 files) - the most complex domain.

**Dependencies:** Phase 16 (Complex - Frontend)

**Requirements Mapped:**
- COMP-07: 重构 _ai 领域（70 文件）

**Success Criteria:**

1. **_ai domain restructured** — 70 files into proper 4-layer hierarchy
2. **Subdomain-level splitting validated** — Complex nested structure handled
3. **All knowledge points correctly classified** — H4 headings at right level

**Research Flags:**
- May need subdomain-level splitting decisions requiring content analysis

---

## Phase 18: Validation & Integration

**Goal:** Verify the complete reorganization and update all cross-cutting concerns.

**Dependencies:** Phase 17 (Complex - AI)

**Requirements Mapped:**
- VAL-01: 验证所有内部链接可正常访问
- VAL-02: 验证 RSS Feed 配置正确
- VAL-03: 更新 sitemap 生成配置
- VAL-04: 更新 0.index.md 中的领域导航链接
- VAL-05: 执行端到端导航测试

**Success Criteria:**

1. **Zero broken internal links** — Link checker confirms all internal `.md` links resolve correctly.
2. **RSS feeds valid and current** — Feedme configuration updated for new paths.
3. **Sitemap reflects new structure** — All migrated content at correct paths.
4. **Domain navigation complete** — `0.index.md` contains accurate navigation to all 46 domains.
5. **End-to-end navigation verified** — Can navigate from root → domain → subdomain → topic → knowledge point.

---

## Progress Tracking

| Phase | Status | Requirements Complete | Notes |
|-------|--------|----------------------|-------|
| 1 - Foundation & Planning | **Complete** ✅ | 4/4 | Taxonomy, link audit, complexity assessment |
| 2 - Simple Batch 1 | **Complete** ✅ | 5/5 | _go, _markdown, _php, _regex, _seo |
| 3 - Simple Batch 2 | **Complete** ✅ | 5/5 | _react-native, _oop, _medicine, _manage, _games |
| 4 - Simple Batch 3 | **Complete** ✅ | 5/5 | _game, _company, _communication, _cli, _blogs |
| 5 - Simple Batch 4 | **Complete** ✅ | 4/4 | _apps, _cross-domain, _refactor, _photography |
| 6 - Medium Batch 1 | **Complete** ✅ | 4/4 | _business, _industry, _policy, _server |
| 7 - Medium Batch 2 | **Complete** ✅ | 4/4 | _typescript, _visual, _cpp, _docs migrated |
| 8 - Medium Batch 3 | **Complete** ✅ | 4/4 | _products, _management, _software, _test migrated |
| 9 - Medium Batch 4 | **Complete** ✅ | 4/4 | _cloud-native, _computer, _product, _science migrated |
| 10 - Medium Batch 5 | **Planned** | 0/3 | Ready for execution |
| 11 - Complex: Database | Pending | 0/1 | Blocked on Phase 10 |
| 12 - Complex: DevOps | Pending | 0/1 | Blocked on Phase 11 |
| 13 - Complex: FE Framework | **Complete** ✅ | 4/4 | 6 subdomains restructured |
| 14 - Complex: Workflow | **Complete** ✅ | 4/4 | 6 subdomains restructured |
| 15 - Complex: Person | Pending | 0/1 | Blocked on Phase 14 |
| 16 - Complex: Frontend | Pending | 0/1 | Blocked on Phase 15 |
| 17 - Complex: AI | Pending | 0/1 | Blocked on Phase 16 |
| 18 - Validation & Integration | Pending | 0/5 | Blocked on Phase 17 |

**Overall Progress:** 46/56 requirements complete (82%)

---

## Next Action

Execute `/gsd:plan-phase 14` to plan Complex: Workflow domain restructuring.

---

## Risk Summary

| Risk | Phase | Mitigation |
|------|-------|------------|
| URL breakage | 1 | Direct link updates (no redirects); verify with grep after each move |
| Orphaned links | 1-18 | Complete audit in Phase 1; validate in Phase 18 |
| Inconsistent structure | 1 | Establish taxonomy criteria before migration |
| Lost context | 2-17 | Preserve original_path in frontmatter |
| Over-fragmentation | 6-17 | Keep knowledge points as H4, not separate files |
| Feed/SEO breakage | 18 | Update configs after paths stabilize |
| Pattern drift | 2-17 | Review patterns at each checkpoint |

---

## Next Action

Execute `/gsd:plan-phase 09` to plan Medium Batch 4 (4 medium domains: _cloud-native, _computer, _product, _science).

---

*Roadmap created: 2026-02-24*
*Last updated: 2026-02-24 (refined to 18 phases)*
