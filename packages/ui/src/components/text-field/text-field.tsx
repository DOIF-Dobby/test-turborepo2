import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Input } from '../input'
import { Label } from '../label'
import { ClearIcon } from './clear-icon'
import {
  type TextFieldSlots,
  textFieldVariants,
  type TextFieldVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<'input'>,
  keyof TextFieldVariants | 'className'
> &
  TextFieldVariants

export interface TextFieldProps extends Props {
  label?: React.ReactNode
  classNames?: SlotsToClasses<TextFieldSlots>
  required?: boolean
  clearIcon?: React.ReactNode
  clearable?: boolean
}

export function TextField(props: TextFieldProps) {
  const {
    size,
    label,
    classNames,
    required = false,
    clearable = true,
    clearIcon = <ClearIcon />,
    ...otherProps
  } = props

  const slots = textFieldVariants({ size })

  return (
    <div
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      <Label
        classNames={{
          label: classNames?.label,
          indicator: classNames?.labelIndicator,
        }}
        size={size}
        requiredIndicator={required}
      >
        {label}
      </Label>
      <div
        className={swClsx(
          slots.inputWrapper({
            className: classNames?.inputWrapper,
          }),
        )}
      >
        <Input
          className={swClsx(
            slots.input({
              className: classNames?.input,
            }),
          )}
          size={size}
          {...otherProps}
        />
      </div>
    </div>
  )
}
