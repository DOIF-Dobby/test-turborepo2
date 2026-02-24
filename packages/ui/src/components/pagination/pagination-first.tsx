'use client'

import { ChevronsLeftIcon } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { usePaginationContext } from './pagination-context'
import { PaginationLink } from './pagination-link'

export interface PaginationFirstProps extends React.ComponentProps<
  typeof PaginationLink
> {
  icon?: React.ReactNode
}

export function PaginationFirst({
  className,
  ref,
  children,
  icon,
  ...props
}: PaginationFirstProps) {
  const { slots } = usePaginationContext()

  const firstIcon = icon || <ChevronsLeftIcon className={slots?.icon()} />

  return (
    <PaginationLink
      ref={ref}
      className={swClsx(slots?.first({ className }))}
      startContent={firstIcon}
      {...props}
    >
      {children}
    </PaginationLink>
  )
}
