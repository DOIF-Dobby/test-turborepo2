'use client'

import { Button } from '@repo/ui/components/button'
import { useToast } from '@repo/ui/components/toast'

export default function TitleDescription() {
  const toast = useToast()

  return (
    <Button
      onPress={() => {
        toast.add({
          title: 'Default Toast',
          description: 'This is a default toast',
        })
      }}
    >
      Toast
    </Button>
  )
}
