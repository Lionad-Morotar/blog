# Phase 7: Medium Batch 2 - Research

**Researched:** 2026-02-24
**Domain:** Content Architecture Migration (4-layer cognitive hierarchy)
**Confidence:** HIGH

## Summary

Phase 7 migrates 4 medium complexity domains (_typescript, _visual, _cpp, _docs) from flat file structure to the 4-layer cognitive hierarchy (Domain → Subdomain → Topic → Knowledge Point). Each domain contains 4 files, with _visual and _docs having existing nested subdirectory structures that require special handling.

After analyzing all file contents, the recommendation is to use a **hybrid approach**: some domains need subdomain grouping (_typescript, _visual, _docs), while others can remain flat with topic files (_cpp). The _visual domain's existing GIS subdirectory and _docs's existing subdirectories should be preserved and properly integrated into the hierarchy.

**Primary recommendation:** Apply the validated decision criteria from Phase 6: 1-2 topics = flat file structure, 3+ topics = directory-based subdomains. Create subdomains when files share a clear conceptual boundary and form an "independent learning unit."

---

## Domain Analysis

### 1. _typescript Domain (2 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| typescript.md | 550 | Comprehensive TypeScript guide covering roadmap, module system, type system, advanced types, compiler, project config, and practical experience |
| type-gymnastics.md | 276 | TypeScript type gymnastics guide covering syntax keywords, literals, statement structures, basic operations, and tools |

**Content Analysis:**
- `typescript.md` is a large comprehensive file (550 lines) with multiple distinct sections:
  - Roadmap (beginner → intermediate → advanced stages)
  - Module system (resolution, global namespace, side effects)
  - Type system (interfaces, enums, generics, naked types)
  - Advanced types (freshness, Iterable, HKT, type gymnastics)
  - Compiler and project configuration
  - Practical experience and best practices
- `type-gymnastics.md` is a specialized deep-dive into TypeScript's type-level programming (276 lines)

**Subdomain Recommendation:**
**YES** - Create subdomains for _typescript:
```
_typescript/
├── typescript.md (domain entry)
├── basics/ (or fundamentals/)
│   └── basics.md (core language features from typescript.md)
└── type-gymnastics/
    └── type-gymnastics.md (moved from root, subdomain entry)
```

**Rationale:** The type-gymnastics.md file represents a distinct advanced topic that could be considered an "independent learning unit." The main typescript.md is large with clear internal sections that could benefit from future splitting into basics/, advanced/, and tooling/ subdomains. For Phase 7, creating at least the type-gymnastics/ subdomain provides room for growth.

---

### 2. _visual Domain (3 files + 1 subdirectory)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| info-design.md | 86 | Information design concepts, data visualization, ISUX big data visualization series |
| visualization.md | 82 | Visualization techniques, blur effects, visual illusions, GIS reference |
| gis/gis.md | 12 | Geographic Information System basics, tour links |

**Content Analysis:**
- `info-design.md`: Information design theory, data visualization principles, chart types
- `visualization.md`: Technical visualization (blur algorithms), visual perception/illusions
- `gis/gis.md`: Geographic Information System - distinct subdomain with minimal content currently

**Subdomain Recommendation:**
**YES** - Create subdomains for _visual:
```
_visual/
├── visual.md (domain entry)
├── info-design/
│   └── info-design.md (moved from root)
├── visualization/
│   └── visualization.md (moved from root)
└── gis/
    └── gis.md (keep existing)
```

**Rationale:** The three main topics (info-design, visualization, GIS) are conceptually distinct:
- Info-design: Design theory and data presentation principles
- Visualization: Technical implementation and visual perception
- GIS: Geographic/spatial data specialization

Each represents an independent learning unit. The existing gis/ subdirectory should be formalized as a subdomain.

---

### 3. _cpp Domain (4 files)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| cpp.md | 79 | C++ overview, FAQ, PInvoke, cross-language interop |
| google-cpp-standard.md | 116 | Google C++ style guide summary (headers, scope, classes, functions, naming, formatting) |
| king-db.md | 217 | KingDB key-value store implementation series (IKVS parts 1-10) |
| makefile.md | 59 | Makefile build tool tutorial |

**Content Analysis:**
- `cpp.md`: General C++ overview, FAQ, PInvoke for C# interop
- `google-cpp-standard.md`: Coding standards and style guide
- `king-db.md`: Database implementation project (substantial technical content)
- `makefile.md`: Build tool basics

