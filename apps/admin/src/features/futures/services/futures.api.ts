import type { TradeSideType } from '@/constants/domain'
import { apiClient } from '@/libs/http/api-client'
import type { ApiSuccessResponse, UnitApiResponse } from '@/types/api'
import type { CommodityCurrency } from '../constants/domain'

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

export type CommodityAvailableContractResponse = {
  contractCode: string
  side: TradeSideType
  unsettledQuantity: number
  liquidationPossibleQuantity: number
  newOrderPossibleQuantity: number
  totalOrderPossibleQuantity: number
  marketPriceTotalOrderPossibleQuantity: number
}

export type CommodityBalanceResponse = {
  accountNumber: string
  accountProductCode: string
  currencyCode: string
  totalAsset: number
  depositBalance: number
  requiredMargin: number
  maintenanceMargin: number
  unrealizedPnl: number
  realizedPnl: number
  orderPossibleAmount: number
  withdrawalPossibleAmount: number
  fee: number
  riskRate: number
  availableContract: CommodityAvailableContractResponse | null
}

export type CommodityPositionResponse = {
  accountNumber: string
  accountProductCode: string
  symbolCode: string
  symbolName: string
  productTypeCode: string
  currencyCode: string
  side: TradeSideType
  quantity: number
  avgPrice: number
  currentPrice: number
  unrealizedPnl: number
  pnlPercent: number
  liquidationPossibleQuantity: number
  futureOptionDivision: string
}

export type FuturesSummaryResponse = {
  balance: CommodityBalanceResponse
  positions: CommodityPositionResponse[]
  totalPnl: number
  marketPricePositionValue: number
  avgPricePositionValue: number
  profitRate: number
  safeRate: number
  marginRate: number
}

/**
 * 해외선물 요약 조회 API
 */
export function getFuturesSummary(commodityCurrencyCode: CommodityCurrency) {
  return apiClient
    .get('futures/summary', {
      searchParams: {
        commodityCurrencyCode,
      },
    })
    .json<ApiSuccessResponse<FuturesSummaryResponse>>()
}
