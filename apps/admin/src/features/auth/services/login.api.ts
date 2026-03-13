import { apiClient } from '@/libs/http/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export type LoginFormType = {
  username: string
  password: string
}

export type TokenResponse = {
  accessToken: string
}

export function login(data: LoginFormType) {
  return apiClient
    .post('auth/login', {
      json: data,
    })
    .json<ApiSuccessResponse<TokenResponse>>()
}
