# MOSES SOG Storefront — Copilot State Briefing

**Last Updated:** May 13, 2026  
**Current Checkpoint:** `ebe08312` — OpenClaw handoff brief state  
**Status:** P0 complete, ready for P1 visual/UX refinement

---

## What We Have

### 🎵 6 Music Projects Live

| Project | Type | Tracks | Price | Status |
|---|---|---|---|---|
| **CLARITY** | Album | 12 | $12 (pay-what-you-want) | ✅ Live, Stripe integrated |
| **New Genesis** | Album | 15 | $12 (pay-what-you-want) / Free download | ✅ Live, Stripe integrated |
| **BATHSHEBA** | Album | 10 | Free | ✅ Live |
| **If I Wrote A Mixtape** | Mixtape | 30 | Free | ✅ Live |
| **Back to Basics: ABCs** | Self-Made | 11 | Free | ✅ Live |
| **DEDICATION** | Mixtape | 14 | Free | ✅ Live |

**Total:** 92 tracks, all on CDN (CloudFront), all downloadable, all playable.

### 🛣️ Core Routes

| Route | Purpose |
|---|---|
| `/` | Homepage hero (CLARITY featured) + catalog of all 6 projects |
| `/clarity`, `/clarity/listen` | CLARITY album page + 12-track player |
| `/bathsheba`, `/bathsheba/listen` | BATHSHEBA album page + 10-track player |
| `/mixtape`, `/mixtape/listen` | If I Wrote A Mixtape + 30-track player |
| `/new-genesis`, `/new-genesis/listen` | New Genesis album page + 15-track player |
| `/abcs`, `/abcs/listen` | Back to Basics: ABCs + 11-track player |
| `/dedication` | DEDICATION (Lil Wayne tribute) + 14-track player |
| `/store` | Product grid: CLARITY, New Genesis, 4 free projects |
| `/connect` | Contact/social links |
| `/links` | All platforms in one place |

### 🏗️ Architecture

**Frontend:** React 19 + Tailwind 4 + tRPC client  
**Backend:** Express 4 + tRPC 11 + Drizzle ORM  
**Database:** MySQL/TiDB (Manus-managed)  
**Auth:** Manus OAuth (session-based)  
**Payments:** Stripe (CLARITY and New Genesis checkout)  
**Storage:** S3 (all audio files on CloudFront CDN)  
**Deployment:** Manus Cloud Run (Node.js only)

### 🎯 Key Components Built

| Component | Purpose | Status |
|---|---|---|
| **GlobalNav** | Sticky top navigation, mobile hamburger menu | ✅ Live |
| **DownloadButton** | Reusable fetch/blob/createObjectURL download handler | ✅ Live |
| **Audio Players** | 6 listen pages, each with play/pause/prev/next/volume/tracklist | ✅ Live |
| **Store Page** | Product grid with cover art, pricing, checkout CTAs | ✅ Live |
| **Checkout Modal** | Stripe session creation for CLARITY and New Genesis | ✅ Live |
| **Download Endpoints** | `/api/download/{project}` streams ZIP files | ✅ Live |

---

## Why We Built It This Way

### Philosophy: Direct, Owned, Real

The MOSES SOG storefront is designed around three core principles:

1. **OWNED** — No algorithms, no middlemen. Artist controls the entire experience.
2. **DIRECT** — Listeners support the work directly. Payments go straight to artist.
3. **REAL** — Every project is authentic: produced, mixed, written, photographed, and edited by one person.

### Design Decisions

**Multi-Project Catalog:** Instead of a single-album store, we built a full catalog of 6 projects. This showcases the artist's range and lets listeners discover different eras/styles. CLARITY is the hero (latest release), but all projects are equally accessible.

**Free + Paid Model:** 4 projects are completely free (BATHSHEBA, Mixtape, ABCs, Dedication). CLARITY and New Genesis are pay-what-you-want ($12 minimum). This balances discoverability (free projects get people in the door) with sustainability (paid projects fund the work).

**Download-First Experience:** Every project has a direct download button. No streaming-only gatekeeping. Listeners own the files.

**Stripe Integration:** CLARITY and New Genesis use Stripe for checkout. This is the "support the artist" path. Free projects skip checkout entirely.

**Dedicated Listen Pages:** Each project has its own player page (e.g., `/bathsheba/listen`). This creates a focused listening experience and lets each project have its own aesthetic (color scheme, layout, messaging).

---

## How It's Made

### Data Structure

**Project Bundles:** Each project is defined in a TypeScript bundle file:
- `client/src/data/clarity-bundle.ts`
- `client/src/data/bathsheba-bundle.ts`
- `client/src/data/mixtape-bundle.ts`
- `client/src/data/new-genesis-bundle.ts`
- `client/src/data/abcs-bundle.ts`

