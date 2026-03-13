import { browserApiClient } from '@/libs/http/api-client.browser'
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
  return browserApiClient
    .put('global-emergency-limits/activation')
    .json<UnitApiResponse>()
}

/**
 * 전역 긴급 제한 비활성화 API
 */
export function deactivateGlobalEmergencyLimit() {
  return browserApiClient
    .delete('global-emergency-limits/activation')
    .json<UnitApiResponse>()
}
