'use client'

import { Button } from '@repo/ui/components/button'
import { type ToastPlacement, useToast } from '@repo/ui/components/toast'

const placements: ToastPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

export default function Placement() {
  const toast = useToast()

  return (
    <div className="gap-sw-md flex">
      {placements.map((placement) => (
        <Button
          key={placement}
          onPress={() => {
            toast.add({
              title: 'Default Toast',
              description: 'This is a default toast',
              placement,
            })
          }}
        >
          {placement}
        </Button>
      ))}
    </div>
  )
}
