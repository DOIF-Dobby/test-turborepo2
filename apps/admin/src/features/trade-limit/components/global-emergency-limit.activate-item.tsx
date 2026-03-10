import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { IconWrapper } from '@repo/ui/components/icon'
import { Modal } from '@repo/ui/components/modal'
import { Heading5, Paragraph2 } from '@repo/ui/components/typography'
import { safePromise } from '@repo/utils/promise'
import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react'
import { useActivateGlobalEmergencyLimit } from '../services/global-emergency-limit.hooks'

export function GlobalEmergencyLimitActivateItem() {
  const modal = useDisclosure()
  const activateMutation = useActivateGlobalEmergencyLimit()

  const handleActivate = async () => {
    await safePromise(activateMutation.mutateAsync())
    modal.close()
  }

  return (
    <>
      <div className="flex items-center gap-sw-md">
        <div className="flex items-center gap-sw-2xs">
          <IconWrapper className="bg-status-good">
            <CircleCheckIcon className="size-8 stroke-background" />
          </IconWrapper>
          <div>
            <Heading5>정상 거래중</Heading5>
            <Paragraph2>모든 거래가 활성화된 상태입니다.</Paragraph2>
          </div>
        </div>
        <Button color="destructive" onPress={modal.open}>
          긴급 제한
        </Button>
      </div>

      <Modal open={modal.isOpen} onOpenChange={modal.toggle}>
        <Frame>
          <Modal.Title className="flex items-center gap-sw-xs">
            <TriangleAlertIcon className="size-8 stroke-status-poor" />
            전역 긴급 거래 제한
          </Modal.Title>
          <Modal.Description>
            모든 거래를 일괄 정지하는 기능을 활성화합니다.
          </Modal.Description>
        </Frame>
        <Frame direction="row" className="justify-end">
          <Button onPress={modal.close} variant="light">
            취소
          </Button>
          <Button
            onPress={handleActivate}
            color="destructive"
            isLoading={activateMutation.isPending}
          >
            활성화
          </Button>
        </Frame>
      </Modal>
    </>
  )
}
