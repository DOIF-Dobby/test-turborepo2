'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableHeaderGroup(props: React.ComponentProps<'thead'>) {
  const { className, children, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'thead' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'rowgroup' : undefined}
      className={swClsx(slots?.headerGroup({ className }))}
    >
      {children}
    </Component>
  )
}
