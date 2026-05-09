# MOSES Storefront - Feature Checklist

## Design & Styling
- [x] Set up global design tokens (colors, typography, spacing)
- [x] Configure Tailwind CSS with custom theme
- [x] Import Google Fonts (Bebas Neue, DM Mono, Cormorant Garamond)
- [x] Create global CSS variables and utility classes

## Navigation & Layout
- [x] Project initialized with web-db-user scaffold
- [x] Build sticky navigation header with brand name
- [x] Implement cart button with item count badge
- [x] Create responsive layout structure

## Hero Section
- [x] Build hero section with large typographic title
- [x] Add hero subtitle with elegant styling
- [x] Add decorative rule/divider element

## Product Grid & Canvas Art
- [x] Define product data structure (5 releases)
- [x] Build product card component
- [x] Implement canvas-based cover art generation
- [x] Create geometric pattern functions (grid, circle, lines, dots, cross)
- [x] Add hover effects with preview overlay
- [x] Implement responsive grid layout (3 columns on desktop, responsive on mobile)

## Shopping Cart System
- [x] Create cart state management (React Context or local state)
- [x] Implement add-to-cart functionality
- [x] Implement remove-from-cart functionality
- [x] Update cart badge in real-time
- [x] Calculate and display cart total
- [x] Disable add button for items already in cart

## Cart Panel
- [x] Build slide-out cart panel component
- [x] Add cart backdrop/overlay
- [x] Display cart items with thumbnails
- [x] Show item details (name, type, price)
- [x] Implement remove item button
- [x] Display cart subtotal
- [x] Add checkout button

## Checkout Modal
- [x] Build checkout modal with form
- [x] Add form fields (name, email, card number, expiry, CVC)
- [x] Implement card number formatting (spaces every 4 digits)
- [x] Implement expiry date formatting (MM / YY)
- [x] Add order summary with line items
- [x] Implement form validation
- [x] Add cancel and complete purchase buttons

## Success Screen
- [x] Build success screen component
- [x] Display success checkmark and message
- [x] Generate download links for purchased items
- [x] Implement continue shopping button
- [x] Reset cart after successful purchase

## Responsive Design
- [x] Test desktop layout (1100px max-width)
- [x] Test tablet layout (product grid adjusts)
- [x] Test mobile layout (single column or 2-column grid)
- [x] Ensure navigation is accessible on mobile
- [x] Test cart panel on mobile devices

## Polish & Interactions
- [x] Add smooth transitions and animations
- [x] Implement hover states for all interactive elements
- [x] Add focus states for accessibility
- [x] Test form input interactions
- [x] Ensure visual feedback for all user actions

## Testing
- [x] Write unit tests for cart logic
- [x] Write tests for product data
- [x] Test add/remove cart functionality
- [x] Test checkout form validation
- [x] Test responsive breakpoints

## Deployment
- [x] Create checkpoint before delivery
- [x] Verify all features work end-to-end
- [x] Final visual polish and QA
- [x] Add Clarity album as first product upload
- [x] All tests passing (19 tests)

## New Product: Clarity Album
- [x] Upload Clarity album cover image to CDN
- [x] Add Clarity product to product data (6th product, $8)
- [x] Update product grid to display 6 items
- [x] Test Clarity album in cart and checkout flow
- [x] Verify all 12 tracks are available for download after purchase
- [x] Update tests to include Clarity album (6 products total)


## P0 — CLARITY Sales Page Rewrite (Revenue Focus)
- [x] Rewrite /clarity page with 7-section conversion copy
- [x] Update price to $10 across all pages
- [x] Add order bump option ($5 digital booklet)
- [x] Ensure checkout flow is frictionless
- [x] Test full purchase-to-delivery flow
- [x] Verify all CTAs are functional

## P0 — ZIP Download Fix
- [x] Fix track 4 "Over" WAV → MP3 in zip-download.ts (was pointing to old WAV CDN URL)
- [x] Upgrade Downloads page visual design to match brand (dark theme, green accents, album art)
- [x] Home page redesign
- [x] Connect page redesign
- [x] Add lyric PDF (CLARITY-Lyric-Book.pdf) to createClarityBundle ZIP in zip-service.ts
- [x] Fix download URL domain in purchase emails (webhook + free order) — use https://mosessog.com as fallback
- [x] Home page redesign — 6 sections: Hero, Featured Project, Value Props, Pathway Cards, Mission, Footer
- [x] Connect page redesign — 6 sections: Hero, Email Signup, Social Links, Live/Events, Direct Contact, Footer

