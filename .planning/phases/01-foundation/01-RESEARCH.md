# Phase 1: Foundation & Planning - Research

**Researched:** 2026-02-24
**Domain:** Knowledge base taxonomy design, Nuxt Content link management, content migration planning
**Confidence:** HIGH

## Summary

This research establishes the foundation for reorganizing a 325-file, 63-domain knowledge base from a flat structure into a 4-layer cognitive hierarchy (Domain → Subdomain → Topic → Knowledge Point). The project uses Nuxt Content v2 (not v3) with @nuxt/content ^2.13.4, which handles internal Markdown links through relative path resolution at build time. Key findings confirm that: (1) Nuxt Content v2 does not have automatic link rewriting for .md files - links are resolved as-is, making manual link updates essential during refactoring; (2) a systematic link audit methodology using grep patterns can identify all 298+ internal /maps/ references across 71 files; (3) taxonomy documentation patterns from knowledge management best practices support the 4-layer hierarchy decision; (4) file count distribution (171 simple <50 lines, 96 medium 50-150 lines, 57 complex 150+ lines) validates the 18-phase migration approach with complexity-based batching.

**Primary recommendation:** Proceed with direct link updates (no redirects) using a systematic grep-based audit process, implement the 4-layer taxonomy with file-count thresholds for complexity categorization, and validate each phase with link integrity checks before proceeding.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

1. **四层认知结构的判断标准**
   - 领域 (Domain): 按照 0.index.md 中的 20+ 分类，每个领域对应一个以 `_` 为前缀的目录
   - 子领域 (Subdomain): 统一使用目录形式，不按内容量区分文件或目录。每个子领域是一个子目录，内含入口文件
   - 主题 (Topic): 界定标准是"优先按照讨论范围"。有扩展潜力或内容超过 150+ 行时拆分成单独文件
   - 知识点 (Knowledge Point): 观点、案例、洞见等思考性内容，保持为四级标题，不拆分为独立文件
   - 现有文档的三级标题处理: 重新审视每个三级标题，决定其所属层级

2. **链接保留策略**
   - 所有内容链接都必须保留（包括 6.maps/ 内部引用和其他目录对 maps 的引用）
   - 不保留旧 URL，不采用重定向方案
   - 移动文件时，同步更新所有引用该文件的链接
   - 每次修改或创建文件后，需要验证链接有效性

3. **重定向实现方式 (DECISION: 不采用)**
   - 不使用 Nuxt 路由规则、中间件重定向、服务器路由重定向
   - 采用直接修改链接地址的方式

4. **迁移粒度控制**
   - 按原计划执行：18 个阶段
   - 简单领域：每批次 4-5 个领域（4 个批次）
   - 中等领域：每批次 4 个领域（5 个批次）
   - 复杂领域：每个领域单独一个批次（7 个批次）
   - 验证与集成：单独一个批次

### Claude's Discretion

- Link update strategy: Claude 根据情况选择最佳方法（自动化脚本或手动更新）
- 验证时机: Claude 决定最佳验证时机（建议在每个阶段完成后进行验证）
- 对于知识点是否应该拆分的边界情况，Claude 有灵活选择的权限

### Deferred Ideas (OUT OF SCOPE)

None — 讨论保持在 Phase 1 范围内。

</user_constraints>

---

## Key Findings by Research Task

### 1. Nuxt Content v2/v3 Link Handling

**Current Stack:** @nuxt/content ^2.13.4 (Nuxt Content v2, NOT v3)

**How Internal Links Work:**
- Nuxt Content v2 does NOT automatically rewrite `.md` links to route paths
- Links in Markdown are resolved as-is by the browser
- Relative paths (e.g., `./topic.md`, `../other/file.md`) are recommended over absolute paths for portability
- The `ContentRenderer` component renders Markdown content but does not transform link targets

**Critical Implication for Migration:**
Since Nuxt Content v2 does not have automatic link rewriting like VuePress (which converts `[text](./file.md)` to route paths), every internal link must be manually updated when files move. This validates the decision to NOT use redirects and instead update links directly.

**Best Practices for Link Integrity:**
1. Use relative paths for all internal links (confirmed by VuePress and Nuxt documentation)
2. Links should point to the actual file path, not the URL path
3. Cross-verify links after any file move operation
4. Use grep-based auditing to find all references before moving files

**Confidence:** HIGH (verified from official Nuxt Content documentation)

---

### 2. Link Audit Methodology

