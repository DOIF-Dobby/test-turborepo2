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
  return Promise.resolve([
    {
      algorithmId: 1,
      algorithmKey: 'algorithm1',
      algorithmName: 'Algorithm 1',
      algorithmDescription: 'Algorithm 1 description',
      algorithmType: 'NORMAL',
    },
    {
      algorithmId: 2,
      algorithmKey: 'algorithm2',
      algorithmName: 'Algorithm 2',
      algorithmDescription: 'Algorithm 2 description',
      algorithmType: 'HEDGING',
    },
  ])
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
