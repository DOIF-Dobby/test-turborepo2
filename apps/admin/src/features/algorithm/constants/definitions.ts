import { arrayToMap } from '@repo/utils/array'

export const AlgorithmTypes = [
  { value: 'NORMAL', label: '일반' },
  { value: 'HEDGING', label: '헷징' },
] as const

export const AlgorithmTypesMap = arrayToMap(AlgorithmTypes, 'value', 'label')

/**
 * 알고리즘 타입
 */
export type AlgorithmType = (typeof AlgorithmTypes)[number]['value']

export const ParameterTypes = [
  { value: 'INT', label: 'INT' },
  { value: 'DECIMAL', label: 'DECIMAL' },
  { value: 'STRING', label: 'STRING' },
  { value: 'BOOLEAN', label: 'BOOLEAN' },
] as const

export type ParameterType = (typeof ParameterTypes)[number]['value']
