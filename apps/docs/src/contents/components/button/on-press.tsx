'use client'

import { Button } from '@repo/ui/components/button'
import { Save } from 'lucide-react'
import { useState } from 'react'

export default function OnPress() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      isLoading={isLoading}
      startContent={<Save className="size-5" />}
      onPress={async () => {
        console.log('onPress')
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
      }}
    >
      {isLoading ? 'Saving...' : 'Save'}
    </Button>
  )
}
