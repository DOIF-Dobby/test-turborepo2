'use client'

import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { TableContext } from './table-context'
import type { TableRenderType } from './type'
import { type TableSlots, tableVariants, type TableVariants } from './variants'

type Props = Omit<
  React.ComponentProps<'table'>,
  keyof TableVariants | 'className'
> &
  TableVariants

export interface TableProps extends Props {
  classNames?: SlotsToClasses<TableSlots>
  renderAs?: TableRenderType
}

export function TableRoot(props: TableProps) {
  const { classNames, children, renderAs = 'table', ...otherProps } = props

  const slots = tableVariants({
    renderAs,
  })

  const Component = renderAs

  return (
    <TableContext value={{ slots, renderAs }}>
      <Component
        {...otherProps}
        role={renderAs === 'div' ? 'table' : undefined}
        className={swClsx(
          slots.container({ className: classNames?.container }),
        )}
      >
        {children}
      </Component>
    </TableContext>
  )
}
