import { Pagination } from '@repo/ui/components/pagination'
import type { RowData, Table } from '@tanstack/react-table'
import { useMemo } from 'react'

type Props = React.ComponentProps<typeof Pagination>

export interface AppTablePaginationProps<TData extends RowData> extends Props {
  table: Table<TData>
  maxVisiblePages?: number
}

export function AppTablePagination<TData extends RowData>(
  props: AppTablePaginationProps<TData>,
) {
  const { table, size = 'sm', maxVisiblePages = 5, ...otherProps } = props

  const currentPageIndex = table.getState().pagination.pageIndex
  const totalPages = Math.max(1, table.getPageCount())

  // 블록(단락) 단위로 고정된 페이징 번호를 계산하는 로직
  const pageNumbers = useMemo(() => {
    const pages: number[] = []

    // 현재 속한 블록 그룹 계산 (예: 5개씩 자를 때, 0~4는 0그룹, 5~9는 1그룹)
    const currentGroup = Math.floor(currentPageIndex / maxVisiblePages)

    // 해당 블록의 시작 페이지 번호와 끝 페이지 번호 계산
    const startPage = currentGroup * maxVisiblePages
    let endPage = startPage + maxVisiblePages - 1

    // 끝 페이지가 실제 전체 페이지 수를 넘어가지 않도록 보정
    if (endPage >= totalPages) {
      endPage = totalPages - 1
    }

    // 번호 배열 생성
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }, [currentPageIndex, totalPages, maxVisiblePages])

  return (
    <Pagination size={size} {...otherProps}>
      <Pagination.Content>
        {/* 1. 맨 처음으로 버튼 (<<) */}
        <Pagination.Item>
          <Pagination.First
            onPress={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          />
        </Pagination.Item>

        {/* 2. 이전 버튼 (<) */}
        <Pagination.Item>
          <Pagination.Previous
            onPress={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
        </Pagination.Item>

        {/* 3. 동적 페이지 번호 (블록 단위 고정) */}
        {pageNumbers.map((page) => (
          <Pagination.Item key={page}>
            <Pagination.Link
              isActive={currentPageIndex === page}
              onPress={() => table.setPageIndex(page)}
            >
              {page + 1}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        {/* 4. 다음 버튼 (>) */}
        <Pagination.Item>
          <Pagination.Next
            onPress={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
        </Pagination.Item>

        {/* 5. 맨 끝으로 버튼 (>>) */}
        <Pagination.Item>
          <Pagination.Last
            onPress={() => table.setPageIndex(totalPages - 1)}
            isDisabled={!table.getCanNextPage()}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )
}
