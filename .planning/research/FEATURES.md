# Feature Research: Knowledge Base Organization

**Domain:** Personal Knowledge Management / Digital Garden
**Researched:** 2026-02-24
**Confidence:** HIGH

## Research Context

This research addresses the reorganization of a 324-file markdown knowledge base from an inconsistent structure to a 4-layer cognitive hierarchy: Domain → Subdomain → Topic → Knowledge Point.

## Feature Landscape

### Table Stakes (Navigation Fails Without These)

Features that are essential for a functional knowledge base. Missing any of these makes navigation and discovery impossible.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hierarchical folder structure** | Users need predictable paths to content | LOW | 3-4 levels optimal; deeper nesting causes navigation fatigue |
| **Domain entry files (index.md)** | Every domain needs a landing page with subdomain navigation | LOW | Acts as table of contents for the domain; critical for orientation |
| **Consistent naming conventions** | Predictable file/directory names reduce cognitive load | LOW | Use kebab-case or snake_case consistently; avoid spaces |
| **Cross-domain linking** | Knowledge spans categories; rigid hierarchies break connections | MEDIUM | Internal links using relative paths; wiki-style [[links]] optional |
| **Browsable navigation** | Users must navigate without search when exploring | LOW | Parent→child relationships visible at every level |
| **Single source of truth** | Each knowledge point exists in exactly one location | LOW | Prevents duplication and sync issues |

### Differentiators (Organizational Improvements)

Features that elevate a knowledge base from functional to excellent. These provide competitive advantage in usability and maintainability.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Progressive disclosure** | Higher levels show summaries; details at lower levels | MEDIUM | Domain = overview, Subdomain = concepts, Topic = details, Knowledge Point = specifics |
| **Entry file templates** | Consistent structure across domain indexes | LOW | Standardized sections: Overview, Subdomains, Related Domains, Recently Updated |
| **Bread crumb navigation** | Visual path showing current location in hierarchy | LOW | Domain → Subdomain → Topic → Current Page |
| **Related content linking** | "See also" connections between related topics | MEDIUM | Requires maintaining link graph; high value for discovery |
| **Status indicators** | Mark content as draft, complete, or outdated | LOW | Frontmatter metadata: status, last-reviewed, confidence |
| **Atomic knowledge points** | Each H4 header represents one discrete concept | LOW | Enables precise linking and reuse; aligns with Zettelkasten principles |
| **Tag-based cross-cutting** | Tags span hierarchy for alternative discovery paths | MEDIUM | Complements (not replaces) hierarchical structure |
| **Visual hierarchy cues** | Icons, colors, or formatting distinguish levels | LOW | Consistent visual language for domains vs topics |
| **Growth-friendly structure** | New content has obvious placement | LOW | "10 items per level" rule prevents overcrowding |
| **Archive mechanism** | Completed/stale content moved out of active space | LOW | PARA method "Archives" concept; keeps active space clean |

### Anti-Features (Deliberately NOT Building)

Features that seem valuable but create maintenance burden or structural problems.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Automatic content generation** | Creates placeholder bloat; fake organization | Manual curation ensures quality; create content when needed |
| **Deep nesting (>4 levels)** | Navigation friction; files become hard to find | Flatten structure; use cross-links for relationships |
| **Multiple classification systems** | Content ends up in multiple places; sync nightmares | Single hierarchy + tags for cross-cutting concerns |
| **Separate files for every knowledge point** | 324 files → 2000+ files; navigation chaos | Keep knowledge points as H4 headers within topic files |
| **Rigid taxonomies** | Knowledge doesn't fit clean categories; fighting the tool | Allow organic growth; reorganize when patterns emerge |
| **Version control for content** | Git history suffices; built-in versioning adds complexity | Use git; mark significant versions with tags |
| **Access control / permissions** | Personal knowledge base doesn't need multi-user security | Simple folder structure; share exports if needed |
| **Real-time collaboration** | Overkill for personal knowledge; merge conflicts likely | Async workflow; single owner per domain |
| **Full-text search dependency** | Search is a crutch for poor organization | Build browsable structure first; search as enhancement |
| **Automated link validation** | False positives on external links; maintenance noise | Periodic manual review; accept some link rot |

## Feature Dependencies

```
Hierarchical Structure
    └──requires──> Domain Entry Files
                       └──requires──> Consistent Naming
                                          └──enables──> Cross-Domain Linking

Progressive Disclosure
    └──requires──> Hierarchical Structure
                       └──enhances──> Browsable Navigation

Atomic Knowledge Points
    └──requires──> Single Source of Truth
                       └──conflicts──> Multiple Classification Systems

Tag-Based Cross-Cutting
    └──requires──> Hierarchical Structure (foundation)
                       └──enhances──> Related Content Linking
```

### Dependency Notes

