import { X } from 'lucide-react'
import { swClsx } from '../../utils/clsx'
import { Button, type ButtonProps } from '../button'

export function DefaultModalCloseButton({
  className,
  variant = 'light',
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      className={swClsx(
        'h-10 min-h-10 max-w-10 min-w-10 rounded-full px-0 py-0',
        className,
      )}
    >
      <X />
    </Button>
  )
}