**Subdomain Recommendation:**
**NO** - Keep flat topic structure:
```
_cpp/
├── cpp.md (domain entry)
├── google-cpp-standard.md (topic file)
├── king-db.md (topic file)
└── makefile.md (topic file)
```

**Rationale:** The four files cover distinctly different aspects of C++ ecosystem but don't form clear conceptual groupings:
- Language basics + interop (cpp.md)
- Coding standards (google-cpp-standard.md)
- Project implementation (king-db.md)
- Build tooling (makefile.md)

Creating artificial subdomains would force arbitrary boundaries. Each file is an independent topic. The king-db.md is substantial but stands alone as a project case study.

---

### 4. _docs Domain (2 subdirectories with 4 files total)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| doc-manage/doc-manage.md | 9 | Document management stub with SDD reference |
| doc-manage/sdd.md | 15 | Spec-driven development overview |
| tech-docs/tech-docs.md | 8 | Technical docs stub with knowledge-flow reference |
| tech-docs/knowledge-flow.md | 45 | Knowledge flow vs knowledge stocks concept |

**Content Analysis:**
- `doc-manage/`: Document management subdomain with SDD (Spec-Driven Development)
- `tech-docs/`: Technical documentation subdomain with knowledge flow concepts

**Subdomain Recommendation:**
**YES** - Preserve and formalize existing structure:
```
_docs/
├── docs.md (domain entry)
├── doc-manage/
│   ├── doc-manage.md (subdomain entry)
│   └── sdd.md (topic file)
└── tech-docs/
    ├── tech-docs.md (subdomain entry)
    └── knowledge-flow.md (topic file)
```

**Rationale:** The existing subdirectory structure is already aligned with the 4-layer hierarchy. Both subdirectories represent distinct aspects of documentation:
- doc-manage/: Documentation management practices and methodologies (SDD)
- tech-docs/: Technical writing and knowledge management concepts

Each should become a formal subdomain with its own entry file.

---

## Migration Pattern for Medium Domains

Based on the analysis, here is the decision framework validated from Phase 6:

### Decision Tree

```
Does the domain have files that share a clear conceptual boundary?
├── YES → Create subdomain(s)
│   └── Examples: _typescript (type-gymnastics), _visual (3 distinct topics), _docs (2 subdirs)
│
└── NO → Keep flat topic structure
    └── Are any files >150 lines with clear internal sections?
        ├── YES → Consider future subdomain for that file's topic
        │   └── Example: typescript.md could split into basics/, advanced/
        └── NO → Keep as flat topic files
            └── Example: _cpp (4 independent topics)
```

### Migration Patterns

#### Pattern A: Subdomain with Topics (for _typescript, _visual, _docs)
```
Before:
_typescript/
├── typescript.md
└── type-gymnastics.md

After:
_typescript/
├── typescript.md (domain entry)
└── type-gymnastics/
    ├── type-gymnastics.md (subdomain entry, moved from root)
    └── (future topics can be added here)
```

#### Pattern B: Flat Topics (for _cpp)
```
Before:
_cpp/
├── cpp.md
├── google-cpp-standard.md
├── king-db.md
└── makefile.md

After:
_cpp/
├── cpp.md (domain entry)
├── google-cpp-standard.md (topic)
├── king-db.md (topic)
└── makefile.md (topic)
```

#### Pattern C: Preserve Existing Subdirectories (for _visual, _docs)
```
Before:
_visual/
├── info-design.md
├── visualization.md
└── gis/
    └── gis.md

After:
_visual/
├── visual.md (domain entry)
├── info-design/
│   └── info-design.md (subdomain entry, moved from root)
├── visualization/
│   └── visualization.md (subdomain entry, moved from root)
└── gis/
    └── gis.md (subdomain entry, keep existing)
```

---

## Cross-Domain Links Analysis

**Links FROM these domains:**

| Source | Target | Link Type | Action Required |
|--------|--------|-----------|-----------------|
| _typescript/typescript.md | /maps/_typescript/type-gymnastics | Internal | Update path after migration |
| _visual/visualization.md | /maps/_visual/gis/gis | Internal | Verify after migration |
| _cpp/cpp.md | /maps/_cpp/google-cpp-standard | Internal | Verify after migration |
| _cpp/cpp.md | /maps/_cpp/king-db | Internal | Verify after migration |
| _cpp/cpp.md | /maps/_cpp/makefile | Internal | Verify after migration |
| _cpp/king-db.md | /maps/_computer/encoding/hash-collision | Cross-domain | Verify after migration |
| _docs/tech-docs/tech-docs.md | /maps/_docs/tech-docs/knowledge-flow | Internal | Update path |
| _docs/doc-manage/doc-manage.md | /maps/_docs/doc-manage/sdd | Internal | Update path |

