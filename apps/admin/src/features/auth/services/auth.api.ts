import { browserApiClient } from '@/libs/http/api-client.browser'
import type { UnitApiResponse } from '@/types/api'

export type LoginFormType = {
  username: string
  password: string
}

/**
 * 로그인 API
 */
export function login(data: LoginFormType) {
  return browserApiClient
    .post('auth/login', {
      json: data,
    })
    .json<UnitApiResponse>()
}

/**
 * 로그아웃 API
 */
export function logout() {
  return browserApiClient.post('auth/logout').json<UnitApiResponse>()
}
