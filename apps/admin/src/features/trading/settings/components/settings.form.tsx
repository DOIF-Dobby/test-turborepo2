import { Currencies, type Currency } from '@/constants/domain'
import { AlgorithmTypesMap } from '@/features/algorithm/constants/definitions'
import { useAlgorithms } from '@/features/algorithm/services/algorithm.hooks'
import { AppForm, useAppForm } from '@repo/forms'
import { sortBy } from '@repo/utils/array'
import { parseAmount } from '@repo/utils/number'
import { safePromise } from '@repo/utils/promise'
import { vRequiredString } from '@repo/validators'
import * as v from 'valibot'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import {
  useCreateTradingSetting,
  useUpdateTradingSetting,
} from '../services/settings.hooks'

const FormSchema = v.object({
  algorithmId: vRequiredString(),
  currency: vRequiredString(),
  orderAmountRatio: vRequiredString(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  algorithmId: '',
  currency: '',
  orderAmountRatio: '',
}

interface SettingsFormProps {
  initialData?: TradingSettingWithAlgorithmResponse
  onSuccess?: () => void
}

export function SettingsForm({ initialData, onSuccess }: SettingsFormProps) {
  const createMutation = useCreateTradingSetting()
  const updateMutation = useUpdateTradingSetting()
  const { data: algorithms = [] } = useAlgorithms()

  const isEdit = !!initialData

  const form = useAppForm({
    defaultValues: isEdit
      ? {
          algorithmId: initialData.algorithmId.toString(),
          currency: initialData.currency,
          orderAmountRatio: initialData.orderAmountRatio.toString(),
        }
      : defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const mutation = isEdit
        ? updateMutation.mutateAsync({
            id: initialData.tradingSettingId,
            data: {
              orderAmountRatio: parseAmount(value.orderAmountRatio),
            },
          })
        : createMutation.mutateAsync({
            algorithmId: Number(value.algorithmId),
            currency: value.currency as Currency,
            orderAmountRatio: parseAmount(value.orderAmountRatio),
          })

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  const currencyItems = Object.keys(Currencies)
    .filter((key) => key !== 'KRW')
    .map((key) => ({
      label: key,
      value: key,
    }))

  const algorithmItems = sortBy(algorithms, ['algorithmType']).map(
    (algorithm) => ({
      label: `${algorithm.algorithmName} - ${AlgorithmTypesMap[algorithm.algorithmType]}`,
      value: algorithm.algorithmId.toString(),
    }),
  )

  return (
    <AppForm form={form} className="flex flex-col gap-sw-md">
      <form.AppField name="algorithmId">
        {(field) => (
          <field.Select
            label="알고리즘"
            isDisabled={isEdit}
            isRequired
            items={algorithmItems}
            isClearable={false}
          />
        )}
      </form.AppField>
      <form.AppField name="currency">
        {(field) => (
          <field.Select
            label="통화"
            isDisabled={isEdit}
            isRequired
            items={currencyItems}
            isClearable={false}
          />
        )}
      </form.AppField>
      <form.AppField name="orderAmountRatio">
        {(field) => <field.TextField label="주문 금액 비율" isRequired />}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
