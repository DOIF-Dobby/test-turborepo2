import type { SortingState } from '@tanstack/react-table'
import { makeData, type Person } from './make-data'

const rawData = makeData(100)

export async function fetchSortedData(sorting: SortingState) {
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (sorting.length > 0) {
    const firstSortedColumn = sorting[0] // 일단 단일 정렬만 처리한다고 가정
    if (!firstSortedColumn) return rawData

    const { id, desc } = firstSortedColumn

    const sortedData = [...rawData].sort((a: Person, b: Person) => {
      if (a[id as keyof Person] < b[id as keyof Person]) return desc ? 1 : -1
      if (a[id as keyof Person] > b[id as keyof Person]) return desc ? -1 : 1
      return 0
    })

    return sortedData
  }

  return rawData
}
