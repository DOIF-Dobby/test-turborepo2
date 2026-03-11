import type { Currency } from '@/constants/domain'
import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ApiResponse, ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  updateFuturesRiskPolicy,
  type ContractCodeResponse,
  type FuturesRiskPolicyResponse,
  type FuturesSummaryResponse,
} from './futures.api'

export const futuresQueries = {
  rootKey: ['futures'] as const,
  riskPolicyKey: ['futures/risk-policy'] as const,
  summaryKey: ['futures/summary'] as const,
  contractCodesKey: (currency: Currency | null) => [
    'futures',
    'contract-codes',
    currency,
  ],
  contractCodes: (currency: Currency | null) =>
    queryOptions({
      queryKey: futuresQueries.contractCodesKey(currency),
      select: ({ data }: ContentApiResponse<ContractCodeResponse>) =>
        data?.content,
      enabled: !!currency,
    }),
  riskPolicy: () =>
    queryOptions({
      queryKey: futuresQueries.riskPolicyKey,
      select: ({ data }: ApiResponse<FuturesRiskPolicyResponse>) => data,
    }),
  summary: () =>
    queryOptions({
      queryKey: futuresQueries.summaryKey,
      select: ({ data }: ApiResponse<FuturesSummaryResponse>) => data,
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
  return useQuery(futuresQueries.riskPolicy())
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
export function useFuturesSummary() {
  return useQuery(futuresQueries.summary())
}
