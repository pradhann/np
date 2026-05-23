import clsx from 'classnames';
import type { ReactNode } from 'react';

export default function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx('prose', className)}>{children}</div>;
}
