import { arrayToMap } from '@repo/utils/array'

export const AllowDays = [
  { value: 'allowMonday', label: '월' },
  { value: 'allowTuesday', label: '화' },
  { value: 'allowWednesday', label: '수' },
  { value: 'allowThursday', label: '목' },
  { value: 'allowFriday', label: '금' },
  { value: 'allowSaturday', label: '토' },
  { value: 'allowSunday', label: '일' },
] as const

export const AllowDaysMap = arrayToMap(AllowDays, 'value', 'label')
