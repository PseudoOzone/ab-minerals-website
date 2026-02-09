# A B Minerals Website — Hosting & SEO Deployment Guide

## 🚀 STEP 1: Push to GitHub

```bash
# In the ab-minerals folder, run:
git init
git add .
git commit -m "Initial commit: A B Minerals website"

# Create a private repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/ab-minerals.git
git branch -M main
git push -u origin main
```

---

## 🌐 STEP 2: Deploy on Vercel (Recommended for Next.js)

1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. Click **"Add New Project"** → Import your `ab-minerals` repo
3. Vercel auto-detects Next.js — click **Deploy**
4. Site goes live at `ab-minerals.vercel.app` in ~2 minutes

### Why Vercel?
- Built by the Next.js team → zero-config, best performance
- Free tier is more than enough for a business site
- Automatic HTTPS, global CDN, image optimization
- Auto-deploys on every `git push`

---

## 🔗 STEP 3: Connect abminerals.com Domain

Since your nameservers are set to Rediff's defaults (`ns.rediffmailpro.com` / `ns2.rediffmailpro.com`), you should keep them so your email continues working.

### In Vercel:
1. Go to **Project Settings** → **Domains**
2. Add `abminerals.com` and `www.abminerals.com`
3. Vercel will show you DNS records to add:
   - **A record**: `@` → `76.76.21.21` (Vercel's IP)
   - **CNAME record**: `www` → `cname.vercel-dns.com`

### In Rediff DNS Panel:
1. Log into your Rediff domain management panel
2. Go to **DNS Management** or **DNS Settings**
3. Add the records Vercel specified:

| Type  | Host  | Value                  | TTL  |
|-------|-------|------------------------|------|
| A     | @     | 76.76.21.21            | 3600 |
| CNAME | www   | cname.vercel-dns.com   | 3600 |

4. Wait **24-48 hours** for DNS propagation

> **Note**: The exact Vercel IP may vary — always use what Vercel's dashboard shows you.

---

## 📊 STEP 4: Set Up Google Analytics (GA4)

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create an account → Create a property for "A B Minerals"
3. Set up a **Web** data stream for `abminerals.com`
4. Copy the **Measurement ID** (e.g., `G-ABC123XYZ`)
5. Open `src/config/site.config.ts` and replace:
   ```
   measurementId: "G-XXXXXXXXXX"  →  measurementId: "G-ABC123XYZ"
   ```
6. Push to GitHub → Vercel auto-deploys with analytics active

---

## 🔍 STEP 5: Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **"Add Property"** → Enter `https://www.abminerals.com`
3. Choose **DNS verification** method
4. Add the TXT record Rediff DNS panel:

| Type | Host | Value                              | TTL  |
|------|------|------------------------------------|------|
| TXT  | @    | google-site-verification=XXXXXXXX  | 3600 |

5. After verification, go to **Sitemaps** → Submit: `https://www.abminerals.com/sitemap.xml`

---

## 🔥 STEP 6: Set Up Microsoft Clarity (Free Heatmaps)

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create a project for "A B Minerals"
3. Copy the **Project ID**
4. Open `src/config/site.config.ts` and replace:
   ```
   projectId: "XXXXXXXXXX"  →  projectId: "your-clarity-id"
   ```
5. Push to GitHub → auto-deploys

---

## 📋 STEP 7: Google Business Profile

1. Go to [business.google.com](https://business.google.com)
2. Add your business: **A B Minerals Pvt Ltd**
3. Enter address: Gajapati Nagar, 8th Lane, Berhampur, Odisha 760010
4. Category: **Granite Supplier** / **Stone Supplier**
5. Add phone: +91 98118 08716
6. Add website: https://www.abminerals.com
7. Add photos of quarry, factory, stones
8. Verify via postcard or phone

---

## 🗂️ SEO Checklist (Already Done in Code)

- [x] **Unique title & description** on every page
- [x] **Canonical URLs** on every page
- [x] **Open Graph tags** for social sharing
- [x] **JSON-LD structured data** (Organization, LocalBusiness, WebSite)
- [x] **Sitemap.xml** with all pages + priorities
- [x] **Robots.txt** configured
- [x] **Dynamic metadata** for each stone variety (per-product SEO)
- [x] **Static site generation** for fast loading
- [x] **Image optimization** via Next.js
- [x] **Font optimization** with display swap
- [x] **Google Analytics** component (ready — just add ID)
- [x] **Microsoft Clarity** component (ready — just add ID)

---

## 📱 Additional SEO Actions (Manual)

### Social Media
- Create Facebook Business Page → link to website
- Create Instagram Business Account → showcase stones
- Create LinkedIn Company Page
- Share project photos regularly

### Content Strategy
- Add a blog section later with articles like:
  - "Lavender Blue Granite: Complete Buying Guide"
  - "How to Choose Granite for Your Project"
  - "Granite Thickness Guide for Different Applications"

### Backlinks
- List on IndiaMart, TradeIndia, ExportersIndia
- Get listed on granite/stone industry directories
- Ask satisfied clients for Google reviews

---

## 🔄 Ongoing Maintenance

| Task                         | Frequency |
|-----------------------------|-----------|
| Check Google Search Console | Weekly    |
| Review Analytics            | Weekly    |
| Update stone photos         | Monthly   |
| Add new project references  | As needed |
| Check site speed (PageSpeed)| Monthly   |
| Respond to inquiries        | Daily     |

---

## 💡 Quick Commands

```bash
# Local development
npm run dev

# Production build test
npm run build

# Start production server locally
npm run start
```

---

## Cost Summary

| Service              | Cost        |
|---------------------|-------------|
| Vercel Hosting       | **Free**    |
| Google Analytics     | **Free**    |
| Google Search Console| **Free**    |
| Microsoft Clarity    | **Free**    |
| Google Business      | **Free**    |
| Domain (Rediff)      | Already paid|
| **Total**            | **₹0/month**|
