# Phase 8: Medium Batch 3 - Research

**Researched:** 2026-02-24
**Domain:** Content Architecture Migration (4-layer cognitive hierarchy)
**Confidence:** HIGH

## Summary

Phase 8 migrates 4 medium complexity domains (_products, _management, _software, _test) from flat file structure to the 4-layer cognitive hierarchy (Domain → Subdomain → Topic → Knowledge Point). Each domain contains 4-5 files, with _management and _test having existing nested subdirectory structures that require special handling.

After analyzing all file contents, the recommendation is to use a **hybrid approach**: some domains need subdomain grouping (_products, _management, _test), while others can remain flat with topic files (_software). The _management domain's existing `shadow-it/` and `slice/` subdirectories and _test's existing `ai/`, `methods/`, and `tools/` subdirectories should be preserved and properly integrated into the hierarchy.

**Primary recommendation:** Apply the validated decision criteria from previous phases: 1-2 topics = flat file structure, 3+ topics = directory-based subdomains. Create subdomains when files share a clear conceptual boundary and form an "independent learning unit."

---

## Domain Analysis

### 1. _products Domain (4 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| bit.md | 81 | Bit component-driven development tool, Harmony platform, component workflow |
| budibase.md | 151 | Budibase low-code platform history, features, growth story |
| dynamo.md | 152 | Dynamo visual programming for BIM, geometry, data structures |
| zapier.md | 17 | Zapier integration/connectors brief overview |

**Content Analysis:**
- `bit.md`: Component-driven development platform (Bit.dev)
- `budibase.md`: Low-code/no-code application builder
- `dynamo.md`: Visual programming tool for Autodesk/Revit BIM
- `zapier.md`: Workflow automation and app connectors

**Subdomain Recommendation:**
**YES** - Create subdomains for _products:
```
_products/
├── products.md (domain entry)
├── bit/
│   └── bit.md (subdomain entry, moved from root)
├── budibase/
│   └── budibase.md (subdomain entry, moved from root)
├── dynamo/
│   └── dynamo.md (subdomain entry, moved from root)
└── zapier/
    └── zapier.md (subdomain entry, moved from root)
```

**Rationale:** All 4 files represent distinct product categories with no conceptual overlap:
- Bit: Component-driven development/DevOps platform
- Budibase: Low-code application development
- Dynamo: Visual programming for design/BIM
- Zapier: Workflow automation/connectors

Each is an "independent learning unit" - a user studying one product has no need for the others. Following the 3+ topics rule, directory-based subdomains are appropriate.

---

### 2. _management Domain (3 files + 2 subdirectories with 2 files)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| capacity-driven-development.md | 229 | Capacity-driven development anti-pattern, team organization |
| organization.md | 40 | Team organization overview, links to subtopics |
| shape-up.md | 13 | Shape Up methodology brief |
| shadow-it/ai-accelerated-shadow-it.md | 216 | AI-accelerated shadow IT governance |
| slice/standalone-data-engineering-team.md | 271 | Standalone data engineering team anti-pattern |

**Content Analysis:**
- `capacity-driven-development.md`: Organizational anti-pattern about team capacity management
- `organization.md`: Team organization overview with links to subtopics
- `shape-up.md`: Product development methodology (Basecamp)
- `shadow-it/`: AI-accelerated shadow IT governance subdomain
- `slice/`: Standalone data engineering team anti-pattern subdomain

**Subdomain Recommendation:**
**YES** - Create subdomains for _management:
```
_management/
├── management.md (domain entry)
├── organization/
│   └── organization.md (subdomain entry, moved from root)
├── shape-up/
│   └── shape-up.md (subdomain entry, moved from root)
├── capacity-driven-development/
│   └── capacity-driven-development.md (subdomain entry, moved from root)
├── shadow-it/
│   └── ai-accelerated-shadow-it.md (keep existing, formalize as subdomain entry)
└── slice/
    └── standalone-data-engineering-team.md (keep existing, formalize as subdomain entry)
```

**Rationale:** The 5 topics are conceptually distinct management concepts:
- Organization: Team structure, "two pizza" principle, agent teams
- Shape Up: Specific product development methodology
- Capacity-driven development: Anti-pattern about resource utilization
- Shadow IT: AI-accelerated shadow IT governance
- Slice: Standalone data engineering team anti-pattern

