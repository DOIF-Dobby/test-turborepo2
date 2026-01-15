import { createContext, use } from 'react'

export const CollapsibleContext = createContext<{ isOpen: boolean } | null>(
  null,
)

export function useCollapsibleContext() {
  const context = use(CollapsibleContext)
  if (!context) {
    throw new Error('CollapsibleContent must be used within a Collapsible')
  }
  return context
}
