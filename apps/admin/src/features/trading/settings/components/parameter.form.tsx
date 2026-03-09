import { AppForm, useAppForm } from '@repo/forms'
import { Select } from '@repo/ui/components/select'
import { pick } from '@repo/utils/object'
import { safePromise } from '@repo/utils/promise'
import { vRequired, vRequiredString } from '@repo/validators'
import { useMemo } from 'react'
import * as v from 'valibot'
import type { TradingSettingParameterResponse } from '../services/parameter.api'
import {
  useAlgorithmAvailableParameterRules,
  useCreateTradingParameter,
  useUpdateTradingParameter,
} from '../services/parameter.hooks'

const FormSchema = v.object({
  ruleId: vRequired(),
  parameterValue: vRequiredString(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  ruleId: null,
  parameterValue: '',
}

interface TradingParameterFormProps {
  tradingSettingId: number
  initialData?: TradingSettingParameterResponse
  onSuccess?: () => void
}

export function TradingParameterForm({
  tradingSettingId,
  initialData,
  onSuccess,
}: TradingParameterFormProps) {
  const createMutation = useCreateTradingParameter()
  const updateMutation = useUpdateTradingParameter()

  const { data: availableRules = [] } =
    useAlgorithmAvailableParameterRules(tradingSettingId)

  const parameterRuleOptions = useMemo(
    () =>
      availableRules.map((rule) => ({
        value: rule.parameterRuleId.toString(),
        label: `${rule.ruleKey} - ${rule.ruleName}`,
        isDisabled: rule.isDisabled,
      })),
    [availableRules],
  )

  const isEdit = !!initialData

  const formDefaultValues = useMemo<FormType>(() => {
    if (initialData) {
      return {
        ruleId: initialData.ruleId.toString(),
        parameterValue: initialData.parameterValue,
      }
    }
    return defaultValues
  }, [initialData])

  const form = useAppForm({
    defaultValues: formDefaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { ruleId, parameterValue } = value

      const data = {
        ruleId: Number(ruleId),
        parameterValue,
      }

      const mutation = isEdit
        ? updateMutation.mutateAsync({
            tradingSettingId,
            parameterId: initialData.parameterId,
            data: pick(data, ['parameterValue']),
          })
        : createMutation.mutateAsync({
            tradingSettingId,
            data,
          })

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="ruleId">
        {(field) => (
          <field.Select
            isRequired
            label="규칙"
            items={parameterRuleOptions}
            isClearable={false}
            isDisabled={isEdit}
          >
            {(item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                isDisabled={item.isDisabled}
              >
                {item.label}
              </Select.Item>
            )}
          </field.Select>
        )}
      </form.AppField>
      <form.AppField name="parameterValue">
        {(field) => <field.TextField isRequired label="파라미터 값" />}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
