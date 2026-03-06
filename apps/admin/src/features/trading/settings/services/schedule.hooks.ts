import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  activateTradingSchedule,
  createTradingSchedule,
  deactivateTradingSchedule,
  deleteTradingSchedule,
  updateTradingSchedule,
  type TradingScheduleAddRequest,
  type TradingScheduleResponse,
} from './schedule.api'

export const tradingScheduleQueries = {
  rootKey: (tradingSettingId: number) =>
    ['trading-settings', tradingSettingId, 'schedules'] as const,
  list: (tradingSettingId: number) =>
    queryOptions({
      queryKey: tradingScheduleQueries.rootKey(tradingSettingId),
      select: ({ data }: ContentApiResponse<TradingScheduleResponse>) =>
        data?.content,
    }),
}

/**
 * 트레이딩 설정 스케줄 목록 조회 훅
 */
export function useTradingSettingScheduleList(tradingSettingId: number) {
  return useQuery(tradingScheduleQueries.list(tradingSettingId))
}

/**
 * 트레이딩 스케줄 추가 훅
 */
export function useCreateTradingSchedule() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      data,
    }: {
      tradingSettingId: number
      data: TradingScheduleAddRequest
    }) => createTradingSchedule(tradingSettingId, data),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingScheduleQueries.rootKey(tradingSettingId),
    ],
    successTitle: '스케줄 추가 성공',
    errorTitle: '스케줄 추가 실패',
  })
}

/**
 * 트레이딩 스케줄 수정 훅
 */
export function useUpdateTradingSchedule() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      scheduleId,
      data,
    }: {
      tradingSettingId: number
      scheduleId: number
      data: TradingScheduleAddRequest
    }) => updateTradingSchedule(tradingSettingId, scheduleId, data),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingScheduleQueries.rootKey(tradingSettingId),
    ],
    successTitle: '스케줄 수정 성공',
    errorTitle: '스케줄 수정 실패',
  })
}

/**
 * 트레이딩 스케줄 삭제 훅
 */
export function useDeleteTradingSchedule() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      scheduleId,
    }: {
      tradingSettingId: number
      scheduleId: number
    }) => deleteTradingSchedule(tradingSettingId, scheduleId),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingScheduleQueries.rootKey(tradingSettingId),
    ],
    successTitle: '스케줄 삭제 성공',
    errorTitle: '스케줄 삭제 실패',
  })
}

/**
 * 트레이딩 스케줄 활성화 훅
 */
export function useActivateTradingSchedule() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      scheduleId,
    }: {
      tradingSettingId: number
      scheduleId: number
    }) => activateTradingSchedule(tradingSettingId, scheduleId),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingScheduleQueries.rootKey(tradingSettingId),
    ],
    successTitle: '스케줄 활성화 성공',
    errorTitle: '스케줄 활성화 실패',
  })
}

/**
 * 트레이딩 스케줄 비활성화 훅
 */
export function useDeactivateTradingSchedule() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      scheduleId,
    }: {
      tradingSettingId: number
      scheduleId: number
    }) => deactivateTradingSchedule(tradingSettingId, scheduleId),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingScheduleQueries.rootKey(tradingSettingId),
    ],
    successTitle: '스케줄 비활성화 성공',
    errorTitle: '스케줄 비활성화 실패',
  })
}
