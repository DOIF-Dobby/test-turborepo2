'use client'

import { createContext, use } from 'react'
import type { TableRenderType } from './type'
import type { tableVariants } from './variants'

type TableContextType = {
  slots?: ReturnType<typeof tableVariants>
  renderAs: TableRenderType
}

export const TableContext = createContext<TableContextType>({
  slots: undefined,
  renderAs: 'table',
})

export const useTableContext = () => use(TableContext)
