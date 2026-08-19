export const projects = [
  {
    id: 'f1-predictor',
    title: 'F1 Predictive Model',
    tagline: 'Predicting driver/team performance by track archetype, from 2018-2026 F1 data',
    tags: ['Python', 'ML', 'Data Engineering'],
    status: 'built',
    summary:
      'Three LightGBM models predict qualifying pace, finishing position, and points per driver per race. Splits driver skill (a slow signal that holds across cars) from team form (a fast signal that shifts within a season) instead of blending them into one lookback window. Chronological walk-forward validated. Live dashboard shows next-race predictions and a full predicted-vs-actual history.',
    links: { repo: 'https://github.com/robcalimente/f1-predictor', demo: 'https://robcalimente.github.io/f1-predictor/' },
  },
  {
    id: 'healthcare-rag',
    title: 'Healthcare RAG',
    tagline: 'Retrieval-augmented chat over 100 synthetic patient charts, with a live retrieval trace',
    tags: ['AI', 'RAG', 'LLMs'],
    status: 'built',
    summary:
      'Patient-scoped and population-level chat over Synthea-generated synthetic EHR data. A deterministic router sends counting questions ("how many patients have X") to a real SQL query instead of vector search, since similarity search reliably undercounts, while descriptive questions go through vector RAG. Every answer ships with a retrieval trace showing exactly what was matched and why. A 40-question eval with mechanically-derived ground truth is published on the site: population-mode counting is 100% accurate, patient-mode list questions are a documented, honest 30% under strict grading, a real retrieval-depth limitation, not smoothed over.',
    links: { repo: 'https://github.com/robcalimente/healthcare-rag', demo: 'https://robcalimente.github.io/healthcare-rag/' },
  },
  {
    id: 'tricoach',
    title: 'TriCoach',
    tagline: 'An on-device iOS triathlon training app with a deterministic coaching engine',
    tags: ['Swift', 'SwiftUI', 'iOS', 'On-device AI'],
    status: 'built',
    summary:
      'Builds and adapts swim/bike/run training plans against intervals.icu data, with workout-specific fueling guidance and on-device Apple Intelligence coaching notes layered on top of a fully auditable, rule-based training engine. The split is deliberate: CTL/ATL/TSB load tracking, race-distance-aware periodization, and template selection are 100% deterministic Swift, and Apple\'s on-device Foundation Models framework is used only to rephrase those already-correct decisions into a natural coach voice, never to make them — every screen still works, just with plainer text, if Apple Intelligence isn\'t available. No backend; intervals.icu is the synced source of truth for zones and history, with planned workouts pushed back to your training calendar.',
    links: { repo: 'https://github.com/robcalimente/TriCoach', demo: '' },
    video: '/videos/tricoach-walkthrough.mp4',
  },
  {
    id: 'tri-dashboard',
    title: 'Triathlon Training Dashboard',
    tagline: 'A synthetic-data training dashboard with a client-side ML finish-time predictor',
    tags: ['React', 'LightGBM', 'Data Viz'],
    status: 'built',
    summary:
      'A portfolio companion to TriCoach, built on synthetic data rather than a live intervals.icu pull, since that would mean exposing personal training data or building a visitor auth flow. 2,500 synthetic athletes, generated from real training-plan numbers sourced from TriCoach itself, train a LightGBM quantile-regression model (p10/p50/p90) that predicts finish time across all four race distances at once and runs entirely client-side in the browser, no backend, via a hand-rolled JS tree-walker over the exported model. Drag the sliders and watch predictions update live. Per-distance accuracy is reported honestly on the site\'s own methodology page, extrapolations included.',
    links: { repo: 'https://github.com/robcalimente/tri-dashboard', demo: 'https://robcalimente.github.io/tri-dashboard/' },
  },
  {
    id: 'catan-generator',
    title: 'Catan Board Generator',
    tagline: 'A fair-by-default random board generator for base and 5-6 player Catan',
    tags: ['React', 'TypeScript', 'SVG'],
    status: 'built',
    summary:
      'Generates full base-game (19-tile) and 5-6 Player Extension (30-tile) boards with configurable fairness rules solved via constraint-satisfaction backtracking, not blind shuffle-and-reject: no matching resources adjacent, no 6/8s adjacent or duplicated per resource, and an optional pip-intersection cap. Every board is a reproducible permalink. Original illustrated SVG art, no assets traced from the real game.',
    links: { repo: 'https://github.com/robcalimente/catan-generator', demo: 'https://robcalimente.github.io/catan-generator/' },
  },
  {
    id: 'wheel-of-food',
    title: 'Wheel of Food',
    tagline: 'Decision fatigue, solved with a Vegas-style spinning wheel and zero regrets',
    tags: ['JavaScript', 'Canvas', 'Web Audio'],
    status: 'built',
    summary:
      "You ever get hungry but can't decide what to eat? Yeah, me too, more times than I'd like to admit. So instead of doom-scrolling Yelp for forty minutes, I built a Vegas-style spinning wheel to do the deciding for me. Load it with your go-to restaurants, spin it, and whatever it lands on is dinner, no take-backs. Winner Pick mode for a straight answer, Elimination mode if you want the drama of watching options get voted off one by one. Multiple named wheels in tabs (Pizza, BBQ, \"Places That Are Still Open\"), idle casino music, tick sounds, a win fanfare, and confetti, because a decision this important deserves a soundtrack. Also exists as a native SwiftUI/iOS port for when you need to outsource dinner decisions on the go.",
    links: { repo: 'https://github.com/robcalimente/wheel-of-food', demo: 'https://robcalimente.github.io/wheel-of-food/' },
  },
]
