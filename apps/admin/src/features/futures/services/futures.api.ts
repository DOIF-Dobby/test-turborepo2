import { apiClient } from '@/libs/http/api-client'
import type { UnitApiResponse } from '@/types/api'

export type CommodityContractCode = {
  contractCode: string
  exchangeCode: string
  classCode: string
  currencyCode: string
  settlementPrice: number
  settlementDate: string
  trustMargin: number
  displayDigit: number
  tickSize: number
  tickValue: number
  marketOpenDate: string
  marketOpenTime: string
  marketCloseDate: string
  marketCloseTime: string
  tradingFromDate: string
  expirationDate: string
  tradingToDate: string
  remainingDays: number
  tradable: boolean
  contractSize: number
  settlementType: string
  firstNoticeDate: string
  subExchangeName: string
}

export type ContractCodeResponse = {
  contractCode: string
  displayMonth: string
  year: number
  month: number
  isDisabled: boolean
}

export type FuturesRiskPolicyResponse = {
  liquidationSafeRate: number
}

export type UpdateFuturesRiskPolicyRequest = {
  liquidationSafeRate: number
}

/**
 * 선물 리스크 정책 수정
 */
export function updateFuturesRiskPolicy(data: UpdateFuturesRiskPolicyRequest) {
  return apiClient
    .put<UpdateFuturesRiskPolicyRequest>('futures/risk-policy', {
      json: data,
    })
    .json<UnitApiResponse>()
}

export type LiquidationSafeRate = {
  safeRate: number
  depositBalance: number
  requiredMargin: number
  totalPositionValue: number
  totalProfitRate: number
}
