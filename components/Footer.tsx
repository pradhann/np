import { navLinks } from '@/data/navLinks';
import { siteMetadata } from '@/data/siteMetadata';

import Container from './Container';
import Link from './Link';

const elsewhere = [
  { title: 'GitHub', href: siteMetadata.github },
  { title: 'LinkedIn', href: siteMetadata.linkedin },
  { title: 'Email', href: `mailto:${siteMetadata.email}` },
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 sm:gap-8">
        <div className="max-w-sm">
          <p className="font-display text-lg text-ink">Nripesh Pradhan</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            I build production ML and LLM systems for fintech. Currently in the{' '}
            {siteMetadata.location}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:justify-items-end">
          <nav className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1">Index</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1">Elsewhere</p>
            {elsewhere.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
      <div className="border-t border-border/70">
        <Container className="flex items-center justify-between py-6">
          <p className="text-xs text-ink-faint">© {new Date().getFullYear()} Nripesh Pradhan</p>
          <Link
            href={siteMetadata.siteRepo}
            className="font-mono text-xs text-ink-faint transition-colors hover:text-accent"
          >
            Built &amp; written from scratch
          </Link>
        </Container>
      </div>
    </footer>
  );
}
