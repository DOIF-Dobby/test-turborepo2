import { SectionToolbar } from '@/components/section/section-toolbar'
import { useFuturesSummary } from '../services/futures.hooks'

export function FutureSummarySection() {
  const { data } = useFuturesSummary()

  console.log(data)

  return (
    <div>
      <SectionToolbar title="해외 선물 요약" />
    </div>
  )
}
