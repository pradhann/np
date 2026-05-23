import clsx from 'classnames';
import type { ElementType, ReactNode } from 'react';

const widths = {
  default: 'max-w-shell',
  reading: 'max-w-reading',
  prose: 'max-w-prose',
};

export default function Container({
  children,
  size = 'default',
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  size?: keyof typeof widths;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={clsx('mx-auto w-full px-6 sm:px-8', widths[size], className)}>{children}</Tag>
  );
}
