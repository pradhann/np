import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/data/siteMetadata';
import { getAllTags, publishedPosts, publishedWork } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = siteMetadata;
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = ['', '/work', '/writing', '/resume', '/about', '/contact', '/tags'].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: today,
    })
  );

  const workRoutes = publishedWork.map((item) => ({
    url: `${siteUrl}/work/${item.slug}`,
    lastModified: item.date,
  }));

  const postRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: post.lastmod ?? post.date,
  }));

  const tagRoutes = Object.keys(getAllTags()).map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: today,
  }));

  return [...staticRoutes, ...workRoutes, ...postRoutes, ...tagRoutes];
}
