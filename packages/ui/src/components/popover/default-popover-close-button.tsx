import { X } from 'lucide-react'
import { Button, type ButtonProps } from '../../components/button'
import { swClsx } from '../../utils/clsx'

export function DefaultPopoverCloseButton({
  className,
  variant = 'light',
  ...props
}: ButtonProps) {
  return (
    <Button {...props} variant={variant} className={swClsx(className)}>
      <X className="size-4" />
    </Button>
  )
}
