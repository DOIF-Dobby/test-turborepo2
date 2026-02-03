import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const comboboxVariants = swTwVariants({
  slots: {},
})

export type ComboboxVariants = VariantProps<typeof comboboxVariants>
export type ComboboxSlot = keyof ReturnType<typeof comboboxVariants>
