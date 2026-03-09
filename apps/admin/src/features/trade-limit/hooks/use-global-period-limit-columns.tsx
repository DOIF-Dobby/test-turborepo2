import { formatDateTime } from '@repo/date'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { GlobalPeriodLimitTargetTypeMap } from '../constants/domain'
import type { GlobalPeriodLimitResponse } from '../services/global-period-limit.api'

export function useGlobalPeriodLimitColumns() {
  return useMemo<ColumnDef<GlobalPeriodLimitResponse>[]>(
    () => [
      {
        accessorKey: 'limitId',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'targetType',
        header: '대상 유형',
        size: 100,
        accessorFn: (row) => GlobalPeriodLimitTargetTypeMap[row.targetType],
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
