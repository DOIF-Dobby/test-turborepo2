import { formatDateTime } from '@repo/date'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { TradingPeriodLimitResponse } from '../services/period-limit.api'

export function useTradingPeriodLimitColumns() {
  return useMemo<ColumnDef<TradingPeriodLimitResponse>[]>(
    () => [
      {
        accessorKey: 'periodLimitId',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'startDateTime',
        header: '제한 시작 일시',
        size: 180,
        accessorFn: (row) => formatDateTime(row.startDateTime),
      },
      {
        accessorKey: 'endDateTime',
        header: '제한 종료 일시',
        size: 180,
        accessorFn: (row) => formatDateTime(row.endDateTime),
      },
      {
        accessorKey: 'reason',
        header: '제한 사유',
        size: 370,
      },
    ],
    [],
  )
}
