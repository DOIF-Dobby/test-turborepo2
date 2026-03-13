import { serverApiClient } from '@/libs/http/api-client.server'
import { handleError } from '@/libs/http/handle-error'
import { getApiUri, getHeaders } from '@repo/next-utils/route'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * GET 요청
 */
export async function GET(request: NextRequest) {
  try {
    const response = await serverApiClient.get(getApiUri(request), {
      searchParams: request.nextUrl.searchParams,
      headers: getHeaders(request),
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
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

    const response = await serverApiClient.post(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
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

    const response = await serverApiClient.put(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
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

    const response = await serverApiClient.delete(getApiUri(request), {
      headers: getHeaders(request),
      json: body,
    })

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return handleError(error)
  }
}