## P1 — Dedication Mixtape Release
- [x] Upload 14 Dedication tracks to CDN and create mixtape data structure
- [x] Create /mixtape landing page with one-click free download and upsell to CLARITY
- [x] Update Home page with Dedication link/CTA
- [x] Update Store page to include both Dedication (free) and CLARITY (paid)

## P1 — Bathsheba Listen Page Refinement
- [x] Optimize BathshebaListen.tsx for mobile (responsive player, touch-friendly controls)
- [x] Add full project download button to Bathsheba listen page
- [x] Fix individual track downloads (ensure all tracks download correctly)
- [x] Optimize performance for slow connections (preload optimization, lazy loading)
- [x] Create immersive high-fidelity listening experience with fluent UI

## P1 — Bathsheba Listening Experience Refinement
- [x] Add Dedication cover art to Home page hero section (two-column layout with art + text)
- [x] Refine Bathsheba landing page for cohesive visual flow
- [x] Refine BathshebaListen.tsx for immersive flow-through listening experience

## P0 — Bathsheba Download Fix
- [x] Fix Bathsheba full project ZIP download on listen page (fetch/blob/createObjectURL pattern)
- [x] Fix Bathsheba individual track downloads on listen page (fetch/blob/createObjectURL pattern)
- [x] Fix BATHSHEBA cover art URL on Home page (was 403, updated to correct .webp CDN URL)
- [x] Fix misleading "Minimum $12" hint text in Store checkout modal for free products
- [x] Apply same fetch/blob download fix to Dedication (Mixtape.tsx, Home.tsx)

## P1 — Back to Basics: ABCs Release
- [x] Upload 11 ABCs tracks to CDN
- [x] Upload ABCs cover art to CDN
- [x] Create client/src/data/abcs-bundle.ts with all CDN URLs and track metadata
- [x] Create server/zip-abcs.ts ZIP builder
- [x] Add /api/download/abcs route to server/_core/routes.ts
- [x] Build /abcs landing page (Abcs.tsx) — warm/gritty studio aesthetic, dark amber/brown tones
- [x] Build /abcs/listen page (AbcsListen.tsx) — full player matching BATHSHEBA listen experience
- [x] Add ABCs to Home.tsx as featured/secondary project section
- [x] Add ABCs to Store.tsx as FREE product
- [x] Register /abcs and /abcs/listen routes in App.tsx
- [x] pnpm check ✓ | pnpm test 36/36 ✓ | pnpm build ✓

## P1 — New Genesis Release
- [x] Download 15 New Genesis tracks from moses-music GitHub repo
- [x] Upload New Genesis tracks + cover art to CDN
- [x] Create client/src/data/new-genesis-bundle.ts with all CDN URLs
- [x] Create server/zip-new-genesis.ts ZIP builder
- [x] Add /api/download/new-genesis route to server/_core/routes.ts
- [x] Build /new-genesis landing page (NewGenesis.tsx) — deep blue/indigo, biblical/cosmic aesthetic
- [x] Build /new-genesis/listen page (NewGenesisListen.tsx) — full player
- [x] Add New Genesis to Home.tsx
- [x] Add New Genesis to Store.tsx ($12 pay-what-you-want)
- [x] Register /new-genesis and /new-genesis/listen routes in App.tsx
- [x] server/routers.ts — New Genesis Stripe product label added

## P1 — If I Wrote A Mixtape Release
- [x] Download 30 Mixtape tracks from moses-music GitHub repo
- [x] Upload Mixtape tracks + cover art to CDN
- [x] Create client/src/data/mixtape-bundle.ts with all CDN URLs
- [x] Create server/zip-mixtape.ts ZIP builder
- [x] Add /api/download/mixtape route to server/_core/routes.ts
- [x] Build /mixtape landing page (IfIWroteAMixtape.tsx) — raw/street energy, pre-lockdown 2020 feel
- [x] Build /mixtape/listen page (MixtapeListen.tsx) — full player, handles 30 tracks
- [x] Add Mixtape to Home.tsx
- [x] Add Mixtape to Store.tsx as FREE product
- [x] Register /mixtape and /mixtape/listen routes in App.tsx

