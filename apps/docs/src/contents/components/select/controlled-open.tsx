'use client'

import { Select, SelectItem } from '@repo/ui/components/select'
import { useState } from 'react'

export default function ControlledOpen() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div>{open ? '열림' : '닫힘'}</div>
      <Select label="Select" open={open} onOpenChange={setOpen}>
        <SelectItem value="value1">value1</SelectItem>
        <SelectItem value="value2">value2</SelectItem>
        <SelectItem value="value3">value3</SelectItem>
      </Select>
    </div>
  )
}
