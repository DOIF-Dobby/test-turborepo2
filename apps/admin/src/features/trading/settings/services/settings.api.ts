import type { Currency } from '@/constants/domain'
import type { AlgorithmType } from '@/features/algorithm/constants/domain'
import { browserApiClient } from '@/libs/http/api-client.browser'
import type { UnitApiResponse } from '@/types/api'

export type TradingSettingWithAlgorithmResponse = {
  // algorithm
  algorithmId: number
  algorithmKey: string
  algorithmName: string
  algorithmType: AlgorithmType

  // trading-setting
  tradingSettingId: number
  currency: Currency
  orderAmountRatio: number
  isActive: boolean
  lastActivatedAt: string | null
  lastOrderGeneratedAt: string | null
}

export type TradingSettingCreateRequest = {
  algorithmId: number
  currency: Currency
  orderAmountRatio: number
}

/**
 * 트레이딩 설정 추가 API
 */
export function createTradingSetting(formData: TradingSettingCreateRequest) {
  return browserApiClient
    .post('trading-settings', {
      json: formData,
    })
    .json<UnitApiResponse>()
}

export type TradingSettingUpdateRequest = Pick<
  TradingSettingCreateRequest,
  'orderAmountRatio'
>

/**
 * 트레이딩 설정 수정 API
 */
export function updateTradingSetting(
  tradingSettingId: number,
  formData: TradingSettingUpdateRequest,
) {
  return browserApiClient
    .put(`trading-settings/${tradingSettingId}`, {
      json: formData,
    })
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 삭제 API
 */
export function deleteTradingSetting(tradingSettingId: number) {
  return browserApiClient
    .delete(`trading-settings/${tradingSettingId}`)
    .json<UnitApiResponse>()
}

export type TradingSettingActivationRequest = {
  initialPosition?: number
}

/**
 * 트레이딩 설정 활성화 API
 */
export function activateTradingSetting(
  tradingSettingId: number,
  formData: TradingSettingActivationRequest = {},
) {
  return browserApiClient
    .put(`trading-settings/${tradingSettingId}/activation`, {
      json: formData,
    })
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 비활성화 API
 */
export function deactivateTradingSetting(tradingSettingId: number) {
  return browserApiClient
    .delete(`trading-settings/${tradingSettingId}/activation`)
    .json<UnitApiResponse>()
}
