import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const spinnerVariants = swTwVariants({
  slots: {
    root: ['relative', 'inline-flex', 'justify-center', 'items-center'],
  },
  variants: {
    size: {
      xs: { root: ['size-4'] },
      sm: { root: ['size-5'] },
      md: { root: ['size-6'] },
      lg: { root: ['size-7'] },
      xl: { root: ['size-8'] },
    },
    color: {
      current: { root: ['text-current'] },
      cta1: { root: ['text-cta1'] },
      cta2: { root: ['text-cta2'] },
      destructive: { root: ['text-destructive'] },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
})

export type SpinnerVariants = VariantProps<typeof spinnerVariants>
export type SpinnerSlots = keyof ReturnType<typeof spinnerVariants>
