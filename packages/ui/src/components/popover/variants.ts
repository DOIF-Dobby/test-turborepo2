import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const popoverContentVariants = swTwVariants({
  slots: {
    content: [
      'rounded-input-md',
      'bg-background',
      'shadow-popover',
      'py-sw-sm',

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
    closeButtonWrapper: ['absolute', 'top-1', 'right-1'],
    closeButton: [
      'h-6',
      'min-h-6',
      'max-w-6',
      'min-w-6',
      'rounded-full',
      'px-0',
      'py-0',
    ],
  },
})

export type PopoverContentVariants = VariantProps<typeof popoverContentVariants>
export type PopoverContentSlots = keyof ReturnType<
  typeof popoverContentVariants
>
