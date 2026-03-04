import { AppForm, useAppForm } from '@repo/forms'
import { keysOf, pick } from '@repo/utils/object'
import { safePromise } from '@repo/utils/promise'
import { emptyIfNull } from '@repo/utils/string'
import { vRequiredString } from '@repo/validators'
import * as v from 'valibot'
import { PARAMTER_TYPES } from '../constants/definitions'
import type { AlgorithmParameterRuleResponse } from '../services/parameter-rule.api'
import {
  useCreateParameterRule,
  useUpdateParameterRule,
} from '../services/parameter-rule.hooks'

const FormSchema = v.object({
  ruleKey: vRequiredString(),
  ruleName: vRequiredString(),
  ruleDescription: vRequiredString(),
  parameterType: v.picklist(PARAMTER_TYPES.map((t) => t.value)),
  lowerBound: v.string(),
  upperBound: v.string(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  ruleKey: '',
  ruleName: '',
  ruleDescription: '',
  parameterType: 'INT',
  lowerBound: '',
  upperBound: '',
}

interface ParameterRuleFormProps {
  algorithmId: number
  initialData?: AlgorithmParameterRuleResponse
  onSuccess?: () => void
}

export function ParameterRuleForm({
  algorithmId,
  initialData,
  onSuccess,
}: ParameterRuleFormProps) {
  const createParameterRuleMutation = useCreateParameterRule()
  const updateParameterRuleMutation = useUpdateParameterRule()

  const isEdit = !!initialData

  const form = useAppForm({
    defaultValues: isEdit
      ? {
          ...pick(initialData, keysOf(defaultValues)),
          upperBound: emptyIfNull(initialData.upperBound),
          lowerBound: emptyIfNull(initialData.lowerBound),
        }
      : defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const mutation = isEdit
        ? updateParameterRuleMutation.mutateAsync({
            algorithmId,
            ruleId: initialData.parameterRuleId,
            data: pick(value, [
              'ruleName',
              'ruleDescription',
              'parameterType',
              'upperBound',
              'lowerBound',
            ]),
          })
        : createParameterRuleMutation.mutateAsync({ algorithmId, data: value })

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form} className="flex flex-col gap-sw-sm">
      <form.AppField name="ruleKey">
        {(field) => (
          <field.TextField
            label="파라미터 규칙 키"
            isRequired
            isDisabled={isEdit}
          />
        )}
      </form.AppField>
      <form.AppField name="ruleName">
        {(field) => <field.TextField label="파라미터 규칙 이름" isRequired />}
      </form.AppField>
      <form.AppField name="ruleDescription">
        {(field) => <field.TextField label="파라미터 규칙 설명" isRequired />}
      </form.AppField>
      <form.AppField name="parameterType">
        {(field) => (
          <field.Select
            label="파라미터 타입"
            isRequired
            items={PARAMTER_TYPES}
            isClearable={false}
          />
        )}
      </form.AppField>
      <form.AppField name="lowerBound">
        {(field) => <field.TextField label="하한값" />}
      </form.AppField>
      <form.AppField name="upperBound">
        {(field) => <field.TextField label="상한값" />}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
