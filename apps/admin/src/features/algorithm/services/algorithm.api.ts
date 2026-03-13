import { browserApiClient } from '@/libs/http/api-client.browser'
import type { UnitApiResponse } from '@/types/api'
import type { AlgorithmType } from '../constants/domain'

/**
 * 알고리즘 응답 타입
 */
export type AlgorithmResponse = {
  algorithmId: number
  algorithmKey: string
  algorithmName: string
  algorithmDescription: string
  algorithmType: AlgorithmType
}

type AlgorithmCreateRequest = {
  algorithmKey: string
  algorithmName: string
  algorithmDescription: string
  algorithmType: AlgorithmType
}

/**
 * 알고리즘 추가 API
 */
export function createAlgorithm(formData: AlgorithmCreateRequest) {
  return browserApiClient
    .post('algorithms', {
      json: formData,
    })
    .json<UnitApiResponse>()
}

export type AlgorithmUpdateRequest = {
  algorithmName: string
  algorithmDescription: string
}

/**
 * 알고리즘 수정 API
 */
export function updateAlgorithm(
  algorithmId: number,
  formData: AlgorithmUpdateRequest,
) {
  return browserApiClient
    .put(`algorithms/${algorithmId}`, {
      json: formData,
    })
    .json<UnitApiResponse>()
}

/**
 * 알고리즘 삭제 API
 */
export function deleteAlgorithm(algorithmId: number) {
  return browserApiClient
    .delete(`algorithms/${algorithmId}`)
    .json<UnitApiResponse>()
}
