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
    arrow: [
      'data-[side=bottom]:top-[-8px]',
      'data-[side=left]:right-[-13px]',
      'data-[side=left]:rotate-90',
      'data-[side=right]:left-[-13px]',
      'data-[side=right]:-rotate-90',
      'data-[side=top]:bottom-[-8px]',
      'data-[side=top]:rotate-180',
    ],
  },
})

export type TooltipVariants = VariantProps<typeof tooltipVariants>
export type TooltipSlots = keyof ReturnType<typeof tooltipVariants>
