'use client'

import { Select } from '@repo/ui/components/select'
import { useState } from 'react'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function Controlled() {
  const [value, setValue] = useState(['apple', 'banana'])

  return (
    <div className="gap-sw-md flex">
      <div className="w-1/2">
        <Select value={value} onValueChange={setValue} items={items} multiple />
      </div>
      <p>입력한 값: {value.join(', ')}</p>
    </div>
  )
}
