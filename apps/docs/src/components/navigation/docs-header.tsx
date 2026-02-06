import { Heading3 } from '@repo/ui/components/typography'
import Image from 'next/image'
import { ThemeMenu } from './theme-menu'
import { ToggleAnimation } from './toggle-animation'

export function DocsHeader() {
  return (
    <header className="border-b-base-200 bg-background sticky top-0 z-10 h-16 border-b">
      <div className="px-sw-2xs mx-auto flex h-full max-w-400 items-center justify-between">
        <div className="gap-sw-2xs py-sw-sm flex items-center">
          <Image src="/logos/symbol.svg" alt="logo" width={32} height={32} />
          <Heading3>Design System</Heading3>
        </div>
        <div className="gap-sw-3xs flex items-center">
          <ToggleAnimation />
          <ThemeMenu />
        </div>
      </div>
    </header>
  )
}
