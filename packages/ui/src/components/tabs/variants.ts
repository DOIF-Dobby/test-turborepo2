import { type VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const tabsVariatns = swTwVariants({
  slots: {
    tabsRoot: [
      'flex',
      'gap-2',
      'data-[orientation=horizontal]:flex-col',
      'data-[orientation=vertical]:flex-row',
    ],
    tabList: ['flex', 'gap-2', 'w-fit', 'px-1'],
    tabTrigger: [
      'relative',
      'z-0',
      'flex',
      'justify-center',
      'px-3',
      'py-2',
      'data-[state=active]:text-base-700',
      'data-[state=active]:font-medium',
      'data-[state=inactive]:text-base-600',
      'data-[state=inactive]:hover:text-base-500',
      'data-[state=inactive]:disabled:text-base-400',
      'not-disabled:cursor-pointer',
    ],
    tabContent: ['text-base-content'],
    cursor: '',
  },
  variants: {
    size: {},
    variant: {
      solid: {
        tabList: ['bg-base-100', 'py-1'],
        cursor: ['absolute', 'inset-0', 'z-0', 'bg-background'],
      },
      underlined: {
        tabList: ['bg-transparent', 'border-b', 'border-b-base-200'],
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
        tabList: ['rounded-md'],
        tabTrigger: ['rounded-md'],
        cursor: ['rounded-md'],
      },
      none: {
        tabList: ['rounded-none'],
        tabTrigger: ['rounded-none'],
        cursor: ['rounded-none'],
      },
    },
  },
  compoundVariants: [
    {
      variant: 'underlined',
      class: {
        tabList: ['rounded-none'],
        tabTrigger: ['rounded-none'],
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
