import { createGetQueryClient } from '@repo/query-utils'
import { apiClient } from '../http/api-client'

export const getQueryClient = createGetQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      queryFn: ({ queryKey }) => {
        const path = queryKey
          .filter((key) => key !== null && key !== undefined)
          .join('/')

        return apiClient.get(path).json()
      },
    },
  },
})
