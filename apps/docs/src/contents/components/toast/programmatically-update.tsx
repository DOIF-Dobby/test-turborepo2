'use client'

import { Button } from '@repo/ui/components/button'
import { useToast } from '@repo/ui/components/toast'
import { useRef } from 'react'

export default function ProgrammaticallyUpdate() {
  const toast = useToast()
  const toastId = useRef<string>(undefined)

  return (
    <div className="gap-sw-md flex">
      <Button
        onPress={() => {
          toastId.current = toast.add({
            title: 'Default Toast',
            description: 'This is a default toast',
            timeout: 0,
          })
        }}
      >
        Toast
      </Button>

      <Button
        onPress={() => {
          if (toastId.current) {
            toast.update(toastId.current, {
              title: 'Updated Toast',
              description: 'This is an updated toast',
              timeout: 1000,
            })
          }
        }}
      >
        Update
      </Button>
    </div>
  )
}
