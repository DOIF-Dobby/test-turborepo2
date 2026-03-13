import { browserApiClient } from '@/libs/http/api-client.browser'
import type { UnitApiResponse } from '@/types/api'

export type TradingPeriodLimitResponse = {
  periodLimitId: number
  tradingSettingId: number
  startDateTime: string
  endDateTime: string
  reason: string
}

export type TradingPeriodLimitAddRequest = {
  startDateTime: string
  endDateTime: string
  reason: string
}

/**
 * 트레이딩 설정 기간 제한 추가 API
 */
export function createTradingPeriodLimit(
  tradingSettingId: number,
  data: TradingPeriodLimitAddRequest,
) {
  return browserApiClient
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
  return browserApiClient
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
  return browserApiClient
    .delete(
      `trading-settings/${tradingSettingId}/period-limits/${periodLimitId}`,
    )
    .json<UnitApiResponse>()
}