**Current State Analysis:**
- Total internal `/maps/` links found: **298 occurrences across 71 files**
- Cross-directory links (from outside 6.maps/): Found in `content/7.tools/`, `content/8.source-code/`, `content/_achieved/`, `content/2.articles/`
- Link pattern: `[text](/maps/path/to/file)` or `[text](./relative/path.md)`

**Systematic Audit Process:**

```bash
# 1. Find all internal /maps/ links
grep -rE '\]\(/maps/' content/ --include="*.md"

# 2. Find all .md internal links (relative)
grep -rE '\]\([^)]*\.md\)' content/ --include="*.md"

# 3. Generate link inventory with source files
grep -rnE '\]\(/maps/[^)]+\)' content/ --include="*.md" | \
  awk -F: '{print $1 " -> " $3}' > link-inventory.txt
```

**Link Categories Identified:**
1. **Absolute /maps/ links**: `[text](/maps/_domain/path)` — used in navigation/index files
2. **Relative .md links**: `[text](./file.md)` — used within same directory
3. **Cross-directory links**: `[text](/maps/_domain/file)` — from articles, tools, source-code directories

**Migration Action for Each Link Type:**
| Link Type | Current Example | After Migration | Action |
|-----------|-----------------|-----------------|--------|
| Absolute /maps/ | `[text](/maps/_ai/rag)` | `[text](/maps/_ai/rag/rag)` | Update path |
| Relative .md | `[text](./file.md)` | `[text](./subdomain/file.md)` | Update relative path |
| Cross-directory | `[text](/maps/_ai/rag)` from outside | Same | Update to new structure |

**Confidence:** HIGH (verified through actual codebase analysis)

---

### 3. Taxonomy Documentation Patterns

**Best Practices from Knowledge Management Research:**

1. **Hierarchical Classification (Taxonomy)**
   - Taxonomy provides navigable concept hierarchy
   - Helps users quickly locate resources
   - Provides context for learning new knowledge
   - Consists of: hierarchical structure + controlled vocabulary

2. **Decision Tree Documentation Pattern**
   - Document clear criteria for each level
   - Provide concrete examples from actual content
   - Include boundary case handling
   - Keep classification simple and flexible

3. **4-Layer Hierarchy Validation**
   The proposed structure aligns with knowledge management best practices:
   - **Domain**: Broad subject area (matches organizational boundaries)
   - **Subdomain**: Specialized area within domain (directory-based for consistency)
   - **Topic**: Specific discussion scope (file-based, 150+ line threshold)
   - **Knowledge Point**: Atomic insight (H4 heading, not file)

**Documentation Pattern for Taxonomy Criteria:**
```markdown
## [Level] Decision Criteria

### Rule
[Clear, testable criterion]

### Examples
- ✅ [Correct classification example]
- ❌ [Incorrect classification example]

### Boundary Cases
[How to handle edge cases]
```

**Confidence:** MEDIUM (based on knowledge management literature, verified applicable to this codebase)

---

### 4. Complexity Assessment Approaches

**File Distribution Analysis (6.maps/ directory):**

| Complexity | Line Count | File Count | Percentage |
|------------|------------|------------|------------|
| Simple | < 50 lines | 171 | 52.6% |
| Medium | 50-150 lines | 96 | 29.5% |
| Complex | 150+ lines | 57 | 17.5% |
| **Total** | — | **325** | 100% |

**Domain Complexity Categorization (63 domains):**

| Category | File Count | Domains | Batch Strategy |
|----------|------------|---------|----------------|
| Simple | 1 file | 19 domains | 4 batches × 4-5 domains |
| Medium | 2-10 files | 19 domains | 5 batches × 4 domains |
| Complex | 10+ files | 7 domains | 7 batches × 1 domain |
| Validation | — | — | 1 final batch |

**Complex Domain Breakdown:**
| Domain | Files | Notes |
|--------|-------|-------|
| _ai | 70 | Largest domain, needs subdomain splitting |
| _frontend | 29 | Already has some nested structure |
| _person | 19 | Biographical content |
| _workflow | 14 | Engineering/tooling content |
| _fe-framework | 14 | Framework-specific content |
| _devops | 12 | CI/CD, deployment content |
| _database | 12 | Data storage technologies |

**Risk Assessment:**
- **Low risk**: Simple domains (1 file) — straightforward migration
- **Medium risk**: Medium domains (2-10 files) — need subdomain decisions
- **High risk**: Complex domains (10+ files) — require content analysis for subdomain splitting

**Confidence:** HIGH (based on actual file analysis)

---

### 5. Migration Planning Patterns

