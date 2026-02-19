import { TableBody } from './table-body'
import { TableCell } from './table-cell'
import { TableFooter } from './table-footer'
import { TableHead } from './table-head'
import { TableHeader } from './table-header'
import { TableRoot } from './table-root'
import { TableRow } from './table-row'

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Footer: TableFooter,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
})
