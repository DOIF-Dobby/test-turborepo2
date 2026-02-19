'use client'

import { ScrollArea } from '@repo/ui/components/scroll-area'
import { Table as TableComponent } from '@repo/ui/components/table'
import {
  flexRender,
  type Row,
  type RowData,
  type Table,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'

type Props = Omit<React.ComponentProps<typeof TableComponent>, 'renderAs'>

interface AppTableProps<TData extends RowData> extends Props {
  table: Table<TData>
  rowHeight?: number
  showFooter?: boolean
}

export function AppTable<TData extends RowData>(props: AppTableProps<TData>) {
  const { table, rowHeight = 52, showFooter = false, ...otherProps } = props

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

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    let ticking = false // 프레임 제어용 플래그

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (headerRef.current) {
            headerRef.current.scrollLeft = scrollElement.scrollLeft
          }
          if (footerRef.current) {
            footerRef.current.scrollLeft = scrollElement.scrollLeft
          }
          ticking = false
        })
        ticking = true
      }
    }

    scrollElement.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <TableComponent
      {...otherProps}
      renderAs="div"
      style={{
        overflow: 'hidden',
        ...otherProps.style,
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
            {headerGroup.headers.map((header) => (
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
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableComponent.Head>
            ))}
          </TableComponent.HeaderRow>
        ))}
      </TableComponent.HeaderGroup>

      {/* body */}
      <ScrollArea
        viewportRef={scrollRef}
        orientation="both"
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
            const row = rows[virtualRow.index] as Row<TData>

            return (
              <TableComponent.Row
                key={row.id}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableComponent.Cell
                    key={cell.id}
                    style={{
                      position: 'absolute',
                      width: cell.column.getSize(),
                      left: cell.column.getStart(),
                      height: '100%',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableComponent.Cell>
                ))}
              </TableComponent.Row>
            )
          })}
        </TableComponent.Body>
      </ScrollArea>

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
    </TableComponent>
  )
}
