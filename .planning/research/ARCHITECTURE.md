# Architecture Research: 4-Layer Cognitive Knowledge Base

**Domain:** Knowledge Management System
**Researched:** 2026-02-24
**Confidence:** HIGH (based on direct codebase analysis)

---

## System Overview

The 4-layer cognitive structure organizes knowledge hierarchically from broad domains to specific knowledge points. This architecture enables clear navigation, consistent organization, and scalable growth.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LAYER 1: DOMAIN                              │
│                    (Broad knowledge areas)                           │
│                                                                      │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│   │ 前端     │ │ 工程     │ │ Web      │ │ AI       │ │ 科学     │  │
│   │Frontend  │ │Engineering│ │         │ │         │ │ Science  │  │
│   └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
├────────┴────────────┴────────────┴────────────┴────────────┴────────┤
│                         LAYER 2: SUBDOMAIN                           │
│                    (Specialized areas within domain)                 │
│                                                                      │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│   │ CSS      │ │ JavaScript│ │ HTML     │ │ W3C      │               │
│   │ (dir)    │ │ (file)   │ │ (dir)    │ │ (dir)    │               │
│   └────┬─────┘ └──────────┘ └────┬─────┘ └────┬─────┘               │
├────────┴─────────────────────────┴────────────┴─────────────────────┤
│                         LAYER 3: TOPIC                               │
│                    (Specific subjects within subdomain)              │
│                                                                      │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │
│   │ BEM Method   │ │ Tailwind     │ │ New Features │                │
│   │ Layers       │ │ (subdir)     │ │ 2025         │                │
│   │ (file)       │ │              │ │ (file)       │                │
│   └──────────────┘ └──────┬───────┘ └──────────────┘                │
├───────────────────────────┴─────────────────────────────────────────┤
│                         LAYER 4: KNOWLEDGE POINT                     │
│                    (Granular insights, 4th-level headings)           │
│                                                                      │
│   #### Core Concept                                                  │
│   #### Implementation Details                                        │
│   #### Common Pitfalls                                               │
│   #### Case Study                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### Layer 1: Domain

| Attribute | Definition | Boundary Rules |
|-----------|------------|----------------|
| **Scope** | Broad knowledge area (e.g., Frontend, AI, Science) | Contains 3-10 subdomains max |
| **Representation** | Directory under `content/6.maps/` | Named with `_` prefix: `_frontend`, `_ai` |
| **Entry Point** | `0.index.md` or `{domain}.md` | Must provide subdomain navigation |
| **Content** | High-level overview, subdomain index | No deep technical details |

**Current Domains (29 total):**
- **Simple (1-2 files):** `_apps`, `_blogs`, `_cli`, `_communication`, `_company`, `_cross-domain`, `_game`, `_games`, `_go`, `_hardware`, `_linux`, `_manage`, `_markdown`, `_medicine`, `_oop`, `_php`, `_photography`, `_policy`, `_react-native`, `_refactor`, `_regex`, `_render`, `_seo`, `_server`, `_source-code`, `_typescript`, `_web-app`, `_web-pages`, `_windows`
- **Medium (3-8 files):** `_biology`, `_business`, `_cloud-native`, `_cpp`, `_cross-platform`, `_database`, `_devops`, `_docs`, `_fe-framework`, `_hire`, `_ide`, `_industry`, `_interview`, `_machine-learning`, `_management`, `_product`, `_programming`, `_science`, `_software`, `_system`, `_test`, `_threads`, `_ui`, `_visual`, `_web`, `_workflow`
- **Complex (9+ files):** `_ai` (70 files), `_frontend` (29 files), `_person` (19 files)

### Layer 2: Subdomain

| Attribute | Definition | Boundary Rules |
|-----------|------------|----------------|
| **Scope** | Specialized area within domain | Can be file OR directory based on content volume |
| **Representation** | File: `{subdomain}.md` OR Directory: `{subdomain}/` | Content < 3 topics = file; Content >= 3 topics = directory |
| **Entry Point** | File itself OR `0.index.md` within directory | Must provide topic navigation if directory |
| **Content** | Subdomain overview, topic links/structure | Technical depth appropriate for the scope |

