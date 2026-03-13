import type { Currency } from '@/constants/domain'
import { browserApiClient } from '@/libs/http/api-client.browser'
import type { UnitApiResponse } from '@/types/api'

export type MarketInstrumentResponse = {
  id: number
  currency: Currency
  marketCode: string
  description: string | null
}

export type MarketInstrumentSaveRequest = {
  currency: Currency
  marketCode: string
  description: string | null
}

/**
 * 월물 코드를 저장합니다.
 */
export function saveMarketInstrument(data: MarketInstrumentSaveRequest) {
  return browserApiClient
    .post('market-instruments', {
      json: data,
    })
    .json<UnitApiResponse>()
}
