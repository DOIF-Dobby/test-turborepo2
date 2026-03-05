import type { ApiResponse } from '@/types/api'
import { createBaseClient } from '@repo/http'
import { isServer } from '@repo/utils/common'
import { ApiError } from './api-error'

const browserClient = createBaseClient({
  prefixUrl: '/api/',
  hooks: {
    beforeError: [
      async (error) => {
        const { response, request, options } = error

        if (response && response.body) {
          try {
            const errorData = await response.json<ApiResponse<null>>()

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

const serverClient = createBaseClient({
  prefixUrl: process.env.BACKEND_API_HOST,
})

export const apiClient = isServer ? serverClient : browserClient
