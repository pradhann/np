import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import PostCard from '@/components/PostCard';
import { getAllTags, getPostsByTag } from '@/lib/posts';

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return Object.keys(getAllTags()).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Tag · ${tag}`, description: `Writing tagged “${tag}”.` };
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Tag"
        title={tag}
        intro={`${posts.length} ${posts.length === 1 ? 'essay' : 'essays'} on this topic.`}
      />
      <div className="mt-4 divide-y divide-border">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Container>
  );
}
