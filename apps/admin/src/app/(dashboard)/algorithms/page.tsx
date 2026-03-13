import { DashboardPageHeader } from '@/components/layout/dashboard/dashboard-page-header'
import { AlgorithmView } from '@/features/algorithm/components/algorithm.view'
import { algorithmQueries } from '@/features/algorithm/services/algorithm.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export default async function AlgorithmsPage() {
  const state = await getDehydratedQueries([algorithmQueries.list()])

  return (
    <>
      <DashboardPageHeader title="알고리즘 관리" />
      <Hydrate state={state}>
        <AlgorithmView />
      </Hydrate>
    </>
  )
}
