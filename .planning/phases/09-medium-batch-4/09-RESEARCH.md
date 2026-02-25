# Phase 9: Medium Batch 4 - Research

**Researched:** 2026-02-24
**Domain:** Content Architecture Migration (4-layer cognitive hierarchy)
**Confidence:** HIGH

## Summary

Phase 9 migrates 4 medium complexity domains (_cloud-native, _computer, _product, _science) from flat file structure to the 4-layer cognitive hierarchy (Domain → Subdomain → Topic → Knowledge Point). This batch contains 27 files total, with varying structures:

- **_cloud-native**: 6 files with existing subdirectories (hardware/, sidecar/)
- **_computer**: 7 files with existing subdirectories (encoding/, segments/)
- **_product**: 7 files with existing subdirectory (docs/)
- **_science**: 7 files, all flat (no subdirectories)

After analyzing all file contents, the recommendation is to use a **hybrid approach** based on content boundaries: create subdomains where files represent distinct conceptual areas, preserve existing subdirectories as formalized subdomains, and keep flat structures where topics are independent but related.

**Primary recommendation:** Apply the validated decision criteria from previous phases: 1-2 topics = flat file structure, 3+ topics with clear conceptual boundaries = directory-based subdomains. Create subdomains when files share a clear conceptual boundary and form an "independent learning unit."

---

## Domain Analysis

### 1. _cloud-native Domain (3 files + 2 subdirectories with 3 files)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| cloud-native.md | 153 | Domain overview, CNCF definition, cloud-native concepts, technology stack |
| kubernetes.md | 41 | Kubernetes basics, architecture, commands |
| serverless.md | 10 | Serverless TODO placeholder |
| hardware/arm-on-cloud-native.md | 131 | Arm architecture as default for cloud computing |
| sidecar/sidecar.md | 12 | Sidecar pattern overview |
| sidecar/service-mesh-without-sidecar.md | 15 | Istio Ambient mode (sidecarless service mesh) |

**Content Analysis:**
- `cloud-native.md`: Domain overview, CNCF landscape, core concepts (containers, K8s, service mesh, immutable infrastructure)
- `kubernetes.md`: Container orchestration platform specifics
- `serverless.md**: Serverless computing (minimal content, placeholder)
- `hardware/arm-on-cloud-native.md**: Arm architecture adoption for cloud workloads
- `sidecar/sidecar.md**: Sidecar pattern introduction
- `sidecar/service-mesh-without-sidecar.md**: Sidecarless service mesh (Istio Ambient)

**Subdomain Recommendation:**
**YES** - Create subdomains for _cloud-native:
```
_cloud-native/
├── cloud-native.md (domain entry)
├── kubernetes/
│   └── kubernetes.md (subdomain entry, moved from root)
├── serverless/
│   └── serverless.md (subdomain entry, moved from root)
├── hardware/
│   ├── hardware.md (subdomain entry, NEW)
│   └── arm-on-cloud-native.md (keep existing, moved)
└── sidecar/
    ├── sidecar.md (subdomain entry, keep existing)
    └── service-mesh-without-sidecar.md (keep existing)
```

