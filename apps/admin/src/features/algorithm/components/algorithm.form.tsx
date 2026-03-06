import { AppForm, useAppForm } from '@repo/forms'
import { keysOf, pick } from '@repo/utils/object'
import { safePromise } from '@repo/utils/promise'
import { vRequiredString } from '@repo/validators'
import * as v from 'valibot'
import { AlgorithmTypes } from '../constants/domain'
import type { AlgorithmResponse } from '../services/algorithm.api'
import {
  useCreateAlgorithm,
  useUpdateAlgorithm,
} from '../services/algorithm.hooks'

const FormSchema = v.object({
  algorithmKey: vRequiredString(),
  algorithmName: vRequiredString(),
  algorithmDescription: vRequiredString(),
  algorithmType: v.picklist(AlgorithmTypes.map((t) => t.value)),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  algorithmKey: '',
  algorithmName: '',
  algorithmDescription: '',
  algorithmType: 'NORMAL',
}

interface AlgorithmFormProps {
  initialData?: AlgorithmResponse
  onSuccess?: () => void
}

export function AlgorithmForm({ initialData, onSuccess }: AlgorithmFormProps) {
  const createAlgorithmMutation = useCreateAlgorithm()
  const updateAlgorithmMutation = useUpdateAlgorithm()

  const isEdit = !!initialData

  const form = useAppForm({
    defaultValues: isEdit
      ? pick(initialData, keysOf(defaultValues))
      : defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const mutation = isEdit
        ? updateAlgorithmMutation.mutateAsync({
            id: initialData.algorithmId,
            data: pick(value, ['algorithmName', 'algorithmDescription']),
          })
        : createAlgorithmMutation.mutateAsync(value)

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="algorithmKey">
        {(field) => (
          <field.TextField label="알고리즘 키" isRequired isDisabled={isEdit} />
        )}
      </form.AppField>
      <form.AppField name="algorithmName">
        {(field) => <field.TextField label="알고리즘명" isRequired />}
      </form.AppField>
      <form.AppField name="algorithmDescription">
        {(field) => <field.TextField label="알고리즘 설명" isRequired />}
      </form.AppField>
      <form.AppField name="algorithmType">
        {(field) => (
          <field.Select
            label="알고리즘 타입"
            isRequired
            items={AlgorithmTypes}
            isClearable={false}
            isDisabled={isEdit}
          />
        )}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
