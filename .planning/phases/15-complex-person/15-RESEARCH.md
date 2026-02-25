# Phase 15: Complex - Person - Research

**Researched:** 2026-02-25
**Domain:** Person (人物) - Biographical content restructuring
**Confidence:** HIGH

## Summary

The _person domain contains 19 biographical files covering a diverse range of historical and contemporary figures. Unlike technical domains, person entries are atomic units of content - each file represents a complete individual profile with no inherent hierarchical relationships between them. The restructuring challenge is to create a meaningful subdomain classification that improves navigation while preserving the biographical nature of the content.

**Key Finding:** The most logical classification approach is by **field/domain of contribution** (scientists, philosophers, technologists, etc.) rather than alphabetical or chronological grouping. This aligns with how users would naturally search for figures ("I want to find scientists" or "Who are the notable AI researchers?").

**Primary recommendation:** Create 4-5 subdomains based on primary field of contribution: technology (software/AI), science (astronomy/medicine), philosophy, and historical figures. Each person file becomes a topic within the appropriate subdomain.

## Current Structure Analysis

### File Inventory (19 files, ~740 total lines)

| File | Lines | Person | Era | Primary Field |
|------|-------|--------|-----|---------------|
| armstrong.md | 210 | Neil Armstrong | 1930-2012 | Engineering/Astronautics |
| evan-martin.md | 52 | Evan Martin | Contemporary | Software Engineering |
| gary-marcus.md | 38 | Gary Marcus | Contemporary | AI Research |
| richard-stallman.md | 40 | Richard Stallman | Contemporary | Software Activism |
| shunyu-yao.md | 33 | Shunyu Yao | Contemporary | AI Research |
| peter-steinberger.md | 35 | Peter Steinberger | Contemporary | Software Engineering |
| andrej-karpathy.md | 36 | Andrej Karpathy | Contemporary | AI Research |
| evan-schwartz.md | 23 | Evan Schwartz | Contemporary | Software Engineering |
| hippocrates.md | 20 | Hippocrates | BC460-BC370 | Medicine |
| antonio-egas-moniz.md | 20 | Antonio Egas Moniz | 1874-1955 | Neuroscience |
| henry-molaison.md | 20 | Henry Molaison | 1926-2008 | Neuroscience Patient |
| mikolaj-kopernik.md | 13 | Nicolaus Copernicus | 1473-1543 | Astronomy |
| claudius-ptolemaeus.md | 15 | Ptolemy | 90-168 | Astronomy |
| eratosthenes.md | 17 | Eratosthenes | BC275-BC193 | Mathematics/Geography |
| john-michell.md | 10 | John Michell | 1724-1793 | Science (Physics) |
| aristotle.md | 22 | Aristotle | BC384-BC322 | Philosophy |
| jiang-zi-ya.md | 20 | Jiang Ziya | Ancient Chinese | Historical/Military |
| beltracchi.md | 16 | Wolfgang Beltracchi | 1951- | Art/History |
| jim-jones.md | 12 | Jim Jones | 1931-1978 | Historical/Cult |

### Content Pattern Analysis

**Content Types:**
1. **Contemporary Tech Figures** (8 files): Software engineers, AI researchers, open source activists
2. **Scientists** (6 files): Astronomers, mathematicians, physicians, neuroscientists
3. **Philosophers** (1 file): Aristotle
4. **Historical Figures** (4 files): Military strategists, artists, cult leaders, astronauts

**File Structure Patterns:**
- All files use YAML frontmatter with `title` and `description`
- Content organized as H4 headings (`####`) representing knowledge points
- Knowledge points are atomic insights about the person (contributions, views, stories)
- Most files are concise (10-40 lines), with Armstrong being the outlier at 210 lines

## Proposed Subdomain Classification

Based on content analysis, the following subdomain structure is recommended:

### Subdomain 1: technology (技术)
**Scope:** Software engineers, AI researchers, open source activists, tech entrepreneurs
**Files:**
- andrej-karpathy.md (AI researcher, OpenAI/Tesla)
- evan-martin.md (Chrome developer)
- evan-schwartz.md (Rust/TypeScript engineer)
- gary-marcus.md (AI researcher, critic)
- peter-steinberger.md (PSPDFKit founder, Claudebot)
- richard-stallman.md (Free software activist)
- shunyu-yao.md (AI researcher, OpenAI/Tencent)

