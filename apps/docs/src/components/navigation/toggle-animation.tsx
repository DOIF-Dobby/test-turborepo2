'use client'

import { useUIStore } from '@/stores/ui-store'
import { Button } from '@repo/ui/components/button'

export function ToggleAnimation() {
  const { toggleDisableAnimation, disableAnimation } = useUIStore()

  return (
    <Button onPress={toggleDisableAnimation} size="sm">
      애니메이션 {disableAnimation ? '활성화' : '비활성화'}
    </Button>
  )
}
