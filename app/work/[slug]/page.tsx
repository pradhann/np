import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Link from '@/components/Link';
import Mdx from '@/components/Mdx';
import PostLayout from '@/components/layouts/MDX/PostLayout';
import { getWork, publishedWork } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedWork.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, type: 'article' },
  };
}

export default async function WorkCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <PostLayout
      eyebrow={[item.company, item.period].filter(Boolean).join(' · ') || 'Work'}
      title={item.title}
      summary={item.summary}
      meta={item.stack.length > 0 ? <span>{item.stack.join(' · ')}</span> : null}
      footer={
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            All case studies
          </Link>
        </div>
      }
    >
      <Mdx code={item.mdxCode} />
    </PostLayout>
  );
}
