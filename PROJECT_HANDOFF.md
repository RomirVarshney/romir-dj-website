# DJ ROMIR Portfolio — Project Handoff

> **Purpose:** Summary of everything discussed and built in the initial planning + development chat. Use this to continue work in a new Cursor chat window.

---

## Project Overview

**Goal:** Replace the existing Wix DJ portfolio with a custom site deployed on Vercel.

**Original Wix site:** https://romirvarshney.wixsite.com/romir

**Local project path:** `~/Documents/romir-dj-website`

**GitHub (intended):** https://github.com/RomirVarshney/romir-dj-website

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS

---

## Brand & Identity

| Item | Value |
|------|-------|
| Brand name | **DJ ROMIR** (all caps, like Wix) |
| Instagram | [@romirvarshney](https://www.instagram.com/romirvarshney/) |
| SoundCloud profile | [soundcloud.com/romirvarshney](https://soundcloud.com/romirvarshney) |
| Primary site goal | **Credibility** — Raas background, competitions, experience |
| Domain (for now) | Free `.vercel.app` URL (no custom domain yet) |

---

## Design Decisions (from Q&A)

| Area | Decision |
|------|----------|
| Visual vibe | Clean & minimal |
| Color palette | Dark background + **gold accent** (`#d4af37`) |
| Pages | Home, Mixes, Live DJing, Contact (no separate About page) |
| Bio placement | Full Wix bio paragraph in Home hero |
| Copy approach | Keep Wix wording as-is |
| Contact method | Instagram DM only (@romirvarshney) |
| Social links | Instagram + SoundCloud |
| Rates/pricing | **Do not mention** on site |
| Navigation | Minimal — "DJ ROMIR" left, links right, sticky top bar |
| Footer | None (ultra minimal) |
| Animations | Subtle fades/scroll animations (agent's call) |
| Home page flow | Hero → Mixes CTA → Live preview → Contact |
| Mix display | Card layout with cover art; clickable links to SoundCloud |
| Mix organization | Match Wix: "Raas & DDN Mixes" + "Mixtape Segments" |
| Events organization | Match Wix: "After Parties" + "Other Locations" |
| Live DJing content | Photos + events list + full Wix paragraph |
| Photo captions | Agent decides placement; captions with event/city where shown |
| External links | Open in new tabs |
| Build approach | Local first, deploy later |
| Timeline | ASAP |

---

## Wix Copy (kept as-is on site)

### Home Hero Bio
> I am a DJ and producer that specializes in Desi, Hip-Hop, Pop, RnB, and other genres of music. As a former dancer for GT Ramblin' Raas (2024-2026), I've had a lot of experience working with Raas/DDN mixes, mixtapes, and competition APs throughout the nation!

### Mixes Page Intro
> I've made a variety of mixes and mixtape mashups throughout Raas and DDN Circuits
>
> DM (@romirvarshney) for mix inquiries

### Live DJing Intro
> I've DJed at afterparties and competitions across the country, focusing on mixing Bollywood and English music together with a blend of cultural and mainstream sounds to make sure every set feels engaging from start to finish.

### After Parties (Raas, DDN, Bhangra)
- Raas Rampage — Orlando, FL
- Raas Chaos — Washington, DC
- DTX Dandiya — Dallas, TX
- Golden Gate Garba — San Francisco, CA
- Raas All-Stars — Baltimore, MD
- ATL Tamasha — Atlanta, GA
- Aaja Nachle — Dallas, TX
- Vice City Showdown — Miami, FL

### Other Locations
- Ft. Lauderdale, FL
- Tampa, FL
- Gainesville, FL
- Chapel Hill, NC
- Athens, GA
- Columbus, OH
- New York, NY

---

## Assets (from Desktop/Website Content)

**Source folder:** `~/Desktop/Website Content/`

### DJ Photos → `public/images/dj/`
| File | Event | Status |
|------|-------|--------|
| `atlanta.png` | ATL Tamasha — Atlanta | ✅ Working |
| `ggg.jpeg` | Golden Gate Garba — San Francisco | ✅ Working |
| `mixer.jpg` | Live set | ✅ Working |
| `miami.jpg` | Vice City Showdown — Miami | ❌ HEIC conversion failed — re-export as JPG/PNG |
| `ft-lauderdale.jpg` | Ft. Lauderdale | ❌ HEIC conversion failed — re-export as JPG/PNG |

### GIFs → `public/images/gifs/` (7 total, 3 used on site)
- `IMG_0548.gif`, `IMG_0721.gif`, `IMG_9335.gif` (featured on Home + Live DJing)
- All 7 GIFs copied; files are large (5–45 MB each) — consider compressing before deploy

### SoundCloud Covers → `public/images/covers/`
| Cover file | Mix |
|------------|-----|
| `ras-xviii-2026.jpg` | GT Ramblin' Raas - RAS XVIII 2026 |
| `ras-xvii-2025.jpg` | GT Ramblin' Raas - RAS XVII 2025 |
| `gr-2023-2024.jpg` | GT Ramblin' Raas 2023-2024 Mix |
| `uva-hooraas.jpg` | UVA HooRaas 2025-2026 Mix |
| `uf-gatoraas-ras-xviii.jpg` | UF GatoRaas - RAS XVIII 2026 (from `GR Mix Cover.png`) |
| `uf-gatoraas-2022-2023.jpg` | UF Gatoraas 2022-2023 Mix |
| `naach-sooraj.jpg` | NAACH x SOORAJ DOOBA HAIN + PYAR BADHTA HAI x WITH YOU (shared cover) |
| `atl-tamasha-2025.jpg` | ATL TAMASHA 2025 MIXTAPE |

---

## SoundCloud Links

### Linked (7 mixes) — in `src/lib/data.ts`

| Mix | URL |
|-----|-----|
| GT Ramblin' Raas - RAS XVIII 2026 | https://soundcloud.com/romirvarshney/gt-ramblin-raas-ras-xviii-2026 |
| GT Ramblin' Raas - RAS XVII 2025 | https://soundcloud.com/romirvarshney/gt-final-ras-mix-1 |
| UVA HooRaas 2025-2026 Mix | https://soundcloud.com/romirvarshney/uva-hooraas-2025-2026-mix |
| UF GatoRaas - RAS XVIII 2026 | https://soundcloud.com/romirvarshney/uf-gatoraas-ras-xviii-2026-9 |
| NAACH x SOORAJ DOOBA HAIN | https://soundcloud.com/romirvarshney/sooraj-dooba-hain-x-naach |
| PYAR BADHTA HAI x WITH YOU | https://soundcloud.com/romirvarshney/pyar-badhta-hai-x-with-you |
| ATL TAMASHA 2025 MIXTAPE | https://soundcloud.com/turntdesi/sets/tamasha2025 |

### Still missing links (show "SoundCloud link coming soon")
- GT Ramblin' Raas 2023-2024 Mix
- UF Gatoraas 2022-2023 Mix

### Extra link provided but NOT added to site
- [ramo re (house remix)](https://soundcloud.com/romirvarshney/ramo-re-house-remix) — RAS XVIII album track; user said they may have sent more links than needed

---

## What Was Built

### Pages
| Route | Content |
|-------|---------|
| `/` | Hero bio, mix cover preview grid, live photo/GIF preview, event preview, Instagram CTA |
| `/mixes` | Raas & DDN mixes + Mixtape Segments with cover art cards |
| `/live-djing` | Full intro, photo gallery, GIF section, After Parties + Other Locations lists |
| `/contact` | Instagram DM button + SoundCloud profile button |

### Key files
```
src/
  app/
    page.tsx              # Home
    mixes/page.tsx        # Mixes
    live-djing/page.tsx   # Live DJing
    contact/page.tsx      # Contact
    layout.tsx            # Root layout + nav
    globals.css           # Dark theme + gold accent + animations
  components/
    Nav.tsx               # Sticky minimal nav
    ButtonLink.tsx        # Primary/outline buttons
    MixCard.tsx           # Mix cover cards
    SectionHeading.tsx    # Section titles with gold underline
  lib/
    data.ts               # ALL content, mixes, events, photos — edit this file
public/images/
  dj/                     # DJ photos
  gifs/                   # Live set GIFs
  covers/                 # SoundCloud cover art
```

### Content config
**All site content lives in `src/lib/data.ts`** — mixes, events, bio, photos, social links. Edit this file to update content without touching page components.

---

## Remaining TODOs

- [ ] Fix Miami & Ft. Lauderdale photos (re-export HEIC → JPG, set `available: true` in `DJ_PHOTOS`)
- [ ] Add SoundCloud links for GT Ramblin' Raas 2023-2024 Mix and UF Gatoraas 2022-2023 Mix
- [ ] Compress GIFs for faster load times (optional but recommended)
- [ ] Push to GitHub and deploy on Vercel
- [ ] Update Instagram link-in-bio to new Vercel URL once live
- [ ] (Optional) Add ramo re house remix to site
- [ ] (Optional) Custom domain later

---

## GitHub Setup

**Username:** `RomirVarshney`

```bash
cd ~/Documents/romir-dj-website

git init
git add .
git commit -m "Initial commit: DJ ROMIR portfolio website"

git branch -M main
git remote add origin https://github.com/RomirVarshney/romir-dj-website.git
git push -u origin main
```

> Create the empty repo at https://github.com/new first (name: `romir-dj-website`, no README).

---

## Vercel Deployment

1. Push code to GitHub (see above)
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub
3. Import `romir-dj-website` repo
4. Deploy (auto-detects Next.js, no config changes needed)
5. Live URL will be something like `romir-dj-website.vercel.app`

---

## Local Development

```bash
cd ~/Documents/romir-dj-website
npm run dev
# Open http://localhost:3000
```

Production build verified: `npm run build` passes.

---

## Cursor Workspace Tips

- Open folder: **File → Open Folder** → `romir-dj-website`
- Chat sidebar: **Cmd + L**
- To continue this chat in a new workspace: open Chat → **History** → find "DJ portfolio website on Vercel"
- Or start a new chat and reference this file: `@PROJECT_HANDOFF.md`

---

## Prompt for New Chat

Copy-paste this into a new Cursor chat to continue:

> I'm continuing the DJ ROMIR portfolio website project. Read `@PROJECT_HANDOFF.md` in `~/Documents/romir-dj-website` for full context. The site is built with Next.js + Tailwind, dark + gold theme. SoundCloud links are mostly wired up in `src/lib/data.ts`. Help me with: [describe what you need next].

---

*Last updated: July 11, 2026*
