import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const textFieldVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    inputWrapper: [
      'border',
      'border-base-400',
      'flex',
      'gap-sw-2xs',
      'items-center',
      'focus-within:border-cta1-hover',
      'focus-within:border-2',
      'hover:border-cta1-hover',
    ],
    input: [],
    label: [],
    labelIndicator: [],
    clearButton: [
      'rounded-full',
      'size-5',
      'min-h-5',
      'min-w-5',
      'p-0',
      'bg-base-500',
      'hover:bg-base-600',
      'data-[pressed=true]:bg-base-700',
    ],
    errorMessage: ['text-destructive'],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        inputWrapper: [
          'min-h-sw-btn-md',
          'py-sw-2xs px-sw-sm',
          'rounded-input-md',
        ],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
      },
      sm: {
        container: ['gap-sw-3xs'],
        inputWrapper: [
          'min-h-sw-btn-sm',
          'py-sw-3xs px-sw-sm',
          'rounded-input-sm',
        ],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
      },
      xs: {
        container: ['gap-sw-3xs'],
        inputWrapper: [
          'min-h-sw-btn-xs',
          'py-sw-3xs px-sw-xs',
          'rounded-input-xs',
        ],
        errorMessage: [
          'text-paragraph-4',
          'leading-paragraph-4',
          'font-paragraph-4',
        ],
      },
    },
    isDisabled: {
      true: {
        inputWrapper: ['bg-base-100', 'pointer-events-none'],
        label: ['text-base-500'],
      },
    },
    isInvalid: {
      true: {
        inputWrapper: [
          'border-destructive',
          'border-2',
          'hover:border-destructive',
          'focus-within:border-destructive',
        ],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type TextFieldVariants = VariantProps<typeof textFieldVariants>
export type TextFieldSlots = keyof ReturnType<typeof textFieldVariants>
