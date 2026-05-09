# MOSES Storefront — Quick Start for Codex

## Clone & Setup

```bash
git clone https://github.com/mosesofelgin/moses-storefront.git
cd moses-storefront
pnpm install
```

## Environment

All env vars are auto-configured. No manual setup needed.

```bash
# Verify env is loaded
echo $DATABASE_URL
echo $STRIPE_SECRET_KEY
```

## Run Locally

```bash
# Dev server (port 3000)
pnpm dev

# Tests
pnpm test --run

# Build
pnpm build

# TypeScript check
pnpm exec tsc
```

## Project Structure at a Glance

| Path | Purpose |
|---|---|
| `client/src/pages/` | React pages (Home, Listen, Store, Downloads, etc.) |
| `client/src/data/` | Project metadata (clarity-bundle.ts, dedication-bundle.ts, bathsheba-bundle.ts) |
| `server/routers.ts` | tRPC procedures (auth, checkout, subscribe) |
| `server/stripe-webhook.ts` | Stripe event handling |
| `server/downloads.ts` | Download token generation/verification |
| `server/zip-*.ts` | ZIP creation for each project |
| `server/_core/routes.ts` | Express routes for file downloads |
| `drizzle/schema.ts` | Database schema |

## Three Projects

| Project | Tracks | Price | Status |
|---|---|---|---|
| DEDICATION | 14 | Free | ✅ Complete |
| BATHSHEBA | 10 | Free | ✅ Complete (just refined) |
| CLARITY | 12 | $10 | ✅ Complete |

## Key Flows

### Free Download (Dedication/Bathsheba)
1. User clicks "Download Free"
2. `handleDownloadFull()` → POST to `/api/download/{project}`
3. Browser downloads ZIP instantly (no auth)

### Paid Download (CLARITY)
1. User clicks "Buy" → Stripe checkout
2. Payment confirmed → Webhook creates order + token
3. Email sent with download link
4. User clicks link → `Downloads.tsx` verifies token
5. User downloads ZIP

### Individual Track Download
1. Click download icon on track
2. Direct link to CDN MP3 (no auth)

## Testing Checklist

```bash
# 1. Run all tests
pnpm test --run

# 2. Start dev server
pnpm dev

# 3. Test flows
# - Visit http://localhost:3000
# - Click "Listen Now" on Dedication → should play
# - Click "Download Free" → should download ZIP
# - Go to /store → click "Buy CLARITY" → Stripe checkout
# - Use test card: 4242 4242 4242 4242
# - Verify success page + email sent

# 4. Check TypeScript
pnpm exec tsc

# 5. Build
pnpm build
```

## Common Tasks

### Add New Project

1. Create `client/src/data/{project}-bundle.ts` with tracks + metadata
2. Create `server/zip-{project}.ts` for ZIP creation
3. Add route to `server/_core/routes.ts`
4. Add page to `client/src/pages/{Project}.tsx`
5. Add route to `client/src/App.tsx`
6. Add to Store page product list

### Fix Download Issue

1. Check track CDN URLs in `{project}-bundle.ts`
2. Verify ZIP creation in `server/zip-{project}.ts`
3. Test endpoint: `curl http://localhost:3000/api/download/{project}`
4. Check logs: `tail -f .manus-logs/devserver.log`

### Update Email Template

1. Edit `server/email.ts`
2. Modify `sendPurchaseConfirmationEmail()` function
3. Test: `pnpm test --run`
4. Deploy: `pnpm build` → checkpoint → publish

## Stripe Testing

**Test Card:** 4242 4242 4242 4242  
**Expiry:** Any future date (e.g., 12/25)  
**CVC:** Any 3 digits  

**Dashboard:** https://dashboard.stripe.com (test mode)  
**Webhook Testing:** Use Stripe CLI or dashboard event replay

## Deployment

```bash
# Create checkpoint
webdev_save_checkpoint --description "Your changes here"

# Publish via UI
# Click "Publish" button in Management UI
```

## Troubleshooting

| Issue | Solution |
|---|---|
| Tests failing | `pnpm install`, `pnpm test --run` |
| Build errors | `pnpm exec tsc`, check for type errors |
| Download broken | Check CDN URLs in `{project}-bundle.ts`, verify ZIP creation |
| Email not sent | Check `RESEND_API_KEY` env, verify email template |
| Stripe webhook failing | Check webhook secret, verify event signature |

## Next Steps (P2)

- [ ] Add streaming platform links (Spotify, Apple Music, YouTube Music)
- [ ] Build admin dashboard (`/admin`)
- [ ] Verify email domain with Resend
- [ ] Add more projects/albums
- [ ] Implement analytics tracking

---

**Questions?** Check `CODEX_HANDOFF.md` for detailed architecture and implementation notes.
