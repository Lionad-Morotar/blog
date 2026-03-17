# Technology Stack

**Analysis Date:** 2026-02-24

## Languages

**Primary:**
- TypeScript - Main development language for all Vue/Nuxt files
- Vue (Single File Components) - Component templates and logic
- Stylus - CSS preprocessor for styling
- Sass/SCSS - Additional CSS preprocessing support

**Secondary:**
- Markdown - Content authoring format (blog posts, pages)
- JSON - Configuration and data files
- YAML - Workflow and workspace configuration

## Runtime

**Environment:**
- Node.js v20+ (CI/CD uses Node 20, local development uses v22.14.0)
- ES Modules (type: "module" in package.json)

**Package Manager:**
- pnpm v10 (enforced via preinstall script)
- Lockfile: pnpm-lock.yaml present

## Frameworks

**Core:**
- Nuxt.js v3.21.0 - Full-stack Vue framework with SSR/SSG
- Vue.js v3 (latest) - Progressive JavaScript framework
- Nitro v2 - Server engine for Nuxt (handles API routes and SSR)

**UI Framework:**
- @nuxt/ui v2.22.3 - UI component library with Tailwind CSS
- @nuxt/ui-pro v1.8.2 - Pro UI components (licensed)
- Tailwind CSS v3 - Utility-first CSS framework

**Content Management:**
- @nuxt/content v2.13.4 - File-based CMS for Markdown content
- @nuxtjs/mdc v0.13.5 - Markdown component support

**Styling:**
- Stylus v0.64.0 - Primary CSS preprocessor
- Sass v1.97.3 - Secondary CSS preprocessor
- modern-css-reset v1.4.0 - CSS reset

**Build & Development:**
- Vite v6+ (via Nuxt) - Build tool and dev server
- jiti v2 - TypeScript runtime for configuration files

**Testing:**
- vue-tsc v2.2.12 - TypeScript type checking for Vue files

## Key Dependencies

**Critical:**
- nuxt - Core framework
- @nuxt/content - Content management and Markdown processing
- @nuxt/ui + @nuxt/ui-pro - UI component system
- @nuxt/image - Image optimization

**Content Processing:**
- @nuxtjs/mdc - Markdown rendering with Vue components
- rehype-mathjax v7.1.0 - Math rendering in Markdown
- mermaid v11.12.2 - Diagram generation
- shiki v1.24.0 - Syntax highlighting

**Utilities:**
- axios v1.13.3 - HTTP client
- @vueuse/core v12.8.2 - Vue composition utilities
- svg2roughjs v3.2.1 - SVG sketch effect

**Icons:**
- @iconify-json/heroicons v1.2.3 - Heroicons icon set
- @iconify-json/simple-icons v1.2.68 - Simple Icons brand icons

**SEO & Analytics:**
- nuxt-gtag v3.0.3 - Google Analytics integration
- @nuxtjs/sitemap v7.5.2 - XML sitemap generation
- nuxt-og-image v4.2.0 - Open Graph image generation (disabled)
- @nuxtjs/feed v2 - RSS/Atom feed generation
- nuxt-feedme v1.0.1 - Feed generation alternative

**Typography:**
- @nuxtjs/fontaine v0.4.4 - Font optimization
- @nuxtjs/google-fonts v3.2.0 - Google Fonts integration

**Developer Experience:**
- @nuxt/devtools v1.7.0 - Development tools
- @nuxthq/studio v2.2.1 - Nuxt Studio CMS integration
- @nuxt/eslint-config v0.7.6 - ESLint configuration

## Configuration

**Environment:**
- .env file present (contains environment configuration)
- NUXT_PUBLIC_STUDIO_API_URL - Nuxt Studio API endpoint
- NUXT_PUBLIC_STUDIO_TOKENS - Nuxt Studio authentication
- NUXT_UI_PRO_LICENSE - UI Pro license key (GitHub secret)

**Build Configuration:**
- nuxt.config.ts - Main Nuxt configuration
- app.config.ts - App-level UI configuration
- tailwind.config.ts - Tailwind CSS customization
- tsconfig.json - TypeScript configuration (extends .nuxt/tsconfig.json)

**Nuxt Config Highlights:**
- Experimental payload extraction enabled
- Extends @nuxt/ui-pro for pro components
- Prerendering enabled for static generation
- Color mode with SSR hydration handling
- Icon client bundle optimization
- Medium zoom for images
- MathJax for LaTeX math rendering

## Platform Requirements

**Development:**
- Node.js 20+ required
- pnpm 10+ required (enforced)
- Modern browser with ES2020+ support

**Production:**
- Static site generation (SSG) via `nuxt generate`
- Deployed to GitHub Pages
- Nitro preset: github_pages
- Output directory: .output/public

**Build Commands:**
```bash
pnpm dev          # Development server (port 5995)
pnpm build        # Production build
pnpm generate     # Static site generation
pnpm preview      # Preview production build
pnpm typecheck    # TypeScript type checking
pnpm lint         # ESLint + case-police
```

---

*Stack analysis: 2026-02-24*
