'use client'

import { Skeleton } from '@repo/ui/components/skeleton'
import { formatAmount, range } from '@repo/utils/number'
import type { CommodityCurrency } from '../constants/domain'
import { useFuturesSummary } from '../services/futures.hooks'
import { FuturesSummarySectionItem } from './summary.section-item'

interface FuturesSummarySectionContentProps {
  commodityCurrency: CommodityCurrency
}

export function FuturesSummarySectionContent({
  commodityCurrency,
}: FuturesSummarySectionContentProps) {
  const { data } = useFuturesSummary(commodityCurrency)
  const amountUnit = commodityCurrency === 'TKR' ? '원' : '달러'

  return (
    <div className="flex">
      <FuturesSummarySectionItem
        title="총 자산"
        value={formatAmount(data.balance.totalAsset)}
        unit={amountUnit}
      />
      <FuturesSummarySectionItem
        title="주문 가능 금액"
        value={formatAmount(data.balance.orderPossibleAmount)}
        unit={amountUnit}
      />
      <FuturesSummarySectionItem
        title="위탁 증거금"
        value={formatAmount(data.balance.requiredMargin)}
        unit={amountUnit}
      />
      <FuturesSummarySectionItem
        title="실시간 포지션 가치"
        value={formatAmount(data.totalPositionValue)}
        unit={amountUnit}
      />
      <FuturesSummarySectionItem
        title="청산 안전율"
        value={formatAmount(data.safeRate)}
        unit="%"
      />
      <FuturesSummarySectionItem
        title="위험율"
        value={formatAmount(data.balance.riskRate)}
        unit="%"
      />
      <FuturesSummarySectionItem
        title="총 손익"
        value={formatAmount(data.totalPnl)}
        unit={amountUnit}
      />
    </div>
  )
}

export function FutureSummarySectionContentSkeleton() {
  return (
    <div className="flex">
      {range(7).map((i) => (
        <div
          key={i}
          className="flex flex-col gap-sw-2xs rounded-lg border border-base-200 bg-background p-sw-md"
        >
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      ))}
    </div>
  )
}
