import { formatDateTime } from '@repo/date'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { IconWrapper } from '@repo/ui/components/icon'
import { Modal } from '@repo/ui/components/modal'
import { Heading5, Paragraph2 } from '@repo/ui/components/typography'
import { safePromise } from '@repo/utils/promise'
import { CircleAlertIcon } from 'lucide-react'
import { useDeactivateGlobalEmergencyLimit } from '../services/global-emergency-limit.hooks'

interface GlobalEmergencyLimitDeactivateItemProps {
  latestActivatedAt: string
  latestActivatedBy: string
}

export function GlobalEmergencyLimitDeactivateItem({
  latestActivatedAt,
  latestActivatedBy,
}: GlobalEmergencyLimitDeactivateItemProps) {
  const modal = useDisclosure()
  const deactivateMutation = useDeactivateGlobalEmergencyLimit()

  const handleDeactivate = async () => {
    await safePromise(deactivateMutation.mutateAsync())
    modal.close()
  }

  return (
    <>
      <div className="flex items-center gap-sw-md">
        <div className="flex items-center gap-sw-2xs">
          <IconWrapper className="bg-status-poor">
            <CircleAlertIcon className="size-8 stroke-background" />
          </IconWrapper>
          <div>
            <Heading5>모든 거래 정지됨</Heading5>
            <Paragraph2>
              <span className="font-semibold">
                {formatDateTime(latestActivatedAt)}
              </span>
              에 <span className="font-semibold">{latestActivatedBy}</span>에
              의해 모든 거래가 정지되었습니다.
            </Paragraph2>
          </div>
        </div>
        <Button
          onPress={modal.open}
          className="bg-green-500 hover:bg-green-600 data-[pressed=true]:bg-green-600"
        >
          거래 재게
        </Button>
      </div>

      <Modal open={modal.isOpen} onOpenChange={modal.toggle}>
        <Frame>
          <Modal.Title>거래 재개</Modal.Title>
          <Modal.Description>
            모든 거래가 재개됩니다. 계속하시겠습니까?
          </Modal.Description>
        </Frame>
        <Frame direction="row" className="justify-end">
          <Button onPress={modal.close} variant="light">
            취소
          </Button>
          <Button
            onPress={handleDeactivate}
            isLoading={deactivateMutation.isPending}
          >
            확인
          </Button>
        </Frame>
      </Modal>
    </>
  )
}
