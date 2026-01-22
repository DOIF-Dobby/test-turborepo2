import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const calendarVariants = swTwVariants({
  slots: {
    root: [''],
    months: ['relative'],
    month: ['flex', 'flex-col', 'gap-sw-2xs'],

    // Caption & Nav
    monthCaption: ['h-10', 'flex', 'items-center'],
    captionLabel: ['font-semibold'],
    nav: ['absolute', 'right-0', 'h-10', 'flex', 'items-center'],

    // Navigation Buttons
    buttonPrevious: ['size-8', 'p-sw-3xs', 'min-w-fit', 'min-h-0'],
    buttonNext: ['size-8', 'p-sw-3xs', 'min-w-fit', 'min-h-0'],

    // Navigation Icons
    navigationIcon: ['size-5'],

    // Grid (Table)
    monthGrid: ['flex', 'flex-col', 'divide-base-200', 'divide-y'],
    weekdays: ['flex', 'w-full', 'pb-sw-2xs'],
    weekday: ['flex', 'w-full', 'justify-center', 'text-sm'],
    weeks: ['flex', 'flex-col', 'w-full'],
    week: ['flex', 'w-full'],

    // Day (Cell)
    day: [
      'w-full',
      'flex',
      'justify-start',
      'aspect-video',
      'data-[day-of-week=sunday]:text-red-500',
      'data-[day-of-week=saturday]:text-blue-500',
      'data-[outside=true]:text-base-300',
      'text-base',
      'p-sw-3xs',
    ],
    dayButton: [
      'flex',
      'justify-start',
      'w-full',
      'h-fit',
      'hover:cursor-pointer',
    ],
    dayButtonText: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'size-6',
      'data-[selected=true]:bg-red-500',
    ],

    // Modifiers (State)
    rangeEnd: [],
    selected: [''],
    today: ['text-cta2'],
    disabled: [],
    rangeMiddle: [],
    hidden: [],
  },
  variants: {
    isDivide: {
      true: {
        weeks: ['divide-y', 'divide-base-200'],
        week: ['divide-x', 'divide-base-200'],
      },
    },
  },
})

export type CalendarVariants = VariantProps<typeof calendarVariants>
export type CalendarSlots = keyof ReturnType<typeof calendarVariants>
