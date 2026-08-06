# Portfolio Site — Progress / Handoff

Live at: https://robcalimente.github.io/
Repo: https://github.com/robcalimente/robcalimente.github.io (branch `main`)

## What this is

A personal portfolio site aimed at hiring managers/recruiters, showcasing full-stack,
AI, and iOS projects. Not scoped to one lane on purpose — Rob wants range (mobile,
data eng, ML, web) shown deliberately, not a grab bag.

Stack: React + Vite, plain CSS (no component library), Framer Motion for animation,
deployed to GitHub Pages.

## Current site structure

Two full-screen scroll-snap pages (Apple-style, not a continuous scroll):

- **Page 1 (`Hero.jsx`, `#hero`)** — particle constellation canvas background
  (`ParticleField.jsx`, vanilla canvas, no dependency), name, headline, one-paragraph
  bio (merged in from what used to be a separate About section — that component was
  deleted), and two CTA buttons ("See the work" → `#projects`, "Get in touch" →
  `#contact`).
- **Page 2 (`page-two` wrapper in `App.jsx`)** — one snap point containing both
  `Projects.jsx` (expandable project cards) and `Contact.jsx` ("Let's talk" — email,
  resume link, GitHub/LinkedIn) stacked in the same internally-scrollable page.

Global scroll-snap mechanics live in `src/index.css` (`.snap-page`, `.snap-page-inner`,
`.page-two` classes, `#root` as the scroll container). Theme is dark-mode-first with a
light-mode override via `prefers-color-scheme` (CSS vars in `:root`).

## Deployment

**GitHub Actions is currently unusable** — GitHub had a major hosted-runner outage
starting 2026-08-06 15:22 UTC, still ongoing as of this session. The `.github/workflows/deploy.yml`
workflow exists and is correctly configured (triggers on push to `main`, builds, deploys
via `actions/deploy-pages`), but every run has failed with "job was not acquired by
Runner" — this is GitHub-side, not a config problem.

**Current deploy method**: manual, via the `gh-pages` npm package, which pushes straight
to the `gh-pages` branch over git (bypasses Actions entirely):

```bash
npm run deploy   # runs: vite build && gh-pages -d dist -b gh-pages
```

GitHub Pages source is currently set to **legacy branch mode** (`gh-pages` branch), not
"GitHub Actions" mode. **Once the outage clears**, consider switching back:

```bash
gh api repos/robcalimente/robcalimente.github.io/pages -X PUT --input - <<'EOF'
{"build_type":"workflow"}
EOF
```
That restores auto-deploy on every push to `main` instead of requiring `npm run deploy`
by hand.

## Done

- [x] Repo scaffolded (React + Vite), pushed to `robcalimente.github.io` (root-domain
      GitHub Pages naming, no `/repo/` path prefix)
- [x] Dark-mode-first theme, light-mode override
- [x] Particle constellation hero animation (canvas, cursor-reactive, respects
      `prefers-reduced-motion`)
- [x] Two-page scroll-snap layout (hero / work)
- [x] Copy pass: confident/casual tone, no em dashes (explicit user preference — don't
      reintroduce them anywhere on this site)
- [x] Hero: single-color name, tightened vertical spacing, content anchored near top
      instead of dead-centered
- [x] Contact section merged into page 2 alongside Projects (not its own snap page)
- [x] Live and publicly reachable

## Not done yet — in priority order

1. **Resume PDF is missing.** `Contact.jsx` links to `/resume.pdf`, which doesn't exist
   in `public/` — this link currently 404s. Needs an actual resume file dropped into
   `public/resume.pdf`.
2. **Social links are placeholders.** `Contact.jsx` GitHub/LinkedIn links point to bare
   `github.com/` and `linkedin.com/` — need Rob's actual profile URLs.
3. **All 4 project entries in `src/data/projects.js` are placeholders** (`status:
   'planned'`, empty `links.repo`/`links.demo`) except TriCoach's description, which is
   accurate since that app already exists. Build order agreed with Rob:
   1. **F1 predictive model** — historical + 2026 season data (FastF1 library),
      ML model predicting driver/team performance by track archetype (street circuits
      vs. classic elevation-heavy circuits). Output: interactive Plotly dashboard
      (static HTML/JS, no backend — fits GitHub Pages hosting), embedded or linked from
      the project card.
   2. **Triathlon training dashboard** — pulls from the intervals.icu API (same data
      source as TriCoach below), visualizes workout history, pace/power trends, and
      CTL/ATL/TSB training load in the browser. React, separate repo.
   3. **Healthcare RAG** — RAG over synthetic patient data. Use **Synthea** (open-source
      synthetic EHR generator) for patient/medication/encounter data — deliberately
      synthetic to avoid HIPAA/compliance risk with real data.
   4. **TriCoach** — already built (separate existing repo at
      `~/Documents/Personal/Code Projects/TriCoach`, iOS/SwiftUI). Since it can't run
      live in a browser, present it via a 60-90 second screen-recorded walkthrough video
      embedded on its project card, plus the architecture writeup pulled from its own
      README (deterministic training engine + on-device Apple Intelligence coaching,
      intervals.icu sync — see that repo's README.md/CLAUDE.md for full detail).

   As each project repo gets built, update its entry in `src/data/projects.js`
   (`status: 'built'`, real `links.repo`, `links.demo` if applicable) and swap the
   placeholder `summary` for something specific to what was actually built.
4. Once GitHub's Actions outage clears, decide whether to switch back to Actions-based
   auto-deploy (see Deployment section above) or keep the manual `npm run deploy` flow.

## Preferences to respect going forward

- **No em dashes anywhere in site copy** — explicit user correction, applies to all
  future copy (project summaries, any new sections).
- **Tone**: nonchalant/confident, not corporate-sounding. Short, declarative sentences.
- **No custom domain for now** — staying on free `github.io` until there's reason to
  spend money on it.
- **No contact form** — mailto: link only, deliberately avoided backend/third-party
  form service complexity.
- Site repo (`robcalimente.github.io`) is intentionally separate from each project's own
  repo — it links out to / embeds their output, doesn't contain their code.
