import type { ApiErrorResponse } from '@/types/api'
import {
  HTTPError,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
} from 'ky'

export class ApiError<T = unknown> extends HTTPError<T> {
  errorData: ApiErrorResponse<T>

  constructor(
    response: KyResponse,
    request: KyRequest,
    options: NormalizedOptions,
    errorData: ApiErrorResponse<T>,
  ) {
    super(response, request, options)
    this.name = 'ApiError'
    this.errorData = errorData
  }
}