## P0 — Critical Path (2-Week Sprint) — NEXT FOCUS

### P0.1 — Global Navigation
- [ ] Create client/src/components/GlobalNav.tsx with MOSES logo, project links, Store, Connect
- [ ] Add mobile hamburger menu with large tap targets
- [ ] Implement active route highlighting
- [ ] Wrap all routes in App.tsx with GlobalNav
- [ ] Remove duplicate navigation from individual pages

### P0.2 — Reusable Download Component
- [ ] Create client/src/components/DownloadButton.tsx (fetch → blob → createObjectURL)
- [ ] Add loading state + error handling
- [ ] Replace download logic in Home.tsx (5 handlers)
- [ ] Replace download logic in BathshebaListen.tsx
- [ ] Replace download logic in MixtapeListen.tsx
- [ ] Replace download logic in NewGenesisListen.tsx
- [ ] Replace download logic in AbcsListen.tsx
- [ ] Replace download logic in Mixtape.tsx (DEDICATION)

### P0.3 — Consistent Audio Player
- [ ] Audit all 6 listen pages for player inconsistencies
- [ ] Standardize on one player shell (ProjectListenPage.tsx or new AudioPlayer.tsx)
- [ ] Same layout: album art (left), controls (right/bottom)
- [ ] Same controls: play/pause, prev/next, progress, volume, tracklist
- [ ] Test mobile behavior on all 6 players

### P0.4 — Mobile Download Experience
- [ ] Test all downloads on iOS Safari
- [ ] Test all downloads on Android Chrome
- [ ] Add toast notification when download starts
- [ ] Ensure modals don't block downloads on mobile

### P0.5 — Store Page Clarity
- [ ] Reorder products: CLARITY first (hero), New Genesis, then free projects
- [ ] Add cover art to all product cards
- [ ] Clear labeling: "FREE" vs. "$12 — Pay What You Want"
- [ ] For New Genesis: "Free to download. Support this project — $12"
- [ ] Show cover art in checkout modal

## P1 — Important (Next 4 Weeks)

### P1.1 — Homepage Redesign
- [ ] Replace 5 repetitive sections with 6-card catalog grid
- [ ] Keep CLARITY as full-screen hero
- [ ] Each card: cover art, title, track count, price badge, CTA
- [ ] Test on mobile

### P1.2 — Accessibility Foundations
- [ ] Add ARIA labels to all interactive elements
- [ ] Fix heading hierarchy (H1 → H2 → H3)
- [ ] Add skip-to-content links
- [ ] Ensure WCAG AA color contrast (4.5:1)
- [ ] Test keyboard-only navigation

### P1.3 — Audio Player Error Handling
- [ ] Add error boundaries to all players
- [ ] Show error message if track fails to load
- [ ] Add retry button for failed tracks
- [ ] Show error message if download fails

### P1.4 — Mobile Optimization
- [ ] Ensure all buttons are 44px × 44px minimum
- [ ] Test on iPhone SE, iPhone 14 Pro, Android
- [ ] Full-screen modals on mobile
- [ ] Ensure tracklist scrolls without breaking layout

### P1.5 — Visual Design System
- [ ] Establish consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
- [ ] Standardize typography (Bebas, Cormorant, mono)
- [ ] Standardize hover/focus states
- [ ] Consistent color usage (semantic naming)

## P2 — Nice-to-Have (Backlog)
- [ ] Persistent mini-player (bottom bar)
- [ ] Download analytics dashboard
- [ ] Email capture on free download
- [ ] /projects archive page
- [ ] Enhanced Connect page with testimonials

## P3 — Future Exploration
- [ ] User accounts & wishlists
- [ ] Social sharing
- [ ] Podcast/video integration
- [ ] Merch integration
- [ ] Analytics dashboard