Each bundle exports:
```typescript
export const PROJECT_META = {
  id: 'clarity',
  title: 'CLARITY',
  year: 2026,
  tracks: [
    { id: 1, title: 'Track 1', url: 'https://cdn.../track1.mp3', duration: 180 },
    // ... 12 tracks total
  ],
  coverUrl: 'https://cdn.../clarity-cover.jpg',
  description: '...',
  accentColor: '#00FF00', // green
};
```

**Download Endpoints:** Each project has a server-side ZIP builder:
- `server/zip-clarity.ts`
- `server/zip-bathsheba.ts`
- `server/zip-mixtape.ts`
- etc.

These stream all tracks as a single ZIP file via `/api/download/{project}`.

**Frontend Downloads:** The `DownloadButton` component handles the UX:
```typescript
const handleDownload = async () => {
  const response = await fetch(`/api/download/${projectId}`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}.zip`;
  a.click();
};
```

This pattern works reliably across browsers and mobile.

### Audio Players

Each listen page is a React component that:
1. Loads the project bundle (tracks, cover art, metadata)
2. Initializes an HTML5 `<audio>` element
3. Renders controls: play/pause, prev/next, progress bar, volume slider
4. Renders tracklist with individual download buttons
5. Handles state: current track, is playing, current time, duration

Example: `BathshebaListen.tsx` (10 tracks, purple accent)

### Stripe Integration

For CLARITY and New Genesis:
1. User clicks "Own the Album" or "Support This Project"
2. Frontend calls `trpc.checkout.createSession.useMutation()` with project ID
3. Backend creates a Stripe Checkout Session with:
   - Product name and description
   - Price ($12 minimum)
   - Customer email (pre-filled)
   - Metadata (project ID, user ID)
4. Frontend redirects to Stripe's hosted checkout
5. After payment, Stripe webhook hits `/api/stripe/webhook`
6. Backend logs the transaction and sends user to `/success` page

### Database Schema

Minimal schema (follows Stripe's principle: "if Stripe stores it, don't duplicate it"):

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  role ENUM('user', 'admin'),
  created_at TIMESTAMP
);

CREATE TABLE purchases (
  id INT PRIMARY KEY,
  user_id INT,
  project_id VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255),
  amount INT,
  currency VARCHAR(3),
  created_at TIMESTAMP
);
```

Most transaction data lives in Stripe; we only store references.

---

## Current State (P0 Complete)

### ✅ What Works

- All 6 projects live and accessible
- All downloads working (ZIP files stream correctly)
- Stripe checkout for CLARITY and New Genesis
- Free downloads for 4 projects (no checkout)
- Global navigation across all pages
- Mobile-responsive layouts
- TypeScript compilation: 0 errors
- Tests: 36/36 passing
- Production build: clean

### ⚠️ What Needs P1 Refinement

1. **Homepage Layout** — 5 repetitive sections below CLARITY hero feel like a list, not a catalog
2. **Audio Player Consistency** — Each listen page has slightly different styling/layout
3. **Accessibility** — Missing ARIA labels, heading hierarchy not verified
4. **Mobile UX** — Some buttons may be < 44px, modals not fully optimized
5. **Design System** — Spacing/typography not formally documented

---

## Next Steps (P1 Priorities)

**P1.1 — Homepage Grid Redesign** (HIGHEST IMPACT)
Replace 5 repetitive sections with a 6-card catalog grid. Keep CLARITY as hero.

**P1.3 — Audio Player Consistency**
Standardize all 6 listen pages to feel like one product.

**P1.2 — Accessibility Pass**
WCAG AA compliance: ARIA labels, heading hierarchy, keyboard navigation.

**P1.4 — Mobile Optimization**
44px buttons, full-screen modals, test on iOS/Android.

**P1.5 — Design System**
Formalize spacing, typography, colors, shadows, borders.

---

## Critical Rules for Future Work

1. **Do not remove routes.** All 17 routes must remain accessible.
2. **Do not remove projects.** All 6 projects must remain in the catalog.
3. **Do not change backend download/session/Stripe logic** unless a verified bug requires it.
4. **Preserve free project direct downloads.** No checkout for BATHSHEBA, Mixtape, ABCs, Dedication.
5. **Preserve CLARITY verified-session download behavior.** Users who buy get the album.
6. **Preserve Store free-vs-paid clarity.** Users must understand which projects are free and which require payment.

---

## Domains

- **Primary:** `mosessog.com` (custom domain)
- **Manus:** `mosessog.manus.space` (Manus-managed)
- **Fallback:** `mosesstore-ryuyxqyo.manus.space` (auto-generated)

All domains point to the same live storefront.

---

## Questions for Your Copilot

Before making changes:
1. Are you modifying P0 work (GlobalNav, DownloadButton, Store)? If so, why?
2. Are you adding a new route or removing an existing one? If so, confirm with the team.
3. Are you changing Stripe integration or download logic? If so, test thoroughly.
4. Have you run `pnpm check && pnpm test && pnpm build`? All must pass.
5. Have you tested on mobile (iOS Safari, Android Chrome)? All routes must work.

---

**Ready to build.** What's the next priority?
