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

## Artist Page & EPK Build (COMPLETE)
- [x] Upload 3 professional artist photos to CDN
- [x] Create Sacred Noir Bronzeville Edition design system document
- [x] Build Artist.tsx page with hero, proof strip, featured performance
- [x] Build video narrative gallery (3 films: The Stage, The Message, The Beginning)
- [x] Build artist statement section with portrait
- [x] Build mission/covenant section with email signup
- [x] Build booking & media contact section
- [x] Build social links footer (@mosessog)
- [x] Register /artist route in App.tsx
- [x] Add Artist link to GlobalNav
- [x] Verify EPK PDF download handler
- [x] pnpm check ✓ | pnpm test 36/36 ✓ | pnpm build ✓

## P0 — Critical Path (2-Week Sprint) — NEXT FOCUS

### P0.1 — Global Navigation
- [x] Create client/src/components/GlobalNav.tsx with MOSES logo, project links, Store, Connect
- [x] Add mobile hamburger menu with large tap targets (44px × 44px hamburger, 48px menu items)
- [x] Implement active route highlighting
- [x] Wrap all routes in App.tsx with GlobalNav
- [x] Remove duplicate navigation from individual pages

### P0.2 — Reusable Download Component
- [x] Create client/src/components/DownloadButton.tsx (fetch → blob → createObjectURL)
- [x] Add loading state + error handling (toast notifications, disabled state, spinner)
- [x] Verify Home.tsx has no legacy custom download handlers and uses shared download infrastructure
- [x] Replace download logic in BathshebaListen.tsx
- [x] Replace download logic in MixtapeListen.tsx
- [x] Replace download logic in NewGenesisListen.tsx
- [x] Replace download logic in AbcsListen.tsx
- [x] Replace download logic in Mixtape.tsx (DEDICATION)

### P0.3 — Consistent Audio Player
- [x] Audit all 6 listen pages for player inconsistencies
- [x] Standardize shared listening infrastructure: `ListenNavigation`, `DownloadButton`, route error boundaries, and retryable audio-load feedback
- [x] Preserve project-specific visual direction while standardizing album presentation, playback controls, progress, volume, tracklist, downloads, and recovery behavior
- [x] Ensure each player exposes play/pause, previous/next, progress, volume, tracklist, individual downloads, and a project download path
- [x] Test all 6 players in iPhone SE, iPhone 14 Pro, and Android-standard device emulation

### P0.4 — Mobile Download Experience
- [x] Trigger and verify representative downloads in iPhone-class device emulation
- [x] Trigger and verify representative downloads in Android-class device emulation
- [x] Add toast notification when download starts
- [x] Use direct focused purchase flows and non-blocking download controls on mobile

### P0.5 — Store Page Clarity
- [x] Reorder products: CLARITY first (hero), New Genesis, then free projects
- [x] Add cover art to all product cards
- [x] Clear labeling: "FREE" vs. "$12 — Pay What You Want"
- [x] For New Genesis: "Free to download. Support this project — $12"
- [x] Show cover art on the focused direct checkout route

## P1 — Important (Next 4 Weeks)

### P1.1 — Homepage Redesign
- [x] Replace 5 repetitive sections with 6-card catalog grid
- [x] Keep CLARITY as full-screen hero
- [x] Each card: cover art, title, track count, price badge, CTA
- [x] Test responsive catalog behavior during a real 390px narrow-viewport review

### P1.2 — Accessibility Foundations
- [x] Add ARIA labels to all audited visible interactive elements
- [x] Fix heading hierarchy (H1 → H2 → H3)
- [x] Add skip-to-content links
- [x] Run a measured WCAG AA contrast audit across key routes and repair every failing pairing
- [x] Test keyboard-only navigation on the focused checkout conversion flow

### P1.3 — Audio Player Error Handling
- [x] Add error boundaries to all players
- [x] Show error message if track fails to load
- [x] Add retry button for failed tracks
- [x] Show error message if download fails

