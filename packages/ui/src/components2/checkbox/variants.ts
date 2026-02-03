import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const checkboxVariants = swTwVariants({
  slots: {
    container: [
      'flex',
      'gap-sw-2xs',
      'items-center',
      'w-fit',
      'cursor-pointer',
    ],
    root: [
      'border',
      'border-base-400',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',
      'disabled:cursor-default',

      'transition-colors',
      'duration-200',
      'ease-in-out',
      'text-cta1-content',

      'hover:border-cta1-hover',

      // Checked & Indeterminate 상태 (배경색 채우기)
      'data-checked:bg-cta1',
      'data-checked:border-cta1',

      'data-indeterminate:bg-cta1',
      'data-indeterminate:border-cta1',

      'data-disabled:data-checked:bg-base-400',
      'data-disabled:data-checked:border-base-400',

      'will-change-transform',
      'transform-gpu',
    ],
    indicator: [
      'flex',
      'items-center',
      'justify-center',
      'text-current',
      'size-full',
    ],
    icon: ['size-full'],
    label: ['select-none'],
    description: ['text-sm', 'text-base-500'],
  },
  variants: {
    size: {
      sm: {
        root: ['size-4', 'rounded-sm'],
        icon: ['size-3'],
        label: ['text-paragraph-2', 'font-paragraph-2', 'leading-paragraph-2'],
      },
      md: {
        root: ['size-5', 'rounded-md'],
        icon: ['size-3.5'],
        label: ['text-heading-6', 'font-heading-6', 'leading-heading-6'],
      },
    },
    isInvalid: {
      true: {
        root: [
          'border-destructive',
          'data-checked:bg-destructive',
          'data-checked:border-destructive',
          'not-disabled:hover:border-destructive-hover',
        ],
        label: ['text-destructive'],
      },
    },
    isDisabled: {
      true: {
        container: ['pointer-events-none'],
        label: ['text-base-400'],
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

export const checkboxGroupVariants = swTwVariants({
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

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
export type CheckboxSlots = keyof ReturnType<typeof checkboxVariants>

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>
export type CheckboxGroupSlots = keyof ReturnType<typeof checkboxGroupVariants>
