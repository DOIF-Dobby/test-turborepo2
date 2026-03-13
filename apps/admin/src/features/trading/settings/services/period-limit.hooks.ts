import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  createTradingPeriodLimit,
  deleteTradingPeriodLimit,
  updateTradingPeriodLimit,
  type TradingPeriodLimitAddRequest,
  type TradingPeriodLimitResponse,
} from './period-limit.api'

export const tradingPeriodLimitQueries = {
  rootKey: (tradingSettingId: number) =>
    ['trading-settings', tradingSettingId, 'period-limits'] as const,
  list: (tradingSettingId: number) =>
    queryOptions({
      queryKey: tradingPeriodLimitQueries.rootKey(tradingSettingId),
      select: ({ data }: ContentApiResponse<TradingPeriodLimitResponse>) =>
        data.content,
    }),
}

/**
 * 트레이딩 설정 기간 제한 목록 조회 훅
 */
export function useTradingPeriodLimits(tradingSettingId: number) {
  return useQuery(tradingPeriodLimitQueries.list(tradingSettingId))
}

/**
 * 트레이딩 설정 기간 제한 추가 훅
 */
export function useCreateTradingPeriodLimit() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      data,
    }: {
      tradingSettingId: number
      data: TradingPeriodLimitAddRequest
    }) => createTradingPeriodLimit(tradingSettingId, data),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingPeriodLimitQueries.rootKey(tradingSettingId),
    ],
    successTitle: '기간 제한 추가 성공',
    errorTitle: '기간 제한 추가 실패',
  })
}

/**
 * 트레이딩 설정 기간 제한 수정 훅
 */
export function useUpdateTradingPeriodLimit() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      periodLimitId,
      data,
    }: {
      tradingSettingId: number
      periodLimitId: number
      data: TradingPeriodLimitAddRequest
    }) => updateTradingPeriodLimit(tradingSettingId, periodLimitId, data),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingPeriodLimitQueries.rootKey(tradingSettingId),
    ],
    successTitle: '기간 제한 수정 성공',
    errorTitle: '기간 제한 삭제 실패',
  })
}

/**
 * 트레이딩 설정 기간 제한 삭제 훅
 */
export function useDeleteTradingPeriodLimit() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      periodLimitId,
    }: {
      tradingSettingId: number
      periodLimitId: number
    }) => deleteTradingPeriodLimit(tradingSettingId, periodLimitId),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingPeriodLimitQueries.rootKey(tradingSettingId),
    ],
    successTitle: '기간 제한 삭제 성공',
    errorTitle: '기간 제한 삭제 실패',
  })
}