**Links TO these domains (from 0.index.md):**

Need to verify current links in 0.index.md and update paths for:
- /maps/_typescript/* → Update for subdomain structure
- /maps/_visual/* → Update for subdomain structure
- /maps/_cpp/* → No change (flat structure)
- /maps/_docs/* → Update for subdomain structure

---

## Special Considerations

### 1. _typescript Future Splitting Potential
The 550-line typescript.md could be split further in future phases:
- `basics/` - Roadmap beginner/intermediate content
- `advanced/` - Type system, advanced types, type gymnastics intro
- `tooling/` - Compiler, project configuration, tsconfig
- `patterns/` - Best practices, experience section

For Phase 7, keep as single file within flat structure, with type-gymnastics/ as the only subdomain.

### 2. _visual GIS Subdomain Growth Potential
The GIS subdomain currently has minimal content (12 lines). Potential for future expansion:
- GIS software/tools (QGIS, ArcGIS)
- Spatial data formats
- Coordinate systems
- Mapping libraries (Leaflet, Mapbox)

### 3. _docs Subdomain Consolidation
Both doc-manage/ and tech-docs/ have minimal content currently. Monitor for:
- Whether they should remain separate subdomains
- Potential merging if content stays minimal
- Expansion opportunities for each

### 4. _cpp king-db.md Content Note
This file contains substantial content (217 lines) about implementing a key-value store in C++. It includes:
- IKVS series summary (parts 1-10)
- Architecture analysis
- Hash table implementations
- LSM-tree concepts
- Performance optimization

Keep as single topic file but consider future splitting if expanded.

---

## File Inventory Summary

| Domain | Files | Lines Total | Subdomains? | Pattern |
|--------|-------|-------------|-------------|---------|
| _typescript | 2 | 826 | Yes (1) | A: Subdomain with Topics |
| _visual | 3 + 1 subdir | 180 | Yes (3) | C: Preserve Subdirectories |
| _cpp | 4 | 471 | No | B: Flat Topics |
| _docs | 2 subdirs (4 files) | 77 | Yes (2) | C: Preserve Subdirectories |
| **Total** | **10** | **1554** | **6 subdomains** | **Mixed** |

---

## Recommended Migration Order

1. **_cpp** - Simplest, flat structure, no subdomains needed
2. **_typescript** - Single subdomain creation (type-gymnastics/)
3. **_visual** - Multiple subdomains, existing gis/ to formalize
4. **_docs** - Formalize existing subdirectory structure

---

## Sources

### Primary (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_typescript/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_visual/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_cpp/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_docs/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/06-medium-batch-1/06-RESEARCH.md` - Phase 6 patterns

### Secondary (MEDIUM confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md` - Cross-link verification

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files examined directly
- Subdomain recommendations: HIGH - Clear content boundaries identified
- Migration patterns: HIGH - Based on validated Phase 6 patterns
- Cross-link inventory: MEDIUM - May have missed dynamic links

**Research date:** 2026-02-24
**Valid until:** Next phase iteration

---

## RESEARCH COMPLETE

**Phase:** 07 - Medium Batch 2
**Confidence:** HIGH

### Key Findings

1. **_typescript** needs 1 subdomain: `type-gymnastics/` (distinct advanced topic)
2. **_visual** needs 3 subdomains: `info-design/`, `visualization/`, `gis/` (3 distinct topics)
3. **_cpp** should remain flat - 4 independent topics with no clear grouping
4. **_docs** has 2 existing subdirectories to formalize: `doc-manage/`, `tech-docs/`
5. **10 total files** to migrate, **6 subdomains** to create/formalize
6. **Cross-domain links** need verification, especially internal domain links

### File Created
`.planning/phases/07-medium-batch-2/07-RESEARCH.md`

### Open Questions

1. Should _typescript have additional subdomains beyond type-gymnastics/? (Recommendation: keep minimal for Phase 7)
2. Should _visual's gis/ remain minimal or should content be expanded? (Recommendation: keep as-is, expand in future)
3. Should _docs subdomains be merged if content stays minimal? (Recommendation: keep separate, monitor growth)
4. Are there any dynamic links from other content files not captured?

### Ready for Planning

Research complete. Planner can now create PLAN.md with specific migration tasks for each domain.
