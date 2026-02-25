---
phase: 10-medium-batch-5
plan: 03
type: execute
wave: 2
depends_on: ['10-P02']
files_modified:
  - content/6.maps/_web/web.md
  - content/6.maps/_web/browser/browser.md
  - content/6.maps/_web/performance/performance.md
  - content/6.maps/_web/security/security.md
  - content/6.maps/_web/crawler/crawler.md
  - content/6.maps/_web/miniapp/miniapp.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _web domain entry file exists with proper frontmatter and subdomain navigation
    - browser/ directory formalized with browser.md subdomain entry (moved from index.md)
    - performance.md moved to performance/ subdirectory as subdomain entry
    - security.md moved to security/ subdirectory as subdomain entry (merged with oauth.md)
    - crawler.md moved to crawler/ subdirectory as subdomain entry
    - miniapp.md moved to miniapp/ subdirectory as subdomain entry
    - browser-api/ directory merged into browser/ subdirectory
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_web/web.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_web/browser/browser.md
      provides: Browser content as subdomain entry with original_path (from browser/index.md)
    - path: content/6.maps/_web/browser/browser-engine.md
      provides: Browser engine content with original_path
    - path: content/6.maps/_web/browser/principle.md
      provides: Browser principle content with original_path
    - path: content/6.maps/_web/browser/new.md
      provides: Browser new features content with original_path
    - path: content/6.maps/_web/browser/router.md
      provides: Browser router content with original_path
    - path: content/6.maps/_web/browser/crypto.md
      provides: Web Crypto API content with original_path (from browser-api/)
    - path: content/6.maps/_web/performance/performance.md
      provides: Performance content as subdomain entry with original_path
    - path: content/6.maps/_web/security/security.md
      provides: Security content as subdomain entry with original_path (merged with oauth.md)
    - path: content/6.maps/_web/crawler/crawler.md
      provides: Crawler content as subdomain entry with original_path
    - path: content/6.maps/_web/miniapp/miniapp.md
      provides: Miniapp content as subdomain entry with original_path
  key_links:
    - from: content/6.maps/_web/web.md
      to: content/6.maps/_web/browser/browser.md
      via: subdomain navigation link
    - from: content/6.maps/_web/web.md
      to: content/6.maps/_web/performance/performance.md
      via: subdomain navigation link
    - from: content/6.maps/_web/web.md
      to: content/6.maps/_web/security/security.md
      via: subdomain navigation link
    - from: content/6.maps/_web/web.md
      to: content/6.maps/_web/crawler/crawler.md
      via: subdomain navigation link
    - from: content/6.maps/_web/web.md
      to: content/6.maps/_web/miniapp/miniapp.md
      via: subdomain navigation link
    - from: content/6.maps/_web/browser/browser.md
      to: content/6.maps/_web/browser/browser-engine.md
      via: internal topic link
    - from: content/6.maps/_web/browser/browser.md
      to: content/6.maps/_web/browser/principle.md
      via: internal topic link
    - from: content/6.maps/_web/security/security.md
      to: content/6.maps/_web/browser/crypto.md
      via: internal cross-reference link
    - from: content/6.maps/0.index.md
      to: new _web domain paths
      via: updated cross-domain links
---

# Phase 10-03: Migrate _web Domain (MED-19)

<objective>
Migrate the _web domain to the 4-layer structure by creating a domain entry file and organizing 10 files into 5 subdomains: browser/, performance/, security/, crawler/, and miniapp/. The browser/ directory already exists as nested structure and will be formalized. The browser-api/ directory will be merged into browser/.

Purpose: Establish consistent domain structure for Web knowledge with clear subdomain separation for browser technology, web performance, security, crawlers, and mini-programs.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_web/browser/index.md
@content/6.maps/_web/browser/browser-engine.md
@content/6.maps/_web/browser/principle.md
@content/6.maps/_web/browser/new.md
@content/6.maps/_web/browser/router.md
@content/6.maps/_web/performance.md
@content/6.maps/_web/security.md
@content/6.maps/_web/crawler.md
@content/6.maps/_web/miniapp.md
@content/6.maps/_web/oauth.md
@content/6.maps/_web/browser-api/crypto.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _web domain entry file</name>
  <files>content/6.maps/_web/web.md</files>
  <action>
Create content/6.maps/_web/web.md as the domain entry file with:
1. YAML frontmatter:
   - title: Web 技术
   - description: Web 开发技术，包括浏览器原理、性能优化、安全、爬虫和小程序
