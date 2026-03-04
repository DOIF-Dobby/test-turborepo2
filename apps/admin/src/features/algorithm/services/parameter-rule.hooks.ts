import { useAdminMutation } from '@/hooks/use-admin-mutation'
import type { ContentApiResponse } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  addParameterRule,
  removeParameterRule,
  updateParameterRule,
  type AlgorithmParameterRuleResponse,
  type ParameterRuleAddRequest,
  type ParameterRuleUpdateRequest,
} from './parameter-rule.api'

/**
 * 알고리즘 파라미터 규칙 쿼리
 */
export const parameterRuleQueries = {
  rootKey: (algorithmId?: number) =>
    ['algorithms', algorithmId, 'rules'] as const,
  list: (algorithmId?: number) =>
    queryOptions({
      queryKey: parameterRuleQueries.rootKey(algorithmId),
      enabled: !!algorithmId,
      select: (response: ContentApiResponse<AlgorithmParameterRuleResponse>) =>
        response.data?.content,
    }),
}

/**
 * 알고리즘 파라미터 규칙 조회 훅
 */
export function useAlgorithmParameterRules(algorithmId?: number) {
  return useQuery(parameterRuleQueries.list(algorithmId))
}

/**
 * 알고리즘 파라미터 규칙 추가 훅
 */
export function useCreateParameterRule() {
  return useAdminMutation({
    mutationFn: ({
      algorithmId,
      data,
    }: {
      algorithmId: number
      data: ParameterRuleAddRequest
    }) => addParameterRule(algorithmId, data),
    invalidateKeys: ({ algorithmId }) => [
      parameterRuleQueries.rootKey(algorithmId),
    ],
    successTitle: '파라미터 규칙 추가 성공',
    errorTitle: '파라미터 규칙 추가 실패',
  })
}

/**
 * 알고리즘 파라미터 규칙 수정 훅
 */
export function useUpdateParameterRule() {
  return useAdminMutation({
    mutationFn: ({
      algorithmId,
      ruleId,
      data,
    }: {
      algorithmId: number
      ruleId: number
      data: ParameterRuleUpdateRequest
    }) => updateParameterRule(algorithmId, ruleId, data),
    invalidateKeys: ({ algorithmId }) => [
      parameterRuleQueries.rootKey(algorithmId),
    ],
    successTitle: '파라미터 규칙 수정 성공',
    errorTitle: '파라미터 규칙 수정 실패',
  })
}

/**
 * 알고리즘 파라미터 규칙 삭제 훅
 */
export function useDeleteParameterRule() {
  return useAdminMutation({
    mutationFn: ({
      algorithmId,
      ruleId,
    }: {
      algorithmId: number
      ruleId: number
    }) => removeParameterRule(algorithmId, ruleId),
    invalidateKeys: ({ algorithmId }) => [
      parameterRuleQueries.rootKey(algorithmId),
    ],
    successTitle: '파라미터 규칙 삭제 성공',
    errorTitle: '파라미터 규칙 삭제 실패',
  })
}
