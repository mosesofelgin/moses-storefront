# MOSES SOG Storefront — Codex UX Refinement Brief
**Date:** May 2026  
**Repo:** https://github.com/mosesofelgin/moses-storefront  
**Live site:** https://mosessog.com  
**Stack:** React 19 + Tailwind 4 + tRPC 11 + Express 4 + MySQL (Drizzle ORM)

---

## 1. What This Site Is

A direct-to-consumer music storefront for **MOSES SOG** (Moses Enterprises). No Spotify. No Apple Music. No middlemen. Every project lives here — free downloads, pay-what-you-want purchases, and a full listening experience — all owned and operated directly by the artist.

The site has 6 music projects, each with its own landing page and full audio player. Two projects are paid (pay-what-you-want via Stripe). Four are completely free.

---

## 2. Current Project Inventory

| Project | Route | Listen Route | Price | Tracks | Color |
|---|---|---|---|---|---|
| **CLARITY** | `/clarity` | `/listen` | $12 PWYW | 12 | Green `#22c55e` |
| **BATHSHEBA** | `/bathsheba` | `/bathsheba/listen` | FREE | 10 | Purple `#9333ea` |
| **New Genesis** | `/new-genesis` | `/new-genesis/listen` | $12 PWYW + free DL | 15 | Indigo `#4f46e5` / Gold `#D4AF37` |
| **Back to Basics: ABCs** | `/abcs` | `/abcs/listen` | FREE | 11 | Amber `#d97706` |
| **If I Wrote A Mixtape** | `/mixtape` | `/mixtape/listen` | FREE | 30 | Amber `#d97706` |
| **DEDICATION** | `/dedication` | `/dedication` (is the player) | FREE | 14 | Red `#ef4444` |

---

## 3. Key Files

```
client/src/pages/
  Home.tsx                  ← Homepage with all 6 project sections
  Store.tsx                 ← Store page with all products + Stripe checkout modal
  Listen.tsx                ← CLARITY full player
  ClarityProject.tsx        ← CLARITY landing page
  Bathsheba.tsx             ← BATHSHEBA landing page
  BathshebaListen.tsx       ← BATHSHEBA full player (10 tracks)
  NewGenesis.tsx            ← New Genesis landing page
  NewGenesisListen.tsx      ← New Genesis full player (15 tracks)
  Abcs.tsx                  ← ABCs landing page
  AbcsListen.tsx            ← ABCs full player (11 tracks)
  IfIWroteAMixtape.tsx      ← Mixtape landing page
  MixtapeListen.tsx         ← Mixtape full player (30 tracks)
  Mixtape.tsx               ← DEDICATION player (legacy — lives at /dedication)
  Connect.tsx               ← Contact/community page
  Links.tsx                 ← Link-in-bio style page
  Downloads.tsx             ← Post-purchase download page
  Success.tsx               ← Post-Stripe success page

client/src/data/
  clarity-bundle.ts         ← CLARITY track CDN URLs + metadata
  bathsheba-bundle.ts       ← BATHSHEBA track CDN URLs + metadata
  new-genesis-bundle.ts     ← New Genesis track CDN URLs + metadata
  abcs-bundle.ts            ← ABCs track CDN URLs + metadata
  mixtape-bundle.ts         ← Mixtape track CDN URLs + metadata
  dedication-bundle.ts      ← DEDICATION track CDN URLs + metadata
  clarity-tracks.ts         ← Legacy CLARITY track list
  products.ts               ← Legacy product definitions (not used by Store.tsx)

server/
  routers.ts                ← tRPC procedures (auth, Stripe checkout, orders)
  _core/routes.ts           ← Express download routes for all free ZIPs
  zip-abcs.ts               ← ZIP builder for ABCs
  zip-bathsheba.ts          ← ZIP builder for BATHSHEBA
  zip-dedication.ts         ← ZIP builder for DEDICATION
  zip-mixtape.ts            ← ZIP builder for Mixtape
  zip-new-genesis.ts        ← ZIP builder for New Genesis
  zip-service.ts            ← ZIP builder for CLARITY (token-gated)
  downloads.ts              ← Token-based download verification (CLARITY/New Genesis)
  orders.ts                 ← Order helpers
  subscribers.ts            ← Email subscriber helpers
  email.ts / email-service.ts ← Resend email integration
```

---

## 4. Download Architecture

**CRITICAL RULE — DO NOT CHANGE THIS:**  
All download buttons MUST use `fetch() → blob() → createObjectURL()` pattern. Never use bare `<a href download>` anchors. The proxy environment does not support direct anchor downloads for streamed responses.

