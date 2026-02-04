import type { ScrollBarProps } from '@repo/ui/components2/scroll-area'
import { swClsx } from '@repo/ui/utils/clsx'

interface ScrollExampleItemsProps {
  orientation?: ScrollBarProps['orientation']
}

export function ScrollExampleItems({
  orientation = 'vertical',
}: ScrollExampleItemsProps) {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  )

  return (
    <div
      className={swClsx(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
      )}
    >
      {tags.map((tag) => (
        <div key={tag}>{tag}</div>
      ))}
    </div>
  )
}
