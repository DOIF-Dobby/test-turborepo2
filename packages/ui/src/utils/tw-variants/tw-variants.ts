import { createTV } from 'tailwind-variants'
import { swTheme } from '../tw-merge/theme'

/**
 * Switchwon theme를 사용하여 tailwind-variants를 생성하는 함수
 */
export const swTwVariants = createTV({
  twMergeConfig: {
    extend: {
      theme: swTheme,
    },
  },
})
