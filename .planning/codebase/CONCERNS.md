# Codebase Concerns

**Analysis Date:** 2026-02-24

## Tech Debt

### MathJax Rendering Issues
- **Issue:** MathJax configuration causing display problems with block-level math expressions
- **Files:** `nuxt.config.ts` (lines 176-186), `.todo` (line 1: "fix mathjax")
- **Impact:** Mathematical content not rendering correctly, affecting 21+ markdown files with math content
- **Fix approach:** Review rehype-mathjax configuration, consider alternative math rendering libraries or update to latest version

### Disabled OG Image Generation
- **Issue:** Open Graph image generation disabled due to "twimoji fetch error"
- **Files:** `nuxt.config.ts` (line 30: commented out 'nuxt-og-image')
- **Impact:** Social media sharing previews not generated automatically
- **Fix approach:** Update nuxt-og-image module or configure twimoji source correctly

### TypeScript Strict Mode Disabled
- **Issue:** TypeScript strict mode turned off to avoid type errors
- **Files:** `nuxt.config.ts` (line 148-150)
- **Impact:** Reduced type safety, potential runtime errors not caught at build time
- **Fix approach:** Enable strict mode incrementally, fix type errors systematically

### Experimental Payload Extraction
- **Issue:** Using experimental Nuxt feature without clear migration path
- **Files:** `nuxt.config.ts` (lines 6-8)
- **Impact:** Potential breaking changes in future Nuxt versions
- **Fix approach:** Monitor Nuxt releases for stabilization or deprecation

## Known Issues

### Build Warnings: Hydration Mismatches
- **Issue:** Color mode causes hydration mismatches between server and client
- **Files:** `nuxt.config.ts` (lines 199-205)
- **Current mitigation:** Force light mode as SSR default, let client detect preference
- **Better solution:** Implement proper SSR-safe color mode detection

### Icon Bundle Configuration Required
- **Issue:** Manual icon bundle configuration needed to avoid API 404s
- **Files:** `nuxt.config.ts` (lines 211-219)
- **Impact:** Without explicit client bundle, static hosting fails with hydration errors
- **Current mitigation:** Hardcoded sun/moon icons for UColorModeButton

### Locale Content Detection Complexity
- **Issue:** Complex middleware logic for bilingual content existence checking
- **Files:** `middleware/locale-preference.global.ts`
- **Impact:** Double queryContent calls on every route, potential performance bottleneck
- **Risk:** Race conditions between server and client state

## Security Considerations

### Hardcoded Analytics ID
- **Risk:** Google Analytics ID exposed in configuration
- **Files:** `nuxt.config.ts` (line 36)
- **Current mitigation:** Public ID is acceptable for analytics
- **Recommendation:** Move to environment variable if needs to be private

### Nuxt Studio Token in CI
- **Risk:** Studio token exposed in GitHub Actions workflow
- **Files:** `.github/workflows/studio-nuxt-build.yml` (line 68)
- **Impact:** Token could be misused if repository is public
- **Recommendation:** Move to GitHub Secrets

### Search API Exposes All Content
- **Risk:** Search endpoint returns all markdown content without filtering
- **Files:** `server/api/search.json.get.ts`
- **Current mitigation:** Only queries published content
- **Recommendation:** Add access control if draft content should be excluded

## Performance Bottlenecks

### Large Content Directory
- **Problem:** 543+ markdown files, some very large
- **Files:** `content/6.maps/_frontend/css/0.css-mind-map.md` (809 lines), `content/6.maps/_frontend/javascript/0.javascript-mind-map.md` (502 lines)
- **Impact:** Build times increase with content volume, memory usage during prerender
- **Improvement path:** Implement incremental builds or content pagination

### Client-Side Search Data Loading
- **Problem:** All search data loaded client-side on every page
- **Files:** `app.vue` (lines 17-20)
- **Impact:** Large initial JavaScript payload
- **Current mitigation:** Lazy loading with `useLazyFetch` and `server: false`

### Mermaid Runtime Rendering
- **Problem:** Mermaid diagrams rendered client-side with heavy dependencies
- **Files:** `components/Mermaid.vue`
- **Impact:** Large bundle size, potential layout shift
- **Improvement path:** Pre-render diagrams at build time or use lighter alternative

## Fragile Areas

### Locale Preference Middleware
- **Files:** `middleware/locale-preference.global.ts`, `composables/usePreferredLocale.ts`
- **Why fragile:** Complex client/server state synchronization, relies on process.server checks
- **Safe modification:** Test both SSR and CSR thoroughly, verify state hydration
- **Test coverage:** No automated tests for locale switching logic

