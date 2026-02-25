import { Button } from '@repo/ui/components/button'
import type { SortDirection } from '@tanstack/react-table'
import SortingIcon from './sorting-icon'

interface SortingButtonProps extends React.ComponentProps<typeof Button> {
  isSorted: false | SortDirection
}

export default function SortingButton({
  isSorted,
  ...props
}: SortingButtonProps) {
  return (
    <Button size="3xs" isIconOnly variant="light" {...props}>
      <SortingIcon isSorted={isSorted} />
    </Button>
  )
}
