import clsx from 'classnames';
import NextImage, { type ImageProps } from 'next/image';

export default function Image({ className, alt, ...rest }: ImageProps) {
  return (
    <NextImage alt={alt} className={clsx('rounded-lg border border-border', className)} {...rest} />
  );
}
