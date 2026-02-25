---
phase: 07-medium-batch-2
plan: 04
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_docs/docs.md
  - content/6.maps/_docs/doc-manage/doc-manage.md
  - content/6.maps/_docs/doc-manage/sdd.md
  - content/6.maps/_docs/tech-docs/tech-docs.md
  - content/6.maps/_docs/tech-docs/knowledge-flow.md
autonomous: true
must_haves:
  truths:
    - _docs domain entry file exists with proper frontmatter and subdomain navigation
    - doc-manage/ subdirectory formalized as subdomain with entry file and sdd topic
    - tech-docs/ subdirectory formalized as subdomain with entry file and knowledge-flow topic
    - original_path preserved in all moved file frontmatter
    - Internal links in doc-manage.md and tech-docs.md updated to new paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_docs/docs.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_docs/doc-manage/doc-manage.md
      provides: Document management subdomain entry
    - path: content/6.maps/_docs/doc-manage/sdd.md
      provides: Spec-driven development content with original_path
    - path: content/6.maps/_docs/tech-docs/tech-docs.md
      provides: Technical documentation subdomain entry
    - path: content/6.maps/_docs/tech-docs/knowledge-flow.md
      provides: Knowledge flow content with original_path
  key_links:
    - from: content/6.maps/_docs/docs.md
      to: content/6.maps/_docs/doc-manage/doc-manage.md
      via: subdomain navigation link
    - from: content/6.maps/_docs/docs.md
      to: content/6.maps/_docs/tech-docs/tech-docs.md
      via: subdomain navigation link
    - from: content/6.maps/_docs/doc-manage/doc-manage.md
      to: content/6.maps/_docs/doc-manage/sdd.md
      via: internal subdomain link
    - from: content/6.maps/_docs/tech-docs/tech-docs.md
      to: content/6.maps/_docs/tech-docs/knowledge-flow.md
      via: internal subdomain link
    - from: content/6.maps/0.index.md
      to: new _docs domain paths
      via: updated cross-domain links
---

# Phase 7-04: Migrate _docs Domain

<objective>
Migrate the _docs domain to the 4-layer structure by creating a domain entry file and formalizing the existing subdirectory structure into two subdomains: doc-manage/ and tech-docs/.

Purpose: Establish consistent domain structure for documentation knowledge with clear subdomain separation for document management practices and technical writing concepts.
Output: Domain entry file and formalized subdomains with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_docs/doc-manage/doc-manage.md
@content/6.maps/_docs/doc-manage/sdd.md
@content/6.maps/_docs/tech-docs/tech-docs.md
@content/6.maps/_docs/tech-docs/knowledge-flow.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _docs domain entry file</name>
  <files>content/6.maps/_docs/docs.md</files>
  <action>
Create content/6.maps/_docs/docs.md as the domain entry file with:
1. YAML frontmatter:
   - title: 文档
   - description: 文档管理与技术写作
2. ## 子领域 section with links to subdomains:
   * [文档管理](/maps/_docs/doc-manage/doc-manage)
   * [技术文档](/maps/_docs/tech-docs/tech-docs)
3. ## 概述 section with brief domain overview mentioning:
   - Document management practices and methodologies
   - Technical writing and knowledge management concepts
   - Spec-driven development and knowledge flow
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Formalize doc-manage subdomain</name>
  <files>
    content/6.maps/_docs/doc-manage/doc-manage.md
    content/6.maps/_docs/doc-manage/sdd.md
  </files>
  <action>
1. Verify directory content/6.maps/_docs/doc-manage/ exists
2. Update content/6.maps/_docs/doc-manage/doc-manage.md:
   - Keep existing frontmatter (title: 文档管理)
   - Add description if not present: 文档管理相关
   - Add original_path: content/6.maps/_docs/doc-manage/doc-manage.md
   - Update internal link: change `/maps/_docs/doc-manage/sdd` to `/maps/_docs/doc-manage/sdd`
   - Preserve Cross Domain section with SDD link
3. Update content/6.maps/_docs/doc-manage/sdd.md:
   - Keep existing frontmatter (title: 规格驱动开发（SDD）)
   - Add original_path: content/6.maps/_docs/doc-manage/sdd.md
   - Preserve all original content including:
     - Brief section explaining spec-driven development
     - Tool references (Kiro, spec-kit, Tessl)
  </action>
  <verify>
- Directory exists
- doc-manage.md has proper frontmatter with original_path
- sdd.md has proper frontmatter with original_path
- Internal links preserved
- All content preserved
  </verify>
  <done>Doc-manage subdomain formalized with proper structure</done>
</task>

<task type="auto">
  <name>Formalize tech-docs subdomain</name>
  <files>
    content/6.maps/_docs/tech-docs/tech-docs.md
    content/6.maps/_docs/tech-docs/knowledge-flow.md
  </files>
  <action>
1. Verify directory content/6.maps/_docs/tech-docs/ exists
2. Update content/6.maps/_docs/tech-docs/tech-docs.md:
   - Keep existing frontmatter (title: 技术文档)
   - Add description if not present: 技术文档与知识管理
   - Add original_path: content/6.maps/_docs/tech-docs/tech-docs.md
   - Update internal link: change `/maps/_docs/tech-docs/knowledge-flow` to `/maps/_docs/tech-docs/knowledge-flow`
   - Preserve Domain section with Knowledge flow link
3. Update content/6.maps/_docs/tech-docs/knowledge-flow.md:
   - Keep existing frontmatter (title: 知识流优于知识库存)
   - Add original_path: content/6.maps/_docs/tech-docs/knowledge-flow.md
   - Preserve all original content including:
     - Brief section
     - Details section (背景与现状, 问题与风险, etc.)
  </action>
  <verify>
- Directory exists
- tech-docs.md has proper frontmatter with original_path
- knowledge-flow.md has proper frontmatter with original_path
- Internal links preserved
- All content preserved
  </verify>
  <done>Tech-docs subdomain formalized with proper structure</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the links in 0.index.md under ## 文档 section:
- Change `[技术文档](/maps/_docs/tech-docs/tech-docs)` to `[技术文档](/maps/_docs/tech-docs/tech-docs)` (verify path)
- Change `[文档管理](/maps/_docs/doc-manage/doc-manage)` to `[文档管理](/maps/_docs/doc-manage/doc-manage)` (verify path)
  </action>
  <verify>Links in 0.index.md point to correct paths</verify>
  <done>Cross-domain links verified</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_docs/docs.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to both subdomains
- [ ] content/6.maps/_docs/doc-manage/doc-manage.md has proper frontmatter with original_path
- [ ] content/6.maps/_docs/doc-manage/sdd.md has proper frontmatter with original_path
- [ ] content/6.maps/_docs/tech-docs/tech-docs.md has proper frontmatter with original_path
- [ ] content/6.maps/_docs/tech-docs/knowledge-flow.md has proper frontmatter with original_path
- [ ] Internal links in subdomain entry files preserved
- [ ] 0.index.md links are correct
- [ ] All original content preserved
</verification>

<success_criteria>
- _docs domain follows 4-layer structure with 2 subdomains
- Domain entry provides clear navigation to both subdomains
- Each subdomain has entry file linking to its topics
- All files have original_path metadata preserved
- Cross-domain links in 0.index.md point to correct paths
</success_criteria>

<output>
After completion, create `.planning/phases/07-medium-batch-2/07-P04-SUMMARY.md`
</output>
