import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

type CreateTokenManagerOptions = {
  accessTokenName: string
}

export function createTokenManager(options: CreateTokenManagerOptions) {
  const { accessTokenName } = options

  return {
    setAccessToken: async (token: string) => {
      const decoded = jwtDecode(token)
      const expires = decoded.exp ? new Date(decoded.exp * 1000) : undefined
      const cookieStore = await cookies()

      cookieStore.set(accessTokenName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires,
      })
    },

    getAccessToken: async () => {
      const cookieStore = await cookies()
      return cookieStore.get(accessTokenName)?.value ?? null
    },

    clearAccessToken: async () => {
      const cookieStore = await cookies()
      cookieStore.delete(accessTokenName)
    },
  }
}
