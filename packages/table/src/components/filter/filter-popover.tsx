import { Button } from '@repo/ui/components/button'
import { Popover } from '@repo/ui/components/popover'
import type { Column } from '@tanstack/react-table'
import { FilterIcon } from './filter-icon'
import { FilterInputCombobox } from './filter-input-combobox'
import { FilterInputText } from './filter-input-text'

interface FilterPopoverProps<TData> {
  isFiltered: boolean
  column: Column<TData, unknown>
}

export function FilterPopover<TData>({
  isFiltered,
  column,
}: FilterPopoverProps<TData>) {
  const { filterVariant = 'text' } = column.columnDef.meta ?? {}

  const header = column.columnDef.header
  const placeholder = typeof header === 'string' ? header : column.id

  return (
    <Popover>
      <Popover.Trigger>
        <Button size="3xs" isIconOnly variant="light">
          <FilterIcon isFiltered={isFiltered} />
        </Button>
      </Popover.Trigger>
      <Popover.Content align="end" showArrow={false}>
        <div className="px-sw-2xs flex min-w-[150px] flex-col">
          {filterVariant === 'text' && (
            <FilterInputText column={column} placeholder={placeholder} />
          )}
          {filterVariant === 'combobox' && (
            <FilterInputCombobox column={column} placeholder={placeholder} />
          )}
        </div>
      </Popover.Content>
    </Popover>
  )
}
