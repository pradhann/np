import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Mdx from '@/components/Mdx';
import PostLayout from '@/components/layouts/MDX/PostLayout';
import PostNavigation from '@/components/PostNavigation';
import { formatDate } from '@/lib/dates';
import { getAdjacentPosts, getPost, publishedPosts } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function WritingPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <PostLayout
      eyebrow="Writing"
      title={post.title}
      summary={post.summary}
      meta={
        <>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{post.tags.join(', ')}</span>
            </>
          )}
        </>
      }
      footer={<PostNavigation prev={prev} next={next} />}
    >
      <Mdx code={post.mdxCode} />
    </PostLayout>
  );
}
