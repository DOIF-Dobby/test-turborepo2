import { useQuery } from '@tanstack/react-query'
import { algorithmQueries } from '../queries/algorithm-queries'

/**
 * 알고리즘 목록 조회 훅
 */
export function useAlgorithms() {
  return useQuery(algorithmQueries.list())
}
