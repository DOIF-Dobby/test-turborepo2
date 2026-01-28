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
    ],
    arrow: ['fill-background', 'drop-shadow-popover-arrow'],
  },
})

export type PopoverContentVariants = VariantProps<typeof popoverContentVariants>
export type PopoverContentSlots = keyof ReturnType<
  typeof popoverContentVariants
>
