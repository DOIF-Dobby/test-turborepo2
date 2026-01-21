'use client'

import { swClsx } from '../../../utils/clsx'

interface DotLoaderProps {
  className?: string
  speed?: number
}

export function DotLoader({ className, speed = 0.9 }: DotLoaderProps) {
  const dots = Array.from({ length: 8 })

  return (
    <div
      className={swClsx(
        'relative flex size-full items-center justify-start',
        className,
      )}
    >
      {dots.map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 flex size-full items-center justify-start"
          style={{
            transform: `rotate(${i * 45}deg)`,
          }}
        >
          <div
            className="h-[20%] w-[20%] rounded-full bg-current opacity-50"
            style={{
              animation: `uib-dot-pulse ${speed}s ease-in-out infinite`,
              animationDelay:
                i === 0 ? '0s' : `calc(${speed}s * (${i / 8} - 1))`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
