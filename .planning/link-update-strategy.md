# Link Update Strategy

**Project:** Maps Knowledge Base Refactoring
**Version:** 1.0
**Created:** 2026-02-24
**Reference:** [Link Audit Report](./link-audit.md)

---

## Strategy Overview

### Decision: No Redirects, Direct Updates

Per the decisions in [01-CONTEXT.md](./phases/01-foundation/01-CONTEXT.md), this project adopts a **direct link update approach** rather than implementing URL redirects.

### Why This Approach

| Factor | Rationale |
|--------|-----------|
| **Architecture simplicity** | Avoid maintaining two URL systems (old + new) |
| **Technical debt** | No legacy redirect rules to maintain long-term |
| **Nuxt Content v2 behavior** | Links resolved as-is; no automatic `.md` → route rewriting |
| **Explicit updates** | Forces immediate link maintenance, prevents drift |

### Benefits

- Clean URL structure from day one
- No server-side redirect configuration needed
- Simpler mental model: one path = one location

### Risks

| Risk | Mitigation |
|------|------------|
| Missed links become 404 | Comprehensive audit + grep verification after each move |
| Cross-directory links harder to track | Flagged in link-audit.md with special attention |
| Bulk updates error-prone | Automated scripts with dry-run verification |

---

## Pre-Migration Link Mapping

### Using link-audit.md During Migration

The [Link Audit Report](./link-audit.md) contains 298 links across 71 files. Before migrating any domain:

1. **Identify affected links:**
   ```bash
   grep "_domain-to-migrate" .planning/link-audit.md
   ```

2. **Note link types:**
   - `internal`: Within 6.maps/ — update during migration
   - `cross-dir`: From outside 6.maps/ — high priority
   - `navigation`: In 0.index.md — highest priority

3. **Create per-domain link list:**
   ```markdown
   ## Links to Update for _domain

   | Source | Target | New Target | Type |
   |--------|--------|------------|------|
   | file.md | /maps/_domain/old | /maps/_domain/sub/new | internal |
   ```

### Path Mapping Template

| Old Path | New Path | Status |
|----------|----------|--------|
| `/maps/_domain/file` | `/maps/_domain/subdomain/file` | pending |

---

## Update During Migration

### Step-by-Step Process

1. **Before moving files:**
   ```bash
   # Find all references to the file being moved
   grep -rn "_domain/file" content/ --include="*.md"
   ```

2. **Record current state:**
   - Note all files referencing the target
   - Save grep output for verification

3. **Move the file:**
   ```bash
   git mv old-path new-path
   ```

4. **Update all references:**
   - Edit each referencing file
   - Update link target to new path

5. **Verify no old paths remain:**
   ```bash
   grep -rn "old/path" content/ --include="*.md"
   # Should return empty
   ```

### Update Priority Order

1. **0.index.md navigation links** — Highest visibility, users land here first
2. **Cross-directory links** — From 7.tools/, 8.source-code/, 2.articles/
3. **Internal 6.maps/ links** — Between domains within maps

---

## Link Update Patterns

### Absolute /maps/ Links

```markdown
# Before
[Link text](/maps/_domain/file)

# After (file moved to subdomain)
[Link text](/maps/_domain/subdomain/file)
```

### Relative .md Links

```markdown
# Before
[Link text](./file.md)

# After (within same directory structure)
[Link text](./subdomain/file.md)
```

### Cross-Directory Links

```markdown
# From: 7.tools/tool.md
# Before
[Reference](/maps/_domain/file)

# After
[Reference](/maps/_domain/subdomain/file)
```

### Navigation Links (0.index.md)

```markdown
# Before
* [Domain](/maps/_domain/domain)

# After (with subdomain structure)
* [Domain](/maps/_domain/domain)
  * [Subdomain](/maps/_domain/subdomain/subdomain)
```

---

## Verification Methods

### Post-Migration Grep Check

```bash
# Verify no old paths remain
OLD_PATH="/maps/_domain/old-path"
grep -rn "$OLD_PATH" content/ --include="*.md"

# Expected: no output
```

### Build Verification

```bash
# Verify links resolve correctly
nuxt build

# Or for static generation
nuxt generate

# Watch for "Cannot resolve link" warnings
```

### Link Checker Script

```bash
#!/bin/bash
# check-links.sh

echo "Checking for broken internal links..."

# Find all .md links
grep -rnE '\]\(/maps/[^)]+\)' content/ --include="*.md" | while read line; do
  # Extract path
  path=$(echo "$line" | grep -oE '/maps/[^)]+')
  file=$(echo "$path" | cut -d'/' -f3-)

  # Check if target exists
  if [ ! -f "content/6.maps/${file}.md" ] && [ ! -d "content/6.maps/${file}" ]; then
    echo "Potential broken link: $path"
  fi
done
```

