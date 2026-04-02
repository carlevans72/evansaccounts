# Evans Tax and Accounts — Claude Code Context

## Project overview

Static marketing website for Evans Tax and Accounts Limited, a Scottish chartered accounting and tax advisory firm. Single-page site with contact form.

**Stack:** HTML5, CSS3, vanilla JavaScript (ES6). No build tool, no framework. `package.json` exists solely for the local dev server (`serve`) — the site itself has no dependencies.

## Running locally

```bash
npm run dev
```

Dev server config is in `.claude/launch.json`. Uses `serve` (Node) on port 8080. The site itself is fully static — no build step.

## File structure

```
index.html              # Entire page — hero, ethos, services, about, contact, footer
js/app.js               # Hamburger menu, form submission, scroll animations
css/
  styles.css            # Imports all other CSS files
  variables.css         # Design tokens — colours, spacing, shadows
  reset.css
  typography.css
  design-system.css
  animations.css
  responsive.css
  components/           # nav, hero, sections, forms, footer
assets/
  branding-logo.png
  icons/                # SVG icons for services, credentials, contact
```

## Key conventions

- **CSS:** All design tokens live in `variables.css`. Colour palette is navy/gold extracted from the logo. Shadow depth system: `sm/md/lg`.
- **JavaScript:** IIFE pattern with `'use strict'`. Uses Intersection Observer for scroll animations and the Fetch API for form submission (Web3Forms).
- **Responsive:** Main breakpoint at 600px. Service cards go 4→2→1 columns (not CSS auto-fit). Mobile nav closes at 1100px viewport width.
- **Accessibility:** ARIA attributes throughout (`aria-expanded`, `aria-hidden`, `aria-live`), semantic HTML.

## Contact form

Uses [Web3Forms](https://web3forms.com). The `access_key` is set in `index.html` around line 313. Do not hardcode or commit a real key — confirm with the user before changing it.

## Git workflow

Do not commit or push unless explicitly asked. Make code changes freely, but wait for instruction before running any `git commit` or `git push` commands.

## Deployment

No build step — deploy by uploading files directly. Compatible with GitHub Pages, Netlify, Vercel, or any static host.
