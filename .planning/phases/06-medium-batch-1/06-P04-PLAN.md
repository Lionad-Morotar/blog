---
phase: 06-medium-batch-1
plan: 04
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_server/server.md
  - content/6.maps/_server/nodejs/index.md
  - content/6.maps/_server/nodejs/source/require.md
autonomous: true
must_haves:
  truths:
    - _server domain entry file exists with proper frontmatter and subdomain navigation
    - nodejs/ directory preserved as formal subdomain
    - index.md moved to nodejs/nodejs.md with original_path preserved
    - source/require.md remains in nodejs/source/ with original_path preserved
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_server/server.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_server/nodejs/nodejs.md
      provides: NodeJS subdomain entry with original_path
    - path: content/6.maps/_server/nodejs/source/require.md
      provides: NodeJS source analysis with original_path
  key_links:
    - from: content/6.maps/_server/server.md
      to: content/6.maps/_server/nodejs/nodejs
      via: subdomain navigation link
    - from: content/6.maps/_server/nodejs/nodejs.md
      to: content/6.maps/_server/nodejs/source/require
      via: internal navigation link
    - from: content/6.maps/0.index.md
      to: new server domain paths
      via: updated cross-domain links
---

# Phase 6-04: Migrate _server Domain

<objective>
Migrate the _server domain to the 4-layer structure by creating a domain entry file and formalizing the nodejs/ directory as a subdomain. The existing nodejs/index.md will be renamed to nodejs/nodejs.md for consistency.

Purpose: Establish consistent domain structure for server-side knowledge with formalized nodejs subdomain.
Output: Domain entry file and reorganized nodejs subdomain with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_server/nodejs/index.md
@content/6.maps/_server/nodejs/source/require.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _server domain entry file</name>
  <files>content/6.maps/_server/server.md</files>
  <action>
Create content/6.maps/_server/server.md as the domain entry file with:
1. YAML frontmatter:
   - title: 服务端
   - description: 服务端技术、NodeJS 及服务器相关知识
2. ## 子领域 section with link to nodejs subdomain:
   * [NodeJS](/maps/_server/nodejs/nodejs)
3. ## 概述 section with brief domain overview mentioning server-side technologies and NodeJS
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Formalize nodejs subdomain structure</name>
  <files>
    content/6.maps/_server/nodejs/nodejs.md
    content/6.maps/_server/nodejs/source/require.md
  </files>
  <action>
1. Rename content/6.maps/_server/nodejs/index.md to content/6.maps/_server/nodejs/nodejs.md
2. Update frontmatter of nodejs.md to add:
   - original_path: content/6.maps/_server/nodejs/index.md
3. Update internal links in nodejs.md:
   - Change `[NodeJS | require](/maps/_server/nodejs/source/require)` to preserve the link (path remains valid)
4. Update frontmatter of content/6.maps/_server/nodejs/source/require.md to add:
   - original_path: content/6.maps/_server/nodejs/source/require.md
5. Preserve all original content in both files including:
   - nodejs.md: NodeJS 简介, V8, API, 源码解析, 调试
   - require.md: require 源码解析
  </action>
  <verify>
- index.md renamed to nodejs.md
- Both files have original_path in frontmatter
- Internal links preserved
- All original content preserved
  </verify>
  <done>Nodejs subdomain formalized with renamed entry and preserved source content</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the link in 0.index.md under ## 服务端 section:
- Change `[NodeJS](/maps/_server/nodejs)` to `[NodeJS](/maps/_server/nodejs/nodejs)`
  </action>
  <verify>Link in 0.index.md points to new path</verify>
  <done>Cross-domain link updated to reflect new structure</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_server/server.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to /maps/_server/nodejs/nodejs
- [ ] content/6.maps/_server/nodejs/nodejs.md exists (renamed from index.md)
- [ ] nodejs.md has original_path: content/6.maps/_server/nodejs/index.md in frontmatter
- [ ] content/6.maps/_server/nodejs/source/require.md has original_path in frontmatter
- [ ] All original content preserved in both files
- [ ] 0.index.md link updated to /maps/_server/nodejs/nodejs
</verification>

<success_criteria>
- _server domain follows 4-layer structure with formalized nodejs subdomain
- Domain entry provides clear navigation to nodejs subdomain
- Nodejs subdomain has consistent naming (nodejs.md instead of index.md)
- Original content accessible at new locations with preserved history
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/06-medium-batch-1/06-P04-SUMMARY.md`
</output>
