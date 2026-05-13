# MOSES SOG Storefront: Visual Audit & Prioritized Checklist

**Current State:** Commit `ebe0831` — "Add OpenClaw handoff brief for P1+ execution"  
**Status:** All core features live. P0 critical path complete. Ready for P1 visual/UX refinement.

---

## 1. Current State Assessment

### ✅ What's Working Well

| Area | Status | Notes |
|---|---|---|
| **Global Navigation** | ✅ Live | Sticky top nav with project links, mobile hamburger menu |
| **6 Projects Live** | ✅ Live | CLARITY ($12), New Genesis ($12), BATHSHEBA (free), Mixtape (free), ABCs (free), Dedication (free) |
| **Download System** | ✅ Live | Fetch/blob/createObjectURL pattern, all downloads working |
| **Store Page** | ✅ Live | CLARITY first, New Genesis, then 4 free projects; cover art on all cards |
| **Listen Pages** | ✅ Live | All 6 projects have dedicated listen pages with players |
| **Stripe Integration** | ✅ Live | CLARITY and New Genesis checkout flows working |
| **TypeScript/Tests** | ✅ Passing | pnpm check ✓, pnpm test 36/36 ✓, pnpm build ✓ |

### ⚠️ What Needs Refinement (Visual/UX)

| Area | Issue | Priority | Impact |
|---|---|---|---|
| **Homepage Layout** | 5 repetitive two-column sections below CLARITY hero | P1.1 | Medium — works but feels cluttered |
| **Audio Players** | Each listen page has slightly different layout/styling | P1.3 | Medium — inconsistent experience |
| **Mobile Experience** | Some buttons may be < 44px, modals not optimized | P1.4 | High — affects usability |
| **Accessibility** | Missing ARIA labels, heading hierarchy not verified | P1.2 | High — WCAG compliance |
| **Design System** | Spacing/typography not formally documented | P1.5 | Low — works but not scalable |
| **Error Handling** | No error boundaries on players, no retry logic | P1.3 | Medium — edge case coverage |

### 🎨 Visual Observations

**Homepage:**
- CLARITY hero is strong (full-screen, green accent, clear CTAs)
- Below that: 5 sections (BATHSHEBA, Mixtape, New Genesis, ABCs, Dedication) each with cover art + description + Listen/Download buttons
- Repetitive layout feels like a list, not a catalog
- Footer has "The MOSES Difference" value props (OWNED, DIRECT, REAL)

**Store Page:**
- Clean 2-column grid (desktop)
- CLARITY card first (green badge, green button)
- New Genesis second (amber badge, amber button)
- 4 free projects below (green badge, green button)
- Cover art visible on all cards
- Responsive layout looks good

**Listen Pages (BATHSHEBA example):**
- Left: Album art (square, large)
- Right: Current track info, play/pause/prev/next controls, progress bar, volume slider
- Below: Full tracklist with individual download buttons
- Bottom: "Download Full Project" button
- Footer: "Also Available" section with link to CLARITY

---

## 2. Prioritized Checklist for Codex

### 🔴 P1.1 — Homepage Grid Redesign (HIGHEST IMPACT)

**Goal:** Replace 5 repetitive sections with a compact 6-card catalog grid. Keep CLARITY as hero.

**What to do:**
- [ ] Keep CLARITY full-screen hero (no changes)
- [ ] Below CLARITY, add section header: "All Projects"
- [ ] Create 6-card grid (3 columns desktop, 2 tablet, 1 mobile)
- [ ] Each card shows: cover art, title, track count, price badge, one CTA button
- [ ] Grid layout: responsive, consistent spacing, hover effects
- [ ] Remove the 5 individual two-column sections
- [ ] Keep footer "The MOSES Difference" section

**Files to modify:**
- `client/src/pages/Home.tsx` — main redesign
- `client/src/components/ProjectCard.tsx` — new card component (optional, or inline)

