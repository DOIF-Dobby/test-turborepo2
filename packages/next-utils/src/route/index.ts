import type { NextRequest } from 'next/server'

/**
 * NextRequest에서 headers를 추출
 */
export function getHeaders(request: NextRequest) {
  const headers: { [key: string]: string } = {}

  request.headers.forEach((value, key) => {
    headers[key] = value
  })

  return headers
}

/**
 * NextRequest에서 uri를 추출
 */
export function getApiUri(request: NextRequest, prefix: string = '/api/') {
  const { pathname } = request.nextUrl
  return pathname.startsWith(prefix) ? pathname.replace(prefix, '') : pathname
}
