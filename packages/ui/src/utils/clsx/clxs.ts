import { clsx, type ClassValue } from 'clsx'
import { swTwMerge } from '../tw-merge'

/**
 * Switchwon Tailwind Merge를 사용하여 clsx를 확장한 함수
 */
export function swClsx(...inputs: ClassValue[]) {
  return swTwMerge(clsx(inputs))
}