The existing subdirectories (`shadow-it/`, `slice/`) should be formalized as subdomains. The root files each represent independent management concepts that deserve subdomain status.

**Note:** The `organization.md` file currently serves as a mini-index with links to shape-up, slice, and shadow-it. After migration, these links should be updated to point to the new subdomain paths.

---

### 3. _software Domain (5 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| algorithm.md | 18 | Algorithms (quicksort), multiplayer systems |
| data-structure.md | 32 | Data structures (trees, B-trees, B+ trees) |
| design-patterns.md | 168 | Design patterns (creational, structural, behavioral) |
| software-engineering.md | 29 | Software engineering concepts, Martin Fowler interview |
| whale-fall.md | 64 | Open source project succession (whale fall phenomenon) |

**Content Analysis:**
- `algorithm.md`: Algorithms (quicksort), Figma multiplayer tech
- `data-structure.md`: Tree structures, B-trees, B+ trees
- `design-patterns.md`: Comprehensive design patterns guide
- `software-engineering.md`: Software engineering principles, AI impact
- `whale-fall.md`: Open source ecosystem dynamics

**Subdomain Recommendation:**
**NO** - Keep flat topic structure with one exception:
```
_software/
├── software.md (domain entry)
├── algorithm.md (topic)
├── data-structure.md (topic)
├── design-patterns.md (topic)
├── software-engineering.md (topic)
└── whale-fall.md (topic)
```

**Rationale:** While there are 5 files, they fall into two conceptual groups:
1. **Core CS fundamentals**: algorithm, data-structure, design-patterns (3 files)
2. **Engineering concepts**: software-engineering, whale-fall (2 files)

However, the 3 core CS files are distinct enough that grouping them into a single subdomain would be artificial. Each represents a fundamental computer science pillar that stands alone:
- Algorithms: Computational procedures and complexity
- Data structures: Information organization and access patterns
- Design patterns: Software architecture solutions

The engineering concept files (software-engineering, whale-fall) are independent thought pieces.

**Alternative consideration:** Could create `cs-fundamentals/` subdomain for algorithm + data-structure + design-patterns, but this would create unnecessary nesting. The flat structure keeps these fundamental topics easily accessible.

---

### 4. _test Domain (2 files + 3 subdirectories with 3 files)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| test.md | 21 | Testing overview with links to subtopics |
| software-testing-engineer.md | 10 | Software testing engineer certification |
| tools/playwright.md | 12 | Playwright testing tool |
| methods/tcr.md | 93 | TCR (Test && Commit \|\| Revert) methodology |
| ai/ai-driven-testing.md | 62 | AI-driven UI testing with MCP |

**Content Analysis:**
- `test.md`: Testing domain overview, links to subtopics
- `software-testing-engineer.md`: Testing professional certification info
- `tools/playwright.md`: Playwright automation testing tool
- `methods/tcr.md`: TCR testing methodology detailed guide
- `ai/ai-driven-testing.md`: AI-driven testing with MCP integration

**Subdomain Recommendation:**
**YES** - Create subdomains for _test:
```
_test/
├── test.md (domain entry)
├── software-testing-engineer/
│   └── software-testing-engineer.md (subdomain entry, moved from root)
├── tools/
│   └── playwright.md (keep existing, formalize as subdomain entry)
├── methods/
│   └── tcr.md (keep existing, formalize as subdomain entry)
└── ai/
    └── ai-driven-testing.md (keep existing, formalize as subdomain entry)
```

