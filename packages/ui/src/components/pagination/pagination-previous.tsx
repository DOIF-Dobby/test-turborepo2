'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { usePaginationContext } from './pagination-context'
import { PaginationLink } from './pagination-link'

export interface PaginationPreviousProps extends React.ComponentProps<
  typeof PaginationLink
> {
  icon?: React.ReactNode
}

export function PaginationPrevious({
  className,
  ref,
  children,
  icon,
  ...props
}: PaginationPreviousProps) {
  const { slots } = usePaginationContext()

  const previousIcon = icon || <ChevronLeftIcon className={slots?.icon()} />

  return (
    <PaginationLink
      ref={ref}
      className={swClsx(slots?.previous({ className }))}
      startContent={previousIcon}
      {...props}
    >
      {children}
    </PaginationLink>
  )
}
