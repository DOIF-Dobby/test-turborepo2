import { AlgorithmTable } from '@/features/algorithm/components/algorithm-table'
import { algorithmQueries } from '@/features/algorithm/hooks'
import { getDehydratedQueries, Hydrate } from '@/libs/query/dehydrator'

export default async function AlgorithmsPage() {
  const state = await getDehydratedQueries([algorithmQueries.list()])

  return (
    <Hydrate state={state}>
      <AlgorithmTable />
    </Hydrate>
  )
}
