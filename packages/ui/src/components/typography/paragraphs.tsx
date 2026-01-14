import { Slot } from 'radix-ui' // 또는 '@radix-ui/react-slot'
import { ComponentProps } from 'react'
import { AsChild } from '../../types'
import { swClsx } from '../../utils/clsx'

// 1. 스타일 맵 정의 (Tailwind 클래스 감지용)
const styleMap = {
  1: 'text-paragraph-1 font-paragraph-1 leading-paragraph-1',
  2: 'text-paragraph-2 font-paragraph-2 leading-paragraph-2',
  3: 'text-paragraph-3 font-paragraph-3 leading-paragraph-3',
  4: 'text-paragraph-4 font-paragraph-4 leading-paragraph-4',
  5: 'text-paragraph-5 font-paragraph-5 leading-paragraph-5',
  6: 'text-paragraph-6 font-paragraph-6 leading-paragraph-6',
} as const

// 2. 공통 타입 정의
type Props = {} & AsChild

// React 19: ComponentProps<'p'> 안에 ref가 포함되어 있습니다.
export type ParagraphProps = ComponentProps<'p'> & Props

// 3. Factory 함수
function createParagraph(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const ParagraphComponent = ({
    asChild,
    className,
    children,
    ...props
  }: ParagraphProps) => {
    // asChild가 true면 Slot, 아니면 기본 p 태그 사용
    const Comp = asChild ? Slot.Root : 'p'

    return (
      <Comp
        {...props}
        role="paragraph"
        className={swClsx([styleMap[level], 'text-base-700'], className)}
      >
        {children}
      </Comp>
    )
  }

  ParagraphComponent.displayName = `Paragraph${level}`

  return ParagraphComponent
}

// 4. 컴포넌트 생성 및 내보내기
export const Paragraph1 = createParagraph(1)
export const Paragraph2 = createParagraph(2)
export const Paragraph3 = createParagraph(3)
export const Paragraph4 = createParagraph(4)
export const Paragraph5 = createParagraph(5)
export const Paragraph6 = createParagraph(6)
