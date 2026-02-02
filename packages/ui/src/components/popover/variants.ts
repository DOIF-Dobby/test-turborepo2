import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const popoverContentVariants = swTwVariants({
  slots: {
    content: [
      'rounded-input-md',
      'bg-background',
      'shadow-popover',
      'py-sw-sm',
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

export type PopoverContentVariants = VariantProps<typeof popoverContentVariants>
export type PopoverContentSlots = keyof ReturnType<
  typeof popoverContentVariants
>
