import { swClsx } from '@repo/ui/utils/clsx'
import type { PropsWithChildren } from 'react'

interface SectionCardProps {
  className?: string
}

export function SectionCard({
  children,
  className,
}: PropsWithChildren<SectionCardProps>) {
  return (
    <div
      className={swClsx(
        'rounded-xl border border-base-200 bg-background py-sw-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
