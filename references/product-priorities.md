# MOSES SOG Storefront — Prioritized Product Plan

**Framework:** P0 (critical, 2-week sprint), P1 (important, next month), P2 (nice-to-have, backlog), P3 (future exploration)

---

## P0 — Critical Path (Must Ship in 2 Weeks)

These are the things that directly impact whether the storefront works as intended. Without these, the product is broken or confusing.

### P0.1 — Global Navigation (CRITICAL)
**Why:** Users have no consistent way to navigate between projects. Each page is isolated. This breaks the "ecosystem" feeling.
- Create `client/src/components/GlobalNav.tsx` — sticky top nav with MOSES logo, project links, Store, Connect
- Mobile: hamburger menu with large tap targets
- Active route highlighting
- Apply to all pages via App.tsx wrapper
- **Acceptance:** Users can jump from any page to any project in one click

### P0.2 — Reusable Download Component (CRITICAL)
**Why:** Download logic is duplicated across 6+ pages. This creates maintenance debt and inconsistent UX.
- Create `client/src/utils/downloadFile.ts` (if not exists) or `client/src/components/DownloadButton.tsx`
- Implement fetch → blob → createObjectURL pattern once
- Replace all duplicate download handlers in Home.tsx, all *Listen.tsx pages
- Show loading state + error handling
- **Acceptance:** All downloads use the same component, same behavior, same error messages

### P0.3 — Consistent Audio Player Across Projects (CRITICAL)
**Why:** CLARITY has a custom player, BATHSHEBA has its own, Mixtape has another. They should feel like the same product.
- Audit all 6 listen pages: `/listen`, `/bathsheba/listen`, `/mixtape/listen`, `/new-genesis/listen`, `/abcs/listen`, `/dedication`
- Standardize on one player shell (likely `ProjectListenPage.tsx` or new `AudioPlayer.tsx`)
- Same layout: album art (left), controls (right on desktop, bottom on mobile)
- Same controls: play/pause, prev/next, progress bar, volume, tracklist
- Same mobile behavior: full-width, thumb-friendly buttons
- **Acceptance:** All 6 projects feel like they use the same player

### P0.4 — Mobile Download Experience (CRITICAL)
**Why:** Mobile users can't download reliably. Downloads fail silently or feel broken.
- Test all download buttons on mobile (iOS Safari, Android Chrome)
- Ensure fetch → blob → createObjectURL works on mobile
- Add visual feedback: toast notification when download starts
- Ensure modal/dialog doesn't block download on mobile
- **Acceptance:** Download works on mobile, user gets clear feedback

### P0.5 — Store Page Clarity (CRITICAL)
**Why:** Users don't understand what's free vs. paid. The pay-what-you-want model is confusing.
- Reorder store products: CLARITY first (hero), New Genesis second, then free projects
- Add cover art to all product cards (not just text)
- Clear labeling: "FREE" vs. "$12 — Pay What You Want"
- For New Genesis: "Free to download. Support this project — $12"
- Modal should show cover art + clear pricing
- **Acceptance:** User can instantly see what's free and what costs money

---

## P1 — Important (Next 4 Weeks)

These improve the experience significantly but don't block core functionality.

### P1.1 — Homepage Redesign
**Why:** Homepage is currently a long scroll of repeated sections. It should be a clear hub.
- Replace 5 repetitive two-column sections with a compact 6-card catalog grid
- Hero: CLARITY (full-width, green accent)
- Below: 6-card grid (BATHSHEBA, Mixtape, New Genesis, ABCs, Dedication, + Store/Connect)
- Each card: cover art, title, track count, price badge, single CTA
- **Acceptance:** Homepage loads, user understands all projects in 5 seconds

### P1.2 — Accessibility Foundations
**Why:** Site is not keyboard-navigable. Screen readers can't read it properly.
- Add ARIA labels to all interactive elements (buttons, links, form inputs)
- Ensure heading hierarchy is correct (H1 → H2 → H3, no skips)
- Add skip-to-content link at top of each page
- Ensure color contrast meets WCAG AA (4.5:1 for text)
- Test with keyboard-only navigation (Tab, Enter, Escape)
- **Acceptance:** Site is navigable with keyboard alone, screen reader can read all content

