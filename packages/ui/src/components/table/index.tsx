import { TableBody } from './table-body'
import { TableCell } from './table-cell'
import { TableFooter } from './table-footer'
import { TableHead } from './table-head'
import { TableHeaderGroup } from './table-header-group'
import { TableHeaderRow } from './table-header-row'
import { TableRoot } from './table-root'
import { TableRow } from './table-row'

export const Table = Object.assign(TableRoot, {
  HeaderGroup: TableHeaderGroup,
  HeaderRow: TableHeaderRow,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Footer: TableFooter,
})
