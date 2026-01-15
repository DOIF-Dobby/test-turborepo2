import { swClsx } from '@repo/ui/utils/clsx'

export function DocumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <article
      className={swClsx([
        'prose prose-headings:mt-12 prose-headings:mb-4 prose-headings:font-semibold prose-headings:flex prose-headings:items-center prose-headings:gap-1.5',
        'prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg',
        'prose-h2:scroll-mt-20 prose-h3:scroll-mt-20 prose-h4:scroll-mt-20 prose-h5:scroll-mt-20',
        'max-w-5xl',
        'prose-headings:text-base-content',
        'prose-p:text-base-content',
      ])}
    >
      {children}
    </article>
  )
}
