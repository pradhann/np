'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

let counter = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const idRef = useRef(`mermaid-${(counter += 1)}`);

  useEffect(() => {
    let active = true;
    setFailed(false);

    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
          fontFamily: 'var(--font-sans), sans-serif',
        });
        const { svg } = await mermaid.render(idRef.current, chart.trim());
        if (active) setSvg(svg);
      } catch {
        if (active) setFailed(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [chart, resolvedTheme]);

  if (failed) {
    return <pre className="mermaid-diagram text-sm text-ink-muted">{chart.trim()}</pre>;
  }
  if (!svg) {
    return <div className="mermaid-diagram min-h-[6rem] animate-pulse" aria-hidden />;
  }
  return <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
