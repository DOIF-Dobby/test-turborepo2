import { Button } from '@repo/ui/components/button'
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'

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

export function DeleteButton({
  children = '삭제',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      color="destructive"
      size="xs"
      startContent={<Trash2Icon className="size-4" />}
      className="px-sw-xs"
      {...props}
    >
      {children}
    </Button>
  )
}
