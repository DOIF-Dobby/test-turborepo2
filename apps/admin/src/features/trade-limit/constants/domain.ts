import { arrayToMap } from '@repo/utils/array'

export const GlobalPeriodLimitTargetTypes = [
  { value: 'ALL', label: '전체 거래' },
  { value: 'AUTO', label: '자동 거래' },
  { value: 'MANUAL', label: '수동 거래' },
] as const

export const GlobalPeriodLimitTargetTypeMap = arrayToMap(
  GlobalPeriodLimitTargetTypes,
  'value',
  'label',
)

export type GlobalPeriodLimitTargetType =
  (typeof GlobalPeriodLimitTargetTypes)[number]['value']
