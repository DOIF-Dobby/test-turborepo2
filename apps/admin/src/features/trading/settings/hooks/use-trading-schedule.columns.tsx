import type { ApiSuccessResponse } from '@/types/api'
import { Switch } from '@repo/ui/components/switch'
import { useQueryClient } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { AllowDays } from '../constants/domain'
import type { TradingScheduleResponse } from '../services/schedule.api'
import {
  useActivateTradingSchedule,
  useDeactivateTradingSchedule,
} from '../services/schedule.hooks'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { tradingSettingsQueries } from '../services/settings.hooks'

export function useTradingScheduleColumns(tradingSettingId: number) {
  const queryClient = useQueryClient()

  const response = queryClient.getQueryData<
    ApiSuccessResponse<TradingSettingWithAlgorithmResponse>
  >(tradingSettingsQueries.detailKey(tradingSettingId))

  const { data: tradingSettingData } = response ?? {}

  const { mutateAsync: activate } = useActivateTradingSchedule()
  const { mutateAsync: deactivate } = useDeactivateTradingSchedule()

  return useMemo<ColumnDef<TradingScheduleResponse>[]>(
    () => [
      {
        accessorKey: 'scheduleId',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'startTime',
        header: '시작 시간',
        size: 100,
      },
      {
        accessorKey: 'endTime',
        header: '종료 시간',
        size: 100,
      },
      {
        accessorKey: '_active-week',
        header: '활성화 요일',
        size: 180,
        accessorFn: (row) =>
          AllowDays.filter((day) => row[day.value])
            .map((day) => day.label)
            .join(', '),
      },
      {
        accessorKey: 'allowHoliday',
        header: '휴일 스케줄 여부',
        size: 120,
      },
      {
        accessorKey: 'isActive',
        header: '활성화',
        cell: ({ row: { original } }) => {
          const { isActive, tradingSettingId, scheduleId } = original

          if (!tradingSettingData) {
            return null
          }

          return (
            <div onClick={(e) => e.stopPropagation()}>
              <Switch
                defaultChecked={isActive}
                size="sm"
                isDisabled={tradingSettingData.isActive}
                onCheckedChange={async (checked) => {
                  if (checked) {
                    await activate({
                      tradingSettingId,
                      scheduleId,
                    })
                  } else {
                    await deactivate({
                      tradingSettingId,
                      scheduleId,
                    })
                  }
                }}
              />
            </div>
          )
        },
      },
    ],
    [tradingSettingData, activate, deactivate],
  )
}
