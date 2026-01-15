'use client'

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
    <aside className="border-r-base-200 bg-background pt-sone-md sticky top-0 z-10 h-full min-h-dvh min-w-3xs border-r">
      <DocsMenuSection title="Guides" contentPaths={guides} />
      <DocsMenuSection title="Components" contentPaths={components} />
    </aside>
  )
}
