import type { SortDirection } from '@tanstack/react-table'

interface SortingIconProps {
  isSorted: false | SortDirection
}

// 1. 오름차순 화살표 Path 컴포넌트 (위쪽)
function SortingAscPath({ className }: { className?: string }) {
  return (
    <path
      d="M6.95969 5H1.04031C0.621059 5 0.387973 4.51503 0.649878 4.18765L3.60957 0.488043C3.80973 0.237839 4.19027 0.23784 4.39043 0.488043L7.35012 4.18765C7.61203 4.51503 7.37894 5 6.95969 5Z"
      className={className}
    />
  )
}

// 2. 내림차순 화살표 Path 컴포넌트 (아래쪽)
function SortingDescPath({ className }: { className?: string }) {
  return (
    <path
      d="M6.95969 7H1.04031C0.621059 7 0.387973 7.48497 0.649878 7.81235L3.60957 11.512C3.80973 11.7622 4.19027 11.7622 4.39043 11.512L7.35012 7.81235C7.61203 7.48497 7.37894 7 6.95969 7Z"
      className={className}
    />
  )
}

// 3. 메인 컴포넌트에서 조합
export default function SortingIcon({ isSorted }: SortingIconProps) {
  const inactiveClass = 'fill-base-500' // 비활성 상태 (연한 색)
  const activeClass = 'fill-cta1' // 활성 상태 (진한 색)

  // 상태에 따라 각 화살표의 클래스를 결정합니다.
  const ascClassName = isSorted === 'asc' ? activeClass : inactiveClass
  const descClassName = isSorted === 'desc' ? activeClass : inactiveClass

  return (
    <div>
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SortingAscPath className={ascClassName} />
        <SortingDescPath className={descClassName} />
      </svg>
    </div>
  )
}
