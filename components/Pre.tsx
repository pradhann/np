'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useRef, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

export default function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={copied ? 'Copied' : 'Copy code'}
        onClick={copy}
        className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-canvas text-ink-muted opacity-0 transition-opacity hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
      </button>
      <pre ref={ref} {...props}>
        {children}
      </pre>
    </div>
  );
}