### P1.4 — Mobile Optimization
- [x] Re-run and complete visible-primary-target verification at the 44px mobile standard
- [x] Test the rebuilt public routes on iPhone SE, iPhone 14 Pro, and Android-standard device emulation
- [x] Use focused direct checkout rather than a mobile-blocking checkout modal
- [x] Verify all listening route tracklists preserve their layout without horizontal overflow

### P1.5 — Visual Design System
- [x] Establish consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
- [x] Standardize typography (Bebas, Cormorant, mono)
- [x] Standardize hover/focus states
- [x] Consistent color usage (semantic naming)

## P2 — Deferred Product Roadmap (requires a new approved brief)
- Deferred — Persistent mini-player (bottom bar): retain project-scoped listening until cross-project playback behavior is specified.
- Deferred — Download analytics dashboard: requires reporting definitions, event retention, and an owner-facing metrics brief.
- Deferred — Email capture on free download: intentionally excluded because the approved funnel gates only the homepage and CLARITY listening route.
- [x] /projects archive page
- [x] Exclude testimonials from the Connect roadmap because no verified customer testimonial source has been supplied and fabricated social proof is prohibited

## P3 — Deferred Product Roadmap (requires a new approved brief)
- Deferred — User accounts & wishlists: requires a defined member-access and data model.
- Deferred — Social sharing: requires approved campaign copy, imagery, and channel priorities.
- [x] Maintain the existing professional YouTube video integration; defer podcast expansion until a program and media library are supplied
- [x] Defer merch integration because no physical merchandise catalog exists in the approved project scope
- Deferred — Analytics dashboard: requires reporting definitions and an owner-facing metrics brief.

