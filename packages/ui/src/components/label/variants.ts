import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const labelVariants = swTwVariants({
  slots: {
    label: [
      'flex',
      'gap-sw-4xs',
      'cursor-default',
      'peer-disabled:cursor-not-allowed peer-disabled:text-base-500',
    ],
    indicator: ['text-destructive'],
  },
  variants: {
    size: {
      md: {
        label: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      },
      sm: {
        label: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      },
      xs: {
        label: ['text-paragraph-3 font-paragraph-3 leading-paragraph-3'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type LabelVariants = VariantProps<typeof labelVariants>
export type LabelSlots = keyof ReturnType<typeof labelVariants>
