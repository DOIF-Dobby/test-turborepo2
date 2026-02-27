import { apiClient } from '@/libs/http/api-client'
import type { ContentApiResponse } from '@/types/api'

/**
 * 알고리즘 타입
 */
export type AlgorithmType = 'HEDGING' | 'NORMAL'

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
export async function getAlgorithms(): Promise<AlgorithmResponse[]> {
  const response = await apiClient
    .get('algorithms')
    .json<ContentApiResponse<AlgorithmResponse>>()

  return response.data?.content ?? []
}

/**
 * 알고리즘 파라미터 규칙 응답 타입
 */
export type AlgorithmParameterRuleResponse = {
  parameterRuleId: number
}

/**
 * 알고리즘 파라미터 규칙 목록 조회 API
 */
export async function getAlgorithmParameterRules(): Promise<
  AlgorithmParameterRuleResponse[]
> {
  return Promise.resolve([
    {
      parameterRuleId: 1,
    },
  ])
}
