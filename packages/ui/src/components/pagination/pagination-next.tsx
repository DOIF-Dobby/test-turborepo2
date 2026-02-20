'use client'

import { ChevronRightIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { usePaginationContext } from './pagination-context'
import { PaginationLink } from './pagination-link'

export interface PaginationNextProps extends React.ComponentProps<
  typeof PaginationLink
> {
  icon?: React.ReactNode
}

export function PaginationNext({
  className,
  ref,
  children,
  icon,
  ...props
}: PaginationNextProps) {
  const { slots } = usePaginationContext()

  const nextIcon = icon || <ChevronRightIcon className={slots?.icon()} />

  return (
    <PaginationLink
      ref={ref}
      className={swClsx(slots?.next({ className }))}
      endContent={nextIcon}
      {...props}
    >
      {children}
    </PaginationLink>
  )
}
