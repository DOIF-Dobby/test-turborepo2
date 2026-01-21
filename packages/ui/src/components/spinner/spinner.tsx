'use client'

import { swClsx } from '../../utils/clsx'
import { DotLoader } from './loaders/dot-loader'
import { RingLoader } from './loaders/ring-loader' // ✨ 분리된 컴포넌트 Import
import { spinnerVariants, type SpinnerVariants } from './variants'

export interface SpinnerProps extends SpinnerVariants {
  className?: string
  label?: string
  variant?: 'ring' | 'dot'
}

export function Spinner({
  size,
  color,
  className,
  variant = 'ring',
  label = 'Loading...',
}: SpinnerProps) {
  const slots = spinnerVariants({ size, color })
  const rootClasses = swClsx(slots.root({ className }))

  return (
    <div role="status" aria-label={label} className={rootClasses}>
      {variant === 'ring' && <RingLoader />}
      {variant === 'dot' && <DotLoader />}

      <span className="sr-only">{label}</span>
    </div>
  )
}