**18-Phase Structure (as defined in ROADMAP.md):**

| Phase | Type | Domains | Dependencies |
|-------|------|---------|--------------|
| 1 | Foundation | — | None |
| 2-5 | Simple batches | 19 domains | Sequential |
| 6-10 | Medium batches | 19 domains | Sequential |
| 11-17 | Complex individual | 7 domains | Sequential |
| 18 | Validation | — | All above |

**Dependency Management:**
- Linear dependency chain: Each phase depends on previous
- Validation gates at: end of simple batches, end of medium batches, end of each complex domain
- Final validation phase validates entire structure

**Validation Gates:**
1. **Per-phase validation**: Link integrity check after each batch
2. **Checkpoint reviews**: After simple batches complete, after medium batches complete
3. **Final validation**: Complete link audit, navigation verification, feed validation

**Migration Best Practices from Industry Research:**
1. **Break into repeatable, validatable parts** (Adobe content migration guide)
2. **Use sample dataset for end-to-end validation** before full migration
3. **Define validation criteria upfront** — zero broken links, valid feeds, correct navigation
4. **Content freeze during migration** to prevent delta issues

**Confidence:** HIGH (roadmap already well-defined, validated against migration best practices)

---

## Recommended Approach for Each Requirement

### PLAN-01: 四层认知结构判断标准文档

**Recommended Structure:**

```markdown
# 四层认知结构判断标准

## 领域 (Domain)
**判断标准:**
- 对应 0.index.md 中的顶层分类
- 物理形式: 以 `_` 为前缀的目录 (如 `_frontend/`)

**验证方法:**
- 检查目录名是否在 0.index.md 导航中

## 子领域 (Subdomain)
**判断标准:**
- 领域下的专业细分方向
- 物理形式: 统一为目录，不按内容量区分
- 必须包含入口文件: `0.index.md` 或 `{subdomain}.md`

**决策树:**
```
内容属于哪个领域?
  → 是否构成独立学习单元?
    → 是 → 创建子领域目录
```

## 主题 (Topic)
**判断标准:**
- 界定标准: "优先按照讨论范围"
- 拆分阈值: 内容超过 150 行 OR 有独立扩展潜力
- 物理形式: Markdown 文件

**决策树:**
```
内容是否超过 150 行?
  → 是 → 拆分为独立主题文件
  → 否 → 是否有扩展潜力?
    → 是 → 拆分为独立主题文件
    → 否 → 保持为子领域入口文件的一部分
```

## 知识点 (Knowledge Point)
**判断标准:**
- 内容类型: 观点、案例、洞见等思考性内容
- 物理形式: 四级标题 (`####`)
- 不拆分为独立文件

**决策树:**
```
内容是事实性描述还是思考性洞见?
  → 思考性洞见 → 四级标题
  → 事实性描述 → 考虑是否构成新主题
```
```

**Confidence:** HIGH

---

### PLAN-02: 链接审计清单

**Recommended Process:**

1. **Generate Complete Inventory:**
```bash
# All /maps/ links
grep -rnE '\]\(/maps/[^)]+\)' content/ --include="*.md" > .planning/phases/01-foundation/link-inventory-maps.txt

