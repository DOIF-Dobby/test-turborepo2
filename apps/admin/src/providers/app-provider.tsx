'use client'

import { browserQueryClient } from '@/libs/query/query-client.browser'
import { UIProvider } from '@repo/ui/providers'
import { QueryClientProvider } from '@tanstack/react-query'
import { UnauthorizedHandler } from './unauthorized-handler'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={browserQueryClient()}>
      <UIProvider>
        {children}
        <UnauthorizedHandler />
      </UIProvider>
    </QueryClientProvider>
  )
}