### Navigation Filtering
- **Files:** `app.vue` (lines 8-16)
- **Why fragile:** Recursive filtering function with loose typing (any[])
- **Risk:** Can break navigation structure if content hierarchy changes
- **Safe modification:** Add type guards, test with various navigation structures

### Component Global Registration
- **Files:** `nuxt.config.ts` (lines 106-124)
- **Why fragile:** Manual list of components to register globally
- **Risk:** New components may be missed, causing runtime errors
- **Safe modification:** Consider auto-globalization pattern or explicit imports

### Image URL Processing
- **Files:** `app.vue` (lines 74-113)
- **Why fragile:** Magic URL parameters (w=30, w=40, type=mac, etc.) parsed in CSS
- **Risk:** Fragile dependency on URL structure, not documented
- **Safe modification:** Move to explicit component props or documented utility

## Scaling Limits

### Content Build Time
- **Current capacity:** 543 markdown files
- **Limit:** Build time grows linearly with content
- **Scaling path:** Implement ISR (Incremental Static Regeneration) or split builds

### Search Index Size
- **Current capacity:** All content in single JSON endpoint
- **Limit:** `/api/search.json` will grow unbounded
- **Scaling path:** Implement server-side search with filtering/pagination

### Git Repository Size
- **Current state:** Content includes Obsidian plugins directory
- **Limit:** `content/.obsidian/plugins/` contains 10 plugin directories
- **Scaling path:** Add to `.gitignore`, document plugin requirements

## Dependencies at Risk

### Stylus Preprocessor
- **Risk:** Stylus is less maintained than modern alternatives
- **Files:** Used in `app.vue`, various components
- **Impact:** Security patches may stop, compatibility issues with future Node versions
- **Migration plan:** Gradually migrate to SCSS or PostCSS

### Vue 2 Style Component Definitions
- **Risk:** Some components use Options API patterns
- **Files:** `components/Commend/index.vue` (lines 37-53)
- **Impact:** Inconsistent patterns across codebase
- **Migration plan:** Standardize on Composition API with `<script setup>`

### Nuxt UI Pro License Dependency
- **Risk:** Commercial license required for builds
- **Files:** `.github/workflows/studio-nuxt-build.yml` (line 70)
- **Impact:** `NUXT_UI_PRO_LICENSE` secret required for CI
- **Mitigation:** Document license requirement for contributors

## Missing Critical Features

### Error Monitoring
- **What's missing:** No Sentry or similar error tracking
- **Impact:** Production errors go unnoticed
- **Priority:** Medium

### Automated Testing
- **What's missing:** No test suite (unit, integration, or E2E)
- **Impact:** Regressions not caught before deployment
- **Priority:** High

### Content Validation
- **What's missing:** No schema validation for frontmatter
- **Impact:** Invalid content structure can break pages
- **Priority:** Medium

### SEO Meta Validation
- **What's missing:** No automated SEO checking
- **Impact:** Missing meta tags, broken Open Graph
- **Priority:** Low

## Test Coverage Gaps

### No Test Suite
- **What's not tested:** Everything
- **Files:** All source files lack tests
- **Risk:** Any change can break functionality
- **Priority:** Critical - implement testing framework immediately

### Locale Switching Logic
- **What's not tested:** Complex locale preference and redirection
- **Files:** `middleware/locale-preference.global.ts`, `composables/usePreferredLocale.ts`
- **Risk:** Bilingual content routing breaks
- **Priority:** High

### Component Rendering
- **What's not tested:** Mermaid, Commend, Compare components
- **Risk:** Visual regressions in content presentation
- **Priority:** Medium

### Build Process
- **What's not tested:** Full static generation, feed generation, search index
- **Risk:** Build succeeds but output is broken
- **Priority:** High

## Content Management Issues

### Obsidian Configuration in Repo
- **Issue:** `.obsidian/` directory committed to repository
- **Files:** `content/.obsidian/`
- **Impact:** Repository bloat, potential security issues with plugins
- **Fix:** Add to `.gitignore` (partially done but incomplete)

### TODO Items Scattered
- **Issue:** Multiple todo files with different purposes
- **Files:** `.todo` (miscellaneous notes), `todo` (single item), `content/todo/` (directory)
- **Impact:** Unclear project status, lost tasks
- **Fix:** Consolidate into single project management approach

### Mixed Content Languages
- **Issue:** Content in both Chinese and English without clear structure
- **Impact:** SEO challenges, navigation complexity
- **Current mitigation:** `/en/` path prefix convention

---

*Concerns audit: 2026-02-24*
