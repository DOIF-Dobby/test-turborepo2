import { useAdminMutation } from '@/hooks/use-admin-mutation'
import { strictQueryOptions } from '@repo/query-utils'
import { useQuery } from '@tanstack/react-query'
import {
  type AlgorithmUpdateRequest,
  createAlgorithm,
  deleteAlgorithm,
  getAlgorithmParameterRules,
  getAlgorithms,
  updateAlgorithm,
} from './api'

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
export function useAlgorithms() {
  return useQuery(algorithmQueries.list())
}

/**
 * 알고리즘 추가 훅
 */
export function useCreateAlgorithm() {
  return useAdminMutation({
    mutationFn: createAlgorithm,
    invalidateKeys: [algorithmQueries.list().queryKey],
    successTitle: '알고리즘 추가 성공',
    errorTitle: '알고리즘 추가 실패',
  })
}

/**
 * 알고리즘 수정 훅
 */
export function useUpdateAlgorithm() {
  return useAdminMutation({
    mutationFn: ({ id, data }: { id: number; data: AlgorithmUpdateRequest }) =>
      updateAlgorithm(id, data),
    invalidateKeys: [algorithmQueries.list().queryKey],
    successTitle: '알고리즘 수정 성공',
    errorTitle: '알고리즘 수정 실패',
  })
}

/**
 * 알고리즘 삭제 훅
 */
export function useDeleteAlgorithm() {
  return useAdminMutation({
    mutationFn: deleteAlgorithm,
    invalidateKeys: [algorithmQueries.list().queryKey],
    successTitle: '알고리즘 삭제 성공',
    errorTitle: '알고리즘 삭제 실패',
  })
}
