import { createTokenManager } from '@repo/next-utils/token'

export const tokenManager = createTokenManager({
  accessTokenName: 'sts-admin.access-token',
})
