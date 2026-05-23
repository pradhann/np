'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {mounted ? (
        isDark ? (
          <FiSun size={17} />
        ) : (
          <FiMoon size={16} />
        )
      ) : (
        <span className="block h-4 w-4" />
      )}
    </button>
  );
}
