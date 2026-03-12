import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const iconWrapperVariants = swTwVariants({
  base: [
    'relative',
    'flex',
    'size-fit',
    'items-center',
    'justify-center',
    'rounded-full',
  ],
})

export type IconWrapperVariants = VariantProps<typeof iconWrapperVariants>
