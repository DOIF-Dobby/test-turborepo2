import { createBaseClient } from '@repo/http'
import { isServer } from '@repo/utils/common'

const browserClient = createBaseClient({
  prefixUrl: '/api/',
})

const serverClient = createBaseClient({
  prefixUrl: process.env.BACKEND_API_HOST,
})

export const apiClient = isServer ? serverClient : browserClient
