import { serverApiClient } from '@/libs/http/api-client.server'
import { handleError } from '@/libs/http/handle-error'
import { tokenManager } from '@/libs/token/token-manager'
import type { ApiSuccessResponse, UnitApiResponse } from '@/types/api'
import type { TokenResponse } from '@/types/auth'
import { getApiUri, getHeaders } from '@repo/next-utils/route'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * 로그인 처리
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => undefined)

    const response = await serverApiClient.post(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    const responseBody =
      await response.json<ApiSuccessResponse<TokenResponse>>()

    // cookie에 토큰 저장
    const { data } = responseBody
    await tokenManager.setAccessToken(data.accessToken)

    const returnResponseBody: UnitApiResponse = {
      code: 'OK',
      message: 'Login Succeed',
      data: null,
    }

    return new NextResponse(JSON.stringify(returnResponseBody), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return handleError(error)
  }
}
