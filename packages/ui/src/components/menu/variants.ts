import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const menuContentVariants = swTwVariants({
  slots: {
    content: [
      'bg-background',
      'rounded-input-md',
      'shadow-popover',
      'py-sw-2xs',
      'px-sw-2xs',

      'outline',
      'outline-1',
      'outline-base-200',

      'focus-visible:outline-none',

      'data-[side=bottom]:[--y-initial:-8px]',
      'data-[side=bottom]:[--x-initial:0px]',
      'data-[side=top]:[--y-initial:8px]',
      'data-[side=top]:[--x-initial:0px]',
      'data-[side=right]:[--x-initial:-8px]',
      'data-[side=right]:[--y-initial:0px]',
      'data-[side=left]:[--x-initial:8px]',
      'data-[side=left]:[--y-initial:0px]',
    ],
    arrow: [
      'data-[side=bottom]:top-[-9px]',
      'data-[side=left]:right-[-14px]',
      'data-[side=left]:rotate-90',
      'data-[side=right]:left-[-14px]',
      'data-[side=right]:-rotate-90',
      'data-[side=top]:bottom-[-9px]',
      'data-[side=top]:rotate-180',
    ],
  },
})

export const menuGroupVariants = swTwVariants({
  base: ['flex', 'flex-col', 'gap-sw-3xs'],
})

export const menuItemVariants = swTwVariants({
  base: [
    'rounded-input-md',
    'px-sw-2xs',
    'py-sw-2xs',
    'flex',
    'items-center',
    'gap-sw-2xs',
    'cursor-pointer',
    'hover:bg-base-100',
    'aria-checked:bg-base-200',

    'focus-visible:outline-none',

    'data-disabled:pointer-events-none',
    'data-disabled:text-base-400',
  ],
})

export const menuSeparatorVariants = swTwVariants({
  base: ['h-px', 'bg-base-200', 'my-sw-2xs'],
})

export const menuGroupLabelVariants = swTwVariants({
  base: [
    'text-paragraph-2',
    'font-paragraph-2',
    'leading-paragraph-2',
    'text-base-600',
    'px-sw-2xs',
    'py-sw-3xs',
  ],
})

export type MenuContentVariants = VariantProps<typeof menuContentVariants>
export type MenuContentSlots = keyof ReturnType<typeof menuContentVariants>

export type MenuItemVariants = VariantProps<typeof menuItemVariants>

export type MenuGroupVariants = VariantProps<typeof menuGroupVariants>

export type MenuSeparatorVariants = VariantProps<typeof menuSeparatorVariants>

export type MenuGroupLabelVariants = VariantProps<typeof menuGroupLabelVariants>