**Structural Decision Matrix:**

| Content Volume | Structure | Example |
|----------------|-----------|---------|
| 1-2 topics | Single file | `javascript.md` |
| 3-5 topics | Directory with index | `css/0.index.md` + topic files |
| 6+ topics | Directory with subdirectories | `ai/agents/`, `ai/llm/`, `ai/training/` |

### Layer 3: Topic

| Attribute | Definition | Boundary Rules |
|-----------|------------|----------------|
| **Scope** | Specific subject within subdomain | Single conceptual unit |
| **Representation** | Markdown file OR subdirectory for complex topics | Named descriptively: `bem.md`, `new-features-2025.md` |
| **Entry Point** | File itself | No required index unless nested |
| **Content** | Comprehensive coverage of the topic | Organized with 4th-level headings |

### Layer 4: Knowledge Point

| Attribute | Definition | Boundary Rules |
|-----------|------------|----------------|
| **Scope** | Granular insight, fact, technique, or case | Atomic piece of knowledge |
| **Representation** | 4th-level markdown heading: `####` | Never a separate file |
| **Content Types** | Core concepts, implementations, pitfalls, examples, references | Self-contained but linked to topic context |

---

## Data Flow & Navigation Patterns

### User Navigation Flow

```
                    ┌─────────────────┐
                    │   0.index.md    │
                    │  (Domain Index) │
                    │  Maps Homepage  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ↓              ↓              ↓
        ┌─────────┐    ┌─────────┐    ┌─────────┐
        │Domain A │    │Domain B │    │Domain C │
        │ Entry   │    │ Entry   │    │ Entry   │
        └────┬────┘    └────┬────┘    └────┬────┘
             │              │              │
     ┌───────┴──────┐ ┌─────┴──────┐ ┌─────┴──────┐
     ↓              ↓ ↓            ↓ ↓            ↓
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│Subdomain│   │Subdomain│   │Subdomain│   │Subdomain│
│  Entry  │   │  Entry  │   │  Entry  │   │  Entry  │
└────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘
     │             │             │             │
     ↓             ↓             ↓             ↓
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Topic  │   │  Topic  │   │  Topic  │   │  Topic  │
│  File   │   │  File   │   │  File   │   │  File   │
└────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘
     │             │             │             │
     ↓             ↓             ↓             ↓
#### Point    #### Point    #### Point    #### Point
#### Point    #### Point    #### Point    #### Point
```

### Cross-Reference Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Sibling Navigation** | Move between subdomains | Listed in domain entry file |
| **Child Enumeration** | See topics in subdomain | Listed in subdomain entry |
| **Deep Link** | Direct access to topic | URL path: `/maps/{domain}/{subdomain}/{topic}` |
| **Related Topics** | Connect related concepts | Inline links within content |

---

## Recommended Project Structure

```
content/6.maps/
├── 0.index.md                    # Domain index (Layer 1 navigation)
│
├── _frontend/                    # Domain: Frontend
│   ├── frontend.md               # Domain entry (optional if simple)
│   ├── javascript.md             # Subdomain: JavaScript (file-based)
│   ├── text-highlight.md         # Topic under frontend directly
│   │
│   ├── css/                      # Subdomain: CSS (directory-based)
│   │   ├── 0.index.md            # Subdomain entry with topic nav
│   │   ├── bem.md                # Topic: BEM methodology
│   │   ├── layers.md             # Topic: CSS layers
│   │   ├── new-features-2025.md  # Topic: New features
│   │   │
│   │   └── tailwind/             # Nested subdomain: Tailwind
│   │       └── index.md          # Topic/index hybrid
│   │
│   ├── html/                     # Subdomain: HTML
│   │   ├── 0.index.md
│   │   └── ...
│   │
│   └── w3c/                      # Subdomain: W3C Standards
│       ├── 0.index.md
│       ├── css/
│       ├── es/
│       └── screen/
│
├── _ai/                          # Domain: AI (complex, deeply nested)
│   ├── ai.md                     # Domain entry
│   ├── agents.md                 # Subdomain: Agents (file)
│   ├── agents/                   # Subdomain: Agents (directory)
│   │   └── ...
│   ├── llm/                      # Subdomain: LLM
│   ├── prompt/                   # Subdomain: Prompt Engineering
│   ├── training/                 # Subdomain: Training
│   └── ...
│
├── _database/                    # Domain: Database
│   ├── datalake/                 # Subdomain: Data Lake
│   ├── postgres/                 # Subdomain: PostgreSQL
│   ├── redis.md                  # Subdomain: Redis (simple)
│   └── sql/                      # Subdomain: SQL
│
└── [other domains...]
```

