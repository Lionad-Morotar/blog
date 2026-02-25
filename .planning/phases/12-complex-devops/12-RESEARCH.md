# Phase 12: Complex - DevOps - Research

**Researched:** 2026-02-25
**Domain:** Content Architecture Migration - _devops (12 files)
**Confidence:** HIGH

## Summary

Phase 12 is the SECOND complex domain migration, following the patterns established in Phase 11 (_database). The _devops domain contains 12 files across root and a git/ subdirectory with varying content depths and conceptual relationships.

**Current Structure Analysis:**
- Root files: 9 (devops.md, cicd.md, deploy.md, continuous-compliance.md, docker.md, git.md, gitlab.md, rotatelogs.md, version-control.md)
- git/ subdirectory: 3 files (dorothy.md, gitflow.md, pre-commit-hook.md)

**Key Insight:** The existing structure has a clear git/ subdirectory representing version control workflows, but other files are scattered at the domain root without clear subdomain organization. The content reveals natural groupings around version control, CI/CD pipelines, containerization, and operational tools.

**Primary recommendation:** Create 5 subdomains based on clear technology boundaries: version-control/ (Git + Gitflow + Dorothy + Pre-commit hooks), cicd/ (CI/CD + GitLab + Deploy + Continuous Compliance), container/ (Docker), logging/ (rotatelogs), and devops/ (domain entry with cross-subdomain navigation). This provides a clean cognitive hierarchy while preserving existing content relationships.

---

## Domain Analysis

### Current File Inventory

| File Path | Lines | Content Summary | Current Level |
|-----------|-------|-----------------|---------------|
| devops.md | 18 | Domain entry, links to CI/CD, GitLab, Docker, rotatelogs, Continuous Compliance | Domain (thin) |
| git.md | 403 | Comprehensive Git guide - config, branching, worktree, common issues | Domain (content) |
| gitlab.md | 144 | GitLab CI/CD pipelines - variables, templates, parallel jobs, examples | Domain (content) |
| cicd.md | 61 | CI/CD concepts, DORA metrics, continuous delivery vs deployment | Domain (content) |
| deploy.md | 3 | Minimal - single link to frontend deployment article | Domain (thin) |
| docker.md | 86 | Docker concepts, architecture, commands, multi-platform builds | Domain (content) |
| continuous-compliance.md | 125 | Continuous compliance guide - Policy as Code, SBOM, OSCAL | Domain (content) |
| rotatelogs.md | 95 | Apache rotatelogs tool - pipe mechanism, message boundaries, logrotate comparison | Domain (content) |
| version-control.md | 31 | Version control overview - links to Git, Gitflow, semantic versioning | Domain (thin) |
| git/dorothy.md | 60 | Git commit message convention (personal standard) | Topic (nested) |
| git/gitflow.md | 63 | Gitflow workflow explanation, comparisons, evaluation | Topic (nested) |
| git/pre-commit-hook.md | 181 | Pre-commit hooks guide - AI era importance, implementation | Topic (nested) |

**Total Lines of Content:** ~1,270 lines
**Deepest Nesting:** 2 levels (git/)

---

## Subdomain Analysis

### 1. Version Control

**Current State:**
- `git.md` at domain root (403 lines) - comprehensive Git guide
- `version-control.md` at domain root (31 lines) - overview with links to Git, Gitflow
- `git/dorothy.md` (60 lines) - commit message convention
- `git/gitflow.md` (63 lines) - workflow patterns
- `git/pre-commit-hook.md` (181 lines) - pre-commit hooks

**Content Analysis:**
- git.md: Comprehensive Git operations, configuration, branching, worktree, troubleshooting
- version-control.md: Overview linking to Git and Gitflow, semantic versioning concepts
- dorothy.md: Personal commit message convention based on Conventional Commits
- gitflow.md: Workflow patterns comparison (Centralized, Feature Branch, Forking, Gitflow)
- pre-commit-hook.md: AI-era importance of pre-commit hooks, implementation guide

**Subdomain Recommendation:**
**YES** - Create `version-control/` subdomain, consolidate all version control content

```
_devops/
├── version-control/
│   ├── version-control.md  # Subdomain entry (merged from git.md + version-control.md)
│   ├── gitflow.md          # Moved from git/
│   ├── pre-commit-hook.md  # Moved from git/
│   └── dorothy.md          # Moved from git/
```

**Rationale:**
1. All 5 files relate to version control workflows and practices
2. Current git/ subdirectory already groups 3 files - formalize as version-control/ subdomain
3. version-control.md and git.md both serve as entry points - should merge into single subdomain entry
4. Pre-commit hooks, Gitflow, and Dorothy are all version control workflow topics

