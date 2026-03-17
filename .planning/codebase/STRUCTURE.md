# Codebase Structure

**Analysis Date:** 2026-02-24

## Directory Layout

```
[project-root]/
├── .planning/          # Planning documents and codebase analysis
│   └── codebase/       # Architecture and structure documentation
├── .nuxt/              # Nuxt build output (generated, not committed)
├── .output/            # Production build output (generated, not committed)
├── components/         # Vue components (auto-registered)
│   ├── AspectRatio/    # Image aspect ratio wrapper
│   ├── Commend/        # Content recommendation component
│   ├── Compare/        # Comparison display component
│   ├── content/        # Content-specific components
│   ├── Footer.vue      # Site footer
│   ├── Gesture/        # Touch gesture handler
│   ├── Header.vue      # Site header
│   ├── LLink/          # Link component
│   ├── Mermaid.vue     # Mermaid diagram renderer
│   ├── OgImage/        # Open Graph image components
│   ├── Spark/          # Sparkline/animation component
│   └── Tools/          # Tool-specific components
├── composables/        # Vue composables (auto-imported)
│   └── usePreferredLocale.ts  # User locale preference management
├── content/            # Markdown content (Nuxt Content)
│   ├── 1.flows/        # Flow/short-form content
│   ├── 2.articles/     # Blog articles
│   ├── 4.books/        # Book notes
│   ├── 4.music/        # Music content
│   ├── 6.maps/         # Knowledge maps
│   ├── 7.tools/        # Tool documentation
│   ├── 8.source-code/  # Source code analysis
│   ├── 9.hire/         # Hiring/job content
│   ├── 10.links/       # Link collections
│   ├── en/             # English translations
│   ├── _achieved/      # Archived content
│   ├── _books/         # Book metadata
│   ├── _paint/         # Paint/art content
│   └── index.yml       # Homepage configuration
├── layouts/            # Nuxt layouts
│   └── docs.vue        # Documentation layout with sidebar
├── middleware/         # Route middleware
│   └── locale-preference.global.ts  # Locale detection/redirect
├── pages/              # Nuxt pages (file-based routing)
│   ├── [...slug].vue   # Dynamic content page (catches all content routes)
│   └── index.vue       # Homepage (parallax landing)
├── public/             # Static assets (copied to output)
│   ├── crossdomain.xml # Flash crossdomain policy
│   ├── favicon.ico     # Site favicon
│   └── favicon.svg     # SVG favicon
├── server/             # Server-side code (Nitro)
│   ├── api/            # API routes
│   │   └── search.json.get.ts  # Search endpoint
│   ├── plugins/        # Server plugins
│   └── tsconfig.json   # Server TypeScript config
├── styles/             # Global styles
│   ├── atomic.styl     # Atomic CSS utilities
│   ├── components/     # Component-specific styles
│   ├── devices.styl    # Device-specific styles
│   ├── effects.styl    # Visual effects
│   ├── index.styl      # Main style entry point
│   ├── page.styl       # Page layout styles
│   ├── setting.styl    # Variables and settings
│   └── tools.styl      # Tool-specific styles
├── utils/              # Utility functions (auto-imported)
│   └── locale.ts       # Locale/path manipulation utilities
├── app.config.ts       # App configuration (UI, SEO, navigation)
├── app.vue             # Root application component
├── error.vue           # Error page layout
├── nuxt.config.ts      # Nuxt configuration
├── nuxt.schema.ts      # Nuxt Content schema
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Directory Purposes

**content/:**
- Purpose: All markdown content organized by type
- Contains: .md files with YAML frontmatter, .yml config files
- Key files: `index.yml` (homepage config), `_dir.yml` (directory config)
- Naming convention: Numbered prefixes for ordering (1.flows, 2.articles)

**components/:**
- Purpose: Vue single-file components
- Contains: .vue files and subdirectories for complex components
- Key files: `Header.vue`, `Footer.vue`, `Mermaid.vue`
- Special: Components in subdirectories auto-registered by Nuxt

**pages/:**
- Purpose: File-based routing
- Contains: `index.vue` (home), `[...slug].vue` (dynamic content)
- Pattern: Single catch-all dynamic route for content-driven pages

**composables/:**
- Purpose: Reusable Vue composition functions
- Contains: `usePreferredLocale.ts`
- Pattern: Auto-imported by Nuxt

**utils/:**
- Purpose: Pure utility functions
- Contains: `locale.ts` with path manipulation functions
- Pattern: Auto-imported by Nuxt

**server/api/:**
- Purpose: API endpoints for dynamic functionality
- Contains: `search.json.get.ts` for content search
- Pattern: File name defines HTTP method and route

**middleware/:**
- Purpose: Route middleware for request processing
- Contains: `locale-preference.global.ts`
- Pattern: .global.ts suffix runs on all routes

**styles/:**
- Purpose: Global Stylus styles
- Contains: .styl files with variables, utilities, and component styles
- Entry point: `index.styl`

**layouts/:**
- Purpose: Page layout templates
- Contains: `docs.vue` for documentation-style pages with sidebar

## Key File Locations

**Entry Points:**
- `app.vue`: Root application component
- `pages/index.vue`: Homepage
- `pages/[...slug].vue`: All content pages

**Configuration:**
- `nuxt.config.ts`: Nuxt modules, build settings, hooks
- `app.config.ts`: UI theme, navigation links, SEO metadata
- `tailwind.config.ts`: Tailwind CSS customization

**Core Logic:**
- `composables/usePreferredLocale.ts`: Locale preference state
- `utils/locale.ts`: Locale path utilities
- `middleware/locale-preference.global.ts`: Locale routing logic

**Content:**
- `content/index.yml`: Homepage content and recommendations
- `content/2.articles/`: Blog posts
- `content/6.maps/`: Knowledge base entries

**Testing:**
- No test files detected in codebase

## Naming Conventions

**Files:**
- Vue components: PascalCase (`Header.vue`, `Mermaid.vue`)
- Composables: camelCase with use prefix (`usePreferredLocale.ts`)
- Utilities: camelCase (`locale.ts`)
- Content: Numbered prefixes for ordering (`1.flows/`, `2.articles/`)
- Markdown: kebab-case with optional numbering (`1099.local-translator.md`)

**Directories:**
- Content directories: Numbered.prefix format (`6.maps`, `2.articles`)
- Component directories: PascalCase matching component name
- Private directories: Leading underscore (`_achieved`, `_books`)

## Where to Add New Code

**New Content:**
- Articles: `content/2.articles/[number].[slug].md`
- Flows: `content/1.flows/[number].[slug].md`
- Maps: `content/6.maps/[category]/[slug]/`
- English versions: Same path under `content/en/`

**New Components:**
- Global components: `components/[PascalName].vue`
- Complex components: `components/[PascalName]/index.vue`
- Content components: `components/content/[Name].vue`

**New Utilities:**
- Composables: `composables/use[Name].ts`
- Helpers: `utils/[name].ts`

**New API Endpoints:**
- API routes: `server/api/[name].[method].ts`

**New Styles:**
- Global: `styles/[category].styl`
- Component: Inside component `<style>` block or `styles/components/`

## Special Directories

**.nuxt/:**
- Purpose: Nuxt build cache and generated files
- Generated: Yes (build-time)
- Committed: No (in .gitignore)

**.output/:**
- Purpose: Production build output
- Generated: Yes (generate/build-time)
- Committed: No (in .gitignore, symlinked to dist/)

**dist/:**
- Purpose: Deployment directory (symlink to .output/public)
- Generated: Yes (symlink)
- Committed: No

**content/.obsidian/:**
- Purpose: Obsidian editor configuration
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-02-24*
