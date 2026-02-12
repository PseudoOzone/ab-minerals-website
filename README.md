# A B Minerals Website

Premium luxury website for A B Minerals - Lavender Blue Quarry-Owner, factory-finished granite slabs.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Project Structure

```
ab-minerals/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   │
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   └── layout/             # Layout components
│   │
│   ├── config/                 # ⚙️ Configuration files
│   │   ├── company.config.ts   # Company info, contacts
│   │   ├── stones.config.ts    # Stone catalog
│   │   ├── whatsapp.config.ts  # WhatsApp routing
│   │   └── site.config.ts      # Site settings
│   │
│   └── lib/                    # Utilities
│
├── public/                     # Static assets
│   ├── logo/                   # Company logo
│   ├── stones/                 # Stone images
│   ├── team/                   # Team photos
│   └── projects/               # Project images
│
├── PLACEHOLDERS.md             # 📝 Content editing guide
└── README.md                   # This file
```

---

## ⚙️ Configuration

All content is managed through config files in `src/config/`.

See [PLACEHOLDERS.md](./PLACEHOLDERS.md) for complete content editing guide.

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D slab viewer (coming)

---

## 🎨 Design System

### Colors
- **Charcoal:** `#0A0A0A` (primary background)
- **Gold:** `#C9A962` (accent)
- **Cream:** `#F5F5F0` (text)

### Typography
- **Headlines:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

---

## 🚢 Deployment

### Cloudflare Pages (Recommended)

1. Push code to GitHub
2. Connect repo to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `.next`
5. Add custom domain `abminerals.com`

---

## 📝 Content Editing

See [PLACEHOLDERS.md](./PLACEHOLDERS.md) for all content that needs updating.

---

## 📄 License

Private - A B Minerals © 2024

---

## 🔍 SEO Checklist & Verification

### Quick Checks (after deployment)

| Check | How to verify |
|-------|---------------|
| **Indexing** | Google: `site:abminerals.com` — all pages should appear |
| **robots.txt** | Visit `https://www.abminerals.com/robots.txt` — should allow `/`, disallow `/api/`, link sitemap |
| **Sitemap** | Visit `https://www.abminerals.com/sitemap.xml` — all pages with correct URLs |
| **Canonical URLs** | View page source → look for `<link rel="canonical" href="https://www.abminerals.com/...">` |
| **Structured Data** | Paste URL into [Google Rich Results Test](https://search.google.com/test/rich-results) |
| **OG Tags** | Paste URL into [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| **Mobile** | Run [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) |
| **Page Speed** | Run [PageSpeed Insights](https://pagespeed.web.dev/) for Core Web Vitals |

### Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.abminerals.com`
3. Verify via DNS TXT record or HTML file upload
4. Submit sitemap: `https://www.abminerals.com/sitemap.xml`
5. Monitor Coverage → fix any errors

### SEO Architecture Summary

| File | Purpose |
|------|---------|
| `src/app/robots.ts` | Generates `/robots.txt` — crawl rules + sitemap link |
| `src/app/sitemap.ts` | Generates `/sitemap.xml` — all pages with priorities |
| `src/app/layout.tsx` | Root metadata (title template, OG defaults, icons) |
| `src/app/*/page.tsx` | Per-page title, description, canonical, OG overrides |
| `src/components/seo/JsonLd.tsx` | Organization, LocalBusiness, WebSite, Product, FAQ schemas |
| `src/config/company.config.ts` | Company info, contacts, SEO defaults (single source of truth) |

### Local build verification

```bash
npm run build          # Ensure clean build with no errors
npm run start          # Start prod server, then check:
# http://localhost:3000/robots.txt   → should render rules
# http://localhost:3000/sitemap.xml  → should list all pages
```
