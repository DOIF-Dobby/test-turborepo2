import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import type { TradingSettingWithAlgorithmResponse } from './settings.api'

/**
 * 거래 설정 쿼리
 */
export const tradingSettingsQueries = {
  rootKey: ['trading-settings'] as const,
  listKey: ['trading-settings/with-algorithm'] as const,
  list: () =>
    queryOptions({
      queryKey: tradingSettingsQueries.listKey,
      select: ({
        data,
      }: ContentApiResponse<TradingSettingWithAlgorithmResponse>) =>
        data?.content,
    }),
}

/**
 * 거래 설정 목로 조회 훅
 */
export function useTradingSettings() {
  return useQuery(tradingSettingsQueries.list())
}
