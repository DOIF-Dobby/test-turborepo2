import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const selectVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    trigger: [
      'group',
      'border',
      'border-base-400',
      'flex',
      'justify-between',
      'gap-sw-2xs',
      'items-center',
      'outline-none',
      'cursor-pointer',

      'data-popup-open:border-cta1-hover',
      'data-popup-open:border-2',
      'data-popup-open:pointer-events-none',

      'focus-visible:border-cta1-hover',
      'focus-visible:border-2',

      'hover:border-cta1-hover',
      'text-base-800',
      'data-placeholder:text-base-500',

      'data-invalid:border-destructive',
      'data-invalid:border-2',
      'data-invalid:hover:border-destructive',
      'data-invalid:focus-within:border-destructive',
      'data-invalid:hover:border-destructive',
      'data-invalid:focus-within:border-destructive',
      'data-invalid:data-open:border-destructive',
    ],
    label: [],
    description: [],
    errorMessage: ['text-destructive'],
    value: ['truncate'],
    iconWrapper: ['data-popup-open:rotate-180'],
    icon: ['text-base-700'],
    content: [
      'w-(--anchor-width)',
      'bg-background',
      'border',
      'border-base-200',
      'rounded-input-md',
      'py-sw-2xs',
      'px-sw-2xs',
      'shadow-popover',
      'max-h-(--available-height)',
      'overflow-hidden',

      'data-[side=bottom]:[--y-initial:-8px] data-[side=bottom]:[--x-initial:0px]',
      'data-[side=top]:[--y-initial:8px] data-[side=top]:[--x-initial:0px]',
      'data-[side=right]:[--x-initial:-8px] data-[side=right]:[--y-initial:0px]',
      'data-[side=left]:[--x-initial:8px] data-[side=left]:[--y-initial:0px]',
    ],
    contentList: [
      'relative',
      'scroll-py-6',
      'overflow-y-auto',
      'max-h-[300px]',
    ],
    clearButton: [
      'hover:bg-base-200',
      'text-base-600',
      'cursor-pointer',
      'rounded-full',
      'p-0.5',
      'transition-colors',

      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',
    ],
    clearIcon: ['size-4'],
    scrollUpArrow: [
      'top-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-md  text-center text-xs text-base-600',
    ],
    scrollDownArrow: [
      'bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-md text-center text-xs text-base-600',
    ],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        trigger: ['min-h-sw-btn-md', 'py-sw-2xs px-sw-sm', 'rounded-input-md'],
        value: ['text-heading-5', 'font-heading-5', 'leading-heading-5'],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
        icon: ['size-5'],
      },
      sm: {
        container: ['gap-sw-3xs'],
        trigger: ['min-h-sw-btn-sm', 'py-sw-3xs px-sw-sm', 'rounded-input-sm'],
        value: ['text-paragraph-1', 'font-paragraph-1', 'leading-paragraph-1'],
        errorMessage: [
          'text-paragraph-2',
          'leading-paragraph-2',
          'font-paragraph-2',
        ],
        icon: ['size-4'],
      },
    },
    isDisabled: {
      true: {
        trigger: ['bg-base-100', 'pointer-events-none'],
        value: ['text-base-500'],
        label: ['text-base-500'],
        icon: ['text-base-500'],
      },
    },
    disableAnimation: {
      true: {
        iconWrapper: ['transition-none'],
      },
      false: {
        iconWrapper: ['transition-transform', 'duration-200'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const selectItemVariants = swTwVariants({
  slots: {
    item: [
      'py-sw-2xs',
      'px-sw-2xs',
      'rounded-lg',
      'outline-none',
      'data-highlighted:bg-base-200',
      'cursor-pointer',
      'flex',
      'items-center',
      'justify-between',
      'gap-sw-2xs',
    ],
    itemText: [
      'text-paragraph-2',
      'font-paragraph-2',
      'leading-paragraph-2',
      'text-base-700',
      'truncate',
    ],
    itemIndicator: ['text-base-700'],
  },
})

export type SelectVariants = VariantProps<typeof selectVariants>
export type SelectSlots = keyof ReturnType<typeof selectVariants>

export type SelectItemVariants = VariantProps<typeof selectItemVariants>
export type SelectItemSlots = keyof ReturnType<typeof selectItemVariants>
