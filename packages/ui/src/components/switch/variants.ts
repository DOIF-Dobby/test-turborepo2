import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const switchVariants = swTwVariants({
  slots: {
    container: ['group', 'flex', 'items-center', 'gap-sw-2xs'],
    root: [
      'peer',
      // group/switch 등 active 관련 클래스 제거
      'inline-flex',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'rounded-full',
      'border-2',
      'border-transparent',
      'outline-none',
      'box-border',

      'data-[state=unchecked]:justify-start',
      'data-[state=checked]:justify-end',

      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-background',

      'disabled:cursor-default',

      'not-disabled:data-[state=unchecked]:bg-base-500',
      'disabled:data-[state=unchecked]:bg-base-300',
    ],
    thumb: [
      'pointer-events-none',
      'block',
      'rounded-full',
      'bg-background',
      'shadow-lg',
      'ring-0',
    ],
    label: [
      'select-none',
      'cursor-pointer',
      'peer-disabled:cursor-default',
      'peer-disabled:text-base-500',
    ],
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
    color: {
      cta1: {
        root: [
          'not-disabled:data-[state=checked]:bg-cta1',
          'not-disabled:focus-visible:ring-cta1-hover',
          'disabled:data-[state=checked]:bg-cta1-disabled',
        ],
      },
      cta2: {
        root: [
          'not-disabled:data-[state=checked]:bg-cta2',
          'not-disabled:focus-visible:ring-cta2-hover',
          'disabled:data-[state=checked]:bg-cta2-disabled',
        ],
      },
      destructive: {
        root: [
          'not-disabled:data-[state=checked]:bg-destructive',
          'not-disabled:focus-visible:ring-destructive',
          'disabled:data-[state=checked]:bg-destructive-disabled',
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
