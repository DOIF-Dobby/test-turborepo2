import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const popoverVariants = swTwVariants({
  slots: {},
})

export type PopoverVariants = VariantProps<typeof popoverVariants>
export type PopoverSlots = keyof ReturnType<typeof popoverVariants>
