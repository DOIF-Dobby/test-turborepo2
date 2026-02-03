'use client'

import { type DocsStore, createDocsStore } from '@/stores/docs-store'
import { UIProvider } from '@repo/ui/providers'
import { type ReactNode, createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

export type DocsStoreApi = ReturnType<typeof createDocsStore>
export const DocsStoreContext = createContext<DocsStoreApi | undefined>(
  undefined,
)

interface DocsProvidersProps {
  children: ReactNode
}

export function DocsProviders({ children }: DocsProvidersProps) {
  const storeRef = useRef<DocsStoreApi>(createDocsStore())

  return (
    <DocsStoreContext value={storeRef.current}>{children}</DocsStoreContext>
  )
}

export function DocsUIProviderWrapper({ children }: { children: ReactNode }) {
  const disableAnimation = useDocsStore((state) => state.disableAnimation)

  return <UIProvider disableAnimation={disableAnimation}>{children}</UIProvider>
}

export function useDocsStore<T>(selector: (store: DocsStore) => T): T {
  const docsStoreContext = useContext(DocsStoreContext)

  if (!docsStoreContext) {
    throw new Error(`useDocsStore must be used within DocsProviders`)
  }

  return useStore(docsStoreContext, selector)
}
