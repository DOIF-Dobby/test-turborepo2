import { Select } from '@repo/ui/components/select'
import { swClsx } from '@repo/ui/utils/clsx'
import type { RowData, Table } from '@tanstack/react-table'
import { useMemo } from 'react'

type Props = Omit<
  React.ComponentProps<typeof Select>,
  'items' | 'isClearable' | 'value' | 'onValueChange'
>

export interface AppTablePageSizeSelectProps<
  TData extends RowData,
> extends Props {
  table: Table<TData>
  pageItems?: number[]
}

export function AppTablePageSizeSelect<TData extends RowData>(
  props: AppTablePageSizeSelectProps<TData>,
) {
  const {
    table,
    size = 'sm',
    pageItems = [10, 20, 50, 100],
    classNames,
    ...otherProps
  } = props

  const { pageSize } = table.getState().pagination

  const items = useMemo(
    () =>
      pageItems.map((item) => ({
        label: item.toString(),
        value: item.toString(),
      })),
    [pageItems],
  )

  return (
    <Select
      size={size}
      isClearable={false}
      value={pageSize.toString()}
      onValueChange={(value) => {
        table.setPageSize(Number(value))
      }}
      items={items}
      classNames={{
        container: swClsx('w-28', classNames?.container),
        ...classNames,
      }}
      {...otherProps}
    />
  )
}
