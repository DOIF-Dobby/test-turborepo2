import { browserApiClient } from '@/libs/http/api-client.browser'
import type { UnitApiResponse } from '@/types/api'

export type TradingScheduleResponse = {
  scheduleId: number
  tradingSettingId: number
  startTime: string
  endTime: string
  allowMonday: boolean
  allowTuesday: boolean
  allowWednesday: boolean
  allowThursday: boolean
  allowFriday: boolean
  allowSaturday: boolean
  allowSunday: boolean
  allowHoliday: boolean
  isActive: boolean
}

export type TradingScheduleAddRequest = {
  startTime: string
  endTime: string
  allowMonday: boolean
  allowTuesday: boolean
  allowWednesday: boolean
  allowThursday: boolean
  allowFriday: boolean
  allowSaturday: boolean
  allowSunday: boolean
  allowHoliday: boolean
}

/**
 * 트레이딩 설정 스케줄 추가 API
 */
export function createTradingSchedule(
  tradingSettingId: number,
  data: TradingScheduleAddRequest,
) {
  return browserApiClient
    .post(`trading-settings/${tradingSettingId}/schedules`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

export type TradingScheduleUpdateRequest = TradingScheduleAddRequest

/**
 * 트레이딩 설정 스케줄 수정 API
 */
export function updateTradingSchedule(
  tradingSettingId: number,
  scheduleId: number,
  data: TradingScheduleUpdateRequest,
) {
  return browserApiClient
    .put(`trading-settings/${tradingSettingId}/schedules/${scheduleId}`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 스케줄 삭제 API
 */
export function deleteTradingSchedule(
  tradingSettingId: number,
  scheduleId: number,
) {
  return browserApiClient
    .delete(`trading-settings/${tradingSettingId}/schedules/${scheduleId}`)
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 스케줄 활성화 API
 */
export function activateTradingSchedule(
  tradingSettingId: number,
  scheduleId: number,
) {
  return browserApiClient
    .put(
      `trading-settings/${tradingSettingId}/schedules/${scheduleId}/activation`,
    )
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 스케줄 비활성화 API
 */
export function deactivateTradingSchedule(
  tradingSettingId: number,
  scheduleId: number,
) {
  return browserApiClient
    .delete(
      `trading-settings/${tradingSettingId}/schedules/${scheduleId}/activation`,
    )
    .json<UnitApiResponse>()
}
