'use client'

import { getQueryClient } from '@/libs/query/get-query-client'
import { UIProvider } from '@repo/ui/providers'
import { QueryClientProvider } from '@tanstack/react-query'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <UIProvider>{children}</UIProvider>
    </QueryClientProvider>
  )
}
