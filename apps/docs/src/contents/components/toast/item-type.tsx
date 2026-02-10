'use client'

import { Button } from '@repo/ui/components/button'
import { type ToastItemType, useToast } from '@repo/ui/components/toast'

const itemTypes: ToastItemType[] = ['info', 'success', 'error']

export default function ItemType() {
  const toast = useToast()

  return (
    <div className="gap-sw-md flex">
      {itemTypes.map((itemType) => (
        <Button
          key={itemType}
          onPress={() => {
            toast.add({
              title: 'Default Toast',
              description: 'This is a default toast',
              itemType,
            })
          }}
        >
          {itemType}
        </Button>
      ))}
    </div>
  )
}
