import { apiClient } from '@/libs/http/api-client'
import type { UnitApiResponse } from '@/types/api'

export type TradingPeriodLimitResponse = {
  periodLimitId: number
  tradingSettingId: number
  startDateTime: string
  endDateTime: string
}

export type TradingPeriodLimitAddRequest = {
  startDateTime: string
  endDateTime: string
}

/**
 * 트레이딩 설정 기간 제한 추가 API
 */
export function createTradingPeriodLimit(
  tradingSettingId: number,
  data: TradingPeriodLimitAddRequest,
) {
  return apiClient
    .post(`trading-settings/${tradingSettingId}/period-limits`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

export type TradingPeriodLimitUpdateRequest = TradingPeriodLimitAddRequest

/**
 * 트레이딩 설정 기간 제한 수정 API
 */
export function updateTradingPeriodLimit(
  tradingSettingId: number,
  periodLimitId: number,
  data: TradingPeriodLimitUpdateRequest,
) {
  return apiClient
    .put(
      `trading-settings/${tradingSettingId}/period-limits/${periodLimitId}`,
      {
        json: data,
      },
    )
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 기간 제한 삭제 API
 */
export function deleteTradingPeriodLimit(
  tradingSettingId: number,
  periodLimitId: number,
) {
  return apiClient
    .delete(
      `trading-settings/${tradingSettingId}/period-limits/${periodLimitId}`,
    )
    .json<UnitApiResponse>()
}
