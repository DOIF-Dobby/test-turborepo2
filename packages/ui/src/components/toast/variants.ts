import { swTwVariants } from '../../utils/tw-variants'

export const toastItemVariants = swTwVariants({
  slots: {
    root: [
      'absolute',
      'left-auto',
      'z-[calc(1000-var(--toast-index))]',
      'mr-0',
      'h-(--height)',
      'w-full',
      'rounded-lg',
      'bg-base-900',
      'bg-clip-padding',
      'p-sw-sm',
      'select-none',
      '[--gap:0.75rem]',
      '[--height:var(--toast-frontmost-height,var(--toast-height))]',
      '[--peek:0.75rem]',
      '[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]',
      '[--shrink:calc(1-var(--scale))]',
      '[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]',

      'after:absolute',
      'after:left-0',
      'after:h-[calc(var(--gap)+1px)]',
      'after:w-full',
      'after:content-[""]',

      'data-ending-style:opacity-0',
      'data-expanded:h-(--toast-height)',
      'data-limited:opacity-0',

      'cursor-grab',
      'data-swiping:cursor-grabbing',

      'data-ending-style:data-swipe-direction-left:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
      'data-expanded:data-ending-style:data-swipe-direction-left:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
      'data-ending-style:data-swipe-direction-right:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
      'data-expanded:data-ending-style:data-swipe-direction-right:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
    ],
    content: [
      'flex',
      'gap-sw-xs',
      'w-full',
      'items-start',
      'overflow-hidden',
      'transition-opacity',
      'duration-250',
      'data-behind:pointer-events-none',
      'data-behind:opacity-0',
      'data-expanded:pointer-events-auto',
      'data-expanded:opacity-100',
    ],
    title: [
      'font-heading-4',
      'text-heading-4',
      'leading-heading-4',
      'text-background',
    ],
    description: [
      'font-paragraph-2',
      'text-paragraph-2',
      'leading-paragraph-2',
      'text-base-200',
    ],
    closeButton: [
      'absolute',
      'top-2',
      'right-2',
      'flex',
      'h-5',
      'w-5',
      'cursor-pointer',
      'items-center',
      'justify-center',
      'rounded',
      'border-none',
      'bg-transparent',
      'text-base-200',
      'hover:bg-base-700',
    ],
    closeIcon: ['h-4', 'w-4'],
  },
  variants: {
    // ✨ 핵심: 상하 방향에 따라 애니메이션 축을 뒤집습니다.
    vertical: {
      bottom: {
        root: [
          'bottom-0',
          'origin-bottom',
          // Offset 계산: 아래에서 위로(-)
          '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
          // Transform: Y축 위로 이동
          'transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',

          'after:top-full', // 간격 요소 아래로

          // Enter/Exit Animation (아래쪽 기준)
          'data-starting-style:transform-[translateY(150%)]',
          'data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]',
          'data-ending-style:data-swipe-direction-down:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
          'data-expanded:data-ending-style:data-swipe-direction-down:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
          'data-ending-style:data-swipe-direction-up:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
          'data-expanded:data-ending-style:data-swipe-direction-up:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
          '&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
        ],
      },
      top: {
        root: [
          'top-0',
          'origin-top',
          // Offset 계산: 위에서 아래로(+) (부호 반전됨)
          '[--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]',
          // Transform: Y축 아래로 이동 (+ peek, + height)
          'transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]',

          'after:bottom-full', // 간격 요소 위로

          // Enter/Exit Animation (위쪽 기준 - 반대 방향)
          'data-starting-style:transform-[translateY(-150%)]',
          'data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]',
          // Swipe Up이 아래로 닫히는 것보다 자연스러움 (반대 로직 적용)
          '&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]',
        ],
      },
    },
  },
  defaultVariants: {
    vertical: 'bottom',
  },
})

export const toasterVariants = swTwVariants({
  slots: {
    viewport: [
      'fixed',
      'z-9999',
      'mx-auto',
      'flex',
      'w-60',
      'outline-none',
      'sm:w-80',
    ],
  },
  variants: {
    placement: {
      'top-left': {
        viewport: ['top-8', 'left-8', 'flex-col-reverse'], // Top은 역순 정렬 고려 가능하나 Base UI offset으로 처리됨
      },
      'top-center': {
        viewport: ['top-8', 'left-1/2', '-translate-x-1/2'],
      },
      'top-right': {
        viewport: ['top-8', 'right-8'],
      },
      'bottom-left': {
        viewport: ['bottom-8', 'left-8'],
      },
      'bottom-center': {
        viewport: ['bottom-8', 'left-1/2', '-translate-x-1/2'],
      },
      'bottom-right': {
        viewport: ['bottom-8', 'right-8'],
      },
    },
  },
  defaultVariants: {
    placement: 'bottom-right',
  },
})
