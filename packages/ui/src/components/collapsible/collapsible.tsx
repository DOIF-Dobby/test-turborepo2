'use client'

import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import { useState } from 'react'
import { useCollapsibleAnimation } from '../../animations/use-collapsible-animation'
import { swClsx } from '../../utils/clsx'
import {
  CollapsibleContext,
  useCollapsibleContext,
} from './collapsible-context'

export function Collapsible({
  children,
  open: openProp,
  onOpenChange,
  defaultOpen,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const [isOpenState, setIsOpenState] = useState(defaultOpen || false)

  const isOpen = openProp ?? isOpenState

  const handleOpenChange = (open: boolean) => {
    setIsOpenState(open)
    onOpenChange?.(open)
  }

  return (
    <CollapsibleContext value={{ isOpen }}>
      <CollapsiblePrimitive.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext>
  )
}

// 3. Trigger Component (단순 래퍼)
export function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger {...props} />
}

// 4. Content Component (애니메이션 적용)
interface CollapsibleContentProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Content
> {
  disableAnimation?: boolean
  duration?: number
}

export function CollapsibleContent({
  ref,
  className,
  children,
  disableAnimation,
  duration,
  style,
  ...props
}: CollapsibleContentProps) {
  // Context에서 현재 열림/닫힘 상태를 가져옴
  const { isOpen } = useCollapsibleContext()

  // Hook 사용! (버튼때랑 똑같음)
  const { scope, initialStyle } = useCollapsibleAnimation({
    isOpen,
    disableAnimation,
    duration,
  })

  return (
    <CollapsiblePrimitive.Content
      // Radix Content는 닫히면 언마운트되므로 forceMount 필수
      forceMount
      ref={ref}
      {...props}
      asChild
    >
      <div
        ref={scope} // Motion Scope 연결
        style={{ ...initialStyle, ...style }} // 초기 스타일 적용
        className={swClsx(className)}
      >
        {children}
      </div>
    </CollapsiblePrimitive.Content>
  )
}
