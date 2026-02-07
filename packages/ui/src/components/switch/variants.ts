import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const switchVariants = swTwVariants({
  slots: {
    container: [
      'group',
      'flex',
      'items-center',
      'gap-sw-2xs',
      'cursor-pointer',
      'w-fit',
    ],
    root: [
      'inline-flex',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'rounded-full',
      'border-2',
      'border-transparent',
      'outline-none',
      'box-border',

      'data-unchecked:justify-start',
      'data-checked:justify-end',

      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-background',

      'data-unchecked:bg-base-500',
      'data-disabled:data-unchecked:bg-base-300',
    ],
    thumb: [
      'pointer-events-none',
      'block',
      'rounded-full',
      'bg-background',
      'shadow-lg',
      'ring-0',
    ],
    label: ['select-none'],
  },
  variants: {
    size: {
      xs: {
        root: ['h-4.5', 'w-8', 'px-0.5'],
        thumb: ['size-3'],
        label: ['text-xs'],
      },
      sm: {
        root: ['h-6', 'w-10', 'px-0.5'],
        thumb: ['size-4'],
        label: ['text-sm'],
      },
      md: {
        root: ['h-8', 'w-16', 'px-0.5'],
        thumb: ['size-6'],
        label: ['text-base'],
      },
      lg: {
        root: ['h-12', 'w-21.5', 'px-0.5'],
        thumb: ['size-9.5'],
        label: ['text-xl'],
      },
    },
    // ✨ isPressed 상태 추가
    // 각 사이즈별로 눌렸을 때의 너비(w-?)를 정의합니다.
    isPressed: {
      true: {
        thumb: [], // 아래 compoundVariants에서 정의
      },
    },
    isDisabled: {
      true: {
        container: ['pointer-events-none'],
        label: ['text-base-500'],
      },
    },
    color: {
      cta1: {
        root: [
          'data-checked:bg-cta1',
          'focus-visible:ring-cta1-hover',
          'data-disabled:data-checked:bg-cta1-disabled',
        ],
      },
      cta2: {
        root: [
          'data-checked:bg-cta2',
          'focus-visible:ring-cta2-hover',
          'data-disabled:data-checked:bg-cta2-disabled',
        ],
      },
      destructive: {
        root: [
          'data-checked:bg-destructive',
          'focus-visible:ring-destructive',
          'data-disabled:data-checked:bg-destructive-disabled',
        ],
      },
    },
  },
  // ✨ 복합 조건 (사이즈 + 눌림) 정의
  compoundVariants: [
    { size: 'xs', isPressed: true, class: { thumb: 'w-4' } }, // w-3 -> w-4
    { size: 'sm', isPressed: true, class: { thumb: 'w-5' } }, // w-4 -> w-5
    { size: 'md', isPressed: true, class: { thumb: 'w-7' } }, // w-6 -> w-7
    { size: 'lg', isPressed: true, class: { thumb: 'w-11' } }, // w-9.5 -> w-11
  ],
  defaultVariants: {
    size: 'md',
    color: 'cta1',
    isPressed: false,
  },
})

export type SwitchVariants = VariantProps<typeof switchVariants>
export type SwitchSlots = keyof ReturnType<typeof switchVariants>
