'use client'

import { Select } from '@repo/ui/components2/select'
import { AirplayIcon, AppleIcon, BananaIcon } from 'lucide-react'

const items = [
  { label: '사과', value: 'apple', icon: <AppleIcon className="size-5" /> },
  { label: '바나나', value: 'banana', icon: <BananaIcon className="size-5" /> },
  {
    label: '오렌지',
    value: 'orange',
    icon: <AirplayIcon className="size-5" />,
  },
]

export default function SelectItemStartContent() {
  return (
    <Select items={items} getItemLabel={(item) => item.label}>
      {items.map((item) => (
        <Select.Item
          key={item.value}
          value={item.value}
          startContent={item.icon}
        >
          {item.label}
        </Select.Item>
      ))}
    </Select>
  )
}
