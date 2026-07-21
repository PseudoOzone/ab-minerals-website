# A B Minerals Website

Public marketing website for A B Minerals, focused on quarry-owned Lavender Blue granite, factory-finished slabs, project credibility, and direct buyer enquiries.

> **Status:** active company website codebase. The application is a marketing and product-catalogue site, not an ecommerce checkout or internal ERP system.

## Current stack

- Next.js 16 with App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- Three.js through React Three Fiber and Drei
- `next-intl` for internationalization support
- Sharp for image optimization

The older README referred to Next.js 14 and described Three.js as “coming.” The current dependencies already include the Three.js stack.

## Quick start

```bash
git clone https://github.com/PseudoOzone/ab-minerals-website.git
cd ab-minerals-website
npm ci
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run lint
npm run build
npm start
```

## Content architecture

Business content is designed to be managed through configuration rather than duplicated across pages.

```text
src/
├── app/                         # Next.js routes, metadata, sitemap, robots
├── components/                  # UI, layout, catalogue, SEO, and visual modules
├── config/
│   ├── company.config.ts        # Company details and contacts
│   ├── stones.config.ts         # Stone catalogue
│   ├── whatsapp.config.ts       # Lead-routing configuration
│   └── site.config.ts           # Site-wide settings
└── lib/                         # Shared utilities

public/
├── logo/
├── stones/
├── team/
└── projects/
```

Review `PLACEHOLDERS.md` before changing business content or publishing a new deployment.

## Design direction

- dark charcoal background
- restrained gold accents
- cream typography
- premium editorial layout
- large stone and project imagery
- motion used to support, not obstruct, product discovery

## SEO implementation

The repository includes infrastructure for:

- route metadata
- canonical URLs
- Open Graph data
- robots rules
- XML sitemap generation
- organization, local-business, product, website, and FAQ structured data

After deployment, verify generated output rather than assuming the configuration is correct:

```text
/robots.txt
/sitemap.xml
```

Also inspect canonical tags, structured data, social previews, mobile layout, and Core Web Vitals.

## Deployment

The project can be deployed to a platform supporting Next.js 16, such as Vercel or another Node-compatible host.

Before deploying:

1. Run `npm ci`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Verify all business contacts and WhatsApp routes.
5. Compress and review large images.
6. Test every form and outbound link.
7. Confirm production domain, canonical URLs, sitemap, and structured data.

Do not use Cloudflare Pages instructions intended for a static export unless the application has been explicitly configured and tested for that deployment mode.

## Code review notes

- `package.json` marks the package as private, while the GitHub repository itself is public. Public source does not automatically grant reuse rights; keep an explicit license statement.
- Large high-resolution media can increase repository size, clone time, build time, and page weight. Consider object storage or an image CDN for original assets.
- Company and contact configuration is public by design; secrets and private operational data must never be placed in client-visible config files.
- Three.js and animation dependencies should be loaded only where they add value, with reduced-motion and low-power fallbacks.
- Structured-data claims must exactly match visible page content and verified company facts.
- WhatsApp links and contact forms require analytics, spam protection, and privacy disclosures if user data is collected.
- SEO checklists are not substitutes for automated tests or post-deployment monitoring.

## Recommended engineering improvements

- add unit tests for configuration and URL generation
- add Playwright tests for primary navigation and lead flows
- add Lighthouse or Core Web Vitals checks in CI
- enforce image dimensions and file-size budgets
- add broken-link and structured-data validation
- add a content review checklist for legal names, addresses, claims, and project references
- document environment variables in `.env.example` when server-side integrations are added

## Rights

Copyright A B Minerals. All rights reserved. No permission to reuse company branding, photography, content, or proprietary configuration is granted by the public visibility of this repository.
