# Evans Tax and Accounts — Design Reference

Use this document as context when generating new design artifacts for this project. It describes the visual language, token system, and component conventions of the site.

---

## Brand

**Name:** Evans Tax and Accounts Ltd
**Tone:** Refined, professional, trustworthy. Scottish chartered accountancy firm serving owner-managed businesses. Conservative but not stiff — there is warmth and approachability in the copy. The aesthetic should feel like a well-appointed law office, not a tech startup.
**Audience:** Small business owners, sole traders, limited company directors in Scotland.

---

## Colour Palette

All colours are defined as CSS custom properties in `css/variables.css`.

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#0c3559` | Primary brand colour. Headings, nav background (hero), body text on light. |
| `--navy-mid` | `#144b7a` | Hover state for navy surfaces. |
| `--steel-blue` | `#2359a8` | Secondary. Section labels, muted nav links, body text accents. |
| `--gold` | `#c9a84c` | Accent. Dividers, icons, active states, CTA buttons, italic hero text. |
| `--gold-light` | `#e2c278` | Gradient end for gold buttons and hover shimmer. |
| `--warm-white` | `#ffffff` | Primary surface (light sections, nav). |
| `--off-white` | `#f7f9fc` | Alternate light surface (ethos section, service card hover). |
| `--light-bg` | `#edf2f8` | Slightly deeper light surface (services section). |
| `--text-body` | `#0c3559` | Body copy on light backgrounds (same as navy). |
| `--text-muted` | `#5a82b8` | Captions, metadata, footer text. |
| `--ghost-text` | `rgba(247,249,252,0.6)` | Body copy on dark (navy) backgrounds. |

**Dark background contexts** (contact section, hero): use `--warm-white` / `--ghost-text` for text, `--gold` for accents, `--surface-input` / `--surface-card` for surfaces.

---

## Typography

**Fonts loaded:** Google Fonts (Cormorant Garamond + DM Sans)

| Role | Family | Weight | Token |
|---|---|---|---|
| Display / headings | Cormorant Garamond, serif | 600–700 | — |
| Italic accent (hero) | Cormorant Garamond, serif | 400 italic | — |
| Body / UI | DM Sans, sans-serif | 300, 400, 500 | — |
| Section eyebrows | DM Sans | 500, uppercase, tracked | — |
| Nav links | DM Sans | 400, uppercase, tracked | — |

### Type Scale

Defined in `css/variables.css`:

| Token | Value | Typical use |
|---|---|---|
| `--text-xs` | 11px | Eyebrows, qual-badge labels |
| `--text-sm` | 13px | Nav links, CTA buttons, form labels, captions |
| `--text-base` | 15px | Body copy, service card body |
| `--text-lg` | 18px | Credential card titles |
| `--text-xl` | 21px | Service card titles |
| `--text-2xl` | clamp(28px → 36px) | Sub-headings |
| `--text-display` | clamp(32px → 44px) | Section headings (h2) |
| `--text-hero` | clamp(44px → 68px) | Hero h1 |

---

## Spacing

Base-4 grid. All tokens defined in `css/variables.css`.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

Section-level spacing: `--section-padding: 6rem 4vw`, `--section-gap: 3.5rem`, `--inner-gap: 1.5rem`.

---

## Border Radius

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | 2px | Nav CTA, qual-badges, form inputs |
| `--radius-md` | 4px | Buttons, service cards, form submit |
| `--radius-lg` | 6px | Credential cards |

The overall aesthetic is sharp and architectural — avoid large rounded corners.

---

## Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(12,53,89,0.08)` | Resting card state |
| `--shadow-md` | `0 8px 24px rgba(12,53,89,0.12)` | Hover card state |
| `--shadow-lg` | `0 16px 48px rgba(12,53,89,0.15)` | Elevated surfaces |
| `--gold-shadow-sm` | `0 4px 12px rgba(201,168,76,0.3)` | CTA button rest |
| `--gold-shadow-md` | `0 8px 24px rgba(201,168,76,0.4)` | CTA button hover |

---

## Key UI Patterns

### Buttons
- **Primary** (`btn-primary`): Gold gradient (`--gold` → `--gold-light`), navy text, shine sweep on hover, lifts `translateY(-3px)`.
- **Ghost** (`btn-ghost`): Transparent with soft gold border, ghost text; border and text turn full gold on hover.
- Both use `--radius-md` (4px), uppercase DM Sans `--text-sm`, `letter-spacing: 0.12em`.

### Cards
- **Service cards**: White surface, invisible `border-left: 3px solid transparent` that reveals gold on hover. Gold tint overlay sweeps in from top via `::before`. Subtle `box-shadow` lift.
- **Credential cards** (hero): Semi-transparent surface on navy, `border-top: 2px solid --gold`, shimmer sweep on hover. `--radius-lg`.

### Section structure
Every content section follows: section-label (uppercase DM Sans, steel-blue) → section-heading (Cormorant Garamond) → gold rule (`width: 3rem; height: 2px; background: --gold`) → body content.

### Gold rule divider
```css
width: 3rem;
height: 2px;
background: var(--gold);
margin-bottom: 2rem;
```

### Badges / qual-badges
Off-white background, steel-blue border, navy text, checkmark SVG icon. `--radius-sm`. Uppercase DM Sans `--text-xs`.

### Active nav link
Colour shifts to `--gold` (no underline, no background).

---

## Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `> 1100px` | Full desktop: 2-col hero, 4-col services, sticky ethos |
| `601–1100px` | Tablet: 1-col hero, 2×2 services, hamburger nav |
| `≤ 600px` | Mobile: stacked everything, single-col services |

---

## Animations

- **Hero entrance**: `fadeUp` keyframe, staggered 0s → 0.35s across eyebrow → heading → body → actions → credentials.
- **Scroll-triggered**: `IntersectionObserver` adds `.in-view` class to `.animate-on-scroll` elements. Transition: `opacity 0 → 1`, `translateY(30px → 0)`, 0.6s ease.
- **Service card stagger**: Layout-aware — 0–0.3s on desktop (4-wide), 0/0.1s reset per row on tablet (2×2), no stagger on mobile.
- **`prefers-reduced-motion`**: All durations collapsed to 0.01ms; `.animate-on-scroll` elements shown immediately.

---

## What to avoid

- Large border radii (>6px) — the aesthetic is architectural, not bubbly.
- Purple or teal — palette is strictly navy/gold/steel-blue.
- Heavy drop shadows with warm tones — shadows use navy-tinted rgba only.
- Inter, Roboto, or system fonts — Cormorant Garamond and DM Sans are non-negotiable.
- Gradients that aren't gold (`--gold` → `--gold-light`) or subtle navy overlays.
