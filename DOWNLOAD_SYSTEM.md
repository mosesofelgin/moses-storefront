# CLARITY Album Download System

## Overview

This document describes the complete download system for the CLARITY album storefront. The system enables customers to:

1. Purchase the album via Stripe (live mode)
2. Receive a unique download token via email
3. Access downloads anytime using the persistent download link
4. Download individual files or the complete bundle as a ZIP

## Architecture

### Components

#### 1. **Token Generation & Verification** (`server/downloads.ts`)
- Generates cryptographically secure download tokens using HMAC-SHA256
- Tokens are valid for 365 days
- Tokens are stored in the `downloads` table with order association
- Supports token verification and order lookup

#### 2. **Stripe Webhook Handler** (`server/_core/stripe-webhook.ts`)
- Listens for `payment_intent.succeeded` and `checkout.session.completed` events
- Creates order records when payments succeed
- Generates download tokens for customers
- Sends confirmation emails with download links
- Handles payment failures gracefully

#### 3. **Download Endpoints** (`server/_core/routes.ts`)
- **`GET /api/download/:token/:fileId`** - Download individual files
  - Validates token before serving file
  - Supports cross-browser downloads
  - Sets proper CORS and content-type headers
  
- **`GET /api/download/all/:token`** - Download complete ZIP bundle
  - Creates ZIP archive with all 12 tracks, 4 images, and lyric book
  - Validates token before serving
  - Streams ZIP to client for efficient memory usage

- **`POST /api/stripe/webhook`** - Stripe webhook receiver
  - Verifies webhook signature
  - Processes payment events
  - Triggers email delivery

#### 4. **Email Service** (`server/email.ts`)
- Sends purchase confirmation emails
- Includes download link with unique token
- Provides fallback if SMTP not configured
- HTML email template with clear call-to-action

#### 5. **ZIP Bundle Service** (`server/zip-service.ts`)
- Creates ZIP archives containing all digital assets
- Downloads files from CloudFront CDN
- Handles file download failures gracefully
- Streams ZIP directly to response

#### 6. **Downloads Page** (`client/src/pages/Downloads.tsx`)
- Verifies token with backend before showing downloads
- Displays individual download buttons for each track/image
- "Download Everything" button for ZIP bundle
- Shows invalid/expired link message for bad tokens
- Cross-browser compatible download handling

### Database Schema

```sql
-- Orders table (tracks purchases)
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stripePaymentIntentId VARCHAR(255) UNIQUE NOT NULL,
  stripeCustomerId VARCHAR(255),
  customerEmail VARCHAR(320) NOT NULL,
  customerName VARCHAR(255),
  amount INT NOT NULL,
  currency VARCHAR(3) DEFAULT 'usd',
  status ENUM('pending', 'succeeded', 'failed', 'canceled') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Downloads table (tracks access tokens)
CREATE TABLE downloads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT NOT NULL,
  downloadToken VARCHAR(255) UNIQUE NOT NULL,
  customerEmail VARCHAR(320) NOT NULL,
  expiresAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## File Mapping

The system maps file IDs to CloudFront URLs:

### Tracks
- `track-01` → 1-Moses-FinalPrayerByMoses.mp3
- `track-02` → 02-Moses-WishIhadyou.mp3
- `track-03` → 03-Moses-GetToTheStu.mp3
- `track-04` → 04-Moses-Over.mp3
- `track-05` → 05-Moses-Clarity.mp3
- `track-06` → 06-Moses-Pressure.mp3
- `track-07` → 07-Moses-Amen.mp3
- `track-08` → 08-Moses-Blessed.mp3
- `track-09` → 09-Moses-Testimony.mp3
- `track-10` → 10-Moses-Intro.mp3
- `track-11` → 11-Moses-Bridge.mp3
- `track-12` → 12-Moses-Outro.mp3

### Images
- `image-01` → ChatGPTImageMar31,2026,09_21_37PM.png (album cover)
- `image-02` → TOP_01.jpg
- `image-03` → TOP_04.jpg
- `image-04` → TOP_05.jpg

### Bonus Content
- `lyric-book` → FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf

## Flow Diagrams

### Purchase → Download Flow

```
1. Customer visits /clarity
2. Clicks "Buy Now" button
3. Enters email and name
4. Stripe checkout modal appears
5. Customer completes payment
6. Stripe sends webhook to /api/stripe/webhook
7. System creates order record
8. System generates download token
9. System sends confirmation email with download link
10. Customer clicks link → /downloads?token=xyz
11. System verifies token
12. Downloads page displays all files
13. Customer can download individual files or ZIP bundle
```

### Token Verification Flow

```
1. Customer receives email with download link
2. Clicks link: /downloads?token=abc123def456
3. Frontend extracts token from URL
4. Frontend calls trpc.downloads.verifyToken(token)
5. Backend verifies token signature and expiry
6. Backend looks up associated order
7. If valid: show downloads page
8. If invalid: show error message
```

## Security Features

1. **HMAC-SHA256 Signatures** - Tokens cannot be forged without the secret key
2. **Token Expiry** - Tokens expire after 365 days
3. **Stripe Webhook Verification** - Webhooks are verified using Stripe's signature
4. **Order Association** - Each token is tied to a specific order and email
5. **No Hardcoded URLs** - File URLs are mapped through the backend
6. **CORS Headers** - Proper headers prevent unauthorized cross-origin access

## Testing

Run the token verification tests:
```bash
pnpm test server/token-verification.test.ts
```

All 7 tests verify:
- Token generation
- Token verification
- Invalid token rejection
- Tampered token rejection
- Modified payload detection
- Data preservation
- Special character handling

## Environment Variables

Required for email delivery:
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `SMTP_FROM` - From email address
- `SMTP_SECURE` - Use SSL/TLS (true/false)

Required for Stripe:
- `STRIPE_SECRET_KEY` - Live secret key
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret

## Deployment Checklist

- [ ] Verify Stripe webhook URL is configured correctly
- [ ] Test complete purchase flow end-to-end
- [ ] Verify downloads work in Chrome, Firefox, Safari, Edge
- [ ] Test ZIP bundle creation and download
- [ ] Configure email service (SMTP) for production
- [ ] Update price from $1 to $10
- [ ] Set up monitoring for webhook failures
- [ ] Test token expiry after 365 days

## Future Enhancements

1. **Email Templates** - Customize email design with branding
2. **Download Analytics** - Track which files are most downloaded
3. **Resend Download Link** - Allow customers to request new link
4. **Multiple Products** - Support other albums/products
5. **Affiliate Links** - Track referral downloads
6. **Geographic Restrictions** - Limit downloads by region if needed
7. **Bandwidth Limits** - Throttle downloads if needed
