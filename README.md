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
| Founder / YC / startup | `?style=engineer&theme=dark&accent=olive` |
| Editorial / design-aware | `?style=editorial&theme=light&accent=terracotta` |

Accepted values:

- `style` — `editorial` · `engineer` · `studio`
- `theme` — `light` · `dark`
- `accent` — `terracotta` · `cobalt` · `olive` · `plum` · `ink`
- `density` — `compact` · `comfortable` · `airy`
