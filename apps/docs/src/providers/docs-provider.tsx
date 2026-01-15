'use client'

import { useUIStore } from '@/stores/ui-store'
import { UIProvider } from '@repo/ui/providers'

interface DocsProvidersProps {
  children: React.ReactNode
}

export function DocsProviders({ children }: DocsProvidersProps) {
  const uiStore = useUIStore()

  return (
    <UIProvider disableAnimation={uiStore.disableAnimation}>
      {children}
    </UIProvider>
  )
}
