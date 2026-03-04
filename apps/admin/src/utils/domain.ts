import {
  Currencies,
  type Currency,
  type FinancialAssetType,
} from '@/constants/domain'

export const currencyUtils = {
  /** 특정 통화 정보 조회 */
  get: (code: Currency) => Currencies[code],

  /** 법정 통화 여부 */
  isFiat: (code: Currency) => Currencies[code].assetType === 'FIAT',

  /** 상품권 여부 */
  isGift: (code: Currency) => Currencies[code].assetType === 'GIFT_CERTIFICATE',

  isCommodity: (code: Currency) => Currencies[code].assetType === 'COMMODITY',

  /** 기반 통화 조회 (코틀린의 baseCurrency getter) */
  getBaseCurrency: (code: Currency): Currency | null => {
    const currency = Currencies[code]
    if (currency.assetType === 'FIAT') {
      return code
    } else if (currency.assetType === 'GIFT_CERTIFICATE') {
      return currency.baseCurrency as Currency
    }

    return null
  },

  /** 자산 타입별 목록 필터링 */
  getAllByAssetType: (type: FinancialAssetType): Currency[] => {
    return (Object.keys(Currencies) as Currency[]).filter(
      (code) => Currencies[code].assetType === type,
    )
  },
}
