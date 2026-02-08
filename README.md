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
