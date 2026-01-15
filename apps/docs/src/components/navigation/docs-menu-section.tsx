'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible'
import { Heading4 } from '@repo/ui/components/typography'
import { swClsx } from '@repo/ui/utils/clsx'
import { capitalizeFirstLetter } from '@repo/utils/string'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface DocsMenuSectionProps {
  title: React.ReactNode
  contentPaths: string[][]
}

export function DocsMenuSection({ title, contentPaths }: DocsMenuSectionProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="px-sw-sm">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between">
        <Heading4>{title}</Heading4>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="pt-sw-2xs pb-sw-sm gap-sw-3xs flex flex-col">
          {contentPaths.map((contentPath) => {
            const href = `/docs/${contentPath.join('/')}`
            const content = contentPath[contentPath.length - 1]

            return (
              <Link href={href} key={href}>
                <li
                  className={swClsx(
                    'text-base-600 px-sw-xs py-sw-2xs rounded-input-sm font-medium',
                    pathname === href
                      ? 'bg-cta1 text-base-100 font-semibold'
                      : 'hover:text-base-700 hover:bg-base-200',
                  )}
                >
                  {capitalizeFirstLetter(content || '')}
                </li>
              </Link>
            )
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
