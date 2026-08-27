# CabinClarity Marketing Website

Static, zero-dependency marketing site for CabinClarity, deployed to GitHub Pages.

**Live URL:** `https://cabinclarity.app/` (custom domain; GitHub Pages URL is `https://janstadt.github.io/cabin-clarity-website/`). The site lives in this standalone **public** repo; the app source is kept private in a separate repo.

The `CNAME` file (add `cabinclarity.app` as its contents once DNS is pointed) tells GitHub Pages to serve the
custom domain. To activate it: in repo **Settings → Pages → Custom domain**, set
`cabinclarity.app` and add the matching DNS records (apex `A` records for
github-pages IPs, or a `CNAME` record if using `www.cabinclarity.app`). SSL is
provisioned automatically once the domain is verified.

## Why plain HTML/CSS/JS (no Astro / Eleventy / build step)?

This is a single-page marketing site. A static-site generator would add
hundreds of npm dependencies and a build pipeline for zero benefit here.
Plain files mean:

- **Fastest possible load** — no framework runtime, ~2 files to download
- **Trivially maintainable** — edit HTML text directly, no toolchain
- **Instant deploys** — GitHub Actions just uploads the folder

If the site ever grows to many pages or needs templating, migrate to
[Astro](https://astro.build) (most popular modern SSG, official GitHub Pages
action) — the design system in `style.css` ports over directly.

## Files

```
website/
├── index.html      # All page content & sections
├── style.css       # Design system (palette from app icon, see below)
├── script.js       # ~30 lines: reveal-on-scroll (IntersectionObserver)
├── assets/
│   ├── icon.png    # App icon 192px (copied from ../assets/images/icon-192.png)
│   └── favicon.png # Favicon (copied from ../assets/images/favicon.png)
├── screenshots/    # Drop real app screenshots here (see below)
└── README.md       # This file
```

## Design system

Palette is derived from the existing app icon (deep-blue gradient with cyan
highlights):

| Token   | Hex       | Use                          |
|---------|-----------|------------------------------|
| navy    | `#06182A` | Page background (deep water) |
| brand   | `#04639A` | Primary blue (icon base)     |
| cyan    | `#3EC6F0` | Accent, gradients, links     |
| ice     | `#BFE9FF` | Subtle text, borders         |
| danger  | `#FF6B6B` | AIS alert styling            |
| warn    | `#FFC24B` | AIS warning chips            |

Style notes (2025/26 trends): dark immersive hero with animated gradient orbs
and layered SVG waves, glassmorphism cards, bento feature grid, CSS-only
chart + phone mockup (no images needed), IntersectionObserver scroll reveals
with stagger, full `prefers-reduced-motion` support.

> **Icon refresh?** If the app icon is ever redesigned, update
> `assets/icon.png` + `assets/favicon.png` here and consider whether the
> cyan/navy palette still matches. The CSS variables in `style.css`
> (`:root` block) are the single place to retheme.

## Adding real screenshots

The Screenshots section currently shows styled placeholder slots. Replace
them by dropping PNGs into `website/screenshots/` and swapping each
placeholder div for an `<img>`:

```html
<!-- replace this -->
<div class="shot-img placeholder"><span>📱 drop 01-search.png here</span></div>

<!-- with this -->
<img class="shot-img" src="screenshots/01-search.png"
     alt="CabinClarity search screen" loading="lazy" width="360">
```

Suggested captures (portrait, ~1170×2532 or any phone-ratio PNG):

1. `01-search.png` — search screen (address / listing URL input)
2. `02-lake-details.png` — lake details dashboard
3. `03-map.png` — map view with tappable lake polygons
4. `04-clarity.png` — water-clarity history chart

## Deploying

Automatic: push to `main` with changes under `website/` →
`.github/workflows/website.yml` builds nothing and publishes the folder.

**One-time repo setup:** GitHub → Settings → Pages → Build and deployment →
**Source: GitHub Actions**.

Manual trigger: Actions tab → "website" → Run workflow.

### Local preview

No build step — just open the file or serve it:

```bash
# from repo root
python3 -m http.server 8080 --directory website
# open http://localhost:8080
```

## Editing content

- **Headline / copy** → `index.html` (each section has an HTML comment banner)
- **Colors / spacing / fonts** → `:root` variables at the top of `style.css`
- **Testimonials** → the "Who it's for" section in `index.html` (current text
  is position copy, not real quotes — replace before public launch)
- **Store badges / links** → Final CTA section in `index.html`
  (currently `mailto:hello@cabinclarity.app` — a working inbox on the
  cabinclarity.app domain)