**Success criteria:**
- Homepage feels like a catalog, not a list
- All 6 projects visible without excessive scrolling
- Mobile layout is clean (1 column, thumb-friendly)
- Hover effects on cards
- pnpm check ✓, pnpm test ✓, pnpm build ✓

---

### 🟡 P1.3 — Audio Player Consistency (SECOND PRIORITY)

**Goal:** Standardize all 6 listen pages to feel like one product.

**What to do:**
- [ ] Audit all 6 listen pages: BathshebaListen, MixtapeListen, NewGenesisListen, AbcsListen, Mixtape (DEDICATION), ClarityListen
- [ ] Standardize layout: album art (left on desktop, top on mobile), controls (right/bottom)
- [ ] Same controls on all: play/pause, prev/next, progress bar, volume, tracklist
- [ ] Same color accents per project (BATHSHEBA purple, Mixtape amber, New Genesis gold, etc.)
- [ ] Add error boundaries: show error message if track fails to load
- [ ] Add retry button for failed tracks
- [ ] Test on mobile: ensure tracklist scrolls without breaking layout

**Files to modify:**
- `client/src/pages/BathshebaListen.tsx`
- `client/src/pages/MixtapeListen.tsx`
- `client/src/pages/NewGenesisListen.tsx`
- `client/src/pages/AbcsListen.tsx`
- `client/src/pages/Mixtape.tsx` (DEDICATION)
- `client/src/pages/ClarityListen.tsx` (if exists)
- Consider extracting shared player logic to `client/src/components/AudioPlayer.tsx`

**Success criteria:**
- All 6 players have identical layout and controls
- Consistent error handling across all players
- Mobile experience is smooth (no layout breaks)
- pnpm check ✓, pnpm test ✓, pnpm build ✓

---

### 🟡 P1.2 — Accessibility Foundations (THIRD PRIORITY)

**Goal:** Ensure WCAG AA compliance across the site.

**What to do:**
- [ ] Add ARIA labels to all buttons (play, pause, prev, next, download, etc.)
- [ ] Fix heading hierarchy: ensure H1 → H2 → H3 progression, no skips
- [ ] Add skip-to-content link on all pages
- [ ] Test color contrast: ensure 4.5:1 for text, 3:1 for graphics (WCAG AA)
- [ ] Test keyboard navigation: Tab, Enter, Escape should work on all interactive elements
- [ ] Test screen reader compatibility (VoiceOver on Mac, NVDA on Windows)

**Files to modify:**
- All pages and components with interactive elements
- `client/src/components/GlobalNav.tsx`
- `client/src/components/DownloadButton.tsx`
- All listen pages

**Success criteria:**
- WCAG AA compliance verified
- Keyboard navigation works on all pages
- Screen reader reads all interactive elements correctly
- pnpm check ✓, pnpm test ✓, pnpm build ✓

---

### 🟡 P1.4 — Mobile Optimization (FOURTH PRIORITY)

**Goal:** Ensure all buttons are thumb-friendly and modals work on mobile.

**What to do:**
- [ ] Ensure all buttons are 44px × 44px minimum (tap target size)
- [ ] Test on iPhone SE (375px), iPhone 14 Pro (390px), Android (360px-412px)
- [ ] Full-screen modals on mobile (not centered overlays)
- [ ] Ensure tracklist scrolls without breaking layout
- [ ] Test downloads on iOS Safari and Android Chrome
- [ ] Test navigation on mobile (hamburger menu works, links are clickable)

**Files to modify:**
- All pages and components
- Modal components (checkout, player controls)
- Navigation components

**Success criteria:**
- All buttons are 44px minimum
- Mobile layout tested on 3+ device sizes
- Downloads work on iOS Safari and Android Chrome
- pnpm check ✓, pnpm test ✓, pnpm build ✓

---

### 🟢 P1.5 — Design System Documentation (FIFTH PRIORITY)

**Goal:** Formalize spacing, typography, and color system.

