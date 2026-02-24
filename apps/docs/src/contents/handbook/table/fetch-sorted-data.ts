import type { SortingState } from '@tanstack/react-table'
import { makeData, type Person } from './make-data'

const rawData = makeData(100)

export async function fetchSortedData(sorting: SortingState) {
  // 실제 환경에서는 여기서 fetch(`/api/users?sort=${sorting[0]?.id}&desc=${sorting[0]?.desc}`) 형태가 됩니다.
  await new Promise((resolve) => setTimeout(resolve, 500)) // 네트워크 딜레이 흉내

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
