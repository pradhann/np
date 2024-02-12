const siteMetadata = {
  title: 'Nripesh Pradhan',
  author: 'Nripesh Pradhan',
  headerTitle: 'nripeshpradhan',
  description: 'ML Engineer @ChipperCash',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: '',
  siteRepo: '',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  email: '',
  github: ' ',
  twitter: '',
  facebook: ' ',
  linkedin: ' ',
  spotify: ' ',
  steam: ' ',
  locale: 'en-US',
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
};

module.exports = siteMetadata;
