# MOSES Storefront — Codex Handoff Document

**Project:** MOSES Storefront (moses-storefront)  
**Live Domain:** https://mosessog.com  
**GitHub:** https://github.com/mosesofelgin/moses-storefront  
**Current Checkpoint:** `526660f3` (Bathsheba Listen Page Refined)  
**Tech Stack:** React 19 + Tailwind 4 + Express 4 + tRPC 11 + Drizzle ORM + MySQL/TiDB

---

## Executive Summary

MOSES Storefront is a direct-to-consumer music platform featuring three projects:
1. **DEDICATION** (14 tracks, free) — Homage to Lil Wayne
2. **BATHSHEBA** (10 tracks, free) — Purple/white royalty theme
3. **CLARITY** (12 tracks, $10 paid) — Full album experience

The platform includes:
- Premium listening experiences with custom audio players
- One-click free downloads (no email required)
- Stripe payment integration for paid projects
- Email-based download token system
- Responsive mobile-first design
- Admin-ready architecture

---

## Architecture Overview

### Directory Structure

```
client/src/
├── pages/
│   ├── Home.tsx              # Hub with Dedication hero, Bathsheba, CLARITY
│   ├── Listen.tsx            # CLARITY listening experience
│   ├── Mixtape.tsx           # DEDICATION landing page
│   ├── BathshebaListen.tsx   # BATHSHEBA audio player (recently refined)
│   ├── Store.tsx             # Product listing (Dedication, Bathsheba, CLARITY)
│   ├── Downloads.tsx         # Token-based download page
│   ├── Connect.tsx           # Email signup + social links
│   └── Success.tsx           # Post-purchase confirmation
├── components/
│   ├── DashboardLayout.tsx
│   ├── AIChatBox.tsx
│   ├── Map.tsx
│   └── ui/                   # shadcn/ui components
├── data/
│   ├── clarity-bundle.ts     # CLARITY album metadata + CDN URLs
│   ├── dedication-bundle.ts  # DEDICATION mixtape metadata + CDN URLs
│   └── bathsheba-bundle.ts   # BATHSHEBA project metadata + CDN URLs
├── App.tsx                   # Route definitions
└── index.css                 # Global design tokens

server/
├── routers.ts                # tRPC procedures (auth, checkout, subscribe)
├── db.ts                     # Database query helpers
├── stripe-webhook.ts         # Stripe event handling
├── email.ts                  # Resend email service
├── downloads.ts              # Download token generation/verification
├── zip-service.ts            # CLARITY ZIP creation
├── zip-dedication.ts         # DEDICATION ZIP creation
├── zip-bathsheba.ts          # BATHSHEBA ZIP creation
├── _core/
│   ├── routes.ts             # Express route handlers for downloads
│   ├── env.ts                # Environment variables
│   ├── stripe-webhook.ts     # Webhook signature verification
│   └── [other core files]
└── [other utilities]

drizzle/
├── schema.ts                 # Database tables (users, subscribers, orders)
└── migrations/               # SQL migrations
```

---

## Current Project Status

### ✅ Completed Features

**Core Platform:**
- [x] User authentication via Manus OAuth
- [x] Stripe payment integration (test + live keys configured)
- [x] Email-based download token system
- [x] Free project downloads (no email required)
- [x] Paid project checkout flow
- [x] Purchase confirmation emails via Resend
- [x] Download fulfillment (ZIP + individual files)

**Projects:**
- [x] DEDICATION — 14 tracks, free, one-click download, landing page, Mixtape player
- [x] BATHSHEBA — 10 tracks, free, custom audio player, full project + individual downloads
- [x] CLARITY — 12 tracks, $10 paid, premium listening experience, lyric PDF included

**Pages:**
- [x] Home page — Dedication hero (red accent), Bathsheba featured, CLARITY secondary
- [x] Listen page — CLARITY audio player with track controls
- [x] Mixtape page — DEDICATION landing with one-click download
- [x] BathshebaListen page — Custom purple/white audio player (recently refined)
- [x] Store page — All three projects with pricing
- [x] Downloads page — Token-based file access
- [x] Connect page — Email signup + social links (Instagram, YouTube, TikTok, Twitch, X, email)
- [x] Success page — Post-purchase confirmation with download links

