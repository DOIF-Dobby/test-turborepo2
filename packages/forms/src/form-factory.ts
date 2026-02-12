import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'
import { FormButton } from './fields/form-button'
import { FormTextField } from './fields/form-text-field'

export const { useAppForm, withForm, useTypedAppFormContext, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
  },
  formComponents: {
    SubmitButton: FormButton,
  },
  fieldContext,
  formContext,
})
