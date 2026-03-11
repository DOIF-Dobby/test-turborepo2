import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const toggleVariants = swTwVariants({
  slots: {
    toggle: [
      'inline-flex',
      'bg-base-0',
      'border',
      'border-base-200',
      'px-sw-2xs',
      'py-sw-4xs',
      'rounded-md',
      'cursor-pointer',
      'data-pressed:bg-base-200',
      'h-fit',
    ],
    indicator: [],
  },
  variants: {
    motionAnimation: {
      true: {
        toggle: [
          'relative',
          'border-0',
          'bg-transparent',
          'text-base-500',
          'data-pressed:text-base-800',
        ],
        indicator: [
          'absolute',
          'inset-0',
          'z-0',
          'rounded-md',
          'bg-background',
          'shadow-md',
        ],
      },
    },
  },
  defaultVariants: {},
})

export const toggleGroupVariants = swTwVariants({
  base: [
    'inline-flex',
    'h-fit',
    'data-[orientation=horizontal]:flex-row',
    'data-[orientation=vertical]:flex-col',
  ],
  variants: {
    motionAnimation: {
      true: ['rounded-md', 'bg-base-200', 'p-sw-3xs'],
    },
  },
})

export type ToggleVariants = VariantProps<typeof toggleVariants>
export type ToggleSlots = keyof ReturnType<typeof toggleVariants>

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>
