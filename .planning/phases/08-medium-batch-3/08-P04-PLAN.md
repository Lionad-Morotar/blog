---
phase: 08-medium-batch-3
plan: 04
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_test/test.md
  - content/6.maps/_test/software-testing-engineer/software-testing-engineer.md
  - content/6.maps/_test/tools/tools.md
  - content/6.maps/_test/tools/playwright/playwright.md
  - content/6.maps/_test/methods/methods.md
  - content/6.maps/_test/methods/tcr/tcr.md
  - content/6.maps/_test/ai/ai.md
  - content/6.maps/_test/ai/ai-driven-testing/ai-driven-testing.md
autonomous: true
must_haves:
  truths:
    - _test domain entry file (test.md) updated with proper frontmatter and subdomain navigation
    - software-testing-engineer.md moved to software-testing-engineer/ subdirectory as subdomain entry
    - tools/ directory formalized with tools.md entry and nested playwright content
    - methods/ directory formalized with methods.md entry and nested TCR content
    - ai/ directory formalized with ai.md entry and nested AI-driven testing content
    - original_path preserved in all moved file frontmatter
    - Internal links in test.md updated to new subdomain paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_test/test.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_test/software-testing-engineer/software-testing-engineer.md
      provides: Software testing engineer certification content as subdomain entry with original_path
    - path: content/6.maps/_test/tools/tools.md
      provides: Testing tools subdomain entry with navigation to nested content
    - path: content/6.maps/_test/tools/playwright/playwright.md
      provides: Playwright testing tool nested content with original_path
    - path: content/6.maps/_test/methods/methods.md
      provides: Testing methods subdomain entry with navigation to nested content
    - path: content/6.maps/_test/methods/tcr/tcr.md
      provides: TCR testing method nested content with original_path
    - path: content/6.maps/_test/ai/ai.md
      provides: AI testing subdomain entry with navigation to nested content
    - path: content/6.maps/_test/ai/ai-driven-testing/ai-driven-testing.md
      provides: AI-driven testing nested content with original_path
  key_links:
    - from: content/6.maps/_test/test.md
      to: content/6.maps/_test/software-testing-engineer/software-testing-engineer.md
      via: subdomain navigation link
    - from: content/6.maps/_test/test.md
      to: content/6.maps/_test/tools/tools.md
      via: subdomain navigation link
    - from: content/6.maps/_test/test.md
      to: content/6.maps/_test/methods/methods.md
      via: subdomain navigation link
    - from: content/6.maps/_test/test.md
      to: content/6.maps/_test/ai/ai.md
      via: subdomain navigation link
    - from: content/6.maps/_test/tools/tools.md
      to: content/6.maps/_test/tools/playwright/playwright.md
      via: nested content navigation
    - from: content/6.maps/_test/methods/methods.md
      to: content/6.maps/_test/methods/tcr/tcr.md
      via: nested content navigation
    - from: content/6.maps/_test/ai/ai.md
      to: content/6.maps/_test/ai/ai-driven-testing/ai-driven-testing.md
      via: nested content navigation
    - from: content/6.maps/0.index.md
      to: new _test domain paths
      via: updated cross-domain links
---

# Phase 8-04: Migrate _test Domain (MED-12)

<objective>
Migrate the _test domain to the 4-layer structure by reorganizing content into four subdomains: software-testing-engineer/, tools/ (with nested playwright/), methods/ (with nested tcr/), and ai/ (with nested ai-driven-testing/). The existing test.md becomes the domain entry file.

Purpose: Establish consistent domain structure for software testing knowledge with clear subdomain separation for testing certifications, tools, methodologies, and AI-driven testing approaches.
Output: Domain entry file updated, reorganized content with preserved metadata, and updated internal links.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_test/test.md
@content/6.maps/_test/software-testing-engineer.md
@content/6.maps/_test/tools/playwright.md
@content/6.maps/_test/methods/tcr.md
@content/6.maps/_test/ai/ai-driven-testing.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Update _test domain entry file</name>
  <files>content/6.maps/_test/test.md</files>
  <action>
