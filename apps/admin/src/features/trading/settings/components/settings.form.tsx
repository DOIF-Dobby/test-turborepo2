import {
  Currencies,
  FinancialAssetTypes,
  type Currency,
  type FinancialAssetType,
} from '@/constants/domain'
import {
  AlgorithmTypesMap,
  type AlgorithmType,
} from '@/features/algorithm/constants/domain'
import { useAlgorithms } from '@/features/algorithm/services/algorithm.hooks'
import { currencyUtils } from '@/utils/domain'
import { AppForm, useAppForm } from '@repo/forms'
import { Select } from '@repo/ui/components/select'
import { groupBy, sortBy } from '@repo/utils/array'
import { parseAmount } from '@repo/utils/number'
import { safePromise } from '@repo/utils/promise'
import { vAmountString, vRequired, vRequiredString } from '@repo/validators'
import * as v from 'valibot'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import {
  useCreateTradingSetting,
  useUpdateTradingSetting,
} from '../services/settings.hooks'

const FormSchema = v.object({
  algorithmId: vRequired(),
  currency: vRequired(),
  orderAmountRatio: v.pipe(vRequiredString(), vAmountString()),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  algorithmId: '',
  currency: '',
  orderAmountRatio: '',
}

interface TradingSettingsFormProps {
  initialData?: TradingSettingWithAlgorithmResponse
  onSuccess?: () => void
}

export function TradingSettingsForm({
  initialData,
  onSuccess,
}: TradingSettingsFormProps) {
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
      assetType: currencyUtils.getAssetType(key as Currency),
    }))

  const groupedCurrencyItems = groupBy(currencyItems, (item) => item.assetType)

  const algorithmItems = sortBy(algorithms, ['algorithmType']).map(
    (algorithm) => ({
      label: algorithm.algorithmName,
      value: algorithm.algorithmId.toString(),
      algorithmType: algorithm.algorithmType,
    }),
  )

  const groupedAlgorithmItems = groupBy(
    algorithmItems,
    (item) => item.algorithmType,
  )

  return (
    <AppForm form={form}>
      <form.AppField name="algorithmId">
        {(field) => (
          <field.Select
            label="알고리즘"
            isDisabled={isEdit}
            isRequired
            items={algorithmItems}
            isClearable={false}
            renderList={() => (
              <>
                {Object.entries(groupedAlgorithmItems).map(
                  ([group, groupItems]) => (
                    <Select.Group
                      key={group}
                      label={AlgorithmTypesMap[group as AlgorithmType]}
                    >
                      {groupItems?.map((item) => (
                        <Select.Item key={item.value} value={item.value}>
                          {item.label}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  ),
                )}
              </>
            )}
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
            renderList={() => (
              <>
                {Object.entries(groupedCurrencyItems).map(
                  ([group, groupItems]) => (
                    <Select.Group
                      key={group}
                      label={FinancialAssetTypes[group as FinancialAssetType]}
                    >
                      {groupItems?.map((item) => (
                        <Select.Item key={item.value} value={item.value}>
                          {item.label}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  ),
                )}
              </>
            )}
          />
        )}
      </form.AppField>
      <form.AppField name="orderAmountRatio">
        {(field) => (
          <field.AmountTextField
            label="주문 금액 비율"
            isRequired
            allowMinus={false}
            unit="%"
          />
        )}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
