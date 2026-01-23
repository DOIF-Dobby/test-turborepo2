import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const buttonVariants = swTwVariants({
  base: [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'py-sw-2xs',
    'px-sw-md',
    'font-semibold',
    'cursor-pointer',
    'overflow-hidden',
    'gap-sw-2xs',

    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-cta1-hover',
    'focus-visible:ring-offset-2',

    // Disabled 기본 동작 정의
    'disabled:pointer-events-none',
    'disabled:cursor-default',

    // 로딩 중일 때는 투명도 60%
    'disabled:data-[loading=true]:opacity-60',
  ],
  variants: {
    color: {
      cta1: ['focus-visible:ring-cta1-hover'],
      cta2: ['focus-visible:ring-cta2-hover'],
      destructive: ['focus-visible:ring-destructive-hover'],
    },
    variant: {
      solid: '',
      bordered: '',
      light: '',
    },
    size: {
      md: ['rounded-input-md', 'text-button-md h-13', 'min-h-sw-btn-md'],
      sm: ['rounded-input-sm', 'text-button-sm h-11', 'min-h-sw-btn-sm'],
      xs: ['rounded-input-xs', 'text-button-xs h-9', 'min-h-sw-btn-xs'],
      '2xs': ['rounded-input-xs', 'text-button-2xs h-7', 'min-h-sw-btn-2xs'],
      '3xs': ['rounded-input-xs', 'text-button-2xs h-5', 'min-h-sw-btn-3xs'],
    },
    fullWidth: {
      true: ['w-full'],
    },
  },
  defaultVariants: {
    color: 'cta1',
    variant: 'solid',
    size: 'md',
    fullWidth: false,
  },
  compoundVariants: [
    /**
     * CTA 1
     */
    // Solid
    {
      color: 'cta1',
      variant: 'solid',
      class: [
        'bg-cta1',
        'text-cta1-content',
        'hover:bg-cta1-hover',
        'data-[pressed=true]:bg-cta1-pressed',
        // Disabled Style
        'disabled:data-[loading=false]:bg-cta1-disabled',
      ],
    },
    // Bordered
    {
      color: 'cta1',
      variant: 'bordered',
      class: [
        'bg-background',
        'border',
        'border-cta1',
        'text-cta1',
        'hover:bg-cta1-secondary-hover',
        // Disabled Style
        'disabled:data-[loading=false]:border-cta1-disabled',
        'disabled:data-[loading=false]:text-cta1-disabled',
      ],
    },
    // Light
    {
      color: 'cta1',
      variant: 'light',
      class: [
        'bg-transparent',
        'text-cta1',
        'hover:bg-cta1-secondary-hover',
        // Disabled Style
        'disabled:data-[loading=false]:text-cta1-disabled',
      ],
    },

    /**
     * CTA 2
     */
    // Solid
    {
      color: 'cta2',
      variant: 'solid',
      class: [
        'bg-cta2',
        'text-cta2-content',
        'hover:bg-cta2-hover',
        'data-[pressed=true]:bg-cta2-pressed',
        // Disabled Style
        'disabled:data-[loading=false]:bg-cta2-disabled',
      ],
    },
    // Bordered
    {
      color: 'cta2',
      variant: 'bordered',
      class: [
        'bg-background',
        'border border-cta2',
        'text-cta2',
        'hover:bg-cta2-secondary-hover',
        // Disabled Style
        'disabled:data-[loading=false]:border-cta2-disabled',
        'disabled:data-[loading=false]:text-cta2-disabled',
      ],
    },
    // Light
    {
      color: 'cta2',
      variant: 'light',
      class: [
        'bg-transparent',
        'text-cta2',
        'hover:bg-cta2-secondary-hover',
        // Disabled Style
        'disabled:data-[loading=false]:text-cta2-disabled',
      ],
    },

    /**
     * Destructive
     */
    // Solid
    {
      color: 'destructive',
      variant: 'solid',
      class: [
        'bg-destructive',
        'text-destructive-content',
        'hover:bg-destructive-hover',
        'data-[pressed=true]:bg-destructive-pressed',
        // Disabled Style
        'disabled:data-[loading=false]:bg-destructive-disabled',
      ],
    },
    // Bordered
    {
      color: 'destructive',
      variant: 'bordered',
      class: [
        'bg-background',
        'border',
        'border-destructive',
        'text-destructive',
        'hover:bg-destructive-secondary-hover',
        // Disabled Style
        'disabled:data-[loading=false]:border-destructive-disabled',
        'disabled:data-[loading=false]:text-destructive-disabled',
      ],
    },
    // Light
    {
      color: 'destructive',
      variant: 'light',
      class: [
        'bg-transparent',
        'text-destructive',
        'hover:bg-destructive-secondary-hover',
        // Disabled Style
        'disabled:data-[loading=false]:text-destructive-disabled',
      ],
    },
  ],
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