**Rationale:** The 4 topics represent distinct cloud-native technology areas:
1. **kubernetes/**: Container orchestration - core cloud-native technology
2. **serverless/**: Serverless computing paradigm
3. **hardware/**: Infrastructure/architecture decisions (Arm vs x86)
4. **sidecar/**: Service mesh patterns (both with and without sidecars)

The existing subdirectories (`hardware/`, `sidecar/`) should be formalized as subdomains with proper entry files. Kubernetes and serverless should become subdomains as they are major cloud-native pillars.

---

### 2. _computer Domain (3 files + 2 subdirectories with 4 files)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| computer.md | 59 | Computer basics: number systems, digital circuits, two's complement |
| encoding.md | 32 | Encoding overview, links to emoji and hash-collision subtopics |
| network.md | 266 | Comprehensive networking: TCP/IP, HTTP, HTTPS, TLS, CDN, security |
| encoding/emoji.md | 43 | Emoji encoding, Unicode handling |
| encoding/hash-collision.md | 37 | Hash collision resolution strategies |
| segments/http-request-example.md | 15 | HTTP request example (HTML snippet) |
| segments/http-response-example.md | 14 | HTTP response example (HTML snippet) |

**Content Analysis:**
- `computer.md`: Computer science fundamentals (binary, digital circuits, encoding)
- `encoding.md`: Encoding overview with links to subtopics
- `network.md`: Comprehensive networking guide (TCP, HTTP, TLS, security)
- `encoding/emoji.md`: Emoji and Unicode encoding details
- `encoding/hash-collision.md`: Hash table collision resolution
- `segments/http-request-example.md`: HTTP request format example
- `segments/http-response-example.md`: HTTP response format example

**Subdomain Recommendation:**
**YES** - Create subdomains for _computer:
```
_computer/
├── computer.md (domain entry)
├── encoding/
│   ├── encoding.md (subdomain entry, moved from root)
│   ├── emoji.md (keep existing)
│   └── hash-collision.md (keep existing)
├── network/
│   ├── network.md (subdomain entry, moved from root)
│   └── segments/
│       ├── http-request-example.md (keep existing)
│       └── http-response-example.md (keep existing)
└── fundamentals/
    └── computer.md (subdomain entry, moved from root)
```

**Rationale:** The content naturally groups into 3 conceptual areas:
1. **fundamentals/**: Core computer science (number systems, digital circuits, two's complement) - currently `computer.md`
2. **encoding/**: Data encoding (character encoding, image encoding, hashing) - existing subdirectory
3. **network/**: Computer networking (TCP/IP, HTTP, security) - currently `network.md`

The `computer.md` file should be renamed to avoid confusion with the domain entry. Since it covers fundamental CS concepts, a `fundamentals/` subdomain is appropriate.

The `segments/` subdirectory contains HTTP examples used by network.md and should be nested under `network/`.

---

### 3. _product Domain (6 files + 1 subdirectory with 1 file)

**Current Files:**
| File/Dir | Lines | Content Summary |
|----------|-------|-----------------|
| product.md | 22 | Product domain overview, links to gamification, product-hunt, dovetail |
| gamification.md | 81 | Gamification design principles, FourSquare case study |
| growth.md | 10 | Growth methods overview (links to SEO) |
| operation.md | 62 | Operations: NPS, advertising strategies (CPM, CPC, oCPM) |
| product-hunt.md | 1011 | Product Hunt collection - extensive catalog of tools by category |
| product-manager.md | 10 | Product manager role and responsibilities |
| docs/dovetail.md | 89 | Dovetail qualitative research platform |

**Content Analysis:**
- `product.md`: Domain overview with navigation links
- `gamification.md`: Gamification design theory and practice
- `growth.md**: Growth hacking overview (minimal)
- `operation.md**: Product operations metrics and advertising
- `product-hunt.md**: Extensive product catalog (1000+ lines)
- `product-manager.md**: PM role definition
- `docs/dovetail.md**: User research tool (Dovetail)

**Subdomain Recommendation:**
**YES** - Create subdomains for _product:
```
_product/
├── product.md (domain entry)
├── gamification/
│   └── gamification.md (subdomain entry, moved from root)
├── growth/
│   └── growth.md (subdomain entry, moved from root)
├── operation/
│   └── operation.md (subdomain entry, moved from root)
├── product-hunt/
│   └── product-hunt.md (subdomain entry, moved from root)
├── product-manager/
│   └── product-manager.md (subdomain entry, moved from root)
└── user-research/
    ├── user-research.md (subdomain entry, NEW)
    └── dovetail.md (moved from docs/)
```

**Rationale:** The 6 topics represent distinct product management disciplines:
1. **gamification/**: Game design principles for products
2. **growth/**: User growth strategies
3. **operation/**: Product operations and metrics
4. **product-hunt/**: Product discovery catalog
5. **product-manager/**: PM role and career
6. **user-research/**: User research methods and tools (Dovetail)

The `docs/dovetail.md` file should be moved to a formal `user-research/` subdomain since it's about user research tooling, not documentation.

**Note:** The `product-hunt.md` file is extremely large (1011 lines) and could potentially be split further in future phases by category (Productivity, Engineering, Design, etc.). For Phase 9, keep as single file within subdomain.

---

### 4. _science Domain (7 files, all flat)

**Current Files:**
| File | Lines | Content Summary |
|------|-------|-----------------|
| complex-science.md | 15 | Complex science overview, links to systems-theory |
| cosmos.md | 79 | Cosmology: from geocentric to heliocentric, universe history |
| entropy.md | 50 | Entropy concepts from multiple book sources |
| environment.md | 28 | Low-carbon web practices, CO2 measurement |
| neuroscience.md | 62 | Neuroscience history, brain research timeline, misophonia |
| quantum.md | 13 | Quantum mechanics basics, EPR paradox, Bell's inequality |
| systems-theory.md | 44 | Systems theory principles (8 principles from Qian Xuesen) |

**Content Analysis:**
- `complex-science.md`: Complex systems overview
- `cosmos.md`: Cosmology and universe history
- `entropy.md`: Thermodynamics and entropy concepts
- `environment.md`: Environmental science applied to web
- `neuroscience.md`: Brain science history and conditions
- `quantum.md`: Quantum physics fundamentals
- `systems-theory.md`: Systems thinking principles

**Subdomain Recommendation:**
**YES** - Create subdomains for _science:
```
_science/
├── science.md (domain entry)
├── complex-science/
│   ├── complex-science.md (subdomain entry, moved from root)
│   └── systems-theory.md (moved from root - related concept)
├── cosmos/
│   └── cosmos.md (subdomain entry, moved from root)
├── entropy/
│   └── entropy.md (subdomain entry, moved from root)
├── environment/
│   └── environment.md (subdomain entry, moved from root)
├── neuroscience/
│   └── neuroscience.md (subdomain entry, moved from root)
└── quantum/
    └── quantum.md (subdomain entry, moved from root)
```

**Rationale:** All 7 files represent distinct scientific disciplines with no overlap:
1. **complex-science/**: Complex systems (includes systems-theory as related topic)
2. **cosmos/**: Astronomy and cosmology
3. **entropy/**: Thermodynamics
4. **environment/**: Environmental science
5. **neuroscience/**: Brain science
6. **quantum/**: Quantum mechanics

The `systems-theory.md` file is conceptually related to complex-science and should be nested within that subdomain rather than being a standalone subdomain.

---

## Migration Pattern for Phase 9 Domains

### Decision Tree

```
Does the domain have files that share a clear conceptual boundary?
├── YES → Create subdomain(s)
│   └── Examples: _cloud-native (4 distinct tech areas),
│                 _computer (3 CS areas),
│                 _product (6 PM disciplines),
│                 _science (6 scientific disciplines)
│
└── NO → Keep flat topic structure
    └── Are any files >150 lines with clear internal sections?
        ├── YES → Consider future subdomain for that file's topic
        │   └── Example: product-hunt.md could split by category
        └── NO → Keep as flat topic files
```

### Migration Patterns

#### Pattern A: Subdomain with Topics (for _cloud-native, _product, _science)
```
Before:
_science/
├── complex-science.md
├── cosmos.md
├── entropy.md
├── environment.md
├── neuroscience.md
├── quantum.md
└── systems-theory.md

After:
_science/
├── science.md (domain entry)
├── complex-science/
│   ├── complex-science.md (subdomain entry)
│   └── systems-theory.md (nested topic)
├── cosmos/
│   └── cosmos.md (subdomain entry)
├── entropy/
│   └── entropy.md (subdomain entry)
├── environment/
│   └── environment.md (subdomain entry)
├── neuroscience/
│   └── neuroscience.md (subdomain entry)
└── quantum/
    └── quantum.md (subdomain entry)
```

#### Pattern B: Preserve and Formalize Existing Subdirectories (for _computer)
```
Before:
_computer/
├── computer.md
├── encoding.md
├── network.md
├── encoding/
│   ├── emoji.md
│   └── hash-collision.md
└── segments/
    ├── http-request-example.md
    └── http-response-example.md

After:
_computer/
├── computer.md (domain entry)
├── fundamentals/
│   └── computer.md (subdomain entry, moved from root)
├── encoding/
│   ├── encoding.md (subdomain entry, moved from root)
│   ├── emoji.md (keep existing)
│   └── hash-collision.md (keep existing)
└── network/
    ├── network.md (subdomain entry, moved from root)
    └── segments/
        ├── http-request-example.md (keep existing)
        └── http-response-example.md (keep existing)
```

---

## Cross-Domain Links Analysis

**Links FROM these domains:**

| Source | Target | Link Type | Action Required |
|--------|--------|-----------|-----------------|
| _cloud-native/cloud-native.md | /maps/_cloud-native/kubernetes | Internal | Update to /maps/_cloud-native/kubernetes/kubernetes |
| _cloud-native/cloud-native.md | /maps/_cloud-native/sidecar/sidecar | Internal | Keep (path unchanged) |
| _cloud-native/cloud-native.md | /maps/_cloud-native/hardware/arm-on-cloud-native | Internal | Update to /maps/_cloud-native/hardware/arm-on-cloud-native |
| _cloud-native/sidecar/sidecar.md | /maps/_cloud-native/sidecar/service-mesh-without-sidecar | Internal | Keep (path unchanged) |
| _computer/encoding.md | /maps/_computer/encoding/emoji | Internal | Keep (path unchanged) |
| _computer/encoding.md | /maps/_computer/encoding/hash-collision | Internal | Keep (path unchanged) |
| _computer/network.md | ./segments/http-request-example.html | Internal | Update to ./segments/http-request-example |
| _computer/network.md | ./segments/http-response-example.html | Internal | Update to ./segments/http-response-example |
| _product/product.md | /maps/_product/gamification | Internal | Update to /maps/_product/gamification/gamification |
| _product/product.md | /maps/_product/product-hunt | Internal | Update to /maps/_product/product-hunt/product-hunt |
| _product/product.md | /maps/_product/docs/dovetail | Internal | Update to /maps/_product/user-research/dovetail |
| _product/growth.md | /maps/_seo/seo/seo | Cross-domain | Verify after migration |
| _science/complex-science.md | /maps/_science/systems-theory | Internal | Update to /maps/_science/complex-science/systems-theory |
| _science/neuroscience.md | /maps/_person/eratosthenes.html | Cross-domain | Verify target exists |
| _science/cosmos.md | /maps/_person/claudius-ptolemaeus | Cross-domain | Verify target exists |
| _science/cosmos.md | /maps/_person/mikolaj-kopernik.html | Cross-domain | Verify target exists |
| _science/neuroscience.md | /_books/9787508692876 | Cross-domain | Verify target exists |

**Links TO these domains (from 0.index.md):**

Need to verify current links in 0.index.md and update paths for:
- /maps/_cloud-native/* → Update for subdomain structure
- /maps/_computer/* → Update for subdomain structure
- /maps/_product/* → Update for subdomain structure
- /maps/_science/* → Update for subdomain structure

---

## Special Considerations

### 1. _cloud-native serverless.md Content
The `serverless.md` file is essentially a TODO placeholder with only 10 lines. Consider:
- **Option A**: Keep as minimal subdomain entry with TODO section
- **Option B**: Expand content during migration if sources are readily available
- **Recommendation**: Option A - keep minimal, expand in future phase

### 2. _computer computer.md Renaming
The `computer.md` file at root level conflicts with the domain entry naming convention. It should be:
- Moved to `fundamentals/computer.md` as subdomain entry
- Domain entry becomes `computer.md` at root (new file)

### 3. _computer segments/ Location
The `segments/` directory contains HTTP examples used by network.md. Two options:
- **Option A**: Keep at root level as shared resource
- **Option B**: Nest under `network/` since that's the only consumer
- **Recommendation**: Option B - nest under network/ for better cohesion

### 4. _product product-hunt.md Size
At 1011 lines, this is the largest file in the batch. It contains:
- 20+ product categories (Productivity, Engineering, Design, etc.)
- 100+ individual product listings
- Future splitting potential by category
- **For Phase 9**: Keep as single file, consider splitting in future phase

### 5. _product docs/dovetail.md Relocation
The `docs/` subdirectory name is confusing (suggests documentation). Since Dovetail is a user research tool:
- Move to `user-research/dovetail.md`
- Create `user-research/user-research.md` as subdomain entry
- This better reflects the content's actual domain

### 6. _science systems-theory.md Placement
Systems theory is conceptually related to complex science ("老三论" - old three theories). Options:
- **Option A**: Keep as standalone subdomain
- **Option B**: Nest under complex-science/ as related topic
- **Recommendation**: Option B - nest under complex-science/ for conceptual grouping

---

## File Inventory Summary

| Domain | Files | Lines Total | Subdomains | Pattern |
|--------|-------|-------------|------------|---------|
| _cloud-native | 6 | 362 | 4 (kubernetes, serverless, hardware, sidecar) | A: Subdomain with Topics |
| _computer | 7 | 466 | 3 (fundamentals, encoding, network) | B: Preserve Subdirectories |
| _product | 7 | 1285 | 6 (gamification, growth, operation, product-hunt, product-manager, user-research) | A: Subdomain with Topics |
| _science | 7 | 291 | 6 (complex-science, cosmos, entropy, environment, neuroscience, quantum) | A: Subdomain with Topics |
| **Total** | **27** | **2404** | **19 subdomains** | **Mixed** |

---

## Recommended Migration Order

1. **_science** - Cleanest structure, all flat files, no existing subdirectories to handle
2. **_cloud-native** - Existing subdirectories, clear tech boundaries
3. **_product** - Most files, includes large product-hunt.md
4. **_computer** - Most complex, requires careful handling of segments/ relocation

---

## Sources

### Primary (HIGH confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_cloud-native/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_computer/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_product/**/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_science/*.md` - Content analysis
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/08-medium-batch-3/08-RESEARCH.md` - Phase 8 patterns
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/STATE.md` - Project decisions

### Secondary (MEDIUM confidence)
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md` - Cross-link verification

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files examined directly
- Subdomain recommendations: HIGH - Clear content boundaries identified
- Migration patterns: HIGH - Based on validated Phase 8 patterns
- Cross-link inventory: MEDIUM - May have missed dynamic links

**Research date:** 2026-02-24
**Valid until:** Next phase iteration

---

## RESEARCH COMPLETE

**Phase:** 09 - Medium Batch 4
**Confidence:** HIGH

### Key Findings

1. **_cloud-native** needs 4 subdomains: `kubernetes/`, `serverless/`, `hardware/`, `sidecar/` (4 distinct technology areas)
2. **_computer** needs 3 subdomains: `fundamentals/`, `encoding/`, `network/` (3 CS disciplines, with segments/ nested under network/)
3. **_product** needs 6 subdomains: `gamification/`, `growth/`, `operation/`, `product-hunt/`, `product-manager/`, `user-research/` (6 PM disciplines, docs/ renamed to user-research/)
4. **_science** needs 6 subdomains: `complex-science/` (with systems-theory nested), `cosmos/`, `entropy/`, `environment/`, `neuroscience/`, `quantum/` (6 scientific disciplines)
5. **27 total files** to migrate, **19 subdomains** to create/formalize
6. **Cross-domain links** need verification, especially internal domain links and links to _person domain

### File Created
`.planning/phases/09-medium-batch-4/09-RESEARCH.md`

### Open Questions

1. Should _product's product-hunt.md be split by category? (Recommendation: keep whole for Phase 9, consider future split)
2. Should _computer's segments/ stay at root or nest under network/? (Recommendation: nest under network/)
3. Should _science's systems-theory.md be standalone or under complex-science/? (Recommendation: nest under complex-science/)
4. Are there any dynamic links from other content files not captured in the analysis?

### Ready for Planning

Research complete. Planner can now create PLAN.md with specific migration tasks for each domain.
