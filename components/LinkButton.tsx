import clsx from 'classnames';
import type { ReactNode } from 'react';

import Link from './Link';

const variants = {
  primary: 'bg-accent text-canvas hover:bg-accent-hover',
  outline: 'border border-border text-ink hover:border-ink/40',
};

export default function LinkButton({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
