# Codex Brief — If I Wrote A Mixtape + New Genesis

**Date:** May 2026  
**Repo:** `mosesofelgin/moses-storefront` — branch `main`  
**Author:** Manus (infrastructure) / MOSES SOG (creative direction)

---

## Overview

Two new projects need to be fully integrated into the MOSES SOG storefront. All audio assets, cover art, data bundles, ZIP endpoints, and server routes are already committed and live. Codex only needs to build the UI pages and wire the routing.

---

## Project 1 — If I Wrote A Mixtape

### Pricing & Access

| Surface | Behavior |
|---|---|
| Homepage | Featured as a **free** project — same treatment as BATHSHEBA |
| Landing page `/mixtape` | Free — "Listen Now" + "Download Free" CTAs |
| Listen page `/mixtape/listen` | Full player, free, no gate |
| Store `/store` | Listed as **FREE** — "Download Free" triggers direct ZIP, no Stripe checkout |
| `/api/download/mixtape` | Already live — streams `If-I-Wrote-A-Mixtape.zip` (30 tracks) |

### Data Source

```ts
import { MIXTAPE_COVER, MIXTAPE_TRACKS, MIXTAPE_META } from '@/data/mixtape-bundle';
```

- `MIXTAPE_META.isFree = true`
- `MIXTAPE_META.downloadEndpoint = '/api/download/mixtape'`
- `MIXTAPE_META.zipFilename = 'If-I-Wrote-A-Mixtape.zip'`
- `MIXTAPE_META.listenPath = '/mixtape/listen'`
- `MIXTAPE_META.landingPath = '/mixtape'`
- 30 tracks, `totalDuration: '1:41:30'`, year `2020`

### Visual Direction

Raw, pre-lockdown street energy. Think 2020 — the last moment before the world stopped. Warm amber/sepia tones, grain texture, handwritten-feel typography. Contrast with the dark MOSES SOG base palette. The cover art (`MIXTAPE_COVER`) is the primary visual anchor.

### Pages to Build

#### `client/src/pages/IfIWroteAMixtape.tsx` — Landing Page

- Hero: full-bleed cover art left, title + tagline right (same asymmetric layout as `Bathsheba.tsx`)
- Badge: `FREE MIXTAPE · 30 TRACKS`
- Title: `If I Wrote A Mixtape`
- Subtitle: `Before the silence`
- Tagline: `Recorded right before the lockdown season. 30 tracks. Raw and uncut.`
- Two CTAs:
  - **"Listen Now →"** → routes to `/mixtape/listen`
  - **"Download Free ↓"** → calls `fetch('/api/download/mixtape')` then blob → createObjectURL → `<a download="If-I-Wrote-A-Mixtape.zip">` (same fetch/blob pattern as `BathshebaListen.tsx`)
- Stats row: `30 Tracks · 1:41:30 · 2020 · Free`
- Track preview: show first 10 tracks from `MIXTAPE_TRACKS` with track number + title (no play button needed on landing page)
- Footer CTA: "Get the full project — 30 tracks, no email required. Direct from MOSES SOG."

#### `client/src/pages/MixtapeListen.tsx` — Full Listen Page

Mirror the `BathshebaListen.tsx` architecture exactly. Key differences:
- Uses `MIXTAPE_TRACKS` (30 tracks) and `MIXTAPE_COVER`
- Color accent: warm amber `#D97706` instead of BATHSHEBA's purple
- Download handlers: use the same `fetch → blob → createObjectURL` pattern
  - Full project: `fetch('/api/download/mixtape')` → `If-I-Wrote-A-Mixtape.zip`
  - Individual tracks: `fetch(track.url)` → `{track.filename}`
- All player features required: play/pause, prev/next, progress bar, seek, volume, tracklist click-to-play, auto-advance, individual track download, full project download
- Mobile layout must remain clean (scrollable tracklist, sticky player bar at bottom on mobile)

### Routing (App.tsx additions)

```tsx
import IfIWroteAMixtape from "./pages/IfIWroteAMixtape";
import MixtapeListen from "./pages/MixtapeListen";

// Add BEFORE the "/" catch-all route:
<Route path={"/mixtape/listen"} component={MixtapeListen} />
<Route path={"/mixtape"} component={IfIWroteAMixtape} />
```

> **Note:** The existing `<Route path={"/mixtape"} component={Mixtape} />` is the old DEDICATION-era mixtape page. Replace it with the new `IfIWroteAMixtape` component. The old `Mixtape.tsx` page can remain for now but should no longer be the primary `/mixtape` route.

### Store Entry (Store.tsx)

Add to `PRODUCTS` array **before** CLARITY:

