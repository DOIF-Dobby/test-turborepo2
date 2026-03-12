import { Skeleton } from '@repo/ui/components/skeleton'
import { Tooltip } from '@repo/ui/components/tooltip'
import { Heading5, Paragraph1 } from '@repo/ui/components/typography'
import type { PropsWithChildren } from 'react'

interface FuturesSummarySectionItemProps {
  title: React.ReactNode
  content: React.ReactNode
  icon?: React.ReactNode
  tooltipContent?: React.ReactNode
}

export function FuturesSummarySectionItem({
  title,
  content,
  icon,
  tooltipContent,
}: FuturesSummarySectionItemProps) {
  return (
    <FuturesSummarySectionItemCard>
      <div className="flex items-center justify-between">
        <Tooltip
          content={tooltipContent}
          isDisabled={!tooltipContent}
          align="start"
        >
          <Paragraph1 className="text-base-600">{title}</Paragraph1>
        </Tooltip>
        {icon}
      </div>
      <Heading5>{content}</Heading5>
    </FuturesSummarySectionItemCard>
  )
}

function FuturesSummarySectionItemCard({ children }: PropsWithChildren) {
  return (
    <div className="flex grow basis-2xs flex-col gap-sw-2xs rounded-lg bg-background p-sw-md shadow-sm">
      {children}
    </div>
  )
}

export function FuturesSummarySectionItemSkeleton() {
  return (
    <FuturesSummarySectionItemCard>
      <Skeleton className="h-5 w-24 rounded-md" />
      <Skeleton className="h-6 w-40 rounded-md" />
    </FuturesSummarySectionItemCard>
  )
}
