/**
 * 기본 API 응답 구조
 */
export interface ApiResponse<T = void> {
  code: string
  message: string
  data: T | null
}

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

export type UnitApiResponse = ApiResponse<void>
export type ContentApiResponse<T> = ApiResponse<Content<T>>
export type PageApiResponse<T> = ApiResponse<Page<T>>
