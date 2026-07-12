# DJ ROMIR — Portfolio Website

A minimal DJ portfolio built with Next.js, Tailwind CSS, and ready for Vercel deployment.

## Getting Started

```bash
cd ~/Documents/romir-dj-website
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Before You Deploy

### 1. Add SoundCloud links

Edit `src/lib/data.ts` and replace each `url: "#"` with your actual SoundCloud mix URLs.

Also update `SITE.soundcloud` with your SoundCloud profile URL.

### 2. Fix Miami & Ft. Lauderdale photos

The HEIC files didn't convert properly. Export them as JPG or PNG from Photos, then add to:

```
public/images/dj/miami.jpg
public/images/dj/ft-lauderdale.jpg
```

Then set `available: true` for those entries in `DJ_PHOTOS` inside `src/lib/data.ts`.

### 3. Optimize GIFs (recommended)

The GIF files are large (5–45 MB each). Consider compressing them before deploy for faster load times.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Connect your GitHub repo
4. Deploy (Vercel auto-detects Next.js)

## Project Structure

```
src/
  app/
    page.tsx          # Home
    mixes/page.tsx    # Mixes
    live-djing/       # Live DJing
    contact/          # Contact
  components/       # Nav, MixCard, etc.
  lib/data.ts         # All content & mix data
public/images/        # Photos, covers, GIFs
```
