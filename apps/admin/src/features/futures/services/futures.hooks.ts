import type { Currency } from '@/constants/domain'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import type { ContractCodeResponse } from './futures.api'

export const futuresQueries = {
  rootKey: ['futures'],
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
}

/**
 * 통화 타입에 따른 월물 계약코드 조회 훅
 */
export function useContractCodes(currency: Currency | null) {
  return useQuery(futuresQueries.contractCodes(currency))
}
