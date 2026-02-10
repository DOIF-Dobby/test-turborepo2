import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const comboboxVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col'],
    label: [],
    field: [
      'group',
      'border',
      'border-base-400',
      'flex',
      'justify-between',
      'gap-sw-2xs',
      'items-center',
      'outline-none',
      'cursor-pointer',

      'has-data-popup-open:border-cta1-hover',
      'has-data-popup-open:border-2',
      'has-data-popup-open:pointer-events-none',

      'has-focus-visible:border-cta1-hover',
      'has-focus-visible:border-2',

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
    input: ['w-full', 'outline-none'],
    trigger: [
      'size-5',
      'flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'text-base-700',
      'data-popup-open:rotate-180',
    ],
    triggerIcon: ['size-5'],
    clear: [
      'size-5',
      'flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'hover:bg-base-200',
      'rounded-full',
      'text-base-600',
    ],
    clearIcon: ['size-4'],
    content: [
      'w-(--anchor-width)',
      'max-w-(--available-width)',
      'max-h-(--available-height)',
      'bg-background',
      'border',
      'border-base-200',
      'rounded-input-md',
      'py-sw-2xs',
      'px-sw-2xs',
      'shadow-popover',
      'overflow-hidden',

      'data-[side=bottom]:[--y-initial:-8px]',
      'data-[side=bottom]:[--x-initial:0px]',
      'data-[side=top]:[--y-initial:8px]',
      'data-[side=top]:[--x-initial:0px]',
      'data-[side=right]:[--x-initial:-8px]',
      'data-[side=right]:[--y-initial:0px]',
      'data-[side=left]:[--x-initial:8px]',
      'data-[side=left]:[--y-initial:0px]',
    ],
    list: ['max-h-[min(300px,var(--available-height))]'],
    empty: [
      'p-sw-2xs',
      'text-base-600',
      'empty:m-0',
      'empty:p-0',
      'font-paragraph-2',
      'text-paragraph-2',
      'leading-paragraph-2',
    ],
    chips: ['flex', 'flex-wrap', 'items-center', 'gap-0.5', 'w-full'],
    chip: [
      'flex',
      'cursor-default',
      'text-paragraph-2',
      'font-paragraph-2',
      'leading-paragraph-2',
      'items-center',
      'gap-0.5',
      'rounded-lg',
      'bg-base-100',
      'px-sw-3xs',
      'py-sw-4xs',
      'outline-none',
      'border-base-300',
      'border',
    ],
    chipRemove: [
      'rounded-md',
      'p-0.5',
      'text-base-700',
      'hover:bg-base-200',
      'cursor-pointer',
    ],
    chipRemoveIcon: ['size-3'],
  },
  variants: {
    size: {
      md: {
        container: ['gap-sw-2xs'],
        field: ['min-h-sw-btn-md', 'py-sw-2xs px-sw-sm', 'rounded-input-md'],
      },
      sm: {
        container: ['gap-sw-3xs'],
        field: ['min-h-sw-btn-sm', 'py-sw-3xs px-sw-sm', 'rounded-input-sm'],
      },
    },
    isDisabled: {
      true: {},
    },
    disableAnimation: {
      true: {
        trigger: ['transition-none'],
      },
      false: {
        trigger: ['transition-transform', 'duration-200'],
      },
    },
    multiple: {
      true: {
        input: ['flex-1'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const comboboxItemVariants = swTwVariants({
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
  variants: {},
  defaultVariants: {},
})

export type ComboboxVariants = VariantProps<typeof comboboxVariants>
export type ComboboxSlots = keyof ReturnType<typeof comboboxVariants>

export type ComboboxItemVariants = VariantProps<typeof comboboxItemVariants>
export type ComboboxItemSlots = keyof ReturnType<typeof comboboxItemVariants>
