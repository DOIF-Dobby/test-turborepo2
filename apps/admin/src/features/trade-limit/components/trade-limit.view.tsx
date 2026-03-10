'use client'

import { GlobalEmergencyLimitSection } from './global-emergency-limit.section'
import { GlobalPeriodLimitSection } from './global-period-limit.section'

export function TradeLimitView() {
  return (
    <div className="flex flex-col gap-sw-md">
      <GlobalEmergencyLimitSection />
      <GlobalPeriodLimitSection />
    </div>
  )
}
