import createMDX from '@next/mdx'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  pageExtensions: ['ts', 'tsx', 'mdx'],
  turbopack: {
    rules: {
      './src/contents/**/*.tsx': {
        loaders: [path.join(__dirname, 'plugins/conditional-raw-loader.js')],
      },
    },
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      path.join(__dirname, 'plugins/remark-extract-headings.js'),
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
