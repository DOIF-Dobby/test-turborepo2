/**
 * 알고리즘 파라미터 규칙 응답 타입
 */
export type AlgorithmParameterRuleResponse = {
  parameterRuleId: number
  algorithmId: number
  ruleKey: string
  ruleName: string
  ruleDescription: string
  parameterType: string
  upperBound: string
  lowerBound: string
}
