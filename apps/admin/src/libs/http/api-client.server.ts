import { createBaseClient } from '@repo/http'
import { tokenManager } from '../token/token-manager'

export const serverApiClient = createBaseClient({
  prefixUrl: process.env.BACKEND_API_HOST,
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = await tokenManager.getAccessToken()

        if (accessToken) {
          request.headers.append('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
  },
})
