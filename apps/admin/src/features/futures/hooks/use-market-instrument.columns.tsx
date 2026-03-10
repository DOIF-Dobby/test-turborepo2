import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { MarketInstrumentResponse } from '../services/market-instrument.api'

export function useMarketInstrumentColumns() {
  return useMemo<ColumnDef<MarketInstrumentResponse>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'currency',
        header: '통화',
        size: 150,
      },
      {
        accessorKey: 'marketCode',
        header: '마켓 코드',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: '설명',
        size: 300,
      },
    ],
    [],
  )
}
