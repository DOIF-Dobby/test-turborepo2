import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

/**
 * 달력
 */
export const calendarVariants = swTwVariants({
  slots: {
    container: ['flex', 'flex-col', 'gap-sw-md'],
    header: ['flex', 'items-center', 'gap-sw-sm'],
    title: ['text-heading-5', 'font-heading-5', 'leading-heading-5'],
    prevButton: [],
    nextButton: [],
    prevButtonIcon: ['size-5'],
    nextButtonIcon: ['size-5'],
  },
})

/**
 * 달력 그리드
 */
export const calendarGridVariants = swTwVariants({
  slots: {
    grid: ['flex', 'flex-col', 'gap-sw-sm'],
    header: ['grid', 'grid-cols-7', 'w-full'],
    dayOfWeek: ['flex', 'items-center', 'justify-center'],
    dayOfWeekContent: ['font-medium', 'text-base-600'],
    body: ['flex', 'flex-col', 'w-full', 'gap-sw-3xs'],
    week: ['grid', 'grid-cols-7', 'w-full'],
  },
  variants: {
    showDivideY: {
      true: {
        body: ['divide-y', 'divide-base-200'],
      },
    },
    showDivideX: {
      true: {
        week: ['divide-x', 'divide-base-200'],
      },
    },
  },
})

/**
 * 달력 셀
 */
export const calendarCellVariants = swTwVariants({
  slots: {
    cell: ['aspect-square'],
    cellButton: [
      'rounded-lg',
      'w-8',
      'flex',
      'items-center',
      'justify-center',
      'aspect-square',
      'cursor-pointer',

      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',

      'data-[selected=true]:bg-cta1',
      'data-[selected=true]:text-cta1-content',
      'data-[today=true]:text-cta2',
    ],
  },
  variants: {
    isSelected: {
      true: {
        cellButton: [''],
      },
    },
    isDisabled: {
      true: {
        cell: [''],
        cellButton: ['text-base-300', 'cursor-default'],
      },
    },
    isUnavailable: {
      true: {
        cellButton: ['text-base-300', 'cursor-default'],
      },
    },
  },
})

export type CalendarVariants = VariantProps<typeof calendarVariants>
export type CalendarSlots = keyof ReturnType<typeof calendarVariants>

export type CalendarGridVariants = VariantProps<typeof calendarGridVariants>
export type CalendarGridSlots = keyof ReturnType<typeof calendarGridVariants>

export type CalendarCellVariants = VariantProps<typeof calendarCellVariants>
export type CalendarCellSlots = keyof ReturnType<typeof calendarCellVariants>
