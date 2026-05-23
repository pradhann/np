import type { Metadata } from 'next';

import CaseStudyCard from '@/components/CaseStudyCard';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import { publishedWork } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies of intelligence, automation, and risk systems designed and shipped for fintech at scale.',
};

export default function WorkPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Work"
        title="Selected case studies"
        intro="Case studies of systems I designed and shipped at Chipper Cash: the problem each one solved, the architecture behind it, and what changed once it was running in production."
      />
      {publishedWork.length ? (
        <div className="mt-4 divide-y divide-border">
          {publishedWork.map((item) => (
            <CaseStudyCard key={item.slug} work={item} />
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState title="Case studies are being written.">
            Detailed write-ups are in progress. The{' '}
            <Link href="/resume" className="text-accent underline">
              resume
            </Link>{' '}
            has the condensed version of what I&rsquo;ve built.
          </EmptyState>
        </div>
      )}
    </Container>
  );
}