```ts
// ✅ Correct pattern (used everywhere)
const res = await fetch('/api/download/bathsheba');
const blob = await res.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'BATHSHEBA-Project.zip';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
setTimeout(() => URL.revokeObjectURL(url), 10000);
```

**Free download endpoints (no auth required):**
- `GET /api/download/bathsheba` → BATHSHEBA-Project.zip
- `GET /api/download/dedication` → DEDICATION-Mixtape.zip
- `GET /api/download/abcs` → Back-to-Basics-ABCs.zip
- `GET /api/download/new-genesis` → New-Genesis.zip
- `GET /api/download/mixtape` → If-I-Wrote-A-Mixtape.zip

**Token-gated download endpoints (post-purchase):**
- `GET /api/download/all/:token` → Full album ZIP (CLARITY)
- `GET /api/download/:token/:fileId` → Individual track (CLARITY)

---

## 5. Stripe / Store Architecture

- Store page (`Store.tsx`) has a `PRODUCTS` array with `id`, `name`, `minPrice`, `badge`, `isPayWhatYouWant`, `details`
- Products with `minPrice: 0` and `badge: 'FREE'` show a "Get Free Download" button in the modal — no Stripe checkout
- Products with `minPrice > 0` open Stripe Checkout via `trpc.store.createSession.useMutation()`
- The `createSession` procedure in `server/routers.ts` handles product-to-Stripe mapping
- Stripe webhook is at `POST /api/stripe/webhook` — handles `checkout.session.completed`
- Post-purchase: user gets email with download token, redirected to `/success`, can access `/downloads`

**Current store products (in order):**
1. BATHSHEBA — FREE
2. DEDICATION — FREE
3. Back to Basics: ABCs — FREE
4. If I Wrote A Mixtape — FREE
5. New Genesis — $12 PWYW
6. CLARITY — $12 PWYW

---

## 6. Homepage Section Order (current)

1. **CLARITY** — full-screen hero, green accent, "Listen Now" + "Own the Album"
2. **BATHSHEBA** — purple, "Listen Now" + "Download Free"
3. **If I Wrote A Mixtape** — amber, "Listen Now" + "Download Free"
4. **New Genesis** — indigo, "Listen Now" + "Download Free"
5. **Back to Basics: ABCs** — amber/brown, "Listen Now" + "Download Free"
6. **DEDICATION** — red, "Listen Now" + "Download Free"
7. Value proposition (OWNED / DIRECT / REAL)
8. Pathway cards (LISTEN / STORE / CONNECT)
9. Mission statement
10. Footer

---

## 7. What Needs to Be Refined (UX Improvement Goals)

This is the refinement brief. The goal is to make the site feel like a **premium, cohesive, thriving music platform** — not just a collection of pages. Every visitor should feel the quality, understand what MOSES SOG is about immediately, and have a clear path to listen, download, or support.

### 7.1 Global Navigation (HIGH PRIORITY)
**Problem:** There is no persistent top navigation bar. Visitors have no way to jump between projects without scrolling the entire homepage or hitting the back button.

**Goal:** Add a sticky top nav to the homepage and all project pages with:
- MOSES SOG logo/wordmark on the left
- Project links: CLARITY · BATHSHEBA · NEW GENESIS · ABCs · MIXTAPE · DEDICATION
- STORE link on the right
- Mobile: hamburger menu that slides open
- Active state highlights the current project
- Dark background with subtle border, no white backgrounds

### 7.2 Homepage Hero Refinement (HIGH PRIORITY)
**Problem:** The CLARITY hero is strong but the page becomes a long scroll of identical two-column grid sections. After the 3rd project, visitors lose context and energy.

