import { allPosts, allWorks, type Post, type Work } from 'content-collections';

export type { Post, Work };

function byDateDesc(a: { date: string }, b: { date: string }) {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const publishedPosts: Post[] = allPosts.filter((p) => !p.draft).sort(byDateDesc);

export const publishedWork: Work[] = allWorks
  .filter((w) => !w.draft)
  .sort((a, b) => a.order - b.order || byDateDesc(a, b));

export const featuredWork: Work[] = publishedWork.filter((w) => w.featured);

export function getPost(slug: string): Post | undefined {
  return publishedPosts.find((p) => p.slug === slug);
}

export function getWork(slug: string): Work | undefined {
  return publishedWork.find((w) => w.slug === slug);
}

/** Map of slugified tag -> count, across published posts. */
export function getAllTags(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const post of publishedPosts) {
    for (const tag of post.tags) {
      const key = slugifyTag(tag);
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  return counts;
}

export function getPostsByTag(tag: string): Post[] {
  return publishedPosts.filter((p) => p.tags.some((t) => slugifyTag(t) === tag));
}

/** Original display casing for each slugified tag (first occurrence wins). */
export function getTagDisplayNames(): Record<string, string> {
  const names: Record<string, string> = {};
  for (const post of publishedPosts) {
    for (const tag of post.tags) {
      names[slugifyTag(tag)] ??= tag;
    }
  }
  return names;
}

/** Adjacent posts for prev/next navigation. */
export function getAdjacentPosts(slug: string): {
  prev?: Post;
  next?: Post;
} {
  const index = publishedPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    next: publishedPosts[index - 1],
    prev: publishedPosts[index + 1],
  };
}

/** Adjacent case studies, following the curated /work order. */
export function getAdjacentWork(slug: string): {
  prev?: Work;
  next?: Work;
} {
  const index = publishedWork.findIndex((w) => w.slug === slug);
  if (index === -1) return {};
  return {
    prev: publishedWork[index - 1],
    next: publishedWork[index + 1],
  };
}
