'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableCellText(props: React.ComponentProps<'span'>) {
  const { className, children, ...otherProps } = props
  const { slots } = useTableContext()

  return (
    <span {...otherProps} className={swClsx(slots?.cellText({ className }))}>
      {children}
    </span>
  )
}
