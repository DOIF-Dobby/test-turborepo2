import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const paginationVariants = swTwVariants({
  slots: {
    container: [],
    content: ['flex', 'gap-sw-4xs', 'items-center'],
    item: ['flex', 'items-center'],
    link: ['font-normal'],
    previous: [],
    next: [],
    first: [],
    last: [],
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
    isActive: {
      true: {
        link: ['font-semibold', 'text-cta2'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isActive: false,
  },
})

export type PaginationVariants = VariantProps<typeof paginationVariants>
export type PaginationSlots = keyof ReturnType<typeof paginationVariants>
