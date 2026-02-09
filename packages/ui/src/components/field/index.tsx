import { FieldControl } from './field-control'
import { FieldDescription } from './field-description'
import { FieldError } from './field-error'
import { FieldItem } from './field-item'
import { FieldLabel } from './field-label'
import { FieldRoot } from './field-root'

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
  Item: FieldItem,
  Control: FieldControl,
})