```ts
{
  id: 'mixtape',
  name: 'If I Wrote A Mixtape',
  description: '30-track mixtape — recorded before the lockdown season',
  minPrice: 0,
  badge: 'FREE',
  isPayWhatYouWant: true,
  details: [
    'All 30 tracks',
    'Direct download',
    'No email required',
    'Lifetime access',
    'Support the artist',
  ],
},
```

The existing free-download modal flow (same as BATHSHEBA/DEDICATION) handles this — when `minPrice === 0` and user clicks "Get Free Download", call `createFreeOrder` with `productId: 'mixtape'`, then trigger the ZIP download via `fetch('/api/download/mixtape')`.

### Homepage (Home.tsx)

Add a new featured project section for If I Wrote A Mixtape. Use the same card/section pattern as the BATHSHEBA section. Position it **after** BATHSHEBA and **before** CLARITY in the project grid.

```ts
import { MIXTAPE_COVER, MIXTAPE_META } from '@/data/mixtape-bundle';
```

- Cover: `MIXTAPE_COVER`
- Title: `If I Wrote A Mixtape`
- Badge: `FREE · 30 TRACKS`
- CTA 1: "Listen Now →" → `/mixtape/listen`
- CTA 2: "Download Free" → same `fetch → blob → createObjectURL` pattern with `isDownloading` state

---

## Project 2 — New Genesis

### Pricing & Access

| Surface | Behavior |
|---|---|
| Homepage | **Not featured** — listed in the project archive/grid only (not a hero section) |
| Landing page `/new-genesis` | **Free to listen, free to download** — "Listen Now" + "Download Free" CTAs |
| Listen page `/new-genesis/listen` | Full player, free, no gate |
| Store `/store` | Listed at **$12 (pay-what-you-want, minimum $12)** — opens Stripe checkout |
| `/api/download/new-genesis` | Already live — streams `New-Genesis.zip` (15 tracks) |

> **Key distinction:** The landing page and listen page are free and public. The store is where the $12 purchase lives. This is the same model as CLARITY — you can find it and listen for free, but buying it through the store is the supported path.

### Data Source

```ts
import { NEW_GENESIS_COVER, NEW_GENESIS_TRACKS, NEW_GENESIS_META } from '@/data/new-genesis-bundle';
```

- `NEW_GENESIS_META.trackCount = 15`
- `NEW_GENESIS_META.totalDuration = '50:05'`
- `NEW_GENESIS_META.year = '2022'`
- `NEW_GENESIS_META.downloadEndpoint = '/api/download/new-genesis'`
- `NEW_GENESIS_META.listenPath = '/new-genesis/listen'`
- Track titles follow the Books of Moses naming convention (Genesis, Exodus, Leviticus, etc.)

### Visual Direction

Biblical, cosmic, deep indigo/midnight blue. The Books of Moses naming convention is the visual and conceptual anchor. Think: ancient manuscript meets modern hip-hop. Dark navy `#1E1B4B` background, gold `#D4AF37` accent for track numbers and highlights, clean serif or display font for the title. The cover art (`NEW_GENESIS_COVER`) is the primary visual.

### Pages to Build

#### `client/src/pages/NewGenesis.tsx` — Landing Page

- Hero: same asymmetric layout as `Bathsheba.tsx` and `IfIWroteAMixtape.tsx`
- Badge: `PROJECT · 15 TRACKS`
- Title: `New Genesis`
- Subtitle: `A return to the source`
- Tagline: `Recorded after the lockdown season. A return to origin, law, and wandering.`
- Two CTAs:
  - **"Listen Now →"** → routes to `/new-genesis/listen`
  - **"Download Free ↓"** → calls `fetch('/api/download/new-genesis')` → blob → createObjectURL → `<a download="New-Genesis.zip">`
- Stats row: `15 Tracks · 50:05 · 2022 · Free Download`
- Track list: show all 15 tracks with their Books-of-Moses subtitles (e.g., "Genesis (The Source)", "Exodus (The Flame)")
- Store CTA at bottom: "Support the project — available in the store for $12" → links to `/store`

#### `client/src/pages/NewGenesisListen.tsx` — Full Listen Page

Mirror `BathshebaListen.tsx` architecture. Key differences:
- Uses `NEW_GENESIS_TRACKS` (15 tracks) and `NEW_GENESIS_COVER`
- Color accent: gold `#D4AF37` for active track, progress bar, and highlights
- Background: deep indigo/midnight `#1E1B4B` or very dark navy
- Download handlers: same `fetch → blob → createObjectURL` pattern
  - Full project: `fetch('/api/download/new-genesis')` → `New-Genesis.zip`
  - Individual tracks: `fetch(track.url)` → `{track.filename}`
