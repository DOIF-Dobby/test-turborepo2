import { Skeleton } from '@repo/ui/components/skeleton'

export default function Default() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40 rounded-md" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>
    </div>
  )
}
