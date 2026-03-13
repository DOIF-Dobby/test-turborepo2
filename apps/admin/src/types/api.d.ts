export interface ApiSuccessResponse<T> {
  code: 'OK'
  message: string
  data: T
}

export interface ApiErrorResponse<T> {
  code: string
  message: string
  data: T | null
}

/**
 * 기본 API 응답 구조
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse<T>

/**
 * 리스트(Content) 응답 구조
 */
export interface Content<T> {
  content: T[]
}

/**
 * 페이지네이션(Page) 응답 구조
 */
export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export type UnitApiResponse = ApiSuccessResponse<Record<string, never> | null>
export type ContentApiResponse<T> = ApiSuccessResponse<Content<T>>
export type PageApiResponse<T> = ApiSuccessResponse<Page<T>>
