import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const paginationVariants = swTwVariants({
  slots: {
    container: [],
    content: ['flex', 'gap-sw-4xs', 'items-center'],
    item: ['flex', 'items-center'],
    link: [],
    previous: [],
    next: [],
    icon: [],
  },
  variants: {
    size: {
      '3xs': {
        icon: ['size-4'],
      },
      '2xs': {
        icon: ['size-4'],
      },
      xs: {
        icon: ['size-5'],
      },
      sm: {
        icon: ['size-6'],
      },
      md: {
        icon: ['size-7'],
      },
    },
  },
})

export type PaginationVariants = VariantProps<typeof paginationVariants>
export type PaginationSlots = keyof ReturnType<typeof paginationVariants>