**Design:**
- [x] Global design tokens (Bebas Neue, DM Mono, Cormorant Garamond)
- [x] Dark premium theme with accent colors (red for Dedication, purple for Bathsheba, green for CLARITY)
- [x] Mobile-first responsive design
- [x] Smooth transitions and hover states

**Infrastructure:**
- [x] All 36 tests passing
- [x] TypeScript zero errors
- [x] Build clean with no warnings
- [x] CDN asset management (manus-upload-file)
- [x] Environment variables properly configured

---

## Data Structures

### Projects (CDN-based)

**DEDICATION** (`dedication-bundle.ts`):
```typescript
export const dedicationProject = {
  id: 'dedication',
  title: 'DEDICATION',
  subtitle: 'A homage to Lil Wayne',
  description: '14 tracks of pure artistry...',
  coverArt: 'https://[CDN]/dedication-cover.png',
  releaseDate: 'April 2026',
  trackCount: 14,
};

export const dedicationTrackList = [
  { id: 1, number: 1, title: 'Close To You', url: 'https://[CDN]/01-Close-To-You.mp3', duration: '3:00' },
  // ... 14 tracks total
];
```

**BATHSHEBA** (`bathsheba-bundle.ts`):
```typescript
export const bathshebaProject = {
  id: 'bathsheba',
  title: 'BATHSHEBA',
  subtitle: 'Royalty. Grace. Sovereignty.',
  coverArt: 'https://[CDN]/bathsheba-cover.png',
  trackCount: 10,
};

export const bathshebaTrackList = [
  { id: 1, number: 1, title: 'Close To You', url: 'https://[CDN]/01-Close-To-You.mp3', duration: '3:00' },
  // ... 10 tracks total
];
```

**CLARITY** (`clarity-bundle.ts`):
```typescript
export const clarityProject = {
  id: 'clarity',
  title: 'CLARITY',
  subtitle: '10 years. One testimony. Truth-driven music.',
  coverArt: 'https://[CDN]/album-cover.png',
  trackCount: 12,
};

export const clarityTrackList = [
  { id: 1, number: 1, title: 'Track Name', url: 'https://[CDN]/track.mp3', duration: '3:00' },
  // ... 12 tracks total
];
```

### Database Schema

**users** table:
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user',
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**subscribers** table:
```sql
CREATE TABLE subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**orders** table:
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  stripe_payment_intent_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  amount_cents INT,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50),
  product_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**download_tokens** table:
```sql
CREATE TABLE download_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(255) UNIQUE,
  project_id VARCHAR(50),
  email VARCHAR(255),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Download Routes

**Free Project Downloads:**
- `GET /api/download/dedication` — Download DEDICATION ZIP (no auth)
- `GET /api/download/bathsheba` — Download BATHSHEBA ZIP (no auth)

**Paid Project Downloads:**
- `GET /api/download/all/:token` — Download CLARITY ZIP (token-verified)
- `GET /api/download/:token/:fileId` — Download individual file (token-verified)

### tRPC Procedures

**Auth:**
- `trpc.auth.me.useQuery()` — Get current user
- `trpc.auth.logout.useMutation()` — Logout

**Store:**
- `trpc.store.checkout.useMutation({ productId, email })` — Create Stripe checkout session
- `trpc.store.freeOrder.useMutation({ projectId, email })` — Create free order

**Subscribers:**
- `trpc.subscribe.addEmail.useMutation({ email, name })` — Add to email list

**System:**
- `trpc.system.notifyOwner.useMutation({ title, content })` — Send owner notification

---

## Recent Refinements (Checkpoint 526660f3)

### BathshebaListen.tsx Improvements

