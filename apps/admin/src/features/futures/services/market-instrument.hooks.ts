import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  saveMarketInstrument,
  type MarketInstrumentResponse,
} from './market-instrument.api'

export const marketInstrumentQueries = {
  rootKey: ['market-instruments'] as const,
  list: () =>
    queryOptions({
      queryKey: marketInstrumentQueries.rootKey,
      select: ({ data }: ContentApiResponse<MarketInstrumentResponse>) =>
        data.content,
    }),
}

/**
 * 마켓 코드 목록 조회 훅
 */
export function useMarketInstruments() {
  return useQuery(marketInstrumentQueries.list())
}

/**
 * 마켓 코드 저장 훅
 */
export function useSaveMarketInstrument() {
  return useAdminMutation({
    mutationFn: saveMarketInstrument,
    invalidateKeys: [marketInstrumentQueries.rootKey],
    successTitle: '월물 코드 저장 성공',
    errorTitle: '월물 코드 저장 실패',
  })
}