## Critical Fixes (Jun 15) — COMPLETE
- [x] Fix video IDs: Church = CC3lHW_usho, Final Prayer = xn0KdOotyTI (were swapped)
- [x] Fix image loading: storage proxy /manus-storage/* registered in server/_core/index.ts
- [x] Fix GlobalNav nested <a> inside <Link> (wouter DOM nesting error)
- [x] Build EPK One-Sheet PDF (WeasyPrint, with photos)
- [x] Build EPK Short Bio PDF (WeasyPrint, with photos)
- [x] Build EPK Long Bio PDF (2-page, WeasyPrint, with photos)
- [x] Build EPK Full Press Kit ZIP (3 PDFs + 4 hi-res photos)
- [x] Upload all EPK files to CDN via manus-upload-file --webdev
- [x] Rewrite Artist.tsx with Manus 1.6 polish (Sacred Noir design system)
- [x] EPK download panel with 4 items + photo preview strip
- [x] pnpm check ✓ | pnpm test 36/36 ✓

## Reference Site Audit & Strategic Revision Plan (COMPLETE)
- [x] Audit 9 leading reference artist websites (Future, Kendrick/pgLang, Drake, Kanye, Lil Wayne, NBA YoungBoy, Travis Scott, Tyler/Golf Wang, Chance, Lil Baby)
- [x] Deconstruct information architecture, navigation, music discovery, and D2C funnels
- [x] Compare benchmark tactics against MOSES's catalog depth and CLARITY visual world
- [x] Formulate strategic revision plan for catalog archival vault, InvestFest QR funnels, and EPK positioning
- [x] Document audit and recommendations in references/artist-website-audit-and-strategy.md
- [x] pnpm check ✓ | pnpm test 36/36 ✓

## $100K Artist Ecosystem Build — Production Revision
- [x] Write production build specification with user journeys, success metrics, and acceptance criteria
- [x] Audit current Home, Store, Links, Listen, Artist, ClaritySales, Checkout, and Event routes before redesign
- [x] Rebuild homepage around CLARITY flagship hero and curated multi-project catalog vault
- [x] Add catalog project-card metadata: cover art, release type, track count, duration, price/access, and primary action
- [x] Add clear fan pathways: Buy CLARITY, Listen, Explore the Archive, Enter the Artist/EPK page
- [x] Implement consistent project navigation and return paths across catalog/listen pages
- [x] Standardize listen-page entry shell, cross-project return navigation, tracklist access, and email-gate behavior while preserving project-specific player art direction
- [x] Improve CLARITY sales-to-listen-to-checkout funnel without adding an email gate to sales or checkout entry
- [x] Refine homepage VaultGate so bypass routes remain direct and homepage capture remains intentional
- [x] Refine Links page as a no-email branded link tree with Vault, CLARITY, music, videos, and social destinations
- [x] Refine Artist/EPK professional pathway and booking/media calls to action
- [x] Improve responsive layouts, mobile tap targets, keyboard focus, heading hierarchy, and contrast
- [x] Review image loading, alt text, lazy loading, aspect-ratio containment, and fallback states
- [x] Add/update Vitest coverage for critical route/content/funnel behavior
- [x] Run repeated visual and functional review passes; fix all discovered issues
- [x] Run pnpm check, pnpm test, pnpm build, and final dev status verification
- [x] Save final production checkpoint after all acceptance criteria pass

## Reference Site Audit & Strategic Revision Plan (COMPLETE)
- [x] Audit 9 leading reference artist websites (Future, Kendrick/pgLang, Drake, Kanye, Lil Wayne, NBA YoungBoy, Travis Scott, Tyler/Golf Wang, Chance, Lil Baby)
- [x] Deconstruct information architecture, navigation, music discovery, and D2C funnels
- [x] Compare benchmark tactics against MOSES's catalog depth and CLARITY visual world
- [x] Formulate strategic revision plan for catalog archival vault, InvestFest QR funnels, and EPK positioning
- [x] Document audit and recommendations in references/artist-website-audit-and-strategy.md
- [x] pnpm check ✓ | pnpm test 36/36 ✓

## Build Notes
- [x] All implementation must preserve the multi-project catalog and existing Stripe integration.
- [x] Do not fabricate reviews, ratings, testimonials, or other user-generated proof.
- [x] Do not add physical merchandise assumptions; prioritize digital projects, listening, EPK, booking, and email access.
- [x] Keep `/clarity-sales`, `/checkout`, and all listening routes free of duplicate capture; gate only the homepage Vault entry as finalized.
- [x] Keep `/links` free of email capture as requested.
- [x] All media must remain in S3/CDN or storage proxy, never committed as local deployment assets.
- [x] Use the existing Sacred Noir / Bronzeville visual language while improving hierarchy and conversion clarity.
- [x] Use server-side routes and existing tRPC patterns for data operations; do not introduce unapproved third-party APIs.
- [x] Keep the final response concise and attach the final checkpoint only after full verification.

todo.md added build specification and acceptance criteria before implementation.
Read me and proceed to build.

- [x] Add a dedicated `/projects` archive route using the centralized project catalog for repeatable catalog discovery.

## Full Manus 1.6 Cohesive Rebuild
- [x] Re-audit every public route against the approved $100K blueprint and identify the exact rebuild surface.
- [x] Unify the site-wide Sacred Noir / Bronzeville system across home, archive, sales, listening, artist, links, event, and checkout routes.
- [x] Rebuild the homepage and archive as a single flagship-to-catalog information architecture.
- [x] Rebuild the six project listening experiences around consistent navigation, download behavior, and media error recovery.
- [x] Rebuild the direct-to-fan conversion journey: QR sales page, direct checkout, email-gated listening, and returning-fan access.
- [x] Rebuild professional routes: artist page, EPK, booking/media calls to action, and email-free link tree.
- [x] Perform fresh desktop, narrow-mobile, keyboard, media-loading, download, and conversion-flow QA; fix every discovered issue.
- [x] Add or revise Vitest coverage for all new route-policy, catalog, and conversion decisions.
- [x] Run pnpm check, pnpm test, and pnpm build after final QA passes; save the completed rebuild checkpoint next.
- [x] Reduce the initial JavaScript bundle by lazy-loading non-home public routes after the production-build review.

## Single Vault Entry Revision
- [x] Keep the Vault Gate as the homepage-only mandatory email capture.
- [x] Remove duplicate email capture from CLARITY listening and any other post-entry music route.
- [x] Preserve the existing unlock state so a captured visitor is never prompted again during sales, checkout, listening, or downloads.
- [x] Add regression coverage for the one-email-entry policy and verify the full fan journey.
