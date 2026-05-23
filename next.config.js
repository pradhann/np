const { withContentCollections } = require('@content-collections/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  eslint: {
    dirs: ['app', 'components', 'lib', 'scripts'],
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/blog/:slug*', destination: '/writing/:slug*', permanent: true },
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/cv', destination: '/resume', permanent: true },
    ];
  },
};

module.exports = withContentCollections(nextConfig);
