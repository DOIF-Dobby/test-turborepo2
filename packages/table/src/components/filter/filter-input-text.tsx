import { TextField } from '@repo/ui/components/text-field'
import { debounce } from '@repo/utils/function'
import type { Column } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

interface FilterInputTextProps<TData> {
  column: Column<TData, unknown>
  placeholder: string
}

export function FilterInputText<TData>({
  column,
  placeholder,
}: FilterInputTextProps<TData>) {
  const columnFilterValue = column.getFilterValue()

  const [localValue, setLocalValue] = useState(
    (columnFilterValue ?? '') as string,
  )

  const debouncedSetFilter = useMemo(
    () => debounce((value: string) => column.setFilterValue(value), 300),
    [column],
  )

  useEffect(() => {
    setLocalValue((columnFilterValue ?? '') as string)
  }, [columnFilterValue])

  const handleValueChange = (value: string) => {
    setLocalValue(value)
    debouncedSetFilter(value)
  }

  return (
    <TextField
      size="sm"
      placeholder={placeholder}
      value={localValue}
      onValueChange={handleValueChange}
    />
  )
}
