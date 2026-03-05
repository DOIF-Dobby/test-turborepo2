import type { ApiResponse } from '@/types/api'
import {
  HTTPError,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
} from 'ky'

export class ApiError<T = unknown> extends HTTPError<T> {
  errorData: ApiResponse<T>

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
    errorData: ApiResponse<T>,
  ) {
    super(response, request, options)
    this.name = 'ApiError'
    this.errorData = errorData
  }
}
