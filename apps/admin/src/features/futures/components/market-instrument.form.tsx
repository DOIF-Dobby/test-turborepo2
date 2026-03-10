import { currencyItems, type Currency } from '@/constants/domain'
import { AppForm, useAppForm } from '@repo/forms'
import { Select } from '@repo/ui/components/select'
import { keysOf, pick } from '@repo/utils/object'
import { safePromise } from '@repo/utils/promise'
import { emptyIfNull } from '@repo/utils/string'
import { vRequired } from '@repo/validators'
import { useStore } from '@tanstack/react-form'
import { useMemo } from 'react'
import * as v from 'valibot'
import { useContractCodes } from '../services/futures.hooks'
import type { MarketInstrumentResponse } from '../services/market-instrument.api'
import { useSaveMarketInstrument } from '../services/market-instrument.hooks'

const FormSchema = v.object({
  currency: vRequired(),
  marketCode: vRequired(),
  description: v.nullable(v.string()),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  currency: '',
  marketCode: '',
  description: '',
}

interface MarketInstrumentFormProps {
  initialData?: MarketInstrumentResponse
  existingCurrencies?: Currency[]
  onSuccess?: () => void
}

export function MarketInstrumentForm({
  initialData,
  existingCurrencies = [],
  onSuccess,
}: MarketInstrumentFormProps) {
  const saveMutation = useSaveMarketInstrument()

  const formDefaultValues = useMemo<FormType>(() => {
    if (initialData) {
      return {
        ...pick(initialData, keysOf(defaultValues)),
        description: emptyIfNull(initialData.description),
      }
    }
    return defaultValues
  }, [initialData])

  const isEdit = !!initialData

  const form = useAppForm({
    defaultValues: formDefaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { currency, marketCode, description } = value

      const result = await safePromise(
        saveMutation.mutateAsync({
          currency: currency as Currency,
          marketCode: marketCode!,
          description: description,
        }),
      )

      if (result) {
        onSuccess?.()
      }
    },
  })

  const selectedCurrency = useStore(
    form.store,
    (state) => state.values.currency,
  )

  const {
    data: contractCodes,
    isPending,
    isFetching,
  } = useContractCodes(selectedCurrency ? (selectedCurrency as Currency) : null)

  const contractCodeOptions = useMemo(() => {
    if (!contractCodes) {
      return []
    }

    return contractCodes.map((code) => ({
      value: code.contractCode,
      label: `${code.contractCode} (${code.displayMonth})`,
      isDisabled: code.isDisabled,
    }))
  }, [contractCodes])

  return (
    <AppForm form={form}>
      <form.AppField name="currency">
        {(field) => (
          <field.Select
            label="통화"
            isDisabled={isEdit}
            isRequired
            items={currencyItems.filter(
              (item) => item.assetType === 'COMMODITY',
            )}
            isClearable={false}
          >
            {(item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                isDisabled={existingCurrencies.includes(item.value)}
              >
                {item.label}
              </Select.Item>
            )}
          </field.Select>
        )}
      </form.AppField>

      <form.AppField name="marketCode">
        {(field) => (
          <field.Select
            label="월물 코드"
            isRequired
            isLoading={isFetching}
            isReadOnly={isPending}
            placeholder={isPending ? '통화를 선택해주세요.' : '선택없음'}
            items={contractCodeOptions}
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

      <form.AppField name="description">
        {(field) => <field.TextField label="설명" />}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
