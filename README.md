# Prasad Shinde — Portfolio

A hand-built personal portfolio. Single-page, three aesthetic modes, light/dark, deep-linkable via URL params.

**Live:** https://prasad8830.github.io/portfolio (once you enable Pages — see below)

## Local preview

This site uses inline JSX transpiled by Babel in the browser — no build step. To preview locally:

```bash
# Any static server works. Pick one:
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:3000 (or :8000).

> Tip: opening `index.html` directly via `file://` may break the `<script src>` imports in some browsers. Use a local server.

## Files

| File | Purpose |
|---|---|
| `index.html` | Markup, design-system CSS, all three style variants |
| `portfolio-app.jsx` | React app — Hero, Work, Experience, Skills, etc. |
| `tweaks-panel.jsx` | In-page Tweaks panel + form controls |
| `README.md` | This file |

## Deep-linkable looks

The site reads four URL params on load. Send a recruiter the tuned link for their audience:

| Audience | URL suffix |
|---|---|
| FAANG / Big tech | `?style=studio&theme=light&accent=ink` |
| Quant (Jane Street, Citadel, HRT) | `?style=engineer&theme=dark&accent=cobalt` |
| Big 4 consulting | `?style=editorial&theme=light&accent=cobalt` |
| Founder / YC / startup | `?style=engineer&theme=dark&accent=olive` |
| Editorial / design-aware | `?style=editorial&theme=light&accent=terracotta` |

Accepted values:

- `style` — `editorial` · `engineer` · `studio`
- `theme` — `light` · `dark`
- `accent` — `terracotta` · `cobalt` · `olive` · `plum` · `ink`
- `density` — `compact` · `comfortable` · `airy`

## Deploying to GitHub Pages

1. **Create a new public repo** on github.com — call it whatever you like (`portfolio` is fine).
2. Upload all four files at the repo root: `index.html`, `portfolio-app.jsx`, `tweaks-panel.jsx`, `README.md`.
3. Go to **Settings → Pages**.
4. Under "Source", pick **Deploy from a branch** → branch `main` → folder `/ (root)` → **Save**.
5. Wait 1–2 minutes. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

### Custom domain (optional, ~$10/yr)

For a recruiter-grade URL like `prasadshinde.dev`:

1. Buy the domain from Cloudflare / Namecheap / Porkbun.
2. In your DNS, add four A records pointing to GitHub Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
3. In repo Settings → Pages, set "Custom domain" to your domain and tick "Enforce HTTPS".

## Credit

Built in a single chat session with [Claude Designer](https://claude.ai). Type pairing — Geist / IBM Plex / Instrument Serif. Custom cursor, magnetic links, scroll reveals, and three switchable aesthetic modes.
