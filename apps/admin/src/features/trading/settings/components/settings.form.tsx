import {
  Currencies,
  FinancialAssetTypes,
  type Currency,
  type FinancialAssetType,
} from '@/constants/domain'
import {
  AlgorithmTypesMap,
  type AlgorithmType,
} from '@/features/algorithm/constants/definitions'
import { useAlgorithms } from '@/features/algorithm/services/algorithm.hooks'
import { currencyUtils } from '@/utils/domain'
import { AppForm, useAppForm } from '@repo/forms'
import { Select } from '@repo/ui/components/select'
import { groupBy, sortBy } from '@repo/utils/array'
import { onInputAmount, onKeyDownAmount } from '@repo/utils/mask'
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
    <AppForm form={form} className="flex flex-col gap-sw-md">
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
          <field.TextField
            label="주문 금액 비율"
            isRequired
            onInput={onInputAmount}
            onKeyDown={onKeyDownAmount}
            isClearable={false}
            endContent={
              <span className="min-w-fit text-sm text-base-700">%</span>
            }
            classNames={{
              input: 'text-right',
            }}
          />
        )}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
