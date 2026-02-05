import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const tabsVariatns = swTwVariants({
  slots: {
    root: [
      'flex',
      'gap-sw-2xs',
      'data-[orientation=horizontal]:flex-col',
      'data-[orientation=vertical]:flex-row',
    ],
    list: ['flex', 'gap-sw-2xs', 'w-fit', 'px-sw-3xs'],
    tab: [
      'relative',
      'z-0',
      'flex',
      'justify-center',
      'px-sw-xs',
      'py-sw-2xs',
      'data-[state=active]:text-base-700',
      'data-[state=active]:font-medium',
      'data-[state=inactive]:text-base-600',
      'data-[state=inactive]:hover:text-base-700',
      'data-[state=inactive]:disabled:text-base-400',
      'not-disabled:cursor-pointer',

      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',
    ],
    panel: ['text-base-content'],
    cursor: [],
  },
  variants: {
    variant: {
      solid: {
        list: ['bg-base-100', 'py-sw-3xs'],
        cursor: ['absolute', 'inset-0', 'z-0', 'bg-background'],
      },
      underlined: {
        list: ['bg-transparent', 'border-b', 'border-b-base-200'],
        cursor: [
          'absolute',
          'inset-0',
          'z-0',
          'border-b-2',
          'border-b-base-content',
        ],
      },
    },
    radius: {
      md: {
        list: ['rounded-md'],
        tab: ['rounded-md'],
        cursor: ['rounded-md'],
      },
      none: {
        list: ['rounded-none'],
        tab: ['rounded-none'],
        cursor: ['rounded-none'],
      },
    },
  },
  compoundVariants: [
    {
      variant: 'underlined',
      class: {
        list: ['rounded-none'],
        tab: ['rounded-none'],
        cursor: ['rounded-none'],
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    radius: 'md',
  },
})

export type TabsVariants = VariantProps<typeof tabsVariatns>
export type TabsSlots = keyof ReturnType<typeof tabsVariatns>
