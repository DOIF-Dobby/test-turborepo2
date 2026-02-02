import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const datePickerVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    label: [],
    labelIndicator: [],
    errorMessage: ['text-destructive'],
    startIcon: [],
    openButton: ['group'],
    endIcon: ['group-aria-expanded:rotate-180'],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
        startIcon: ['size-6'],
        endIcon: ['size-6'],
        openButton: ['h-8', 'min-h-8', 'w-8', 'min-w-8', 'p-0'],
      },
      sm: {
        container: ['gap-sw-3xs'],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
        startIcon: ['size-5'],
        endIcon: ['size-5'],
        openButton: ['h-7', 'min-h-7', 'w-7', 'min-w-7', 'p-0'],
      },
      xs: {
        container: ['gap-sw-3xs'],
        errorMessage: [
          'text-paragraph-4',
          'leading-paragraph-4',
          'font-paragraph-4',
        ],
        startIcon: ['size-4'],
        endIcon: ['size-4'],
        openButton: ['h-6', 'min-h-6', 'w-6', 'min-w-6', 'p-0'],
      },
    },
    isDisabled: {
      true: {
        startIcon: ['stroke-base-500'],
      },
    },
    disableAnimation: {
      true: {
        endIcon: ['transition-none'],
      },
      false: {
        endIcon: ['transition-transform', 'duration-200'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type DatePickerVariants = VariantProps<typeof datePickerVariants>
export type DatePickerSlots = keyof ReturnType<typeof datePickerVariants>
