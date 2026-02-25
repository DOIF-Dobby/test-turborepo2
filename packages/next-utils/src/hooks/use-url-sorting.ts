import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { Updater } from './types'

export interface ColumnSort {
  desc: boolean
  id: string
}
export type SortingState = ColumnSort[]

export interface UseUrlSortingProps {
  prefix?: string
  defaultSorting?: SortingState
}

export function useUrlSorting({
  prefix = '',
  defaultSorting = [],
}: UseUrlSortingProps = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sortKey = prefix ? `${prefix}Sort` : 'sort'
  const descKey = prefix ? `${prefix}Desc` : 'desc'

  const sorting = useMemo<SortingState>(() => {
    const sortParam = searchParams.get(sortKey)
    const descParam = searchParams.get(descKey)

    if (!sortParam) return defaultSorting

    return [
      {
        id: sortParam,
        desc: descParam === 'true',
      },
    ]
  }, [searchParams, sortKey, descKey, defaultSorting])

  const onSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater

      const params = new URLSearchParams(searchParams.toString())

      if (!newSorting || newSorting.length === 0) {
        params.delete(sortKey)
        params.delete(descKey)
      } else {
        params.set(sortKey, String(newSorting[0]?.id))
        params.set(descKey, String(newSorting[0]?.desc))
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [sorting, pathname, router, searchParams, sortKey, descKey],
  )

  return { sorting, onSortingChange }
}
