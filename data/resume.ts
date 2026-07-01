export const resume = {
  role: 'Head of Risk Intelligence & Automations',
  company: 'Chipper Cash',
  location: 'San Francisco Bay Area',
  summary:
    'Systems engineer with 7+ years designing and shipping production ML systems, real-time scoring services, and data infrastructure for financial applications. I built the quantitative and data stack from scratch for a 10M+ user financial platform across 7+ global markets: classification models, anomaly detection, signal-processing pipelines, and real-time decision engines.',

  metrics: [
    { value: '7+', unit: 'years', label: 'building production ML and data systems' },
    { value: '10M+', unit: 'users', label: 'served by systems I designed and shipped' },
    { value: '$1.4M+', unit: '/ year', label: 'saved by one real-time ML scoring model' },
    { value: '6,000+', unit: '/ day', label: 'fraudulent signups blocked in production' },
  ],

  impact: [
    {
      title: 'Shipped an LLM decision system with real evals',
      detail:
        'A two-model pipeline (GPT-3.5 extraction, GPT-4 decision tree) that adjudicates watchlist screening alerts. Evaluated against a double-blind golden dataset, then run over a 148K-alert backlog at four cents a decision.',
      caseStudy: 'screengpt-the-system',
    },
    {
      title: 'Built real-time ML scoring services',
      detail:
        'A CatBoost model that scores every new user within an hour of signup, blocking 6,000+ fraudulent referrals a day, and a card-deposit scoring service that runs velocity and rolling-aggregate features at sub-5s latency.',
      caseStudy: 'catching-fraud-that-looked-like-growth',
    },
    {
      title: 'Automated a fraud desk with LLMs',
      detail:
        'An autonomous pipeline that ingests unstructured partner reports, applies LLM extraction and identity resolution, and executes account actions in under 20 seconds, down from 30 minutes of manual work. Runs 24/7.',
      caseStudy: 'automating-the-fraud-desk',
    },
    {
      title: 'Rebuilt the data platform',
      detail:
        'Led company-wide dbt adoption, designed the canonical financial data models 15+ engineers build on, replaced a managed runtime with a self-hosted one, and shipped the monitoring that catches silent failures.',
      caseStudy: 'replacing-dbt-cloud',
    },
  ],

  experience: [
    {
      role: 'Head of Risk Intelligence & Automations',
      company: 'Chipper Cash',
      period: 'Oct 2025 - Present',
      summary:
        'Lead a quantitative engineering team building ML systems, real-time pipelines, and automated decision engines across 7+ global markets.',
      bullets: [
        'Led a multi-year systems strategy replacing third-party vendor platforms with purpose-built quantitative systems, cutting $500K+ a year in costs and reducing end-to-end decision latency by over 80%.',
        'Designed and built a high-throughput processing platform from scratch in Python and PostgreSQL, orchestrating 53,000+ events, 20,000+ investigation workflows, and 900+ automated filings across 8 currencies with deterministic audit trails.',
        'Architected a real-time signal-detection pipeline evaluating millions of financial transactions against 20+ configurable statistical rule sets, surfacing 2,000+ actionable signals daily at sub-5-minute latency.',
        'Built a dual-model NLP system for entity resolution and probabilistic match scoring across millions of records, achieving 85% precision and 95% recall against custom-curated international datasets.',
        'Engineered an autonomous pipeline that ingests unstructured reports via API, applies LLM-based extraction and identity resolution, and executes automated actions in under 20 seconds, down from 30 minutes.',
      ],
      tags: ['ML systems', 'LLM engineering', 'Team leadership'],
      caseStudy: 'screengpt-the-system',
    },
    {
      role: 'Tech Lead, Risk & Growth',
      company: 'Chipper Cash',
      period: 'Jan 2022 - Oct 2025',
      summary:
        'Promoted to Staff. Designed and shipped ML-powered scoring systems and production services handling real-time financial data.',
      bullets: [
        'Designed and deployed a real-time ML scoring model combining IP geolocation, behavioral timing, device fingerprinting, and identity-graph signals. Blocked 6,000+ bad actors a day, saving $1.4M+ a year.',
        'Built a real-time ML scoring service for every card deposit, combining velocity features, rolling statistical aggregates, and behavioral signals at sub-5s latency. Intercepts $20K+ a day in losses.',
        'Deployed a real-time NLP classification service that parses unstructured transaction data, extracting merchant identity, category, and metadata with sub-second latency at production scale.',
        'Reduced account-takeover events from 30+ a day to under 10 a quarter with a multi-signal authentication system combining biometric verification, device reputation scoring, and behavioral anomaly detection.',
        'Automated a dispute engine applying rule-based qualification, generating structured evidence packages, and submitting via processor API. Recovered $100K+ in disputed funds.',
      ],
      tags: ['Real-time ML', 'Production services', 'Fraud detection'],
      caseStudy: 'catching-fraud-that-looked-like-growth',
    },
    {
      role: 'Senior Data Scientist',
      company: 'Chipper Cash',
      period: 'Feb 2021 - Jan 2022',
      summary:
        'Built core financial data infrastructure, statistical analysis frameworks, and production monitoring systems.',
      bullets: [
        'Led company-wide dbt adoption and designed the foundational financial data models powering all analytics, dashboards, and internal tools. Established SQL standards and code review across a 15+ person engineering team.',
        'Conducted quantitative investigations that shaped policy: surfaced referral-abuse patterns during a 50K-a-day user spike, analyzed loss distributions by typology, and identified anomalous return rates that led to new automated controls.',
        'Built a self-service experimentation platform enabling targeted launches reaching 900K+ users, and production alerting monitoring transaction rates across all payment providers in real time.',
      ],
      tags: ['Data platform', 'dbt', 'Experimentation'],
      caseStudy: 'replacing-dbt-cloud',
    },
    {
      role: 'Senior Consultant, Data Science',
      company: 'Logic (acquired by Accenture)',
      period: 'Oct 2018 - Feb 2021',
      summary: 'Client-facing quantitative consulting for Fortune 500 retail.',
      bullets: [
        'Delivered predictive modeling and quantitative analytics for Best Buy and Kendra Scott, leading engagements end to end: demand forecasting, inventory optimization, and pricing strategy, presented to senior leadership.',
      ],
      tags: ['Consulting', 'Forecasting'],
    },
  ],

  systems: [
    {
      category: 'Real-time ML & scoring',
      items: [
        {
          name: 'User Onboarding Score',
          detail: 'CatBoost; IP, device, and identity-graph signals; 6,000+ blocks a day',
          caseStudy: 'catching-fraud-that-looked-like-growth',
        },
        {
          name: 'Card-Deposit Scoring Service',
          detail: 'velocity and rolling aggregates at sub-5s latency',
          caseStudy: '',
        },
        {
          name: 'Account-Takeover Defense',
          detail: 'multi-signal authentication; 30+ a day to under 10 a quarter',
          caseStudy: '',
        },
        {
          name: 'Merchant Parsing Service',
          detail: 'NLP classification of raw transaction strings, sub-second',
          caseStudy: '',
        },
      ],
    },
    {
      category: 'LLM systems',
      items: [
        {
          name: 'Watchlist Decision Support',
          detail: 'two-model LLM pipeline with golden-dataset evals',
          caseStudy: 'screengpt-the-system',
        },
        {
          name: 'Fraud-Desk Automation',
          detail: 'LLM extraction and identity resolution; 30 minutes to 20 seconds',
          caseStudy: 'automating-the-fraud-desk',
        },
        {
          name: 'LLM Monitoring Framework',
          detail: 'six standardized signal types from one YAML config',
          caseStudy: '',
        },
      ],
    },
    {
      category: 'Data platform',
      items: [
        {
          name: 'dbt Models',
          detail: 'the canonical financial models every downstream system is built on',
          caseStudy: 'replacing-dbt-cloud',
        },
        {
          name: 'Transaction Signal Engine',
          detail: '20+ statistical rule sets; 2,000+ signals a day at sub-5-minute latency',
          caseStudy: 'standardizing-detection-rules',
        },
        {
          name: 'Data Monitoring System',
          detail: 'config-driven checks with auto-segmented root cause',
          caseStudy: '',
        },
      ],
    },
    {
      category: 'Platforms & growth',
      items: [
        {
          name: 'Case Processing Platform',
          detail: '53K+ events and 900+ automated filings with deterministic audit trails',
          caseStudy: 'replacing-a-compliance-vendor',
        },
        {
          name: 'Campaign Delivery Engine',
          detail: 'Python + Dask; 900K users per run',
          caseStudy: '',
        },
        {
          name: 'Risk-Aware Payout Pipeline',
          detail: 're-checks risk flags at the moment money moves',
          caseStudy: '',
        },
      ],
    },
  ],

  skills: [
    { group: 'Languages', items: ['Python', 'SQL', 'TypeScript'] },
    { group: 'ML / AI', items: ['LLMs', 'OpenAI API', 'CatBoost', 'scikit-learn', 'NLP'] },
    {
      group: 'Data systems',
      items: ['dbt', 'Snowflake', 'PostgreSQL', 'Airflow', 'Pandas', 'NumPy'],
    },
    {
      group: 'Infrastructure',
      items: ['Docker', 'GCP', 'AWS', 'Flask', 'Neo4j', 'Pinecone', 'Datadog'],
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
