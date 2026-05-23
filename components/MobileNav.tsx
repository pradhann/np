'use client';

import clsx from 'classnames';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX } from 'react-icons/fi';

import { navLinks } from '@/data/navLinks';

import Link from './Link';

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const drawer = open ? (
    <div className="fixed inset-0 z-50 flex flex-col bg-canvas">
      <div className="flex h-16 items-center justify-between px-6">
        <span className="font-display text-lg">Nripesh Pradhan</span>
        <button
          type="button"
          aria-label="Close menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:text-ink"
          onClick={() => setOpen(false)}
        >
          <FiX size={20} />
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-6 pt-8">
        {navLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                'border-b border-border py-4 font-display text-2xl transition-colors',
                active ? 'text-accent' : 'text-ink hover:text-accent'
              )}
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
    </div>
  ) : null;

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
        onClick={() => setOpen(true)}
      >
        <FiMenu size={19} />
      </button>
      {mounted && drawer ? createPortal(drawer, document.body) : null}
    </div>
  );
}
