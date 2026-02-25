import { Combobox } from '@repo/ui/components/combobox'
import type { Column } from '@tanstack/react-table'
import { useMemo } from 'react'

interface FilterInputComboboxProps<TData> {
  column: Column<TData, unknown>
  placeholder: string
}

export function FilterInputCombobox<TData>({
  column,
  placeholder,
}: FilterInputComboboxProps<TData>) {
  const columnFilterValue = column.getFilterValue()

  const uniqueValues = column.getFacetedUniqueValues()

  const selectItems = useMemo(() => {
    const sortedValues = Array.from(uniqueValues.keys()).sort()
    return sortedValues.map((value) => ({
      label: String(value),
      value: String(value),
    }))
  }, [uniqueValues])

  return (
    <Combobox
      size="sm"
      items={selectItems}
      placeholder={placeholder}
      value={(columnFilterValue ?? '') as string}
      onValueChange={(value) => {
        column.setFilterValue(value || undefined)
      }}
    />
  )
}
