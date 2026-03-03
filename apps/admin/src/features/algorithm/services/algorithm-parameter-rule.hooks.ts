import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import type { AlgorithmParameterRuleResponse } from './algorithm-parameter-rule.api'

/**
 * 알고리즘 파라미터 규칙 쿼리
 */
export const algorithmParameterRuleQueries = {
  rootKey: (algorithmId?: number) =>
    ['algorithms', algorithmId, 'rules'] as const,
  list: (algorithmId?: number) =>
    queryOptions({
      queryKey: algorithmParameterRuleQueries.rootKey(algorithmId),
      enabled: !!algorithmId,
      select: (response: ContentApiResponse<AlgorithmParameterRuleResponse>) =>
        response.data?.content,
    }),
}

/**
 * 알고리즘 파라미터 규칙 조회 훅
 */
export function useAlgorithmParameterRules(algorithmId?: number) {
  return useQuery(algorithmParameterRuleQueries.list(algorithmId))
}
