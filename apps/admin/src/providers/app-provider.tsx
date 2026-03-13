'use client'

import { browserQueryClient } from '@/libs/query/query-client.browser'
import { UIProvider } from '@repo/ui/providers'
import { QueryClientProvider } from '@tanstack/react-query'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={browserQueryClient()}>
      <UIProvider>{children}</UIProvider>
    </QueryClientProvider>
  )
}
