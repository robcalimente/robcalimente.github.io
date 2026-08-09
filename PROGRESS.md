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
  (`ParticleField.jsx`, vanilla canvas, no dependency) that also animates cars, a
  cyclist, a runner, and a swimmer racing through the particle field (motorsport +
  triathlon personality touches, see Done below), name, headline, one-paragraph bio,
  a row of domain HUD chips (DATA/AI/MOBILE/WEB), and two CTA buttons ("See the work"
  → `#projects`, "Get in touch" → `#contact`). Also mounts two site-wide (not
  hero-scoped) components from `App.jsx`: `StartLights.jsx` (F1-style five-light
  intro overlay, plays once per browser session via `sessionStorage`) and
  `LapLine.jsx` (checkered-flag-textured scroll progress bar pinned to the top,
  tracks the `#root` scroll container).
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
      a pip-intersection cap, fixed/random ports, a "robber starts in the center" toggle
      (pins the desert to the board's middle before the solver runs), PNG export,
      seed-based shareable permalinks, animated tile reveal, original SVG illustrated
      art (no assets traced from the real game), unofficial-fan-tool disclaimer footer.
      Vitest suite (12 tests: engine invariants + a jsdom render smoke test), lint, and
      production build all clean. Pushed to GitHub and deployed to GitHub Pages
      (2026-08-07). Portfolio card updated to `status: 'built'` with real links, ordered
      last in the project list (Rob's preference — most recent isn't necessarily first).

  **Visual polish pass (2026-08-07, same day)**: Rob flagged the board as visually flat
  and asked for a bigger/nicer look. Found and fixed a real bug in the process — the
  ocean background's radial gradient was centered on a fixed 2000x2000-unit rect's own
  bounding box while the visible viewBox is only ~20-25 units wide, so its falloff never
  actually rendered (just a flat, off-center wash). Fixed to compute from actual board
  bounds. Also added drop shadows on tiles/number chips/ports (raised, tactile look),
  a soft ground shadow under the island, and scaled the board's max render size up
  (920px → 1360px wide cap, 82svh → 90svh tall cap).

  Rob reported still seeing no visible difference after that pass. Investigated by
  building `scripts/render-screenshot.mjs` + `scripts/rasterize.mjs` — a way to
  headlessly render the *actual* engine/theme code to a real PNG (not a mockup) without
  needing a live browser, which this session never had access to. That surfaced the
  real culprit: a `grain`/`water-ripple` texture layer (feTurbulence + CSS
  `mix-blend-mode`) that broke the headless SVG rasterizer outright (rendered as a
  washed-out rectangular artifact) and was never actually confirmed to render correctly
  in a real browser either — it was added on faith during the original build, with no
  visual verification available at build time. Removed both from the live app. The
  resulting real screenshot (now in `catan-generator/docs/screenshot.png` and embedded
  in that repo's README) looks clean: good color depth, legible icons, working drop
  shadows, readable number chips and ports.

  **Still open**: asked Rob to check the live site and confirm the blend-mode removal
  actually fixed what he was seeing (as opposed to a caching issue or something else
  entirely) — he hadn't sent a screenshot back as of this handoff. If a new session
  picks this up, that confirmation is the next thing to chase before considering the
  visual pass done. Also did a broader README overhaul in the same session: badges,
  live demo link, a written explanation of the generation algorithm, and an MIT
  `LICENSE` file (source code only, CATAN trademark disclaimer folded in) — see that
  repo's `README.md` directly rather than duplicating it here.

- [x] **Healthcare RAG — built and live.** Separate repo
      [`healthcare-rag`](https://github.com/robcalimente/healthcare-rag), demo at
      https://robcalimente.github.io/healthcare-rag/ (frontend, GitHub Pages) with a
      FastAPI backend at https://healthcare-rag-backend.onrender.com (Render free
      tier). Built and deployed 2026-08-07 to 2026-08-09 in the same session that
      scoped it. Portfolio card updated to `status: 'built'` with real links.

  **What it is**: RAG over 100 synthetic Synthea patients (conditions, medications,
  encounters, labs, clinical notes — last 5 years per patient). Two chat modes:
  patient-scoped (vector RAG filtered by patient ID) and population-level, where a
  deterministic rule-based router sends counting/percentage questions to a real SQL
  query instead of vector search (vector search reliably undercounts) and sends
  everything else to vector RAG. Every answer ships with a live retrieval trace
  (matched chunks, similarity scores, which router path handled it) and a persistent
  "synthetic data, not for clinical use" disclaimer. A 40-question eval with
  mechanically-derived ground truth is published on the site's own Methodology page:
  population-mode counting is 100% accurate, patient-mode list questions are a
  documented 30% under strict all-or-nothing grading — a real, understood
  retrieval-depth limitation (patients with more records than fit in one retrieval
  call get incomplete lists back), written up honestly rather than hidden.

  **Free-tier stack**: Groq (LLM, free tier), fastembed/ONNX Runtime (embeddings,
  not sentence-transformers/PyTorch — see below for why), a plain in-memory numpy
  vector matrix (no ANN index needed at this scale) with chunk text in SQLite, React
  frontend on GitHub Pages, FastAPI backend on Render free tier. $0 recurring cost.

  **Deploy debugging, worth remembering for future free-tier-hosted projects**: the
  first Render deploy crashed on `HF_HUB_OFFLINE` forcing an embedding-model lookup
  that only worked on a machine with a local cache (fixed: don't force offline mode,
  let it download once at boot). The second and third deploys OOM'd on Render's
  512MB limit — traced to PyTorch's own baseline memory footprint (not corpus size:
  it still OOM'd after cutting the corpus to a few MB), which is what actually forced
  the embedding-model swap from `sentence-transformers` to `fastembed` (ONNX Runtime,
  no PyTorch). That swap then needed its own fixes: unbounded clinical-note text
  length was quadratically blowing up attention cost, and fastembed's default
  multiprocessing was spawning redundant full model copies per batch (`parallel=1`
  fixed it). Also downsampled from the originally-planned 1000 patients to 100 as a
  safety margin against the 512MB ceiling once the other fixes were in — a hosting-
  budget decision, not a design limitation, documented on the Methodology page itself
  rather than just in this file.

  **Phase 2 (stretch — explicitly deferred, not lost, not yet started)**:
  - Improve patient-mode retrieval completeness (the 30% number) — likely needs
    per-record-type retrieval instead of one flat top-k call, since that's the
    documented root cause, not a prompting issue.
  - Expand the eval set beyond the initial 40 questions.
  - Broaden population-mode question coverage (phrasings the rule-based router
    doesn't yet catch).
  - LLM-based routing as a documented v2 replacement for the rule-based router.
  - Re-run the eval at the full 1000-patient scale if a paid tier or a
    memory-cheaper architecture ever makes that viable, to see whether the Phase 1
    numbers hold at scale.

- [x] **TriCoach project card — finished (2026-08-09).** Repo made public
      ([`TriCoach`](https://github.com/robcalimente/TriCoach)), card embeds a
      hand-recorded simulator walkthrough video (`public/videos/tricoach-walkthrough.mp4`
      — Rob recorded this one himself via the iOS simulator's screen recording, replacing
      an earlier scripted capture; shows the workout-detail interval chart, coach note,
      and the workout-swap flow), architecture-forward summary swapped in, `ProjectCard`
      component gained optional video support (reusable for any future iOS-only project
      without a live demo). `status: 'built'` in `projects.js`.

  The seeded demo data used for recording (readiness score, a full training week,
  activity history, trends) lives only in the iOS Simulator's local SwiftData store on
  Rob's machine, not in the `TriCoach` repo itself — the temporary seeding code was
  deleted and never committed, so that repo stays exactly what a visitor would expect
  to clone and run for real.

  **Resolved**: an earlier pass on this same day committed with a `Co-Authored-By:
  Claude` / `Claude-Session:` trailer, violating the explicit standing rule below
  ("Never add a Co-Authored-By: Claude ... trailer to any commit, in any of Rob's
  repos"). Caught, confirmed with Rob, and fixed via `git filter-branch` + force-push
  to strip the trailers from history (same fix previously used on `f1-predictor` and
  this repo). If a Co-Authored-By trailer shows up again in any repo, same fix
  applies — but always confirm with Rob before rewriting history/force-pushing.

- [x] **Hero rework + motorsport/triathlon personality touches (2026-08-09).**
      Committed as `c57b8e1`, pushed to `main`, and deployed live via `npm run
      deploy`.

  **Copy/hierarchy**: headline changed from a generic "I build full-stack,
  AI-powered, and mobile-native software" to "I turn data into decisions, then
  build the AI and apps to act on them," with subtext explicitly framing data
  science/analytics as Rob's background and AI/full-stack/mobile as what he builds
  for fun — Rob's real professional background is data science/analytics, and the
  original copy buried that. Name (`hero-eyebrow`) bumped to 36px/800-weight so it
  reads clearly bold next to the headline. An earlier attempt to make the name the
  literal biggest element (swapping it into the `<h1>` slot) was tried and
  explicitly rejected by Rob ("not loving it") — don't reintroduce that swap without
  checking first.

  **Domain HUD chips** (`hero-domains` in `Hero.jsx`/`Hero.css`): a monospace
  telemetry-style row reading `01 DATA · 02 AI · 03 MOBILE · 04 WEB` under the
  subtext. Well-received, kept as-is.

  **Rejected/removed**: a pulsing "currently building, currently training" status
  dot next to the name (`hero-status`/`hero-pulse`) was built, then explicitly
  cut per Rob's feedback — don't re-add without Rob asking for it again.

  **`StartLights.jsx`**: five-light F1-style intro sequence (lights fill in, then
  all go dark together — "lights out, away we go" — before the hero content
  animates in). Gated by `sessionStorage.getItem('intro-shown')`, so it only plays
  once per browser session; to see it again in dev, run
  `sessionStorage.clear()` in the console and reload, or open a private window.

  **`LapLine.jsx`**: thin scroll-progress bar fixed to the top of the page, styled
  with a repeating checkered-flag-pattern track and an accent-colored fill tied to
  `useScroll({ container })` against `document.getElementById('root')` (the actual
  scrollable element, since this site uses `overflow-y: auto` + scroll-snap on
  `#root`, not window scroll).

  **`ParticleField.jsx` racers** — the same canvas particle system used for the
  background constellation now also spawns four kinds of moving figures
  (`KIND_CONFIG` object controls speed/scale/lane/spawn-cadence per kind), each
  independently scheduled and all briefly linking into nearby constellation
  particles as they pass:
  - **Cars** (`drawCarSilhouette`): coupe silhouette (long hood, raked windshield,
    short cabin, canopy glass, lip spoiler, wheels with rim highlights, white
    headlight glow front / red taillight glow rear), one of four colors
    (`CAR_COLORS`: red/blue/purple/green) picked per spawn, fastest and most
    frequent (spawns every ~1.8–4.2s).
  - **Cyclist** (`drawCyclist`): diamond-frame bike + leaning rider, single
    accent-colored. Fixed a real bug here: the front wheel was originally wired to
    the bottom bracket like a chain stay (as if pedals drove the front wheel),
    which read as the bike moving backwards — front wheel now connects to the
    handlebars via a fork instead. Spawns roughly every 9–16s.
  - **Runner** (`drawRunner`): bent-elbow pumping arms, a driving leg (knee up,
    foot striking forward-down) alternating with a high-tucked recovery leg via a
    `legPose(w)` helper, forward torso lean, vertical bob. Was originally too
    subtle ("looks like fast walking") — amplitudes and the bent-knee alternation
    were added specifically to fix that. Spawns roughly every 18–30s.
  - **Swimmer** (`drawSwimmer`): lowest lane (near the bottom edge, `laneMin:
    0.86`), horizontal body line, big flutter kick, and a proper alternating
    freestyle arm cycle via `armPose(w)` — one arm bends at the elbow and reaches
    overhead (recovery/out of water), the other pulls back close to the body
    (underwater pull), trailing a faint ripple. Also originally too subtle, fixed
    the same way as the runner. Spawns roughly every 20–32s.

  All four kinds respect `prefers-reduced-motion` (skipped entirely when it's set,
  same as the base particle animation). Lint (`oxlint`) and `vite build` both clean.

  **If a future session touches `ParticleField.jsx` again**: the `at(px, py)`
  helper pattern (local figure-space coordinates transformed by
  `cx + px * dir * scale`) is used consistently across all four draw functions —
  keep new limbs/parts in that same local coordinate space rather than computing
  absolute canvas coordinates by hand, it's what makes direction-flipping and
  scaling work for free.

## Not done yet — in priority order

1. **Triathlon training dashboard** — pulls from the intervals.icu API (same data
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

   TriCoach's own repo (`~/Documents/Personal/Code Projects/TriCoach`, now public:
   https://github.com/robcalimente/TriCoach) already integrates with intervals.icu —
   its README.md/CLAUDE.md is the reference for how that API's auth and data model
   work, worth reading before starting from scratch.

   This is now the only remaining "not done" item — everything else that was in this
   list (TriCoach card, Healthcare RAG, Catan) shipped. Natural next thing to pick up.

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
