import NextLink from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Link({ href, children, ...rest }: LinkProps) {
  if (href.startsWith('/')) {
    return (
      <NextLink href={href} {...rest}>
        {children}
      </NextLink>
    );
  }
  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
