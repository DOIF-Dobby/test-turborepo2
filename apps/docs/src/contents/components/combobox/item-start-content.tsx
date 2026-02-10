'use client'

import { Combobox } from '@repo/ui/components/combobox'
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

export default function ItemStartContent() {
  return (
    <Combobox items={items}>
      {(item) => (
        <Combobox.Item
          key={item.value}
          value={item.value}
          startContent={item.icon}
        >
          {item.label}
        </Combobox.Item>
      )}
    </Combobox>
  )
}
