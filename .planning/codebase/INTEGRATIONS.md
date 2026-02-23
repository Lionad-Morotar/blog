# External Integrations

**Analysis Date:** 2026-02-24

## APIs & External Services

**Nuxt Studio (CMS):**
- Service: Nuxt Studio CMS for content editing
- API URL: https://api.nuxt.studio
- Authentication: Token-based (NUXT_PUBLIC_STUDIO_TOKENS)
- Module: @nuxthq/studio v2.2.1
- Purpose: Visual editing of Markdown content

**Google Analytics:**
- Service: Google Analytics 4
- Tracking ID: G-P6HBJNW6QT
- Module: nuxt-gtag v3.0.3
- Purpose: Website traffic analytics

**GitHub:**
- Repository: https://github.com/Lionad-Morotar/blogs
- CI/CD: GitHub Actions
- Pages: GitHub Pages hosting
- Purpose: Source control and deployment

## Data Storage

**Content Storage:**
- Type: File-based (Git repository)
- Format: Markdown (.md files)
- Location: `/content/` directory
- Structure: Organized by content type (articles, flows, maps, books)

**No Database:**
- No external database detected
- Uses Nuxt Content module for querying Markdown files
- Server API: `/api/search.json` - Indexes all Markdown content

**File Storage:**
- Local filesystem only for content
- Images served via CDN (Aliyun OSS based on URL patterns)
- Public assets in `/public/` directory

**Caching:**
- Nitro build-time caching for prerendered routes
- No external cache service (Redis/Memcached)

## Authentication & Identity

**Auth Provider:** None
- No user authentication system
- No login/logout functionality
- No protected routes

**Content Access:**
- All content is public
- Nuxt Studio uses token-based auth for editing
- No role-based access control

## Monitoring & Observability

**Error Tracking:** None
- No Sentry, LogRocket, or similar services
- Errors logged to console only

**Logs:**
- Standard Nuxt/Nitro logging
- GitHub Actions build logs
- No external log aggregation service

**Analytics:**
- Google Analytics 4 (gtag)
- Page view tracking
- No custom event tracking detected

## CI/CD & Deployment

**Hosting:**
- Platform: GitHub Pages
- Deployment: Automated via GitHub Actions
- Branch: main/master
- Output: .output/public directory

**CI Pipeline:**
- Workflow: `.github/workflows/studio.yml`
- Triggers: Push to main/master, manual dispatch
- Runner: ubuntu-latest
- Node Version: 20

**Build Process:**
1. Checkout repository
2. Install pnpm
3. Install dependencies
4. Install @nuxthq/studio
5. Create .nuxtrc configuration
6. Build with `nuxi build --preset github_pages`
7. Deploy to GitHub Pages

**Legacy CI:**
- Backup workflow: `.github/backup/ci-on-master.yml`
- Previously used SFTP deployment
- Valine comment system integration (deprecated)

## Environment Configuration

**Required Environment Variables:**
- NUXT_PUBLIC_STUDIO_API_URL - Nuxt Studio API endpoint
- NUXT_PUBLIC_STUDIO_TOKENS - Studio authentication token
- NUXT_UI_PRO_LICENSE - UI Pro license (GitHub secret)

**Legacy Variables (not used):**
- VALINE_ID - Comment system (deprecated)
- VALINE_KEY - Comment system (deprecated)
- HOST_IP, HOST_USER, HOST_PWD - SFTP deployment (deprecated)

**Secrets Location:**
- GitHub Secrets for CI/CD
- .env file for local development (not committed)

## Webhooks & Callbacks

**Incoming:**
- None detected
- No API routes except `/api/search.json`

**Outgoing:**
- None detected
- No webhook integrations
- No external service notifications

## Third-Party Assets

**Fonts:**
- Google Fonts: DM Sans (primary font)
- Fontaine: Automatic font optimization

**CDN Resources:**
- Aliyun OSS: Image assets (mgear-image.oss-cn-shanghai.aliyuncs.com)
- Unsplash: Stock photography (referenced in content)

**External Scripts:**
- Google Analytics (gtag.js)
- MathJax (for LaTeX rendering)
- Mermaid (for diagrams, bundled)

## Integration Points

**Content Pipeline:**
1. Content authored in Markdown
2. Committed to Git repository
3. Processed by @nuxt/content
4. Indexed by server/api/search.json.get.ts
5. Rendered with MDC (Markdown Components)
6. Prerendered at build time

**Search Integration:**
- Endpoint: `/api/search.json`
- Implementation: `server/api/search.json.get.ts`
- Query: serverQueryContent from #content/server
- Filters: Markdown files with navigation enabled

**Image Handling:**
- Component: @nuxt/image
- Optimization: Automatic resizing and format conversion
- External source: Aliyun OSS

---

*Integration audit: 2026-02-24*
