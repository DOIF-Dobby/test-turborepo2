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
