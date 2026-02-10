'use client'

import { Button } from '@repo/ui/components/button'
import { useToast } from '@repo/ui/components/toast'

export default function CustomStyle() {
  const toast = useToast()

  return (
    <Button
      onPress={() => {
        toast.add({
          title: 'Default Toast',
          description: 'This is a default toast',
          classNames: {
            root: 'bg-green-500',
            title: 'text-red-500',
            description: 'text-blue-500',
          },
        })
      }}
    >
      Toast
    </Button>
  )
}
