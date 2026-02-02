import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const dropdownContentVariants = swTwVariants({
  slots: {
    content: [
      'bg-background',
      'rounded-input-md',
      'shadow-popover',
      'py-sw-2xs',
      'px-sw-2xs',
      'border',
      'border-base-200',

      'focus-visible:outline-none',

      'data-[side=bottom]:[--y-initial:-8px] data-[side=bottom]:[--x-initial:0px]',
      'data-[side=top]:[--y-initial:8px] data-[side=top]:[--x-initial:0px]',
      'data-[side=right]:[--x-initial:-8px] data-[side=right]:[--y-initial:0px]',
      'data-[side=left]:[--x-initial:8px] data-[side=left]:[--y-initial:0px]',
    ],
    arrow: ['fill-background', 'drop-shadow-popover-arrow'],
  },
})

export const dropdownRadioGroupVariants = swTwVariants({
  base: ['flex', 'flex-col', 'gap-sw-2xs'],
})

export const dropdownItemVariants = swTwVariants({
  base: [
    'rounded-input-md',
    'px-sw-2xs',
    'py-sw-2xs',
    'flex',
    'items-center',
    'gap-sw-2xs',
    'not-disabled:cursor-pointer',
    'hover:bg-base-100',
    'aria-checked:bg-base-200',

    'focus-visible:outline-none',
  ],
})

export type DropdownContentVariants = VariantProps<
  typeof dropdownContentVariants
>
export type DropdownContentSlots = keyof ReturnType<
  typeof dropdownContentVariants
>

export type DropdownItemVariants = VariantProps<typeof dropdownItemVariants>

export type DropdownRadioGroupVariants = VariantProps<
  typeof dropdownRadioGroupVariants
>