**Migration Decision:**
- Merge `git.md` (403 lines, comprehensive) and `version-control.md` (31 lines, overview) into `version-control/version-control.md`
- Move git/dorothy.md → version-control/dorothy.md
- Move git/gitflow.md → version-control/gitflow.md
- Move git/pre-commit-hook.md → version-control/pre-commit-hook.md

**Alternative Considered:** Keep git/ as subdomain name. **Rejected** because:
1. `version-control` is more descriptive of the subdomain's scope
2. Aligns with existing version-control.md file naming
3. Allows for future expansion (other VCS like Sapling mentioned in TODO)

---

### 2. CI/CD

**Current State:**
- `cicd.md` at domain root (61 lines) - CI/CD concepts, DORA metrics
- `gitlab.md` at domain root (144 lines) - GitLab CI/CD pipelines
- `deploy.md` at domain root (3 lines) - minimal deployment link
- `continuous-compliance.md` at domain root (125 lines) - compliance in CI/CD

**Content Analysis:**
- cicd.md: CI/CD fundamentals, DORA metrics (deployment frequency, lead time, MTTR, CFR)
- gitlab.md: GitLab-specific CI/CD implementation - pipelines, variables, templates
- deploy.md: Minimal content - single external link to frontend deployment article
- continuous-compliance.md: Policy as Code, SBOM, OSCAL - compliance automation in pipelines

**Subdomain Recommendation:**
**YES** - Create `cicd/` subdomain

```
_devops/
├── cicd/
│   ├── cicd.md                    # Subdomain entry (keep existing)
│   ├── gitlab.md                  # Moved from root
│   ├── continuous-compliance.md   # Moved from root
│   └── deploy.md                  # Moved from root (or merge into cicd.md)
```

**Rationale:**
1. All 4 files relate to continuous integration, delivery, and deployment
2. GitLab is primarily a CI/CD platform in this context
3. Continuous compliance is specifically about embedding compliance in CI/CD pipelines
4. Deploy is part of the CD (Continuous Deployment) phase

**Migration Decision:**
- Keep cicd.md as subdomain entry
- Move gitlab.md → cicd/gitlab.md
- Move continuous-compliance.md → cicd/continuous-compliance.md
- Consider merging deploy.md (3 lines) into cicd.md or keep as separate topic

**Content Relationship Note:**
- cicd.md discusses DORA metrics and CI/CD concepts
- gitlab.md provides concrete GitLab CI/CD implementation
- continuous-compliance.md extends CI/CD with compliance automation
- deploy.md is minimal - could be expanded or merged

---

### 3. Container

**Current State:**
- `docker.md` at domain root (86 lines)

**Content Analysis:**
- Docker concepts, architecture (Dockerd, Containerd, RunC)
- Common commands, multi-platform builds
- Debugging workflows

**Subdomain Recommendation:**
**YES** - Create `container/` subdomain

```
_devops/
├── container/
│   └── docker.md  # Moved from root
```

**Rationale:**
1. Docker is a container technology - `container` subdomain allows future expansion
2. Future content could include Kubernetes, containerd, podman, etc.
3. Container is a distinct technology category in DevOps

**Alternative Considered:** Keep docker.md at domain root as file-based topic. **Rejected** because:
1. Container is a clear technology boundary
2. Future expansion likely (Kubernetes mentioned in industry context)
3. Consistency with other subdomains - single files can still be in subdomains

---

### 4. Logging

**Current State:**
- `rotatelogs.md` at domain root (95 lines)

**Content Analysis:**
- Apache rotatelogs tool
- Pipe mechanism, message boundaries
- Comparison with logrotate

**Subdomain Recommendation:**
**YES** - Create `logging/` subdomain

```
_devops/
├── logging/
│   └── rotatelogs.md  # Moved from root
```

**Rationale:**
1. Log management is a distinct operational concern
2. Future expansion likely (log aggregation, structured logging, etc.)
3. rotatelogs is one tool in the broader logging ecosystem

**Alternative Considered:** Keep rotatelogs.md at domain root. **Rejected** because:
1. Logging is a clear operational subdomain
2. Consistent with pattern of creating subdomains for distinct technology areas
3. Allows future expansion without restructuring

---

### 5. DevOps Domain Entry

**Current State:**
- `devops.md` at domain root (18 lines)

**Content Analysis:**
- Brief DevOps theory description
- Links to CI/CD, GitLab, Docker, rotatelogs, Continuous Compliance

**Subdomain Recommendation:**
**YES** - Keep `devops.md` as domain entry, update with subdomain navigation

```
_devops/
├── devops.md  # Domain entry with subdomain navigation
```

