import { createGetQueryClient } from '@repo/query-utils'
import type { KyInstance } from 'ky'

export function createQueryClient(client: KyInstance) {
  return createGetQueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 10,
        queryFn: ({ queryKey }) => {
          const path = queryKey
            .filter((key) => key !== null && key !== undefined)
            .join('/')
          return client.get(path).json()
        },
      },
    },
  })
}
