'use client'

import { Frame, type FrameProps } from '@repo/ui/components/frame'
import { useState } from 'react'

const items = ['안녕하세요.', '반갑습니다.', '또 만나요.']
const gaps = [
  'none',
  '4xs',
  '3xs',
  '2xs',
  'xs',
  'sm',
  'ms',
  'md',
  'ml',
  'lg',
  '2xl',
  '3xl',
  '4xl',
]

export default function Gap() {
  const [gap, setGap] = useState<FrameProps['gap']>('xs')

  return (
    <>
      <div className="gap-sw-xs flex">
        {gaps.map((gapOption) => (
          <label key={gapOption} className="gap-sw-3xs flex items-center">
            <input
              type="radio"
              name="gap"
              value={gapOption}
              checked={gapOption === gap}
              onChange={(e) => setGap(e.target.value as FrameProps['gap'])}
            />
            {gapOption}
          </label>
        ))}
      </div>

      <Frame gap={gap}>
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Frame>
    </>
  )
}
