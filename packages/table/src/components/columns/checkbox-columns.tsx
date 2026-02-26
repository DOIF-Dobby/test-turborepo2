import { Checkbox } from '@repo/ui/components/checkbox'
import type { ColumnDef } from '@tanstack/react-table'

export function getCheckboxColumn<TData>(
  options?: ColumnDef<TData>,
): ColumnDef<TData> {
  const { id = '_multi-select', ...restOptions } = options || {}

  return {
    id,
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
          indeterminate={table.getIsSomeRowsSelected()}
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          isDisabled={!row.getCanSelect()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          indeterminate={row.getIsSomeSelected()}
        />
      )
    },
    size: 70,
    minSize: 70,
    maxSize: 70,
    enableColumnFilter: false,
    enableSorting: false,
    meta: {
      headerAlign: 'left',
      cellAlign: 'left',
    },
    ...restOptions,
  }
}
