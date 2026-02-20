'use client'

import { swClsx } from '../../utils/clsx'
import { Button } from '../button'
import { usePaginationContext } from './pagination-context'

export function PaginationLink({
  className,
  ref,
  children,
  isIconOnly = true,
  variant = 'light',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { slots, size } = usePaginationContext()

  return (
    <Button
      ref={ref}
      className={swClsx(slots?.link({ className }))}
      variant={variant}
      size={size}
      isIconOnly={isIconOnly}
      {...props}
    >
      {children}
    </Button>
  )
}