**Rationale:** These are all contemporary figures primarily known for technology contributions. Grouping them creates a "who's who in tech" navigation path.

### Subdomain 2: science (科学)
**Scope:** Scientists from astronomy, medicine, mathematics, physics
**Files:**
- antonio-egas-moniz.md (Neurosurgeon, Nobel prize)
- claudius-ptolemaeus.md (Astronomer, geographer)
- eratosthenes.md (Mathematician, geographer)
- henry-molaison.md (Neuroscience patient, famous case study)
- hippocrates.md (Physician, "Father of Medicine")
- john-michell.md (Scientist, first proposed black holes)
- mikolaj-kopernik.md (Astronomer, heliocentrism)

**Rationale:** Historical and modern scientists across disciplines. Note: Henry Molaison is included as a science figure because his case is primarily known through scientific study.

### Subdomain 3: philosophy (哲学)
**Scope:** Philosophers and philosophical thinkers
**Files:**
- aristotle.md (Ancient Greek philosopher)

**Rationale:** Only one philosopher currently. This subdomain may expand in future. Alternative: Could merge with "historical" or "science" if single-file subdomain is not desired, but philosophy is distinct enough to warrant its own category.

### Subdomain 4: historical (历史)
**Scope:** Historical figures from various fields (military, art, exploration)
**Files:**
- armstrong.md (Astronaut - engineering speech)
- beltracchi.md (Art forger)
- jiang-zi-ya.md (Chinese military strategist)
- jim-jones.md (Cult leader)

**Rationale:** These figures are primarily known for historical significance rather than specific domain expertise. Armstrong could arguably go in "science" but his file focuses on engineering speech content. Jim Jones is a dark historical figure but belongs here.

## Recommended Hierarchy Structure

```
_person/
├── person.md                    # Domain entry with subdomain navigation
├── 0.index.md                   # Keep for backward compatibility (redirect/merge)
├── technology/                  # Subdomain: Tech figures
│   ├── technology.md            # Subdomain entry
│   ├── andrej-karpathy.md
│   ├── evan-martin.md
│   ├── evan-schwartz.md
│   ├── gary-marcus.md
│   ├── peter-steinberger.md
│   ├── richard-stallman.md
│   └── shunyu-yao.md
├── science/                     # Subdomain: Scientists
│   ├── science.md               # Subdomain entry
│   ├── antonio-egas-moniz.md
│   ├── claudius-ptolemaeus.md
│   ├── eratosthenes.md
│   ├── henry-molaison.md
│   ├── hippocrates.md
│   ├── john-michell.md
│   └── mikolaj-kopernik.md
├── philosophy/                  # Subdomain: Philosophers
│   ├── philosophy.md            # Subdomain entry
│   └── aristotle.md
└── historical/                  # Subdomain: Historical figures
    ├── historical.md            # Subdomain entry
    ├── armstrong.md
    ├── beltracchi.md
    ├── jiang-zi-ya.md
    └── jim-jones.md
```

## Migration Approach

### Phase 15-P01: Create technology subdomain
1. Create `technology/` directory
2. Create `technology/technology.md` subdomain entry with navigation
3. Move 7 tech person files into `technology/`
4. Add `original_path` frontmatter to each moved file

### Phase 15-P02: Create science subdomain
1. Create `science/` directory
2. Create `science/science.md` subdomain entry with navigation
3. Move 7 science person files into `science/`
4. Add `original_path` frontmatter to each moved file

### Phase 15-P03: Create philosophy and historical subdomains
1. Create `philosophy/` directory with entry file
2. Move `aristotle.md` into `philosophy/`
3. Create `historical/` directory with entry file
4. Move 4 historical figures into `historical/`
5. Add `original_path` frontmatter to all moved files

### Phase 15-P04: Create domain entry and update cross-domain links
1. Create `person.md` domain entry with 4-subdomain navigation
2. Update `0.index.md` navigation links to new subdomain paths
3. Verify no broken internal links
4. Archive or redirect old `0.index.md` A-Z listing

## Special Considerations for Biographical Content

### 1. Content Preservation
- **All knowledge points remain as H4 headings** - Do not convert to separate files
- **Preserve original filenames** - Use asymmetric naming (keep original names)
- **Original path tracking** - Add `original_path: content/6.maps/_person/{filename}` to frontmatter

