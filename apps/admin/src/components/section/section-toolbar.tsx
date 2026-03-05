import { SectionTitle } from './section-title'

interface SectionToolbarProps {
  title: string
  actions?: React.ReactNode
}

/**
 * 테이블 상단에 타이틀과 액션 버튼들을 표시하는 컴포넌트
 */
export function SectionToolbar({ title, actions }: SectionToolbarProps) {
  return (
    <div className="mb-sw-xs flex items-center justify-between gap-sw-2xs">
      <SectionTitle>{title}</SectionTitle>
      <div className="flex items-center gap-sw-2xs">{actions}</div>
    </div>
  )
}
