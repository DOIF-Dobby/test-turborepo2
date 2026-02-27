import { strictQueryOptions } from '@repo/query-utils'
import { useQuery } from '@tanstack/react-query'
import { getAlgorithmParameterRules, getAlgorithms } from './fetchers'

/**
 * 알고리즘 쿼리
 */
export const algorithmQueries = {
  list: () =>
    strictQueryOptions({
      queryKey: ['algorithms'],
      queryFn: getAlgorithms,
    }),
  rules: () =>
    strictQueryOptions({
      queryKey: ['algorithms/rules'],
      queryFn: getAlgorithmParameterRules,
    }),
}

/**
 * 알고리즘 목록 조회 훅
 */
export function useAlgorithmsQuery() {
  return useQuery(algorithmQueries.list())
}
