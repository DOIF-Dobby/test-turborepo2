import { createFormHook, revalidateLogic } from '@tanstack/react-form'
import { FormButton } from './fields/form-button'
import { FormTextField } from './fields/form-text-field'
import { fieldContext, formContext } from './form-context'

export const {
  useAppForm: useBaseAppForm,
  withForm,
  useTypedAppFormContext,
  withFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField: FormTextField,
  },
  formComponents: {
    SubmitButton: FormButton,
  },
  fieldContext,
  formContext,
})

/**
 * revalidateLogic 기본값을 주입하여 사용성을 개선한 훅
 */
export const useAppForm: typeof useBaseAppForm = (options) => {
  return useBaseAppForm({
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    ...options,
  } as typeof options)
}
