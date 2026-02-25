---
phase: 05-simple-batch-4
plan: 05
type: execute
wave: 2
depends_on: ["05-P01", "05-P02", "05-P03"]
files_modified:
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - Cross-domain link to VPN updated to new path
    - Cross-domain link to 重构 updated to new path
    - Cross-domain link to 摄影 updated to new path
  artifacts:
    - path: content/6.maps/0.index.md
      provides: Updated navigation links
  key_links:
    - from: content/6.maps/0.index.md
      to: content/6.maps/_apps/networking/vpn.md
      via: updated link at line 69
    - from: content/6.maps/0.index.md
      to: content/6.maps/_refactor/refactoring/refactor.md
      via: updated link at line 100
    - from: content/6.maps/0.index.md
      to: content/6.maps/_photography/techniques/techniques.md
      via: updated link at line 192
---

# Phase 5-05: Update Cross-Domain Links

<objective>
Update all cross-domain links in 0.index.md to point to the new migrated locations for _apps, _refactor, and _photography domains.

Purpose: Ensure navigation links remain valid after domain migrations.
Output: Updated 0.index.md with correct paths to migrated content.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update links in 0.index.md:

1. Line 69 (应用 section - VPN link):
   - Change: `[VPN](/maps/_apps/vpn)`
   - To: `[VPN](/maps/_apps/networking/vpn)`

2. Line 100 (软件 section - 重构 link):
   - Change: `[重构](/maps/_refactor/refactor)`
   - To: `[重构](/maps/_refactor/refactoring/refactor)`

3. Line 192 (兴趣 section - 摄影 link):
   - Change: `[摄影](/maps/_photography)`
   - To: `[摄影](/maps/_photography/techniques/techniques)`
  </action>
  <verify>
- grep -n "_apps/networking/vpn" content/6.maps/0.index.md shows updated path
- grep -n "_refactor/refactoring/refactor" content/6.maps/0.index.md shows updated path
- grep -n "_photography/techniques/techniques" content/6.maps/0.index.md shows updated path
  </verify>
  <done>All cross-domain links updated to new locations</done>
</task>

</tasks>

<verification>
- [ ] Line 69 updated to /maps/_apps/networking/vpn
- [ ] Line 100 updated to /maps/_refactor/refactoring/refactor
- [ ] Line 192 updated to /maps/_photography/techniques/techniques
- [ ] No old paths remain in 0.index.md for migrated domains
</verification>

<success_criteria>
- All cross-domain navigation links point to correct new locations
- No broken links from 0.index.md to migrated domains
- Consistent link format across all entries
</success_criteria>

<output>
After completion, create `.planning/phases/05-simple-batch-4/05-P05-SUMMARY.md`
</output>
