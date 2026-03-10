import { groupBy } from '@repo/utils/array'

export const FinancialAssetTypes = {
  FIAT: '법정 화폐',
  GIFT_CERTIFICATE: '상품권',
  COMMODITY: '원자재',
} as const

export type FinancialAssetType = keyof typeof FinancialAssetTypes

export interface CurrencyInfo {
  assetType: FinancialAssetType
  scale: number
  suffixText: string
  baseCurrency?: Currency
}

export const Currencies = {
  // 법정 통화 (FIAT)
  KRW: { assetType: 'FIAT', scale: 0, suffixText: '원' },
  USD: { assetType: 'FIAT', scale: 2, suffixText: '달러' },
  JPY: { assetType: 'FIAT', scale: 0, suffixText: '엔' },
  EUR: { assetType: 'FIAT', scale: 2, suffixText: '유로' },
  CNY: { assetType: 'FIAT', scale: 2, suffixText: '위안' },

  // 상품권 (GIFT_CERTIFICATE)
  USDX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 2,
    suffixText: '달러',
    baseCurrency: 'USD',
  },
  JPYX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 0,
    suffixText: '엔',
    baseCurrency: 'JPY',
  },
  EURX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 2,
    suffixText: '유로',
    baseCurrency: 'EUR',
  },
  CNYX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 2,
    suffixText: '위안',
    baseCurrency: 'CNY',
  },

  // 원자재 (COMMODITY)
  SWGOLD: { assetType: 'COMMODITY', scale: 2, suffixText: '그램' },
  SWSLVR: { assetType: 'COMMODITY', scale: 2, suffixText: '그램' },
} as const

export type Currency = keyof typeof Currencies

export const currencyItems = Object.keys(Currencies)
  .filter((key) => key !== 'KRW')
  .map((key) => ({
    label: key,
    value: key as Currency,
    assetType: Currencies[key as Currency].assetType,
  }))

export const groupedCurrencyItems = groupBy(
  currencyItems,
  (item) => item.assetType,
)
