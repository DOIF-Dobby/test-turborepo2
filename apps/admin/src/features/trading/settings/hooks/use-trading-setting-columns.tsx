import { Switch } from '@repo/ui/components/switch'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'

export function useTradingSettingColumns() {
  const columns = useMemo<ColumnDef<TradingSettingWithAlgorithmResponse>[]>(
    () => [
      {
        accessorKey: 'currency',
        header: '통화',
        size: 150,
      },
      {
        accessorKey: 'algorithmName',
        header: '알고리즘',
        size: 250,
      },
      {
        accessorKey: 'isActive',
        header: '활성화',
        size: 150,
        cell: ({ row }) => {
          const { original } = row
          return <Switch size="sm" defaultChecked={original.isActive} />
        },
      },
    ],
    [],
  )

  return columns
}
