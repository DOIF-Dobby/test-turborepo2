import type { AvailableParameterRuleResponse } from '@/features/algorithm/services/parameter-rule.api'
import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  createTradingParameter,
  deleteTradingParameter,
  updateTradingParameter,
  type TradingSettingParameterAddRequest,
  type TradingSettingParameterResponse,
  type TradingSettingParameterUpdateRequest,
} from './parameter.api'

export const tradingParameterQueries = {
  rootKey: (tradingSettingId: number) =>
    ['trading-settings', tradingSettingId, 'parameters'] as const,
  availableRulesKey: (tradingSettingId: number) =>
    ['trading-settings', tradingSettingId, 'available-rules'] as const,
  list: (tradingSettingId: number) =>
    queryOptions({
      queryKey: tradingParameterQueries.rootKey(tradingSettingId),
      select: ({ data }: ContentApiResponse<TradingSettingParameterResponse>) =>
        data.content,
    }),
  availableRules: (tradingSettingId: number) =>
    queryOptions({
      queryKey: tradingParameterQueries.availableRulesKey(tradingSettingId),
      select: ({ data }: ContentApiResponse<AvailableParameterRuleResponse>) =>
        data.content,
    }),
}

/**
 * 트레이딩 설정 파라미터 목록 조회 훅
 */
export function useTradingSettingParameters(tradingSettingId: number) {
  return useQuery(tradingParameterQueries.list(tradingSettingId))
}

/**
 * 특정 트레이딩 설정에 등록되지 않은 알고리즘 파라미터 규칙을 조회합니다.
 */
export function useAlgorithmAvailableParameterRules(tradingSettingId: number) {
  return useQuery(tradingParameterQueries.availableRules(tradingSettingId))
}

/**
 * 트레이딩 설정 파라미터 추가 훅
 */
export function useCreateTradingParameter() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      data,
    }: {
      tradingSettingId: number
      data: TradingSettingParameterAddRequest
    }) => createTradingParameter(tradingSettingId, data),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingParameterQueries.rootKey(tradingSettingId),
      tradingParameterQueries.availableRulesKey(tradingSettingId),
    ],
    successTitle: '파라미터 추가 성공',
    errorTitle: '파라미터 추가 실패',
  })
}

/**
 * 트레이딩 설정 파라미터 수정 훅
 */
export function useUpdateTradingParameter() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      parameterId,
      data,
    }: {
      tradingSettingId: number
      parameterId: number
      data: TradingSettingParameterUpdateRequest
    }) => updateTradingParameter(tradingSettingId, parameterId, data),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingParameterQueries.rootKey(tradingSettingId),
      tradingParameterQueries.availableRulesKey(tradingSettingId),
    ],
    successTitle: '파라미터 수정 성공',
    errorTitle: '파라미터 수정 실패',
  })
}

/**
 * 트레이딩 설정 파라미터 삭제 훅
 */
export function useDeleteTradingParameter() {
  return useAdminMutation({
    mutationFn: ({
      tradingSettingId,
      parameterId,
    }: {
      tradingSettingId: number
      parameterId: number
    }) => deleteTradingParameter(tradingSettingId, parameterId),
    invalidateKeys: ({ tradingSettingId }) => [
      tradingParameterQueries.rootKey(tradingSettingId),
      tradingParameterQueries.availableRulesKey(tradingSettingId),
    ],
    successTitle: '파라미터 삭제 성공',
    errorTitle: '파라미터 삭제 실패',
  })
}
