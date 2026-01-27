import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const frameVariants = swTwVariants({
  base: ['flex', 'px-sw-ml', 'py-sw-sm'],
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    gap: {
      none: 'gap-0',
      '4xs': 'gap-sw-4xs',
      '3xs': 'gap-sw-3xs',
      '2xs': 'gap-sw-2xs',
      xs: 'gap-sw-xs',
      sm: 'gap-sw-sm',
      ms: 'gap-sw-ms',
      md: 'gap-sw-md',
      ml: 'gap-sw-ml',
      lg: 'gap-sw-lg',
      '2xl': 'gap-sw-2xl',
      '3xl': 'gap-sw-3xl',
      '4xl': 'gap-sw-4xl',
    },
  },
  defaultVariants: {
    direction: 'col',
    gap: 'xs',
  },
})

export type FrameVariants = VariantProps<typeof frameVariants>
