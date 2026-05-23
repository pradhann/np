export const siteMetadata = {
  name: 'Nripesh Pradhan',
  title: 'Nripesh Pradhan',
  /** Used for meta description / Open Graph. */
  description:
    'Nripesh Pradhan builds intelligence and automation systems for fintech: fraud, risk, and money movement at scale. Engineering leader, systems builder, and writer.',
  /** Short positioning line used in the header and hero. */
  role: 'Builds intelligence & automation systems for fintech',
  siteUrl: 'https://nripeshpradhan.com',
  siteRepo: 'https://github.com/pradhann/np',
  locale: 'en-US',
  language: 'en-us',
  email: 'nripeshpradhan@gmail.com',
  github: 'https://github.com/pradhann',
  githubHandle: 'pradhann',
  linkedin: 'https://www.linkedin.com/in/npradhann/',
  linkedinHandle: 'npradhann',
  location: 'San Francisco Bay Area',
  resumePdf: '/resume.pdf',
  themeColor: { light: '#faf8f4', dark: '#141310' },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID ?? '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? '',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
    },
  },
};

export type SiteMetadata = typeof siteMetadata;
