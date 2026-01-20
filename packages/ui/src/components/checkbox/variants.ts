import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const checkboxVariants = swTwVariants({
  slots: {
    container: ['flex', 'items-start', 'gap-2'], // 라벨과 체크박스를 감싸는 컨테이너
    root: [
      'peer',
      'shrink-0',
      'border',
      'border-base-400',
      'ring-offset-background',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-cta1-hover',
      'focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',

      // Checked & Indeterminate 상태 (배경색 채우기)
      'data-[state=checked]:bg-cta1',
      'data-[state=checked]:text-cta1-content',
      'data-[state=checked]:border-cta1',

      'data-[state=indeterminate]:bg-cta1',
      'data-[state=indeterminate]:text-cta1-content',
      'data-[state=indeterminate]:border-cta1',

      'transition-colors',
    ],
    indicator: ['flex', 'items-center', 'justify-center', 'text-current'],
    icon: ['size-full'],
    labelWrapper: ['grid', 'gap-1.5', 'leading-none'],
    label: [
      'text-sm',
      'font-medium',
      'leading-none',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70',
      'select-none',
    ],
    description: ['text-sm', 'text-base-500'],
  },
  variants: {
    size: {
      sm: {
        root: ['size-4', 'rounded-sm'],
        icon: ['size-3'],
        label: ['text-xs'],
      },
      md: {
        root: ['size-5', 'rounded'],
        icon: ['size-3.5'],
        label: ['text-sm'],
      },
      lg: {
        root: ['size-6', 'rounded-md'],
        icon: ['size-4'],
        label: ['text-base'],
      },
    },
    isInvalid: {
      true: {
        root: [
          'border-destructive',
          'data-[state=checked]:bg-destructive',
          'data-[state=checked]:border-destructive',
        ],
        label: ['text-destructive'],
      },
    },
    isDisabled: {
      true: {
        root: ['cursor-not-allowed', 'opacity-50'],
        label: ['cursor-not-allowed', 'opacity-50'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
export type CheckboxSlots = keyof ReturnType<typeof checkboxVariants>
