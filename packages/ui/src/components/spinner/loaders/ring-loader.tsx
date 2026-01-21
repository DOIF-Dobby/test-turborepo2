'use client'

import { swClsx } from '../../../utils/clsx'

interface RingLoaderProps {
  className?: string
}

export function RingLoader({ className }: RingLoaderProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      height="100%"
      width="100%"
      xmlns="http://www.w.org/2000/svg"
      // tailwind의 animate-spin을 사용하여 회전 (기본 1초)
      // ldrs 원본 속도(0.8s)를 원한다면 className에 animate-[spin_0.8s_linear_infinite] 적용 가능
      className={swClsx('origin-center animate-spin', className)}
    >
      {/* 1. Track (흐릿한 배경) */}
      <circle
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth="5"
        fill="none"
        stroke="currentColor"
        className="opacity-15 transition-all duration-500 ease-in-out" // ldrs의 --uib-bg-opacity: 0.1 대응
      />

      {/* 2. Car (돌아가는 인디케이터) */}
      <circle
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth="5"
        fill="none"
        stroke="currentColor"
        // strokeDasharray="25 75" -> 100 중에 25만큼 채우고 75만큼 비움 (즉 1/4)
        strokeDasharray="25 75"
        strokeLinecap="round"
        className="transition-all duration-500 ease-in-out"
      />
    </svg>
  )
}
