# Phase 10: Medium Batch 5 - Research

**Researched:** 2026-02-24
**Domain:** Content Architecture Migration (4-layer cognitive hierarchy)
**Confidence:** HIGH

## Summary

Phase 10 migrates the final 3 medium complexity domains (_ui, _programming, _web) from flat file structure to the 4-layer cognitive hierarchy (Domain → Subdomain → Topic → Knowledge Point). This batch contains 25 files total, marking the completion of all medium domains before entering complex domains (12+ files).

- **_ui**: 7 files with existing subdirectory (gen/)
- **_programming**: 8 files with existing subdirectory (dx/)
- **_web**: 10 files with 2 existing subdirectories (browser/, browser-api/)

After analyzing all file contents, the recommendation is to use a **hybrid approach** based on content boundaries: create subdomains where files represent distinct conceptual areas, preserve existing subdirectories as formalized subdomains, and consolidate closely related topics under shared subdomains.

**Primary recommendation:** Apply the validated decision criteria from previous phases: 1-2 topics = flat file structure, 3+ topics with clear conceptual boundaries = directory-based subdomains. The _web domain (10 files) requires special attention as the bridge to complex domains - its structure will inform complex domain migration patterns.

---

## Domain Analysis

### 1. _ui Domain (6 files + 1 subdirectory with 1 file)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| ui.md | 52 | Domain overview, design philosophy, design specs, styles, accessibility, resources |
| design-philosophy.md | 74 | UI design philosophy from Winamp to modern AI interfaces |
| accessibility.md | 115 | Web accessibility guidelines, ARIA, contrast, alt text |
| awwwards.md | 164 | Awwwards platform - awards, categories, tags, technology listings |
| font.md | 38 | Typography fundamentals, line-height, variable fonts |
| glassmorphism.md | 59 | Glassmorphism design style, CSS implementation |
| gen/genai-for-ui-prototyping.md | 40 | GenAI for UI prototyping, self-service design tools |

**Content Analysis:**
- `ui.md`: Domain overview with navigation to all UI topics
- `design-philosophy.md`: Design philosophy and paradigm shifts
- `accessibility.md`: Accessibility standards and implementation (a11y)
- `awwwards.md`: Design inspiration platform catalog
- `font.md`: Typography and font technologies
- `glassmorphism.md`: Specific design style/trend
- `gen/genai-for-ui-prototyping.md`: AI-assisted UI design

**Subdomain Recommendation:**
**YES** - Create subdomains for _ui:
```
_ui/
├── ui.md (domain entry)
├── design/
│   ├── design.md (subdomain entry, NEW)
│   ├── design-philosophy.md (moved from root)
│   └── glassmorphism.md (moved from root - specific style)
├── accessibility/
│   └── accessibility.md (subdomain entry, moved from root)
├── typography/
│   └── font.md (subdomain entry, moved from root, renamed)
├── inspiration/
│   └── awwwards.md (subdomain entry, moved from root)
└── ai-assisted/
    ├── ai-assisted.md (subdomain entry, NEW)
    └── genai-for-ui-prototyping.md (moved from gen/)
```

