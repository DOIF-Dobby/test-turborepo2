import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const radioGroupVariants = swTwVariants({
  slots: {
    root: ['flex', 'gap-sw-sm'],
  },
  variants: {
    orientation: {
      horizontal: {
        root: ['flex-row'],
      },
      vertical: {
        root: ['flex-col'],
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export const radioVariants = swTwVariants({
  slots: {
    container: [
      'flex',
      'gap-sw-2xs',
      'items-center',
      'w-fit',
      'cursor-pointer',
    ],
    root: [
      'aspect-square',
      'rounded-full',
      'border',
      'border-base-400',
      'flex',
      'items-center',
      'justify-center',
      'text-cta1',

      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',
      'disabled:cursor-default',

      'transition-colors',
      'duration-200',
      'ease-in-out',
      'text-cta1',

      'hover:border-cta1-hover',

      'data-checked:border-cta1',
      'data-checked:border-2',
      'data-disabled:opacity-50',

      'will-change-transform',
      'transform-gpu',
    ],
    indicator: ['flex', 'items-center', 'justify-center', 'text-current'],
    label: ['select-none'],
  },
  variants: {
    size: {
      sm: {
        root: ['size-4'],
        indicator: ['size-2'],
        label: ['text-sm'],
      },
      md: {
        root: ['size-5'],
        indicator: ['size-2.5'],
        label: ['text-base'],
      },
      lg: {
        root: ['size-6'],
        indicator: ['size-3'],
        label: ['text-lg'],
      },
    },
    isDisabled: {
      true: {
        container: ['pointer-events-none'],
        label: ['text-base-400'],
      },
    },
    isInvalid: {
      true: {
        root: [
          'border-destructive',
          'data-checked:border-destructive',
          'not-disabled:hover:border-destructive-hover',
          'text-destructive',
        ],
        label: ['text-destructive'],
      },
    },
    disableAnimation: {
      true: {
        root: ['transition-none', 'duration-0'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>
export type RadioGroupSlots = keyof ReturnType<typeof radioGroupVariants>

export type RadioVariants = VariantProps<typeof radioVariants>
export type RadioSlots = keyof ReturnType<typeof radioVariants>
