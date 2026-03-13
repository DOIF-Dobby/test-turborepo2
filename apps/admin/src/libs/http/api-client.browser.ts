import type { ApiErrorResponse } from '@/types/api'
import { createBaseClient } from '@repo/http'
import { ApiError } from './api-error'

export const browserApiClient = createBaseClient({
  prefixUrl: '/api/',
  hooks: {
    beforeError: [
      async (error) => {
        const { response, request, options } = error

        if (response.status === 401) {
          const callbackUrl = encodeURIComponent(window.location.pathname)
          window.location.replace(`/login?callbackUrl=${callbackUrl}`)
          return error
        }

        if (response && response.body) {
          try {
            const errorData = await response.json<ApiErrorResponse<null>>()

            return new ApiError(response, request, options, errorData)
          } catch {
            // JSON 파싱에 실패하면 그냥 원래 error 반환
          }
        }
        return error
      },
    ],
  },
})
