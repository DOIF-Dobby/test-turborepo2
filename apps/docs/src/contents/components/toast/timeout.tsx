'use client'

import { Button } from '@repo/ui/components/button'
import { useToast } from '@repo/ui/components/toast'

const timeout: number[] = [5000, 1000, 0]

export default function Timeout() {
  const toast = useToast()

  return (
    <div className="gap-sw-md flex">
      {timeout.map((timeout) => (
        <Button
          key={timeout}
          onPress={() => {
            toast.add({
              title: 'Default Toast',
              description: 'This is a default toast',
              timeout,
            })
          }}
        >
          {timeout}
        </Button>
      ))}
    </div>
  )
}
