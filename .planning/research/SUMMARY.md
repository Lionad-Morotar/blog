# Project Research Summary

**Project:** Knowledge Base Refactoring - Hierarchical Cognitive Structure
**Domain:** Knowledge Management & Documentation Systems
**Researched:** 2026-02-24
**Confidence:** HIGH

---

## Executive Summary

This research addresses the reorganization of a 324-file markdown knowledge base into a unified 4-layer cognitive hierarchy: Domain (领域) → Subdomain (子领域) → Topic (主题) → Knowledge Point (知识点). The current structure spans 485 files across 211 directories with inconsistent organization patterns that hinder navigation and content discovery.

The recommended approach leverages Nuxt Content v3's native capabilities—specifically the Collections feature, `queryCollectionNavigation()`, and directory-based routing—to create an automatically generated navigation tree that mirrors the cognitive hierarchy. This eliminates the need for manual navigation maintenance while providing type-safe content schemas through Zod validation. The architecture supports both file-based and directory-based subdomains depending on content volume, with clear boundaries at each of the four layers.

Key risks center on URL breakage during migration (affecting SEO and bookmarks), orphaned internal links (59+ occurrences across 16 files), and inconsistent application of the 4-layer structure. Mitigation requires implementing redirects before file moves, auditing all internal links, and establishing clear taxonomy criteria before execution. The project should proceed in phases from simple domains (1-2 files) to complex domains (70 files in AI) to validate patterns before tackling the most challenging reorganizations.

---

## Key Findings

### Recommended Stack

Nuxt Content v3 provides native support for hierarchical content organization through its Collections feature and automatic navigation generation. The current project uses v2.13.4; upgrading to v3 is recommended for better TypeScript support and improved navigation utilities.

**Core technologies:**
- **Nuxt Content ^3.x**: Content management with native hierarchical navigation via `queryCollectionNavigation`, type-safe collections with Zod schemas
- **Nuxt 3 ^3.21.0**: Framework with server-side rendering and file-based routing that mirrors content hierarchy
- **Zod (via @nuxt/content)**: Schema validation with runtime validation and TypeScript inference
- **TypeScript ^5.x**: Full type safety across content queries and collection schemas

**Key patterns:**
- Directory-based hierarchy with underscore prefixes (`_frontend`, `_ai`) for domain folders
- Numeric prefixes for ordering (e.g., `1.frontend/`, `2.backend/`) with automatic URL stripping
- `content.config.ts` for collection definitions with domain-specific schemas
- `.navigation.yml` files for directory metadata (custom titles, icons, badges)

See [STACK.md](./STACK.md) for detailed migration strategy and anti-patterns.

---

### Expected Features

The knowledge base requires table stakes features for functional navigation, differentiators for usability, and deliberate exclusion of over-engineered capabilities.

**Must have (table stakes):**
- **4-layer hierarchy** — Domain → Subdomain → Topic → Knowledge Point (H4) — navigation fails without clear structure
- **Domain entry files** — Every domain has `index.md` with subdomain navigation for orientation
- **Consistent naming** — Kebab-case directories, no spaces, predictable patterns
- **Cross-domain linking** — Internal links using relative paths for knowledge connections
- **Browsable navigation** — Parent→child relationships visible at every level without search dependency
- **Single source of truth** — Each knowledge point exists in exactly one location

**Should have (differentiators):**
- **Progressive disclosure** — Higher levels show summaries, details at lower levels
- **Breadcrumb navigation** — Visual path showing current location in hierarchy
- **Related content linking** — "See also" connections between related topics
- **Status indicators** — Frontmatter metadata for draft/complete/outdated states
- **Atomic knowledge points** — H4 headers represent discrete concepts (Zettelkasten-style)
- **Archive mechanism** — Stale content moved to `_archives/` (PARA method)

**Defer (v2+):**
- **Tag-based navigation** — Cross-cutting tag index (supplementary to hierarchy)
- **Visual hierarchy cues** — Icons or formatting distinctions
- **Automated link checking** — Periodic validation of internal links

See [FEATURES.md](./FEATURES.md) for dependency graph and prioritization matrix.

---

### Architecture Approach

The 4-layer cognitive structure organizes knowledge hierarchically with clear boundaries:

**Layer 1: Domain** — Broad knowledge areas (e.g., Frontend, AI, Science)
- Scope: Contains 3-10 subdomains max
- Representation: Directory under `content/6.maps/` with `_` prefix
- Entry: `0.index.md` providing subdomain navigation

