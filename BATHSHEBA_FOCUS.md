# BATHSHEBA Project — Focused Handoff for Codex

**Project:** BATHSHEBA (10-track free music project)**Theme:** Purple & white royalty aesthetic**Status:** Recently refined, ready for Codex iteration**Current Checkpoint:** `526660f3`

---

## Project Overview

BATHSHEBA is a 10-track music project with a Mona Lisa-inspired cover art (Naomi Campbell, Renaissance background, gold ornate frame). The project is **free** and focuses on creating an immersive, high-fidelity listening experience.

### Core Features

| Feature | Status | Details |
| --- | --- | --- |
| Landing Page (`/bathsheba`) | ✅ Complete | Purple/white hero, Listen Now + Download Free CTAs |
| Audio Player (`/bathsheba/listen`) | ✅ Refined | Custom player with track controls, full project download, individual track downloads |
| Store Integration | ✅ Complete | Listed on `/store` as free product |
| Download Endpoint | ✅ Complete | `/api/download/bathsheba` returns ZIP with all 10 tracks |
| Mobile Optimization | ✅ Complete | Responsive design for all screen sizes |

---

## Bathsheba Tracklist (10 Tracks)

| # | Title | Duration | CDN URL |
| --- | --- | --- | --- |
| 01 | Close To You | 3:00 | `https://[CDN]/01-Close-To-You.mp3` |
| 02 | Vices Master | 3:25 | `https://[CDN]/02-Vices-Master.mp3` |
| 03 | Man I Want To Be | 3:15 | `https://[CDN]/03-Man-I-Want-To-Be.mp3` |
| 04 | Deal With Me | 3:30 | `https://[CDN]/04-Deal-With-Me.mp3` |
| 05 | Faith On It | 3:20 | `https://[CDN]/05-Faith-On-It.mp3` |
| 06 | Monopoly | 3:40 | `https://[CDN]/06-Monopoly.mp3` |
| 07 | Naval | 3:10 | `https://[CDN]/07-Naval.mp3` |
| 08 | Nothing Personal | 3:25 | `https://[CDN]/08-Nothing-Personal.mp3` |
| 09 | 1212 | 3:05 | `https://[CDN]/09-1212.mp3` |
| 10 | Bathsheba | 3:50 | `https://[CDN]/10-Bathsheba.mp3` |

**Total Duration:** 33 minutes 40 seconds**Total Size:** ~75MB (compressed ZIP ~35MB )

---

## File Structure

```
client/src/
├── pages/
│   ├── Bathsheba.tsx          # Landing page (purple/white hero)
│   └── BathshebaListen.tsx    # Audio player (recently refined)
├── data/
│   └── bathsheba-bundle.ts    # Track metadata + CDN URLs
└── App.tsx                    # Route definitions

server/
├── zip-bathsheba.ts           # ZIP creation logic
├── _core/routes.ts            # Download endpoint
└── [other shared files]
```

---

## Key Files & Implementation

### 1. Data Structure (`client/src/data/bathsheba-bundle.ts`)

```typescript
export const bathshebaProject = {
  id: 'bathsheba',
  title: 'BATHSHEBA',
  subtitle: 'Royalty. Grace. Sovereignty.',
  description: 'A 10-track project rooted in royalty, grace, and creative sovereignty.',
  coverArt: 'https://[CDN]/bathsheba-cover.png',
  releaseDate: 'May 2026',
  trackCount: 10,
};

export const bathshebaTrackList = [
  { id: 1, number: 1, title: 'Close To You', url: 'https://[CDN]/01-Close-To-You.mp3', duration: '3:00' },
  { id: 2, number: 2, title: 'Vices Master', url: 'https://[CDN]/02-Vices-Master.mp3', duration: '3:25' },
  // ... 10 tracks total
];
```

### 2. Landing Page (`client/src/pages/Bathsheba.tsx` )

**Structure:**

- Hero section with purple gradient background

- Album art with glow effect

- "Listen Now" button → `/bathsheba/listen`

- "Download Free" button → instant ZIP download

- Project description

- Upsell to CLARITY album

**Key Functions:**

