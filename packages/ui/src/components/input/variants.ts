import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const inputVariants = swTwVariants({
  base: [],
  variants: {
    color: {
      cta1: '',
      cat2: '',
      destructive: '',
    },
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
