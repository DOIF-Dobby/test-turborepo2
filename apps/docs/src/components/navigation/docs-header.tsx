import { Heading4 } from '@repo/ui/components/typography'
import { ToggleAnimation } from './toggle-animation'

export function DocsHeader() {
  return (
    <header className="border-b-base-200 bg-background sticky top-0 z-10 h-16 border-b">
      <div className="px-sone-md flex h-full items-center justify-between">
        <Heading4>탑 네비게이션</Heading4>
        <ToggleAnimation />
      </div>
    </header>
  )
}
