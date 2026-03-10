import { tradingSettingsQueries } from '@/features/trading/settings/services/settings.hooks'
import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  activateGlobalEmergencyLimit,
  deactivateGlobalEmergencyLimit,
  type GlobalEmergencyLimitResponse,
} from './global-emergency-limit.api'

export const globalEmergencyLimitQueries = {
  rootKey: ['global-emergency-limits'] as const,
  info: () =>
    queryOptions({
      queryKey: globalEmergencyLimitQueries.rootKey,
      select: ({ data }: ApiResponse<GlobalEmergencyLimitResponse>) => data,
    }),
}

/**
 * 전역 긴급 제한 조회 훅
 */
export function useGlobalEmergencyLimit() {
  return useQuery(globalEmergencyLimitQueries.info())
}

/**
 * 전역 긴급 제한 활성화 훅
 */
export function useActivateGlobalEmergencyLimit() {
  return useAdminMutation({
    mutationFn: activateGlobalEmergencyLimit,
    invalidateKeys: [
      globalEmergencyLimitQueries.rootKey,
      tradingSettingsQueries.rootKey,
    ],
    successTitle: '전역 긴급 제한 활성화 성공',
    errorTitle: '전역 긴급 제한 활성화 실패',
  })
}

/**
 * 전역 긴급 제한 비활성화 훅
 */
export function useDeactivateGlobalEmergencyLimit() {
  return useAdminMutation({
    mutationFn: deactivateGlobalEmergencyLimit,
    invalidateKeys: [globalEmergencyLimitQueries.rootKey],
    successTitle: '전역 긴급 제한 비활성화 성공',
    errorTitle: '전역 긴급 제한 비활성화 실패',
  })
}