**Rationale:** The 5 topics represent distinct UI/UX disciplines:
1. **design/**: Design philosophy and visual styles (design-philosophy + glassmorphism)
2. **accessibility/**: Accessibility standards and practices (a11y)
3. **typography/**: Fonts and text styling (font.md)
4. **inspiration/**: Design resources and inspiration (awwwards)
5. **ai-assisted/**: AI-assisted design workflows (genai-for-ui-prototyping)

The `gen/` subdirectory should be renamed to `ai-assisted/` for clarity and consistency with other AI-related content patterns. The `glassmorphism.md` is a specific design style that fits under the broader design subdomain.

---

### 2. _programming Domain (6 files + 1 subdirectory with 2 files)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| functional.md | 303 | Functional programming concepts, currying, recursion, functors |
| dx.md | 39 | Developer Experience overview, links to GenAI topics |
| debug.md | 19 | Systematic bug fixing methodology (Dan Abramov) |
| rezi.md | 18 | Rezi TypeScript TUI framework |
| programming-language.md | 8 | Programming language links (Lean, Prolog, Moonbit) |
| tech-bias.md | 10 | Collection of technology bias articles |
| dx/genai-for-forward-engineering.md | 60 | GenAI for forward engineering, legacy modernization |
| dx/genai-for-legacy-codebases.md | 173 | GenAI for understanding legacy codebases |

**Content Analysis:**
- `functional.md`: Comprehensive functional programming guide (largest file)
- `dx.md`: Developer Experience overview with links to GenAI topics
- `debug.md`: Bug fixing methodology
- `rezi.md**: TUI framework documentation
- `programming-language.md**: Minimal language references
- `tech-bias.md**: Technology opinion collection
- `dx/genai-for-forward-engineering.md**: AI-assisted legacy modernization
- `dx/genai-for-legacy-codebases.md**: AI-assisted code understanding

**Subdomain Recommendation:**
**YES** - Create subdomains for _programming:
```
_programming/
├── programming.md (domain entry)
├── paradigms/
│   ├── paradigms.md (subdomain entry, NEW)
│   └── functional.md (moved from root)
├── developer-experience/
│   ├── developer-experience.md (subdomain entry, moved from dx.md)
│   ├── genai-for-forward-engineering.md (moved from dx/)
│   └── genai-for-legacy-codebases.md (moved from dx/)
├── debugging/
│   └── debug.md (subdomain entry, moved from root)
├── frameworks/
│   └── rezi.md (subdomain entry, moved from root)
└── languages/
    ├── languages.md (subdomain entry, NEW)
    └── programming-language.md (moved from root)
```

**Note:** `tech-bias.md` is a minimal collection of links (10 lines). Consider:
- **Option A**: Keep as standalone subdomain (overkill for 10 lines)
- **Option B**: Merge into `programming.md` domain entry as a section
- **Option C**: Create `opinions/` or `perspectives/` subdomain
- **Recommendation**: Option B - merge into domain entry, or create a lightweight `perspectives/` subdomain if content may grow

**Rationale:** The content groups into 5 conceptual areas:
1. **paradigms/**: Programming paradigms (functional programming focus)
2. **developer-experience/**: DX with AI-assisted development topics
3. **debugging/**: Debugging methodologies
4. **frameworks/**: Specific frameworks and tools (Rezi TUI)
5. **languages/**: Programming language references

The `dx/` subdirectory should be renamed to `developer-experience/` for clarity and to serve as the subdomain entry point.

---

### 3. _web Domain (4 files + 2 subdirectories with 6 files)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| performance.md | 311 | Comprehensive web performance optimization guide |
| miniapp.md | 96 | WeChat mini-program development guide |
| oauth.md | 67 | OAuth protocol design and security |
| security.md | 45 | Web security mind map (XSS, CSRF, etc.) |
| crawler.md | 47 | Web crawler and anti-crawler techniques |
| browser/index.md | 87 | Browser overview, links to engine, principle, router, new features |
| browser/browser-engine.md | 32 | Ladybird and independent browser engines |
| browser/new.md | 30 | Web.dev monthly new features tracking |
| browser/router.md | 45 | Frontend routing techniques (Hash, History) |
| browser/principle.md | 143 | Browser internals, rendering, network, parsing |
| browser-api/crypto.md | 106 | Web Crypto API guide (TODO-heavy) |

**Content Analysis:**
- `performance.md`: Comprehensive performance optimization (largest file in batch)
- `miniapp.md`: Mini-program development (cross-platform topic)
- `oauth.md`: OAuth authorization protocol
- `security.md`: Security overview with links to crypto and oauth
- `crawler.md`: Web scraping techniques
- `browser/index.md`: Browser domain navigation
- `browser/browser-engine.md`: Browser engine technologies
- `browser/new.md`: Browser new features tracking
- `browser/router.md`: Client-side routing
- `browser/principle.md`: Browser internals and rendering
- `browser-api/crypto.md`: Web Crypto API

**Subdomain Recommendation:**
**YES** - Create subdomains for _web:
```
_web/
├── web.md (domain entry)
├── browser/
│   ├── browser.md (subdomain entry, moved from browser/index.md)
│   ├── browser-engine.md (keep existing)
│   ├── principle.md (keep existing)
│   ├── router.md (keep existing)
│   └── new.md (keep existing)
├── performance/
│   └── performance.md (subdomain entry, moved from root)
├── security/
│   ├── security.md (subdomain entry, moved from root)
│   ├── oauth.md (moved from root)
│   └── web-crypto.md (moved from browser-api/crypto.md, renamed)
├── crawler/
│   └── crawler.md (subdomain entry, moved from root)
└── miniapp/
    └── miniapp.md (subdomain entry, moved from root)
```

**Rationale:** The 5 topics represent distinct web technology areas:
1. **browser/**: Browser technologies (existing structure, formalize as subdomain)
2. **performance/**: Web performance optimization
3. **security/**: Web security (consolidate security.md, oauth.md, crypto.md)
4. **crawler/**: Web scraping and automation
5. **miniapp/**: Mini-program development

**Special consideration for browser/:** The existing `browser/` subdirectory already follows the subdomain pattern. The `index.md` should be renamed to `browser.md` to match the convention. The `browser-api/` subdirectory content (crypto.md) should be consolidated into the `security/` subdomain since Web Crypto is a security-focused API.

---

## Migration Pattern for Phase 10 Domains

### Decision Tree

```
Does the domain have files that share a clear conceptual boundary?
├── YES → Create subdomain(s)
│   └── Examples: _ui (5 distinct UI disciplines),
│                 _programming (5 programming areas),
│                 _web (5 web technology areas)
│
└── NO → Keep flat topic structure
    └── Are any files >150 lines with clear internal sections?
        ├── YES → Consider future subdomain for that file's topic
        │   └── Example: performance.md could split by optimization category
        └── NO → Keep as flat topic files
```

### Migration Patterns

#### Pattern A: Create New Subdomains (for _ui, _programming)
```
Before:
_ui/
├── ui.md
├── design-philosophy.md
├── accessibility.md
├── awwwards.md
├── font.md
├── glassmorphism.md
└── gen/
    └── genai-for-ui-prototyping.md

After:
_ui/
├── ui.md (domain entry)
├── design/
│   ├── design.md (subdomain entry)
│   ├── design-philosophy.md
│   └── glassmorphism.md
├── accessibility/
│   └── accessibility.md
├── typography/
│   └── font.md
├── inspiration/
│   └── awwwards.md
└── ai-assisted/
    ├── ai-assisted.md
    └── genai-for-ui-prototyping.md
```

#### Pattern B: Preserve and Extend Existing Subdirectories (for _web)
```
Before:
_web/
├── performance.md
├── miniapp.md
├── oauth.md
├── security.md
├── crawler.md
├── browser/
│   ├── index.md
│   ├── browser-engine.md
│   ├── new.md
│   ├── router.md
│   └── principle.md
└── browser-api/
    └── crypto.md

After:
_web/
├── web.md (domain entry)
├── browser/
│   ├── browser.md (renamed from index.md)
│   ├── browser-engine.md
│   ├── principle.md
│   ├── router.md
│   └── new.md
├── performance/
│   └── performance.md
├── security/
│   ├── security.md
│   ├── oauth.md
│   └── web-crypto.md (moved from browser-api/)
├── crawler/
│   └── crawler.md
└── miniapp/
    └── miniapp.md
```

---

## Cross-Domain Links Analysis

**Links FROM these domains:**

| Source | Target | Link Type | Action Required |
|--------|--------|-----------|-----------------|
| _ui/ui.md | /maps/_ui/design-philosophy | Internal | Update to /maps/_ui/design/design-philosophy |
| _ui/ui.md | /maps/_ui/glassmorphism | Internal | Update to /maps/_ui/design/glassmorphism |
| _ui/ui.md | /maps/_ui/accessibility | Internal | Update to /maps/_ui/accessibility/accessibility |
| _ui/ui.md | /maps/_ui/awwwards | Internal | Update to /maps/_ui/inspiration/awwwards |
| _ui/ui.md | /maps/_ui/gen/genai-for-ui-prototyping | Internal | Update to /maps/_ui/ai-assisted/genai-for-ui-prototyping |
| _programming/dx.md | /maps/_programming/dx/genai-for-legacy-codebases | Internal | Keep (path unchanged, rename dir) |
| _programming/dx.md | /maps/_programming/dx/genai-for-forward-engineering | Internal | Keep (path unchanged, rename dir) |
| _programming/dx.md | /maps/_ai/prompt/team-based-instructions | Cross-domain | Verify after migration |
| _programming/dx.md | /maps/_ai/vibe/agents-md | Cross-domain | Verify after migration |
| _web/security.md | /maps/_web/browser-api/crypto | Internal | Update to /maps/_web/security/web-crypto |
| _web/security.md | /maps/_web/oauth | Internal | Update to /maps/_web/security/oauth |
| _web/browser/index.md | /maps/_web/browser/browser-engine | Internal | Keep (path unchanged) |
| _web/browser/index.md | /maps/_web/browser/principle | Internal | Keep (path unchanged) |
| _web/browser/index.md | /maps/_web/browser/router | Internal | Keep (path unchanged) |
| _web/browser/index.md | /maps/_web/browser/new | Internal | Keep (path unchanged) |
| _refactor/refactoring/refactor.md | /maps/_programming/dx/genai-for-legacy-codebases | Cross-domain | Update path |
| _ai/tools/copilot.md | /maps/_programming/dx/genai-for-legacy-codebases | Cross-domain | Update path |

**Links TO these domains (from 0.index.md):**

Need to verify current links in 0.index.md and update paths for:
- /maps/_ui/* → Update for subdomain structure
- /maps/_programming/* → Update for subdomain structure
- /maps/_web/* → Update for subdomain structure

Current links in 0.index.md:
- Line 31: [DX](/maps/_programming/dx) → Update to /maps/_programming/developer-experience
- Line 35: [浏览器](/maps/_web/browser) → Keep (path unchanged)
- Line 36: [页面性能](/maps/_web/performance) → Update to /maps/_web/performance/performance
- Line 37: [爬虫](/maps/_web/crawler) → Update to /maps/_web/crawler/crawler
- Line 38: [安全](/maps/_web/security) → Update to /maps/_web/security/security
- Line 42: [小程序](/maps/_web/miniapp) → Update to /maps/_web/miniapp/miniapp
- Line 94: [函数式](/maps/_programming/functional) → Update to /maps/_programming/paradigms/functional
- Line 99: [技术偏见](/maps/_programming/tech-bias) → TBD (may merge into domain entry)
- Line 101: [Rezi](/maps/_programming/rezi) → Update to /maps/_programming/frameworks/rezi
- Line 110: [编程语言](/maps/_programming/programming-language) → Update to /maps/_programming/languages/languages
- Line 166: [界面设计（UI）](/maps/_ui/ui) → Keep (path unchanged)
- Line 167: [字体](/maps/_ui/font) → Update to /maps/_ui/typography/font

---

## Special Considerations

### 1. _ui gen/ Directory Renaming
The `gen/` subdirectory name is ambiguous. Since it contains AI-assisted UI prototyping content:
- **Rename to**: `ai-assisted/`
- **Rationale**: Clearer intent, consistent with AI content patterns

### 2. _programming dx/ Directory Renaming
The `dx/` subdirectory should be renamed for clarity:
- **Rename to**: `developer-experience/`
- **Rationale**: Full name is clearer, matches content topic

### 3. _programming tech-bias.md Placement
At only 10 lines, this minimal link collection needs careful handling:
- **Option A**: Create `perspectives/` subdomain (overkill)
- **Option B**: Merge into `programming.md` domain entry
- **Option C**: Keep as flat file at root level
- **Recommendation**: Option B - merge into domain entry as "Perspectives" section

### 4. _programming programming-language.md Content
Only 8 lines with 3 language links (Lean, Prolog, Moonbit):
- **Option A**: Expand content during migration
- **Option B**: Keep minimal as `languages/languages.md`
- **Option C**: Merge into domain entry
- **Recommendation**: Option B - keep as minimal subdomain entry, expand in future

### 5. _web browser-api/ Consolidation
The `browser-api/` subdirectory contains only `crypto.md`:
- **Move to**: `security/web-crypto.md`
- **Rationale**: Web Crypto is a security-focused API, better grouped with security content
- **Delete**: `browser-api/` directory after move

### 6. _web performance.md Size
At 311 lines, this is the largest file in Phase 10:
- Contains: metrics, measurement APIs, optimization strategies, SSR/PWA
- **For Phase 10**: Keep as single file
- **Future consideration**: Could split by category (metrics/, optimization/, ssr/)

### 7. _web oauth.md Placement
OAuth is an authorization protocol:
- **Move to**: `security/oauth.md`
- **Rationale**: OAuth is fundamentally a security/authorization topic
- Update security.md subdomain entry to include oauth link

---

## File Inventory Summary

| Domain | Files | Lines Total | Subdomains | Pattern |
|--------|-------|-------------|------------|---------|
| _ui | 7 | 542 | 5 (design, accessibility, typography, inspiration, ai-assisted) | A: Create New Subdomains |
| _programming | 8 | 630 | 5 (paradigms, developer-experience, debugging, frameworks, languages) | A: Create New Subdomains |
| _web | 10 | 1009 | 5 (browser, performance, security, crawler, miniapp) | B: Preserve and Extend |
| **Total** | **25** | **2181** | **15 subdomains** | **Mixed** |

---

## Risk Assessment

### Low Risk
- **_ui domain**: Clean content boundaries, straightforward subdomain creation
- **_programming domain**: Clear conceptual groupings, minimal file sizes

### Medium Risk
- **_web domain (10 files)**: Largest domain in batch, complex existing structure
  - Risk: browser/ subdirectory already has internal links that must be preserved
  - Mitigation: Careful path mapping, verify all internal browser/ links

### High Risk
- **Cross-domain link updates**: Multiple files reference these domains
  - _refactor/refactoring/refactor.md links to _programming
  - _ai/tools/copilot.md links to _programming
  - Mitigation: Comprehensive link audit in PLAN phase

---

## Recommended Migration Order

1. **_ui** - Cleanest structure, straightforward subdomain creation
2. **_programming** - Clear groupings, handle tech-bias.md decision
3. **_web** - Most complex, save for last to apply lessons learned

---

## Bridge to Complex Domains

The _web domain (10 files) is the largest medium domain and serves as the bridge to complex domains (12+ files). Key patterns to validate:

1. **Existing subdirectory handling**: browser/ already follows subdomain pattern
2. **Content consolidation**: security/ will group 3 related files
3. **Large file management**: performance.md (311 lines) tests single-file topic limits

These patterns will inform Phase 11+ when migrating complex domains like _frontend, _ai, _software.

---

## Sources

### Primary (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_ui/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_programming/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/09-medium-batch-4/09-RESEARCH.md` - Phase 9 patterns
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/STATE.md` - Project decisions

### Secondary (MEDIUM confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md` - Cross-link verification

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files examined directly
- Subdomain recommendations: HIGH - Clear content boundaries identified
- Migration patterns: HIGH - Based on validated Phase 9 patterns
- Cross-link inventory: MEDIUM - May have missed dynamic links

**Research date:** 2026-02-24
**Valid until:** Next phase iteration

---

## RESEARCH COMPLETE

**Phase:** 10 - Medium Batch 5
**Confidence:** HIGH

### Key Findings

1. **_ui** needs 5 subdomains: `design/`, `accessibility/`, `typography/`, `inspiration/`, `ai-assisted/` (rename gen/ to ai-assisted/)
2. **_programming** needs 5 subdomains: `paradigms/`, `developer-experience/` (rename dx/), `debugging/`, `frameworks/`, `languages/`; tech-bias.md likely merges into domain entry
3. **_web** needs 5 subdomains: `browser/` (formalize existing), `performance/`, `security/` (consolidate oauth + crypto), `crawler/`, `miniapp/`
4. **25 total files** to migrate, **15 subdomains** to create/formalize
5. **_web domain (10 files)** serves as bridge to complex domains - patterns here inform 12+ file domain migrations
6. **Cross-domain links** need verification, especially from _refactor and _ai domains

### File Created
`.planning/phases/10-medium-batch-5/10-RESEARCH.md`

### Open Questions

1. Should _programming's tech-bias.md be merged into domain entry or kept as standalone? (Recommendation: merge into domain entry)
2. Should _programming's programming-language.md be expanded or kept minimal? (Recommendation: keep minimal, expand in future)
3. Should _web's browser-api/ be fully removed after crypto.md move, or kept for future APIs? (Recommendation: remove, recreate if needed)
4. Are there any dynamic links from _frontend or other domains not captured in the analysis?

### Ready for Planning

Research complete. Planner can now create PLAN.md with specific migration tasks for each domain. This is the final medium phase - success here validates patterns for complex domain migration.
