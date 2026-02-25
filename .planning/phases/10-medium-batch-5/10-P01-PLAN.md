---
phase: 10-medium-batch-5
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_ui/ui.md
  - content/6.maps/_ui/design/design.md
  - content/6.maps/_ui/accessibility/accessibility.md
  - content/6.maps/_ui/typography/typography.md
  - content/6.maps/_ui/inspiration/inspiration.md
  - content/6.maps/_ui/ai-assisted/ai-assisted.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _ui domain entry file exists with proper frontmatter and subdomain navigation
    - design.md moved to design/ subdirectory as subdomain entry (merged with design-philosophy.md and glassmorphism.md)
    - accessibility.md moved to accessibility/ subdirectory as subdomain entry
    - font.md moved to typography/ subdirectory as typography.md subdomain entry
    - awwwards.md moved to inspiration/ subdirectory as inspiration.md subdomain entry
    - gen/ directory relocated to ai-assisted/ subdirectory with genai-for-ui-prototyping.md
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_ui/ui.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_ui/design/design.md
      provides: Design content as subdomain entry with original_path
    - path: content/6.maps/_ui/accessibility/accessibility.md
      provides: Accessibility content as subdomain entry with original_path
    - path: content/6.maps/_ui/typography/typography.md
      provides: Typography content as subdomain entry with original_path
    - path: content/6.maps/_ui/inspiration/inspiration.md
      provides: Inspiration content as subdomain entry with original_path
    - path: content/6.maps/_ui/ai-assisted/ai-assisted.md
      provides: AI-assisted UI content as subdomain entry
    - path: content/6.maps/_ui/ai-assisted/genai-for-ui-prototyping.md
      provides: GenAI UI prototyping content with original_path
  key_links:
    - from: content/6.maps/_ui/ui.md
      to: content/6.maps/_ui/design/design.md
      via: subdomain navigation link
    - from: content/6.maps/_ui/ui.md
      to: content/6.maps/_ui/accessibility/accessibility.md
      via: subdomain navigation link
    - from: content/6.maps/_ui/ui.md
      to: content/6.maps/_ui/typography/typography.md
      via: subdomain navigation link
    - from: content/6.maps/_ui/ui.md
      to: content/6.maps/_ui/inspiration/inspiration.md
      via: subdomain navigation link
    - from: content/6.maps/_ui/ui.md
      to: content/6.maps/_ui/ai-assisted/ai-assisted.md
      via: subdomain navigation link
    - from: content/6.maps/0.index.md
      to: new _ui domain paths
      via: updated cross-domain links
---

# Phase 10-01: Migrate _ui Domain (MED-17)

<objective>
Migrate the _ui domain to the 4-layer structure by creating a domain entry file and organizing 7 files into 5 subdomains: design/, accessibility/, typography/, inspiration/, and ai-assisted/.

Purpose: Establish consistent domain structure for UI knowledge with clear subdomain separation for design principles, accessibility, typography, design inspiration, and AI-assisted UI tools.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_ui/ui.md
@content/6.maps/_ui/design-philosophy.md
@content/6.maps/_ui/accessibility.md
@content/6.maps/_ui/font.md
@content/6.maps/_ui/awwwards.md
@content/6.maps/_ui/glassmorphism.md
@content/6.maps/_ui/gen/genai-for-ui-prototyping.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _ui domain entry file</name>
  <files>content/6.maps/_ui/ui.md</files>
  <action>
Update content/6.maps/_ui/ui.md as the domain entry file with:
1. Keep existing YAML frontmatter (title, description)
2. Add original_path: content/6.maps/_ui/ui.md to frontmatter
3. Replace entire content body with:
   - ## 子领域 section with links to subdomains:
     * [设计](/maps/_ui/design/design) - UI 设计原则、设计哲学、视觉风格
     * [可访问性](/maps/_ui/accessibility/accessibility) - 无障碍设计与 WAI-ARIA
     * [字体排版](/maps/_ui/typography/typography) - 字体设计与排版规范
     * [灵感资源](/maps/_ui/inspiration/inspiration) - 设计灵感与参考资源
     * [AI 辅助设计](/maps/_ui/ai-assisted/ai-assisted) - 生成式 AI 在 UI 设计中的应用
   - ## 概述 section with brief domain overview about UI design as a cross-disciplinary field
4. Preserve the existing frontmatter values exactly
  </action>
  <verify>File exists with proper frontmatter including original_path and subdomain navigation</verify>
  <done>Domain entry file updated with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create design subdomain and migrate content</name>
  <files>content/6.maps/_ui/design/design.md</files>
  <action>
1. Create directory content/6.maps/_ui/design/
2. Create content/6.maps/_ui/design/design.md as subdomain entry with:
   - YAML frontmatter:
     - title: 设计
     - description: UI 设计原则、设计哲学与视觉风格
     - original_path: content/6.maps/_ui/design-philosophy.md
   - Content structure:
     - ## 设计哲学 section with content from design-philosophy.md
     - ## 设计风格 section with content from glassmorphism.md
     - ## 设计规范 section with external links (Apple HIG, etc.)
