import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const textFieldVariants = swTwVariants({
  slots: {
    container: [],
    input: [],
  },
  variants: {
    size: {
      md: {
        container: [],
        input: [],
      },
      sm: {
        container: [],
        input: [],
      },
      xs: {
        container: [],
        input: [],
      },
    },
  },
})

export type TextFieldVariants = VariantProps<typeof textFieldVariants>
export type TextFieldSlots = keyof ReturnType<typeof textFieldVariants>
