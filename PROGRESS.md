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

- [x] **Catan Board Generator — built and live.** Separate repo
      [`catan-generator`](https://github.com/robcalimente/catan-generator), live at
      https://robcalimente.github.io/catan-generator/. React + TypeScript + Vite, SVG
      rendering. Generates base-game (19-tile) and 5-6 Player Extension (30-tile)
      boards via constraint-satisfaction backtracking (needed a most-constrained-
      variable heuristic — plain shuffle-and-reject wasn't reliable/fast enough once
      several fairness rules stack), with five configurable fairness toggles including
      a pip-intersection cap, fixed/random ports, PNG export, seed-based shareable
      permalinks, animated tile reveal, original SVG illustrated art (no assets traced
      from the real game), unofficial-fan-tool disclaimer footer. Vitest suite (10
      tests: engine invariants + a jsdom render smoke test), lint, and production build
      all clean. Pushed to GitHub and deployed to GitHub Pages (2026-08-07). Portfolio
      card updated to `status: 'built'` with real links.

  **Known gap: not visually QA'd in an actual browser** — this session had no browser
  automation available, so it was verified via production build, typecheck, lint, and
  a jsdom smoke-render of `<App />` (confirms it mounts, the board SVG renders with
  tiles, "New board" doesn't throw) rather than by looking at it rendered. Worth an
  actual look before treating the visual design (wood-grain texture, mobile bottom
  sheet, PNG export output) as validated — flag any rough edges found and they can be
  fixed as a quick follow-up, not a re-scope.

## Not done yet — in priority order

1. **Healthcare RAG** — fully scoped via a `/grill-me` session — see below for the
   agreed plan. Not started (build has not begun).

2. **Triathlon training dashboard** — pulls from the intervals.icu API (same data
   source as TriCoach, see below) to visualize workout history, pace/power trends over
   time, and CTL/ATL/TSB training load in the browser. React, new separate repo
   (sibling to `f1-predictor` and `TriCoach` under
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

### Catan board generator — scoped plan (from 2026-08-07 grill-me session, built same day)

**Goal**: an unofficial random Catan board generator, polished enough to be a real
portfolio centerpiece, not a toy — settings-driven, mobile-usable, illustrated rather
than flat/utilitarian like most existing generators.

**Repo**: new standalone repo `catan-generator` (sibling to `f1-predictor`, `TriCoach`
under `~/Documents/Personal/Code Projects/`), React + **TypeScript** + Vite (breaks
from the portfolio's plain-JS convention deliberately — the constraint-solving logic
has real invariants worth type-checking), deployed to its own GitHub Pages
(`robcalimente.github.io/catan-generator/`) via the same `gh-pages` package flow as
`f1-predictor`. Portfolio site links out to it, doesn't contain its code.

**v1 scope — Base game + 5-6 Player Extension only, random generation**:
- Base game: 19 tiles. 5-6 Player Extension: 30 tiles, its own fixed outer shape.
  Player count (3-4 / 5-6) is a top-level setting.
- **Seafarers is explicitly deferred to a later phase** — official Seafarers scenarios
  (Heading for New Shores, The Four Islands, etc.) each have their own fixed
  island/coastline geometry, not a random tile shuffle, and deserve their own design
  pass rather than blocking v1.
- Cities & Knights / Traders & Barbarians are not planned — they add game mechanics,
  not board geography, so there's nothing board-layout-specific to generate for them.

**Generation logic**: port/rewrite the constraint-solving core already working in
`catan.py` (doubled-coordinate hex grid, port-to-tile resource banning, no
same-resource tiles adjacent, no 6/8 adjacent, no 6/8 duplicated on one resource, no
duplicate numbers on one resource) into TypeScript. Rendered as **SVG** (crisp at any
zoom, styleable, animatable with Framer Motion, already a portfolio dependency).

**v1 config toggles** (all individually switchable, not just presets):
- Player count (3-4 / 5-6)
- Fixed vs. random port locations
- Each fairness rule on/off: same-resource adjacency, 6/8 adjacency, 6/8-duplicate-per-
  resource, duplicate-number-per-resource
- **Pip-intersection cap** (new, from competitive research below): cap the combined pip
  value of the 3 tiles touching any single vertex, preventing one absurdly strong
  starting spot — a real named technique multiple existing tools converged on, cheap to
  add given the constraint-checking pass already exists for the other rules.
- Number token display: digit + pip dots (matches physical tiles, 6/8 in red),
  independently toggleable so pips can be hidden for a cleaner look.

**Deferred to v1.1 / phase 2** (explicitly not lost, just not blocking v1):
- Seafarers scenarios (see above)
- Manual pin + auto-fill — lock specific tiles/numbers in place, regenerate the rest
  under active constraints. Different interaction paradigm (click-to-lock) than the
  rest of v1, better suited once the core generator is solid.

**Visual style — illustrated/skeuomorphic, original art only**: wood-texture hex
backgrounds and per-resource icons (sheep/wheat/wood/brick/stone), designed as
**original SVG illustrations** — inspired by but not copied/traced from the real board.
This is a deliberate legal choice as much as an aesthetic one (see Branding below).

**Actions**: generate/regenerate with an animated tile-reveal (staggered Framer Motion
fade/scale-in per tile, fits the portfolio's existing animation-forward style), export
board as PNG, and a **shareable permalink** (seed + config encoded into the URL, so a
specific board can be reproduced/shared by link) — added after competitive research
showed this is near-universal in existing tools, more expected than PNG-export alone.

**Responsive/mobile**: fully responsive, mobile-first — someone may pull this up on
their phone at game night to set up a physical board (research found most existing
generators are desktop-only, so this is a genuine differentiator, not just polish).
Settings panel is a persistent sidebar on desktop/tablet, collapsing into a swipe-up
bottom sheet on mobile.

**Branding**: title stays **"Catan Board Generator"** (not stripped of the name), with
a clear footer/about disclaimer: "CATAN® is a registered trademark of CATAN GmbH; this
is an unaffiliated, unofficial fan tool." No copied icons, textures, or fonts from the
real game — all original SVG art, which is also what keeps this low-risk on the
trademark/copyright front.

**Testing**: Vitest (pairs with Vite, no extra config) unit tests specifically for the
generation/constraint logic — e.g. "no two 6/8 tiles ever end up adjacent across N
generated boards," "tile counts always match the configured player-count pool." Matches
the TypeScript choice: catch invariant breaks at the logic layer, not by eyeballing the
UI after every tweak.

**Competitive research notes (2026-08-07)**: surveyed ~15 existing Catan generators
(GitHub OSS repos + hosted tools like catanboard.com, settlersboard.com). Findings
folded into the plan above (pip-intersection cap, shareable permalinks, mobile-first as
a differentiator, disclaimer-based branding as standard practice). Also surfaced but
**not** adopted for v1: resource-probability heatmap overlays and "best starting spot"
analytics (common in existing tools but read as v2 scope creep, not core).



**Goal**: demonstrate real RAG engineering (not a toy chatbot) to a hiring manager —
retrieval that's visibly correct, an honest accounting of where pure-RAG falls short,
and a documented eval, all running for free indefinitely.

**Data**: ~1000 synthetic patients generated via **Synthea**, including conditions,
medications, encounters, lab observations, and clinical notes (SOAP-style). Synthetic
only, deliberately avoids HIPAA/real-PHI risk.

**Two demo modes**:
- **Patient-scoped chat** — pick a synthetic patient, ask questions answered via RAG
  scoped to that patient's records (metadata-filtered retrieval by patient ID).
- **Population-level chat** — ask questions across the full synthetic cohort.

**Hybrid retrieval architecture** (this is the core "engineering story" of the
project):
- Vector RAG (Chroma or FAISS, pre-built index, bundled with backend) handles
  descriptive/pattern questions in both modes.
- A **rule-based router** (keyword/pattern matching — e.g. "how many", "what
  percentage", "count of" → structured path) detects counting/aggregate questions in
  population mode and routes them to a **real structured/SQL query** over the
  underlying Synthea tables instead of vector search, since similarity search
  systematically undercounts on exact-count questions. Router logic is deterministic
  and shown in the UI (not an LLM call) — keeps it cheap and fully explainable.
  LLM-based routing is a documented v2 idea, not built in v1.

**Free-tier stack** (target: $0 recurring cost):
- LLM inference: Groq free API tier (fast enough to keep demo latency low).
- Embeddings: local open-source model (`sentence-transformers/all-MiniLM-L6-v2`),
  no per-call embedding cost.
- Vector store: Chroma/FAISS, in-process, pre-indexed at build time (like
  `f1-predictor`'s offline model training), not computed per-request.
- Backend hosting: Render or Fly.io free tier. Known tradeoff: free tier sleeps after
  inactivity, ~10-30s cold start on first request — frontend must show an explicit
  "waking up the demo" state rather than a silent hang, so the delay reads as
  intentional.
- Frontend: React, deployed to its own GitHub Pages repo, same pattern as
  `f1-predictor` (site links out, doesn't embed the code).

**Trust/transparency UI** (this is what makes the eval credible, not just a claimed
number):
- A live **retrieval trace panel** shown alongside every chat answer: which patient(s)
  were matched, top-k retrieved chunks (record type, date, snippet, similarity score),
  which chunks the answer actually cites, and which router path (vector vs structured)
  handled the question.
- A persistent, visible **disclaimer**: "Synthetic data only (Synthea-generated). Not
  real patients. Not for clinical use." Not buried in a README — shown in the UI
  itself.

**Eval methodology**: hand-crafted set of ~30-50 Q&A pairs (mix of patient-scoped and
population-scoped) where the correct answer is mechanically derivable from the
underlying Synthea data. Score retrieval quality (did it fetch the right source
records — measurable exactly against known ground truth) and answer correctness
(graded manually, not LLM-as-judge, since the set is small enough and manual grading
is more trustworthy to publish as a real number). Results published on a dedicated
methodology/eval page on the project's own dashboard — not just a README.

**Phasing**:
- **Phase 1 (MVP — this is what "done" means for first ship)**: full 1000-patient
  dataset with notes, both chat modes working, hybrid router with structured counting,
  retrieval trace panel, disclaimer, and the methodology/eval page with published
  results from the 30-50 question eval set. This is a complete, demoable project on
  its own.
- **Phase 2 (stretch — do not lose track of this, not yet built)**:
  - Improve retrieval quality based on what the Phase 1 eval reveals as weak.
  - Expand the eval set beyond the initial 30-50 questions.
  - Broaden population-mode question coverage (phrasings the rule-based router
    doesn't yet catch).
  - LLM-based routing as a documented v2 replacement for the rule-based router.

Visual identity, exact repo name, and UI layout details are not yet decided — to be
figured out at build time, following the existing rule that each project gets its own
distinct visual identity rather than reusing another project's design system.

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
