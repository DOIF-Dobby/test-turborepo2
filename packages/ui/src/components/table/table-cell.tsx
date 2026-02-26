'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export type TableCellProps = React.ComponentProps<'td'> & {
  cellAlign?: 'left' | 'center' | 'right'
}

export function TableCell(props: TableCellProps) {
  const { className, children, cellAlign, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'td' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'cell' : undefined}
      className={swClsx(slots?.cell({ className, cellAlign }))}
    >
      {children}
    </Component>
  )
}
