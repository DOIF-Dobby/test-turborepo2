import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const textFieldVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    inputWrapper: [
      'border',
      'border-base-400',
      'rounded-input-md',
      'flex',
      'gap-sw-3xs',
      'items-center',
      'focus-within:border-cta1-hover',
      'focus-within:border-2',
      'hover:border-cta1-hover',
    ],
    input: [],
    label: [],
    labelIndicator: [],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        inputWrapper: ['min-h-sw-btn-md', 'py-sw-2xs px-sw-sm'],
      },
      sm: {
        container: ['gap-sw-3xs'],
        inputWrapper: ['min-h-sw-btn-sm', 'py-sw-3xs px-sw-sm'],
      },
      xs: {
        container: ['gap-sw-3xs'],
        inputWrapper: ['min-h-sw-btn-xs', 'py-sw-3xs px-sw-xs'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type TextFieldVariants = VariantProps<typeof textFieldVariants>
export type TextFieldSlots = keyof ReturnType<typeof textFieldVariants>
