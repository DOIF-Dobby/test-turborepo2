'use client'

import { ScrollArea } from '@repo/ui/components/scroll-area'
import { Spinner } from '@repo/ui/components/spinner'
import { Table as TableComponent } from '@repo/ui/components/table'
import { swClsx } from '@repo/ui/utils/clsx'
import { flexRender, type RowData, type Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { FilterPopover } from './filter/filter-popover'
import SortingButton from './sort/sorting-button'

type Props = Omit<React.ComponentProps<typeof TableComponent>, 'renderAs'>

interface AppTableProps<TData extends RowData> extends Props {
  table: Table<TData>
  rowHeight?: number
  showFooter?: boolean
  isLoading?: boolean
}

export function AppTable<TData extends RowData>(props: AppTableProps<TData>) {
  const {
    table,
    rowHeight = 52,
    showFooter = false,
    isLoading = false,
    ...otherProps
  } = props

  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLTableSectionElement>(null)
  const footerRef = useRef<HTMLTableSectionElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 15,
  })

  const { onClickRow } = table.options.meta ?? {}

  return (
    <TableComponent
      {...otherProps}
      renderAs="div"
      style={{
        overflow: 'hidden',
        ...otherProps.style,
      }}
    >
      <ScrollArea
        orientation="horizontal"
        style={{
          width: '100%',
        }}
      >
        {/* header */}
        <TableComponent.HeaderGroup
          ref={headerRef}
          style={{
            overflow: 'hidden',
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableComponent.HeaderRow
              key={headerGroup.id}
              style={{
                width: table.getTotalSize(),
                position: 'relative',
              }}
            >
              {headerGroup.headers.map((header) => {
                const { column } = header

                const canSort = column.getCanSort()
                const isSorted = column.getIsSorted()

                const canFilter = column.getCanFilter()
                const isFiltered = column.getIsFiltered()

                const showActionButtons = canFilter || canSort

                const headerText = flexRender(
                  column.columnDef.header,
                  header.getContext(),
                )

                const { headerAlign } = column.columnDef.meta ?? {}

                return (
                  <TableComponent.Head
                    key={header.id}
                    headerAlign={headerAlign}
                    style={{
                      position: 'absolute',
                      left: header.getStart(),
                      width: header.getSize(),
                      minWidth: column.columnDef.minSize,
                      maxWidth: column.columnDef.maxSize,
                      height: '100%',
                    }}
                  >
                    <TableComponent.HeadText>
                      {header.isPlaceholder ? null : headerText}
                    </TableComponent.HeadText>
                    {showActionButtons && (
                      <div className="flex items-center">
                        {canFilter && (
                          <FilterPopover
                            isFiltered={isFiltered}
                            column={column}
                          />
                        )}
                        {canSort && (
                          <SortingButton
                            isSorted={isSorted}
                            onPress={column.getToggleSortingHandler()}
                          />
                        )}
                      </div>
                    )}
                  </TableComponent.Head>
                )
              })}
            </TableComponent.HeaderRow>
          ))}
        </TableComponent.HeaderGroup>

        {/* body */}
        <div style={{ position: 'relative' }}>
          <ScrollArea
            viewportRef={scrollRef}
            orientation="vertical"
            style={{
              height: '300px',
            }}
          >
            <TableComponent.Body
              style={{
                height: rowVirtualizer.getTotalSize(),
                width: table.getTotalSize(),
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index]

                if (!row) {
                  return null
                }

                return (
                  <TableComponent.Row
                    key={row.id}
                    data-selected={row.getIsSelected()}
                    data-canselect={row.getCanSelect()}
                    onClick={() => {
                      row.toggleSelected()
                      onClickRow?.(row)
                    }}
                    className={swClsx(
                      (row.getCanSelect() || onClickRow) && 'cursor-pointer',
                    )}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { cellAlign } = cell.column.columnDef.meta ?? {}

                      return (
                        <TableComponent.Cell
                          key={cell.id}
                          cellAlign={cellAlign}
                          style={{
                            position: 'absolute',
                            width: cell.column.getSize(),
                            left: cell.column.getStart(),
                            height: '100%',
                          }}
                        >
                          <TableComponent.CellText>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableComponent.CellText>
                        </TableComponent.Cell>
                      )
                    })}
                  </TableComponent.Row>
                )
              })}
            </TableComponent.Body>
          </ScrollArea>

          {/* 로딩 오버레이 & 스피너 */}
          {isLoading && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[1px]"
              style={{ pointerEvents: 'all' }}
            >
              <Spinner />
            </div>
          )}
        </div>

        {/* footer */}
        {showFooter && (
          <TableComponent.Footer
            ref={footerRef}
            style={{
              overflow: 'hidden',
            }}
          >
            {table.getFooterGroups().map((footerGroup) => (
              <TableComponent.Row
                key={footerGroup.id}
                style={{
                  width: table.getTotalSize(),
                  position: 'relative',
                }}
              >
                {footerGroup.headers.map((header) => (
                  <TableComponent.Head
                    key={header.id}
                    style={{
                      position: 'absolute',
                      left: header.getStart(),
                      width: header.getSize(),
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                      height: '100%',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </TableComponent.Head>
                ))}
              </TableComponent.Row>
            ))}
          </TableComponent.Footer>
        )}
      </ScrollArea>
    </TableComponent>
  )
}
