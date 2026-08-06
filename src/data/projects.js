export const projects = [
  {
    id: 'f1-predictor',
    title: 'F1 Predictive Model',
    tagline: 'Predicting driver/team performance by track type using historical + 2026 season data',
    tags: ['Python', 'ML', 'Data Engineering'],
    status: 'planned',
    summary:
      'Uses FastF1 and historical Ergast data to model how drivers and teams perform across track archetypes (street circuits vs. classic elevation-heavy circuits). Interactive Plotly dashboard for exploring predictions by race.',
    links: { repo: '', demo: '' },
  },
  {
    id: 'tri-dashboard',
    title: 'Triathlon Training Dashboard',
    tagline: 'A web view into real training load and pace trends, powered by the same data as TriCoach',
    tags: ['React', 'Data Viz', 'API'],
    status: 'planned',
    summary:
      'Pulls from the intervals.icu API to visualize workout history, pace/power trends over time, and CTL/ATL/TSB training load — a browser-based companion to the TriCoach iOS app.',
    links: { repo: '', demo: '' },
  },
  {
    id: 'healthcare-rag',
    title: 'Healthcare RAG',
    tagline: 'Retrieval-augmented AI over synthetic patient records',
    tags: ['AI', 'RAG', 'LLMs'],
    status: 'planned',
    summary:
      'Explores how RAG can surface relevant context from patient histories — medications, encounters, visits — using Synthea-generated synthetic EHR data to stay compliance-safe while modeling a real healthcare use case.',
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
]
