import type { Currency } from '@/constants/domain'
import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ApiSuccessResponse, ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import type { CommodityCurrency } from '../constants/domain'
import {
  getFuturesSummary,
  updateFuturesRiskPolicy,
  type ContractCodeResponse,
  type FuturesRiskPolicyResponse,
} from './futures.api'

export const futuresQueries = {
  rootKey: ['futures'] as const,
  riskPolicyKey: ['futures/risk-policy'] as const,
  summaryKey: (commodityCurrencyCode: string) =>
    ['futures/summary', commodityCurrencyCode] as const,
  contractCodesKey: (currency: Currency | null) => [
    'futures',
    'contract-codes',
    currency,
  ],
  contractCodes: (currency: Currency | null) =>
    queryOptions({
      queryKey: futuresQueries.contractCodesKey(currency),
      select: ({ data }: ContentApiResponse<ContractCodeResponse>) =>
        data.content,
      enabled: !!currency,
    }),
  riskPolicy: () =>
    queryOptions({
      queryKey: futuresQueries.riskPolicyKey,
      select: ({ data }: ApiSuccessResponse<FuturesRiskPolicyResponse>) => data,
    }),
  summary: (commodityCurrencyCode: CommodityCurrency) =>
    queryOptions({
      queryKey: futuresQueries.summaryKey(commodityCurrencyCode),
      queryFn: () => getFuturesSummary(commodityCurrencyCode),
      select: ({ data }) => data,
    }),
}

/**
 * 통화 타입에 따른 월물 계약코드 조회 훅
 */
export function useContractCodes(currency: Currency | null) {
  return useQuery(futuresQueries.contractCodes(currency))
}

/**
 * 선물 리스크 정책 조회 훅
 */
export function useFuturesRiskPolicy() {
  return useSuspenseQuery(futuresQueries.riskPolicy())
}

/**
 * 선물 리스크 정책 수정 훅
 */
export function useUpdateFuturesRiskPolicy() {
  return useAdminMutation({
    mutationFn: updateFuturesRiskPolicy,
    invalidateKeys: [futuresQueries.riskPolicyKey],
    successTitle: '청산 안전율 수정 성공',
    errorTitle: '청산 안전율 수정 실패',
  })
}

/**
 * 현재 청산 안전율 조회 훅
 */
export function useFuturesSummary(commodityCurrencyCode: CommodityCurrency) {
  return useQuery({
    ...futuresQueries.summary(commodityCurrencyCode),
    refetchInterval: 10 * 1000,
  })
}
