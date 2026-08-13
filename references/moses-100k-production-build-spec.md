# MOSES $100K Digital Artist Ecosystem

## North Star

Build a digital artist ecosystem that feels like a cultural institution rather than a generic storefront. The experience must make MOSES’s catalog feel deep, intentional, and easy to enter while preserving a distinct Sacred Noir / Bronzeville identity.

## Core Positioning

MOSES is a Chicago-born prophetic hip-hop artist with a substantial recording archive, a flagship visual world in *CLARITY*, and a professional artist/EPK pathway for bookings, press, and partnerships. The product is not merely a single album page; it is a **curated music vault** with a clear entry point, strong project hierarchy, and direct relationship with listeners.

## Primary Audiences

| Audience | Need | Primary route | Success action |
| --- | --- | --- | --- |
| New fan from QR/social | Immediate context and a clear first listen | `/` or `/clarity-sales` | Listen, buy, or join the covenant |
| Existing fan | Easy access to the catalog | `/` and `/projects` | Choose an era and start listening |
| Industry / booking | Proof, story, images, and contact | `/artist` | Download EPK or inquire |
| Community / partner | Mission and direct contact | `/connect` | Subscribe or send an inquiry |

## Required User Journeys

1. **QR sales journey:** scan → `/clarity-sales` → see the project without an email gate → Buy Now → checkout.
2. **Listen journey:** sales page → `/listen` → email gate → full player and tracklist.
3. **Catalog journey:** homepage → project vault → project landing page → listen/download.
4. **Professional journey:** homepage or global navigation → `/artist` → EPK / booking / media contact.
5. **Link-tree journey:** `/links` → Vault, CLARITY, videos, and social channels, with no email capture.

## Production Principles

The build should use one visual system, not six disconnected microsites. Use obsidian, warm paper, Bronzeville gold, restrained green for actions, and project-specific secondary hues only when they remain subordinate to the MOSES system. Use large type, strong image containment, generous spacing, and deliberate motion under 300ms. Every action must have a visible focus state and a clear mobile tap target.

## Homepage Architecture

The homepage will contain: a flagship CLARITY hero; a compact proof bar; a curated project vault grid; an archive statement that explains the breadth of the catalog; a professional artist/EPK pathway; a covenant signup; and a minimal footer. The homepage should not repeat six long editorial sections that force visitors to scroll through the catalog linearly.

## Project Vault Data Contract

Each project card needs a stable title, short descriptor, cover image, route, listen route, track count, access label, accent color, and one primary CTA. Paid or flagship projects should route to a sales or checkout path; free projects should route to listening and download.

## Acceptance Criteria

The build is not complete until:

- The homepage communicates what MOSES is within the first viewport.
- CLARITY is visually dominant and has distinct Listen First / Buy Now actions.
- All catalog projects remain discoverable without a wall of repeated sections.
- `/clarity-sales` has no email gate; `/listen` requires email before playback.
- `/links` has no email capture.
- `/artist` remains an industry-ready EPK destination.
- Images preserve aspect ratio, include meaningful alt text, lazy-load below the fold, and have a fallback state.
- Interactive controls are keyboard-accessible, visibly focused, and at least 44px where appropriate.
- Mobile layouts work at narrow widths without horizontal overflow.
- TypeScript, Vitest, and production build checks pass.
- A final visual review has been performed and all discovered issues are fixed before delivery.

## Implementation Order

1. Replace homepage structure with flagship hero, proof, project vault, and professional pathway.
2. Extract shared project-card data and styling so the catalog can scale.
3. Normalize the CLARITY sales/listen pathway and preserve requested email-gate boundaries.
4. Review links, artist, and global navigation for consistent conversion language.
5. Run QA at desktop and mobile sizes, fix findings, and rerun checks.

## Explicit Non-Goals

Do not invent physical merchandise, testimonials, ratings, or reviews. Do not turn the site into a CLARITY-only catalog. Do not add email gates to the sales page, checkout page, event page, artist page, or links page.

## Benchmark Basis

The structure is informed by the comparative audit in `references/artist-website-audit-and-strategy.md`, especially the minimalist narrative posture of pgLang, the music-first behavior observed on Lil Baby’s portal, and the curated archive logic of premium artist brands.

Prepared by Manus AI.
