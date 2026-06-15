# Sacred Noir: Bronzeville Edition — Design System

**Artist:** MOSES  
**Visual Language:** Neo-Gothic Minimalism + Chicago Urban Sacred  
**Primary Audience:** Industry professionals + fans  
**Tone:** Prophetic, human, disciplined, premium

---

## Design Philosophy

Sacred Noir: Bronzeville Edition combines:
- **Tobe Nwigwe's visual sovereignty** — total commitment to one visual world
- **Lecrae's faith + professional infrastructure** — spiritual identity with industry credibility
- **Chance the Rapper's Chicago identity** — location as mythology, not just biography
- **NF's cinematic simplicity** — dark, minimal, strong hierarchy
- **Maverick City Music's spiritual warmth** — lived-in, movement-oriented language

The design should feel **premium, sacred, urban, warm, and unmistakably Chicago** — not like a generic musician template.

---

## Color Palette

| Color | Hex | Usage | Emotion |
|---|---|---|---|
| **Obsidian Black** | `#0d0c0b` | Primary background | Authority, depth, contemplation |
| **Charcoal** | `#2a2a2a` | Secondary background, cards | Warmth, accessibility |
| **Covenant Gold** | `#c49e55` | Accent, dividers, highlights | Sacred, prosperity, covenant |
| **Warm Ivory** | `#f0e8d7` | Primary text, contrast | Readability, warmth, parchment |
| **Deep Burgundy** | `#5c1a1a` | Secondary accent, hover states | Depth, spiritual weight |
| **Royal Blue** | `#1e3a5f` | Tertiary accent, alternative | Wisdom, institution, faith |

### CSS Variables (Tailwind)

```css
@layer base {
  :root {
    --color-obsidian: #0d0c0b;
    --color-charcoal: #2a2a2a;
    --color-gold: #c49e55;
    --color-ivory: #f0e8d7;
    --color-burgundy: #5c1a1a;
    --color-blue: #1e3a5f;
  }
}
```

---

## Typography

### Font Pairing

| Font | Usage | Reason |
|---|---|---|
| **Cormorant Garamond** (serif) | Headlines, display text | Editorial, sacred, authority |
| **DM Sans** (sans-serif) | Body text, UI, metadata | Clean, readable, modern |

### Hierarchy

| Level | Font | Size | Weight | Spacing |
|---|---|---|---|---|
| **H1 (Hero)** | Cormorant | 4rem / 64px | 600 | Tight (0.9 line-height) |
| **H2 (Section)** | Cormorant | 2.5rem / 40px | 600 | 1.1 line-height |
| **H3 (Subsection)** | Cormorant | 1.75rem / 28px | 500 | 1.2 line-height |
| **Body** | DM Sans | 1rem / 16px | 400 | 1.6 line-height |
| **Caption** | DM Sans | 0.875rem / 14px | 400 | 1.5 line-height |
| **Metadata** | DM Sans | 0.75rem / 12px | 500 | 1.4 line-height |

---

## Layout Paradigm

### Asymmetric, Left-Anchored Structure

- **Hero:** Full-screen, centered, with performance photography
- **Proof Strip:** Left-aligned, minimal, credibility band
- **Sections:** Alternating left/right image-text layouts
- **Video Gallery:** Full-width, cinematic presentation
- **EPK/Contact:** Two-column grid on desktop, stacked on mobile

### Spacing Scale

