'use client'

import { Select } from '@repo/ui/components2/select'
import { useState } from 'react'

export default function ControlledOpen() {
  const [open, setOpen] = useState(false)
  return (
    <div className="gap-sw-md flex">
      <div className="w-1/2">
        <Select open={open} onOpenChange={setOpen}>
          <Select.Item value="value1">value1</Select.Item>
          <Select.Item value="value2">value2</Select.Item>
          <Select.Item value="value3">value3</Select.Item>
        </Select>
      </div>
      <div>{open ? '열림' : '닫힘'}</div>
    </div>
  )
}
