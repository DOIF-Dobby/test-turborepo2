'use client'

import { Button } from '@repo/ui/components/button'
import { useToast } from '@repo/ui/components/toast'
import { useRef } from 'react'

export default function ProgrammaticallyClose() {
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
            toast.close(toastId.current)
          }
        }}
      >
        Close
      </Button>
    </div>
  )
}
