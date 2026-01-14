'use client'

import { useUIStore } from '@/stores/ui-store'
import { UIProvider } from '@repo/ui/providers'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const uiStore = useUIStore()

  return (
    <UIProvider disableAnimation={uiStore.disableAnimation}>
      {children}
    </UIProvider>
  )
}
