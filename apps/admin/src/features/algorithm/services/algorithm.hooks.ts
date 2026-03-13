import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  type AlgorithmResponse,
  type AlgorithmUpdateRequest,
  createAlgorithm,
  deleteAlgorithm,
  updateAlgorithm,
} from './algorithm.api'

/**
 * 알고리즘 쿼리
 */
export const algorithmQueries = {
  rootKey: ['algorithms'] as const,
  list: () =>
    queryOptions({
      queryKey: algorithmQueries.rootKey,
      select: ({ data }: ContentApiResponse<AlgorithmResponse>) => data.content,
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
    invalidateKeys: [algorithmQueries.rootKey],
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
    invalidateKeys: [algorithmQueries.rootKey],
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
    invalidateKeys: [algorithmQueries.rootKey],
    successTitle: '알고리즘 삭제 성공',
    errorTitle: '알고리즘 삭제 실패',
  })
}
