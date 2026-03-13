import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  createGlobalPeriodLimit,
  deleteGlobalPeriodLimit,
  updateGlobalPeriodLimit,
  type GlobalPeriodLimitResponse,
  type GlobalPeriodLimitUpdateRequest,
} from './global-period-limit.api'

export const globalPeriodLimitQueries = {
  rootKey: ['global-period-limits'] as const,
  list: () =>
    queryOptions({
      queryKey: globalPeriodLimitQueries.rootKey,
      select: ({ data }: ContentApiResponse<GlobalPeriodLimitResponse>) =>
        data.content,
    }),
}

/**
 * 전역 기간 제한 목록 조회 훅
 */
export function useGlobalPeriodLimits() {
  return useQuery(globalPeriodLimitQueries.list())
}

/**
 * 전역 기간 제한 추가 훅
 */
export function useCreateGlobalPeriodLimit() {
  return useAdminMutation({
    mutationFn: createGlobalPeriodLimit,
    invalidateKeys: [globalPeriodLimitQueries.rootKey],
    successTitle: '전역 기간 제한 추가 성공',
    errorTitle: '전역 기간 제한 추가 실패',
  })
}

/**
 * 전역 기간 제한 수정 훅
 */
export function useUpdateGlobalPeriodLimit() {
  return useAdminMutation({
    mutationFn: ({
      limitId,
      data,
    }: {
      limitId: number
      data: GlobalPeriodLimitUpdateRequest
    }) => updateGlobalPeriodLimit(limitId, data),
    invalidateKeys: [globalPeriodLimitQueries.rootKey],
    successTitle: '전역 기간 제한 수정 성공',
    errorTitle: '전역 기간 제한 수정 실패',
  })
}

/**
 * 전역 기간 제한 삭제 훅
 */
export function useDeleteGlobalPeriodLimit() {
  return useAdminMutation({
    mutationFn: deleteGlobalPeriodLimit,
    invalidateKeys: [globalPeriodLimitQueries.rootKey],
    successTitle: '전역 기간 제한 삭제 성공',
    errorTitle: '전역 기간 제한 삭제 실패',
  })
}
