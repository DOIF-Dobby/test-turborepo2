import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { Updater } from './types'

interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface UseUrlPaginationProps {
  prefix?: string
  defaultPageSize?: number
}

export function useUrlPagination({
  prefix = '',
  defaultPageSize = 10,
}: UseUrlPaginationProps = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageKey = prefix ? `${prefix}Page` : 'page'
  const sizeKey = prefix ? `${prefix}PageSize` : 'pageSize'

  const pagination = useMemo<PaginationState>(() => {
    const pageParam = searchParams.get(pageKey)
    const sizeParam = searchParams.get(sizeKey)

    return {
      pageIndex: pageParam ? Math.max(0, Number(pageParam) - 1) : 0,
      pageSize: sizeParam ? Number(sizeParam) : defaultPageSize,
    }
  }, [searchParams, pageKey, sizeKey, defaultPageSize])

  const onPaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater

      const params = new URLSearchParams(searchParams.toString())
      params.set(pageKey, String(newPagination.pageIndex + 1))
      params.set(sizeKey, String(newPagination.pageSize))

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pagination, pathname, router, searchParams, pageKey, sizeKey],
  )

  return { pagination, onPaginationChange }
}