```typescript
const handleDownloadFull = async () => {
  const link = document.createElement('a');
  link.href = '/api/download/bathsheba';
  link.download = 'BATHSHEBA-Project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

### 3. Audio Player (`client/src/pages/BathshebaListen.tsx`)

**Recently Refined Features:**

- Play/Pause/Skip controls

- Progress bar with time tracking

- Volume control (0-100%)

- Interactive tracklist with click-to-play

- Animated waveform visualizer (3 pulsing bars when playing)

- Full project download button

- Individual track download buttons

- Mobile-optimized responsive layout

- Purple/white theme matching Bathsheba brand

**Key State:**

```typescript
const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [volume, setVolume] = useState(1);
const [isDownloadingFull, setIsDownloadingFull] = useState(false);
const [downloadingTrackId, setDownloadingTrackId] = useState<number | null>(null);
```

**Download Handlers:**

```typescript
// Full project download
const handleDownloadFull = async () => {
  setIsDownloadingFull(true);
  const link = document.createElement('a');
  link.href = '/api/download/bathsheba';
  link.download = 'BATHSHEBA-Project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setIsDownloadingFull(false);
};

// Individual track download
const handleDownloadTrack = async (track) => {
  setDownloadingTrackId(track.id);
  const link = document.createElement('a');
  link.href = track.url;
  link.download = `${track.number.toString().padStart(2, '0')}-${track.title}.mp3`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setDownloadingTrackId(null);
};
```

### 4. ZIP Creation (`server/zip-bathsheba.ts`)

```typescript
import AdmZip from 'adm-zip';
import { bathshebaTrackList } from '../client/src/data/bathsheba-bundle';

export async function createBathshebaBundle() {
  const zip = new AdmZip();
  
  for (const track of bathshebaTrackList) {
    console.log(`[Bathsheba ZIP] Fetching ${track.title}...`);
    const response = await fetch(track.url);
    const buffer = await response.arrayBuffer();
    
    zip.addFile(
      `${track.number.toString().padStart(2, '0')}-${track.title}.mp3`,
      Buffer.from(buffer)
    );
    
    console.log(`[Bathsheba ZIP] Added ${track.number.toString().padStart(2, '0')}-${track.title}.mp3`);
  }
  
  return zip.toBuffer();
}
```

### 5. Download Route (`server/_core/routes.ts`)

```typescript
app.get('/api/download/bathsheba', async (req, res) => {
  try {
    const zipBuffer = await createBathshebaBundle();
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="BATHSHEBA-Project.zip"');
    res.setHeader('Content-Length', zipBuffer.length);
    
    res.send(zipBuffer);
  } catch (error) {
    console.error('[Bathsheba ZIP] Error:', error);
    res.status(500).json({ error: 'Failed to create ZIP' });
  }
});
```

### 6. Routes in App.tsx

```typescript
import Bathsheba from './pages/Bathsheba';
import BathshebaListen from './pages/BathshebaListen';

// In routes
<Route path="/bathsheba" component={Bathsheba} />
<Route path="/bathsheba/listen" component={BathshebaListen} />
```

---

## Design System

### Colors (Purple & White Royalty Theme)

```css
/* Primary Colors */
--bathsheba-purple-950: #3d0d5a    /* Darkest purple */
--bathsheba-purple-900: #4d1566    /* Dark purple */
--bathsheba-purple-800: #6b1f8f    /* Medium purple */
--bathsheba-purple-700: #8b2db3    /* Bright purple */
--bathsheba-purple-600: #a83fd9    /* Light purple */
--bathsheba-purple-500: #c855ff    /* Vibrant purple */
--bathsheba-white: #ffffff         /* Pure white */
--bathsheba-gray: #f5f5f5          /* Off-white */
```

### Typography

- **Headings:** Bebas Neue (bold, uppercase, tracking-wide)

- **Body:** DM Mono (clean, monospace, technical)

- **Accents:** Cormorant Garamond (elegant, italic)

### Layout

- **Mobile:** Single column, full-width, responsive padding

- **Desktop:** Grid layout, max-width 6xl, centered

- **Spacing:** 4px base unit (Tailwind default)

---

## User Flows

### Flow 1: Free Download (No Auth)

```
User visits /bathsheba
  ↓
Sees album art + "Download Free" button
  ↓
Clicks "Download Free"
  ↓
Browser downloads BATHSHEBA-Project.zip instantly
  ↓
User has all 10 tracks
```

### Flow 2: Listening Experience

```
User visits /bathsheba
  ↓
Clicks "Listen Now"
  ↓
Navigates to /bathsheba/listen
  ↓
Audio player loads with album art
  ↓
User clicks play on first track (Close To You)
  ↓
Track plays with progress bar, volume control
  ↓
User can:
  - Skip to next/previous track
  - Click any track to jump to it
  - Download full project (ZIP)
  - Download individual track (MP3)
  - Adjust volume
```

### Flow 3: Individual Track Download

```
User on /bathsheba/listen
  ↓
