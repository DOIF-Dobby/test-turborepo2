'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableCell(props: React.ComponentProps<'td'>) {
  const { className, children, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'td' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'cell' : undefined}
      className={swClsx(slots?.td({ className }))}
    >
      {children}
    </Component>
  )
}
