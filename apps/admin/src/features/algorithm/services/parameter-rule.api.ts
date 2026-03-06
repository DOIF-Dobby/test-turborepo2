import { apiClient } from '@/libs/http/api-client'
import type { UnitApiResponse } from '@/types/api'
import { nullIfEmpty } from '@repo/utils/string'
import type { ParameterType } from '../constants/domain'

/**
 * 알고리즘 파라미터 규칙 응답 타입
 */
export type AlgorithmParameterRuleResponse = {
  parameterRuleId: number
  algorithmId: number
  ruleKey: string
  ruleName: string
  ruleDescription: string
  parameterType: ParameterType
  upperBound: string
  lowerBound: string
}

export type ParameterRuleAddRequest = {
  ruleKey: string
  ruleName: string
  ruleDescription: string
  parameterType: ParameterType
  upperBound: string | null
  lowerBound: string | null
}

/**
 * 알고리즘 파라미터 규칙 추가 API
 */
export function addParameterRule(
  algorithmId: number,
  formData: ParameterRuleAddRequest,
) {
  const { upperBound, lowerBound, ...rest } = formData

  return apiClient
    .post(`algorithms/${algorithmId}/rules`, {
      json: {
        ...rest,
        upperBound: nullIfEmpty(upperBound),
        lowerBound: nullIfEmpty(lowerBound),
      },
    })
    .json<UnitApiResponse>()
}

export type ParameterRuleUpdateRequest = Omit<
  ParameterRuleAddRequest,
  'ruleKey'
>

/**
 * 알고리즘 파라미터 규칙 수정 API
 */
export function updateParameterRule(
  algorithmId: number,
  ruleId: number,
  formData: ParameterRuleUpdateRequest,
) {
  const { upperBound, lowerBound, ...rest } = formData

  return apiClient
    .put(`algorithms/${algorithmId}/rules/${ruleId}`, {
      json: {
        ...rest,
        upperBound: nullIfEmpty(upperBound),
        lowerBound: nullIfEmpty(lowerBound),
      },
    })
    .json<UnitApiResponse>()
}

/**
 * 알고리즘 파라미터 규칙 삭제 API
 */
export function removeParameterRule(algorithmId: number, ruleId: number) {
  return apiClient
    .delete(`algorithms/${algorithmId}/rules/${ruleId}`)
    .json<UnitApiResponse>()
}