**Rationale:**
1. Domain entry file required by 4-layer hierarchy pattern
2. Must link to all 4 subdomains: version-control, cicd, container, logging
3. Current content is appropriate but needs link updates

---

## Proposed Final Structure

```
_devops/
├── devops.md                           # Domain entry (UPDATED)
├── version-control/                    # NEW subdomain
│   ├── version-control.md              # Merged from git.md + version-control.md
│   ├── gitflow.md                      # Moved from git/
│   ├── pre-commit-hook.md              # Moved from git/
│   └── dorothy.md                      # Moved from git/
├── cicd/                               # NEW subdomain
│   ├── cicd.md                         # Keep existing
│   ├── gitlab.md                       # Moved from root
│   ├── continuous-compliance.md        # Moved from root
│   └── deploy.md                       # Moved from root
├── container/                          # NEW subdomain
│   └── docker.md                       # Moved from root
└── logging/                            # NEW subdomain
    └── rotatelogs.md                   # Moved from root
```

**Subdomain Count:** 4 subdomains
**Files per Subdomain:**
- version-control/: 4 files (directory-based)
- cicd/: 4 files (directory-based)
- container/: 1 file (file-based pattern)
- logging/: 1 file (file-based pattern)

---

## Hybrid Pattern Application

This phase demonstrates the hybrid pattern for complex domains:

| Subdomain | Files | Pattern | Rationale |
|-----------|-------|---------|-----------|
| version-control/ | 4 | Directory-based | Multiple related workflow topics |
| cicd/ | 4 | Directory-based | Pipeline concepts, implementations, compliance |
| container/ | 1 | File-based | Single topic currently, expansion path |
| logging/ | 1 | File-based | Single topic currently, expansion path |

**Decision Criteria Applied:**
1. **Technology Boundary:** Each subdomain represents a distinct DevOps technology area
2. **Content Volume:** version-control and cicd have substantial content (4 files each)
3. **Cognitive Grouping:** Related concepts consolidated (all version control together, all CI/CD together)
4. **Future Expansion:** container/ and logging/ allow future growth

---

## Cross-Domain Link Updates

The following links need updating:

### In 0.index.md:
| Current Link | New Link | Action |
|--------------|----------|--------|
| `/maps/_devops/devops` | `/maps/_devops/devops` | Keep (no change) |
| `/maps/_devops/version-control` | `/maps/_devops/version-control/version-control` | Update |

### In devops.md:
| Current Link | New Link | Action |
|--------------|----------|--------|
| `/maps/_devops/cicd` | `/maps/_devops/cicd/cicd` | Update |
| `/maps/_devops/gitlab` | `/maps/_devops/cicd/gitlab` | Update |
| `/maps/_devops/docker` | `/maps/_devops/container/docker` | Update |
| `/maps/_devops/rotatelogs` | `/maps/_devops/logging/rotatelogs` | Update |
| `/maps/_devops/continuous-compliance` | `/maps/_devops/cicd/continuous-compliance` | Update |

### In version-control.md (becomes version-control/version-control.md):
| Current Link | New Link | Action |
|--------------|----------|--------|
| `/maps/_devops/git` | `/maps/_devops/version-control/version-control` | Update |
| `/maps/_devops/git/gitflow` | `/maps/_devops/version-control/gitflow` | Update |

### In git.md (merged into version-control.md):
| Current Link | New Link | Action |
|--------------|----------|--------|
| `/maps/_devops/git/pre-commit-hook` | `/maps/_devops/version-control/pre-commit-hook` | Update |
| `/maps/_devops/git/dorothy` | `/maps/_devops/version-control/dorothy` | Update |

### In _policy/policy.md:
| Current Link | New Link | Action |
|--------------|----------|--------|
| `/maps/_devops/continuous-compliance` | `/maps/_devops/cicd/continuous-compliance` | Update |

---

## Patterns from Phase 11 Applied

### 1. Nested Directory Flattening
**Pattern:** When a subdirectory contains only files (no further nesting), keep flattened.
**Application:** git/ has 3 files at single level - move to version-control/ without additional nesting.

### 2. Hyphenated Name Normalization
**Pattern:** Normalize hyphenated names for consistency.
**Application:** Not needed - all names are single words or camelCase.

### 3. Index.md Renaming
**Pattern:** Rename index.md files to {subdomain}.md.
**Application:** Not applicable - no index.md files in _devops.

### 4. Cross-Technology Consolidation
**Pattern:** When related technologies share a fundamental category, consolidate.
**Application:** Git + version-control + Gitflow + pre-commit + Dorothy all under version-control/

### 5. Domain Entry Creation
**Pattern:** Every domain MUST have a {domain}.md entry file with subdomain navigation.
**Application:** devops.md exists but needs updated navigation links.

