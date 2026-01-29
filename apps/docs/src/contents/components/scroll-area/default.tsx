import { ScrollArea } from '@repo/ui/components/scroll-area'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
)

export default function Default() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      {tags.map((tag) => (
        <div key={tag}>{tag}</div>
      ))}
    </ScrollArea>
  )
}
