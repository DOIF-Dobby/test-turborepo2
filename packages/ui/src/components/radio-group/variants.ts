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
    container: ['group', 'flex', 'items-center', 'gap-2'],
    root: [
      // ... 기존 스타일 유지 ...
      'peer',
      'aspect-square',
      'shrink-0',
      'cursor-pointer',
      'rounded-full',
      'border',
      'border-base-400',
      'flex',
      'items-center',
      'justify-center',
      'text-cta1',

      // Focus
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',

      // Disabled
      'disabled:cursor-default',
      'disabled:opacity-50',

      // Not Disabled
      'not-disabled:hover:border-cta1-hover',

      // Checked State
      'data-[state=checked]:border-cta1',
      'data-[state=checked]:border-2',

      'will-change-transform',
      'transform-gpu',
    ],
    indicator: ['flex', 'items-center', 'justify-center', 'text-current'],
    label: [
      'cursor-pointer',
      'select-none',
      'text-base-900',
      'peer-disabled:cursor-default',
      'peer-disabled:opacity-50',
    ],
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
    isInvalid: {
      true: {
        root: [
          'border-destructive',
          'data-[state=checked]:border-destructive',
          'not-disabled:hover:border-destructive-hover',
          'text-destructive',
        ],
        label: ['text-destructive'],
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