**Layer 2: Subdomain** — Specialized areas within domain
- Scope: Can be file OR directory based on content volume
- Decision matrix: 1-2 topics = file; 3+ topics = directory with `0.index.md`
- Examples: `javascript.md` (file), `css/` (directory)

**Layer 3: Topic** — Specific subjects within subdomain
- Scope: Single conceptual unit
- Representation: Markdown file OR subdirectory for complex topics
- Content: Comprehensive coverage organized with 4th-level headings

**Layer 4: Knowledge Point** — Granular insights
- Scope: Atomic piece of knowledge
- Representation: 4th-level markdown heading (`####`) — never separate files
- Content: Core concepts, implementations, pitfalls, examples

**Major components:**
1. **Content Collections** — Define schemas and source patterns in `content.config.ts`
2. **Navigation System** — `queryCollectionNavigation()` generates trees from directory structure
3. **URL Routing** — File paths map directly to URLs (`_frontend/css/bem.md` → `/maps/frontend/css/bem`)
4. **Index Files** — Entry points at each level providing orientation and child enumeration

See [ARCHITECTURE.md](./ARCHITECTURE.md) for build order recommendations and anti-patterns.

---

### Critical Pitfalls

Eight major pitfalls threaten migration success, with highest impact from URL breakage and orphaned links.

1. **URL Breakage from File Moves** — Nuxt Content maps file paths directly to URLs; moving files breaks external bookmarks and SEO. Mitigation: Implement `routeRules` redirects in `nuxt.config.ts` before moving files; maintain URL mapping file.

2. **Orphaned Internal Links** — 59+ internal `.md` links across 16 files use relative paths that break when targets move. Mitigation: Audit all links with grep pattern `\[.*\]\(.*\.md.*\)`; prefer absolute paths `/maps/...`; implement link checker in CI/CD.

3. **Inconsistent 4-Layer Structure** — Subjective judgment calls on classification create confusing navigation. Mitigation: Define clear criteria before execution; limit each level to 10 items maximum; accept cross-references rather than forcing single classification.

4. **Lost Context During Migration** — Files in `_achieved/2020-03/` carry temporal context; directory prefixes like `_` convey status. Mitigation: Preserve metadata in frontmatter (`original_path`, `archived_date`); add contextual headers explaining origin.

5. **Over-Fragmentation** — Splitting every H4 into separate files creates navigation friction. Mitigation: Keep cohesive topics in single files; split only when content exceeds ~2000 words.

6. **Navigation Index Drift** — `6.maps/0.index.md` contains 100+ hardcoded links that become stale. Mitigation: Generate index programmatically from file structure; audit all index links after each batch.

7. **Broken Feed and SEO Metadata** — Feedme configuration uses `_path` regex patterns that break after reorganization. Mitigation: Update feedme config after path changes; regenerate sitemap; test RSS feeds before deployment.

See [PITFALLS.md](./PITFALLS.md) for phase-specific warnings and recovery strategies.

---

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Planning
**Rationale:** URL redirects must be planned before any file moves; taxonomy criteria must be established to avoid inconsistent structure application.
**Delivers:**
- `content.config.ts` with unified `knowledge` collection
- URL redirect rules in `nuxt.config.ts` for all planned moves
- Taxonomy decision tree document
- Audit of all 59+ internal links
**Addresses:** Hierarchical structure, consistent naming, cross-domain linking (table stakes)
**Avoids:** URL Breakage, Inconsistent Structure, Orphaned Links (pitfalls 1, 2, 3)

### Phase 2: Simple Domain Migration
**Rationale:** Establish patterns with quick wins (1-2 file domains) before tackling complexity; build confidence and validate tooling.
**Delivers:**
- Migrated simple domains: `_go`, `_markdown`, `_regex`, `_hardware`, `_policy`
- Validated redirect mechanism
- Updated index navigation for migrated domains
**Uses:** Nuxt Content v3 collections, `queryCollectionNavigation()`, directory-based hierarchy
**Implements:** File-based subdomain pattern, `0.index.md` entry files
**Avoids:** Lost Context (pitfall 4) through frontmatter preservation

### Phase 3: Medium Domain Migration
**Rationale:** Apply validated patterns to moderate complexity (3-8 files); test directory-based subdomain pattern.
**Delivers:**
- Migrated medium domains: `_biology`, `_business`, `_software`, `_test`, `_database`
- Both file-based and directory-based subdomain patterns implemented
- Cross-domain link updates
**Implements:** Directory-based subdomain pattern with `0.index.md` entries
**Avoids:** Over-Fragmentation, Under-Fragmentation (pitfalls 5, 6) through word count guidelines

