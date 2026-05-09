# OpenClaw Handoff: MOSES SOG Storefront P1+ Execution

## Current State (P0 Complete ✓)

The MOSES SOG storefront is live with:
- **6 free/paid projects**: CLARITY ($12), New Genesis ($12), BATHSHEBA (free), If I Wrote A Mixtape (free), Back to Basics: ABCs (free), DEDICATION (free)
- **Global sticky navigation** (GlobalNav.tsx) — all pages, mobile hamburger menu
- **Reusable DownloadButton component** — fetch/blob/toast pattern, all 6 projects
- **Store page clarity** — CLARITY first, New Genesis, then 4 free projects; cover art on all cards; dynamic badge/button colors (green for FREE, amber for $12)
- **All tests passing**: pnpm check ✓ | pnpm test 36/36 ✓ | pnpm build ✓

**GitHub**: https://github.com/mosesofelgin/moses-storefront (main branch)
**Live**: https://mosessog.com (or https://mosesstore-ryuyxqyo.manus.space)

---

## Your Job: Execute P1 + P2 Priorities

Read `references/product-priorities.md` in full before starting. That file is the source of truth for what matters most and when.

### P1 — Important (Next 4 Weeks)

**P1.1 — Homepage Redesign (HIGHEST IMPACT)**
- Replace the 5 repetitive two-column sections (BATHSHEBA, Mixtape, New Genesis, ABCs, DEDICATION) with a **6-card catalog grid**
- Keep CLARITY as the full-screen hero at top (no change)
- Each card should show: cover art, title, track count, price badge, one CTA ("Listen Now" or "Get Free")
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Test on all breakpoints

**P1.2 — Accessibility Foundations**
- Add ARIA labels to all interactive elements (buttons, links, inputs)
- Fix heading hierarchy (ensure H1 → H2 → H3 progression, no skips)
- Add skip-to-content link on all pages
- Ensure WCAG AA color contrast (4.5:1 for text, 3:1 for graphics)
- Test keyboard-only navigation (Tab, Enter, Escape)

**P1.3 — Audio Player Consistency**
- Audit all 6 listen pages (BathshebaListen, MixtapeListen, NewGenesisListen, AbcsListen, Mixtape/DEDICATION, ClarityListen)
- Standardize layout: album art on left (desktop), controls below (mobile)
- Same controls on all players: play/pause, prev/next, progress bar, volume, tracklist
- Same error handling: show error message if track fails to load
- Same mobile behavior: full-screen modal on mobile, tracklist scrolls without breaking

**P1.4 — Mobile Optimization**
- Ensure all buttons are 44px × 44px minimum (thumb-friendly)
- Test on iPhone SE, iPhone 14 Pro, Android (Samsung Galaxy)
- Full-screen modals on mobile for all players
- Ensure tracklist scrolls without breaking layout
- Test downloads on iOS Safari and Android Chrome

**P1.5 — Visual Design System**
- Establish consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Standardize typography: Bebas Nova (headers), Cormorant Garamond (body), mono (code)
- Standardize hover/focus states across all interactive elements
- Consistent color usage: use semantic naming (e.g., `text-foreground`, `bg-accent`)
- Document design tokens in `client/src/index.css`

---

### P2 — Nice-to-Have (Backlog)

**P2.1 — Persistent Mini-Player**
- Add a fixed bottom bar that persists across page navigation
- Shows current track, play/pause, next, volume
- Doesn't block content on mobile

**P2.2 — Download Analytics**
- Log each ZIP download to the database (project_id, timestamp, user_id if logged in)
- Create a simple dashboard showing download counts per project

**P2.3 — Email Capture on Free Download**
- Optional email prompt after free download completes
- "Get notified of new projects — email optional"
- Store emails in database for future announcements

**P2.4 — /projects Archive Page**
- Single grid showing all 6 projects with cover art, track count, price badge
- Gives listeners one place to browse everything
- Link from homepage footer

**P2.5 — Enhanced Connect Page**
- Add testimonials or quotes from listeners
- Add social media links
- Add email signup form

---

## Critical Rules

1. **Never use `<a href download>`** — always use `fetch → blob → createObjectURL` (see DownloadButton.tsx for reference)
2. **All tests must pass**: `pnpm check`, `pnpm test`, `pnpm build` — zero errors
3. **Mobile first**: design for mobile, then enhance for desktop
4. **Accessibility is not optional**: WCAG AA is the minimum
5. **Push all changes to `main`** — no feature branches
6. **Mark items as [x] in todo.md** when complete — keep it updated

---

## File Map

```
client/src/
  components/
    GlobalNav.tsx         ← Sticky nav (already done)
    DownloadButton.tsx    ← Reusable download (already done)
    AudioPlayer.tsx       ← Consider extracting for consistency
  pages/
    Home.tsx              ← Replace sections with 6-card grid (P1.1)
    Store.tsx             ← Already reordered with cover art (P0 done)
    Clarity.tsx, Bathsheba.tsx, IfIWroteAMixtape.tsx, NewGenesis.tsx, Abcs.tsx, Mixtape.tsx
      ← All landing pages (already done)
    ClarityListen.tsx, BathshebaListen.tsx, MixtapeListen.tsx, NewGenesisListen.tsx, AbcsListen.tsx, Mixtape.tsx
      ← All listen pages (need consistency audit P1.3)
  index.css               ← Design tokens (P1.5)
  App.tsx                 ← Routing (already done)

server/
  routers.ts              ← tRPC procedures (already done)
  db.ts                   ← Database helpers (already done)

drizzle/
  schema.ts               ← Database schema (for P2.2 analytics)
```

---

## Success Criteria

**P1 is done when:**
- Homepage shows 6-card grid (not 5 repetitive sections)
- All pages pass WCAG AA accessibility audit
- All 6 listen pages have identical player layout and controls
- All buttons are 44px minimum, all pages tested on mobile
- Design tokens documented and applied consistently
- pnpm check ✓ | pnpm test 36/36 ✓ | pnpm build ✓

**P2 is done when:**
- Persistent mini-player works across all pages
- Download analytics tracked in database
- Email capture optional on free downloads
- /projects archive page live
- Enhanced Connect page with testimonials

---

## Next Steps

1. Read `references/product-priorities.md` in full
2. Read `references/codex-brief-ux-refinement.md` for detailed UX audit
3. Start with **P1.1 (Homepage Grid)** — highest impact, unblocks other work
4. Work through P1 in order: Grid → Accessibility → Player Consistency → Mobile → Design System
5. Push to main after each major milestone
6. Update todo.md as you go — mark items [x] when complete
7. Run tests after every change

**Questions?** Check the brief files first — they have all the context you need.

Good luck. Build something great. 🚀
