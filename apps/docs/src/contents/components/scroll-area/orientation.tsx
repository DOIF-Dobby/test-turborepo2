import { ScrollArea } from '@repo/ui/components/scroll-area'
import { ScrollExampleItems } from './scroll-example-items'

export default function Orientation() {
  return (
    <div className="gap-sw-md flex">
      <div>
        <div>vertical</div>
        <ScrollArea
          className="h-[200px] w-[250px] border p-4"
          orientation="vertical"
        >
          <ScrollExampleItems />
        </ScrollArea>
      </div>
      <div>
        <div>horizontal</div>
        <ScrollArea
          className="h-[200px] w-[250px] border p-4"
          orientation="horizontal"
        >
          <ScrollExampleItems orientation="horizontal" />
        </ScrollArea>
      </div>
      <div>
        <div>both</div>
        <ScrollArea
          className="h-[200px] w-[250px] border p-4"
          orientation="both"
        >
          <ScrollExampleItems orientation="vertical" />
          <ScrollExampleItems orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