3. Delete original content/6.maps/_ui/design-philosophy.md after content is preserved
4. Delete original content/6.maps/_ui/glassmorphism.md after content is preserved
5. Ensure all internal knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- design.md created with merged content from design-philosophy.md and glassmorphism.md
- original_path in frontmatter
- Original files removed
  </verify>
  <done>Design subdomain created with merged content and metadata preserved</done>
</task>

<task type="auto">
  <name>Create accessibility subdomain and migrate content</name>
  <files>content/6.maps/_ui/accessibility/accessibility.md</files>
  <action>
1. Create directory content/6.maps/_ui/accessibility/
2. Move original content/6.maps/_ui/accessibility.md to content/6.maps/_ui/accessibility/accessibility.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_ui/accessibility.md
4. Preserve all original content including:
   - 页面观感 section (文字对比度、图片替换文本、可点击元素)
   - WAI section (WCAG, UAAG, ATAG, WAI-ARIA)
   - ARIA section (roles, states & properties)
   - 自动滚动内容的可访问性问题 section
   - 反面教材 section
5. Ensure all knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Accessibility subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create typography subdomain and migrate content</name>
  <files>content/6.maps/_ui/typography/typography.md</files>
  <action>
1. Create directory content/6.maps/_ui/typography/
2. Move original content/6.maps/_ui/font.md to content/6.maps/_ui/typography/typography.md
3. Update frontmatter of moved file:
   - title: 字体排版
   - description: 字体设计、排版规范与可变字体技术
   - original_path: content/6.maps/_ui/font.md
4. Preserve all original content including:
   - line-height and vertical-align deep dive
   - 免费商用字体 section
   - 可变字体 section with hover effects article
5. Ensure all knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Title updated to "字体排版"
  </verify>
  <done>Typography subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create inspiration subdomain and migrate content</name>
  <files>content/6.maps/_ui/inspiration/inspiration.md</files>
  <action>
1. Create directory content/6.maps/_ui/inspiration/
2. Move original content/6.maps/_ui/awwwards.md to content/6.maps/_ui/inspiration/inspiration.md
3. Update frontmatter of moved file:
   - title: 灵感资源
   - description: 设计灵感平台、设计资源与参考网站
   - original_path: content/6.maps/_ui/awwwards.md
4. Preserve all original content including:
   - Awards section (Sites of the Day/Month/Year, etc.)
   - Category section (28 categories)
   - Tag section (25 tags)
   - Technology section (30+ technologies)
   - Country section (15 countries)
   - Collections section (12 collections)
   - Elements section (17 elements)
5. Add ## 设计灵感 section header at the top of content
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Title updated to "灵感资源"
  </verify>
  <done>Inspiration subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create ai-assisted subdomain and migrate content</name>
  <files>content/6.maps/_ui/ai-assisted/ai-assisted.md, content/6.maps/_ui/ai-assisted/genai-for-ui-prototyping.md</files>
  <action>
1. Create directory content/6.maps/_ui/ai-assisted/
2. Move content/6.maps/_ui/gen/genai-for-ui-prototyping.md to content/6.maps/_ui/ai-assisted/genai-for-ui-prototyping.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_ui/gen/genai-for-ui-prototyping.md
4. Create content/6.maps/_ui/ai-assisted/ai-assisted.md as subdomain entry with:
   - YAML frontmatter:
     - title: AI 辅助设计
     - description: 生成式 AI 在 UI 设计与原型制作中的应用
   - Content structure:
     - ## 子领域 section with link to genai-for-ui-prototyping.md
     - ## 概述 section about AI-assisted UI design
5. Remove empty content/6.maps/_ui/gen/ directory after file is moved
  </action>
  <verify>
- Directory created
- genai-for-ui-prototyping.md moved with original_path in frontmatter
- ai-assisted.md subdomain entry created
- gen/ directory removed
  </verify>
  <done>AI-assisted subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## UI section in 0.index.md to point to new subdomain paths:
- `/maps/_ui/ui` -> `/maps/_ui/ui` (domain entry, keep as is)
- `/maps/_ui/font` -> `/maps/_ui/typography/typography`

Keep the link text unchanged:
- [界面设计（UI）](/maps/_ui/ui)
- [字体](/maps/_ui/typography/typography)
  </action>
  <verify>All links in ## UI section updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_ui/ui.md exists with proper frontmatter including original_path
- [ ] Domain entry has ## 子领域 section linking to all five subdomains
- [ ] content/6.maps/_ui/design/design.md exists with merged content from design-philosophy.md and glassmorphism.md
- [ ] content/6.maps/_ui/accessibility/accessibility.md exists with original content
- [ ] content/6.maps/_ui/typography/typography.md exists (migrated from font.md)
- [ ] content/6.maps/_ui/inspiration/inspiration.md exists (migrated from awwwards.md)
- [ ] content/6.maps/_ui/ai-assisted/ai-assisted.md exists as subdomain entry
- [ ] content/6.maps/_ui/ai-assisted/genai-for-ui-prototyping.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] Original files (design-philosophy.md, glassmorphism.md, font.md, awwwards.md, accessibility.md) removed
- [ ] gen/ directory removed
- [ ] Links in 0.index.md ## UI section updated
</verification>

<success_criteria>
- _ui domain follows 4-layer structure with 5 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- design.md contains merged content from design-philosophy.md and glassmorphism.md
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/10-medium-batch-5/10-P01-SUMMARY.md`
</output>