**What to do:**
- [ ] Document spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- [ ] Document typography: Bebas Nova (headers), Cormorant Garamond (body), DM Mono (code)
- [ ] Document color palette: semantic naming (e.g., `text-foreground`, `bg-accent`, `border-border`)
- [ ] Document hover/focus states for all interactive elements
- [ ] Update `client/src/index.css` with design tokens
- [ ] Create a design system reference page (optional, for internal use)

**Files to modify:**
- `client/src/index.css`
- Create `references/design-system.md` (optional)

**Success criteria:**
- All spacing uses the documented scale
- All typography uses documented fonts
- All colors use semantic naming
- Design is consistent across all pages
- pnpm check ✓, pnpm test ✓, pnpm build ✓

---

## 3. Implementation Order

**Week 1:**
1. **P1.1** — Homepage grid redesign (highest impact, unblocks other work)
2. **P1.3** — Audio player consistency (affects all 6 listen pages)

**Week 2:**
3. **P1.2** — Accessibility foundations (WCAG AA compliance)
4. **P1.4** — Mobile optimization (thumb-friendly, responsive)

**Week 3:**
5. **P1.5** — Design system documentation (scalability)

---

## 4. Critical Rules for Codex

1. **Never use `<a href download>`** — always use `fetch → blob → createObjectURL` (see DownloadButton.tsx)
2. **All tests must pass**: `pnpm check`, `pnpm test`, `pnpm build` — zero errors
3. **Mobile first**: design for mobile, then enhance for desktop
4. **Accessibility is not optional**: WCAG AA is the minimum
5. **Push all changes to `main`** — no feature branches
6. **Update todo.md** when items are complete — mark as [x]
7. **Test on real devices** — not just browser DevTools

---

## 5. File Map

```
client/src/
  components/
    GlobalNav.tsx         ← Sticky nav (already done)
    DownloadButton.tsx    ← Reusable download (already done)
    ProjectCard.tsx       ← NEW: Card component for homepage grid (P1.1)
  pages/
    Home.tsx              ← MODIFY: Replace sections with 6-card grid (P1.1)
    Store.tsx             ← Already reordered with cover art (P0 done)
    BathshebaListen.tsx   ← MODIFY: Standardize player (P1.3)
    MixtapeListen.tsx     ← MODIFY: Standardize player (P1.3)
    NewGenesisListen.tsx  ← MODIFY: Standardize player (P1.3)
    AbcsListen.tsx        ← MODIFY: Standardize player (P1.3)
    Mixtape.tsx           ← MODIFY: Standardize player (P1.3)
    ClarityListen.tsx     ← MODIFY: Standardize player (P1.3)
  index.css               ← MODIFY: Design tokens (P1.5)

references/
  design-system.md        ← NEW: Design system documentation (P1.5)
```

---

## 6. Success Criteria for P1 Completion

**P1 is done when:**
- ✅ Homepage shows 6-card grid (not 5 repetitive sections)
- ✅ All 6 listen pages have identical player layout and controls
- ✅ All pages pass WCAG AA accessibility audit
- ✅ All buttons are 44px minimum, tested on mobile
- ✅ Design tokens documented and applied consistently
- ✅ pnpm check ✓ | pnpm test 36/36 ✓ | pnpm build ✓

---

## 7. Questions for Codex

Before starting, confirm:
1. Should the homepage grid be 3 columns on desktop, or would 2 columns feel better?
2. For the 6 project cards, should each have a unique accent color, or use a consistent green?
3. Should the audio player have a "shuffle" or "repeat" button, or keep it minimal?
4. Should error messages appear as toast notifications or inline on the player?
5. Should the design system be documented in a separate page, or just in code comments?

---

## Next Steps

1. Read this audit in full
2. Start with **P1.1 (Homepage Grid)** — highest impact, unblocks other work
3. Work through P1 in order: Grid → Players → Accessibility → Mobile → Design System
4. Push to main after each major milestone
5. Update todo.md as you go — mark items [x] when complete
6. Run tests after every change

Good luck. Build something great. 🚀