### Phase 4: Complex Domain Migration
**Rationale:** Tackle after patterns are validated; requires most planning due to deep nesting and high file counts.
**Delivers:**
- Migrated complex domains: `_person` (19 files), `_frontend` (29 files), `_ai` (70 files)
- Hybrid topic-subdomain pattern for evolving content
- Complete navigation tree implementation
**Implements:** Hybrid patterns, knowledge point organization via H4 headings
**Avoids:** All critical pitfalls through established mitigation patterns

### Phase 5: Validation & Integration
**Rationale:** Cross-cutting concerns must be addressed after structure stabilizes; feeds and SEO depend on final paths.
**Delivers:**
- Updated `6.maps/0.index.md` with programmatic or verified navigation
- Regenerated sitemap and RSS feeds
- Link checker validation (0 broken internal links)
- Search engine re-indexing submission
**Addresses:** Breadcrumb navigation, related content linking, status indicators (differentiators)
**Avoids:** Navigation Index Drift, Feed/SEO Breakage (pitfalls 7, 8)

---

### Phase Ordering Rationale

- **Foundation before migration:** URL redirects and taxonomy must be established before moving files to prevent SEO loss and structural inconsistency
- **Simple to complex:** Starting with 1-2 file domains validates patterns without high risk; complex domains (especially AI with 70 files) require proven approaches
- **Structure before polish:** Navigation, feeds, and SEO updates depend on stable final paths; attempting these mid-migration creates duplicate work
- **Batch validation:** Each phase includes verification steps to catch issues early rather than discovering them after full migration

---

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Complex Domains):** The `_ai` domain has 70 files with existing deep nesting; may need subdomain-level splitting decisions that require content analysis
- **Phase 5 (Validation):** RSS feed regeneration and search engine notification may need specific provider research (Google Search Console, Bing Webmaster Tools)

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Nuxt Content v3 collections and redirect patterns are well-documented
- **Phase 2-3 (Simple/Medium Domains):** Directory-based hierarchy is standard pattern used by Nuxt documentation itself

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Nuxt Content v3 official documentation; patterns verified in production by Nuxt docs |
| Features | HIGH | Established IA patterns from PARA, Zettelkasten, documentation best practices |
| Architecture | HIGH | Direct codebase analysis of 485 files; existing `_frontend/css/` structure validates pattern |
| Pitfalls | HIGH | Project structure analysis + domain expertise; 59 internal links quantified |

**Overall confidence:** HIGH

All four research areas draw from high-quality sources: official Nuxt Content v3 documentation, established knowledge management methodologies (PARA, Zettelkasten), direct analysis of the existing codebase, and quantified internal link dependencies. The recommended approach is not experimental; it applies proven patterns to a specific reorganization challenge.

---

### Gaps to Address

- **Content volume thresholds:** The decision between file-based and directory-based subdomains uses "3 topics" as threshold, but this may need adjustment based on actual content density; validate during Phase 2
- **Cross-domain classification:** Some content spans multiple domains (e.g., TypeScript appears in both frontend and tooling contexts); taxonomy decision tree needs edge case handling
- **Archive criteria:** Specific rules for when content moves to `_archives/` not fully defined; establish during Phase 1 planning

---

## Sources

### Primary (HIGH confidence)
- [Nuxt Content v3 Collections Documentation](https://github.com/nuxt/content/blob/master/docs/content/docs/2.collections/1.define.md) — Collection definition patterns
- [Nuxt Content v3 Navigation Utilities](https://github.com/nuxt/content/blob/master/docs/content/docs/4.utils/2.query-collection-navigation.md) — `queryCollectionNavigation()` behavior
- Direct codebase analysis: `/Users/lionad/Github/Lionad-Morotar/blog/content/` (485 files, 211 directories)
- Internal link audit: 59 occurrences across 16 files

### Secondary (MEDIUM confidence)
- [PARA Method - Tiago Forte](https://fortelabs.com/blog/para/) — Archive organization principles
- [Zettelkasten Method](https://zettelkasten.de/introduction/) — Atomic knowledge point organization
- [MkDocs Documentation](https://www.mkdocs.org/) — Documentation site navigation patterns

### Tertiary (LOW confidence)
- Content volume thresholds (3 topics for directory creation) — Estimates based on typical reading flow; validate during implementation

---

*Research completed: 2026-02-24*
*Ready for roadmap: yes*
