import createMDX from '@next/mdx'
import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      path.join(__dirname, 'remark-extract-headings.mjs'),
      'remark-gfm',
      'remark-frontmatter',
      'remark-mdx-frontmatter',
      [
        'remark-mdx-frontmatter',
        {
          name: 'frontmatter',
        },
      ],
    ],
    rehypePlugins: [
      'rehype-pretty-code',
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'prepend', // prepend | append
          properties: { className: ['markdown-anchor'] },
          content: { type: 'text', value: '#' },
          test: ['h2', 'h3', 'h4', 'h5'],
        },
      ],
    ],
  },
})

const config = withMDX(nextConfig)

export default config
