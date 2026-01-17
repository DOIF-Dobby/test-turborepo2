'use client'

import { useScrollSpy } from '@repo/hooks/use-scroll-spy'
import { swClsx } from '@repo/ui/utils/clsx'

const paddingMap: Record<number, string> = {
  2: 'pl-0',
  3: 'pl-4',
  4: 'pl-8',
  5: 'pl-12',
}

type HeadingType = {
  depth: number
  text: string
  id: string
}

interface DocsTocProps {
  headings: HeadingType[]
}

export function DocsToc({ headings }: DocsTocProps) {
  const activeId = useScrollSpy(headings.map((h) => h.id))

  return (
    <nav>
      <div className="sticky top-24 mx-6 my-6 xl:mx-2 xl:my-0 xl:mt-32 xl:w-[130px]">
        {headings.map((heading) => {
          const isActive = activeId === heading.id

          return (
            <div key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={swClsx([
                  `${paddingMap[heading.depth] ?? ''}`,
                  'text-base-600 hover:text-base-700',
                  isActive && 'text-base-700 font-bold',
                ])}
              >
                {heading.text}
              </a>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
