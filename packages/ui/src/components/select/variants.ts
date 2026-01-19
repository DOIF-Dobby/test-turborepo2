import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const selectVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    trigger: [
      'group',
      'border',
      'border-base-400',
      'rounded-input-md',
      'flex',
      'justify-between',
      'gap-sw-2xs',
      'items-center',
      'outline-none',
      'data-[state=open]:border-cta1-hover',
      'data-[state=open]:border-2',
      'focus-within:border-cta1-hover',
      'focus-within:border-2',
      'hover:border-cta1-hover',
    ],
    label: [],
    labelIndicator: [],
    errorMessage: ['text-destructive'],
    value: ['truncate'],
    icon: ['group-data-[state=open]:rotate-180', 'duration-200'],
    content: ['bg-red-200', 'w-(--radix-select-trigger-width)'],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        trigger: ['min-h-sw-btn-md', 'py-sw-2xs px-sw-sm'],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
      },
      sm: {
        container: ['gap-sw-3xs'],
        trigger: ['min-h-sw-btn-sm', 'py-sw-3xs px-sw-sm'],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
      },
      xs: {
        container: ['gap-sw-3xs'],
        trigger: ['min-h-sw-btn-xs', 'py-sw-3xs px-sw-xs'],
        errorMessage: [
          'text-paragraph-4',
          'leading-paragraph-4',
          'font-paragraph-4',
        ],
      },
    },
    isInvalid: {
      true: {
        trigger: [
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

export type SelectVariants = VariantProps<typeof selectVariants>
export type SelectSlots = keyof ReturnType<typeof selectVariants>
