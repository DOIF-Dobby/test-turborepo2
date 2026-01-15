import { createContext, use } from 'react'

type CollapsibleContentType = {
  isOpen: boolean
}

export const CollapsibleContext = createContext<CollapsibleContentType>({
  isOpen: false,
})

export const useCollapsibleContext = () => use(CollapsibleContext)
