import { X } from 'lucide-react'
import { Button, type ButtonProps } from '../../components/button'
import { swClsx } from '../../utils/clsx'

export function DefaultModalCloseButton({
  className,
  variant = 'light',
  ...props
}: ButtonProps) {
  return (
    <Button {...props} variant={variant} className={swClsx(className)}>
      <X />
    </Button>
  )
}