---

## Architectural Patterns

### Pattern 1: File-Based Subdomain

**What:** Subdomain represented as a single markdown file
**When to use:** 1-2 topics, simple content, unlikely to grow
**Trade-offs:** Simple but limited scalability

**Example:**
```markdown
---
title: JavaScript
---

## Basics

* [JavaScript Mind Map](/maps/_frontend/javascript/javascript-mind-map)
* [Promise](/maps/_frontend/javascript/promise)

## Concepts

* [Task Slice](/maps/_frontend/javascript/task-slice)
```

### Pattern 2: Directory-Based Subdomain

**What:** Subdomain as directory with `0.index.md` entry
**When to use:** 3+ topics, complex content, expected growth
**Trade-offs:** More structure, better organization, requires maintenance

**Example:**
```markdown
---
title: CSS
---

## Methodologies

* [BEM](/maps/_frontend/css/bem)
* [Inverted Triangle CSS](/maps/_frontend/css/inverted-triangle-css)

## Features

* [Layers](/maps/_frontend/css/layers)
* [New Features 2025](/maps/_frontend/css/new-features-2025)

## Frameworks

* [Tailwind](/maps/_frontend/css/tailwind)
```

### Pattern 3: Hybrid Topic-Subdomain

**What:** Topic that grows into a subdirectory
**When to use:** Topic complexity increases over time
**Trade-offs:** Requires refactoring, but natural evolution

**Evolution Path:**
```
tailwind.md → tailwind/         # When content grows
              ├── index.md      # Overview + navigation
              ├── config.md     # Configuration topic
              └── plugins.md    # Plugin development topic
```

### Pattern 4: Knowledge Point Organization

**What:** Fourth-level headings for granular knowledge
**When to use:** Within any topic file
**Trade-offs:** Keeps related knowledge together, but longer files

