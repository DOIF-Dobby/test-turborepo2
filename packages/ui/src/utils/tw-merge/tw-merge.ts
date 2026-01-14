import { extendTailwindMerge } from 'tailwind-merge'
import { swTheme } from './theme'

/**
 * Switchwon theme를 사용하여 tailwind-merge를 확장한 함수
 */
export const swTwMerge = extendTailwindMerge({
  extend: {
    theme: swTheme,
  },
})
