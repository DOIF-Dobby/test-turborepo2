import { ScrollArea } from '@repo/ui/components2/scroll-area'
import { ScrollExampleItems } from './scroll-example-items'

export default function Default() {
  return (
    <ScrollArea className="h-[200px] w-[350px] border p-4">
      <ScrollExampleItems />
    </ScrollArea>
  )
}
