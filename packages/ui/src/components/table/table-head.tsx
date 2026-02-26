'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'
import type { TableVariants } from './variants'

export interface TableHeadProps extends React.ComponentProps<'th'> {
  headerAlign?: TableVariants['headerAlign']
}

export function TableHead(props: TableHeadProps) {
  const { className, children, headerAlign, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'th' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'columnheader' : undefined}
      className={swClsx(slots?.head({ className, headerAlign }))}
    >
      {children}
    </Component>
  )
}