**Mobile Optimization:**
- Responsive typography (3.5rem–11rem headline scaling)
- Touch-friendly button sizing
- Vertical button stacking on mobile, side-by-side on desktop
- Optimized padding and gaps for small screens

**Features Added:**
- Full project download button (downloads BATHSHEBA-Project.zip)
- Individual track download buttons (direct MP3 links)
- Animated waveform visualizer (3 bars pulsing when playing)
- Progress bar with time display (current / total)
- Volume control slider with percentage display
- Track selection from interactive tracklist
- Auto-advance to next track when one finishes

**Performance:**
- `preload="metadata"` on audio element
- Lazy event listener cleanup
- Error handling for play failures
- Loading states for downloads

**UI/UX:**
- Purple gradient background (purple-950 → purple-900 → black)
- Album art with glow effect
- Now Playing info card
- Immersive high-fidelity listening experience

---

## Key Implementation Details

### Email Flow

**Free Order:**
1. User clicks "Download Free" on Dedication/Bathsheba page
2. `trpc.store.freeOrder.useMutation()` called with email
3. Backend generates 24-hour download token
4. Email sent via Resend with download link: `https://mosessog.com/downloads?token=...`
5. User clicks link → `Downloads.tsx` verifies token → displays files
6. User downloads ZIP or individual files

**Paid Order:**
1. User clicks "Buy" on Store page
2. `trpc.store.checkout.useMutation()` creates Stripe session
3. User completes payment in Stripe checkout
4. Stripe webhook (`POST /api/stripe/webhook`) receives `checkout.session.completed`
5. Backend creates order, generates download token, sends confirmation email
6. Email includes download link: `https://mosessog.com/downloads?token=...`
7. User downloads CLARITY album

### Download Token System

**Generation** (`server/downloads.ts`):
```typescript
export async function generateDownloadToken(
  projectId: string,
  email: string,
  expiresIn: number = 24 * 60 * 60 * 1000 // 24 hours
): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  await db.insert(downloadTokens).values({
    token,
    projectId,
    email,
    expiresAt: new Date(Date.now() + expiresIn),
  });
  return token;
}
```

**Verification** (`server/downloads.ts`):
```typescript
export async function verifyDownloadToken(token: string) {
  const record = await db.query.downloadTokens.findFirst({
    where: (t) => eq(t.token, token),
  });
  
  if (!record || new Date() > record.expiresAt) {
    return null;
  }
  
  return record;
}
```

### ZIP Creation

**DEDICATION** (`server/zip-dedication.ts`):
```typescript
export async function createDedicationBundle() {
  const zip = new AdmZip();
  
  for (const track of dedicationTrackList) {
    const response = await fetch(track.url);
    const buffer = await response.arrayBuffer();
    zip.addFile(
      `${track.number.toString().padStart(2, '0')}-${track.title}.mp3`,
      Buffer.from(buffer)
    );
  }
  
  return zip.toBuffer();
}
```

Similar pattern for BATHSHEBA and CLARITY.

### Stripe Webhook

**Key Event:** `checkout.session.completed`
```typescript
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  
  // Create order
  const order = await db.insert(orders).values({
    userId: user.id,
    stripePaymentIntentId: session.payment_intent,
    stripeCustomerId: session.customer,
    amountCents: session.amount_total,
    productId: session.metadata.productId,
    status: 'completed',
  });
  
  // Generate download token
  const token = await generateDownloadToken(
    session.metadata.productId,
    session.customer_email,
    24 * 60 * 60 * 1000 // 24 hours
  );
  
  // Send confirmation email
  await sendPurchaseConfirmationEmail({
    email: session.customer_email,
    productName: session.metadata.productName,
    downloadUrl: `${ENV.publicSiteUrl}/downloads?token=${token}`,
  });
}
```

---

## Environment Variables

