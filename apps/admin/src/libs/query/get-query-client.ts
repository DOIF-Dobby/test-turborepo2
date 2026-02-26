import { createGetQueryClient } from '@repo/query-utils'

export const getQueryClient = createGetQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})
