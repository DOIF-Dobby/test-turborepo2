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
  KRW: { assetType: 'FIAT', scale: 0, suffixText: '' },
  USD: { assetType: 'FIAT', scale: 2, suffixText: '$' },
  JPY: { assetType: 'FIAT', scale: 0, suffixText: '' },
  EUR: { assetType: 'FIAT', scale: 2, suffixText: '' },
  CNY: { assetType: 'FIAT', scale: 2, suffixText: '' },

  // 상품권 (GIFT_CERTIFICATE)
  USDX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 2,
    suffixText: '$',
    baseCurrency: 'USD',
  },
  JPYX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 0,
    suffixText: '',
    baseCurrency: 'JPY',
  },
  EURX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 2,
    suffixText: '',
    baseCurrency: 'EUR',
  },
  CNYX: {
    assetType: 'GIFT_CERTIFICATE',
    scale: 2,
    suffixText: '',
    baseCurrency: 'CNY',
  },

  // 원자재 (COMMODITY)
  SWGOLD: { assetType: 'COMMODITY', scale: 2, suffixText: 'g' },
  SWSLVR: { assetType: 'COMMODITY', scale: 2, suffixText: 'g' },
} as const

export type Currency = keyof typeof Currencies
