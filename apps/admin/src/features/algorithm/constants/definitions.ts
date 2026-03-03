import { arrayToMap } from '@repo/utils/array'

export const ALGORITHM_TYPES = [
  { value: 'NORMAL', label: '일반' },
  { value: 'HEDGING', label: '헷징' },
] as const

export const ALGORITHM_TYPES_MAP = arrayToMap(ALGORITHM_TYPES, 'value', 'label')

/**
 * 알고리즘 타입
 */
export type AlgorithmType = (typeof ALGORITHM_TYPES)[number]['value']
