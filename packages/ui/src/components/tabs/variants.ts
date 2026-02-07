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
    list: ['relative', 'z-0', 'flex', 'gap-sw-2xs', 'w-fit', 'px-sw-3xs'],
    tab: [
      'relative',
      'z-0',
      'flex',
      'justify-center',
      'px-sw-xs',
      'py-sw-2xs',
      'text-base-600',
      'hover:text-base-700',
      'disabled:text-base-400',
      'cursor-pointer',

      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',

      'data-active:text-base-700',
      'data-active:font-medium',

      'data-disabled:pointer-events-none',
      'data-disabled:text-base-400',
    ],
    panel: ['text-base-content'],
    indicator: [
      'absolute',
      'z-[-1]',
      'w-(--active-tab-width)',
      'translate-x-(--active-tab-left)',
    ],
  },
  variants: {
    variant: {
      solid: {
        list: ['bg-base-100', 'py-sw-3xs'],
        indicator: [
          'inset-0',
          'bg-background',
          'top-1/2',
          'left-0',
          'h-[85%]',
          '-translate-y-1/2',
        ],
      },
      underlined: {
        list: ['bg-transparent', 'border-b', 'border-b-base-200'],
        indicator: ['bg-base-content', 'bottom-0', 'h-0.5'],
      },
    },
    radius: {
      md: {
        list: ['rounded-md'],
        tab: ['rounded-md'],
        indicator: ['rounded-md'],
      },
      none: {
        list: ['rounded-none'],
        tab: ['rounded-none'],
        indicator: ['rounded-none'],
      },
    },
  },
  compoundVariants: [
    {
      variant: 'underlined',
      class: {
        list: ['rounded-none'],
        tab: ['rounded-none'],
        indicator: ['rounded-none'],
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
