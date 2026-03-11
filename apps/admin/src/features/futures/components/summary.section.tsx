'use client'

import { SectionTitle } from '@/components/section/section-title'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { Spinner } from '@repo/ui/components/spinner'
import { Toggle, ToggleGroup } from '@repo/ui/components/toggle'
import { useIsFetching } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import type { CommodityCurrency } from '../constants/domain'
import { futuresQueries } from '../services/futures.hooks'
import {
  FuturesSummarySectionContent,
  FutureSummarySectionContentSkeleton,
} from './summary.section-content'

export function FutureSummarySection() {
  const [commodityCurrency, setCommodityCurrency] =
    useState<CommodityCurrency>('TKR')

  const fetchingCount = useIsFetching({
    queryKey: futuresQueries.summaryKey(commodityCurrency),
  })

  return (
    <section>
      <SectionToolbar
        title={
          <div className="flex items-center gap-sw-2xs">
            <SectionTitle>해외 선물 요약</SectionTitle>
            {fetchingCount > 0 && <Spinner size="sm" />}
          </div>
        }
        actions={
          <ToggleGroup
            motionAnimation
            disallowEmpty
            value={commodityCurrency}
            onValueChange={(value) =>
              setCommodityCurrency(value as CommodityCurrency)
            }
          >
            <Toggle value="TKR">KRW</Toggle>
            <Toggle value="TUS">USD</Toggle>
          </ToggleGroup>
        }
      />
      <Suspense fallback={<FutureSummarySectionContentSkeleton />}>
        <FuturesSummarySectionContent commodityCurrency={commodityCurrency} />
      </Suspense>
    </section>
  )
}
