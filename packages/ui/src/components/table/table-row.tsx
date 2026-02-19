'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableRow(props: React.ComponentProps<'tr'>) {
  const { className, children, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'tr' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'row' : undefined}
      className={swClsx(slots?.tr({ className }))}
    >
      {children}
    </Component>
  )
}
