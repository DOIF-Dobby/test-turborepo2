import { apiClient } from '@/libs/http/api-client'
import type { UnitApiResponse } from '@/types/api'
import type { GlobalPeriodLimitTargetType } from '../constants/domain'

export type GlobalPeriodLimitResponse = {
  limitId: number
  targetType: GlobalPeriodLimitTargetType
  startDateTime: string
  endDateTime: string
  reason: string
}

export type GlobalPeriodLimitCreateRequest = {
  targetType: GlobalPeriodLimitTargetType
  startDateTime: string
  endDateTime: string
  reason: string
}

/**
 * 전역 기간 제한 추가 API
 */
export function createGlobalPeriodLimit(data: GlobalPeriodLimitCreateRequest) {
  return apiClient
    .post(`global-period-limits`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

export type GlobalPeriodLimitUpdateRequest = Omit<
  GlobalPeriodLimitCreateRequest,
  'targetType'
>

/**
 * 전역 기간 제한 수정 API
 */
export function updateGlobalPeriodLimit(
  limitId: number,
  data: GlobalPeriodLimitUpdateRequest,
) {
  return apiClient
    .put(`global-period-limits/${limitId}`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

/**
 * 전역 기간 제한 삭제 API
 */
export function deleteGlobalPeriodLimit(limitId: number) {
  return apiClient
    .delete(`global-period-limits/${limitId}`)
    .json<UnitApiResponse>()
}
