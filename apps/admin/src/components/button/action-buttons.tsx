import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

export function AddButton({
  children = '추가',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      color="cta1"
      size="xs"
      startContent={<PlusIcon className="size-4" />}
      className="px-sw-xs"
      {...props}
    >
      {children}
    </Button>
  )
}

export function EditButton({
  children = '수정',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      color="cta1"
      size="xs"
      startContent={<PencilIcon className="size-4" />}
      className="px-sw-xs"
      {...props}
    >
      {children}
    </Button>
  )
}

interface DeleteButtonProps extends React.ComponentProps<typeof Button> {
  modalTitle?: React.ReactNode
  modalDescription?: React.ReactNode
  onDelete?: () => Promise<void>
}

export function DeleteButton({
  children = '삭제',
  modalTitle = '정말 삭제하시겠습니까?',
  modalDescription = '삭제 후에는 이전으로 되돌릴 수 없습니다.',
  onDelete,
  ...props
}: DeleteButtonProps) {
  const deleteModal = useDisclosure()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!onDelete) return

    try {
      setIsDeleting(true)

      await onDelete()

      deleteModal.close()
    } catch {
      //
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        color="destructive"
        size="xs"
        startContent={<Trash2Icon className="size-4" />}
        className="px-sw-xs"
        onPress={deleteModal.open}
        {...props}
      >
        {children}
      </Button>

      <Modal open={deleteModal.isOpen} onOpenChange={deleteModal.onOpenChange}>
        <Frame>
          <Modal.Title>{modalTitle}</Modal.Title>
          <Modal.Description>{modalDescription}</Modal.Description>
        </Frame>
        <Frame direction="row">
          <Button className="w-1/2" variant="light" onPress={deleteModal.close}>
            취소
          </Button>

          <Button
            className="w-1/2"
            color="destructive"
            isLoading={isDeleting}
            onPress={handleDelete}
          >
            삭제하기
          </Button>
        </Frame>
      </Modal>
    </>
  )
}
