import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const tableVariants = swTwVariants({
  slots: {
    container: ['bg-background', 'rounded-xl', 'outline', 'outline-base-200'],
    theader: ['bg-base-0', 'h-12'],
    thead: ['text-left'],
    theadText: [
      'font-paragraph-1',
      'text-paragraph-1',
      'leading-paragraph-1',
      'text-base-700',
    ],
    tbody: [],
    tfoot: [],
    tr: [],
    th: [],
    td: [],
  },
  variants: {
    renderAs: {
      table: {
        container: ['overflow-x-auto', 'min-w-full', 'w-fit'],
      },
      div: {
        container: ['flex', 'flex-col'],
        theader: ['flex', 'flex-col'],
        tr: ['flex'],
      },
    },
  },
  defaultVariants: {
    renderAs: 'table',
  },
})

export type TableVariants = VariantProps<typeof tableVariants>
export type TableSlots = keyof ReturnType<typeof tableVariants>
