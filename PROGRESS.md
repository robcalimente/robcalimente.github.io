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
  bio, and two CTA buttons ("See the work" → `#projects`, "Get in touch" → `#contact`).
- **Page 2 (`page-two` wrapper in `App.jsx`)** — `Projects.jsx` (expandable project
  cards) and `Contact.jsx` ("Let's talk" — email, resume link, GitHub/LinkedIn) stacked
  in the same internally-scrollable page.

Theme is dark-mode-first with a light-mode override via `prefers-color-scheme`.

## Deployment

Manual, via the `gh-pages` npm package (pushes `dist/` straight to the `gh-pages`
branch, bypassing GitHub Actions):

```bash
npm run deploy   # runs: vite build && gh-pages -d dist -b gh-pages
```

GitHub Pages source is set to legacy branch mode (`gh-pages` branch). This has been
working reliably; no need to switch to Actions-based deploy unless there's a reason to.

## Done

- [x] Repo scaffolded (React + Vite), dark-mode-first theme, particle hero animation,
      two-page scroll-snap layout, confident/casual copy pass (no em dashes)
- [x] Resume PDF at `public/resume.pdf`, GitHub/LinkedIn links fixed to real profiles
- [x] **F1 Predictive Model — built and live.** Separate repo
      [`f1-predictor`](https://github.com/robcalimente/f1-predictor), dashboard at
      https://robcalimente.github.io/f1-predictor/. Three LightGBM models (qualifying
      pace, finishing position, points) trained on 2018-2026 FastF1 data, chronological
      walk-forward validated, automated via GitHub Actions (Thursday pre-race /
      Monday post-race). Portfolio card updated to `status: 'built'` with real links.

  **In progress as of this handoff, in a separate concurrent session — do not edit
  the `f1-predictor` repo until that session finishes** (it has uncommitted local
  changes and a running background data pull): adding qualifying-specific team-form
  features and circuit-level wet-race/safety-car priors to improve the model. This is
  a self-contained enhancement to an already-shipped project; it does not block
  starting the next project below.

## Not done yet — in priority order

1. **Triathlon training dashboard** — next up. Pulls from the intervals.icu API
   (same data source as TriCoach, see below) to visualize workout history, pace/power
   trends over time, and CTL/ATL/TSB training load in the browser. React, new separate
   repo (sibling to `f1-predictor` and `TriCoach` under
   `~/Documents/Personal/Code Projects/`), deployed the same way as `f1-predictor`
   (own GitHub repo + GitHub Pages, portfolio site links out to it rather than
   containing its code).

   Not yet scoped in detail — that's the first step: figure out what intervals.icu API
   access looks like (auth, rate limits, what data is actually available), decide what
   the dashboard should visualize beyond the three things already named (workout
   history, pace/power trends, CTL/ATL/TSB), and decide on visual identity (the
   `f1-predictor` dashboard has a "live timing tower" aesthetic — the triathlon
   dashboard should have its own distinct visual identity fitted to its own subject,
   not reuse that look).

   TriCoach's own repo (`~/Documents/Personal/Code Projects/TriCoach`, private,
   iOS/SwiftUI) already integrates with intervals.icu — its README.md/CLAUDE.md is the
   reference for how that API's auth and data model work, worth reading before
   starting from scratch.

2. **Healthcare RAG** — RAG over synthetic patient data. Use **Synthea** (open-source
   synthetic EHR generator) for patient/medication/encounter data — deliberately
   synthetic to avoid HIPAA/compliance risk with real data. Not started.

3. **TriCoach project card** — already built (iOS/SwiftUI, deterministic training
   engine + on-device Apple Intelligence coaching, intervals.icu sync). Since it can't
   run live in a browser, present it via a 60-90 second screen-recorded walkthrough
   video embedded on its project card, plus an architecture writeup pulled from its own
   README. Portfolio card (`src/data/projects.js`, id `tricoach`) still has placeholder
   links — needs the video + real repo link (note: that repo is currently private).

   As each project repo gets built, update its entry in `src/data/projects.js`
   (`status: 'built'`, real `links.repo`, `links.demo` if applicable) and swap the
   placeholder `summary` for something specific to what was actually built — see the
   `f1-predictor` entry for the pattern to follow.

## Preferences to respect going forward

- **No em dashes anywhere in site copy** — explicit user correction, applies to all
  future copy (project summaries, any new sections, and any new project's own
  README/dashboard copy too).
- **Tone**: nonchalant/confident, not corporate-sounding. Short, declarative sentences.
- **No custom domain for now** — staying on free `github.io` until there's reason to
  spend money on it.
- **No contact form** — mailto: link only, deliberately avoided backend/third-party
  form service complexity.
- Site repo (`robcalimente.github.io`) is intentionally separate from each project's
  own repo — it links out to / embeds their output, doesn't contain their code.
- **Never add a `Co-Authored-By: Claude` or `Claude-Session:` trailer to any commit, in
  any of Rob's repos.** Explicit instruction (2026-08-06) after Claude showed up as a
  GitHub contributor on `f1-predictor`; history was rewritten to remove it there and on
  this repo. Plain commit messages only, going forward, everywhere.
- Each new project repo should get its own distinct visual identity for its dashboard/
  site rather than reusing another project's design system — `f1-predictor`'s "live
  timing tower" look is specific to F1, not a template to carry forward.
