'use client'

import { useDocsStore } from '@/providers/docs-provider'
import { Button } from '@repo/ui/components/button'

export function ToggleAnimation() {
  const toggle = useDocsStore((state) => state.toggleDisableAnimation)
  const isDisabled = useDocsStore((state) => state.disableAnimation)

  return (
    <Button onPress={toggle} size="xs" variant="light">
      애니메이션 {isDisabled ? '활성화' : '비활성화'}
    </Button>
  )
}
