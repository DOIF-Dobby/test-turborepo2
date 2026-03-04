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
    <div className="mb-sw-xs flex items-center justify-between gap-sw-2xs">
      <TableTitle>{title}</TableTitle>
      <div className="flex items-center gap-sw-2xs">{actions}</div>
    </div>
  )
}