**Rationale:** The test domain has a natural 4-way categorization:
1. **software-testing-engineer/**: Professional certification and career path
2. **tools/**: Testing tools and frameworks (Playwright)
3. **methods/**: Testing methodologies and practices (TCR)
4. **ai/**: AI-driven testing approaches

The existing subdirectories (`tools/`, `methods/`, `ai/`) should be formalized as subdomains. The `software-testing-engineer.md` file represents a distinct professional/career topic that deserves its own subdomain.

**Note:** The `test.md` file currently serves as a mini-index. After migration, its internal links need updating to point to new subdomain paths.

---

## Migration Pattern for Medium Domains

Based on the analysis, here is the decision framework:

### Decision Tree

```
Does the domain have files that share a clear conceptual boundary?
├── YES → Create subdomain(s)
│   └── Examples: _products (4 distinct products), _management (5 distinct concepts),
│                 _test (4 distinct categories)
│
└── NO → Keep flat topic structure
    └── Are any files >150 lines with clear internal sections?
        ├── YES → Consider future subdomain for that file's topic
        │   └── Example: design-patterns.md could split into creational/, structural/, behavioral/
        └── NO → Keep as flat topic files
            └── Example: _software (5 independent topics)
```

### Migration Patterns

#### Pattern A: Subdomain with Topics (for _products, _management, _test)
```
Before:
_products/
├── bit.md
├── budibase.md
├── dynamo.md
└── zapier.md

After:
_products/
├── products.md (domain entry)
├── bit/
│   └── bit.md (subdomain entry, moved from root)
├── budibase/
│   └── budibase.md (subdomain entry, moved from root)
├── dynamo/
│   └── dynamo.md (subdomain entry, moved from root)
└── zapier/
    └── zapier.md (subdomain entry, moved from root)
```

#### Pattern B: Flat Topics (for _software)
```
Before:
_software/
├── algorithm.md
├── data-structure.md
├── design-patterns.md
├── software-engineering.md
└── whale-fall.md

After:
_software/
├── software.md (domain entry)
├── algorithm.md (topic)
├── data-structure.md (topic)
├── design-patterns.md (topic)
├── software-engineering.md (topic)
└── whale-fall.md (topic)
```

#### Pattern C: Preserve Existing Subdirectories (for _management, _test)
```
Before:
_management/
├── capacity-driven-development.md
├── organization.md
├── shape-up.md
├── shadow-it/
│   └── ai-accelerated-shadow-it.md
└── slice/
    └── standalone-data-engineering-team.md

After:
_management/
├── management.md (domain entry)
├── capacity-driven-development/
│   └── capacity-driven-development.md (subdomain entry, moved from root)
├── organization/
│   └── organization.md (subdomain entry, moved from root)
├── shape-up/
│   └── shape-up.md (subdomain entry, moved from root)
├── shadow-it/
│   └── ai-accelerated-shadow-it.md (subdomain entry, keep existing)
└── slice/
    └── standalone-data-engineering-team.md (subdomain entry, keep existing)
```

---

## Cross-Domain Links Analysis

**Links FROM these domains:**

| Source | Target | Link Type | Action Required |
|--------|--------|-----------|-----------------|
| _management/organization.md | /maps/_management/shape-up | Internal | Update to /maps/_management/shape-up/shape-up |
| _management/organization.md | /maps/_management/slice/standalone-data-engineering-team | Internal | Update to /maps/_management/slice/standalone-data-engineering-team |
| _management/organization.md | /maps/_management/shadow-it/ai-accelerated-shadow-it | Internal | Update to /maps/_management/shadow-it/ai-accelerated-shadow-it |
| _management/organization.md | /maps/_management/capacity-driven-development | Internal | Update to /maps/_management/capacity-driven-development/capacity-driven-development |
| _test/test.md | /maps/_test/tools/playwright | Internal | Update to /maps/_test/tools/playwright |
| _test/test.md | /maps/_test/methods/tcr | Internal | Update to /maps/_test/methods/tcr |
| _test/test.md | /maps/_test/ai/ai-driven-testing | Internal | Update to /maps/_test/ai/ai-driven-testing |
| _test/test.md | /maps/_test/software-testing-engineer | Internal | Update to /maps/_test/software-testing-engineer/software-testing-engineer |
| _software/design-patterns.md | /maps/_oop/oop/oop | Cross-domain | Verify after migration |

**Links TO these domains (from 0.index.md):**

Need to verify current links in 0.index.md and update paths for:
- /maps/_products/* → Update for subdomain structure
- /maps/_management/* → Update for subdomain structure
- /maps/_software/* → No change (flat structure)
- /maps/_test/* → Update for subdomain structure

---

## Special Considerations

### 1. _products Domain Product Categories
Each product in _products represents a different category:
- **Bit**: Developer tools / Component management
- **Budibase**: Low-code/No-code platforms
- **Dynamo**: Visual programming / Design tools
- **Zapier**: Workflow automation / iPaaS

These are intentionally independent - no shared concepts between them.

### 2. _management organization.md as Mini-Index
The `organization.md` file currently serves as a navigation hub:
- Links to Shape Up
- Links to Slice (standalone data engineering team)
- Links to Shadow IT
- Links to Capacity-driven development

After migration, these links need updating to new subdomain paths. The file should be converted to a proper subdomain entry with its own content about organizational principles.

### 3. _test test.md as Mini-Index
The `test.md` file currently serves as a navigation hub:
- Links to Tools (Playwright)
- Links to Methods (TCR)
- Links to AI-driven testing
- Links to Software testing engineer

After migration, these links need updating. The file should become the domain entry with subdomain navigation.

### 4. _software design-patterns.md Future Splitting Potential
The 168-line design-patterns.md could be split further in future phases:
- `creational/` - Factory, Abstract Factory, Builder, Prototype, Singleton
- `structural/` - Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- `behavioral/` - Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer

For Phase 8, keep as single file within flat structure.

### 5. _software whale-fall.md Unique Content
The whale-fall.md file is unique - it's not about software engineering practice but about open source ecosystem dynamics. Consider:
- Could eventually move to a "software-ecosystem" or "open-source" subdomain if more related content is added
- For now, keep as standalone topic in _software domain

---

## File Inventory Summary

| Domain | Files | Lines Total | Subdomains? | Pattern |
|--------|-------|-------------|-------------|---------|
| _products | 4 | 401 | Yes (4) | A: Subdomain with Topics |
| _management | 5 | 769 | Yes (5) | C: Preserve Subdirectories |
| _software | 5 | 311 | No | B: Flat Topics |
| _test | 5 | 198 | Yes (4) | C: Preserve Subdirectories |
| **Total** | **19** | **1679** | **13 subdomains** | **Mixed** |

---

## Recommended Migration Order

1. **_software** - Simplest, flat structure, no subdomains needed
2. **_products** - 4 subdomains, all files move, straightforward
3. **_test** - 4 subdomains, existing subdirs to formalize
4. **_management** - 5 subdomains, most complex, existing subdirs to formalize

---

## Sources

### Primary (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_products/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_management/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_test/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/06-medium-batch-1/06-RESEARCH.md` - Phase 6 patterns
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/07-medium-batch-2/07-RESEARCH.md` - Phase 7 patterns

### Secondary (MEDIUM confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md` - Cross-link verification

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files examined directly
- Subdomain recommendations: HIGH - Clear content boundaries identified
- Migration patterns: HIGH - Based on validated Phase 6-7 patterns
- Cross-link inventory: MEDIUM - May have missed dynamic links

**Research date:** 2026-02-24
**Valid until:** Next phase iteration

---

## RESEARCH COMPLETE

**Phase:** 08 - Medium Batch 3
**Confidence:** HIGH

### Key Findings

1. **_products** needs 4 subdomains: `bit/`, `budibase/`, `dynamo/`, `zapier/` (4 distinct product categories)
2. **_management** needs 5 subdomains: `organization/`, `shape-up/`, `capacity-driven-development/`, plus existing `shadow-it/`, `slice/` (5 distinct management concepts)
3. **_software** should remain flat - 5 independent topics with no clear grouping (algorithm, data-structure, design-patterns, software-engineering, whale-fall)
4. **_test** needs 4 subdomains: `software-testing-engineer/`, plus existing `tools/`, `methods/`, `ai/` (4 distinct testing categories)
5. **19 total files** to migrate, **13 subdomains** to create/formalize
6. **Cross-domain links** need verification, especially internal domain links in organization.md and test.md mini-indexes

### File Created
`.planning/phases/08-medium-batch-3/08-RESEARCH.md`

### Open Questions

1. Should _software have the 3 CS fundamentals grouped? (Recommendation: keep flat for accessibility)
2. Should _management's organization.md content be expanded beyond its current mini-index role? (Recommendation: add more organizational content during migration)
3. Should _test's software-testing-engineer.md be merged into a larger career/ certification subdomain? (Recommendation: keep separate, expand with more certification content in future)
4. Are there any dynamic links from other content files not captured in organization.md and test.md?

### Ready for Planning

Research complete. Planner can now create PLAN.md with specific migration tasks for each domain.
