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
    id: 'tri-dashboard',
    title: 'Triathlon Training Dashboard',
    tagline: 'A web view into real training load and pace trends, powered by the same data as TriCoach',
    tags: ['React', 'Data Viz', 'API'],
    status: 'planned',
    summary:
      'Pulls from the intervals.icu API to visualize workout history, pace/power trends over time, and CTL/ATL/TSB training load. A browser-based companion to the TriCoach iOS app.',
    links: { repo: '', demo: '' },
  },
  {
    id: 'healthcare-rag',
    title: 'Healthcare RAG',
    tagline: 'Retrieval-augmented AI over synthetic patient records',
    tags: ['AI', 'RAG', 'LLMs'],
    status: 'planned',
    summary:
      'Explores how RAG can surface relevant context from patient histories: medications, encounters, visits. Uses Synthea-generated synthetic EHR data to stay compliance-safe while modeling a real healthcare use case.',
    links: { repo: '', demo: '' },
  },
  {
    id: 'tricoach',
    title: 'TriCoach',
    tagline: 'An on-device iOS triathlon training app with a deterministic coaching engine',
    tags: ['Swift', 'SwiftUI', 'iOS', 'On-device AI'],
    status: 'built',
    summary:
      'Builds and adapts swim/bike/run training plans against intervals.icu data, with workout-specific fueling guidance and on-device Apple Intelligence coaching notes layered on top of a fully auditable, rule-based training engine (CTL/ATL/TSB load tracking, periodization, template selection).',
    links: { repo: '', demo: '' },
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
]
