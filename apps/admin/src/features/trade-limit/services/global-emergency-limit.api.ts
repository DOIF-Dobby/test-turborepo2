import { apiClient } from '@/libs/http/api-client'
import type { UnitApiResponse } from '@/types/api'

export type GlobalEmergencyLimitResponse = {
  isActivated: boolean
  latestActivatedAt: string | null
  latestActivatedBy: string | null
  latestDeactivatedAt: string | null
  latestDeactivatedBy: string | null
}

/**
 * 전역 긴급 제한 활성화 API
 */
export function activateGlobalEmergencyLimit() {
  return apiClient
    .put('global-emergency-limits/activation')
    .json<UnitApiResponse>()
}

/**
 * 전역 긴급 제한 비활성화 API
 */
export function deactivateGlobalEmergencyLimit() {
  return apiClient
    .delete('global-emergency-limits/activation')
    .json<UnitApiResponse>()
}
