# A B Minerals – Content Placeholders Guide

This document lists all placeholder values that need to be updated with real content.
Items are organized by priority and file location for easy editing.

---

## 🔴 CRITICAL (Site functionality depends on these)

### WhatsApp Numbers
**File:** `src/config/whatsapp.config.ts`

| Line | Current Value | Description | Action |
|------|---------------|-------------|--------|
| 27 | `+91-XXXXXXXXXX` | Dad's primary WhatsApp number | Replace with actual number |
| 33 | `+91-XXXXXXXXXX` | Sales Team 1 number | Replace with actual number |
| 39 | `+91-XXXXXXXXXX` | Sales Team 2 number | Replace with actual number |

**Format:** Include country code, e.g., `+91-9876543210`

### Google Sheets Webhook (for lead logging)
**File:** `src/config/whatsapp.config.ts`

| Line | Current Value | Description |
|------|---------------|-------------|
| 96 | `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec` | Google Apps Script URL |
| 99 | `enabled: false` | Change to `true` once webhook is set up |

**Setup Instructions:**
1. Create a new Google Sheet
2. Go to Extensions → Apps Script
3. Paste this code:
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  const row = [
    data.timestamp,
    data.name || '',
    data.company || '',
    data.stone || '',
    data.quantity || '',
    data.phone || '',
    data.email || '',
    data.message || ''
  ];
  sheet.appendRow(row);
  return ContentService.createTextOutput('OK');
}
```
4. Deploy → New deployment → Web app
5. Set "Execute as" = Me, "Who has access" = Anyone
6. Copy the URL and paste in the config

---

## 🟡 IMPORTANT (Site looks incomplete without these)

### Company Contact Info
**File:** `src/config/company.config.ts`

| Line | Current Value | Update To |
|------|---------------|-----------|
| 34 | `+91-XXXXXXXXXX` | Full primary phone number |
| 35 | `+91-9658-XXX-X33` | Display format for website |
| 40 | `info@abminerals.com` | Verify or update email |
| 41 | `sales@abminerals.com` | Verify or update email |

### Google Maps
**File:** `src/config/company.config.ts`

| Line | Current Value | Action |
|------|---------------|--------|
| 56-57 | Placeholder embed URL | Get from Google Maps → Share → Embed |
| 59 | Placeholder link | Get from Google Maps → Share → Link |
| 61-62 | `lat: 19.3, lng: 84.7` | Update with exact coordinates |

### Leadership Information
**File:** `src/config/company.config.ts`

| Line | Field | Current | Update To |
|------|-------|---------|-----------|
| 79 | `title` | Empty `""` | e.g., "Founder & Managing Director" |
| 80 | `bio` | Empty `""` | 2-3 sentences about experience |
| 81 | `image` | `/team/an-bakshi.jpg` | Add photo to `public/team/` folder |
| 82 | `experience` | `"25+ years"` | Verify years |

### Analytics IDs
**File:** `src/config/site.config.ts`

| Line | Field | Current | Action |
|------|-------|---------|--------|
| 53 | Google Analytics | `G-XXXXXXXXXX` | Add GA4 Measurement ID |
| 58 | Facebook Pixel | `XXXXXXXXXXXXXXXXX` | Add FB Pixel ID |
| 63 | Microsoft Clarity | `XXXXXXXXXX` | Add Clarity Project ID |

---

## 🟠 STONES (Product information)

### All Stones
**File:** `src/config/stones.config.ts`

For each stone (Blue Lavender, SK Blue, Ikon Brown, Star White):

| Field | Example Location | Action |
|-------|------------------|--------|
| `tagline` | Line 50 | Update with compelling one-liner |
| `description` | Line 51 | Update with 2-3 sentences |
| `specs.finishes` | Line 61 | List available finishes |
| `specs.thicknesses` | Line 62 | List available thicknesses |
| `specs.slabSize` | Line 63 | Typical slab size range |

### Stone Images ✅ ADDED
**Folder:** `public/stones/[stone-name]/`

**Current images added:**
```
public/
├── logo/
│   └── ab-minerals-logo.png    ← Save the diamond logo image here
├── stones/
│   ├── blue-lavender/
│   │   └── slab-1.jpg          ← Save the purple/blue flowing granite
│   ├── sk-blue/
│   │   └── slab-1.jpg          ← Save the grey swirled granite (yard shot)
│   ├── ikon-brown/
│   │   └── slab-1.jpg          ← Save the brown linear grain granite
│   └── star-white/
│       └── slab-1.jpg          ← Save the white granite with dark speckles
```

**For additional images**, add more files like:
- `slab-2.jpg`, `slab-3.jpg` for gallery
- `texture.jpg` (square crop) for 3D viewer

**Image Guidelines:**
- Use high-quality JPG or WebP
- Optimize for web (compress without losing quality)

---

## 🟢 OPTIONAL (Nice to have)

### Social Media Links
**File:** `src/config/company.config.ts`

| Line | Field | Action |
|------|-------|--------|
| 71 | `instagram` | Add Instagram profile URL |
| 72 | `linkedin` | Add LinkedIn company page URL |
| 73 | `youtube` | Add YouTube channel URL |
| 74 | `facebook` | Add Facebook page URL |

### Certifications
**File:** `src/config/company.config.ts`
**Line:** 89-92

Add any certifications:
```typescript
export const certifications = [
  { name: "ISO 9001:2015", logo: "/certifications/iso.png" },
  { name: "FIEO Member", logo: "/certifications/fieo.png" },
];
```
Also add logo images to `public/certifications/`

### Project Images
**File:** `src/config/company.config.ts` (benchmark projects)
**Folder:** `public/projects/`

Add images for:
- `bangalore-airport.jpg`
- `delhi-airport.jpg`
- `pune-metro.jpg`

---

## 📁 Required Folder Structure

Create these folders and add content:

```
public/
├── logo/
│   └── ab-monogram.png        ← Company logo/monogram
├── stones/
│   ├── blue-lavender/
│   ├── sk-blue/
│   ├── ikon-brown/
│   └── star-white/
├── team/
│   └── an-bakshi.jpg          ← Leadership photo
├── projects/
│   ├── bangalore-airport.jpg
│   ├── delhi-airport.jpg
│   └── pune-metro.jpg
├── certifications/            ← Optional
└── og-image.jpg               ← Social sharing image (1200×630)
```

---

## 🔧 Quick Find Commands

To find all placeholders in the codebase, search for:
- `PLACEHOLDER` - Comment markers
- `XXXXXXXXXX` - Unfilled values
- `""` in config files - Empty strings

---

## 📝 After Updating

1. Save all files
2. Run `npm run dev` to preview changes
3. Test WhatsApp buttons to ensure numbers work
4. Check all images load correctly
5. Run `npm run build` to verify no errors
6. Deploy: `git add . && git commit -m "Update content" && git push`

---

## ❓ Need Help?

Common issues:
- **Images not showing:** Check file paths match exactly (case-sensitive)
- **WhatsApp not opening:** Ensure number format is `+91XXXXXXXXXX` (no dashes in actual value)
- **Google Sheets not logging:** Check webhook URL and set `enabled: true`