2. ## 子领域 section with links to subdomains:
   * [浏览器](/maps/_web/browser/browser) - 浏览器引擎、原理与新特性
   * [性能优化](/maps/_web/performance/performance) - 网页性能指标与优化策略
   * [安全](/maps/_web/security/security) - Web 安全、OAuth 与加密
   * [爬虫](/maps/_web/crawler/crawler) - 网络爬虫与反爬虫技术
   * [小程序](/maps/_web/miniapp/miniapp) - 微信小程序与多端框架
3. ## 概述 section with brief domain overview about Web technologies
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Formalize browser subdomain structure</name>
  <files>content/6.maps/_web/browser/browser.md</files>
  <action>
1. Move content/6.maps/_web/browser/index.md to content/6.maps/_web/browser/browser.md
2. Update frontmatter of moved file:
   - title: 浏览器
   - description: 浏览器引擎、原理、新特性与开发技术
   - original_path: content/6.maps/_web/browser/index.md
3. Preserve all original content including:
   - 浏览器引擎 section with link to browser-engine.md
   - 浏览器原理 section with link to principle.md
   - 浏览器新特性 section with link to new.md
   - BaseLine section
   - 浏览器插件 section
   - 浏览器开发 section (事件捕获、passive true、BFCache、跨页面通信、Compression Streams、EventSource)
   - 调试 section (代码覆盖率)
4. Update internal links in browser.md to reflect that files are now in same directory:
   - `/maps/_web/browser/browser-engine` -> `./browser-engine` or keep as-is
   - `/maps/_web/browser/principle` -> `./principle` or keep as-is
   - `/maps/_web/browser/new` -> `./new` or keep as-is
   - `/maps/_web/browser/router` -> `./router` or keep as-is
5. Ensure nested files remain in place and add original_path to their frontmatter:
   - browser-engine.md: original_path: content/6.maps/_web/browser/browser-engine.md
   - principle.md: original_path: content/6.maps/_web/browser/principle.md
   - new.md: original_path: content/6.maps/_web/browser/new.md
   - router.md: original_path: content/6.maps/_web/browser/router.md
  </action>
  <verify>
- browser.md created from index.md with original_path
- All nested files remain in browser/ directory
- original_path added to all nested file frontmatter
- Internal links updated if needed
  </verify>
  <done>Browser subdomain formalized with entry file and nested content preserved</done>
</task>

<task type="auto">
  <name>Merge browser-api into browser subdomain</name>
  <files>content/6.maps/_web/browser/crypto.md</files>
  <action>
1. Move content/6.maps/_web/browser-api/crypto.md to content/6.maps/_web/browser/crypto.md
2. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_web/browser-api/crypto.md
3. Preserve all original content including:
   - TODO section with all crypto topics (对称加密、密钥管理、哈希算法、随机数生成等)
4. Remove empty content/6.maps/_web/browser-api/ directory after file is moved
5. Update link in security.md from `/maps/_web/browser-api/crypto` to `/maps/_web/browser/crypto`
  </action>
  <verify>
- crypto.md moved to browser/ directory
- original_path in frontmatter
- browser-api/ directory removed
- Link in security.md updated
  </verify>
  <done>Browser-api merged into browser subdomain</done>
</task>

<task type="auto">
  <name>Create performance subdomain and migrate content</name>
  <files>content/6.maps/_web/performance/performance.md</files>
  <action>
1. Create directory content/6.maps/_web/performance/
2. Move original content/6.maps/_web/performance.md to content/6.maps/_web/performance/performance.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_web/performance.md
4. Preserve all original content including:
   - 指标与模型 section (Web Vitals, LCP, FID, CLS, SYN vs RUM)
   - 如何测量性能指标 section (PerformanceObserver, Long Tasks API, etc.)
   - 性能优化 section
   - SSR 及混合应用优化 section (Speculation Rules, Prerender, CSR, NSR, etc.)
   - 阅读更多 section with React 16 optimization guide
5. Ensure all knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Performance subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create security subdomain and merge content</name>
  <files>content/6.maps/_web/security/security.md</files>
  <action>
1. Create directory content/6.maps/_web/security/
2. Create content/6.maps/_web/security/security.md as subdomain entry with merged content:
   - YAML frontmatter:
     - title: Web 安全
     - description: Web 安全技术、OAuth 协议与加密算法
     - original_path: content/6.maps/_web/security.md
   - Content structure:
     - ## 领域 section with links:
       * [Web Crypto API](/maps/_web/browser/crypto) - Web 加密 API
     - ## 安全概念 section with content from security.md:
       * XSS 原理与防范
       * CSRF 原理与防范
       * CSS Exfiltration 攻击
     - ## 用户追踪技术 section from security.md
     - ## OAuth section with content from oauth.md:
       * OAuth 的本质
       * 授权码流程
       * 核心术语
       * PKCE
       * OIDC
       * 安全设计原则