### P1.3 — Audio Player Error Handling
**Why:** If a track fails to load, player breaks silently. User has no idea what happened.
- Add error boundaries to all audio players
- If track fails to load: show error message, offer retry button
- If download fails: show error message, offer retry
- Log errors to console for debugging
- **Acceptance:** Player gracefully handles network failures, user knows what went wrong

### P1.4 — Mobile Optimization
**Why:** Mobile experience is rough. Touch targets are too small, layout breaks on small screens.
- Ensure all buttons are at least 44px × 44px (thumb-friendly)
- Test on iPhone SE, iPhone 14 Pro, Android devices
- Ensure modals are full-screen on mobile (not centered)
- Ensure tracklist is scrollable on mobile without breaking layout
- **Acceptance:** Site feels native on mobile, no horizontal scrolling, all buttons are easy to tap

### P1.5 — Visual Design System Consistency
**Why:** Typography, spacing, and colors vary across pages. Site feels disjointed.
- Establish consistent spacing scale (4px grid: 4, 8, 12, 16, 24, 32, 48, 64px)
- Standardize typography: headings (Bebas), body (Cormorant), mono (system)
- Standardize hover/focus states across all buttons and links
- Ensure consistent color usage (semantic naming: primary, secondary, accent, etc.)
- **Acceptance:** Every page feels like it belongs to the same product

---

## P2 — Nice-to-Have (Backlog, 2+ Months)

These are valuable but not critical. Do these after P0 and P1 are shipped.

### P2.1 — Persistent Mini-Player
**Why:** Users want to browse the store while listening to music.
- Add a fixed bottom bar that shows current track + play/pause
- Survives page navigation
- Click to expand full player
- **Acceptance:** User can listen while browsing

### P2.2 — Download Analytics
**Why:** Want to know which projects are most popular.
- Log each ZIP download to database (project_id, timestamp, user_id if logged in)
- Add dashboard to see download counts by project
- **Acceptance:** Can see download trends

### P2.3 — Email Capture on Download
**Why:** Want to build mailing list.
- After free download completes, show optional email signup modal
- "Get notified of new projects"
- Store email in database
- **Acceptance:** Capturing emails from free downloaders

### P2.4 — Project Archive Page
**Why:** Single place to see all projects at once.
- Create `/projects` route
- Show all 6 projects in a grid with cover art, stats, CTAs
- **Acceptance:** New landing page for project discovery

### P2.5 — Enhanced Connect Page
**Why:** Community/email signup page is basic.
- Add testimonials or user stories
- Improve social media links presentation
- Add newsletter signup form
- **Acceptance:** Connect page feels like a real community hub

---

## P3 — Future Exploration (6+ Months)

These are strategic but not urgent. Explore after P0/P1/P2 are solid.

### P3.1 — User Accounts & Wishlists
- Users can create accounts, save favorite projects
- Track listening history
- Personalized recommendations

### P3.2 — Social Sharing
- Share individual tracks on social media
- Share playlists
- Embed player on other sites

### P3.3 — Podcast / Video Integration
- Add podcast episodes alongside music projects
- Add behind-the-scenes video content
- Video player integration

### P3.4 — Merch Integration
- Sell physical merchandise (CDs, vinyl, apparel)
- Integrate with Stripe for merch checkout
- Inventory management

### P3.5 — Analytics Dashboard
- Public stats: total downloads, revenue, top projects
- Artist dashboard for performance tracking

---

## Summary: What Gets Done When

| Timeline | What | Why |
|---|---|---|
| **Week 1-2 (P0)** | GlobalNav, DownloadButton, unified player, mobile downloads, store clarity | These are broken. Fix them first. |
| **Week 3-4 (P1)** | Homepage redesign, accessibility, error handling, mobile optimization, design system | These improve the experience significantly. |
| **Month 2+ (P2)** | Mini-player, analytics, email capture, archive page, enhanced Connect | These are valuable but not blocking. |
| **Month 6+ (P3)** | Accounts, social, video, merch, dashboard | These are strategic but can wait. |

---

## Key Principle

**Do not start P1 until P0 is shipped and tested.**  
**Do not start P2 until P1 is shipped and tested.**  
**Do not start P3 until P0/P1/P2 are solid.**

This ensures we're always working on what matters most, and we ship working features instead of half-baked everything.
