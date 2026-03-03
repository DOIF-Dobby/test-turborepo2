import { AlgorithmView } from '@/features/algorithm/components/algorithm.view'
import { algorithmQueries } from '@/features/algorithm/services/algorithm.hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export const dynamic = 'force-dynamic'

export default async function AlgorithmsPage() {
  const state = await getDehydratedQueries([algorithmQueries.list()])

  return (
    <Hydrate state={state}>
      <AlgorithmView />
    </Hydrate>
  )
}
