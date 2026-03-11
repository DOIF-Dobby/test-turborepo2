'use client'

import { MarketInstrumentSection } from './market-instrument.section'
import { RiskPolicySection } from './risk-policy.section'
import { FutureSummarySection } from './summary.section'

export function FuturesView() {
  return (
    <div className="flex flex-col gap-sw-md">
      <RiskPolicySection />
      <FutureSummarySection />
      <MarketInstrumentSection />
    </div>
  )
}
