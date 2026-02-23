# Architecture

**Analysis Date:** 2026-02-24

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Content-Driven Architecture

**Key Characteristics:**
- Content-centric static site built with Nuxt.js 3
- File-based content management using Markdown with YAML frontmatter
- Bilingual (zh/en) content with automatic locale routing
- Component-based Vue 3 architecture with composition API
- Pre-rendered static output for deployment

## Layers

**Presentation Layer:**
- Purpose: UI rendering and user interaction
- Location: `components/`, `pages/`, `layouts/`
- Contains: Vue components, page templates, layout wrappers
- Depends on: Content layer, Composables
- Used by: Nuxt framework (auto-routing)

**Content Layer:**
- Purpose: Markdown content with structured metadata
- Location: `content/`
- Contains: Markdown files (.md), YAML config (.yml), organized by content type
- Depends on: Nuxt Content module
- Used by: Pages via queryContent() composable

**Routing Layer:**
- Purpose: Navigation and URL handling
- Location: `pages/`, `middleware/`
- Contains: Page components, route middleware
- Depends on: Nuxt router, Content layer
- Used by: Application navigation

**Logic Layer:**
- Purpose: Reusable business logic and state
- Location: `composables/`, `utils/`
- Contains: Composables (usePreferredLocale), utility functions (locale.ts)
- Depends on: Vue 3 composition API
- Used by: Components and pages

**API Layer:**
- Purpose: Server-side data endpoints
- Location: `server/api/`
- Contains: API routes for search functionality
- Depends on: Nitro server engine
- Used by: Client-side search component

**Configuration Layer:**
- Purpose: Site configuration and theming
- Location: `app.config.ts`, `nuxt.config.ts`, `tailwind.config.ts`
- Contains: UI theming, module configuration, build settings
- Depends on: Nuxt UI Pro, Tailwind CSS
- Used by: Entire application

## Data Flow

**Content Rendering Flow:**

1. **Build Time:**
   - Nuxt Content module scans `content/` directory
   - Markdown files parsed with YAML frontmatter and body content
   - Content indexed for querying

2. **Request Time (SSR/SSG):**
   - Route matched via file-based routing (`pages/[...slug].vue`)
   - Locale middleware checks content availability and redirects if needed
   - Page queries content using `queryContent()` with path
   - Content rendered through `<ContentRenderer>` component

3. **Client Navigation:**
   - NuxtLink triggers client-side navigation
   - Content fetched via API if not already loaded
   - TOC and navigation updated reactively

**Locale Handling Flow:**

1. **Server-side:**
   - Middleware detects locale from URL path (/en/* or /*)
   - Queries content availability for both locales
   - Redirects to available locale if content missing

2. **Client-side:**
   - User preference stored in localStorage
   - Locale switcher checks content availability
   - Navigation to preferred locale if available

**Search Flow:**

1. Page loads search component with navigation data
2. Search API endpoint queries all markdown content
3. Client-side search UI filters and displays results
4. Navigation to selected content page

## Key Abstractions

**Content Query:**
- Purpose: Retrieve and filter markdown content
- Examples: `queryContent(route.path).findOne()`, `queryContent().where({...}).find()`
- Pattern: Chainable query builder with MongoDB-like syntax

**Locale Utilities:**
- Purpose: Handle bilingual content paths
- Examples: `utils/locale.ts` - `getLocaleFromPath()`, `stripEnPrefix()`, `withLocalePath()`
- Pattern: Pure functions for path transformation

**Navigation Injection:**
- Purpose: Share navigation state across components
- Examples: `provide('navigation', filteredNavigation)` in `app.vue`, `inject('navigation')` in components
- Pattern: Vue provide/inject for dependency injection

**Global Components:**
- Purpose: Auto-registered components available everywhere
- Examples: `Commend`, `Compare`, `Mermaid`, `AspectRatio`
- Pattern: Nuxt components with global flag set in nuxt.config.ts hooks

## Entry Points

**Application Bootstrap:**
- Location: `app.vue`
- Triggers: Nuxt application startup
- Responsibilities:
  - Global layout structure (Header, Footer, Main)
  - Navigation data fetching and filtering
  - SEO meta configuration
  - Search component setup
  - Language attribute management

**Dynamic Content Page:**
- Location: `pages/[...slug].vue`
- Triggers: Any content route (/articles/*, /flows/*, /maps/*)
- Responsibilities:
  - Content fetching based on route path
  - Locale detection and switching UI
  - SEO meta with hreflang tags
  - Table of contents rendering
  - Previous/next navigation

**Homepage:**
- Location: `pages/index.vue`
- Triggers: Root path /
- Responsibilities:
  - Parallax animation landing page
  - Recommended content display
  - Gesture-based navigation

**Error Page:**
- Location: `error.vue`
- Triggers: 404 or other errors
- Responsibilities: Error display with consistent layout

## Error Handling

**Strategy:** Vue error boundaries with Nuxt error handling

**Patterns:**
- `throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })` for missing content
- Error.vue layout for displaying errors consistently
- `failOnError: false` in prerender config to continue build on error

## Cross-Cutting Concerns

**Logging:** Console-based debugging with commented console.log statements

**Validation:** Content schema implicit through frontmatter usage

**Authentication:** None (static public site)

**SEO:**
- useSeoMeta() for page-level meta tags
- hreflang links for bilingual content
- OG image generation (disabled)
- Sitemap generation via @nuxtjs/sitemap

**Styling:**
- Tailwind CSS with custom color palette
- Stylus for component-level styles
- Nuxt UI Pro component theming
- Responsive design with mobile breakpoints (888px threshold)

---

*Architecture analysis: 2026-02-24*