Sees tracklist with download icons
  ↓
Clicks download icon on any track
  ↓
Browser downloads individual MP3
  ↓
User has single track
```

---

## Testing Checklist for Codex

### Functional Tests

- [ ] `/bathsheba` loads with correct album art

- [ ] "Listen Now" button navigates to `/bathsheba/listen`

- [ ] "Download Free" button downloads ZIP instantly

- [ ] `/bathsheba/listen` audio player loads

- [ ] Play/Pause works on all 10 tracks

- [ ] Skip Next/Previous works correctly

- [ ] Progress bar updates in real-time

- [ ] Volume slider works (0-100%)

- [ ] Clicking track in list plays that track

- [ ] Full project download button works

- [ ] Individual track download buttons work

- [ ] Auto-advance to next track when one finishes

### Mobile Tests

- [ ] Hero section responsive on small screens

- [ ] Buttons stack vertically on mobile

- [ ] Audio player controls fit on small screens

- [ ] Tracklist readable on mobile

- [ ] Download buttons accessible on mobile

### Performance Tests

- [ ] Tracks load smoothly (check CDN URLs)

- [ ] ZIP downloads without errors

- [ ] No console errors on page load

- [ ] Audio plays without buffering (on good connection)

- [ ] Page load time < 3s

### Browser Tests

- [ ] Chrome/Chromium

- [ ] Firefox

- [ ] Safari

- [ ] Mobile Safari

---

## Common Issues & Solutions

| Issue | Cause | Solution |
| --- | --- | --- |
| Download button does nothing | CDN URL broken or fetch fails | Check `bathsheba-bundle.ts` URLs, test with `curl` |
| Audio won't play | Track URL 404 | Verify track URLs in CDN, check browser console |
| ZIP file corrupted | Buffer conversion error | Check `zip-bathsheba.ts` buffer handling |
| Mobile layout broken | Responsive classes missing | Add `sm:`, `md:`, `lg:` breakpoints to Tailwind classes |
| Player controls unresponsive | Event listeners not attached | Check `useEffect` cleanup in `BathshebaListen.tsx` |

---

## Performance Optimization Tips

1. **Preload next track** — Start loading next track while current plays

1. **Lazy load tracklist images** — Load album art only when visible

1. **Compress tracks** — Ensure MP3s are optimized (128kbps minimum)

1. **Cache ZIP** — Consider caching ZIP on server for repeated downloads

1. **CDN optimization** — Use CloudFront or similar for fast delivery

---

## Next Steps for Codex

### Immediate (P0)

- [ ] Test all download flows end-to-end

- [ ] Verify mobile responsiveness

- [ ] Check performance on slow connections

- [ ] Validate all 10 track URLs work

- [ ] Test ZIP creation and download

### Short-term (P1)

- [ ] Add buffering indicator for slow connections

- [ ] Implement next-track preloading

- [ ] Add error handling for failed downloads

- [ ] Add analytics tracking (play count, downloads)

- [ ] Optimize track compression

### Medium-term (P2)

- [ ] Add lyrics display during playback

- [ ] Implement playlist sharing

- [ ] Add social media integration

- [ ] Create Bathsheba merchandise store

- [ ] Build behind-the-scenes content section

---

## Deployment

**Current Status:** Live at [https://mosessog.com/bathsheba](https://mosessog.com/bathsheba)

**To Deploy Changes:**

```bash
# 1. Make changes locally
# 2. Test locally
pnpm dev
pnpm test --run

# 3. Build
pnpm build

# 4. Create checkpoint
webdev_save_checkpoint --description "Bathsheba improvements: [describe changes]"

# 5. Publish via UI
# Click "Publish" button in Management UI
```

---

## Resources

- **Live Site:** [https://mosessog.com/bathsheba](https://mosessog.com/bathsheba)

- **Listen Page:** [https://mosessog.com/bathsheba/listen](https://mosessog.com/bathsheba/listen)

- **Cover Art:** `assets/bathsheba-cover.png` (2.6MB )

- **GitHub:** [https://github.com/mosesofelgin/moses-storefront](https://github.com/mosesofelgin/moses-storefront)

- **Checkpoint:** `526660f3`

---

## Contact

**Project Owner:** MOSES SOG**Email:** [wtgexodus@gmail.com](mailto:wtgexodus@gmail.com)**Social:** @moses_sog (Instagram ), @mosessog (YouTube, TikTok, Twitch), sogmoses (X)

---

**Last Updated:** May 9, 2026**Status:** Ready for Codex focus and iteration

