import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ApiResponse, ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
  activateTradingSetting,
  createTradingSetting,
  deactivateTradingSetting,
  deleteTradingSetting,
  updateTradingSetting,
  type TradingSettingActivationRequest,
  type TradingSettingUpdateRequest,
  type TradingSettingWithAlgorithmResponse,
} from './settings.api'

/**
 * 거래 설정 쿼리
 */
export const tradingSettingsQueries = {
  rootKey: ['trading-settings'] as const,
  listKey: ['trading-settings', 'with-algorithm'] as const,
  detailKey: (tradingSettingId: number) =>
    ['trading-settings', tradingSettingId, 'with-algorithm'] as const,
  list: () =>
    queryOptions({
      queryKey: tradingSettingsQueries.listKey,
      select: ({
        data,
      }: ContentApiResponse<TradingSettingWithAlgorithmResponse>) =>
        data?.content,
    }),
  detail: (tradingSettingId: number) =>
    queryOptions({
      queryKey: tradingSettingsQueries.detailKey(tradingSettingId),
      select: ({ data }: ApiResponse<TradingSettingWithAlgorithmResponse>) =>
        data!,
    }),
}

/**
 * 거래 설정 목록 조회 훅
 */
export function useTradingSettings() {
  return useQuery(tradingSettingsQueries.list())
}

/**
 * 거래 설정 추가 훅
 */
export function useCreateTradingSetting() {
  return useAdminMutation({
    mutationFn: createTradingSetting,
    invalidateKeys: [tradingSettingsQueries.listKey],
    successTitle: '거래 설정 추가 성공',
    errorTitle: '거래 설정 추가 실패',
  })
}

/**
 * 거래 설정 수정 훅
 */
export function useUpdateTradingSetting() {
  return useAdminMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: TradingSettingUpdateRequest
    }) => updateTradingSetting(id, data),
    invalidateKeys: ({ id }) => [
      tradingSettingsQueries.listKey,
      tradingSettingsQueries.detailKey(id),
    ],
    successTitle: '거래 설정 추가 성공',
    errorTitle: '거래 설정 추가 실패',
  })
}

/**
 * 거래 설정 삭제 훅
 */
export function useDeleteTradingSetting() {
  return useAdminMutation({
    mutationFn: deleteTradingSetting,
    invalidateKeys: [tradingSettingsQueries.listKey],
    successTitle: '거래 설정 삭제 성공',
    errorTitle: '거래 설정 삭제 실패',
  })
}

/**
 * 거래 설정 활성화 훅
 */
export function useActivateTradingSetting() {
  return useAdminMutation({
    mutationFn: ({
      id,
      data = {},
    }: {
      id: number
      data: TradingSettingActivationRequest
    }) => activateTradingSetting(id, data),
    invalidateKeys: ({ id }) => [
      tradingSettingsQueries.listKey,
      tradingSettingsQueries.detailKey(id),
    ],
    successTitle: '거래 설정 활성화 성공',
    errorTitle: '거래 설정 활성화 실패',
  })
}

/**
 * 거래 설정 비활성화 훅
 */
export function useDeactivateTradingSetting() {
  return useAdminMutation({
    mutationFn: deactivateTradingSetting,
    invalidateKeys: (id) => [
      tradingSettingsQueries.listKey,
      tradingSettingsQueries.detailKey(id),
    ],
    successTitle: '거래 설정 비활성화 성공',
    errorTitle: '거래 설정 비활성화 실패',
  })
}

/**
 * 거래 설정 상세 정보 조회 훅
 */
export function useTradingSettingDetail(tradingSettingId: number) {
  return useSuspenseQuery(tradingSettingsQueries.detail(tradingSettingId))
}
