'use client'

import { Collapsible } from '@repo/ui/components/collapsible'
import { Heading4 } from '@repo/ui/components/typography'
import { swClsx } from '@repo/ui/utils/clsx'
import { pascalCase } from '@repo/utils/string'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DocsMenuSectionProps {
  title: React.ReactNode
  contentPaths: string[][]
}

export function DocsMenuSection({ title, contentPaths }: DocsMenuSectionProps) {
  const pathname = usePathname()

  return (
    <Collapsible defaultOpen className="px-sw-sm">
      <Collapsible.Trigger
        nativeButton={false}
        className="flex w-full cursor-pointer items-center justify-between"
        render={(trigerProps, state) => {
          return (
            <div {...trigerProps}>
              <Heading4 className="text-base-600">{title}</Heading4>
              <ChevronRight
                size={20}
                className={swClsx(
                  'stroke-base-600',
                  'transition-transform duration-300 ease-in-out',
                  state.open ? 'rotate-90' : '',
                )}
              />
            </div>
          )
        }}
      />
      <Collapsible.Panel>
        <ul className="pt-sw-2xs pb-sw-sm">
          {contentPaths.map((contentPath) => {
            const href = `/docs/${contentPath.join('/')}`
            const content = contentPath[contentPath.length - 1]

            return (
              <Link href={href} key={href}>
                <li
                  className={swClsx(
                    'text-base-600 px-sw-xs py-sw-2xs rounded-input-sm',
                    pathname === href
                      ? 'text-cta1 font-semibold'
                      : 'hover:text-base-700 hover:bg-base-200',
                  )}
                >
                  {pascalCase(content || '')}
                </li>
              </Link>
            )
          })}
        </ul>
      </Collapsible.Panel>
    </Collapsible>
  )
}
