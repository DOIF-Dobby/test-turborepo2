'use client'

import { swClsx } from '../../utils/clsx'
import { useTableContext } from './table-context'

export function TableHead(props: React.ComponentProps<'th'>) {
  const { className, children, ...otherProps } = props
  const { slots, renderAs } = useTableContext()

  const Component = renderAs === 'table' ? 'th' : 'div'

  return (
    <Component
      {...otherProps}
      role={renderAs === 'div' ? 'columnheader' : undefined}
      className={swClsx(slots?.head({ className }))}
    >
      <span className={swClsx(slots?.headText())}>{children}</span>
    </Component>
  )
}
