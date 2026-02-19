'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableFooter(props: React.ComponentProps<'tfoot'>) {
  const { className, children, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'tfoot' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'rowgroup' : undefined}
      className={swClsx(slots?.tfoot({ className }))}
    >
      {children}
    </Component>
  )
}
