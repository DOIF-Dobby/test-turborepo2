import type { ParameterType } from '@/features/algorithm/constants/domain'
import { apiClient } from '@/libs/http/api-client'
import type { UnitApiResponse } from '@/types/api'

export type TradingSettingParameterResponse = {
  parameterId: number
  tradingSettingId: number
  parameterValue: string
  ruleId: number
  ruleKey: string
  ruleName: string
  ruleDescription: string
  parameterType: ParameterType
  lowerBound: string | null
  upperBound: string | null
}

export type TradingSettingParameterAddRequest = {
  ruleId: number
  parameterValue: string
}

/**
 * 트레이딩 설정 파라미터 추가 API
 */
export function createTradingParameter(
  tradingSettingId: number,
  data: TradingSettingParameterAddRequest,
) {
  return apiClient
    .post(`trading-settings/${tradingSettingId}/parameters`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

export type TradingSettingParameterUpdateRequest = {
  parameterValue: string
}

/**
 * 트레이딩 설정 파라미터 수정 API
 */
export function updateTradingParameter(
  tradingSettingId: number,
  parameterId: number,
  data: TradingSettingParameterUpdateRequest,
) {
  return apiClient
    .put(`trading-settings/${tradingSettingId}/parameters/${parameterId}`, {
      json: data,
    })
    .json<UnitApiResponse>()
}

/**
 * 트레이딩 설정 파라미터 삭제 API
 */
export function deleteTradingParameter(
  tradingSettingId: number,
  parameterId: number,
) {
  return apiClient
    .delete(`trading-settings/${tradingSettingId}/parameters/${parameterId}`)
    .json<UnitApiResponse>()
}
