export const resume = {
  role: 'Head of Risk Intelligence & Automations',
  company: 'Chipper Cash',
  location: 'San Francisco Bay Area',
  summary:
    'Engineering leader with 7+ years building production ML systems, services, and data platforms across risk, fraud, and compliance. I have built risk and compliance infrastructure from scratch for a fintech serving 10M+ people across seven markets, and I lead a small, AI-first team that replaces third-party vendors with systems we fully own and understand.',

  metrics: [
    { value: '7+', unit: 'years', label: 'building production ML and data systems' },
    { value: '10M+', unit: 'users', label: 'served across seven markets' },
    { value: '$1.4M+', unit: '/ year', label: 'retired in third-party vendor costs' },
    { value: '15+', unit: 'engineers', label: 'on the data practice I lead' },
  ],

  impact: [
    {
      title: 'Built a compliance platform from scratch',
      detail:
        'Case management, a transaction-monitoring rule engine, and an LLM decision-support layer on top, replacing a $250K/year vendor. Two years on it has carried 53,000 alerts and 900 regulatory filings across seven markets.',
      caseStudy: 'replacing-a-compliance-vendor',
    },
    {
      title: 'Shipped an onboarding-fraud ML model',
      detail:
        'A gradient-boosted model scoring every new user within an hour of signup. Blocks roughly 6,000 fraudulent referrals a day and drove offboarding of 19,000+ accounts.',
      caseStudy: '',
    },
    {
      title: 'Automated the fraud desk',
      detail:
        'An LLM pipeline reads partner fraud reports, resolves identity, and executes account locks and fund liens, cutting handling from 30 minutes to seconds. A second pipeline answers card chargebacks before the network deadline.',
      caseStudy: 'automating-the-fraud-desk',
    },
    {
      title: 'Rebuilt the data layer',
      detail:
        'Set up the dbt practice 15+ engineers build on, designed the canonical financial models, replaced a managed runtime with one we own, and shipped the alerting that catches what the alerts miss.',
      caseStudy: 'replacing-dbt-cloud',
    },
  ],

  experience: [
    {
      role: 'Head of Risk Intelligence & Automations',
      company: 'Chipper Cash',
      period: 'Oct 2025 - Present',
      summary:
        'Own fraud, compliance, and risk-data systems across seven markets, leading a small, AI-first team. Report to the Chief Compliance Officer.',
      bullets: [
        'Built a full compliance platform from scratch, case management, transaction monitoring, and a dbt-based rules engine, replacing a vendor that cost a quarter of a million dollars a year.',
        'Shipped ScreenGPT, an LLM decision-support layer for sanctions-watchlist clearance, evaluated against a golden dataset (78.4% accuracy on 269 cases, 92% precision on no-match) and integrated directly into the analyst queue.',
        'Built an LLM-powered fraud-alert pipeline that ingests partner reports, extracts the facts, resolves identity in Snowflake, and executes account locks and fund liens, running 24/7.',
        'Designed an LLM-driven monitoring framework that gives every critical subsystem six standardized signal types (health, volume, latency, anomaly, coverage, distribution) from a single YAML configuration.',
      ],
      tags: ['Compliance systems', 'LLM operations', 'Team leadership'],
      caseStudy: 'replacing-a-compliance-vendor',
    },
    {
      role: 'Tech Lead, Risk & Growth',
      company: 'Chipper Cash',
      period: 'Jan 2022 - Oct 2025',
      summary:
        'Promoted to Staff. Designed and shipped ML-powered fraud detection and the production services around it.',
      bullets: [
        'Architected an onboarding-fraud ML model (CatBoost, percentile-normalized features) that scores every new user; it blocks 6,000+ fraudulent referrals a day and drove the offboarding of 19,000+ fraud accounts.',
        'Built a real-time card-deposit scoring service with velocity and rolling-average features, serving production traffic under 5s end-to-end.',
        'Built an automated chargeback-decline pipeline that generates proof-of-delivery evidence and submits responses through the processor API inside the network deadline, after a coordinated attack cost the company millions.',
        'Shipped a merchant-parsing service that classifies card-transaction strings via LLM-powered extraction, returning merchant, category, and logo in under one second per request.',
        'Reduced account-takeover incidents from 30+ a day to under 10 a quarter with selfie-based step-up authentication and device blocklisting.',
      ],
      tags: ['Fraud ML', 'Production services', 'Real-time scoring'],
      caseStudy: '',
    },
    {
      role: 'Senior Data Scientist',
      company: 'Chipper Cash',
      period: 'Feb 2021 - Jan 2022',
      summary: 'Core financial data infrastructure, growth analytics, and fraud investigations.',
      bullets: [
        'Led company-wide dbt adoption: set up the practice in the mono-repo, defined model structure and testing standards, wrote the onboarding guide, and trained 15+ engineers who now build on it.',
        'Designed the two canonical financial data models (transfers, ledger entries) that still power the company analytics, dashboards, fraud features, and internal tools.',
        'Built RADOS, a campaign-delivery engine (Python + Dask) that resolves segments and bulk-writes notifications, reaching ~900K users in two hours per campaign run.',
        'Co-built DMS, an in-house data-monitoring system that watches every important table and auto-segments failing populations so analysts get root cause in the alert itself.',
      ],
      tags: ['Data platform', 'dbt', 'Growth systems'],
      caseStudy: 'replacing-dbt-cloud',
    },
    {
      role: 'Senior Consultant, Data Science',
      company: 'Logic (acquired by Accenture)',
      period: 'Oct 2018 - Feb 2021',
      summary: 'Client-facing data-science consulting for Fortune 500 retail.',
      bullets: [
        'Delivered predictive analytics for Fortune 500 retailers including Best Buy and Kendra Scott, leading engagements end to end from discovery to deployment.',
        'Presented recommendations on demand forecasting, inventory optimization, and pricing to senior merchandising leadership.',
      ],
      tags: ['Consulting', 'Forecasting'],
    },
  ],

  systems: [
    {
      category: 'Compliance & monitoring',
      items: [
        {
          name: 'Compliance Case-Management Platform',
          detail: 'in-house, replacing a vendor',
          caseStudy: 'replacing-a-compliance-vendor',
        },
        {
          name: 'LLM Watchlist Decision-Support',
          detail: 'ScreenGPT, with evaluation harness',
          caseStudy: '',
        },
        {
          name: 'Transaction-Monitoring Rule Engine',
          detail: '35 rules, seven markets',
          caseStudy: 'standardizing-detection-rules',
        },
      ],
    },
    {
      category: 'Fraud detection & response',
      items: [
        { name: 'User Onboarding Score', detail: 'CatBoost, scored within an hour', caseStudy: '' },
        {
          name: 'Real-Time Transaction Scoring',
          detail: 'card-deposit fraud, under 5s',
          caseStudy: '',
        },
        {
          name: 'Fraud-Alert Automation Pipeline',
          detail: 'Gmail + LLM, 30 min to seconds',
          caseStudy: 'automating-the-fraud-desk',
        },
        {
          name: 'Chargeback Decline Automation',
          detail: 'inside the 24-hour network window',
          caseStudy: 'automating-the-fraud-desk',
        },
      ],
    },
    {
      category: 'Data platform',
      items: [
        {
          name: 'dbt Models',
          detail: 'the canonical models every downstream system is built on',
          caseStudy: 'replacing-dbt-cloud',
        },
        {
          name: 'Data Monitoring System (DMS)',
          detail: 'config-driven, auto-segmented',
          caseStudy: '',
        },
        {
          name: 'LLM Monitoring Framework',
          detail: 'YAML signals across subsystems',
          caseStudy: '',
        },
        {
          name: 'Merchant Parsing Service',
          detail: 'LLM extraction, under 1s per transaction',
          caseStudy: '',
        },
      ],
    },
    {
      category: 'Growth systems',
      items: [
        { name: 'Campaign Delivery Engine', detail: '900K users per run', caseStudy: '' },
        { name: 'User Engagement Score', detail: 'per-product, drives retention', caseStudy: '' },
        {
          name: 'Risk-Aware Payout Pipeline',
          detail: 're-checks flags at money movement',
          caseStudy: '',
        },
      ],
    },
  ],

  skills: [
    { group: 'Languages', items: ['Python', 'SQL', 'TypeScript'] },
    { group: 'Data', items: ['dbt', 'Snowflake', 'Postgres', 'Fivetran', 'Airflow'] },
    { group: 'ML / AI', items: ['LLMs', 'OpenAI', 'CatBoost', 'Dask', 'NLP'] },
    {
      group: 'Services & infra',
      items: ['Flask', 'Docker', 'GCP', 'Bazel', 'Retool', 'GitHub Actions'],
    },
  ],

  education: [
    {
      school: 'Grinnell College',
      detail: 'B.A. in Mathematics & Statistics',
      period: '2018',
    },
    {
      school: 'Budapest Semesters in Mathematics',
      detail: 'Study abroad in advanced mathematics',
      period: '',
    },
    {
      school: 'Stanford Continuing Studies',
      detail: 'Coursework in literature and finance',
      period: '',
    },
    {
      school: 'Harvard Business School',
      detail: 'HBX CORe, business analytics and economics',
      period: '',
    },
  ],
};

export type Resume = typeof resume;
