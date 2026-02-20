'use client'

import { swClsx } from '../../utils/clsx'
import { usePaginationContext } from './pagination-context'

export function PaginationContent({
  className,
  ref,
  ...props
}: React.ComponentProps<'ul'>) {
  const { slots } = usePaginationContext()

  return (
    <ul
      ref={ref}
      className={swClsx(slots?.content({ className }))}
      {...props}
    />
  )
}
