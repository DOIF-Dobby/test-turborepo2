'use client'

import { ChevronsRightIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { usePaginationContext } from './pagination-context'
import { PaginationLink } from './pagination-link'

export interface PaginationLastProps extends React.ComponentProps<
  typeof PaginationLink
> {
  icon?: React.ReactNode
}

export function PaginationLast({
  className,
  ref,
  children,
  icon,
  ...props
}: PaginationLastProps) {
  const { slots } = usePaginationContext()

  const lastIcon = icon || <ChevronsRightIcon className={slots?.icon()} />

  return (
    <PaginationLink
      ref={ref}
      className={swClsx(slots?.last({ className }))}
      startContent={lastIcon}
      {...props}
    >
      {children}
    </PaginationLink>
  )
}
