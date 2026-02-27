import { TableTitle } from './table-title'

interface TableToolbarProps {
  title: string
  actions?: React.ReactNode
}

/**
 * 테이블 상단에 타이틀과 액션 버튼들을 표시하는 컴포넌트
 */
export function TableToolbar({ title, actions }: TableToolbarProps) {
  return (
    <div className="gap-sw-2xs mb-sw-xs flex items-center justify-between">
      <TableTitle>{title}</TableTitle>
      <div className="gap-sw-2xs flex items-center">{actions}</div>
    </div>
  )
}
