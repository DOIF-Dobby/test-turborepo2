import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const dateFieldVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    label: [],
    labelIndicator: [],
    errorMessage: ['text-destructive'],
    fieldWrapper: [
      'border',
      'border-base-400',
      'flex',
      'items-center',
      'gap-sw-2xs',
      'focus-within:border-cta1-hover',
      'focus-within:border-2',
      'hover:border-cta1-hover',
    ],
    segmentWrapper: ['w-full'],
    segment: [
      'outline-none',
      'rounded-sm',
      'text-base-800',
      'focus:bg-base-200',
      'focus:text-base-700',
      'data-[literal=false]:p-sw-4xs',
      'data-[literal=true]:pr-sw-4xs',
      'data-[literal=true]:text-base-600',
      'data-[placeholder=true]:text-base-500',
    ],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        fieldWrapper: [
          'min-h-sw-btn-md',
          'py-sw-2xs px-sw-sm',
          'rounded-input-md',
        ],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
        segment: ['text-heading-5', 'font-heading-5', 'leading-heading-5'],
      },
      sm: {
        container: ['gap-sw-3xs'],
        fieldWrapper: [
          'min-h-sw-btn-sm',
          'py-sw-3xs px-sw-sm',
          'rounded-input-sm',
        ],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
        segment: [
          'text-paragraph-1',
          'font-paragraph-1',
          'leading-paragraph-1',
        ],
      },
      xs: {
        container: ['gap-sw-3xs'],
        fieldWrapper: [
          'min-h-sw-btn-xs',
          'py-sw-3xs px-sw-xs',
          'rounded-input-xs',
        ],
        errorMessage: [
          'text-paragraph-4',
          'leading-paragraph-4',
          'font-paragraph-4',
        ],
        segment: [
          'text-paragraph-3',
          'font-paragraph-3',
          'leading-paragraph-3',
        ],
      },
    },
    isDisabled: {
      true: {
        fieldWrapper: ['bg-base-100', 'pointer-events-none'],
        segment: ['text-base-500'],
      },
    },
    isInvalid: {
      true: {
        fieldWrapper: [
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

export type DateFieldVariants = VariantProps<typeof dateFieldVariants>
export type DateFieldSlots = keyof ReturnType<typeof dateFieldVariants>
