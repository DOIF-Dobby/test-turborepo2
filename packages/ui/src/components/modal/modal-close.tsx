import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'

type Props = React.ComponentProps<typeof DialogPrimitive.Close>

export interface ModalCloseProps extends Props {}

export function ModalClose(props: ModalCloseProps) {
  const { children, ...ohterProps } = props

  return (
    <DialogPrimitive.Close suppressHydrationWarning {...ohterProps}>
      {children}
    </DialogPrimitive.Close>
  )
}
