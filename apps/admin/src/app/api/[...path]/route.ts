import { apiClient } from '@/libs/http/api-client'
import { getApiUri, getHeaders } from '@repo/next-utils/route'
import { HTTPError } from 'ky'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * GET 요청
 */
export async function GET(request: NextRequest) {
  const uri = getApiUri(request)
  const headers = getHeaders(request)

  try {
    const response = await apiClient.get(uri, {
      searchParams: request.nextUrl.searchParams,
      headers,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    // 1. 서버 응답 에러 (4xx, 5xx)인 경우
    if (error instanceof HTTPError) {
      const status = error.response.status
      const errorData = await error.response.json()

      return NextResponse.json(errorData, { status })
    }

    // 2. 그 외 에러 (네트워크 오류 등)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
