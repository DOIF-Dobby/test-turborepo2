import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const tooltipVariants = swTwVariants({
  slots: {
    content: [
      'bg-base-900',
      'text-base-200',
      'p-sw-2xs',
      'rounded-lg',
      'text-paragraph-1',
      'leading-paragraph-1',
      'font-paragraph-1',
    ],
  },
})

export type TooltipVariants = VariantProps<typeof tooltipVariants>
export type TooltipSlots = keyof ReturnType<typeof tooltipVariants>