### Manual Spot-Checking

After each phase:
1. Navigate to affected domains in browser
2. Click 3-5 representative links
3. Verify they resolve correctly

---

## Per-Phase Link Update Checklist

### Template for Each Migration Phase

```markdown
## Phase X: Domain Batch Link Update Checklist

### Before Migration
- [ ] Identify all domains in this phase
- [ ] Query link-audit.md for affected links
- [ ] Create per-domain link reference list

### During Migration (per domain)
- [ ] Run grep to find all references
- [ ] Move/rename files
- [ ] Update 0.index.md navigation
- [ ] Update cross-directory links
- [ ] Update internal links

### After Migration
- [ ] Grep verify no old paths remain
- [ ] Run nuxt build check
- [ ] Manual spot-check key links
- [ ] Update link-audit.md status column
```

---

## Automation Options

### When to Use Bulk Updates (sed/awk)

| Scenario | Approach |
|----------|----------|
| Simple path prefix change | `sed` with pattern |
| Multiple files, same pattern | Script with dry-run |
| One-time rename | Manual edit |

### When Manual Updates Are Safer

- Links in complex markdown tables
- Links with special characters
- Navigation files (0.index.md)
- First few migrations (learning phase)

### Example Sed Commands

```bash
# Dry run (show what would change)
sed -n 's|/maps/_domain/old|/maps/_domain/new|p' file.md

# Actual replacement
sed -i '' 's|/maps/_domain/old|/maps/_domain/new|g' file.md

# Multiple files
grep -rl "old-pattern" content/ --include="*.md" | xargs sed -i '' 's|old|new|g'
```

### Safety Measures

1. **Always commit before bulk updates**
2. **Use dry-run first:** `sed -n 's/old/new/p'`
3. **Test on one file before batch**
4. **Verify with grep after**

---

## Rollback Plan

### Handling Mistakes

1. **Don't panic** — All changes are in git
2. **Identify the problem:**
   ```bash
   git diff  # See what changed
   ```
3. **Revert options:**

   **Option A: Revert specific file**
   ```bash
   git checkout -- content/6.maps/problematic-file.md
   ```

   **Option B: Revert entire commit**
   ```bash
   git revert HEAD  # Creates new commit undoing changes
   ```

   **Option C: Reset to last known good**
   ```bash
   git log --oneline  # Find good commit
   git reset --soft HEAD~1  # Undo last commit, keep changes
   ```

### Emergency Reversion Process

```bash
# 1. Stop current work
git status

# 2. Stash any uncommitted changes
git stash

# 3. Revert to last known good state
git revert --no-commit HEAD..<good-commit>

# 4. Verify state
grep -r "problematic-path" content/ --include="*.md"

# 5. Commit reversion
git commit -m "Revert: Emergency rollback of broken links"
```

---

## Appendix: Quick Reference

### Common Grep Patterns

```bash
# Find all /maps/ links
grep -rnE '\]\(/maps/[^)]+\)' content/ --include="*.md"

# Find links to specific domain
grep -rn "/maps/_domain" content/ --include="*.md"

# Find links in specific file
grep -nE '\]\(/maps/' file.md

# Count links per domain
grep -roE '/maps/_[^/]+' content/ --include="*.md" | sort | uniq -c | sort -rn
```

### Common Sed Patterns

```bash
# Replace absolute path
sed -i '' 's|/maps/old|/maps/new|g' file.md

# Replace relative path
sed -i '' 's|\.\./old|\.\./new|g' file.md

# Update multiple patterns in one command
sed -i '' \
  -e 's|pattern1|replacement1|g' \
  -e 's|pattern2|replacement2|g' \
  file.md
```

### Verification Commands

```bash
# Quick link count
grep -rE '\]\(/maps/' content/ --include="*.md" | wc -l

# Find potential orphans (links to non-existent files)
find content/6.maps -name "*.md" | while read f; do
  target=$(basename "$f" .md)
  if ! grep -rq "$target" content/ --include="*.md"; then
    echo "Orphan candidate: $f"
  fi
done

# Build verification
nuxt build 2>&1 | grep -i "link\|resolve\|cannot"
```

---

## Reference

- [Link Audit Report](./link-audit.md) — Complete inventory of 298 links
- [01-CONTEXT.md](./phases/01-foundation/01-CONTEXT.md) — Original link strategy decisions
- [Taxonomy Criteria](./taxonomy-criteria.md) — Domain/subdomain/topic classification

---

*Strategy created: 2026-02-24*
*Applies to: Phase 2-18 migrations*
