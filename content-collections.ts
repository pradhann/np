import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import GithubSlugger from 'github-slugger';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSmartypants from 'remark-smartypants';

export type TocItem = { value: string; url: string; depth: number };

/** Extract heading anchors from raw markdown, skipping fenced code blocks. */
function extractToc(raw: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  let inFence = false;
  for (const line of raw.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const value = match[2].replace(/[*_`]/g, '').trim();
    toc.push({ value, url: `#${slugger.slug(value)}`, depth: match[1].length });
  }
  return toc;
}

/** Rehype plugin: turn ```mermaid fences into <mermaid chart="..."> elements. */
function rehypeMermaid() {
  return (tree: any) => {
    const walk = (node: any, index: number | null, parent: any) => {
      if (
        parent &&
        index !== null &&
        node.tagName === 'pre' &&
        node.children?.[0]?.tagName === 'code'
      ) {
        const code = node.children[0];
        const cls = code.properties?.className;
        const classList = Array.isArray(cls) ? cls.join(' ') : String(cls ?? '');
        if (/\blanguage-mermaid\b/.test(classList)) {
          const chart = (code.children ?? []).map((c: any) => c.value ?? '').join('');
          parent.children[index] = {
            type: 'element',
            tagName: 'mermaid',
            properties: { chart },
            children: [],
          };
          return;
        }
      }
      (node.children ?? []).forEach((child: any, i: number) => walk(child, i, node));
    };
    walk(tree, null, null);
  };
}

const prettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  keepBackground: false,
  defaultLang: { block: 'plaintext', inline: 'plaintext' },
};

/** Curly quotes/apostrophes for frontmatter strings, which bypass remark. */
function smarten(s: string): string {
  return s
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/"([^"\n]*)"/g, '“$1”')
    .replace(/(^|[\s([{])'/g, '$1‘')
    .replace(/'/g, '’');
}

const mdxOptions: Parameters<typeof compileMDX>[2] = {
  // smartypants: curly quotes for a literary brand; dashes disabled (site bans em-dashes).
  // singleDollarTextMath disabled so literal dollar amounts ($6,000) are not parsed as inline math.
  remarkPlugins: [
    remarkGfm,
    [remarkSmartypants, { dashes: false }],
    [remarkMath, { singleDollarTextMath: false }],
  ],
  rehypePlugins: [
    rehypeMermaid,
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeKatex,
    [rehypePrettyCode, prettyCodeOptions],
  ],
};

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lastmod: z.string().optional(),
    images: z.array(z.string()).optional(),
    canonicalUrl: z.string().optional(),
    series: z.string().optional(),
  }),
  transform: async (doc, ctx) => {
    const mdxCode = await compileMDX(ctx, doc, mdxOptions);
    return {
      ...doc,
      title: smarten(doc.title),
      summary: doc.summary ? smarten(doc.summary) : doc.summary,
      mdxCode,
      slug: doc._meta.path,
      readingTime: readingTime(doc.content).text,
      toc: extractToc(doc.content),
    };
  },
});

const work = defineCollection({
  name: 'work',
  directory: 'content/work',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
    role: z.string().optional(),
    company: z.string().optional(),
    period: z.string().optional(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
  transform: async (doc, ctx) => {
    const mdxCode = await compileMDX(ctx, doc, mdxOptions);
    return {
      ...doc,
      title: smarten(doc.title),
      summary: smarten(doc.summary),
      mdxCode,
      slug: doc._meta.path,
      readingTime: readingTime(doc.content).text,
      toc: extractToc(doc.content),
    };
  },
});

export default defineConfig({
  collections: [posts, work],
});
