import { ScrollArea } from '@repo/ui/components/scroll-area'
import { ScrollExampleItems } from './scroll-example-items'

export default function ScrollType() {
  const className = 'h-[200px] w-[200px] border p-4'

  return (
    <div className="gap-sw-md flex">
      <div>
        <div>hover</div>
        <ScrollArea className={className} type="hover">
          <ScrollExampleItems />
        </ScrollArea>
      </div>
      <div>
        <div>always</div>
        <ScrollArea className={className} type="always">
          <ScrollExampleItems />
        </ScrollArea>
      </div>
      <div>
        <div>auto</div>
        <ScrollArea className={className} type="auto">
          <ScrollExampleItems />
        </ScrollArea>
      </div>
      <div>
        <div>scroll</div>
        <ScrollArea className={className} type="scroll">
          <ScrollExampleItems />
        </ScrollArea>
      </div>
    </div>
  )
}
