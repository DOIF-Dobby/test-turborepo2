import { Slot } from 'radix-ui' // 또는 '@radix-ui/react-slot'
import { ComponentProps } from 'react'
import { AsChild } from '../../types'
import { swClsx } from '../../utils/clsx'

const styleMap = {
  0: 'text-heading-0 font-heading-0 leading-heading-0',
  1: 'text-heading-1 font-heading-1 leading-heading-1',
  2: 'text-heading-2 font-heading-2 leading-heading-2',
  3: 'text-heading-3 font-heading-3 leading-heading-3',
  4: 'text-heading-4 font-heading-4 leading-heading-4',
  5: 'text-heading-5 font-heading-5 leading-heading-5',
  6: 'text-heading-6 font-heading-6 leading-heading-6',
} as const

// 1. 공통 타입 정의
// h1~h6 모두 HTMLHeadingElement를 공유하므로 타입을 하나로 통일해도 안전합니다.
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {} & AsChild

// React 19: ComponentProps<'h1'> 안에 ref가 포함되어 있습니다.
export type HeadingProps = ComponentProps<HeadingElement> & Props

// 2. Factory 함수
function createHeading(level: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  // 핵심 로직: 0, 1이면 h1, 나머지는 h{level}
  const defaultTag: HeadingElement =
    level <= 1 ? 'h1' : (`h${level}` as HeadingElement)

  const HeadingComponent = ({
    asChild,
    className,
    children,
    ...props
  }: HeadingProps) => {
    // asChild가 true면 Slot, 아니면 위에서 정한 defaultTag 사용
    const Comp = asChild ? Slot.Root : defaultTag

    return (
      <Comp
        {...props}
        role="heading"
        aria-level={level}
        className={swClsx([styleMap[level], 'text-base-700'], className)}
      >
        {children}
      </Comp>
    )
  }

  HeadingComponent.displayName = `Heading${level}`

  return HeadingComponent
}

// 3. 컴포넌트 생성 및 내보내기
export const Heading0 = createHeading(0) // -> 태그: h1
export const Heading1 = createHeading(1) // -> 태그: h1
export const Heading2 = createHeading(2) // -> 태그: h2
export const Heading3 = createHeading(3) // -> 태그: h3
export const Heading4 = createHeading(4) // -> 태그: h4
export const Heading5 = createHeading(5) // -> 태그: h5
export const Heading6 = createHeading(6) // -> 태그: h6
