import { Heading3 } from '@repo/ui/components/typography'
import Image from 'next/image'
import { ThemeMenu } from './theme-menu'
import { ToggleAnimation } from './toggle-animation'

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-b-base-200 bg-background">
      <div className="mx-auto flex h-full max-w-400 items-center justify-between px-sw-2xs">
        <div className="flex items-center gap-sw-2xs py-sw-sm">
          <Image src="/logos/symbol.svg" alt="logo" width={32} height={32} />
          <Heading3>Design System</Heading3>
        </div>
        <div className="flex items-center gap-sw-3xs">
          <ToggleAnimation />
          <ThemeMenu />
        </div>
      </div>
    </header>
  )
}