### 2. Cross-Domain Link Considerations
- The _person domain is primarily a **reference target** rather than source
- Other domains may link to person entries (e.g., `_ai` linking to Andrej Karpathy)
- All existing links use format `/maps/_person/{filename}` without subdirectory
- **Critical:** These links must be updated to `/maps/_person/{subdomain}/{filename}`

### 3. Navigation Design
- Domain entry (`person.md`) should provide clear subdomain navigation
- Each subdomain entry should list its person entries
- Consider adding brief descriptions for each person in subdomain listings

### 4. Edge Cases
- **Henry Molaison:** Classified under "science" as a neuroscience case study, though he was a patient not a scientist
- **Armstrong:** Could fit "science" (astronaut) or "historical" (engineering speech focus) - placed in historical based on content focus
- **Single-file subdomains:** Philosophy has only one file. This is acceptable per project patterns (1-2 topics = file, but here we use directory for consistency). Alternative would be to merge philosophy into historical, but keeping separate allows future expansion.

## File-to-Subdomain Mapping

| Source File | Target Path | Subdomain |
|-------------|-------------|-----------|
| andrej-karpathy.md | technology/andrej-karpathy.md | technology |
| antonio-egas-moniz.md | science/antonio-egas-moniz.md | science |
| aristotle.md | philosophy/aristotle.md | philosophy |
| armstrong.md | historical/armstrong.md | historical |
| beltracchi.md | historical/beltracchi.md | historical |
| claudius-ptolemaeus.md | science/claudius-ptolemaeus.md | science |
| eratosthenes.md | science/eratosthenes.md | science |
| evan-martin.md | technology/evan-martin.md | technology |
| evan-schwartz.md | technology/evan-schwartz.md | technology |
| gary-marcus.md | technology/gary-marcus.md | technology |
| henry-molaison.md | science/henry-molaison.md | science |
| hippocrates.md | science/hippocrates.md | science |
| jiang-zi-ya.md | historical/jiang-zi-ya.md | historical |
| jim-jones.md | historical/jim-jones.md | historical |
| john-michell.md | science/john-michell.md | science |
| mikolaj-kopernik.md | science/mikolaj-kopernik.md | science |
| peter-steinberger.md | technology/peter-steinberger.md | technology |
| richard-stallman.md | technology/richard-stallman.md | technology |
| shunyu-yao.md | technology/shunyu-yao.md | technology |

## Validation Architecture

Not applicable for this content restructuring phase - no test framework needed for file organization changes. Validation will be done through:
1. Link checking (grep for broken internal links)
2. File structure verification (ls commands)
3. Frontmatter validation (YAML syntax check)

## Sources

### Primary (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_person/` - All 19 person files analyzed
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/taxonomy-criteria.md` - Project classification standards
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_workflow/workflow.md` - Reference domain entry pattern

### Secondary (MEDIUM confidence)
- STATE.md decisions: "_person 人物分组 | 建议按领域分组（tech/science/philosophy/others）" - Confirms classification approach

## Metadata

**Confidence breakdown:**
- Classification strategy: HIGH - Based on direct content analysis of all 19 files
- Subdomain structure: HIGH - Aligns with STATE.md decision and content patterns
- Migration approach: HIGH - Follows established patterns from Phases 11-14
- Edge case handling: MEDIUM - Some classification decisions (Armstrong, Molaison) involve judgment calls

**Research date:** 2026-02-25
**Valid until:** 30 days (stable classification)

---

## RESEARCH COMPLETE

**Phase:** 15 - Complex Person
**Confidence:** HIGH

### Key Findings

1. **19 person files** covering diverse fields: tech (8), science (6), philosophy (1), historical (4)
2. **Content is atomic** - Each file is a complete biographical profile with H4 knowledge points
3. **Best classification:** By field/domain of contribution (tech, science, philosophy, historical)
4. **Link impact:** Existing links use flat structure `/maps/_person/{file}` - must update to include subdomain
5. **Single-file subdomain:** Philosophy has only Aristotle - acceptable per project patterns

### File Created
`/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/15-complex-person/15-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Content Analysis | HIGH | All 19 files reviewed directly |
| Classification Strategy | HIGH | Aligns with STATE.md guidance |
| Migration Pattern | HIGH | Follows Phases 11-14 patterns |
| Edge Cases | MEDIUM | Some judgment calls on classification |

### Open Questions

None - classification decisions documented with rationale.

### Ready for Planning

Research complete. Planner can now create PLAN.md files following the 4-plan structure (P01-P04) outlined in this document.
