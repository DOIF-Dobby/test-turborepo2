export type AlgorithmType = 'HEDGING' | 'NORMAL'

export type AlgorithmResponse = {
  algorithmId: number
  algorithmKey: string
  algorithmName: string
  algorithmDescription: string
  algorithmType: AlgorithmType
}

export type AlgorithmParameterRuleResponse = {
  parameterRuleId: number
}
