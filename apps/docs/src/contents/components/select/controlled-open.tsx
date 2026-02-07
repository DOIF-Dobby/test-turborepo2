'use client'

import { Select } from '@repo/ui/components/select'
import { useState } from 'react'

const items = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
]

export default function ControlledOpen() {
  const [open, setOpen] = useState(false)
  return (
    <div className="gap-sw-md flex">
      <div className="w-1/2">
        <Select open={open} onOpenChange={setOpen} items={items} />
      </div>
      <div>{open ? '열림' : '닫힘'}</div>
    </div>
  )
}