---

## Risk Analysis

### Risk 1: git.md Content Merge
**Issue:** git.md (403 lines) and version-control.md (31 lines) need merging
**Impact:** Potential loss of content or broken structure
**Mitigation:** Careful merge preserving all H4 knowledge points; git.md content dominates as primary

### Risk 2: URL Changes for git/ Subdirectory
**Issue:** git/dorothy, git/gitflow, git/pre-commit-hook paths change
**Impact:** External links to these paths will break
**Mitigation:** Update all internal links; accept external link breakage per established decision

### Risk 3: Docker Path Change
**Issue:** docker.md moves from root to container/docker.md
**Impact:** Links to /maps/_devops/docker will break
**Mitigation:** Update devops.md and any other internal links

### Risk 4: Deploy.md Minimal Content
**Issue:** deploy.md has only 3 lines (single link)
**Impact:** May not justify separate topic file
**Mitigation:** Consider merging into cicd.md or keeping for future expansion

### Risk 5: GitLab CI/CD vs GitLab Platform
**Issue:** gitlab.md focuses on CI/CD but GitLab is broader
**Impact:** Future GitLab platform content may not fit cicd/ subdomain
**Mitigation:** Current content is CI/CD focused; future expansion can reconsider structure

---

## Open Questions

### 1. Deploy.md Handling
**Question:** Should deploy.md be merged into cicd.md or kept separate?
**Analysis:**
- For: Deploy is conceptually part of CD; minimal content (3 lines) doesn't justify separate file
- Against: Keeping separate allows future expansion on deployment strategies
**Recommendation:** Keep separate for now; content can be expanded later or merged if remains minimal.

### 2. Continuous Compliance Placement
**Question:** Should continuous-compliance be under cicd/ or as separate subdomain?
**Analysis:**
- For cicd/: Content explicitly discusses embedding compliance in CI/CD pipelines
- Against: Compliance could be broader than just CI/CD
**Recommendation:** Keep under cicd/ - content is specifically about CI/CD pipeline compliance.

### 3. Dorothy Naming
**Question:** Should dorothy.md be renamed to something more descriptive?
**Analysis:**
- Dorothy is a personal commit message convention
- Current name is referenced from git.md as "我的提交规范：[Dorothy]"
**Recommendation:** Keep as dorothy.md - the personal nature is documented in the description.

---

## Implementation Notes

### Frontmatter Requirements
All migrated files must include:
```yaml
---
title: [Clear title]
description: [Concise description]
original_path: [Original file path for traceability]
---
```

### Knowledge Point Structure
- H4 headings (`####`) represent atomic knowledge points
- Current files already follow this pattern
- Preserve existing H4 structure during migration

### Navigation Structure
Each subdomain entry file must include:
- Brief subdomain description
- List of topics with links
- Cross-links to related subdomains (where appropriate)

---

## Sources

### Primary (HIGH confidence)
- File content analysis of all 12 _devops files
- Phase 11 complex domain research patterns
- Established 4-layer hierarchy rules from project foundation

### Secondary (MEDIUM confidence)
- DevOps technology categorization (industry standard groupings)
- Content architecture best practices

---

## Metadata

**Confidence breakdown:**
- File inventory: HIGH - Complete enumeration of all files
- Content analysis: HIGH - All files read and categorized
- Structure recommendation: HIGH - Clear technology boundaries
- Pattern application: HIGH - Consistent with Phase 11 patterns

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (30 days for stable content architecture)

---

## RESEARCH COMPLETE

**Phase:** 12 - Complex DevOps
**Confidence:** HIGH

### Key Findings

1. **12 files across 2 locations** - Less fragmented than Phase 11, with clear git/ subdirectory
2. **4 logical subdomains identified** - version-control, cicd, container, logging
3. **Major reorganization needed** - 9 of 12 files move to subdomains
4. **Content merge required** - git.md and version-control.md should merge
5. **git/ subdirectory formalized** - Becomes version-control/ subdomain with 4 files

### File Created
`.planning/phases/12-complex-devops/12-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| File Inventory | HIGH | All 12 files enumerated and analyzed |
| Content Analysis | HIGH | All files read, categorized by topic |
| Structure Design | HIGH | Clear technology boundaries, follows Phase 11 patterns |
| Pattern Application | HIGH | Consistent with established decisions |

### Open Questions
1. Deploy.md handling - recommend keep separate for now
2. Continuous compliance placement - recommend keep under cicd/
3. Dorothy naming - recommend keep as-is

### Ready for Planning
Research complete. Planner can now create PLAN.md files with confidence in subdomain structure and migration approach.
