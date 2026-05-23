import type { ComponentPropsWithoutRef } from 'react';

import Image from './Image';
import Link from './Link';
import Mermaid from './Mermaid';
import Pre from './Pre';

export const mdxComponents = {
  a: ({ href = '', ...rest }: ComponentPropsWithoutRef<'a'>) => <Link href={href} {...rest} />,
  pre: Pre,
  img: ({ alt, ...props }: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt ?? ''}
      loading="lazy"
      className="mx-auto rounded-lg border border-border"
    />
  ),
  Image,
  Mermaid,
  mermaid: Mermaid,
};
