import type { ApiResponse } from '@/types/api'
import { HTTPError } from 'ky'
import { NextResponse } from 'next/server'
import { tokenManager } from '../token/token-manager'

/**
 * 공통 에러 핸들러
 */
export async function handleError(error: unknown) {
  if (error instanceof HTTPError) {
    const { status } = error.response

    try {
      const errorData = await error.response.json<ApiResponse<null>>()

      if (status === 401) {
        await tokenManager.clearAccessToken()
      }

      return NextResponse.json(errorData, { status })
    } catch {
      return new NextResponse(null, { status })
    }
  }

  return NextResponse.json(
    {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
      data: null,
    },
    { status: 500 },
  )
}
