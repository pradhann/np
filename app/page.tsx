import CaseStudyCard from '@/components/CaseStudyCard';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import PostCard from '@/components/PostCard';
import SectionHeading from '@/components/SectionHeading';
import { featuredWork, publishedPosts } from '@/lib/posts';

const stats = [
  { value: '7+ years', label: 'building production ML and data systems' },
  { value: '10M+ users', label: 'served across seven markets' },
  { value: '$1.4M+ / yr', label: 'retired in third-party vendor costs' },
];

export default function HomePage() {
  const work = featuredWork.slice(0, 3);
  const posts = publishedPosts.slice(0, 3);

  return (
    <>
      <Container className="py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">Engineer &amp; systems builder · San Francisco</p>
          <h1 className="mt-6 font-display text-display font-medium text-ink">
            I build the intelligence and automation that fintech runs on.
          </h1>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink-muted">
            For seven years I&rsquo;ve designed and shipped production ML systems, data platforms,
            and risk infrastructure at Chipper Cash, a fintech serving 10M+ people across seven
            African markets. I&rsquo;m currently Head of Risk Intelligence &amp; Automations there,
            and I write about systems, risk, and the books I cannot stop turning over.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="/work">See the work</LinkButton>
            <LinkButton href="/resume" variant="outline">
              Resume
            </LinkButton>
          </div>
        </div>
      </Container>

      <Container>
        <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="bg-canvas px-6 py-7">
              <dt className="font-display text-2xl text-ink">{stat.value}</dt>
              <dd className="mt-1 text-sm text-ink-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pt-24">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems I’ve designed and shipped"
          link={work.length ? { href: '/work', label: 'All work' } : undefined}
        />
        {work.length ? (
          <div className="divide-y divide-border">
            {work.map((item) => (
              <CaseStudyCard key={item.slug} work={item} />
            ))}
          </div>
        ) : (
          <div className="pt-8">
            <EmptyState title="Case studies are being written.">
              Detailed write-ups of what I&rsquo;ve built are on the way. In the meantime, the{' '}
              <Link href="/resume" className="text-accent underline">
                resume
              </Link>{' '}
              has the short version.
            </EmptyState>
          </div>
        )}
      </Container>

      <Container className="pt-24">
        <SectionHeading
          eyebrow="Writing"
          title="Recent essays"
          link={posts.length ? { href: '/writing', label: 'All writing' } : undefined}
        />
        {posts.length ? (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="pt-8">
            <EmptyState title="Essays are in the works.">
              I&rsquo;m writing a series on the systems behind modern fintech: fraud, risk, and
              money movement. Check back soon.
            </EmptyState>
          </div>
        )}
      </Container>

      <Container className="pt-24">
        <div className="rounded-2xl border border-border bg-surface px-8 py-14 text-center sm:px-14">
          <h2 className="font-display text-2xl font-medium text-ink">Building something hard?</h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-muted">
            I&rsquo;m always glad to talk about fintech, risk systems, and turning messy problems
            into reliable software.
          </p>
          <div className="mt-7 flex justify-center">
            <LinkButton href="/contact">Get in touch</LinkButton>
          </div>
        </div>
      </Container>
    </>
  );
}