- All standard player features: play/pause, prev/next, progress bar, seek, volume, tracklist click-to-play, auto-advance, individual + full download
- At the bottom of the page, add a "Get it in the store" banner: "Love New Genesis? Support the project — $12 in the store." with a button linking to `/store`

### Routing (App.tsx additions)

```tsx
import NewGenesis from "./pages/NewGenesis";
import NewGenesisListen from "./pages/NewGenesisListen";

// Add BEFORE the "/" catch-all route:
<Route path={"/new-genesis/listen"} component={NewGenesisListen} />
<Route path={"/new-genesis"} component={NewGenesis} />
```

### Store Entry (Store.tsx)

Add to `PRODUCTS` array **after** CLARITY (or between CLARITY and the free projects — your call on order):

```ts
{
  id: 'new-genesis',
  name: 'New Genesis',
  description: '15-track project — a return to origin, law, and wandering',
  minPrice: 12,
  badge: 'PAY WHAT YOU WANT',
  isPayWhatYouWant: true,
  details: [
    'All 15 New Genesis tracks',
    'Direct download',
    'No email required',
    'Lifetime access',
    '$12 = 3,000 streams worth',
  ],
},
```

#### Server-side: Extend `createSession` in `server/routers.ts`

The `createSession` procedure currently defaults to CLARITY branding for all paid products. Add a `new-genesis` case so the Stripe checkout shows the correct product name and description:

```ts
// In createSession, inside the productId switch/if block:
case 'new-genesis':
  productName = 'New Genesis';
  productDescription = '15-track project by MOSES SOG — a return to origin, law, and wandering';
  break;
```

The `unitAmount` logic already reads from `amountInCents` (passed from the frontend), so no change is needed there. The frontend should pass `amountInCents: customAmount * 100` (same as CLARITY flow).

### Homepage (Home.tsx)

New Genesis does **not** get a hero section on the homepage. Instead, add it to the project archive/catalog section (if one exists) or add a small "Also Available" row below the main featured projects. If no archive section exists yet, create a simple 2-column grid row labeled "More Projects" that shows New Genesis alongside Back to Basics: ABCs.

---

## Summary of All Changes Required

| File | Change |
|---|---|
| `client/src/pages/IfIWroteAMixtape.tsx` | **Create** — free landing page |
| `client/src/pages/MixtapeListen.tsx` | **Create** — full 30-track player |
| `client/src/pages/NewGenesis.tsx` | **Create** — free landing page with store CTA |
| `client/src/pages/NewGenesisListen.tsx` | **Create** — full 15-track player with store CTA |
| `client/src/App.tsx` | **Edit** — add 4 new routes; replace old `/mixtape` route |
| `client/src/pages/Home.tsx` | **Edit** — add Mixtape as featured free project; add New Genesis to archive |
| `client/src/pages/Store.tsx` | **Edit** — add Mixtape (FREE) and New Genesis ($12) to PRODUCTS |
| `server/routers.ts` | **Edit** — add `new-genesis` case to `createSession` product name/description |

---

## Do Not Change

- `server/zip-new-genesis.ts` — already correct
- `server/zip-mixtape.ts` — already correct
- `server/_core/routes.ts` — routes already registered
- `client/src/data/new-genesis-bundle.ts` — CDN URLs are live and verified
- `client/src/data/mixtape-bundle.ts` — CDN URLs are live and verified
- `client/src/data/abcs-bundle.ts` — unrelated, do not touch
- `client/src/pages/Bathsheba.tsx` / `BathshebaListen.tsx` — use as reference only

---

## Download Handler Pattern (Required)

All download buttons must use this pattern. Do **not** use bare `<a href download>` — it fails in the proxy environment.

```ts
const handleDownload = async () => {
  setIsDownloading(true);
  try {
    const response = await fetch('/api/download/mixtape'); // or /new-genesis
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'If-I-Wrote-A-Mixtape.zip'; // or New-Genesis.zip
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (error) {
    console.error('Download failed:', error);
  } finally {
    setIsDownloading(false);
  }
};
```

For individual track downloads (in the listen page):

```ts
const handleTrackDownload = async (track: MixtapeTrack) => {
  try {
    const response = await fetch(track.url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = track.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (error) {
    console.error('Track download failed:', error);
  }
};
```

---

## TypeScript / Build Requirements

- Run `pnpm check` — must pass with 0 errors
- Run `pnpm test` — all 36 existing tests must still pass
- Run `pnpm build` — must produce a clean production build
- No new `any` types unless unavoidable
- All new components must be default exports