- **Hierarchical Structure requires Domain Entry Files:** Without entry files, users cannot navigate into domains
- **Domain Entry Files require Consistent Naming:** Predictable `index.md` or `README.md` patterns essential
- **Atomic Knowledge Points conflicts with Multiple Classifications:** Keeping knowledge points as headers (not files) prevents them from being filed in multiple places
- **Tag-Based Cross-Cutting requires Hierarchy:** Tags work best as supplementary navigation, not primary organization

## Complexity Assessment

| Feature Category | Implementation | Maintenance | Migration |
|------------------|----------------|-------------|-----------|
| Table Stakes | LOW | LOW | MEDIUM |
| Differentiators | LOW-MEDIUM | LOW | MEDIUM |
| Anti-Features | HIGH | HIGH | N/A |

## MVP Definition

### Launch With (v1)

Minimum viable structure for the knowledge base reorganization:

- [ ] **4-layer hierarchy** — Domain → Subdomain → Topic → Knowledge Point (H4)
- [ ] **Domain entry files** — Every domain has `index.md` with subdomain navigation
- [ ] **Consistent naming** — All directories use kebab-case; no spaces
- [ ] **Cross-domain links** — Internal links use relative paths
- [ ] **Single source of truth** — Each knowledge point exists in exactly one topic file

### Add After Validation (v1.x)

Features to add once core structure is working:

- [ ] **Entry file templates** — Standardized domain index format
- [ ] **Status indicators** — Frontmatter metadata for content state
- [ ] **Related content links** — "See also" sections at topic level
- [ ] **Archive mechanism** — Move stale content to `_archives/`

### Future Consideration (v2+)

Features to defer until structure is proven:

- [ ] **Tag-based navigation** — Cross-cutting tag index
- [ ] **Visual hierarchy cues** — Icons or formatting distinctions
- [ ] **Automated link checking** — Periodic validation of internal links

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| 4-layer hierarchy | HIGH | LOW | P1 |
| Domain entry files | HIGH | LOW | P1 |
| Consistent naming | HIGH | LOW | P1 |
| Cross-domain links | HIGH | LOW | P1 |
| Single source of truth | HIGH | MEDIUM | P1 |
| Entry file templates | MEDIUM | LOW | P2 |
| Status indicators | MEDIUM | LOW | P2 |
| Related content links | MEDIUM | MEDIUM | P2 |
| Archive mechanism | MEDIUM | LOW | P2 |
| Tag-based navigation | LOW | MEDIUM | P3 |
| Visual hierarchy cues | LOW | LOW | P3 |
| Automated link checking | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch (navigation fails without)
- P2: Should have, add when core is stable
- P3: Nice to have, future consideration

## Research-Informed Principles

### From PARA Method
- **Projects vs Areas distinction:** Current work (Projects) vs ongoing responsibilities (Areas)
- **Archives for completed content:** Keeps active workspace clean
- **Actionability over taxonomy:** Organize by "what is this for?" not "what is this about?"

### From Zettelkasten Method
- **Atomic notes:** Each knowledge point should be self-contained
- **Connection over collection:** Links between ideas matter more than perfect folders
- **Emergent structure:** Let organization evolve; don't over-engineer upfront

### From Information Architecture Research
- **3-7 rule:** Humans can hold 3-7 items in working memory; limit siblings at each level
- **Progressive disclosure:** Show summaries first, details on demand
- **Breadth over depth:** Wide shallow hierarchies beat narrow deep ones

### From Documentation Site Patterns
- **Index files as entry points:** Every directory needs a landing page
- **Navigable without search:** Structure should support browsing
- **Consistent templates:** Predictable page layouts reduce cognitive load

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Table Stakes | HIGH | Established patterns from IA and documentation best practices |
| Differentiators | MEDIUM-HIGH | Based on PARA, Zettelkasten, and documentation patterns; some subjective |
| Anti-Features | HIGH | Clear from scope constraints (personal KB, not team/enterprise) |
| Complexity | MEDIUM | Estimates based on markdown file operations |

## Sources

- [PARA Method - Tiago Forte](https://fortelabs.com/blog/para/)
- [Zettelkasten Method](https://zettelkasten.de/introduction/)
- [Personal Knowledge Management at Scale - LinkedIn](https://www.linkedin.com/pulse/personal-knowledge-management-scale-analyzing-8000-notes-dubois-sbege)
- [Folder Structure Best Practices - Adobe Experience League](https://experienceleague.adobe.com/en/perspectives/folder-structure-best-practices-for-aem-assets)
- [Windows Navigation Design Basics - Microsoft](https://msdn.microsoft.com/zh-cn/visualc/mt187344)
- [MkDocs Documentation](https://www.mkdocs.org/)
- [Docsify Documentation](https://docsify.js.org/)

---

*Feature research for: Knowledge Base Reorganization*
*Researched: 2026-02-24*
*Confidence: HIGH*
