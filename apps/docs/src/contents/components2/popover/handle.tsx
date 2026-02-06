'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Popover } from '@repo/ui/components2/popover'

const handle = Popover.createHandle()

export default function Handle() {
  return (
    <>
      <Popover.Trigger handle={handle}>
        <Button>Open</Button>
      </Popover.Trigger>

      <Popover handle={handle}>
        <Popover.Content>
          <Frame>Content</Frame>
        </Popover.Content>
      </Popover>
    </>
  )
}
