'use client'

import { createContext, use } from 'react'
import type { ButtonProps } from '../button'
import type { paginationVariants } from './variants'

type PaginationContextType = {
  slots?: ReturnType<typeof paginationVariants>
  size?: ButtonProps['size']
}

export const PaginationContext = createContext<PaginationContextType>({
  slots: undefined,
  size: undefined,
})

export const usePaginationContext = () => use(PaginationContext)
