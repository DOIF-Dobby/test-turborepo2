'use client'

import { ScrollArea } from '@repo/ui/components2/scroll-area'
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

  const components2 = useMemo(() => {
    return contentPathArrays.filter(
      (contentPath) => contentPath[0] === 'components2',
    )
  }, [contentPathArrays])

  return (
    <aside className="border-r-base-200 bg-background pt-sw-md sticky top-16 z-10 max-h-[calc(100dvh-4rem)] min-h-[calc(100dvh-4rem)] min-w-3xs border-r">
      <ScrollArea className="h-full">
        <div className="gap-sw-xs flex flex-col">
          <DocsMenuSection title="Guides" contentPaths={guides} />
          <DocsMenuSection title="Components" contentPaths={components} />
          <DocsMenuSection title="Components2" contentPaths={components2} />
        </div>
      </ScrollArea>
    </aside>
  )
}