Update content/6.maps/_test/test.md as the domain entry file:
1. Keep existing YAML frontmatter:
   - title: 软件测试
   - (add description if not present: 软件测试方法、工具与实践)
2. Add ## 子领域 section with links to subdomains:
   * [软件测试员](/maps/_test/software-testing-engineer/software-testing-engineer) - 国家职业资格与认证
   * [测试工具](/maps/_test/tools/tools) - Playwright 等自动化测试工具
   * [测试方法](/maps/_test/methods/methods) - TDD、TCR 等测试驱动方法
   * [AI 测试](/maps/_test/ai/ai) - AI 驱动的测试技术
3. Update existing ## 阅读 section to remove or update links that will be moved
4. Update existing ## 工具 section link:
   - Change `[Playwright](/maps/_test/tools/playwright)` to `[Playwright](/maps/_test/tools/playwright/playwright)`
5. Update existing ## 资格 section link:
   - Change `[计算机软件测试员](/maps/_test/software-testing-engineer)` to `[计算机软件测试员](/maps/_test/software-testing-engineer/software-testing-engineer)`
6. Update existing ## TDD section links:
   - Change `[AI 驱动测试](/maps/_test/ai/ai-driven-testing)` to `[AI 驱动测试](/maps/_test/ai/ai-driven-testing/ai-driven-testing)`
   - Change `[TCR（Test && Commit || Revert）](/maps/_test/methods/tcr)` to `[TCR](/maps/_test/methods/tcr/tcr)`
7. Preserve any other existing content
  </action>
  <verify>File updated with proper frontmatter, subdomain navigation, and updated internal links</verify>
  <done>Domain entry file updated with correct structure, navigation, and preserved content</done>
</task>

<task type="auto">
  <name>Create software-testing-engineer subdomain and migrate content</name>
  <files>content/6.maps/_test/software-testing-engineer/software-testing-engineer.md</files>
  <action>
1. Create directory content/6.maps/_test/software-testing-engineer/
2. Move original content/6.maps/_test/software-testing-engineer.md to content/6.maps/_test/software-testing-engineer/software-testing-engineer.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_test/software-testing-engineer.md
4. Preserve all original content including:
   - 相关资料 section with links to 国家职业标准和真题
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Software-testing-engineer subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create tools subdomain and formalize structure</name>
  <files>content/6.maps/_test/tools/tools.md, content/6.maps/_test/tools/playwright/playwright.md</files>
  <action>
1. Verify directory content/6.maps/_test/tools/ exists
2. Create content/6.maps/_test/tools/tools.md as subdomain entry file with:
   - YAML frontmatter:
     - title: 测试工具
     - description: 自动化测试工具与框架
   - ## 工具 section with link to nested content:
     * [Playwright](/maps/_test/tools/playwright/playwright) - 现代自动化测试框架
   - ## 概述 section briefly describing:
     - Testing tools and frameworks for automated testing
     - Playwright for cross-browser testing
3. Create directory content/6.maps/_test/tools/playwright/
4. Move original content/6.maps/_test/tools/playwright.md to content/6.maps/_test/tools/playwright/playwright.md
5. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_test/tools/playwright.md
6. Preserve all original content including:
   - Playwright 的优点 section (安装方便、理念先进、配套工具)
  </action>
  <verify>
- Directory created
- tools.md entry file created with proper frontmatter
- playwright.md moved to nested location with original_path
- All content preserved
  </verify>
  <done>Tools subdomain formalized with entry file and nested playwright content</done>
</task>

<task type="auto">
  <name>Create methods subdomain and formalize structure</name>
  <files>content/6.maps/_test/methods/methods.md, content/6.maps/_test/methods/tcr/tcr.md</files>
  <action>
1. Verify directory content/6.maps/_test/methods/ exists
2. Create content/6.maps/_test/methods/methods.md as subdomain entry file with:
   - YAML frontmatter:
     - title: 测试方法
     - description: 测试驱动开发与软件测试方法论
   - ## 方法 section with link to nested content:
     * [TCR](/maps/_test/methods/tcr/tcr) - Test && Commit || Revert
   - ## 概述 section briefly describing:
     - Testing methodologies and practices
     - TCR as a disciplined approach to test-driven development
