import { strictQueryOptions } from '@repo/query-utils'
import { getAlgorithmParameterRules, getAlgorithms } from '../api/algorithm-api'

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