**Goal:**
- Keep CLARITY as the full-screen hero (it's correct)
- After CLARITY, add a compact **"All Projects" grid** — 6 cards in a 2×3 or 3×2 grid, each with cover art, title, track count, price badge, and a single CTA button. This replaces the 5 repetitive two-column sections below CLARITY.
- The DEDICATION section can stay as a secondary hero if desired, or move into the grid
- The grid should feel like a music platform catalog, not a landing page

### 7.3 Listen Page Consistency (MEDIUM PRIORITY)
**Problem:** Each listen page was built independently. They share the same architecture but have minor inconsistencies in layout, button sizing, tracklist behavior, and mobile responsiveness.

**Goal:** Audit all 6 listen pages and standardize:
- Same sticky top nav as the rest of the site
- Same player control layout (album art left, controls right on desktop; stacked on mobile)
- Same tracklist row height, font size, and hover states
- Same "Download All" button placement and style
- Auto-advance between tracks works on all pages
- Mobile: player controls are thumb-reachable (bottom of screen)

**Listen pages to audit:**
- `/listen` (CLARITY) — `Listen.tsx`
- `/bathsheba/listen` — `BathshebaListen.tsx`
- `/new-genesis/listen` — `NewGenesisListen.tsx`
- `/abcs/listen` — `AbcsListen.tsx`
- `/mixtape/listen` — `MixtapeListen.tsx`
- `/dedication` — `Mixtape.tsx`

### 7.4 Store Page Refinement (MEDIUM PRIORITY)
**Problem:** The store shows all products in a grid but CLARITY should be the featured/hero product since it's the flagship paid project.

**Goal:**
- Feature CLARITY at the top as a hero card (larger, more prominent)
- New Genesis as secondary paid project
- Free projects in a "Free Downloads" section below
- Each product card should show cover art (not just text)
- The pay-what-you-want modal should show the album cover

### 7.5 Project Landing Pages (LOWER PRIORITY)
**Problem:** Each project has its own landing page but they vary in quality and completeness. Some have rich "About" sections, some don't.

**Goal:** Each landing page should have:
- Cover art (large, prominent)
- Project title + tagline
- Track count + total runtime + year
- 2–3 sentence "About" paragraph
- Full tracklist (non-interactive preview)
- "Listen Now" + "Download Free" (or "Get in Store") CTAs
- Link back to homepage and store

### 7.6 Mobile Experience (MEDIUM PRIORITY)
**Problem:** The site was designed desktop-first. Mobile needs specific attention.

**Goal:**
- Homepage: project grid cards should be single-column on mobile
- Listen pages: play/pause button should be large and thumb-friendly
- Store: modal should be full-screen on mobile
- Nav: hamburger menu on mobile
- Cover art should never be cut off on mobile

### 7.7 Performance & Polish (LOWER PRIORITY)
- Add `loading="lazy"` to all cover art images that don't already have it
- Add skeleton loaders for the tracklist while audio metadata loads
- Add a subtle page transition between routes (fade-in)
- The `font-bebas` class is used throughout — ensure it loads from Google Fonts CDN in `client/index.html`
- Ensure all pages have proper `<title>` and meta description tags

---

## 8. Technical Constraints

1. **Download pattern:** Always `fetch → blob → createObjectURL`. Never `<a href download>`.
2. **No new npm packages** unless absolutely necessary — keep the bundle lean.
3. **All static assets** (images, audio) are on CloudFront CDN. Never put media in `client/public/`.
4. **tRPC for all backend calls** — no raw fetch to `/api/trpc` endpoints, no Axios.
5. **TypeScript must pass:** `pnpm check` must return 0 errors.
6. **Tests must pass:** `pnpm test` — 36 tests across 5 files.
7. **Build must pass:** `pnpm build` — clean Vite production build.
8. **Stripe webhook route** at `POST /api/stripe/webhook` — do not move or rename.
9. **Route `/dedication`** maps to `Mixtape.tsx` (the DEDICATION player) — this is intentional.

---

## 9. Design System Reference

**Colors:**
- Background: `bg-zinc-950` (near-black)
- Surface: `bg-zinc-900`
- Border: `border-zinc-800`
- Text primary: `text-zinc-100`
- Text secondary: `text-zinc-400`
- Text muted: `text-zinc-600`
- CLARITY accent: `#22c55e` (green-500)
- BATHSHEBA accent: `#9333ea` (purple-600)
- New Genesis accent: `#4f46e5` (indigo-600) + `#D4AF37` (gold)
- ABCs accent: `#d97706` (amber-600)
- Mixtape accent: `#d97706` (amber-600)
- DEDICATION accent: `#ef4444` (red-500)

**Typography:**
- Headings: `font-bebas` (Bebas Neue — loaded from Google Fonts)
- Body/serif: `font-cormorant` (Cormorant Garamond — loaded from Google Fonts)
- Mono/labels: `font-mono` (system monospace)

**Spacing:** Tailwind defaults. Sections use `py-20` (desktop) and `py-16` (mobile).

---

## 10. Commit & Test Requirements

After every change:
```bash
pnpm check    # TypeScript — must be 0 errors
pnpm test     # Vitest — must be 36/36 passing
pnpm build    # Vite — must complete without errors
```

Commit message format: `feat: [what changed]` or `fix: [what was broken]`

Push to `main` on `origin` (the Manus GitHub integration).

---

## 11. Summary of What's Working Well (Do Not Break)

- All 6 project listen pages with full audio players
- All download endpoints (free ZIPs + token-gated CLARITY downloads)
- Stripe checkout flow for CLARITY and New Genesis
- Post-purchase email delivery and download token system
- Mobile-responsive layouts (imperfect but functional)
- CLARITY as homepage hero
- Store with pay-what-you-want modal
