import type { Currency } from '@/constants/domain'
import type { AlgorithmType } from '@/features/algorithm/constants/definitions'

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
