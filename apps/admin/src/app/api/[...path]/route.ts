import { apiClient } from '@/libs/http/api-client'
import type { ApiResponse } from '@/types/api'
import { getApiUri, getHeaders } from '@repo/next-utils/route'
import { HTTPError } from 'ky'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * 공통 에러 핸들러
 */
async function handleError(error: unknown) {
  if (error instanceof HTTPError) {
    try {
      // 응답 바디가 비어있을 수 있으므로 try-catch로 감쌉니다.
      const errorData = await error.response.json<ApiResponse<null>>()
      return NextResponse.json(errorData, { status: error.response.status })
    } catch {
      return new NextResponse(null, { status: error.response.status })
    }
  }

  return NextResponse.json(
    { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' },
    { status: 500 },
  )
}

/**
 * GET 요청
 */
export async function GET(request: NextRequest) {
  try {
    const response = await apiClient.get(getApiUri(request), {
      searchParams: request.nextUrl.searchParams,
      headers: getHeaders(request),
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    return handleError(error)
  }
}

/**
 * POST 요청
 */
export async function POST(request: NextRequest) {
  try {
    // 본문이 없는 POST 요청도 있을 수 있으므로 방어 코드를 추가합니다.
    const body = await request.json().catch(() => undefined)

    const response = await apiClient.post(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    return handleError(error)
  }
}

/**
 * PUT 요청
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json().catch(() => undefined)

    const response = await apiClient.put(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    return handleError(error)
  }
}

/**
 * DELETE 요청
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json().catch(() => undefined)

    const response = await apiClient.delete(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    return handleError(error)
  }
}
