import { DropdownMenu as DropdownPrimitive } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import {
  dropdownRadioGroupVariants,
  type DropdownRadioGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof DropdownPrimitive.RadioGroup>,
  keyof DropdownRadioGroupVariants
> &
  DropdownRadioGroupVariants

export interface DropdownRadioGroupProps extends Props {}

export function DropdownRadioGroup(props: DropdownRadioGroupProps) {
  const { children, className, ...groupProps } = props

  const styles = swClsx(
    dropdownRadioGroupVariants({
      className,
    }),
  )

  return (
    <DropdownPrimitive.RadioGroup {...groupProps} className={styles}>
      {children}
    </DropdownPrimitive.RadioGroup>
  )
}