3. Delete original content/6.maps/_web/oauth.md after content is preserved
4. Delete original content/6.maps/_web/security.md after content is preserved
  </action>
  <verify>
- Directory created
- security.md created with merged content from security.md and oauth.md
- original_path in frontmatter
- Original files removed
  </verify>
  <done>Security subdomain created with merged content and metadata preserved</done>
</task>

<task type="auto">
  <name>Create crawler subdomain and migrate content</name>
  <files>content/6.maps/_web/crawler/crawler.md</files>
  <action>
1. Create directory content/6.maps/_web/crawler/
2. Move original content/6.maps/_web/crawler.md to content/6.maps/_web/crawler/crawler.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_web/crawler.md
4. Preserve all original content including:
   - 技术问题 section (反爬虫策略、JS 加密破解、多进程选择、增量爬取、相似性判断、架构技巧、抓取极限测试)
   - 调试工具 section (puppeteer-heap-snapshot)
   - Links section
5. Ensure all knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Crawler subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create miniapp subdomain and migrate content</name>
  <files>content/6.maps/_web/miniapp/miniapp.md</files>
  <action>
1. Create directory content/6.maps/_web/miniapp/
2. Move original content/6.maps/_web/miniapp.md to content/6.maps/_web/miniapp/miniapp.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_web/miniapp.md
4. Preserve all original content including:
   - 技术 section (五篇文章、底层框架、技术原理分析)
   - 常见问题 section (分包异步化、版本更新时机、Grid 布局支持)
   - 框架对比 section (多端框架测评、Chameleon 多态协议)
5. Ensure all knowledge points remain as H4 headings
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Miniapp subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## Web section in 0.index.md to point to new subdomain paths:
- `/maps/_web/browser` -> `/maps/_web/browser/browser`
- `/maps/_web/performance` -> `/maps/_web/performance/performance`
- `/maps/_web/crawler` -> `/maps/_web/crawler/crawler`
- `/maps/_web/security` -> `/maps/_web/security/security`

Update the ## 跨端 section in 0.index.md:
- `/maps/_web/miniapp` -> `/maps/_web/miniapp/miniapp`

Keep the link text unchanged:
- [浏览器](/maps/_web/browser/browser)
- [页面性能](/maps/_web/performance/performance)
- [爬虫](/maps/_web/crawler/crawler)
- [安全](/maps/_web/security/security)
- [小程序](/maps/_web/miniapp/miniapp)
  </action>
  <verify>All 5 links in ## Web and ## 跨端 sections updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_web/web.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all five subdomains
- [ ] content/6.maps/_web/browser/browser.md exists (moved from index.md)
- [ ] content/6.maps/_web/browser/browser-engine.md exists with original_path
- [ ] content/6.maps/_web/browser/principle.md exists with original_path
- [ ] content/6.maps/_web/browser/new.md exists with original_path
- [ ] content/6.maps/_web/browser/router.md exists with original_path
- [ ] content/6.maps/_web/browser/crypto.md exists (moved from browser-api/) with original_path
- [ ] content/6.maps/_web/performance/performance.md exists (migrated from performance.md)
- [ ] content/6.maps/_web/security/security.md exists (merged from security.md and oauth.md)
- [ ] content/6.maps/_web/crawler/crawler.md exists (migrated from crawler.md)
- [ ] content/6.maps/_web/miniapp/miniapp.md exists (migrated from miniapp.md)
- [ ] All moved files have original_path in frontmatter
- [ ] Original files (index.md, performance.md, security.md, crawler.md, miniapp.md, oauth.md) removed
- [ ] browser-api/ directory removed
- [ ] All 5 links in 0.index.md updated (browser, performance, crawler, security, miniapp)
</verification>

<success_criteria>
- _web domain follows 4-layer structure with 5 subdomains
- Domain entry provides clear navigation to all subdomains
- browser/ directory properly formalized with subdomain entry and nested content
- browser-api/ merged into browser/ subdirectory
- security.md contains merged content from security.md and oauth.md
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/10-medium-batch-5/10-P03-SUMMARY.md`
</output>