```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

Use consistently for margins, padding, gaps.

---

## Signature Elements

### 1. Gold Divider Lines

Use `border-top: 2px solid var(--color-gold)` to separate major sections. Creates visual rhythm and reinforces the covenant/sacred theme.

### 2. Serif Typography for Declarations

Headlines in Cormorant Garamond establish authority. Example:
```
"Music Is the Door. Dominion Is the Work."
```

### 3. Performance Photography

- Black-and-white or dark editorial photography
- Composition emphasizes presence, not decoration
- Candid moments preferred over overly staged shots
- Chicago architecture, church settings, or urban landscape as backdrop

### 4. Minimal Motion

- Subtle fade-ins on scroll
- No autoplay animations
- Restrained hover effects (gold underline, slight scale)
- Cinematic, not playful

### 5. Chicago Symbolism

- Stone, architecture, city lights
- Stained glass references (if natural in photography)
- Bronzeville neighborhood identity
- Urban sacred aesthetic

---

## Component Patterns

### Hero Section

```tsx
<section className="min-h-screen bg-obsidian text-ivory flex flex-col justify-center items-center relative">
  {/* Full-screen background image */}
  <img src={heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" />
  
  {/* Content overlay */}
  <div className="relative z-10 text-center max-w-2xl px-6">
    <h1 className="font-cormorant text-6xl font-600 mb-4">MOSES</h1>
    <p className="font-dm-sans text-lg mb-8">
      Prophetic hip-hop from Chicago—built to awaken faith, wisdom, and dominion.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="bg-gold text-obsidian px-8 py-3 font-dm-sans font-600">
        Watch the Keynote
      </button>
      <button className="border-2 border-gold text-gold px-8 py-3 font-dm-sans font-600">
        Download EPK
      </button>
    </div>
  </div>
</section>
```

### Proof Strip

```tsx
<section className="bg-charcoal text-ivory py-8 px-6 border-t-2 border-gold">
  <div className="max-w-6xl mx-auto flex justify-around text-center">
    <div>
      <p className="font-cormorant text-2xl font-600">400+</p>
      <p className="font-dm-sans text-sm text-ivory/80">Published Songs</p>
    </div>
    <div>
      <p className="font-cormorant text-2xl font-600">600+</p>
      <p className="font-dm-sans text-sm text-ivory/80">Recordings</p>
    </div>
    <div>
      <p className="font-cormorant text-2xl font-600">Chicago</p>
      <p className="font-dm-sans text-sm text-ivory/80">Based</p>
    </div>
  </div>
</section>
```

### Video Card (Three-Film Story)

```tsx
<article className="group cursor-pointer">
  <div className="relative overflow-hidden aspect-video bg-charcoal">
    <img src={thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition" />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center">
        <svg className="w-8 h-8 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
  <h3 className="font-cormorant text-xl font-600 mt-4 text-ivory">The Stage</h3>
  <p className="font-dm-sans text-sm text-ivory/70 mt-2">Authority, presence, institutional readiness.</p>
</article>
```

### Section Divider

```tsx
<div className="w-12 h-1 bg-gold mx-auto my-12" />
```

---

## Brand Voice & Language

### Tone Principles

1. **Prophetic** — Speak with conviction and spiritual clarity
2. **Human** — Avoid corporate jargon; use lived experience
3. **Disciplined** — Every word earns its place
4. **Premium** — Respect the audience's time and intelligence

### Example Headlines

- "Music Is the Door. Dominion Is the Work."
- "Clean Prophetic Hip-Hop from Chicago"
- "Built to Awaken Faith, Wisdom, and Dominion"
- "Join the Covenant"

### Avoid

- Generic "Christian rapper" language
- Overuse of religious imagery (crosses, flames, lions)
- Vague mission statements
- Excessive explanation

---

## Imagery Guidelines

### What to Prioritize

- Performance stills (stage presence, institutional settings)
- Chicago architecture and urban landscape
- Church or sacred spaces (if natural to the context)
- Candid moments over posed shots
- Black-and-white or dark, moody color grading

### What to Avoid

- Stock photography
- Generic "inspirational" imagery
- Overly stylized or filtered photos
- Anything that feels inauthentic to MOSES's actual work

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Usage |
|---|---|---|
| Mobile | 320px–640px | Single column, large text |
| Tablet | 641px–1024px | Two columns, adjusted spacing |
| Desktop | 1025px+ | Full layout, optimal readability |

### Mobile-First Approach

- Hero: Full-screen, centered
- Sections: Stack vertically
- Video gallery: Single column
- EPK/Contact: Stacked forms
- All buttons: Minimum 44px × 44px

---

## Accessibility

### Color Contrast

- Text on background: Minimum 4.5:1 (WCAG AA)
- Ivory (#f0e8d7) on Obsidian (#0d0c0b): 14.2:1 ✓
- Gold (#c49e55) on Obsidian: 5.1:1 ✓

### Keyboard Navigation

- All interactive elements focusable
- Focus ring: 2px gold border
- Tab order: logical, left-to-right

### ARIA Labels

- Video play buttons: `aria-label="Play video: The Stage"`
- Download buttons: `aria-label="Download EPK PDF"`
- Social links: `aria-label="Follow on Instagram"`

---

## Implementation Notes

1. **Start with the hero** — it sets the tone for the entire page
2. **Use real photography** — placeholder images hide design problems
3. **Test on mobile first** — ensure all sections are readable and interactive
4. **Iterate on spacing** — Sacred Noir relies on breathing room, not clutter
5. **Respect the gold accent** — use sparingly for maximum impact
6. **Keep motion minimal** — let the content speak
7. **Verify all links** — EPK download, social links, booking contact must work

---

## Next Steps

Apply this design system to the Artist.tsx component, starting with the hero section and proof strip.
