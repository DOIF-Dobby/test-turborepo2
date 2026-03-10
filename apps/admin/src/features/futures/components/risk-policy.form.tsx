import { AppForm, useAppForm } from '@repo/forms'
import { formatAmount, parseAmount } from '@repo/utils/number'
import { safePromise } from '@repo/utils/promise'
import { vAmountString } from '@repo/validators'
import * as v from 'valibot'
import type { FuturesRiskPolicyResponse } from '../services/futures.api'
import { useUpdateFuturesRiskPolicy } from '../services/futures.hooks'

const FormSchema = v.object({
  liquidationSafeRate: v.union([v.literal(''), vAmountString()]),
})

interface RiskPolicyFormProps {
  initialData: FuturesRiskPolicyResponse
  onSuccess?: () => void
}

export function RiskPolicyForm({
  initialData,
  onSuccess,
}: RiskPolicyFormProps) {
  const updateMutation = useUpdateFuturesRiskPolicy()

  const form = useAppForm({
    defaultValues: {
      liquidationSafeRate: formatAmount(initialData.liquidationSafeRate),
    },
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { liquidationSafeRate } = value

      const result = await safePromise(
        updateMutation.mutateAsync({
          liquidationSafeRate: parseAmount(liquidationSafeRate),
        }),
      )
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="liquidationSafeRate">
        {(field) => (
          <field.AmountTextField label="청산 안전율" isRequired unit="%" />
        )}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
