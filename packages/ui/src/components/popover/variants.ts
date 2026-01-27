import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const popoverContentVariants = swTwVariants({
  slots: {
    content: [
      'rounded-xl',
      'bg-background',
      'shadow-popover',
      'py-sw-sm',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',
    ],
    arrow: ['fill-background', 'drop-shadow-popover-arrow'],
  },
})

export type PopoverContentVariants = VariantProps<typeof popoverContentVariants>
export type PopoverContentSlots = keyof ReturnType<
  typeof popoverContentVariants
>
