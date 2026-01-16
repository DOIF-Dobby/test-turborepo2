import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const inputVariants = swTwVariants({
  base: [
    'flex',
    'w-full',
    'bg-transparent',
    'outline-none',
    'focus-visible:outline-none',
    'placeholder:text-base-500',
    'text-base-800',
    'disabled:text-base-500',
  ],
  variants: {
    size: {
      md: 'text-heading-5 font-heading-5 leading-heading-5',
      sm: 'text-paragraph-1 font-paragraph-1 leading-paragraph-1',
      xs: 'text-paragraph-3 font-paragraph-3 leading-paragraph-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
