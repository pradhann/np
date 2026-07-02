const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'serif'],
        serif: ['var(--font-display)', 'Georgia', 'Cambria', 'serif'],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      maxWidth: {
        prose: '40rem',
        reading: '44rem',
        shell: '62rem',
      },
      fontSize: {
        display: ['clamp(2.6rem, 6vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        title: ['clamp(2rem, 3.6vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--ink))',
            '--tw-prose-headings': 'rgb(var(--ink))',
            '--tw-prose-lead': 'rgb(var(--ink-muted))',
            '--tw-prose-links': 'rgb(var(--accent))',
            '--tw-prose-bold': 'rgb(var(--ink))',
            '--tw-prose-counters': 'rgb(var(--ink-faint))',
            '--tw-prose-bullets': 'rgb(var(--ink-faint))',
            '--tw-prose-hr': 'rgb(var(--border))',
            '--tw-prose-quotes': 'rgb(var(--ink-muted))',
            '--tw-prose-quote-borders': 'rgb(var(--accent))',
            '--tw-prose-captions': 'rgb(var(--ink-faint))',
            '--tw-prose-code': 'rgb(var(--ink))',
            '--tw-prose-pre-code': 'rgb(var(--ink))',
            '--tw-prose-pre-bg': 'rgb(var(--code-bg))',
            '--tw-prose-th-borders': 'rgb(var(--border))',
            '--tw-prose-td-borders': 'rgb(var(--border))',
            maxWidth: 'none',
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            h1: { fontFamily: 'var(--font-display)', fontWeight: '500' },
            h2: {
              fontFamily: 'var(--font-display)',
              fontWeight: '500',
              letterSpacing: '-0.01em',
              marginTop: '2.4em',
              fontSize: '1.6em',
            },
            h3: { fontFamily: 'var(--font-display)', fontWeight: '500', marginTop: '2em' },
            h4: { fontFamily: 'var(--font-display)', fontWeight: '600' },
            a: { fontWeight: '400', textUnderlineOffset: '3px' },
            blockquote: {
              fontFamily: 'var(--font-display)',
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '1.125em',
              lineHeight: '1.6',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            code: { fontWeight: '400' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
