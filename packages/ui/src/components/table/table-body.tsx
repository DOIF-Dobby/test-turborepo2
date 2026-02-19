'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableBody(props: React.ComponentProps<'tbody'>) {
  const { className, children, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'tbody' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'rowgroup' : undefined}
      className={swClsx(slots?.tbody({ className }))}
    >
      {children}
    </Component>
  )
}
