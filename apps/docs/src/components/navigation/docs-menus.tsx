'use client'

import { Heading3 } from '@repo/ui/components/typography'
import Image from 'next/image'
import { useMemo } from 'react'
import { DocsMenuSection } from './docs-menu-section'

interface DocsMenusProps {
  contentPathArrays: string[][]
}

export function DocsMenus({ contentPathArrays }: DocsMenusProps) {
  const guides = useMemo(() => {
    return contentPathArrays.filter(
      (contentPath) => contentPath[0] === 'guides',
    )
  }, [contentPathArrays])

  const components = useMemo(() => {
    return contentPathArrays.filter(
      (contentPath) => contentPath[0] === 'components',
    )
  }, [contentPathArrays])

  return (
    <aside className="border-r-base-200 bg-background pt-sw-md sticky top-0 z-10 h-full min-h-dvh min-w-3xs border-r">
      <div className="gap-sw-md flex flex-col">
        <div className="gap-sw-2xs py-sw-sm px-sw-2xs flex items-center">
          <Image src="/logos/symbol.svg" alt="logo" width={40} height={40} />
          <Heading3>Design System</Heading3>
        </div>
        <div className="gap-sw-xs flex flex-col">
          <DocsMenuSection title="Guides" contentPaths={guides} />
          <DocsMenuSection title="Components" contentPaths={components} />
        </div>
      </div>
    </aside>
  )
}
