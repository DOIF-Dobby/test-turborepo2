import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const tableVariants = swTwVariants({
  slots: {
    container: ['bg-background', 'rounded-xl', 'outline', 'outline-base-200'],
    headerGroup: ['bg-base-0', 'border-b', 'border-base-100'],
    headerRow: ['h-12'],
    headText: [
      'font-paragraph-1',
      'text-paragraph-1',
      'leading-paragraph-1',
      'text-base-700',
    ],
    tbody: [],
    tfoot: [],
    tr: [],
    head: [],
    cell: [
      'font-paragraph-2',
      'text-paragraph-2',
      'leading-paragraph-2',
      'text-base-700',
    ],
  },
  variants: {
    renderAs: {
      table: {
        container: ['overflow-x-auto', 'min-w-full', 'w-fit'],
      },
      div: {
        container: ['flex', 'flex-col'],
        headerGroup: ['flex', 'flex-col'],
        head: ['flex', 'items-center'],
        cell: ['flex', 'items-center'],
        tbody: [],
      },
    },
  },
  defaultVariants: {
    renderAs: 'table',
  },
})

export type TableVariants = VariantProps<typeof tableVariants>
export type TableSlots = keyof ReturnType<typeof tableVariants>
