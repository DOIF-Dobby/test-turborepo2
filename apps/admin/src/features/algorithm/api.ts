import { apiClient } from '@/libs/http/api-client'
import type { ContentApiResponse, UnitApiResponse } from '@/types/api'
import type { AlgorithmType } from './constants'

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

/**
 * 알고리즘 목록 조회 API
 */
export async function getAlgorithms() {
  const response = await apiClient
    .get('algorithms')
    .json<ContentApiResponse<AlgorithmResponse>>()

  return response.data?.content ?? []
}

/**
 * 알고리즘 파라미터 규칙 응답 타입
 */
export type AlgorithmParameterRule = {
  parameterRuleId: number
}

/**
 * 알고리즘 파라미터 규칙 목록 조회 API
 */
export async function getAlgorithmParameterRules(): Promise<
  AlgorithmParameterRule[]
> {
  return Promise.resolve([
    {
      parameterRuleId: 1,
    },
  ])
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
  return apiClient
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
  return apiClient
    .put(`algorithms/${algorithmId}`, {
      json: formData,
    })
    .json<UnitApiResponse>()
}

/**
 * 알고리즘 삭제 API
 */
export function deleteAlgorithm(algorithmId: number) {
  return apiClient.delete(`algorithms/${algorithmId}`).json<UnitApiResponse>()
}
