import '@/css/tailwind.css';
import 'katex/dist/katex.min.css';

import type { Metadata, Viewport } from 'next';

import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeProvider from '@/components/Providers/ThemeProvider';
import { siteMetadata } from '@/data/siteMetadata';

import { fontVariables } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: `${siteMetadata.name} · ${siteMetadata.role}`,
    template: `%s · ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.name, url: siteMetadata.siteUrl }],
  creator: siteMetadata.name,
  openGraph: {
    type: 'website',
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.name,
    title: `${siteMetadata.name} · ${siteMetadata.role}`,
    description: siteMetadata.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteMetadata.name} · ${siteMetadata.role}`,
    description: siteMetadata.description,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteMetadata.themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: siteMetadata.themeColor.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