**Example:**
```markdown
---
title: BEM Methodology
---

## Overview

Block Element Modifier methodology for CSS class naming.

#### Core Philosophy

BEM provides a strict naming convention that makes CSS more maintainable...

#### Block Definition

A standalone entity that is meaningful on its own...

#### Element Definition

A part of a block that has no standalone meaning...

#### Modifier Definition

A flag on a block or element that changes appearance or behavior...

#### Common Pitfalls

* Over-nesting elements (element of element)
* Creating blocks for everything
* Inconsistent modifier naming
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Flattened Hierarchy

**What people do:** Put all topics at domain level without subdomains
**Why it's wrong:** Loses cognitive grouping, makes navigation difficult
**Do this instead:** Group related topics under appropriate subdomains

```
Bad:  _frontend/bem.md, _frontend/sass.md, _frontend/promise.md, ...
Good: _frontend/css/bem.md, _frontend/css/sass.md, _frontend/javascript/promise.md
```

### Anti-Pattern 2: Over-Fragmentation

**What people do:** Create a file for every small concept
**Why it's wrong:** Too many small files, navigation overhead, context loss
**Do this instead:** Use 4th-level headings for knowledge points within topic files

```
Bad:  bem-block.md, bem-element.md, bem-modifier.md (separate files)
Good: bem.md with #### Block, #### Element, #### Modifier headings
```

### Anti-Pattern 3: Inconsistent Entry Points

**What people do:** Mix `index.md`, `0.index.md`, and `{name}.md` arbitrarily
**Why it's wrong:** Confuses navigation, breaks user mental model
**Do this instead:** Standardize on `0.index.md` for directory entries

### Anti-Pattern 4: Deep Nesting Beyond 4 Layers

**What people do:** Create 5+ levels of directory nesting
**Why it's wrong:** Exceeds cognitive structure, difficult to navigate
**Do this instead:** Flatten at topic level, use headings for deeper organization

```
Bad:  _ai/llm/training/fine-tuning/techniques/lora.md (6 levels)
Good: _ai/llm/fine-tuning.md with #### LoRA heading
```

---

## Build Order Recommendations

Based on complexity analysis, recommended implementation order:

### Phase 1: Simple Domains (1-2 files)

**Rationale:** Establish patterns, quick wins, build confidence

| Domain | Files | Notes |
|--------|-------|-------|
| `_go` | 1 | Single file, clear scope |
| `_markdown` | 1 | Well-defined topic |
| `_regex` | 1 | Self-contained |
| `_hardware` | 2 | Minimal nesting |
| `_policy` | 2 | Simple structure |

### Phase 2: Medium Domains (3-8 files)

**Rationale:** Apply established patterns to moderate complexity

| Domain | Files | Notes |
|--------|-------|-------|
| `_biology` | 3 | Clear subdomain boundaries |
| `_business` | 3 | Distinct topics |
| `_cross-platform` | 3 | Well-scoped |
| `_software` | 5 | Classic subdomain candidates |
| `_test` | 5 | Methodology vs tools split |
| `_database` | 12 | More complex, good intermediate |

### Phase 3: Complex Domains (9+ files)

**Rationale:** Tackle after patterns are validated, requires most planning

| Domain | Files | Notes |
|--------|-------|-------|
| `_person` | 19 | Biographical entries, unique structure |
| `_frontend` | 29 | Deep nesting already started |
| `_ai` | 70 | Most complex, save for last |

### Phase 4: Cross-Cutting Concerns

**Rationale:** Update navigation after structure stabilizes

- Update `6.maps/0.index.md` with new navigation
- Verify all internal links
- Add redirects if URL paths change

---

## Scaling Considerations

### At 100 Topics per Domain

- Subdomain directories become essential
- Consider subdomain index auto-generation
- Cross-linking maintenance becomes important

### At 500 Topics per Domain

- May need subdomain-level splitting
- Search functionality becomes critical
- Tag-based navigation supplements hierarchy

### At 1000+ Topics per Domain

- Consider domain splitting (e.g., `_ai-ml`, `_ai-llm`)
- Automated link checking required
- Faceted navigation (by date, type, difficulty)

---

## Integration with Nuxt Content

### URL Routing

| File Path | URL Route |
|-----------|-----------|
| `6.maps/_frontend/css/bem.md` | `/maps/frontend/css/bem` |
| `6.maps/_ai/llm/index.md` | `/maps/ai/llm` |
| `6.maps/_database/redis.md` | `/maps/database/redis` |

### Frontmatter Standards

```yaml
---
title: "Topic Title"           # Required: Display title
description: "Brief summary"   # Optional: SEO and previews
navigation: true|false         # Optional: Show in nav (default: true)
---
```

### Directory Configuration (`_dir.yml`)

```yaml
# 6.maps/_frontend/_dir.yml
title: 'Frontend'
navigation:
  icon: '🎨'
  badge: 'Core'
```

---

## Sources

- Direct codebase analysis: `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/`
- PROJECT.md requirements: `/Users/lionad/Github/Lionad-Morotar/blog/.planning/PROJECT.md`
- Existing patterns: `_frontend/css/`, `_ai/`, `_database/` structures

---

*Architecture research for: 4-Layer Cognitive Knowledge Base*
*Researched: 2026-02-24*