3. Create directory content/6.maps/_test/methods/tcr/
4. Move original content/6.maps/_test/methods/tcr.md to content/6.maps/_test/methods/tcr/tcr.md
5. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_test/methods/tcr.md
6. Preserve all original content including:
   - Brief section with TCR definition
   - Details section with all subsections (背景、核心机制、问题与风险、对比与演进、系统性影响、落地路径)
  </action>
  <verify>
- Directory created
- methods.md entry file created with proper frontmatter
- tcr.md moved to nested location with original_path
- All content preserved
  </verify>
  <done>Methods subdomain formalized with entry file and nested TCR content</done>
</task>

<task type="auto">
  <name>Create ai subdomain and formalize structure</name>
  <files>content/6.maps/_test/ai/ai.md, content/6.maps/_test/ai/ai-driven-testing/ai-driven-testing.md</files>
  <action>
1. Verify directory content/6.maps/_test/ai/ exists
2. Create content/6.maps/_test/ai/ai.md as subdomain entry file with:
   - YAML frontmatter:
     - title: AI 测试
     - description: AI 驱动的测试技术与方法
   - ## 技术 section with link to nested content:
     * [AI 驱动测试](/maps/_test/ai/ai-driven-testing/ai-driven-testing) - AI 驱动的 UI 测试
   - ## 概述 section briefly describing:
     - AI-driven testing approaches and technologies
     - MCP integration with testing frameworks
     - Playwright Agents and emerging AI testing capabilities
3. Create directory content/6.maps/_test/ai/ai-driven-testing/
4. Move original content/6.maps/_test/ai/ai-driven-testing.md to content/6.maps/_test/ai/ai-driven-testing/ai-driven-testing.md
5. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_test/ai/ai-driven-testing.md
6. Preserve all original content including:
   - Brief section with MCP and Playwright integration
   - Details section with all subsections (背景、问题与风险、核心模式、演进对比、系统性影响、落地路径)
  </action>
  <verify>
- Directory created
- ai.md entry file created with proper frontmatter
- ai-driven-testing.md moved to nested location with original_path
- All content preserved
  </verify>
  <done>AI subdomain formalized with entry file and nested AI-driven-testing content</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the link in 0.index.md under ## 测试 section:
- Change `[软件测试](/maps/_test/test)` to `[软件测试](/maps/_test/test)` (no change needed - domain entry stays at same path)

Note: The domain entry path remains `/maps/_test/test` since test.md stays at the root of _test/. Only the internal structure changes.
  </action>
  <verify>Links in 0.index.md are correct (no changes needed for domain entry)</verify>
  <done>Cross-domain links verified (no changes needed for domain entry path)</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_test/test.md updated with proper frontmatter and ## 子领域 section
- [ ] Domain entry has links to all four subdomains
- [ ] content/6.maps/_test/software-testing-engineer/software-testing-engineer.md exists with original content
- [ ] content/6.maps/_test/tools/tools.md exists as subdomain entry
- [ ] content/6.maps/_test/tools/playwright/playwright.md exists with original content
- [ ] content/6.maps/_test/methods/methods.md exists as subdomain entry
- [ ] content/6.maps/_test/methods/tcr/tcr.md exists with original content
- [ ] content/6.maps/_test/ai/ai.md exists as subdomain entry
- [ ] content/6.maps/_test/ai/ai-driven-testing/ai-driven-testing.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] Internal links in test.md updated to new paths
- [ ] All original content preserved
</verification>

<success_criteria>
- _test domain follows 4-layer structure with 4 subdomains
- Domain entry (test.md) provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Nested content (playwright, tcr, ai-driven-testing) accessible via subdomain entries
- Internal cross-links updated to reflect new structure
</success_criteria>

<output>
After completion, create `.planning/phases/08-medium-batch-3/08-P04-SUMMARY.md`
</output>
