'use client';

import clsx from 'classnames';
import { usePathname } from 'next/navigation';

import { navLinks } from '@/data/navLinks';

import Container from './Container';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-canvas/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          Nripesh Pradhan
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center sm:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'rounded-full px-3 py-1.5 text-sm transition-colors',
                    active ? 'text-accent' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
          <span className="mx-1 hidden h-4 w-px bg-border sm:block" />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