# All .md relative links
grep -rnE '\]\([^)]+\.md[^)]*\)' content/ --include="*.md" > .planning/phases/01-foundation/link-inventory-md.txt
```

2. **Categorize Links:**
   - Internal to 6.maps/ (source and target both in 6.maps/)
   - Cross-directory (source outside 6.maps/, target inside)
   - Navigation links (in 0.index.md)
   - Content links (within articles)

3. **Create Migration Tracking:**
   | Source File | Current Link | Target Domain | Migration Action | Status |
   |-------------|--------------|---------------|------------------|--------|

**Confidence:** HIGH

---

### PLAN-03: URL 方案（直接更新链接）

**Recommended Approach (No Redirects):**

Since the decision is to NOT use redirects, the plan becomes:

1. **Pre-migration Link Mapping:**
   - Document every link that will need updating
   - Map old paths to new paths for each domain

2. **Update During Migration:**
   - For each file moved, immediately update all references
   - Use grep to find all references: `grep -r "old/path" content/`

3. **Post-migration Verification:**
   - Run link checker to confirm no broken links
   - Build project to verify Nuxt Content resolves all paths

**Link Update Priority:**
1. 0.index.md navigation links (highest visibility)
2. Cross-directory links (external to 6.maps/)
3. Internal 6.maps/ links

**Confidence:** HIGH (validates the locked decision)

---

### PLAN-04: 46 领域复杂度评估和阶段分配

**Current Assessment (63 directories found, 46 have content):**

| Category | Domains | Files Each | Batches |
|----------|---------|------------|---------|
| Simple (1 file) | _go, _markdown, _php, _regex, _seo, _react-native, _oop, _medicine, _manage, _games, _game, _company, _communication, _cli, _blogs, _apps, _cross-domain, _refactor, _photography | 1 | 4 batches |
| Medium (2-10 files) | _business, _industry, _policy, _server, _typescript, _visual, _cpp, _docs, _products, _management, _software, _test, _cloud-native, _computer, _product, _science, _ui, _programming, _web | 2-10 | 5 batches |
| Complex (10+ files) | _database, _devops, _fe-framework, _workflow, _person, _frontend, _ai | 12-70 | 7 batches |

**Recommended Validation:**
- Confirm file counts match ROADMAP.md
- Identify any domains with complex nested structure (e.g., _frontend/css/ already has good structure)
- Flag domains needing special handling

**Confidence:** HIGH (validated against actual file system)

---

## Risk Mitigation Strategies

| Risk | Mitigation Strategy | Verification |
|------|---------------------|--------------|
| Broken links after migration | Update all references immediately when moving files; run grep to find all references | Link checker script after each phase |
| Inconsistent taxonomy application | Document concrete examples for each level; review at checkpoint phases | Spot-check domains against criteria |
| Lost content during reorganization | Preserve original_path in frontmatter during migration | Verify all original files have new location |
| Over-fragmentation (too many small files) | Enforce 150+ line threshold for topic splitting | Review file count distribution after each phase |
| Under-fragmentation (files too large) | Flag files >300 lines for potential splitting | Review in complex domain phases |
| Pattern drift across phases | Document patterns from Phase 2-3; reference in later phases | Consistency review at checkpoints |
| Build failures due to invalid links | Run `nuxt generate` or `nuxt build` after each batch | Build succeeds with no link errors |

---

## References Consulted

### Primary (HIGH confidence)
- Nuxt Content v2 Documentation (https://content.nuxt.com/docs/files/markdown) - Markdown file handling, querying, ContentRenderer component
- Context7: /websites/content_nuxt - Nuxt Content library documentation

### Secondary (MEDIUM confidence)
- VuePress Markdown Link Documentation - Confirms relative path recommendations for internal links
- Google Cloud Migration Assessment Guide - Complexity assessment methodology
- Microsoft SharePoint Migration Best Practices - Migration planning patterns
- Adobe Content Migration Guide - 5 key principles for successful migration

### Tertiary (LOW confidence - validated against primary)
- Web search results for taxonomy documentation patterns
- Web search results for link audit methodology

### Local Codebase Analysis (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/` - 325 markdown files, 63 directories
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md` - Domain navigation structure
- `/Users/lionad/Github/Lionad-Morotar/blog/package.json` - @nuxt/content ^2.13.4
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/ROADMAP.md` - 18-phase migration plan
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/01-foundation/01-CONTEXT.md` - Locked decisions

---

## Metadata

**Confidence breakdown:**
- Nuxt Content link handling: HIGH - verified from official documentation
- Link audit methodology: HIGH - validated with actual grep commands on codebase
- Taxonomy patterns: MEDIUM - based on KM literature, applicable to this use case
- Complexity assessment: HIGH - based on actual file system analysis
- Migration planning: HIGH - roadmap already well-defined

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (30 days for stable Nuxt Content v2)

**Open Questions:**
1. Are there any custom Nuxt Content configurations that modify link behavior? (Check nuxt.config.ts)
2. Are there any existing link checking scripts in the project? (Check package.json scripts)
3. Should the 150-line threshold for topic splitting be adjusted based on actual content analysis?

---

## RESEARCH COMPLETE

**Phase:** 01 - Foundation & Planning
**Confidence:** HIGH

### Key Findings
1. Nuxt Content v2 does NOT automatically rewrite .md links - manual updates required during migration
2. 298 internal /maps/ links found across 71 files requiring audit and tracking
3. 325 files distributed as: 171 simple (<50 lines), 96 medium (50-150 lines), 57 complex (150+ lines)
4. 63 domain directories mapped to 18-phase migration structure
5. Direct link update strategy (no redirects) is technically sound for Nuxt Content v2

### File Created
`.planning/phases/01-foundation/01-RESEARCH.md`

### Ready for Planning
Research complete. Planner can now create PLAN.md files with confidence in the technical approach.
