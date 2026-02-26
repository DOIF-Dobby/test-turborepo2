import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const tableVariants = swTwVariants({
  slots: {
    container: ['bg-background', 'rounded-xl', 'outline', 'outline-base-200'],
    headerGroup: ['bg-base-0', 'border-b', 'border-base-100'],
    headerRow: ['h-12'],
    head: ['flex', 'items-center', 'gap-sw-3xs'],
    headText: [
      'font-paragraph-1',
      'text-paragraph-1',
      'leading-paragraph-1',
      'text-base-700',
      'truncate',
    ],
    tbody: [],
    tfoot: [],
    tr: [
      'data-[canselect=true]:data-[selected=false]:hover:bg-base-100',
      'data-[selected=true]:bg-cta2-secondary-pressed',
    ],
    cell: [],
    cellText: [
      'font-paragraph-2',
      'text-paragraph-2',
      'leading-paragraph-2',
      'text-base-700',
      'truncate',
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
        head: [
          'flex',
          'items-center',
          'first-of-type:pl-sw-md',
          'last-of-type:pr-sw-md',
        ],
        cell: [
          'flex',
          'items-center',
          'first-of-type:pl-sw-md',
          'last-of-type:pr-sw-md',
        ],
        tbody: [],
      },
    },
    headerAlign: {
      left: {
        head: ['justify-start'],
      },
      center: {
        head: ['justify-center'],
      },
      right: {
        head: ['justify-end'],
      },
    },
    cellAlign: {
      left: {
        cell: ['justify-start'],
      },
      center: {
        cell: ['justify-center'],
      },
      right: {
        cell: ['justify-end'],
      },
    },
  },
  defaultVariants: {
    renderAs: 'table',
    headerAlign: 'left',
    cellAlign: 'left',
  },
})

export type TableVariants = VariantProps<typeof tableVariants>
export type TableSlots = keyof ReturnType<typeof tableVariants>
