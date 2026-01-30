'use client' // 클라이언트 컴포넌트 선언 필수 (useState, useRef 사용)

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import { useEffect, useRef, useState } from 'react'
import { swClsx } from '../../utils/clsx'

export function ScrollArea(props: ScrollAreaPrimitive.ScrollAreaProps) {
  const { children, className, ...otherProps } = props

  // 스크롤 상태 관리 ('top' | 'middle' | 'bottom' | 'none')
  const [scrollState, setScrollState] = useState<
    'top' | 'middle' | 'bottom' | 'none'
  >('top')
  const viewportRef = useRef<HTMLDivElement>(null)

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const element = viewportRef.current
    if (!element) return

    const { scrollTop, scrollHeight, clientHeight } = element

    // 스크롤이 필요 없는 경우 (내용이 짧음)
    if (scrollHeight === clientHeight) {
      setScrollState('none')
      return
    }

    const isAtTop = scrollTop === 0
    // 브라우저마다 1px 정도 오차가 있을 수 있어 여유를 둠
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1

    if (isAtTop) {
      setScrollState('top')
    } else if (isAtBottom) {
      setScrollState('bottom')
    } else {
      setScrollState('middle')
    }
  }

  // 초기 렌더링 및 리사이즈 시 스크롤 상태 체크
  useEffect(() => {
    handleScroll()
    window.addEventListener('resize', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [children]) // children이 바뀌면(내용 추가됨) 다시 체크

  // 상태에 따른 마스크 스타일 정의
  const maskStyle = {
    none: 'none',
    // 맨 위: 아래쪽만 흐릿하게 (위는 선명)
    top: 'linear-gradient(to bottom, black calc(100% - 40px), transparent 100%)',
    // 중간: 위/아래 둘 다 흐릿하게
    middle:
      'linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)',
    // 맨 아래: 위쪽만 흐릿하게 (아래는 선명)
    bottom:
      'linear-gradient(to top, black calc(100% - 40px), transparent 100%)',
  }

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={swClsx('relative', className)}
      {...otherProps}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        onScroll={handleScroll} // 스크롤 할 때마다 체크
        data-slot="scroll-area-viewport"
        className={swClsx(
          'focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1',
        )}
        style={{
          // Tailwind arbitrary value로는 동적 제어가 힘들어 inline style 사용
          maskImage: maskStyle[scrollState],
          WebkitMaskImage: maskStyle[scrollState], // 사파리/크롬 지원
        }}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

// ScrollBar 컴포넌트는 기존과 동일하게 유지
export function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={swClsx(
        'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}
