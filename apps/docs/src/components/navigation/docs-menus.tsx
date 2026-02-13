'use client'

import { ScrollArea } from '@repo/ui/components/scroll-area'
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

  const handbook = useMemo(() => {
    return contentPathArrays.filter(
      (contentPath) => contentPath[0] === 'handbook',
    )
  }, [contentPathArrays])

  const components = useMemo(() => {
    return contentPathArrays.filter(
      (contentPath) => contentPath[0] === 'components',
    )
  }, [contentPathArrays])

  return (
    <aside className="border-r-base-200 bg-background pt-sw-md sticky top-16 z-10 max-h-[calc(100dvh-4rem)] min-h-[calc(100dvh-4rem)] min-w-3xs border-r">
      <ScrollArea className="h-full">
        <div className="gap-sw-xs flex flex-col">
          <DocsMenuSection title="Guides" contentPaths={guides} />
          <DocsMenuSection title="Handbook" contentPaths={handbook} />
          <DocsMenuSection title="Components" contentPaths={components} />
        </div>
      </ScrollArea>
    </aside>
  )
}
