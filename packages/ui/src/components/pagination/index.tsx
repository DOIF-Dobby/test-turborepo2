import { PaginationContent } from './pagination-content'
import { PaginationFirst } from './pagination-first'
import { PaginationItem } from './pagination-item'
import { PaginationLast } from './pagination-last'
import { PaginationLink } from './pagination-link'
import { PaginationNext } from './pagination-next'
import { PaginationPrevious } from './pagination-previous'
import { PaginationRoot } from './pagination-root'

export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  First: PaginationFirst,
  Last: PaginationLast,
})