**Required (auto-configured):**
- `DATABASE_URL` — MySQL/TiDB connection
- `JWT_SECRET` — Session signing
- `VITE_APP_ID` — Manus OAuth app ID
- `OAUTH_SERVER_URL` — Manus OAuth backend
- `STRIPE_SECRET_KEY` — Stripe secret (test/live)
- `STRIPE_WEBHOOK_SECRET` — Webhook signature verification
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe public key
- `RESEND_API_KEY` — Email service
- `PUBLIC_SITE_URL` — Fallback: `https://mosessog.com`

**Optional:**
- `VITE_ANALYTICS_ENDPOINT` — Analytics service
- `VITE_ANALYTICS_WEBSITE_ID` — Analytics tracking

---

## Testing

**All Tests Passing:** 36 tests (vitest)

**Key Test Files:**
- `server/auth.logout.test.ts` — Authentication
- `server/email.test.ts` — Email service
- `server/stripe-webhook.test.ts` — Webhook handling (if exists)

**Run Tests:**
```bash
pnpm test --run
```

---

## Known Limitations & Future Work

### P2 — Next Steps

1. **Streaming Platform Links**
   - Add Spotify/Apple Music/YouTube Music buttons to Home page
   - Embed Distrokid links on Dedication/Bathsheba/CLARITY sections
   - Allow listeners to follow before purchasing

2. **Admin Dashboard** (`/admin`)
   - Subscriber count
   - Total orders
   - Revenue tracking
   - Owner-only access (role-based)

3. **Email Domain Verification**
   - Verify `mosessog.com` with Resend
   - Send emails from `moses@mosessog.com` instead of `noreply@resend.dev`
   - Improve deliverability and trust

4. **Analytics & Growth**
   - Track conversion rates (free → paid)
   - Monitor download counts
   - Email list growth tracking

5. **Content Expansion**
   - Add more projects/albums
   - Implement project versioning (v1, v2, etc.)
   - Add behind-the-scenes content

---

## Deployment & Publishing

**Current Status:** Live at https://mosessog.com

**To Publish Changes:**
1. Make code changes locally
2. Run `pnpm test --run` to verify all tests pass
3. Run `pnpm build` to verify TypeScript
4. Call `webdev_save_checkpoint` to create a checkpoint
5. Click "Publish" button in Management UI

**Stripe Configuration:**
- Test mode: Using sandbox keys (4242 4242 4242 4242)
- Live mode: Available after KYC verification
- Webhook: `https://mosessog.com/api/stripe/webhook`

---

## Code Style & Conventions

**React Components:**
- Functional components with hooks
- Use `useRef`, `useState`, `useEffect` for state
- Prefer composition over inheritance
- Use shadcn/ui components for UI elements

**Styling:**
- Tailwind CSS utility-first approach
- Use design tokens from `index.css` (colors, typography)
- Responsive: mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Animations: smooth transitions, no heavy effects

**Backend:**
- tRPC procedures for all API calls
- Drizzle ORM for database queries
- Express routes for file downloads (not tRPC)
- Error handling with proper HTTP status codes

**File Organization:**
- One component per file
- Data structures in `data/` folder
- Server logic in `server/` folder
- Keep files under 300 lines (split if needed)

---

## Contact & Questions

**Project Owner:** MOSES SOG  
**Email:** wtgexodus@gmail.com  
**Social:** @moses_sog (Instagram), @mosessog (YouTube, TikTok, Twitch), sogmoses (X)

---

## Revision Checklist for Codex

- [ ] Review current architecture and data structures
- [ ] Test all three projects (Dedication, Bathsheba, CLARITY) end-to-end
- [ ] Verify email flows (free order, paid order)
- [ ] Test download endpoints (free, paid, individual files)
- [ ] Check mobile responsiveness on all pages
- [ ] Verify Stripe webhook integration
- [ ] Run full test suite (`pnpm test --run`)
- [ ] Verify TypeScript compilation (`pnpm exec tsc`)
- [ ] Test on production domain (mosessog.com)
- [ ] Document any issues or improvements
- [ ] Propose next features (streaming links, admin dashboard, etc.)

---

**Last Updated:** May 9, 2026  
**Checkpoint:** 526660f3  
**Status:** Ready for Codex revision
