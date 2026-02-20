'use client'

import { swClsx } from '../../utils/clsx'
import { usePaginationContext } from './pagination-context'

export function PaginationItem({
  className,
  ref,
  ...props
}: React.ComponentProps<'li'>) {
  const { slots } = usePaginationContext()

  return (
    <li ref={ref} className={swClsx(slots?.item({ className }))} {...props} />
  )
}
